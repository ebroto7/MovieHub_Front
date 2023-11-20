import { FC, createContext, useReducer, PropsWithChildren, useEffect, useContext, useState } from "react";
import { MovieType } from "../../types/movie.interface";
import axios, { AxiosHeaderValue, AxiosRequestConfig } from "axios";
import { useUserContext } from "../userContext/UserContext";
import { useParams } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react'

const moviesUrl = `${import.meta.env.VITE_API_BASE_URL}movie/`


const initialArgs: MovieType[] = []

enum Actions {
    GetAllMovies = "getAllMovies",
    CreateMovie = "createMovie",
    DeleteMovie = "deleteMovie",
    UpdateMovie = "updateMovie",
}


interface GetAllMovies {
    type: Actions.GetAllMovies,
    payload: {
        movies: MovieType[]
    }
}
interface CreateMovie {
    type: Actions.CreateMovie,
    payload: {
        movie: MovieType
    }
}
interface UpdateMovie {
    type: Actions.UpdateMovie,
    payload: {
        movie: MovieType
    }
}
interface DeleteMovie {
    type: Actions.DeleteMovie,
    payload: {
        movieId: string | number
    }
}

type Action = CreateMovie | DeleteMovie | UpdateMovie | GetAllMovies

export const movieReducer = (movieList: MovieType[], action: Action) => {
    switch (action.type) {

        case Actions.GetAllMovies: {

            return action.payload.movies
        }
        case Actions.CreateMovie: {
            const newMovie = action.payload.movie
            console.log("movie reducer create movie", newMovie, ...movieList)

            return [...movieList, newMovie]
        }
        case Actions.UpdateMovie: {
            let movie = movieList.find(
                (movie) => movie.id === action.payload.movie.id
            )
            if (movie) {
                movie = action.payload.movie
            }

            return [...movieList]
        }
        case Actions.DeleteMovie: {
            const movieIndex = movieList.findIndex(
                (movie) => movie.id === action.payload.movieId
            )
            movieList.splice(movieIndex, 1)

            return [...movieList]
        }
    }
    return movieList
}

type MovieStateProps = {
    allMovies: MovieType[];
    userMovies: MovieType[];
    getAllMovies: () => void,
    createMovie: (movie: MovieType) => void,
    updateMovie: (movie: MovieType) => void,
    deleteMovie: (movieId: string) => void,
    getAllMoviesByUserId: (userId: string | number) => void,
}

export const MovieContext = createContext<MovieStateProps>({
    allMovies: [],
    userMovies: [],
    getAllMovies: () => { },
    createMovie: () => { },
    updateMovie: () => { },
    deleteMovie: () => { },
    getAllMoviesByUserId: () => { },
})

const init = () => {



    return initialArgs;
};



const MovieProvider: FC<PropsWithChildren> = ({ children }) => {
    const {isLoading} = useAuth0()
    const { APIuserLogedId, isAuth, userLoged, getLogedUser  } = useUserContext()
    console.log("data",APIuserLogedId)

    const [allMovies, dispatch] = useReducer(movieReducer, {}, init);
    const [userMovies, setUserMovies] = useState<MovieType[]>([])
     const [ID, setID] = useState<string | number>(userLoged.id)
     const [loading, setLoading] = useState(true);


    useEffect(() => {
        getAllMovies()
         setID(userLoged.id)
        getAllMoviesByUserId(APIuserLogedId)
    }, [ isAuth, userLoged, isLoading])

    useEffect(() => {
        const loadData = async () => {
          await getLogedUser();
          setLoading(false);
      };
    
      if (allMovies.length === 0) {
          loadData();
      }
      }, [allMovies,userLoged, getLogedUser])



    const getAllMovies = async () => {
        try {
            const response = await axios.get(moviesUrl)
            const movies: MovieType[] = response.data

            console.log("fetchAllmovies", movies)

            dispatch({
                type: Actions.GetAllMovies,
                payload: {
                    movies
                }
            })

        } catch (error) {
            console.log(error)
        }

    }


    const createMovie = async (movie: MovieType) => {
       
        const config: any= { 'content-type': 'application/json' };

        axios.post(`${moviesUrl}${APIuserLogedId}`,  movie, config )
            .then(response => {
                console.log(response.data);

                dispatch({
                    type: Actions.CreateMovie,
                    payload: {
                        movie
                    }
                })

            })
            .catch(function (error) {
                console.error(error);
            });

    }
    const deleteMovie = (movieId: string) => {

        axios.delete(`${moviesUrl}/${movieId}`)
            .then(response => {
                console.log("deleted movie", response.data)
                dispatch({
                    type: Actions.DeleteMovie,
                    payload: {
                        movieId
                    }
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    const updateMovie = (movie: MovieType) => {
        //TODO
        //update movie from API (patch method)
        dispatch({
            type: Actions.CreateMovie,
            payload: {
                movie
            }
        })
    }
    const getAllMoviesByUserId = async (userId: string | number) => {
        try {
            const url = `${moviesUrl}user/${7}`
            console.log("data url ", url)
            const response = await fetch(url);
            const data = await response.json();
            console.log("Data", data);
            setUserMovies(data)
            return data;
        } catch (error) {
            console.error(`Error getting user's movies ${userId}`, error);
            return [];
        }
    };

    return (
        <MovieContext.Provider
            value={{ allMovies, createMovie, deleteMovie, updateMovie, userMovies, getAllMovies, getAllMoviesByUserId }}
        >
            {children}
        </MovieContext.Provider>
    )

}

function useMovieContext() {
    const context = useContext(MovieContext)
    if (context === undefined || context === null) {
        throw new Error("Function not implemented.");
    }
    return context;
}

export { MovieProvider, useMovieContext }


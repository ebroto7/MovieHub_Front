import { FC, createContext, useReducer, PropsWithChildren, useEffect, useContext, useState } from "react";
import { MovieType } from "../../types/movie.interface";
import axios from "axios";
import { useUserContext } from "../userContext/UserContext";

const moviesUrl = `${import.meta.env.VITE_API_BASE_URL}movie/`


const initialArgs: MovieType[] = []

enum Actions {
    CreateMovie = "createMovie",
    DeleteMovie = "deleteMovie",
    UpdateMovie = "updateMovie",
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

type Action = CreateMovie | DeleteMovie | UpdateMovie

export const movieReducer = (movieList: MovieType[], action: Action) => {
    switch (action.type) {
       
        case Actions.CreateMovie: {
            const newMovie = action.payload.movie
            console.log("movie reducer create movie",newMovie,...movieList)

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
    createMovie: (movie: MovieType) => void,
    updateMovie: (movie: MovieType) => void,
    deleteMovie: (movieId: string) => void,
}

export const MovieContext = createContext<MovieStateProps>({
    allMovies: [],
    userMovies: [],
    createMovie: () => { },
    updateMovie: () => { },
    deleteMovie: () => { },
})

const init = () => {

   

    return initialArgs;
};
const fetchAllmovies = async () => {
    try {
        const response = await axios.get(moviesUrl)
        const movies: MovieType[] = response.data
        console.log("fetchAllmovies", movies)

        return movies;
    } catch (error) {
        console.log(error)
    }
    return []
}


const MovieProvider: FC<PropsWithChildren> = ({ children }) => {

    const {userLoged} = useUserContext()

    const [allMovies, dispatch] = useReducer(movieReducer, {}, init);
    const [userMovies, setUserMovies] = useState<MovieType[]>([])



    useEffect(() => {
        fetchAllmovies()
        getAllMoviesByUserId(userLoged.id)
    }, [allMovies])


    const createMovie = async (movie: MovieType) => {
        //TODO
        //create movie from API (post method)

        try {
            const response = await fetch(`${moviesUrl}/${userLoged.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movie),
            });
    
            if (!response.ok) {
                throw new Error(`Error creating movie: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error creating movie', error);
        }


        dispatch({
            type: Actions.CreateMovie,
            payload: {
                movie
            }
        })
    }
    const deleteMovie = (movieId: string) => {

        //TODO
        //delete movie from API (delete method)

        dispatch({
            type: Actions.DeleteMovie,
            payload: {
                movieId
            }
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
            const response = await fetch(`${moviesUrl}/user/${userId}`);
            const data = await response.json();
            console.log("Data",data);
            setUserMovies(data)
            return data;
        } catch (error) {
            console.error(`Error getting user's movies ${userId}`, error);
            return [];
        }
    };

    return (
        <MovieContext.Provider
            value={{ allMovies, createMovie, deleteMovie, updateMovie, userMovies }}
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


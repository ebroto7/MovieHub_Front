import { FC, createContext, useReducer, PropsWithChildren, useEffect, useContext } from "react";
import { MovieType } from "../../types/movie.interface";
import axios from "axios";

const moviesUrl = `${import.meta.env.VITE_API_BASE_URL}movie/`


const initialArgs: MovieType[] = []

enum Actions {
    // GetAllMovies = "getAllMovies",
    CreateMovie = "createMovie",
    DeleteMovie = "deleteMovie",
    UpdateMovie = "updateMovie",
}

// interface GetAllMovies {
//     type: Actions.GetAllMovies,
// }
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
// | GetAllMovies

export const movieReducer = (movieList: MovieType[], action: Action) => {
    switch (action.type) {
        // case Actions.GetAllMovies: {
        //     const movies: MovieType[] = await fetchAllmovies()
        //     return movies
        // }
        case Actions.CreateMovie: {
            // TODO
            const newMovie = action.payload.movie

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
    // getAllMovies: () => void,
    createMovie: (movie: MovieType) => void,
    updateMovie: (movie: MovieType) => void,
    deleteMovie: (movieId: string) => void,
}

export const MovieContext = createContext<MovieStateProps>({
    allMovies: [],
    // getAllMovies: () => { },
    createMovie: () => { },
    updateMovie: () => { },
    deleteMovie: () => { },
})

const init = () => {

    // const response = await axios.get(moviesUrl)
    // const movies: MovieType[] = response.data
    // console.log("fetchAllmovies",movies)
    // if (movies) {
    //     return movies
    // }

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


    const [allMovies, dispatch] = useReducer(movieReducer, {}, init);



    useEffect(() => {
        fetchAllmovies()
    }, [allMovies])

    // const getAllMovies = () => {
    //     dispatch(
    //     //     {
    //     //     type: Actions.GetAllMovies
    //     // }
    //     )
    // }


    const createMovie = (movie: MovieType) => {
        //TODO
        //create movie from API (post method)
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

    return (
        <MovieContext.Provider
            value={{ allMovies, createMovie, deleteMovie, updateMovie }}
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

// const getProducts = async () => {
//     try {
//        const response = await axios.get(url);
//     //   const response = await axios.get("https://www.developerway.com/posts/how-to-handle-errors-in-react");
//       setApiBooks(response.data);

//       setApiError(false)

//     } catch (error) {
//       setApiError(true)
//     }
//  }
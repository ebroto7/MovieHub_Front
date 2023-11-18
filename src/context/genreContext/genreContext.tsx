import { FC, PropsWithChildren, createContext, useState, useEffect, Children, useContext } from 'react';

import axios from 'axios';

import { GenreType } from '../../types/genre.interface';

export type ApiGenreStateProps = {
    apiGenres: GenreType[];
    apiError: boolean
}

export const APIGenreContext = createContext<ApiGenreStateProps>({
    apiGenres: [],
    apiError: true,
})



const APIGenreProvider: FC<PropsWithChildren> = ({ children }) => {
    const genreUrl = `${import.meta.env.VITE_API_BASE_URL}genre/`

    const [apiGenres, setApiGenres] = useState<GenreType[]>([])
    const [apiError, setApiError] = useState<boolean>(true)

    useEffect(() => {
        const getAllGenres = async () => {
            try {
                const response = await axios.get(genreUrl);
                setApiGenres(response.data);

                console.log("API getAllGenres ", response.data)
                setApiError(false)

            } catch (error) {
                setApiError(true)
                console.log(error)
            }
        }

        getAllGenres()
    }, []);



    return (
        <APIGenreContext.Provider
            value={{ apiError, apiGenres }}
        >
            {children}
        </APIGenreContext.Provider>
    )

}

function useGenreContext() {
    const context = useContext(APIGenreContext);
    if (context === undefined || context === null) {
        throw new Error('Genre Context not implemented')
    }
    return context
}

export { APIGenreProvider, useGenreContext }



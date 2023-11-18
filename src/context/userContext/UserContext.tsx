import { FC, PropsWithChildren, createContext, useState, useEffect, Children, useContext } from 'react';

import axios from 'axios';

import { UserType } from '../../types/user.interface';

const initialUser:UserType = {
    id: "1123",
    name: "user",
    email: "email"
}

export type UserStateProps = {
    userLoged: UserType
    apiError: boolean
}

export const UserContext = createContext<UserStateProps>({
    userLoged: initialUser,
    apiError: true
})


const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const userUrl = `${import.meta.env.VITE_API_BASE_URL}user/`
    const [apiError, setApiError] = useState<boolean>(true)

    const [userLogedId, setUserLogedId] = useState<string | number>('')
    const [userLoged, setUserLoged] = useState<UserType>(initialUser)

    const getLogedUser = async () => {
        const userLogedUrl = `${userUrl}user/${userLogedId}`
        try {
            const response = await axios.get(userLogedUrl);
            setUserLoged(response.data);

            console.log("API getAllGenres ", response.data)
            setApiError(false)
        } catch (error) {
            setApiError(true)
            console.log(error)
        }
    }

    return (
        <UserContext.Provider
        value={{ apiError, userLoged }}
        >
            {children}

        </UserContext.Provider>
    )

}


function useUserContext() {
    const context = useContext(UserContext);
    if (context === undefined || context === null) {
        throw new Error('Genre Context not implemented')
    }
    return context
}

export { UserProvider, useUserContext }


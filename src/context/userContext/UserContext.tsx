import { FC, 
         PropsWithChildren, 
         createContext, 
         useState, 
         useEffect, 
         useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';

import { UserType } from '../../types/user.interface';

const initialUser:UserType = {
    id: "1123",
    name: "user",
    email: "email",
    movies: [],
    password: "123",
    createdAt: new Date(),
    updatedAt: new Date()
}

export type UserStateProps = {
    userLoged: UserType
    apiError: boolean
    APIuserLogedId: String | number
}

export const UserContext = createContext<UserStateProps>({
    userLoged: initialUser,
    apiError: true,
    APIuserLogedId: '' 
})



const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const userUrl = `${import.meta.env.VITE_API_BASE_URL}user/`
    const [apiError, setApiError] = useState<boolean>(true)

    const [APIuserLogedId, setAPIUserLogedId] = useState<string | number>('')
    const [userLoged, setUserLoged] = useState<UserType>(initialUser)

    const getLogedUser = async () => {
        const userLogedUrl = `${userUrl}user/${APIuserLogedId}`
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
        value={{ apiError, userLoged, APIuserLogedId }}
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


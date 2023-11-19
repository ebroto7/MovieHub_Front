import {
    FC,
    PropsWithChildren,
    createContext,
    useState,
    useEffect,
    useContext
} from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';

import { UserType } from '../../types/user.interface';

const initialUser: UserType = {
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
    createOrLoginUser: () => void
}

export const UserContext = createContext<UserStateProps>({
    userLoged: initialUser,
    apiError: true,
    APIuserLogedId: '',
    createOrLoginUser: () => { }
})



const UserProvider: FC<PropsWithChildren> = ({ children }) => {

    const { isAuthenticated, user } = useAuth0()
     const [isAuth, setIsAuth] = useState<boolean>(false)
    useEffect(() => {
        setIsAuth(isAuthenticated)
        getLogedUser()
        createOrLoginUser()
        setAPIUserLogedId(userLoged.id)
        console.log("setAPIUserLogedId ", userLoged.id)
    }, [isAuthenticated])


    const userUrl = `${import.meta.env.VITE_API_BASE_URL}user/`
    const [apiError, setApiError] = useState<boolean>(true)

    const [APIuserLogedId, setAPIUserLogedId] = useState<string | number>('')
    const [userLoged, setUserLoged] = useState<UserType>(initialUser)


    const createOrLoginUser = async () => {
        if (isAuthenticated && user) {
            try {

                // const response = await axios.post(userUrl, {
                //     name: user.name,
                //     email: user.email,
                // }, {
                //     headers: {
                //         'Content-Type': 'application/json',
                //     }
                // })

                const response = await fetch(userUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: user.name,
                        email: user.email,
                    }),
                });

                if (response.status === 201 || response.status === 409) {
                    console.log('Created or existing user');
                    const user = await response.json();
                    // const user = await response.data;

                    setUserLoged(user);
                    console.log("User:", user);
                } else {
                    console.error('Error creating or verifying user');
                }
                setApiError(false)

            } catch (error) {
                console.error('Network error creating or verifying user', error);
                setApiError(true)
            }
        }
    };


    const getLogedUser = async () => {
        const userLogedUrl = `${userUrl}user/${APIuserLogedId}`
        try {
            const response = await axios.get(userLogedUrl);
            setAPIUserLogedId(response.data);

            console.log("API getAllGenres ", response.data)
            setApiError(false)
        } catch (error) {
            setApiError(true)
            console.log(error)
        }
    }

    return (
        <UserContext.Provider
            value={{ apiError, userLoged, APIuserLogedId, createOrLoginUser }}
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


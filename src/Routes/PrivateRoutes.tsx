import {FC, PropsWithChildren} from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom';
import { USER } from './paths';

const PrivateRoutes: FC<PropsWithChildren> = ({ children }) => {

const { isAuthenticated, isLoading, user} = useAuth0()


    if (isLoading) return <div>Loading...</div>
    console.log(isAuthenticated)

 
    // if (!user) {
    //     const userName = user?.name
    //     const userName = user?.email
    //     // post a createUser
    //             //ya tienes el user en db =>
    //             // coges id, y se lo pasa a la ruta
    //             return isAuthenticated ? children : <Navigate to={`${USER}/${user.id}`} />

    // } else {
    //     //si tienes el user creado
    //     // coges id, y se lo pasa a la ruta
    //     return isAuthenticated ? children : <Navigate to={`${USER}/${user.id}`} />


    // }

  return isAuthenticated ? children : <Navigate to={`${USER}/${27}`}/>
//   return isAuthenticated ? children : <Navigate to={USER} />
}

export default PrivateRoutes


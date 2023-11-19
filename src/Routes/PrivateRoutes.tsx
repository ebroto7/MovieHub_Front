import { FC, PropsWithChildren } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom';
import { USER } from './paths';

const PrivateRoutes: FC<PropsWithChildren> = ({ children }) => {

  const { isAuthenticated, isLoading } = useAuth0()


  if (isLoading) return <div>Loading...</div>
  console.log(isAuthenticated)

  return isAuthenticated ? children : <Navigate to={USER} />
}

export default PrivateRoutes


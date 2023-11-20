import { useAuth0 } from '@auth0/auth0-react'
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useUserContext } from '../../context/userContext/UserContext';

const LoginLogoutButton = () => {
    const {} = useUserContext()
    const { loginWithPopup, logout, isLoading, isAuthenticated } = useAuth0()
  
    if (isLoading) return <h1>Loading...</h1>
  
    const login = async () => {
        await loginWithPopup()
        if (isLoading) return <h1>Loading...</h1>
    }

    return (<>

        {!isAuthenticated
            ? <MenuItem key={"login"} onClick={login}>
                <Typography textAlign="center">{"Login"}</Typography>
            </MenuItem>
            : <MenuItem key={"Logout"} onClick={() => logout()}>
                <Typography textAlign="center">{"Logout"}</Typography>
            </MenuItem>
        }
    </>
    )
}

export default LoginLogoutButton
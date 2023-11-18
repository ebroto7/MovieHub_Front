import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { USER } from '../../Routes/paths'


const LoginLogoutButton = () => {
    const Navigate = useNavigate()

    const { loginWithPopup, logout, isLoading, user, isAuthenticated } = useAuth0()
    const [isAuth, setIsAuth] = useState<boolean>(false)
    useEffect(() => {
        setIsAuth(isAuthenticated)
    }, [isAuthenticated])

    if (isLoading) return <h1>Loading...</h1>
    console.log(user)
    console.log(isAuthenticated)

    const login = async () => {
        await loginWithPopup()
        if (isLoading) return <h1>Loading...</h1>

        Navigate(USER + `/${user?.name}`)
        // Navigate(USER + `/wevwe`)
    }

    return (<>

        {!isAuth
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
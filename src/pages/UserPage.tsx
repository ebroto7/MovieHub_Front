import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext/UserContext'
import { UserType } from '../types/user.interface'
import UserVerticalTabs from '../components/verticalTabs/userVerticalTabs'
import { Movie } from '@mui/icons-material'


const UserPage = () => {
    const { userLoged } = useUserContext()
    const [userInfo, setUserInfo] = useState<UserType>(userLoged)
    useEffect(() => {
        setUserInfo(userLoged)
        console.log("userPage: ", userInfo)

    }, [userLoged])
    return (
        <>
            <div>{userInfo.name}</div>
            {userInfo.movies
                ? userInfo.movies.map((movie) => {
                    <div>{movie.title}</div>
                })

                : <p>NO movies</p>
            }
            <UserVerticalTabs {...userInfo} />
        </>
    )
}

export default UserPage
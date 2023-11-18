import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext/UserContext'
import { UserType } from '../types/user.interface'
import UserVerticalTabs from '../components/verticalTabs/userVerticalTabs'


const UserPage = () => {
    const { userLoged } = useUserContext()
    const [userInfo, setUserInfo] = useState<UserType>(userLoged)
    useEffect(() => {
        setUserInfo(userLoged)
    }, [userLoged])

    return (
        <>
        <div>{userInfo.name}</div>

        <UserVerticalTabs {...userInfo}/>
        </>
    )
}

export default UserPage
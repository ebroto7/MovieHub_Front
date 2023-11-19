import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext/UserContext'
import { UserType } from '../types/user.interface'
import UserVerticalTabs from '../components/verticalTabs/userVerticalTabs'
import { MovieType } from '../types/movie.interface'

const hardcodedMovie: MovieType = {
    title: "Interestellar",
    description: "Un grupo de científicos y exploradores, encabezados por Cooper, se embarcan en un viaje espacial para encontrar un lugar con las condiciones necesarias para reemplazar a la Tierra y comenzar una nueva vida allí.",
    genreId: "Fiction",
    year: 2014,
    duration: 169,
    rated: 7.9,
    userId: 234
}

const DetailPage = () => {
    const { userLoged } = useUserContext()
    const [userInfo, setUserInfo] = useState<UserType>(userLoged)
    useEffect(() => {
        setUserInfo(userLoged)
    }, [userLoged])

    return (
        <>
            <h1>{hardcodedMovie.title}</h1>
        </>
    )
}

export default DetailPage
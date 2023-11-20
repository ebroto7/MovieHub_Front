import { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext/UserContext'
import { useMovieContext } from '../context/moviesContext/MoviesContext'
import { UserType } from '../types/user.interface'
import UserVerticalTabs from '../components/verticalTabs/userVerticalTabs'


const UserPage = () => {
    const { userLoged } = useUserContext()
    const {getAllMoviesByUserId, userMovies} = useMovieContext()
    const [userInfo, setUserInfo] = useState<UserType>(userLoged)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setUserInfo(userLoged)
        console.log("userPage: ", userInfo)
    }, [userLoged])

    // useEffect(() => {
    //     const loadData = async () => {
    //         await getAllMoviesByUserId(userLoged.id);
    //         setLoading(false);
    //     };
      
    //     if (userMovies.length === 0) {
    //         loadData();
    //     }
    // },[getAllMoviesByUserId, userMovies])

   
    return (
        <>
            {(userMovies.length >0)
                ? userMovies.map((movie) => {
                    <div>{movie.title}</div>
                })

                : <p>NO movies </p>
            }
            
            <UserVerticalTabs {...userInfo} />
        </>
    )
}

export default UserPage
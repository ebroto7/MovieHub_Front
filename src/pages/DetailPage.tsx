import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUserContext } from '../context/userContext/UserContext'
import { UserType } from '../types/user.interface'
import UserVerticalTabs from '../components/verticalTabs/userVerticalTabs'
import { MovieType } from '../types/movie.interface'
import { Button, Card, CardActionArea, CardContent, CardMedia, Rating, TextField, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

import poster from "../assets/img/defaultMoviePoster.png"
import { useMovieContext } from '../context/moviesContext/MoviesContext'


const hardcodedMovie: MovieType = {
    title: "Interestellar",
    description: "Un grupo de científicos y exploradores, encabezados por Cooper, se embarcan en un viaje espacial para encontrar un lugar con las condiciones necesarias para reemplazar a la Tierra y comenzar una nueva vida allí.",
    genreId: "Fiction",
    year: 2014,
    duration: 169,
    rated: 4,
    userId: 8,
    comments: ["I like this movie", "can't be better"]
}

const DetailPage = () => {
    const { movieId: movieId } = useParams<{ movieId: string }>()
    const { updateMovie } = useMovieContext()

    const { userLoged } = useUserContext()
    const [userInfo, setUserInfo] = useState<UserType>(userLoged)

    const [comment, setComents] = useState<string>('')
    const [isValidForm, setIsValidForm] = useState<boolean>(false)
    const [isValidMessage, setIsValidMessage] = useState<string>("")


    useEffect(() => {
        setUserInfo(userLoged)
    }, [userLoged])

    useEffect(() => {
        validateForm()
    }, [comment])


    const HandleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault()
        validateForm()

        const addedComent: string[] = [...hardcodedMovie.comments!, comment]

        if (isValidForm) {
            const newMovie: MovieType = {
                title: "Interestellar",
                description: "Un grupo de científicos y exploradores, encabezados por Cooper, se embarcan en un viaje espacial para encontrar un lugar con las condiciones necesarias para reemplazar a la Tierra y comenzar una nueva vida allí.",
                genreId: "Fiction",
                year: 2014,
                duration: 169,
                rated: 4,
                userId: 8,
                comments: addedComent,
            }

            updateMovie(newMovie)
        }

    }

    const validateForm = () => {

        let message: string = "Please enter valid comment. "
        setIsValidMessage(message)

        let validate = true
        if (comment.length < 3) {
            validate = false
            message = message + " must be more than 3 characters. "
        }

        setIsValidMessage("")
        setIsValidForm(validate)
    }

    return (
        <>
            <h1>{hardcodedMovie.title}</h1>


            <Card sx={{ maxWidth: 900, minWidth: 500 }}>
                {/* <Card > */}

                <CardActionArea sx={{ display: 'flex', flexDirection: "row" }}>
                    {(hardcodedMovie.poster != null) ? <CardMedia
                        sx={{ maxWidth: 300, minWidth: 200 }}
                        component="img"
                        height={hardcodedMovie.poster}
                        alt={`${hardcodedMovie.title} poster`}
                    />
                        : <CardMedia
                            sx={{ maxWidth: 300, minWidth: 200 }}
                            component="img"
                            src={poster}
                            alt={`${hardcodedMovie.title} poster`}
                        />
                    }
                    <CardContent
                        sx={{ maxWidth: 600, minWidth: 300 }}
                    >
                        <Typography gutterBottom variant="h5" component="div">
                            {hardcodedMovie.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {hardcodedMovie.description}
                        </Typography>
                        <Rating name="half-rating-read" defaultValue={hardcodedMovie.rated} precision={0.5} readOnly />
                        <Typography variant="body2" color="text.secondary">
                            {hardcodedMovie.genreId}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <form className='detailMovie_Form' onSubmit={HandleSubmit} >
                <TextField id="comment" label="Comment" variant="standard"
                          helperText={isValidMessage}

                sx={{ maxWidth: 600, minWidth: 300 }}
                    multiline maxRows={4}
                    onChange={ev => setComents( ev.target.value)}
                />
                <br />
                {isValidForm
                    ? <Button variant="contained" endIcon={<SendIcon />} type="submit">Submit</Button>
                    : <Button variant="outlined" endIcon={<SendIcon />} type="submit" disabled>Submit</Button>
                }
            </form>

            {hardcodedMovie.comments && hardcodedMovie.comments.map((comment) => {
                <p>comment: {comment}</p>
            })}
            <p>comment: {hardcodedMovie.comments![0]}</p>
            <p>comment: {hardcodedMovie.comments![1]}</p>

        </>
    )
}

export default DetailPage
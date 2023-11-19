import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Rating, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { useGenreContext } from '../../context/genreContext/genreContext';
import { useMovieContext } from '../../context/moviesContext/MoviesContext';
import { MovieType } from '../../types/movie.interface';

import { useUserContext } from '../../context/userContext/UserContext';

type GenreForm = {
    value: string | number
    label: string
}

const MovieForm = () => {
    const { createMovie } = useMovieContext()
    const { apiGenres } = useGenreContext()

    const { userLoged } = useUserContext()

    const genreItems = () => {
        const genres: GenreForm[] = []
        apiGenres.map((genre) => {
            const newGenre: GenreForm = {
                value: genre.id,
                label: genre.name
            }
            genres.push(newGenre)
        }
        )
        return genres
    }

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [genre, setGenre] = useState<number | string>(0)
    const [year, setYear] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [director, setDirector] = useState<string>("")
    const [stars, setStars] = useState<string>("")
    const [comments, setComents] = useState<string>("")
    const [poster, setPoster] = useState<string>("")
    const [rating, setRating] = useState<number>(0)

    const [isValidForm, setIsValidForm] = useState<boolean>(false)
    const [isValidMessage, setIsValidMessage] = useState<string>("")

    useEffect(() => {
        validateForm()
    }, [title, description, year, duration])

    const HandleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault()
        validateForm()

        if (isValidForm) {
            const newMovie: MovieType = {
                title: title,
                description: description,
                genreId: genre,
                year: year,
                duration: duration,
                director: director,
                stars: [stars],
                comments: [comments],
                userId: userLoged.id,
                rated: rating,
                poster: poster
            }

            console.log("movie form: ", newMovie)
            createMovie(newMovie)
        }

    }

    const validateForm = () => {

        let message: string = "Please check required fields. "

        let validate = true
        if (title.length < 3) {
            validate = false
            message = message + "The movie title must be more than 3 characters. "
        }
        if (description.length < 3) {
            validate = false
            message = message + "The movie description must be more than 3 characters. "
        }
        if (year < 1900 || year > 2025) {
            validate = false
            message = message + "The year of the film must be between 1900 and the current date. "
        }
        if (duration < 1) {
            validate = false
            message = message + "you must indicate a duration greater than 1min. "
        }
        console.log("validate form function ", validate)
        console.log("validate form function ", isValidMessage)

        setIsValidMessage(message)
        setIsValidForm(validate)
    }


    return (<>
        <form onSubmit={HandleSubmit}>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '45%' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="movie-title" label="Movie title" variant="standard" required
                    onChange={ev => setTitle(ev.target.value)}
                />


                <TextField
                    id="outlined-select-currency"
                    select
                    label="Genre"
                    defaultValue={1}
                    value={1}

                    onChange={ev => setGenre(ev.target.value)}

                    required
                >
                    {genreItems().map((genre) => (
                        <MenuItem key={genre.value} value={genre.value}>
                            {genre.label}
                        </MenuItem>
                    ))}
                </TextField>
                <br />
                <TextField id="year" label="year" variant="standard" type="number" required
                    onChange={ev => setYear(Number(ev.target.value))}

                />
                <TextField id="duration" label="Duration (minutes)" type="number" variant="standard"
                    onChange={ev => setDuration(Number(ev.target.value))}

                />
                <br />
                <TextField id="director" label="Director" variant="standard"
                    onChange={ev => setDirector(ev.target.value)}
                />
                <br />
                <TextField id="stars" label="Stars" variant="standard"
                    onChange={ev => { (ev.target.value != "") && setStars(ev.target.value) }}

                />
            </Box>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '92%' },
                }}
                noValidate
                autoComplete="off"
            >

                <TextField id="Description" label="Description" variant="standard" fullWidth multiline maxRows={4} required
                    onChange={ev => setDescription(ev.target.value)}
                />
            </Box>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '120px' },
                }}
                noValidate
                autoComplete="off"

            >
                <Rating name="half-rating" defaultValue={0} precision={0.5}
                    onChange={(event, newValue) => {
                        { newValue && setRating(newValue); }
                    }} />
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '92%' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="poster" label="Poster (url)" variant="standard" fullWidth multiline maxRows={4}
                    onChange={ev => setPoster(ev.target.value)}
                />
                <TextField id="comment" label="Comment" variant="standard" fullWidth multiline maxRows={4}
                    onChange={ev => setComents(ev.target.value)}
                />

            </Box>

            {isValidForm ?
                <Button variant="contained" endIcon={<SendIcon />} type="submit">Submit</Button>
                : <Button variant="outlined" endIcon={<SendIcon />} type="submit" disabled>Submit</Button>}
        </form>
        {!isValidForm && <p>{isValidMessage}</p>}
    </>
    );
}

export default MovieForm

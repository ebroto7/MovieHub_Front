import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, Input, FormHelperText, InputLabel, Rating } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { useMovieContext } from '../../context/moviesContext/MoviesContext';
import { MovieType } from '../../types/movie.interface';
import { GenreType } from '../../types/genre.interface';
import { useParams } from 'react-router-dom';

const MovieForm = () => {
    const { createMovie } = useMovieContext()
    const { userId } = useParams<{ userId: string }>()

    const userLogedId = () => {
        console.log("movie form param userid", userId)
        if (userId) return userId
        return "0"
    }

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [genre, setGenre] = useState()
    const [year, setYear] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [director, setDirector] = useState<string>("")
    const [stars, setStars] = useState<string>("")
    const [comments, setComents] = useState<string>("")
    const [poster, setPoster] = useState<string>("")

    const HandleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault()

        const newMovie: MovieType = {
            title: title,
            description: description,
            // genre: "",
            year: year,
            duration: duration,
            director: director,
            stars: [stars],
            comments: [comments],
            genreId: 1,
            userId: userLogedId()
        }

        createMovie(newMovie)
    }


    return (<>
        <form onSubmit={HandleSubmit}>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '33ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="movie-title" label="Movie title" variant="standard" required
                    onChange={ev => setTitle(ev.target.value)}
                />
                <br />
                <br />
                <TextField id="genre" label="Genre" variant="standard" select required
                // onChange={ev => setGenre(ev.target.value)}
                />
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
                    onChange={ev => setStars(ev.target.value)}

                />
            </Box>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '68ch' },
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
                <Rating name="half-rating" defaultValue={0} precision={0.5} />
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '68ch' },
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

            <Button variant="contained" endIcon={<SendIcon />} type="submit">Submit</Button>
        </form>
    </>
    );
}

export default MovieForm


// title       String @unique
// description String @unique
// year        String

// director String?
// stars    String?
// duration String?
// rated    String?
// poster   String?  @unique
// comments String[]

// genreId Int? 
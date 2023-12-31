import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { MovieType } from '../../types/movie.interface';

import poster from "../../assets/img/defaultMoviePoster.png"

const MovieCard: FC<MovieType> = (movie) => {

  const Navigate = useNavigate()

  function handleClick() {
    console.log("hello world from movie card click")
    Navigate(`/movie/${movie.id}`)
  }
  console.log("moviecard", movie)
  return (
    <Card onClick={handleClick} sx={{ maxWidth: 300, minWidth: 200 }}>
      <CardActionArea>
        {(movie.poster != null) ? <CardMedia
        // sx={{maxHeight=}}
          component="img"
          height={movie.poster}
          alt={`${movie.title} poster`}
        />
          : <CardMedia
            component="img"
            src={poster}
            alt={`${movie.title} poster`}
          />
        }
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard
import {FC} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { MovieType } from '../../types/movie.interface';

function handleClick() {
  console.log("hello world from movie card click")
}

const MovieCard: FC<MovieType> = (movie) => {
  console.log("moviecard", movie )
  return (
    <Card onClick={handleClick} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={movie.poster}
          alt={`${movie.title} poster`}
        />
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

export default  MovieCard
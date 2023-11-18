import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MovieCard from '../movieCard/MovieCard';
import { GenreType } from '../../types/genre.interface';
import { UserType } from '../../types/user.interface';
import { FC } from 'react';


const MovieGrid: FC<GenreType | UserType> = (movieList) => {

  const movies = movieList.movies
  console.log("movigrid ",movieList.name,movies)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            {movies && <MovieCard {...movies[0]}/>}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MovieGrid
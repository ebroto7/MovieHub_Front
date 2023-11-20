import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MovieCard from '../movieCard/MovieCard';

import { FC } from 'react';
import { MovieType } from '../../types/movie.interface';


const AllMoviesGrid: FC<MovieType[]> = (movieList) => {

  const movies: MovieType[] | undefined = movieList
  if (movies === undefined) return <p>Loading</p>
  return (
    <>
      {(movies.length != 0)
        ? <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {/* {Array.from(Array(6)).map((_, index) => ( */}
              {movies.map((movie, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  {movies ? <MovieCard key={movie.id} {...movie}/> : <p>no movies</p> }
                </Grid>
              ))}
            </Grid>
          </Box>

        : <p>no movies</p>}
    </>
  );

}

export default AllMoviesGrid
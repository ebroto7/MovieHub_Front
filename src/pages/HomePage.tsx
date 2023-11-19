import { useState } from 'react';
import VerticalTabs from '../components/verticalTabs/VerticalTabs';

import { useGenreContext } from '../context/genreContext/genreContext';
import { useMovieContext } from '../context/moviesContext/MoviesContext';
// let genres = ["fiction", "science", "sports", "thriller"]

const HomePage = () => {
  const { allMovies } = useMovieContext()

  const { apiGenres, apiError } = useGenreContext()
  console.log("home getAllGenres ", apiGenres)

 

  return (
    <>
      {/* {allMovies
        ? allMovies.map((movie) => (
          <p>{movie.title}</p>
        ))
        : <p>no movies dowloaded</p>} */}
        {apiError && <h3>Sorry, API error. Can't load movies</h3>}
      <VerticalTabs genres={apiGenres} />
    </>
  )
}

export default  HomePage 
import { useState } from 'react';
import VerticalTabs from '../components/verticalTabs/VerticalTabs';

import { useGenreContext } from '../context/genreContext/genreContext';
import { useMovieContext } from '../context/moviesContext/MoviesContext';
useMovieContext
// let genres = ["fiction", "science", "sports", "thriller"]

export const HomePage = () => {
  // const { allMovies } = useMovieContext()

  const { apiGenres, apiError } = useGenreContext()
  console.log("home getAllGenres ", apiGenres)

  // console.log("home: allmovies => ", allMovies)

  // const { cartItems } = bookContext()
  // const [cartNumber, setCartNumber] = useState<number>()


  // useEffect(() => {
  //   localStorage.getItem('books')
  //   setCartNumber(cartItems.length)
  // }, [cartNumber, cartItems])

  return (
    <>
      {/* {allMovies
        ? allMovies.map((movie) => (
          <p>{movie.title}</p>
        ))
        : <p>no movies dowloaded</p>} */}
      <VerticalTabs genres={apiGenres} />
    </>
  )
}

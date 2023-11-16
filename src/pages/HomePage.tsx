import { useState } from 'react';
import VerticalTabs from '../components/verticalTabs/VerticalTabs';

import { APIGenreContext, genreContext } from '../context/genreContext';

let genres = ["fiction", "science", "sports", "thriller"]

export const HomePage = () => {



  const { apiGenres, apiError } = genreContext()
  console.log("home getAllGenres ",apiGenres)


  // const { cartItems } = bookContext()
  // const [cartNumber, setCartNumber] = useState<number>()


  // useEffect(() => {
  //   localStorage.getItem('books')
  //   setCartNumber(cartItems.length)
  // }, [cartNumber, cartItems])

  return (
    <>
      <VerticalTabs genres={apiGenres}/>
    </>
  )
}

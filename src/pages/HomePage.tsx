import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/footer/Footer'




export const HomePage = () => {

  // const { apiBooks, apiError } = apiContext()


  // const { cartItems } = bookContext()
  // const [cartNumber, setCartNumber] = useState<number>()


  // useEffect(() => {
  //   localStorage.getItem('books')
  //   setCartNumber(cartItems.length)
  // }, [cartNumber, cartItems])




  return (
    <>
      <Navbar />
      <h1>Movie hub Frontend</h1>
      <Footer />
    </>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/footer/Footer'

import * as React from 'react';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

import VerticalTabs from '../components/verticalTabs/VerticalTabs';

export const HomePage = () => {

  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  // const { apiBooks, apiError } = apiContext()


  // const { cartItems } = bookContext()
  // const [cartNumber, setCartNumber] = useState<number>()


  // useEffect(() => {
  //   localStorage.getItem('books')
  //   setCartNumber(cartItems.length)
  // }, [cartNumber, cartItems])




  return (
    <>
      <h1>Movie hub Frontend</h1>
      <Button variant="contained">Hello world</Button>
      <ToggleButtonGroup

        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="web">Web</ToggleButton>
        <ToggleButton value="android">Android</ToggleButton>
        <ToggleButton value="ios">iOS</ToggleButton>
      </ToggleButtonGroup>

      <VerticalTabs></VerticalTabs>
    </>
  )
}

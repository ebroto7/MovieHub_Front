
import VerticalTabs from '../components/verticalTabs/VerticalTabs';

let genres = ["fiction", "science", "sports", "thriller"]

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
      <VerticalTabs genres={genres}/>
    </>
  )
}

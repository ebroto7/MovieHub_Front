import VerticalTabs from '../components/verticalTabs/VerticalTabs';

import { useGenreContext } from '../context/genreContext/genreContext';

const HomePage = () => {
  const { apiGenres, apiError } = useGenreContext()

  return (
    <>
        {apiError && <h3>Sorry, API error. Can't load movies</h3>}
      <VerticalTabs genres={apiGenres} />
    </>
  )
}

export default  HomePage 
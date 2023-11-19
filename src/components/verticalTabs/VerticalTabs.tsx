import { FC, useState, SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MovieGrid from '../movieGrid/MovieGrid';
import { GenreType } from '../../types/genre.interface';

import { useMovieContext } from '../../context/moviesContext/MoviesContext';
import AllMoviesGrid from '../movieGrid/AllMoviesGrid';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number | string;
  value: number;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number | string) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


type props = {
  genres: GenreType[]
}

const VerticalTabs: FC<props> = ({ genres }) => {
  const { allMovies } = useMovieContext()
  const [value, setValue] = useState(0);
  console.log("home page allmovies ", allMovies)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: 120 }}
      >
        <Tab key={"allMovies"} label={"All movies"} {...a11yProps(0)} />

        {genres.map((genre, index) => (
          <Tab key={genre.id} label={`${genre.name}`} {...a11yProps(index)} />
        ))}

      </Tabs>
      <TabPanel value={value} index={0}>
        {/* {(allMovies.length != 0) ? <AllMoviesGrid {...allMovies} /> : <p>NO MOVIES DOWNLOADED</p>} */}


      </TabPanel>
      {genres.map((genre, index) => (
        <TabPanel value={value} index={index + 1}>

          <p>movies: {genre.movies?.length}</p>
          <MovieGrid {...genre} />
        </TabPanel>
      ))}
    </Box>
  );
}


export default VerticalTabs
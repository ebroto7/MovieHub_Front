import { FC, useState, SyntheticEvent, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MovieGrid from '../movieGrid/MovieGrid';
import { GenreType } from '../../types/genre.interface';

import { useMovieContext } from '../../context/moviesContext/MoviesContext';
import { Grid } from '@mui/material';
import MovieCard from '../movieCard/MovieCard';


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
  const { allMovies, getAllMovies } = useMovieContext()
  const [loading, setLoading] = useState(true);

  const [value, setValue] = useState(0);
  console.log("VerticalTabs allmovies ", allMovies)

  useEffect(() => {
    const loadData = async () => {
      await getAllMovies();
      setLoading(false);
  };

  if (allMovies.length === 0) {
      loadData();
  }
  }, [allMovies, getAllMovies])


  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      key={"123"}
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
      <TabPanel key={"asd"} value={value} index={0}>



        {(allMovies.length != 0)
          ? <Box key={"wev"} sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {allMovies.map((movie, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <MovieCard key={movie.id} {...movie} />
                </Grid>
              ))}
            </Grid>
          </Box>

          : <p>no movies</p>}








      </TabPanel>
      {genres.map((genre, index) => (
        <TabPanel key={"qwe"} value={value} index={index + 1}>

          <p>movies: {genre.movies?.length}</p>
          <MovieGrid {...genre} />
        </TabPanel>
      ))}
    </Box>
  );
}


export default VerticalTabs
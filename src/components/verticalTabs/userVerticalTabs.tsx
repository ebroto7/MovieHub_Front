import { FC, useState, SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MovieGrid from '../movieGrid/MovieGrid';
import { UserType } from '../../types/user.interface';

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
    user: UserType
}

const UserVerticalTabs: FC<props> = ({ user }) => {
    const [value, setValue] = useState(0);

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
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                
                    <Tab key={0} label={"Welcome"} {...a11yProps(0)} />
                    <Tab key={0} label={"Movies"} {...a11yProps(1)} />
                    <Tab key={0} label={"new Movie"} {...a11yProps(2)} />
               

            </Tabs>
            {/* {genres.map((genre) => (
        <TabPanel value={value} index={0}>
          {genre.name}
        </TabPanel>
      ))} */}
            <TabPanel value={value} index={0}>
        <h3>Welcome to user info</h3>
        <h3>where you can see, edit and create your own movie cards </h3>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MovieGrid {...user} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>

        </Box>
    );
}


export default UserVerticalTabs
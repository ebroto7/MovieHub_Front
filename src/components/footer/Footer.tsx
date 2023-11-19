import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/ebroto7/MovieHub_Front.git">
        MovieHub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function CreateBy() {
  return (
    <Typography variant="body1" color="text">
      {'A website created by '}
      <Link color="inherit" href="www.linkedin.com/in/ebroto">
        Enric Broto <LinkedInIcon />
      </Link>{' '}
      {'.'}
      

    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Footer() {
  return (
    // <ThemeProvider theme={defaultTheme}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <CreateBy />
          <Copyright />
        </Container>
      </Box>
    </Box>
    //  </ThemeProvider>
  );
}
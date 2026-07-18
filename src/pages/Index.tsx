import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import muiTheme from '../theme/muiTheme';
import Portfolio from '../components/Portfolio/Portfolio';

const Index: React.FC = () => (
  <ThemeProvider theme={muiTheme}>
    <CssBaseline />
    <Portfolio />
  </ThemeProvider>
);

export default Index;

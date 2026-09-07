import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import muiTheme from '../theme/muiTheme';
import Portfolio from '../components/Portfolio/Portfolio';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const Index: React.FC = () => {
  useSmoothScroll();

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Portfolio />
    </ThemeProvider>
  );
};

export default Index;

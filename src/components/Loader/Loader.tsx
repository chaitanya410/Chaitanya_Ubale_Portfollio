import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Loading...' }) => {
  return (
    <Fade in timeout={300}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 6,
          gap: 2,
        }}
      >
        <CircularProgress 
          size={48} 
          thickness={4}
          sx={{
            color: 'primary.main',
          }}
        />
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </Box>
    </Fade>
  );
};

export default Loader;

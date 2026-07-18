import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const DateContainer: React.FC = () => {
  const today = new Date();
  const day = today.toLocaleDateString('en-IN', { weekday: 'short' });
  const date = today.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1.5,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid',
        borderColor: 'rgba(15, 23, 42, 0.08)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CalendarTodayIcon sx={{ fontSize: 16, color: 'white' }} />
      </Box>
      <Stack spacing={-0.5}>
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ 
            fontWeight: 600, 
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontSize: '0.65rem',
          }}
        >
          {day}
        </Typography>
        <Typography variant="body2" fontWeight={700} color="text.primary">
          {date}
        </Typography>
      </Stack>
    </Box>
  );
};

export default DateContainer;

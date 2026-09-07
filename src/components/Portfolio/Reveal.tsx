import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO, viewportOnce } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface RevealProps extends BoxProps {
  /** Delay before the reveal starts, in milliseconds (kept for call-site compatibility). */
  delay?: number;
  /** Distance in pixels the content travels up into place. */
  y?: number;
}

/**
 * Scroll-triggered fade/rise. Thin wrapper over `motion.div` so existing
 * call sites (`<Reveal delay={200} y={60}>`) keep working unchanged.
 */
const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 40, sx, ...rest }) => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <Box sx={sx} {...rest}>
        {children}
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: delay / 1000 }}
      sx={sx}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Reveal;

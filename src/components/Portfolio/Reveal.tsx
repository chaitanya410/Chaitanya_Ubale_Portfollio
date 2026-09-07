import React, { useEffect, useRef, useState } from 'react';
import { Box, BoxProps } from '@mui/material';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface RevealProps extends BoxProps {
  delay?: number;
  y?: number;
}

const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 40, sx, ...rest }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion]);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: reducedMotion || visible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: reducedMotion
          ? 'none'
          : `opacity 1.1s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 1.1s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        willChange: reducedMotion ? 'auto' : 'opacity, transform',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Reveal;

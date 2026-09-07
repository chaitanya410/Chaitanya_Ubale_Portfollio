import React, { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type MagneticButtonProps = ButtonProps & {
  /** Fraction of the cursor offset the button follows (0–1). */
  strength?: number;
  /** Passthrough for anchor rendering (`component="a"`). */
  href?: string;
  download?: string;
  target?: string;
  rel?: string;
  component?: React.ElementType;
};

/** MUI Button that drifts toward the cursor on fine pointers; inert on touch / reduced-motion. */
const MagneticButton: React.FC<MagneticButtonProps> = ({ strength = 0.3, children, ...buttonProps }) => {
  const reducedMotion = useReducedMotion();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.35 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.35 });

  const [finePointer, setFinePointer] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const btn = (
    <Button {...(buttonProps as ButtonProps)}>{children}</Button>
  );

  if (reducedMotion || !finePointer) return btn;

  const handleMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Box
      component={motion.span}
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y, display: "inline-flex" }}
    >
      {btn}
    </Box>
  );
};

export default MagneticButton;

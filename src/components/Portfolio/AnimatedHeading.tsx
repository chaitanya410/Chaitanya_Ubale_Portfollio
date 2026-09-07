import React from "react";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { motion } from "framer-motion";
import { maskChild, staggerContainer, viewportOnce } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { palette } from "../../theme/palette";

const { gold: GOLD } = palette;

/** A run of heading text. `{ accent }` renders gold + italic. */
export type HeadingPart = string | { accent: string };

interface Token {
  word: string;
  accent: boolean;
  breakBefore: boolean;
}

const MOTION_TAG = {
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
} as const;

interface AnimatedHeadingProps {
  parts: HeadingPart[];
  component?: keyof typeof MOTION_TAG;
  sx?: SxProps<Theme>;
  /** Seconds between each word. */
  stagger?: number;
}

const tokenize = (parts: HeadingPart[]): Token[] => {
  const tokens: Token[] = [];
  parts.forEach((part) => {
    const isAccent = typeof part !== "string";
    const raw = typeof part === "string" ? part : part.accent;
    raw.split("\n").forEach((line, lineIndex) => {
      line
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word, wordIndex) => {
          tokens.push({ word, accent: isAccent, breakBefore: lineIndex > 0 && wordIndex === 0 });
        });
    });
  });
  return tokens;
};

const accentSx = { color: GOLD, fontStyle: "italic" } as const;

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ parts, component = "h2", sx, stagger = 0.055 }) => {
  const reducedMotion = useReducedMotion();
  const tokens = tokenize(parts);
  const MotionTag = MOTION_TAG[component];

  if (reducedMotion) {
    return (
      <Box component={component} sx={{ m: 0, ...sx }}>
        {tokens.map((t, i) => (
          <React.Fragment key={i}>
            {t.breakBefore && <br />}
            <Box component="span" sx={t.accent ? accentSx : undefined}>
              {t.word}
              {i < tokens.length - 1 ? " " : ""}
            </Box>
          </React.Fragment>
        ))}
      </Box>
    );
  }

  return (
    <Box
      component={MotionTag}
      variants={staggerContainer(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      sx={{ m: 0, ...sx }}
    >
      {tokens.map((t, i) => (
        <React.Fragment key={i}>
          {t.breakBefore && <br />}
          <Box
            component="span"
            sx={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
              pb: "0.16em",
              mb: "-0.16em",
            }}
          >
            <Box
              component={motion.span}
              variants={maskChild}
              sx={{ display: "inline-block", willChange: "transform", ...(t.accent ? accentSx : {}) }}
            >
              {t.word}
              {i < tokens.length - 1 ? " " : ""}
            </Box>
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default AnimatedHeading;

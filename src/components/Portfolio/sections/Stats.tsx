import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Reveal from "../Reveal";
import { STATS, type Stat } from "../../../content/portfolio";
import { formatStat } from "../../../lib/formatStat";
import { palette, hexToRgba } from "../../../theme/palette";
import { useCountUp } from "../../../hooks/useCountUp";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const { gold: GOLD } = palette;

const StatItem: React.FC<{ stat: Stat; active: boolean; animate: boolean; index: number }> = ({
  stat,
  active,
  animate,
  index,
}) => {
  const current = useCountUp(stat.value, { active, animate });
  return (
    <Grid size={{ xs: 6, md: 3 }}>
      <Reveal delay={index * 100}>
        <Box sx={{ textAlign: { xs: "left", md: "center" } }}>
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.75rem" },
              fontWeight: 600,
              color: GOLD,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatStat(current, { prefix: stat.prefix, suffix: stat.suffix, format: stat.format })}
          </Typography>
          <Typography variant="caption" sx={{ mt: 1, display: "block", color: "rgba(238,238,238,0.6)" }}>
            {stat.label}
          </Typography>
        </Box>
      </Reveal>
    </Grid>
  );
};

const Stats: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 3, md: 8 },
        borderTop: `1px solid ${hexToRgba(GOLD, 0.1)}`,
        borderBottom: `1px solid ${hexToRgba(GOLD, 0.1)}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 3 }}>
          {STATS.map((s, i) => (
            <StatItem key={s.label} stat={s} index={i} active={inView} animate={!reducedMotion} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Stats;

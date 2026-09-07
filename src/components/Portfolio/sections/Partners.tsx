import React from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Reveal from "../Reveal";
import AnimatedHeading from "../AnimatedHeading";
import SectionLabel from "../SectionLabel";
import { BANKING_PARTNERS } from "../../../content/portfolio";
import { palette, hexToRgba } from "../../../theme/palette";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const { gold: GOLD, obsidian: OBSIDIAN, surface: SURFACE } = palette;

const LogoRibbon: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const logos = BANKING_PARTNERS.map((b) => ({ name: b.name, logo: b.logo }));
  const sequence = reducedMotion ? logos : [...logos, ...logos];

  return (
    <Box
      aria-hidden
      sx={{
        position: "relative",
        overflow: "hidden",
        my: { xs: 6, md: 9 },
        py: 3,
        borderTop: `1px solid ${hexToRgba(GOLD, 0.12)}`,
        borderBottom: `1px solid ${hexToRgba(GOLD, 0.12)}`,
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 6, md: 10 },
          width: reducedMotion ? "100%" : "max-content",
          flexWrap: reducedMotion ? "wrap" : "nowrap",
          justifyContent: reducedMotion ? "center" : "flex-start",
          animation: reducedMotion ? "none" : "partnerRibbon 24s linear infinite",
          "&:hover": { animationPlayState: "paused" },
          "@keyframes partnerRibbon": { to: { transform: "translateX(-50%)" } },
        }}
      >
        {sequence.map((l, i) => (
          <Box
            key={`${l.name}-${i}`}
            component="img"
            src={l.logo}
            alt=""
            loading="lazy"
            sx={{
              height: { xs: 30, md: 40 },
              width: "auto",
              flexShrink: 0,
              objectFit: "contain",
              filter: "grayscale(1) brightness(1.6) opacity(0.55)",
              transition: "filter .4s ease, opacity .4s ease",
              "&:hover": { filter: "grayscale(0) opacity(1)" },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const Partners: React.FC = () => {
  const reducedMotion = useReducedMotion();

  return (
    <Box id="partners" sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 }, background: SURFACE }}>
      <Container maxWidth="lg">
        <Reveal>
          <SectionLabel index="03" title="Banking Partners" />
        </Reveal>
        <AnimatedHeading
          component="p"
          parts={["Financial infrastructure ", { accent: "built on bank APIs." }]}
          sx={{
            fontSize: { xs: "1.8rem", md: "3rem" },
            fontWeight: 500,
            letterSpacing: "-0.03em",
            mb: { xs: 4, md: 6 },
            maxWidth: 820,
            lineHeight: 1.1,
          }}
        />

        <LogoRibbon />

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {BANKING_PARTNERS.map((bank, i) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={bank.name}>
              <Reveal delay={i * 100}>
                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: "100%",
                    border: `1px solid ${hexToRgba(GOLD, 0.18)}`,
                    background: `linear-gradient(180deg, ${hexToRgba(OBSIDIAN, 0.75)}, ${hexToRgba(OBSIDIAN, 0.96)})`,
                    transition: reducedMotion ? "none" : "all .6s cubic-bezier(.22,1,.36,1)",
                    "&:hover": {
                      borderColor: GOLD,
                      transform: reducedMotion ? "none" : "translateY(-4px)",
                      boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${hexToRgba(GOLD, 0.12)}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 120,
                      border: `1px solid ${hexToRgba(GOLD, 0.12)}`,
                      background: "rgba(255,255,255,0.02)",
                      mb: 3,
                    }}
                  >
                    <Box
                      component="img"
                      src={bank.logo}
                      alt={`${bank.name} logo`}
                      loading="lazy"
                      sx={{
                        maxWidth: "72%",
                        maxHeight: 74,
                        objectFit: "contain",
                        filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.18))",
                      }}
                    />
                  </Box>
                  <Typography
                    component="h3"
                    sx={{ fontSize: "1.45rem", fontWeight: 500, letterSpacing: "-0.015em", lineHeight: 1.2 }}
                  >
                    {bank.name}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2, color: "rgba(238,238,238,0.75)" }}>
                    {bank.description}
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 3 }}>
                    {bank.services.map((service) => (
                      <Box
                        key={service}
                        sx={{
                          px: 1.5,
                          py: 0.6,
                          fontSize: "0.7rem",
                          letterSpacing: "0.05em",
                          color: "rgba(238,238,238,0.8)",
                          border: "1px solid rgba(238,238,238,0.1)",
                        }}
                      >
                        {service}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Partners;

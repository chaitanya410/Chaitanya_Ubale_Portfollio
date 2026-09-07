import React from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Reveal from "../Reveal";
import AnimatedHeading from "../AnimatedHeading";
import SectionLabel from "../SectionLabel";
import ProjectDiagram from "../ProjectDiagram";
import { PROJECTS, type Project } from "../../../content/portfolio";
import { palette, hexToRgba } from "../../../theme/palette";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const { gold: GOLD, surface: SURFACE } = palette;

const StackChips: React.FC<{ items: string[] }> = ({ items }) => (
  <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 3 }}>
    {items.map((s) => (
      <Box
        key={s}
        sx={{
          px: 1.5,
          py: 0.5,
          fontSize: "0.72rem",
          letterSpacing: "0.06em",
          color: "rgba(238,238,238,0.7)",
          border: "1px solid rgba(238,238,238,0.08)",
        }}
      >
        {s}
      </Box>
    ))}
  </Stack>
);

const FeatureRow: React.FC<{ project: Project; flip: boolean }> = ({ project, flip }) => (
  <Grid
    container
    spacing={{ xs: 4, md: 8 }}
    alignItems="center"
    direction={{ xs: "column-reverse", md: flip ? "row-reverse" : "row" }}
  >
    <Grid size={{ xs: 12, md: 6 }}>
      <Reveal y={24}>{project.diagram && <ProjectDiagram variant={project.diagram} title={project.title} />}</Reveal>
    </Grid>
    <Grid size={{ xs: 12, md: 6 }}>
      <Reveal delay={120}>
        <Typography variant="caption" sx={{ color: GOLD }}>
          {project.tag}
        </Typography>
        <Typography
          component="h3"
          sx={{
            mt: 1.5,
            fontSize: { xs: "1.6rem", md: "2.2rem" },
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {project.title}
        </Typography>
        {project.metric && (
          <Stack direction="row" spacing={2.5} sx={{ mt: 3, alignItems: "baseline" }}>
            <Typography sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, fontWeight: 600, color: GOLD, lineHeight: 1 }}>
              {project.metric.value}
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 200 }}>
              {project.metric.label}
            </Typography>
          </Stack>
        )}
        <Typography variant="body1" sx={{ mt: 3 }}>
          {project.desc}
        </Typography>
        <StackChips items={project.stack} />
      </Reveal>
    </Grid>
  </Grid>
);

const Projects: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <Box id="projects" sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 }, background: SURFACE }}>
      <Container maxWidth="lg">
        <Reveal>
          <SectionLabel index="05" title="Technical Projects" />
        </Reveal>
        <AnimatedHeading
          component="p"
          parts={["Selected ", { accent: "case studies." }]}
          sx={{
            fontSize: { xs: "1.8rem", md: "3rem" },
            fontWeight: 500,
            letterSpacing: "-0.03em",
            mb: { xs: 8, md: 12 },
            maxWidth: 820,
            lineHeight: 1.1,
          }}
        />

        <Stack spacing={{ xs: 10, md: 16 }}>
          {featured.map((p, i) => (
            <FeatureRow key={p.title} project={p} flip={i % 2 === 1} />
          ))}
        </Stack>

        <Box sx={{ mt: { xs: 10, md: 16 } }}>
          <Reveal>
            <Typography variant="caption" sx={{ color: GOLD, display: "block", mb: { xs: 3, md: 5 } }}>
              More work
            </Typography>
          </Reveal>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {rest.map((p, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={p.title}>
                <Reveal delay={i * 100}>
                  <Box
                    sx={{
                      p: { xs: 4, md: 5 },
                      height: "100%",
                      border: `1px solid ${hexToRgba(GOLD, 0.18)}`,
                      position: "relative",
                      overflow: "hidden",
                      transition: reducedMotion ? "none" : "all .6s cubic-bezier(.22,1,.36,1)",
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                        opacity: 0,
                        transition: "opacity .5s ease",
                      },
                      "&:hover": {
                        borderColor: GOLD,
                        transform: reducedMotion ? "none" : "translateY(-4px)",
                        boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${hexToRgba(GOLD, 0.12)}`,
                        "&:before": { opacity: 1 },
                      },
                    }}
                  >
                    <Typography variant="caption" sx={{ color: GOLD }}>
                      {p.tag}
                    </Typography>
                    <Typography
                      component="h3"
                      sx={{
                        mt: 2,
                        fontSize: { xs: "1.35rem", md: "1.65rem" },
                        fontWeight: 500,
                        letterSpacing: "-0.015em",
                        lineHeight: 1.2,
                      }}
                    >
                      {p.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2.5 }}>
                      {p.desc}
                    </Typography>
                    <StackChips items={p.stack} />
                  </Box>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;

import React from 'react';
import {
  Box, Container, Typography, Stack, Button, IconButton,
  Grid, Divider,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import Reveal from './Reveal';
import Nav from './sections/Nav';
import Stats from './sections/Stats';
import ContactForm from './sections/ContactForm';
import { palette, hexToRgba } from '../../theme/palette';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { scrollToId } from '../../lib/scroll';
import {
  SKILL_GROUPS, BANKING_PARTNERS, EXPERIENCE, PROJECTS, AWARDS,
  ACTIVITIES, CERTS, EDUCATION, PUBLICATIONS, CONTACT, communityImg,
  type SkillIconKey,
} from '../../content/portfolio';

import heroImg from '../../assets/network-hero.jpg';
import profilePhoto from '../../assets/profile-photo.jpg';

const { gold: GOLD, obsidian: OBSIDIAN, offWhite: OFFWHITE, surface: SURFACE } = palette;

const SKILL_ICONS: Record<SkillIconKey, React.ReactNode> = {
  storage: <StorageOutlinedIcon />,
  code: <CodeOutlinedIcon />,
  cloud: <CloudOutlinedIcon />,
  psychology: <PsychologyOutlinedIcon />,
  'ai-tools': <SmartToyOutlinedIcon />,
};

const SectionLabel: React.FC<{ index: string; title: string }> = ({ index, title }) => (
  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: { xs: 5, md: 8 } }}>
    <Typography variant="caption" sx={{ color: GOLD }}>{index}</Typography>
    <Box sx={{ height: '1px', width: 48, background: hexToRgba(GOLD, 0.5) }} />
    <Typography component="h2" variant="caption" sx={{ color: OFFWHITE, opacity: 0.7, m: 0 }}>{title}</Typography>
  </Stack>
);

const Portfolio: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const go = (id: string) => scrollToId(id, reducedMotion);

  return (
    <Box sx={{ background: OBSIDIAN, color: OFFWHITE, overflowX: 'hidden' }}>
      <Nav />

      {/* HERO */}
      <Box id="hero" sx={{
        minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center',
        px: { xs: 3, md: 8 }, pt: { xs: 14, md: 0 },
        backgroundImage: `linear-gradient(180deg, rgba(11,12,16,0.55) 0%, rgba(11,12,16,0.9) 70%, ${OBSIDIAN} 100%), url(${heroImg})`,
        backgroundSize: 'cover', backgroundPosition: 'center bottom',
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Reveal delay={150}>
                <Typography variant="caption" sx={{ mb: 3, display: 'block' }}>
                  Pune, India — Software Developer
                </Typography>
              </Reveal>
              <Reveal delay={300} y={60}>
                <Typography component="h1" sx={{
                  fontSize: { xs: '2.6rem', sm: '4rem', md: '5.6rem', lg: '6.4rem' },
                  fontWeight: 600, letterSpacing: '-0.045em', lineHeight: 0.98,
                  color: OFFWHITE, mb: { xs: 2, md: 3 },
                }}>
                  Chaitanya
                  <br />
                  <Box component="span" sx={{ color: GOLD, fontStyle: 'italic', fontWeight: 400 }}>
                    Ubale.
                  </Box>
                </Typography>
              </Reveal>
              <Reveal delay={500}>
                <Typography sx={{
                  fontSize: { xs: '1rem', md: '1.3rem' },
                  color: 'rgba(238,238,238,0.78)', fontWeight: 300,
                  maxWidth: 580, lineHeight: 1.55, letterSpacing: '-0.01em',
                }}>
                  Delivering scalable, secure, and highly configurable applications end-to-end.
                </Typography>
              </Reveal>
              <Reveal delay={700}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: { xs: 5, md: 7 } }}>
                  <Button
                    variant="contained"
                    component="a"
                    href={`${import.meta.env.BASE_URL}Chaitanya-Ubale-Resume.pdf`}
                    download="Chaitanya-Ubale-Resume.pdf"
                    endIcon={<FileDownloadOutlinedIcon />}
                  >
                    Download Resume
                  </Button>
                  <Button variant="outlined" onClick={() => go('contact')} endIcon={<ArrowOutwardIcon />}>
                    Get in touch
                  </Button>
                  <Button variant="text" onClick={() => go('projects')}
                    sx={{ color: 'rgba(238,238,238,0.6)', '&:hover': { color: GOLD, background: 'transparent' } }}>
                    View selected work
                  </Button>
                </Stack>
              </Reveal>
            </Grid>

            {/* Circular Photo */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Reveal delay={400}>
                <Box sx={{
                  position: 'relative',
                  width: { xs: 200, sm: 240, md: '100%' },
                  maxWidth: 320,
                  aspectRatio: '1 / 1',
                  mx: { xs: 'auto', md: 0 },
                  ml: { md: 'auto' },
                }}>
                  {/* Outer rotating gold ring */}
                  <Box sx={{
                    position: 'absolute', inset: -14, borderRadius: '50%',
                    background: `conic-gradient(from 0deg, transparent 0deg, ${GOLD} 90deg, transparent 180deg, ${GOLD} 270deg, transparent 360deg)`,
                    opacity: 0.55, filter: 'blur(0.5px)',
                    animation: reducedMotion ? 'none' : 'spin 14s linear infinite',
                    '@keyframes spin': { to: { transform: 'rotate(360deg)' } },
                  }} />
                  {/* Inner mask to create thin ring */}
                  <Box sx={{
                    position: 'absolute', inset: -8, borderRadius: '50%',
                    background: OBSIDIAN,
                  }} />
                  {/* Soft halo glow */}
                  <Box sx={{
                    position: 'absolute', inset: -40, borderRadius: '50%',
                    background: `radial-gradient(circle, ${hexToRgba(GOLD, 0.28)} 0%, transparent 60%)`,
                    filter: 'blur(20px)', pointerEvents: 'none',
                  }} />
                  {/* Photo */}
                  <Box
                    component="img"
                    src={profilePhoto}
                    alt="Chaitanya Ubale"
                    loading="lazy"
                    sx={{
                      position: 'absolute', inset: 0, width: '100%', height: '100%',
                      borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 18%',
                      border: `1px solid ${hexToRgba(GOLD, 0.35)}`,
                      boxShadow: `0 0 60px ${hexToRgba(GOLD, 0.25)}, inset 0 0 40px rgba(0,0,0,0.5)`,
                      transition: reducedMotion ? 'none' : 'transform .8s cubic-bezier(.22,1,.36,1)',
                      '&:hover': { transform: reducedMotion ? 'none' : 'scale(1.03)' },
                    }}
                  />
                </Box>
              </Reveal>
            </Grid>
          </Grid>
        </Container>

        <Box sx={{
          position: 'absolute', left: '50%', bottom: { xs: 24, md: 40 },
          transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 1, color: 'rgba(238,238,238,0.5)',
          animation: reducedMotion ? 'none' : 'floatBounce 2.4s ease-in-out infinite',
          '@keyframes floatBounce': {
            '0%,100%': { transform: 'translate(-50%, 0)' },
            '50%': { transform: 'translate(-50%, 10px)' },
          },
        }}>
          <Typography variant="caption" sx={{ color: 'rgba(238,238,238,0.5)' }}>Scroll</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
        </Box>
      </Box>

      {/* IMPACT STATS */}
      <Stats />

      {/* ABOUT */}
      <Box id="about" sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 } }}>
        <Container maxWidth="lg">
          <Reveal><SectionLabel index="01" title="About" /></Reveal>
          <Grid container spacing={{ xs: 4, md: 10 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Reveal>
                <Typography variant="caption">The Narrative</Typography>
                <Typography sx={{ mt: 2, fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                  Nearly three years of <Box component="span" sx={{ color: GOLD, fontStyle: 'italic' }}>ownership</Box> — from requirement to release.
                </Typography>
              </Reveal>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Reveal delay={150}>
                <Stack spacing={3}>
                  <Typography variant="body1">
                    Proactive Software Developer with nearly 3 years of experience. I take full ownership of
                    the software development lifecycle — from in-depth requirement analysis to thorough
                    testing, proactive monitoring, and reliable log management.
                  </Typography>
                  <Typography variant="body1">
                    Skilled at transforming complex client requirements into clear, effective technical
                    solutions that create lasting business value.
                  </Typography>
                  <Typography variant="body1">
                    Along the way I've automated multi-crore fintech transaction pipelines across five banking
                    partners, shipped a Retrieval-Augmented Generation (RAG) application on open-source LLMs, and
                    built a modern AI-assisted workflow around tools like Claude, ChatGPT and Cursor to ship
                    production-quality code faster.
                  </Typography>
                </Stack>
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* SKILLS */}
      <Box id="skills" sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 }, background: SURFACE }}>
        <Container maxWidth="lg">
          <Reveal><SectionLabel index="02" title="Core Skills" /></Reveal>
          <Reveal delay={100}>
            <Typography sx={{ fontSize: { xs: '1.8rem', md: '3rem' }, fontWeight: 500, letterSpacing: '-0.03em', mb: { xs: 6, md: 10 }, maxWidth: 820, lineHeight: 1.1 }}>
              A stack tuned for <Box component="span" sx={{ color: GOLD, fontStyle: 'italic' }}>reliability</Box> at scale.
            </Typography>
          </Reveal>
          <Box sx={{
            display: 'grid',
            gap: { xs: 2.5, md: 3 },
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(auto-fit, minmax(220px, 1fr))',
            },
          }}>
            {SKILL_GROUPS.map((g, i) => (
              <Box key={g.label}>
                <Reveal delay={i * 80}>
                  <Box sx={{
                    p: { xs: 3, md: 4 }, height: '100%',
                    border: `1px solid ${hexToRgba(GOLD, 0.16)}`,
                    transition: reducedMotion ? 'none' : 'all .6s cubic-bezier(.22,1,.36,1)',
                    position: 'relative', overflow: 'hidden',
                    '&:hover': {
                      borderColor: GOLD,
                      background: `linear-gradient(180deg, ${hexToRgba(GOLD, 0.04)}, transparent)`,
                      transform: reducedMotion ? 'none' : 'translateY(-3px)',
                      boxShadow: `0 0 40px ${hexToRgba(GOLD, 0.1)}`,
                      '& .icn': { color: GOLD },
                    },
                  }}>
                    <Box className="icn" sx={{ color: 'rgba(238,238,238,0.85)', mb: 3, transition: 'color .4s ease', '& svg': { fontSize: 30 } }}>
                      {SKILL_ICONS[g.icon]}
                    </Box>
                    <Typography variant="caption" sx={{ color: GOLD }}>{g.label}</Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
                      {g.items.map((it) => (
                        <Box key={it} sx={{
                          px: 1.5, py: 0.6, fontSize: '0.78rem', letterSpacing: '0.02em',
                          border: '1px solid rgba(238,238,238,0.1)',
                          color: 'rgba(238,238,238,0.85)',
                          borderRadius: 0.5,
                        }}>
                          {it}
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Reveal>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* BANKING PARTNERS */}
      <Box id="partners" sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 }, background: SURFACE }}>
        <Container maxWidth="lg">
          <Reveal><SectionLabel index="03" title="Banking Partners" /></Reveal>
          <Reveal delay={100}>
            <Typography sx={{ fontSize: { xs: '1.8rem', md: '3rem' }, fontWeight: 500, letterSpacing: '-0.03em', mb: { xs: 6, md: 10 }, maxWidth: 820, lineHeight: 1.1 }}>
              Financial infrastructure <Box component="span" sx={{ color: GOLD, fontStyle: 'italic' }}>built on bank APIs.</Box>
            </Typography>
          </Reveal>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {BANKING_PARTNERS.map((bank, i) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={bank.name}>
                <Reveal delay={i * 100}>
                  <Box sx={{
                    p: { xs: 3, md: 4 }, height: '100%',
                    border: `1px solid ${hexToRgba(GOLD, 0.18)}`,
                    background: `linear-gradient(180deg, ${hexToRgba(OBSIDIAN, 0.75)}, ${hexToRgba(OBSIDIAN, 0.96)})`,
                    transition: reducedMotion ? 'none' : 'all .6s cubic-bezier(.22,1,.36,1)',
                    '&:hover': {
                      borderColor: GOLD,
                      transform: reducedMotion ? 'none' : 'translateY(-4px)',
                      boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${hexToRgba(GOLD, 0.12)}`,
                    },
                  }}>
                    <Box sx={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      height: 120, border: `1px solid ${hexToRgba(GOLD, 0.12)}`,
                      background: 'rgba(255,255,255,0.02)', mb: 3,
                    }}>
                      <Box
                        component="img"
                        src={bank.logo}
                        alt={`${bank.name} logo`}
                        loading="lazy"
                        sx={{ maxWidth: '72%', maxHeight: 74, objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.18))' }}
                      />
                    </Box>
                    <Typography component="h3" sx={{ fontSize: '1.45rem', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
                      {bank.name}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, color: 'rgba(238,238,238,0.75)' }}>
                      {bank.description}
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 3 }}>
                      {bank.services.map((service) => (
                        <Box key={service} sx={{
                          px: 1.5, py: 0.6, fontSize: '0.7rem', letterSpacing: '0.05em',
                          color: 'rgba(238,238,238,0.8)', border: '1px solid rgba(238,238,238,0.1)',
                        }}>
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

      {/* EXPERIENCE */}
      <Box id="experience" sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 } }}>
        <Container maxWidth="lg">
          <Reveal><SectionLabel index="04" title="Professional Experience" /></Reveal>
          <Stack spacing={{ xs: 6, md: 8 }}>
            {EXPERIENCE.map((e, i) => (
              <Reveal key={`${e.company}-${e.year}`} delay={i * 80}>
                <Grid container spacing={{ xs: 2, md: 6 }} sx={{
                  borderTop: `1px solid ${hexToRgba(GOLD, 0.15)}`, pt: { xs: 4, md: 6 },
                }}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="caption">{e.year}</Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 9 }}>
                    <Typography component="h3" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                      {e.role}
                    </Typography>
                    <Typography sx={{ color: GOLD, mt: 1, fontSize: '0.95rem', letterSpacing: '0.04em' }}>
                      {e.company}
                    </Typography>
                    <Stack spacing={2} sx={{ mt: 3 }}>
                      {e.points.map((p, idx) => (
                        <Stack key={idx} direction="row" spacing={2}>
                          <Box sx={{ minWidth: 6, mt: 1.2, width: 6, height: 1, background: GOLD }} />
                          <Typography variant="body1" sx={{ flex: 1 }}>{p}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Grid>
                </Grid>
              </Reveal>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* PROJECTS */}
      <Box id="projects" sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 }, background: SURFACE }}>
        <Container maxWidth="lg">
          <Reveal><SectionLabel index="05" title="Technical Projects" /></Reveal>
          <Reveal delay={100}>
            <Typography sx={{ fontSize: { xs: '1.8rem', md: '3rem' }, fontWeight: 500, letterSpacing: '-0.03em', mb: { xs: 6, md: 10 }, maxWidth: 820, lineHeight: 1.1 }}>
              Selected <Box component="span" sx={{ color: GOLD, fontStyle: 'italic' }}>case studies.</Box>
            </Typography>
          </Reveal>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {PROJECTS.map((p, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={p.title}>
                <Reveal delay={i * 100}>
                  <Box sx={{
                    p: { xs: 4, md: 5 }, height: '100%',
                    border: `1px solid ${hexToRgba(GOLD, 0.18)}`,
                    position: 'relative', overflow: 'hidden',
                    transition: reducedMotion ? 'none' : 'all .6s cubic-bezier(.22,1,.36,1)',
                    '&:before': {
                      content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                      background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                      opacity: 0, transition: 'opacity .5s ease',
                    },
                    '&:hover': {
                      borderColor: GOLD,
                      transform: reducedMotion ? 'none' : 'translateY(-4px)',
                      boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${hexToRgba(GOLD, 0.12)}`,
                      '&:before': { opacity: 1 },
                    },
                  }}>
                    <Typography variant="caption" sx={{ color: GOLD }}>{p.tag}</Typography>
                    <Typography component="h3" sx={{ mt: 2, fontSize: { xs: '1.35rem', md: '1.65rem' }, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
                      {p.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2.5 }}>{p.desc}</Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 3 }}>
                      {p.stack.map((s) => (
                        <Box key={s} sx={{
                          px: 1.5, py: 0.5, fontSize: '0.72rem', letterSpacing: '0.06em',
                          color: 'rgba(238,238,238,0.7)',
                          border: '1px solid rgba(238,238,238,0.08)',
                        }}>
                          {s}
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

      {/* AWARDS */}
      <Box id="awards" sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 } }}>
        <Container maxWidth="lg">
          <Reveal><SectionLabel index="06" title="Achievements & Awards" /></Reveal>
          <Reveal delay={100}>
            <Typography sx={{ fontSize: { xs: '1.6rem', md: '2.6rem' }, fontWeight: 500, letterSpacing: '-0.025em', mb: { xs: 6, md: 8 } }}>
              Recognized for <Box component="span" sx={{ color: GOLD, fontStyle: 'italic' }}>quality.</Box>
            </Typography>
          </Reveal>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {AWARDS.map((a, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={a.title}>
                <Reveal delay={i * 120}>
                  <Box sx={{
                    border: `1px solid ${hexToRgba(GOLD, 0.2)}`,
                    transition: reducedMotion ? 'none' : 'all .6s cubic-bezier(.22,1,.36,1)',
                    position: 'relative', overflow: 'hidden',
                    '&:hover': {
                      borderColor: GOLD,
                      transform: reducedMotion ? 'none' : 'translateY(-4px)',
                      boxShadow: `0 0 60px ${hexToRgba(GOLD, 0.18)}`,
                    },
                  }}>
                    <Box sx={{
                      aspectRatio: '16/10',
                      backgroundImage: `linear-gradient(180deg, rgba(11,12,16,0) 50%, rgba(11,12,16,0.4)), url(${a.img})`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                    }} />
                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                      <Typography variant="caption">{a.sub}</Typography>
                      <Typography component="h3" sx={{ mt: 1, fontSize: '1.2rem', fontWeight: 500, letterSpacing: '-0.01em' }}>
                        {a.title}
                      </Typography>
                    </Box>
                  </Box>
                </Reveal>
              </Grid>
            ))}
            <Grid size={{ xs: 12 }}>
              <Reveal delay={240}>
                <Box sx={{
                  mt: { xs: 2, md: 3 }, p: { xs: 3, md: 4 },
                  border: `1px solid ${hexToRgba(GOLD, 0.2)}`,
                  display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap',
                }}>
                  <Box sx={{
                    width: 52, height: 52, borderRadius: '50%',
                    border: `1px solid ${GOLD}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: GOLD, fontSize: '1.1rem', fontWeight: 500,
                    boxShadow: `0 0 30px ${hexToRgba(GOLD, 0.25)}`,
                  }}>
                    ★
                  </Box>
                  <Box>
                    <Typography variant="caption">Shabaaski Winner 2024</Typography>
                    <Typography sx={{ mt: 0.5, fontSize: '1.1rem', fontWeight: 500 }}>
                      Outstanding Performer
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      Acknowledged for taking proactive ownership of the software development lifecycle, from requirement analysis to seamless execution.
                    </Typography>
                  </Box>
                </Box>
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ACTIVITIES + COMMUNITY */}
      <Box sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 }, background: SURFACE }}>
        <Container maxWidth="lg">
          <Reveal><SectionLabel index="07" title="Activities & Honors" /></Reveal>
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Reveal>
                <Typography sx={{ fontSize: { xs: '1.8rem', md: '2.8rem' }, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                  Leadership <Box component="span" sx={{ color: GOLD, fontStyle: 'italic' }}>beyond code.</Box>
                </Typography>
                <Stack spacing={2} sx={{ mt: 5 }}>
                  {ACTIVITIES.map((a) => (
                    <Box key={a.role} sx={{
                      p: 3, border: `1px solid ${hexToRgba(GOLD, 0.15)}`,
                      transition: reducedMotion ? 'none' : 'all .4s ease',
                      '&:hover': { borderColor: GOLD, transform: reducedMotion ? 'none' : 'translateX(4px)' },
                    }}>
                      <Typography sx={{ fontSize: '1.05rem', fontWeight: 500 }}>{a.role}</Typography>
                      <Typography variant="body2" sx={{ mt: 0.5, color: GOLD }}>{a.org}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Reveal>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Reveal delay={200}>
                <Box sx={{
                  aspectRatio: '4/5',
                  backgroundImage: `linear-gradient(180deg, ${hexToRgba(OBSIDIAN, 0)} 40%, ${hexToRgba(OBSIDIAN, 0.6)}), url(${communityImg})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  border: `1px solid ${hexToRgba(GOLD, 0.2)}`,
                  transition: reducedMotion ? 'none' : 'transform .8s cubic-bezier(.22,1,.36,1)',
                  '&:hover': { transform: reducedMotion ? 'none' : 'scale(1.01)' },
                }} />
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CERTIFICATIONS + EDUCATION */}
      <Box sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 } }}>
        <Container maxWidth="lg">
          <Reveal><SectionLabel index="08" title="Certifications & Education" /></Reveal>
          <Grid container spacing={{ xs: 5, md: 8 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Reveal>
                <Typography variant="caption" sx={{ mb: 3, display: 'block' }}>Certifications</Typography>
                <Stack spacing={2}>
                  {CERTS.map((c) => (
                    <Stack key={c.title} direction="row" spacing={2.5} alignItems="flex-start"
                      sx={{ py: 2.5, borderTop: `1px solid ${hexToRgba(GOLD, 0.12)}` }}>
                      <VerifiedOutlinedIcon sx={{ color: GOLD, fontSize: 22, mt: 0.3 }} />
                      <Box>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 500 }}>{c.title}</Typography>
                        <Typography variant="body2">{c.org}</Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Reveal>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Reveal delay={150}>
                <Typography variant="caption" sx={{ mb: 3, display: 'block' }}>Education</Typography>
                <Stack spacing={2}>
                  {EDUCATION.map((e) => (
                    <Box key={e.title} sx={{ py: 2.5, borderTop: `1px solid ${hexToRgba(GOLD, 0.12)}` }}>
                      <Typography variant="caption">{e.year}</Typography>
                      <Typography sx={{ mt: 0.5, fontSize: '1rem', fontWeight: 500 }}>{e.title}</Typography>
                      <Typography variant="body2" sx={{ color: GOLD, mt: 0.5 }}>{e.org}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* PUBLICATIONS */}
      <Box id="publications" sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 } }}>
        <Container maxWidth="lg">
          <Reveal><SectionLabel index="09" title="Publications" /></Reveal>
          <Reveal delay={100}>
            <Typography sx={{ fontSize: { xs: '1.6rem', md: '2.6rem' }, fontWeight: 500, letterSpacing: '-0.025em', mb: { xs: 6, md: 8 } }}>
              Published <Box component="span" sx={{ color: GOLD, fontStyle: 'italic' }}>research.</Box>
            </Typography>
          </Reveal>
          <Stack spacing={2}>
            {PUBLICATIONS.map((p) => (
              <Reveal key={p.title}>
                <Box sx={{
                  p: { xs: 3, md: 4 },
                  border: `1px solid ${hexToRgba(GOLD, 0.2)}`,
                  display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 3,
                  transition: reducedMotion ? 'none' : 'all .4s cubic-bezier(.22,1,.36,1)',
                  '&:hover': { borderColor: GOLD, transform: reducedMotion ? 'none' : 'translateY(-4px)', boxShadow: `0 0 60px ${hexToRgba(GOLD, 0.18)}` },
                }}>
                  <Stack direction="row" spacing={2.5} alignItems="flex-start" sx={{ maxWidth: 640 }}>
                    <ArticleOutlinedIcon sx={{ color: GOLD, fontSize: 22, mt: 0.3 }} />
                    <Box>
                      <Typography component="h3" sx={{ fontSize: '1.1rem', fontWeight: 500 }}>{p.title}</Typography>
                      <Typography variant="body2" sx={{ color: GOLD, mt: 0.5 }}>{p.venue}</Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>{p.authors}</Typography>
                    </Box>
                  </Stack>
                  <Button
                    variant="outlined"
                    component="a"
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    endIcon={<ArrowOutwardIcon />}
                  >
                    View Paper
                  </Button>
                </Box>
              </Reveal>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* CONTACT */}
      <Box id="contact" sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 }, background: SURFACE }}>
        <Container maxWidth="md">
          <Reveal><SectionLabel index="10" title="Get In Touch" /></Reveal>
          <Reveal delay={120}>
            <Typography sx={{ fontSize: { xs: '2.2rem', md: '4rem' }, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1.05, mb: { xs: 5, md: 8 } }}>
              Let’s build something
              <br />
              <Box component="span" sx={{ color: GOLD, fontStyle: 'italic' }}>worth keeping.</Box>
            </Typography>
          </Reveal>

          <Reveal delay={200}>
            <ContactForm />
          </Reveal>

          <Divider sx={{ my: { xs: 8, md: 12 }, borderColor: hexToRgba(GOLD, 0.12) }} />

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <MailOutlineIcon sx={{ color: GOLD, fontSize: 20, mt: 0.4 }} />
                <Box>
                  <Typography variant="caption">Email</Typography>
                  <Typography component="a" href={`mailto:${CONTACT.email}`} sx={{ mt: 0.5, display: 'block', fontSize: '0.95rem', color: OFFWHITE, textDecoration: 'none', wordBreak: 'break-all', '&:hover': { color: GOLD } }}>
                    {CONTACT.email}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <PhoneOutlinedIcon sx={{ color: GOLD, fontSize: 20, mt: 0.4 }} />
                <Box>
                  <Typography variant="caption">Phone</Typography>
                  <Typography component="a" href={CONTACT.phoneHref} sx={{ mt: 0.5, display: 'block', fontSize: '0.95rem', color: OFFWHITE, textDecoration: 'none', '&:hover': { color: GOLD } }}>
                    {CONTACT.phone}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <PlaceOutlinedIcon sx={{ color: GOLD, fontSize: 20, mt: 0.4 }} />
                <Box>
                  <Typography variant="caption">Location</Typography>
                  <Typography sx={{ mt: 0.5, fontSize: '0.95rem', color: OFFWHITE }}>
                    {CONTACT.location}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={1} sx={{ mt: { xs: 5, md: 7 } }}>
            {[
              { icon: <LinkedInIcon />, label: 'LinkedIn', href: CONTACT.linkedin },
              { icon: <GitHubIcon />, label: 'GitHub', href: CONTACT.github },
              { icon: <MailOutlineIcon />, label: 'Email', href: `mailto:${CONTACT.email}` },
            ].map((s) => (
              <IconButton key={s.label} component="a" href={s.href} target="_blank" rel="noreferrer"
                aria-label={s.label}
                sx={{
                  color: 'rgba(238,238,238,0.6)',
                  border: `1px solid ${hexToRgba(GOLD, 0.2)}`,
                  borderRadius: 1, width: 44, height: 44,
                  transition: reducedMotion ? 'none' : 'all .4s ease',
                  '&:hover': {
                    color: GOLD, borderColor: GOLD,
                    boxShadow: `0 0 0 1px ${hexToRgba(GOLD, 0.4)}, 0 0 24px ${hexToRgba(GOLD, 0.18)}`,
                  },
                  '&:focus-visible': { outline: `2px solid ${GOLD}`, outlineOffset: 2 },
                }}>
                {s.icon}
              </IconButton>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box component="footer" sx={{ py: 4, px: { xs: 3, md: 8 }, borderTop: `1px solid ${hexToRgba(GOLD, 0.08)}` }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
            <Typography variant="caption" sx={{ color: 'rgba(238,238,238,0.4)', letterSpacing: '0.08em' }}>
              © {new Date().getFullYear()} Chaitanya Ubale
            </Typography>
            <Stack direction="row" spacing={2.5} alignItems="center">
              <Typography component="a" href={CONTACT.github} target="_blank" rel="noreferrer"
                variant="caption" sx={{ color: 'rgba(238,238,238,0.4)', letterSpacing: '0.08em', textDecoration: 'none', '&:hover': { color: GOLD } }}>
                GitHub
              </Typography>
              <Typography component="a" href={CONTACT.linkedin} target="_blank" rel="noreferrer"
                variant="caption" sx={{ color: 'rgba(238,238,238,0.4)', letterSpacing: '0.08em', textDecoration: 'none', '&:hover': { color: GOLD } }}>
                LinkedIn
              </Typography>
              <Typography component="a" href="#hero"
                onClick={(e) => { e.preventDefault(); go('hero'); }}
                variant="caption" sx={{ color: 'rgba(238,238,238,0.4)', letterSpacing: '0.08em', textDecoration: 'none', '&:hover': { color: GOLD } }}>
                Back to top ↑
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Portfolio;

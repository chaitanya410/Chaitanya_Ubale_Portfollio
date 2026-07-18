import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Stack, Button, IconButton, AppBar, Toolbar,
  Grid, TextField, Divider, useTheme, useMediaQuery,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Reveal from './Reveal';
import heroImg from '../../assets/network-hero.jpg';
import goldAward from '../../assets/award-gold.jpg';
import silverAward from '../../assets/award-silver.jpg';
import communityImg from '../../assets/community-event.jpg';
import profilePhoto from '../../assets/profile-photo.jpg';

const GOLD = '#C5A059';
const OBSIDIAN = '#0B0C10';
const OFFWHITE = '#EEEEEE';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
];

const SKILL_GROUPS = [
  {
    label: 'Backend & Databases',
    icon: <StorageOutlinedIcon />,
    items: ['Node.js', 'Express.js', 'MS-SQL', 'MongoDB'],
  },
  {
    label: 'Frontend',
    icon: <CodeOutlinedIcon />,
    items: ['JavaScript', 'React.js', 'Redux', 'Material UI', 'Ant Design', 'HTML', 'CSS'],
  },
  {
    label: 'Cloud',
    icon: <CloudOutlinedIcon />,
    items: ['AWS'],
  },
  {
    label: 'AI & Machine Learning',
    icon: <PsychologyOutlinedIcon />,
    items: ['Python', 'Machine Learning', 'Artificial Intelligence', 'RAG', 'OLLAMA'],
  },
  {
    label: 'AI Tools & Productivity',
    icon: <SmartToyOutlinedIcon />,
    items: ['Claude', 'ChatGPT', 'Gemini', 'NotebookLM', 'Lovable.ai', 'Cursor AI'],
  },
];

const STATS = [
  { value: '3+', label: 'Years of Experience' },
  { value: '₹5Cr+', label: 'Weekly Volume Automated' },
  { value: '3,000+', label: 'Customers Served' },
  { value: '5', label: 'Banking Partners Integrated' },
];

const EXPERIENCE = [
  {
    year: '09/2025 — Present',
    role: 'Software Developer',
    company: 'Paya Tech Systems Pvt. Ltd.',
    points: [
      'Engineered a highly scalable community carnival application ranked top-10 on Zomato’s "District," processing 1,500+ registrations with zero downtime.',
    ],
  },
  {
    year: '04/2024 — 09/2025',
    role: 'Jr. Software Developer',
    company: 'Sunorbit Consulting',
    points: [
      'Co-developed a React.js/Node.js referral & loyalty platform for a major real estate client, driving continuous engagement for a base of 3,000+ customers via the AppPayout gateway.',
      'Built a secure backend consuming status-check APIs from Standard Chartered (SCB), SBM, ICICI, HDFC and RBL to automate payment verification, processing and reconciliation.',
      'Orchestrated the daily automated creation of 600 virtual accounts across 300 applications, processing an average weekly transaction volume of ₹5 Crore.',
      'Engineered an automated E-NACH platform on ICICI APIs for mandate registration, verification and real-time status tracking, settling an average of ₹60 Lakh per month with dynamic GST/base-amount splitting.',
    ],
  },
  {
    year: '07/2023 — 12/2023',
    role: 'Software Developer Intern',
    company: 'Scalefull Technologies LLP',
    points: [
      'Delivered a dynamic MERN-stack admin panel to streamline property data management for an international real estate client.',
    ],
  },
  {
    year: '10/2022 — 12/2022',
    role: 'Software Developer Intern',
    company: 'PieInfocomm Pvt. Ltd.',
    points: [
      'Developed a Python-based machine learning model for accurate image segmentation and component classification.',
    ],
  },
];

const PROJECTS = [
  {
    title: 'Referral and Loyalty Web Application',
    tag: 'Real Estate · Customer Service',
    desc: 'A full-stack customer service application managing client referral and loyalty programs for a major real estate project — serving a base of 3,000+ customers who track and claim rewards via an integrated AppPayout gateway.',
    stack: ['React.js', 'Material UI', 'Node.js', 'Express.js', 'MS-SQL'],
  },
  {
    title: 'E-Collection System',
    tag: 'Fintech · Banking Integration',
    desc: 'A secure backend consuming status-check APIs from SCB, SBM, ICICI, HDFC and RBL to automate payment verification, processing and reconciliation — orchestrating 600 virtual accounts across 300 applications and ₹5 Crore in average weekly transaction volume.',
    stack: ['Node.js', 'MS-SQL', 'ICICI', 'HDFC', 'SBM', 'RBL', 'SCB'],
  },
  {
    title: 'E-NACH System',
    tag: 'Fintech · Automated Mandates',
    desc: 'An automated E-NACH platform integrating ICICI APIs for end-to-end mandate registration, verification, transaction scheduling and real-time status tracking, with dynamic GST/base-amount splitting settling an average of ₹60 Lakh per month.',
    stack: ['Node.js', 'ICICI APIs', 'E-NACH', 'Automated Billing'],
  },
  {
    title: 'LLM Application with RAG',
    tag: 'AI / ML · Retrieval-Augmented Generation',
    desc: 'An AI/ML application leveraging Python and vector database technology, featuring Retrieval-Augmented Generation (RAG) with integrated open-source LLMs such as OLLAMA for domain-grounded responses.',
    stack: ['Python', 'OLLAMA', 'Vector DB', 'RAG', 'LLM'],
  },
];

const AWARDS = [
  { img: silverAward, title: 'Quality Award 2024 (Silver)', sub: 'Recognized for outstanding performance as a quality worker — reliable, scalable code and improved system stability.' },
  { img: goldAward, title: 'Annual Awards 2025 (Gold) — Quality & Safety', sub: 'Awarded for implementing critical safety measures and rigorous quality standards on high-impact financial projects.' },
];

const ACTIVITIES = [
  { role: 'Founder Vice President', org: 'Basements Social Forum, Wardha' },
  { role: 'Core Committee Member & ERC', org: 'Wardha Youth Fest 2024' },
];

const CERTS = [
  { title: 'MERN Stack Internship Certification', org: 'ScaleFull Technologies LLP' },
  { title: 'Python Internship Certification', org: 'PIE INFOCOMM Pvt. Ltd.' },
  { title: 'SDLC Agile Certification', org: 'Cognizant Technology Solutions' },
  { title: 'Generative AI and LLMs Certification', org: 'Udemy' },
];

const EDUCATION = [
  { title: 'B.E. Computer Science Engineering', org: 'CGPA: 8.37', year: '2019 – 2023' },
  { title: 'HSC — Maharashtra State Board', org: '81.23%', year: '2017 – 2018' },
];

const SectionLabel: React.FC<{ index: string; title: string }> = ({ index, title }) => (
  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: { xs: 5, md: 8 } }}>
    <Typography variant="caption" sx={{ color: GOLD }}>{index}</Typography>
    <Box sx={{ height: '1px', width: 48, background: 'rgba(197,160,89,0.5)' }} />
    <Typography variant="caption" sx={{ color: OFFWHITE, opacity: 0.7 }}>{title}</Typography>
  </Stack>
);

const Portfolio: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  return (
    <Box sx={{ background: OBSIDIAN, color: OFFWHITE, overflowX: 'hidden' }}>
      {/* NAV */}
      <AppBar
        position="fixed"
        sx={{
          background: scrolled ? 'rgba(11,12,16,0.78)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(197,160,89,0.1)' : '1px solid transparent',
          transition: 'all .5s cubic-bezier(.22,1,.36,1)',
        }}
      >
        <Toolbar sx={{ px: { xs: 3, md: 8 }, py: { xs: 1, md: 1.5 }, minHeight: { xs: 64, md: 80 } }}>
          <Typography
            onClick={() => scrollTo('hero')}
            sx={{
              cursor: 'pointer', flexGrow: 1, fontWeight: 600, letterSpacing: '-0.02em',
              fontSize: '1.05rem', color: OFFWHITE,
              '& span': { color: GOLD },
            }}
          >
            Chaitanya<span>.</span>
          </Typography>
          {!isMobile ? (
            <Stack direction="row" spacing={4} alignItems="center">
              {NAV.map((n, i) => (
                <Typography
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  sx={{
                    cursor: 'pointer', fontSize: '0.82rem', letterSpacing: '0.06em',
                    color: 'rgba(238,238,238,0.7)',
                    transition: 'color .3s ease',
                    '&:hover': { color: GOLD },
                    '&:before': {
                      content: `"0${i + 1}"`,
                      color: GOLD, marginRight: '8px', fontSize: '0.65rem', opacity: 0.7,
                    },
                  }}
                >
                  {n.label}
                </Typography>
              ))}
            </Stack>
          ) : (
            <IconButton onClick={() => setMobileOpen(!mobileOpen)} sx={{ color: OFFWHITE }} aria-label="menu">
              <Box sx={{
                width: 22, height: 14, position: 'relative',
                '&:before, &:after': {
                  content: '""', position: 'absolute', left: 0, width: '100%', height: '1px',
                  background: GOLD, transition: 'transform .4s cubic-bezier(.22,1,.36,1)',
                },
                '&:before': { top: mobileOpen ? 6 : 0, transform: mobileOpen ? 'rotate(45deg)' : 'none' },
                '&:after': { bottom: mobileOpen ? 7 : 0, transform: mobileOpen ? 'rotate(-45deg)' : 'none' },
              }} />
            </IconButton>
          )}
        </Toolbar>
        {isMobile && (
          <Box sx={{
            overflow: 'hidden', maxHeight: mobileOpen ? 460 : 0,
            transition: 'max-height .55s cubic-bezier(.22,1,.36,1)',
            background: 'rgba(11,12,16,0.95)', backdropFilter: 'blur(20px)',
            borderTop: mobileOpen ? '1px solid rgba(197,160,89,0.1)' : 'none',
          }}>
            <Stack spacing={2.5} sx={{ px: 4, py: 4 }}>
              {NAV.map((n, i) => (
                <Typography key={n.id} onClick={() => scrollTo(n.id)}
                  sx={{ cursor: 'pointer', color: OFFWHITE, fontSize: '1rem', letterSpacing: '0.04em' }}>
                  <Box component="span" sx={{ color: GOLD, mr: 1.5, fontSize: '0.7rem' }}>0{i + 1}</Box>
                  {n.label}
                </Typography>
              ))}
            </Stack>
          </Box>
        )}
      </AppBar>

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
                  <Button variant="outlined" onClick={() => scrollTo('contact')} endIcon={<ArrowOutwardIcon />}>
                    Get in touch
                  </Button>
                  <Button variant="text" onClick={() => scrollTo('projects')}
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
                    animation: 'spin 14s linear infinite',
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
                    background: `radial-gradient(circle, rgba(197,160,89,0.28) 0%, transparent 60%)`,
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
                      border: '1px solid rgba(197,160,89,0.35)',
                      boxShadow: '0 0 60px rgba(197,160,89,0.25), inset 0 0 40px rgba(0,0,0,0.5)',
                      transition: 'transform .8s cubic-bezier(.22,1,.36,1)',
                      '&:hover': { transform: 'scale(1.03)' },
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
          animation: 'floatBounce 2.4s ease-in-out infinite',
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
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 3, md: 8 }, borderTop: '1px solid rgba(197,160,89,0.1)', borderBottom: '1px solid rgba(197,160,89,0.1)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 3 }}>
            {STATS.map((s, i) => (
              <Grid size={{ xs: 6, md: 3 }} key={s.label}>
                <Reveal delay={i * 100}>
                  <Box sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                    <Typography sx={{
                      fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 600,
                      color: GOLD, letterSpacing: '-0.03em', lineHeight: 1,
                    }}>
                      {s.value}
                    </Typography>
                    <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'rgba(238,238,238,0.6)' }}>
                      {s.label}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

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
      <Box id="skills" sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 }, background: '#0E1015' }}>
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
                    border: '1px solid rgba(197,160,89,0.16)',
                    transition: 'all .6s cubic-bezier(.22,1,.36,1)',
                    position: 'relative', overflow: 'hidden',
                    '&:hover': {
                      borderColor: GOLD,
                      background: 'linear-gradient(180deg, rgba(197,160,89,0.04), transparent)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 0 40px rgba(197,160,89,0.1)',
                      '& .icn': { color: GOLD },
                    },
                  }}>
                    <Box className="icn" sx={{ color: 'rgba(238,238,238,0.85)', mb: 3, transition: 'color .4s ease', '& svg': { fontSize: 30 } }}>
                      {g.icon}
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

      {/* EXPERIENCE */}
      <Box id="experience" sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 } }}>
        <Container maxWidth="lg">
          <Reveal><SectionLabel index="03" title="Professional Experience" /></Reveal>
          <Stack spacing={{ xs: 6, md: 8 }}>
            {EXPERIENCE.map((e, i) => (
              <Reveal key={i} delay={i * 80}>
                <Grid container spacing={{ xs: 2, md: 6 }} sx={{
                  borderTop: '1px solid rgba(197,160,89,0.15)', pt: { xs: 4, md: 6 },
                }}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="caption">{e.year}</Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 9 }}>
                    <Typography sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
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

      {/* PROJECTS — distinct from Experience */}
      <Box id="projects" sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 }, background: '#0E1015' }}>
        <Container maxWidth="lg">
          <Reveal><SectionLabel index="04" title="Technical Projects" /></Reveal>
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
                    border: '1px solid rgba(197,160,89,0.18)',
                    position: 'relative', overflow: 'hidden',
                    transition: 'all .6s cubic-bezier(.22,1,.36,1)',
                    '&:before': {
                      content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                      background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                      opacity: 0, transition: 'opacity .5s ease',
                    },
                    '&:hover': {
                      borderColor: GOLD,
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(197,160,89,0.12)',
                      '&:before': { opacity: 1 },
                    },
                  }}>
                    <Typography variant="caption" sx={{ color: GOLD }}>{p.tag}</Typography>
                    <Typography sx={{ mt: 2, fontSize: { xs: '1.35rem', md: '1.65rem' }, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
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
          <Reveal><SectionLabel index="05" title="Achievements & Awards" /></Reveal>
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
                    border: '1px solid rgba(197,160,89,0.2)',
                    transition: 'all .6s cubic-bezier(.22,1,.36,1)',
                    position: 'relative', overflow: 'hidden',
                    '&:hover': {
                      borderColor: GOLD,
                      transform: 'translateY(-4px)',
                      boxShadow: '0 0 60px rgba(197,160,89,0.18)',
                    },
                  }}>
                    <Box sx={{
                      aspectRatio: '16/10',
                      backgroundImage: `linear-gradient(180deg, rgba(11,12,16,0) 50%, rgba(11,12,16,0.4)), url(${a.img})`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                    }} />
                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                      <Typography variant="caption">{a.sub}</Typography>
                      <Typography sx={{ mt: 1, fontSize: '1.2rem', fontWeight: 500, letterSpacing: '-0.01em' }}>
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
                  border: '1px solid rgba(197,160,89,0.2)',
                  display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap',
                }}>
                  <Box sx={{
                    width: 52, height: 52, borderRadius: '50%',
                    border: `1px solid ${GOLD}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: GOLD, fontSize: '1.1rem', fontWeight: 500,
                    boxShadow: '0 0 30px rgba(197,160,89,0.25)',
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
      <Box sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 }, background: '#0E1015' }}>
        <Container maxWidth="lg">
          <Reveal><SectionLabel index="06" title="Activities & Honors" /></Reveal>
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Reveal>
                <Typography sx={{ fontSize: { xs: '1.8rem', md: '2.8rem' }, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                  Leadership <Box component="span" sx={{ color: GOLD, fontStyle: 'italic' }}>beyond code.</Box>
                </Typography>
                <Stack spacing={2} sx={{ mt: 5 }}>
                  {ACTIVITIES.map((a) => (
                    <Box key={a.role} sx={{
                      p: 3, border: '1px solid rgba(197,160,89,0.15)',
                      transition: 'all .4s ease',
                      '&:hover': { borderColor: GOLD, transform: 'translateX(4px)' },
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
                  backgroundImage: `linear-gradient(180deg, rgba(11,12,16,0) 40%, rgba(11,12,16,0.6)), url(${communityImg})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  border: '1px solid rgba(197,160,89,0.2)',
                  transition: 'transform .8s cubic-bezier(.22,1,.36,1)',
                  '&:hover': { transform: 'scale(1.01)' },
                }} />
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CERTIFICATIONS + EDUCATION */}
      <Box sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 } }}>
        <Container maxWidth="lg">
          <Reveal><SectionLabel index="07" title="Certifications & Education" /></Reveal>
          <Grid container spacing={{ xs: 5, md: 8 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Reveal>
                <Typography variant="caption" sx={{ mb: 3, display: 'block' }}>Certifications</Typography>
                <Stack spacing={2}>
                  {CERTS.map((c) => (
                    <Stack key={c.title} direction="row" spacing={2.5} alignItems="flex-start"
                      sx={{ py: 2.5, borderTop: '1px solid rgba(197,160,89,0.12)' }}>
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
                    <Box key={e.title} sx={{ py: 2.5, borderTop: '1px solid rgba(197,160,89,0.12)' }}>
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

      {/* CONTACT */}
      <Box id="contact" sx={{ py: { xs: 12, md: 22 }, px: { xs: 3, md: 8 }, background: '#0E1015' }}>
        <Container maxWidth="md">
          <Reveal><SectionLabel index="08" title="Get In Touch" /></Reveal>
          <Reveal delay={120}>
            <Typography sx={{ fontSize: { xs: '2.2rem', md: '4rem' }, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1.05, mb: { xs: 5, md: 8 } }}>
              Let’s build something
              <br />
              <Box component="span" sx={{ color: GOLD, fontStyle: 'italic' }}>worth keeping.</Box>
            </Typography>
          </Reveal>

          <Reveal delay={200}>
            <Box component="form" onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              window.location.href = 'mailto:chaitanya.ubale410@gmail.com';
            }}>
              <Stack spacing={3}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Your name" variant="outlined" />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Email" variant="outlined" type="email" />
                  </Grid>
                </Grid>
                <TextField fullWidth label="Tell me about the project" variant="outlined" multiline minRows={4} />
                <Box>
                  <Button type="submit" variant="contained" endIcon={<ArrowOutwardIcon />}>
                    Send message
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Reveal>

          <Divider sx={{ my: { xs: 8, md: 12 }, borderColor: 'rgba(197,160,89,0.12)' }} />

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <MailOutlineIcon sx={{ color: GOLD, fontSize: 20, mt: 0.4 }} />
                <Box>
                  <Typography variant="caption">Email</Typography>
                  <Typography sx={{ mt: 0.5, fontSize: '0.95rem', color: OFFWHITE, wordBreak: 'break-all' }}>
                    chaitanya.ubale410@gmail.com
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <PhoneOutlinedIcon sx={{ color: GOLD, fontSize: 20, mt: 0.4 }} />
                <Box>
                  <Typography variant="caption">Phone</Typography>
                  <Typography sx={{ mt: 0.5, fontSize: '0.95rem', color: OFFWHITE }}>
                    +91 7385955746
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
                    Bella Casa, Baner, Pune 411045
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={1} sx={{ mt: { xs: 5, md: 7 } }}>
            {[
              { icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/chaitanya-ubale-2248a6360' },
              { icon: <MailOutlineIcon />, label: 'Email', href: 'mailto:chaitanya.ubale410@gmail.com' },
            ].map((s) => (
              <IconButton key={s.label} component="a" href={s.href} target="_blank" rel="noreferrer"
                aria-label={s.label}
                sx={{
                  color: 'rgba(238,238,238,0.6)',
                  border: '1px solid rgba(197,160,89,0.2)',
                  borderRadius: 1, width: 44, height: 44,
                  transition: 'all .4s ease',
                  '&:hover': {
                    color: GOLD, borderColor: GOLD,
                    boxShadow: '0 0 0 1px rgba(197,160,89,0.4), 0 0 24px rgba(197,160,89,0.18)',
                  },
                }}>
                {s.icon}
              </IconButton>
            ))}
          </Stack>
        </Container>
      </Box>

      <Box sx={{ py: 4, px: { xs: 3, md: 8 }, borderTop: '1px solid rgba(197,160,89,0.08)' }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
            <Typography variant="caption" sx={{ color: 'rgba(238,238,238,0.4)', letterSpacing: '0.08em' }}>
              © {new Date().getFullYear()} Chaitanya Ubale
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(238,238,238,0.4)', letterSpacing: '0.08em' }}>
              Designed & built in Pune
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Portfolio;

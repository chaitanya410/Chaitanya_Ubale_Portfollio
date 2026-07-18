import { createTheme } from '@mui/material/styles';

const OBSIDIAN = '#0B0C10';
const OBSIDIAN_2 = '#121419';
const GOLD = '#C5A059';
const GOLD_SOFT = '#D9BE85';
const OFFWHITE = '#EEEEEE';
const MUTED = '#8A8A8A';

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: GOLD, light: GOLD_SOFT, dark: '#9C7E40', contrastText: OBSIDIAN },
    secondary: { main: OFFWHITE },
    background: { default: OBSIDIAN, paper: OBSIDIAN_2 },
    text: { primary: OFFWHITE, secondary: MUTED },
    divider: 'rgba(197,160,89,0.14)',
  },
  typography: {
    fontFamily: '"Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.02 },
    h2: { fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.08 },
    h3: { fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.15 },
    h4: { fontWeight: 500, letterSpacing: '-0.02em' },
    h5: { fontWeight: 500, letterSpacing: '-0.01em' },
    h6: { fontWeight: 500, letterSpacing: '0.02em', textTransform: 'uppercase', fontSize: '0.78rem' },
    body1: { fontSize: '1.0625rem', lineHeight: 1.75, color: OFFWHITE, fontWeight: 300 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.7, color: MUTED, fontWeight: 300 },
    button: { textTransform: 'none', fontWeight: 500, letterSpacing: '0.02em' },
    caption: { letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '0.72rem', color: GOLD, fontWeight: 500 },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {},
        html: { scrollBehavior: 'smooth' },
        body: {
          backgroundColor: OBSIDIAN,
          color: OFFWHITE,
          fontFamily: '"Space Grotesk","Inter",sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '::selection': { background: GOLD, color: OBSIDIAN },
        '*::-webkit-scrollbar': { width: 8, height: 8 },
        '*::-webkit-scrollbar-track': { background: OBSIDIAN },
        '*::-webkit-scrollbar-thumb': { background: 'rgba(197,160,89,0.25)', borderRadius: 8 },
        '*::-webkit-scrollbar-thumb:hover': { background: GOLD },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          padding: '14px 28px',
          fontSize: '0.85rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          transition: 'all .45s cubic-bezier(.22,1,.36,1)',
        },
        outlined: {
          borderColor: 'rgba(197,160,89,0.4)',
          color: OFFWHITE,
          '&:hover': {
            borderColor: GOLD,
            color: GOLD,
            background: 'rgba(197,160,89,0.04)',
            boxShadow: '0 0 0 1px rgba(197,160,89,0.4), 0 0 30px rgba(197,160,89,0.15)',
          },
        },
        contained: {
          background: GOLD,
          color: OBSIDIAN,
          boxShadow: 'none',
          '&:hover': {
            background: GOLD_SOFT,
            boxShadow: '0 0 30px rgba(197,160,89,0.4)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiAppBar: { styleOverrides: { root: { boxShadow: 'none' } } },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            background: 'rgba(255,255,255,0.02)',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
            '&:hover fieldset': { borderColor: 'rgba(197,160,89,0.4)' },
            '&.Mui-focused fieldset': { borderColor: GOLD, borderWidth: 1 },
          },
          '& .MuiInputLabel-root': { color: MUTED, letterSpacing: '0.05em' },
          '& .MuiInputLabel-root.Mui-focused': { color: GOLD },
        },
      },
    },
  },
});

export default muiTheme;

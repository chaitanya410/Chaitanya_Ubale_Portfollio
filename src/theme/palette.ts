/**
 * Single source of truth for the site's colour identity.
 * The runtime multi-scheme switcher was removed in favour of one confident palette.
 */
export const palette = {
  gold: '#C5A059',
  goldSoft: '#D9BE85',
  goldDark: '#9C7E40',
  obsidian: '#0B0C10',
  obsidianPaper: '#121419',
  surface: '#0E1015',
  offWhite: '#EEEEEE',
  muted: '#8A8A8A',
} as const;

/** Convert a `#rrggbb` / `#rgb` hex string to an `rgba()` string. */
export const hexToRgba = (hex: string, alpha: number): string => {
  const value = hex.replace('#', '');
  const safe = value.length === 3 ? value.split('').map((char) => char + char).join('') : value;
  const numeric = Number.parseInt(safe, 16);
  const r = (numeric >> 16) & 255;
  const g = (numeric >> 8) & 255;
  const b = numeric & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

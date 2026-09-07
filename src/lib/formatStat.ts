export type StatFormat = "comma";

export interface StatDisplayOptions {
  prefix?: string;
  suffix?: string;
  /** `"comma"` groups digits using the Indian numbering system (1,00,000). */
  format?: StatFormat;
}

/**
 * Format a (possibly fractional, mid-animation) number for display in the impact-stats band.
 * The numeric part is always rounded to an integer.
 */
export function formatStat(value: number, { prefix = "", suffix = "", format }: StatDisplayOptions): string {
  const rounded = Math.round(value);
  const body = format === "comma" ? rounded.toLocaleString("en-IN") : String(rounded);
  return `${prefix}${body}${suffix}`;
}

/** Cubic ease-out on the unit interval, with input clamped to [0, 1]. */
export function easeOutCubic(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - clamped, 3);
}

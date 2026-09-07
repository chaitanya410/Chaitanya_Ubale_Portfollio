import { describe, it, expect } from "vitest";
import { formatStat, easeOutCubic } from "./formatStat";

describe("formatStat", () => {
  it("renders a plain integer", () => {
    expect(formatStat(5, {})).toBe("5");
  });

  it("appends a suffix", () => {
    expect(formatStat(2, { suffix: "+" })).toBe("2+");
  });

  it("prepends a prefix", () => {
    expect(formatStat(5, { prefix: "₹", suffix: "Cr+" })).toBe("₹5Cr+");
  });

  it("groups thousands with the Indian numbering system when format is comma", () => {
    expect(formatStat(3000, { suffix: "+", format: "comma" })).toBe("3,000+");
    expect(formatStat(300000, { format: "comma" })).toBe("3,00,000");
  });

  it("rounds fractional interim values (as produced mid-animation)", () => {
    expect(formatStat(2749.6, { format: "comma" })).toBe("2,750");
    expect(formatStat(4.2, { suffix: "+" })).toBe("4+");
  });
});

describe("easeOutCubic", () => {
  it("maps the unit interval onto itself at the endpoints", () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
  });

  it("is ahead of linear progress in the middle (decelerating curve)", () => {
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });

  it("clamps out-of-range input", () => {
    expect(easeOutCubic(-1)).toBe(0);
    expect(easeOutCubic(2)).toBe(1);
  });
});

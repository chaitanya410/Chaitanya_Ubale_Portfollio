import { useEffect, useRef, useState } from "react";
import { easeOutCubic } from "../lib/formatStat";

interface CountUpOptions {
  /** Start the animation when this becomes true (e.g. the element scrolled into view). */
  active: boolean;
  /** When false, the hook returns `target` immediately with no animation. */
  animate?: boolean;
  durationMs?: number;
}

/** Eases a number from 0 up to `target` once `active` flips true. */
export function useCountUp(target: number, { active, animate = true, durationMs = 1600 }: CountUpOptions): number {
  const [value, setValue] = useState(animate ? 0 : target);
  const frameRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active || doneRef.current) return;

    if (!animate || typeof requestAnimationFrame === "undefined") {
      setValue(target);
      doneRef.current = true;
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const progress = (now - start) / durationMs;
      if (progress >= 1) {
        setValue(target);
        doneRef.current = true;
        return;
      }
      setValue(target * easeOutCubic(progress));
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [active, animate, target, durationMs]);

  return value;
}

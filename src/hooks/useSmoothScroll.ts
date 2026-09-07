import { useEffect } from "react";
import Lenis from "lenis";
import { registerScroller } from "../lib/scroll";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Inertial smooth scrolling for the whole document. Mount once, near the app root.
 * Disabled entirely when the user prefers reduced motion — native scrolling stays.
 */
export function useSmoothScroll(): void {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    registerScroller(lenis);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      registerScroller(null);
      lenis.destroy();
    };
  }, [reducedMotion]);
}

/** Minimal surface of the Lenis instance we depend on, to avoid a hard import here. */
interface SmoothScroller {
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number }) => void;
}

let scroller: SmoothScroller | null = null;

/** Called by the smooth-scroll hook once Lenis is running (or with null on teardown). */
export function registerScroller(instance: SmoothScroller | null): void {
  scroller = instance;
}

/** Vertical space to leave for the fixed nav when landing on a section. */
export const SCROLL_OFFSET = -90;

/** Scroll to an element by id, via Lenis when available, honouring reduced motion. */
export function scrollToId(id: string, reducedMotion = false): void {
  const el = document.getElementById(id);
  if (!el) return;

  if (scroller && !reducedMotion) {
    scroller.scrollTo(el, { offset: SCROLL_OFFSET });
    return;
  }

  el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

/** Smooth-scroll to an element by id, honouring the user's reduced-motion preference. */
export function scrollToId(id: string, reducedMotion = false): void {
  document.getElementById(id)?.scrollIntoView({
    behavior: reducedMotion ? 'auto' : 'smooth',
    block: 'start',
  });
}

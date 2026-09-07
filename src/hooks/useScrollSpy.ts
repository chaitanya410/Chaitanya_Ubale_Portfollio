import { useEffect, useState } from "react";

interface ScrollSpyOptions {
  /** IntersectionObserver rootMargin — defaults to a band around the viewport's vertical centre. */
  rootMargin?: string;
}

/**
 * Returns the id of the section currently considered "active" (closest to the
 * viewport centre). Falls back to the first id until one is observed, and to the
 * last id once the page is scrolled to the bottom.
 */
export function useScrollSpy(ids: string[], { rootMargin = "-45% 0px -45% 0px" }: ScrollSpyOptions = {}): string | null {
  const key = ids.join("|");
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const sectionIds = key ? key.split("|") : [];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    if (typeof IntersectionObserver === "undefined") return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        if (visible.size > 0) {
          const [topId] = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
          setActiveId(topId);
        }
      },
      { rootMargin, threshold: [0, 0.15, 0.35, 0.6, 1] },
    );

    elements.forEach((el) => observer.observe(el));

    const onScrollEnd = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        setActiveId(sectionIds[sectionIds.length - 1]);
      }
    };
    window.addEventListener("scroll", onScrollEnd, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollEnd);
    };
  }, [key, rootMargin]);

  return activeId;
}

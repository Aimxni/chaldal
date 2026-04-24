import { useEffect, useRef } from "react";

/**
 * Scroll-down reveal hook.
 *
 * - Animates element in (sets data-revealed="true") when it enters the viewport
 *   while the user is scrolling DOWN.
 * - Resets (data-revealed="false") when it leaves out the BOTTOM of the
 *   viewport (i.e. user has scrolled back up past it), so the next downward
 *   scroll re-triggers the animation.
 * - Does NOT reset when leaving out the top, and does NOT re-trigger on
 *   upward scroll — keeps upward scrolling clean.
 * - Honors prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.setAttribute("data-revealed", "true");
      return;
    }

    let lastY = window.scrollY;
    let direction: "down" | "up" = "down";
    const onScroll = () => {
      const y = window.scrollY;
      direction = y > lastY ? "down" : "up";
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            // Reveal only on downward scroll (or initial load when direction is "down").
            if (direction === "down") {
              target.setAttribute("data-revealed", "true");
            }
          } else {
            // Reset only when leaving out the BOTTOM of the viewport
            // (user scrolled up past the element).
            const rect = entry.boundingClientRect;
            const viewportH = window.innerHeight;
            if (rect.top >= viewportH) {
              target.setAttribute("data-revealed", "false");
            }
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return ref;
}

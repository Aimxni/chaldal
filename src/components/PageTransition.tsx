import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * PageTransition — full-viewport ink wipe between routes.
 *
 * On every pathname change we mount a one-shot overlay that:
 *  1. Sweeps two panels in from above + below to cover the viewport.
 *  2. Holds briefly while we scroll the new page to top.
 *  3. Sweeps the panels back out, revealing the new page.
 *
 * Then it unmounts. Skipped for prefers-reduced-motion.
 */
const EASE = [0.16, 1, 0.3, 1] as const;
const COVER = 0.32; // seconds
const HOLD = 0.04;
const REVEAL = 0.32;

const PageTransition = () => {
  const { pathname } = useLocation();
  const [overlayKey, setOverlayKey] = useState<string | null>(null);
  const isFirst = useRef(true);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (reduced.current) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    setOverlayKey(pathname + ":" + Date.now());
    // Scroll to top mid-cover.
    const scrollTimer = setTimeout(
      () => window.scrollTo({ top: 0, behavior: "auto" }),
      COVER * 1000,
    );
    // Unmount overlay after the full sequence.
    const unmountTimer = setTimeout(
      () => setOverlayKey(null),
      (COVER + HOLD + REVEAL) * 1000 + 50,
    );
    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(unmountTimer);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {overlayKey && (
        <div
          key={overlayKey}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60]"
        >
          {/* Top panel */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: ["-100%", "0%", "0%", "-100%"] }}
            transition={{
              duration: COVER + HOLD + REVEAL,
              times: [0, COVER / (COVER + HOLD + REVEAL), (COVER + HOLD) / (COVER + HOLD + REVEAL), 1],
              ease: EASE,
            }}
            className="absolute inset-x-0 top-0 h-1/2 bg-background"
          />
          {/* Bottom panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: ["100%", "0%", "0%", "100%"] }}
            transition={{
              duration: COVER + HOLD + REVEAL,
              times: [0, COVER / (COVER + HOLD + REVEAL), (COVER + HOLD) / (COVER + HOLD + REVEAL), 1],
              ease: EASE,
            }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-secondary"
          />
          {/* Centerline accent */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: COVER + HOLD + REVEAL,
              times: [0, COVER / (COVER + HOLD + REVEAL), (COVER + HOLD) / (COVER + HOLD + REVEAL), 1],
              ease: EASE,
            }}
            className="absolute left-0 right-0 top-1/2 h-px origin-left bg-accent"
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;

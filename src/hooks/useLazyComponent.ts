import { useEffect, useRef, useState, lazy, type ComponentType, type LazyExoticComponent } from "react";

type ImportFn<T extends ComponentType<any>> = () => Promise<{ default: T }>;

/**
 * useLazyComponent — Triggers a dynamic import only after the sentinel element
 * scrolls into the viewport (with configurable rootMargin for pre-fetching).
 *
 * Returns { ref, Component, hasIntersected } — attach `ref` to a wrapper div
 * and render `Component` (a React.lazy wrapper) inside a <Suspense>.
 *
 * Designed for Slow 4G in Bangladesh: by deferring imports for off-screen
 * listing cards we reduce the initial JS parse/eval cost on low-end devices.
 */
export function useLazyComponent<T extends ComponentType<any>>(
  importFn: ImportFn<T>,
  { rootMargin = "200px", threshold = 0 }: IntersectionObserverInit = {},
) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [hasIntersected, setHasIntersected] = useState(false);
  // Keep a stable reference to the lazy component so React doesn't remount.
  const lazyRef = useRef<LazyExoticComponent<T> | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || hasIntersected) return;

    // Fallback for environments without IntersectionObserver (rare, but safe).
    if (typeof IntersectionObserver === "undefined") {
      setHasIntersected(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);

    // Safety fallback: IntersectionObserver callbacks are throttled in hidden
    // tabs and some prerender environments. After the browser is idle, trigger
    // loading so the site is interactive even in those edge cases.
    const ric: (cb: () => void) => number =
      (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback ??
      ((cb) => window.setTimeout(cb, 1500));
    const idleId = ric(() => setHasIntersected((prev) => prev || true));

    return () => {
      observer.disconnect();
      const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (cic) cic(idleId);
      else clearTimeout(idleId);
    };
  }, [hasIntersected, rootMargin, threshold]);

  // Create the lazy component once, on first intersection.
  if (hasIntersected && !lazyRef.current) {
    lazyRef.current = lazy(importFn);
  }

  return {
    /** Attach to a wrapper element as the scroll sentinel. */
    ref: sentinelRef,
    /** null until intersected, then a React.lazy component ready for <Suspense>. */
    Component: lazyRef.current,
    /** Whether the sentinel has entered the viewport. */
    hasIntersected,
  };
}

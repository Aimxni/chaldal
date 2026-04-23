import { useEffect, useRef, useState } from "react";

type PreloadState = {
  /** The image is fully loaded and decoded — ready for instant paint. */
  isLoaded: boolean;
  /** The image failed to load (network error, 404, etc.). */
  isError: boolean;
  /** The resolved src (same as input — useful for cache-busting scenarios). */
  src: string;
};

/**
 * useHeroPreload — preloads a critical above-the-fold image to improve LCP.
 *
 * How it works:
 *  1. On mount, injects a `<link rel="preload" as="image">` into <head> so
 *     the browser starts fetching immediately, even before React renders the
 *     <img> element.
 *  2. Creates an off-screen `Image()` object and listens for `load` / `error`.
 *  3. After load, calls `img.decode()` to ensure the decoded frame is ready
 *     before we flip `isLoaded` — this prevents the "white flash" that happens
 *     when the browser hasn't decoded the image yet at paint time.
 *
 * Designed for the Bangladesh market where Slow 4G means the hero image is
 * often the bottleneck for Largest Contentful Paint.
 */
export function useHeroPreload(imageSrc: string): PreloadState {
  const [state, setState] = useState<PreloadState>({
    isLoaded: false,
    isError: false,
    src: imageSrc,
  });

  // Prevent double-initialization in StrictMode.
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    // 1. Inject <link rel="preload"> into <head> for earliest possible fetch.
    let linkEl: HTMLLinkElement | null = null;
    try {
      linkEl = document.createElement("link");
      linkEl.rel = "preload";
      linkEl.as = "image";
      linkEl.href = imageSrc;
      // fetchpriority="high" tells the browser this is LCP-critical.
      linkEl.setAttribute("fetchpriority", "high");
      document.head.appendChild(linkEl);
    } catch {
      // Non-critical — the <img> tag will still load the image.
    }

    // 2. Create an off-screen Image to track load state.
    const img = new Image();
    img.src = imageSrc;

    const onLoad = () => {
      // 3. Decode the image so the frame is rasterized before we paint.
      if (typeof img.decode === "function") {
        img
          .decode()
          .then(() => {
            setState({ isLoaded: true, isError: false, src: imageSrc });
          })
          .catch(() => {
            // decode() can fail in some edge cases — still mark as loaded
            // since the image data is available.
            setState({ isLoaded: true, isError: false, src: imageSrc });
          });
      } else {
        setState({ isLoaded: true, isError: false, src: imageSrc });
      }
    };

    const onError = () => {
      setState({ isLoaded: false, isError: true, src: imageSrc });
    };

    // If the image is already cached, `complete` will be true synchronously.
    if (img.complete && img.naturalWidth > 0) {
      onLoad();
    } else {
      img.addEventListener("load", onLoad);
      img.addEventListener("error", onError);
    }

    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);

      // Clean up the preload link on unmount.
      if (linkEl && linkEl.parentNode) {
        linkEl.parentNode.removeChild(linkEl);
      }
    };
  }, [imageSrc]);

  return state;
}

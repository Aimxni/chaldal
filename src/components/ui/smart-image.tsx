import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Optional override for the placeholder background colour. Defaults to bg-secondary. */
  placeholderClassName?: string;
  /** Subtle scale-up settle on load. Default true. */
  settle?: boolean;
};

/**
 * Renders an <img> with a soft skeleton placeholder behind it that fades the
 * picture in once decoded. Prevents the visible "pop-in" you get with
 * lazy-loaded images while filtering or scrolling.
 *
 * Uses CSS transitions instead of framer-motion to avoid non-composited
 * animation warnings from Lighthouse. The `will-change: transform, opacity`
 * hint promotes the element to its own compositor layer so the GPU handles
 * the transition — zero main-thread jank.
 */
const SmartImage = ({
  className,
  placeholderClassName,
  settle = true,
  loading = "lazy",
  decoding = "async",
  src,
  srcSet,
  sizes,
  alt,
  onLoad,
  onError,
  ...props
}: SmartImageProps) => {
  const ref = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // If the image is already in the browser cache, the load event won't fire
  // — detect that synchronously and mark as loaded.
  useEffect(() => {
    const el = ref.current;
    setErrored(false);
    if (el && el.complete && el.naturalWidth > 0) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [src]);

  // Deterministic picsum.photos fallback keyed off a slug derived from the
  // original src — keeps the same placeholder across reloads instead of
  // flashing a different one each time. Used when the upstream (e.g.
  // Unsplash) returns 404. Seed is restricted to alphanumerics so picsum
  // can resolve it cleanly (no URL-encoded slashes).
  const fallbackSrc = (() => {
    const raw = (src as string | undefined) ?? alt ?? "x";
    const idMatch = raw.match(/photo-[a-z0-9-]+/i)?.[0];
    const seed = (idMatch ?? raw).replace(/[^a-zA-Z0-9-]/g, "").slice(0, 64) || "x";
    return `https://picsum.photos/seed/${seed}/480/600`;
  })();
  const effectiveSrc = errored ? fallbackSrc : (src as string | undefined);
  const effectiveSrcSet = errored ? undefined : srcSet;

  return (
    <span className={cn("relative block h-full w-full overflow-hidden", className)}>
      {/* Placeholder layer — a soft pulsing tone that sits behind the image */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-500",
          "bg-secondary",
          loaded ? "opacity-0" : "animate-pulse opacity-100",
          placeholderClassName,
        )}
      />
      <img
        ref={ref}
        src={effectiveSrc}
        srcSet={effectiveSrcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          // Swap to the deterministic placeholder once. Don't re-trigger
          // onError if the placeholder also fails (avoid loops).
          if (!errored) setErrored(true);
          onError?.(e);
        }}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "will-change-[transform,opacity]",
          loaded ? "opacity-100 scale-100" : `opacity-0 ${settle ? "scale-[1.04]" : "scale-100"}`,
        )}
        {...props}
      />
    </span>
  );
};

export default SmartImage;

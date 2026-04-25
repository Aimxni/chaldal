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
  onLoad,
  ...props
}: SmartImageProps) => {
  const ref = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  // If the image is already in the browser cache, the load event won't fire
  // — detect that synchronously and mark as loaded.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [src]);

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
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        loading={loading}
        decoding={decoding}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
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

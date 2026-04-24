import { ElementType, HTMLAttributes, CSSProperties } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "up-soft" | "fade" | "scale" | "slide-left" | "slide-right";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: RevealVariant;
  /** Delay in ms before this element animates in. */
  delay?: number;
  /** Cascade children with N ms between each (uses CSS `.reveal-stagger`). */
  stagger?: boolean;
}

/**
 * Scroll reveal wrapper. Children fade + slide/scale into view once when they
 * enter the viewport. Cluely-style: smooth, soft, one-shot.
 */
const Reveal = ({
  as,
  variant = "up",
  delay = 0,
  stagger = false,
  className,
  style,
  children,
  ...rest
}: RevealProps) => {
  const Tag = (as ?? "div") as ElementType;
  const ref = useReveal<HTMLElement>();

  const variantClass = `reveal-${variant}`;

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={cn("reveal", variantClass, stagger && "reveal-stagger", className)}
      style={{ ...(style as CSSProperties), transitionDelay: delay ? `${delay}ms` : undefined }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;

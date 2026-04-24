import { forwardRef } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * Btn — single source of truth for premium buttons.
 *
 * Visual recipe is in `src/index.css` under `@layer components` (.btn, .btn-*).
 * No JS animation, no framer-motion, no layout-thrash.
 * Animates only `transform` + `box-shadow` (compositor-only).
 *
 * Variants:
 *  - primary  : deep leaf-green workhorse CTA
 *  - accent   : sun-yellow, reserved for top-priority CTAs
 *  - secondary: hairline ink ghost (cream backgrounds)
 *  - glass    : frosted, for image / colored panels
 *  - ivory    : cream pill, for hero-red / dark panels
 *
 * Sizes: sm | md (default) | lg
 */

export type BtnVariant =
  | "primary"
  | "accent"
  | "secondary"
  | "glass"
  | "ivory";
export type BtnSize = "sm" | "md" | "lg";

const variantClass: Record<BtnVariant, string> = {
  primary: "btn-primary",
  accent: "btn-accent",
  secondary: "btn-secondary",
  glass: "btn-glass",
  ivory: "btn-ivory",
};

const sizeClass: Record<BtnSize, string> = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

interface CommonProps {
  variant?: BtnVariant;
  size?: BtnSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;
type AnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };
type RouterLinkProps = CommonProps &
  Omit<LinkProps, "className" | "children">;

export const Btn = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, type = "button", ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn("btn", sizeClass[size], variantClass[variant], className)}
      {...rest}
    >
      {children}
    </button>
  ),
);
Btn.displayName = "Btn";

export const BtnA = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ variant = "primary", size = "md", className, children, ...rest }, ref) => (
    <a
      ref={ref}
      className={cn("btn", sizeClass[size], variantClass[variant], className)}
      {...rest}
    >
      {children}
    </a>
  ),
);
BtnA.displayName = "BtnA";

export const BtnLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  ({ variant = "primary", size = "md", className, children, ...rest }, ref) => (
    <Link
      ref={ref}
      className={cn("btn", sizeClass[size], variantClass[variant], className)}
      {...rest}
    >
      {children}
    </Link>
  ),
);
BtnLink.displayName = "BtnLink";

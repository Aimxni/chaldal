import { Suspense, type ComponentType } from "react";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Reveal from "@/components/Reveal";
import { useLazyComponent } from "@/hooks/useLazyComponent";

/**
 * Landing page.
 *
 * Above the fold (Navbar + Hero) is imported eagerly so LCP paints on the
 * first bundle. Every below-the-fold section is deferred via
 * IntersectionObserver (200px rootMargin) — the dynamic import is only
 * kicked off once the user scrolls within range. This keeps initial JS
 * parse/eval small and dramatically improves TBT on mobile.
 *
 * Each section is still wrapped in <Reveal> so its entrance animation
 * (variant-driven CSS fade/slide/scale) plays once content mounts.
 */

type RevealVariant = "up" | "up-soft" | "fade" | "scale" | "slide-left" | "slide-right";

const SECTION_FALLBACK_CLASS = "min-h-[40vh] w-full";

type LazyRevealSectionProps = {
  loader: () => Promise<{ default: ComponentType }>;
  variant: RevealVariant;
};

const LazyRevealSection = ({ loader, variant }: LazyRevealSectionProps) => {
  const { ref, Component } = useLazyComponent(loader, { rootMargin: "200px" });
  return (
    <div ref={ref} className={Component ? undefined : SECTION_FALLBACK_CLASS}>
      {Component ? (
        <Suspense fallback={<div className={SECTION_FALLBACK_CLASS} />}>
          <Reveal variant={variant}>
            <Component />
          </Reveal>
        </Suspense>
      ) : null}
    </div>
  );
};

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/* Editorial sequence — each section gets a deliberate motion shape.
          Durations are unified via --reveal-duration; only the shape varies. */}
      <LazyRevealSection variant="up"          loader={() => import("@/components/site/CategoryGrid")} />
      <LazyRevealSection variant="slide-right" loader={() => import("@/components/site/PopularBrands")} />
      <LazyRevealSection variant="scale"       loader={() => import("@/components/site/ShopAndGetMore")} />
      <LazyRevealSection variant="up-soft"     loader={() => import("@/components/site/ValueProps")} />
      <LazyRevealSection variant="scale"       loader={() => import("@/components/site/AppDownload")} />
      <LazyRevealSection variant="fade"        loader={() => import("@/components/site/Stats")} />
      <LazyRevealSection variant="slide-left"  loader={() => import("@/components/site/CommonQuestions")} />
      <LazyRevealSection variant="scale"       loader={() => import("@/components/site/JoinFamily")} />
      <LazyRevealSection variant="fade"        loader={() => import("@/components/site/Footer")} />
    </main>
  );
};

export default Index;

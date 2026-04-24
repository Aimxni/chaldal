import { lazy, Suspense } from "react";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Reveal from "@/components/Reveal";

/**
 * Landing page.
 *
 * Above the fold (Navbar + Hero) ships in the main bundle so LCP paints ASAP.
 *
 * All below-the-fold sections are wrapped in a SINGLE <Suspense> boundary.
 * React keeps that boundary suspended until every lazy child resolves, so
 * the user never sees sections streaming in one-by-one. Meanwhile each
 * dynamic import() becomes its own chunk that the browser fetches and parses
 * in parallel — reducing TBT vs. one giant bundled-together blob.
 *
 * Net effect: small initial JS (fast FCP/LCP), then the entire rest of the
 * page appears together once the parallel chunks settle.
 */
const CategoryGrid = lazy(() => import("@/components/site/CategoryGrid"));
const PopularBrands = lazy(() => import("@/components/site/PopularBrands"));
const ShopAndGetMore = lazy(() => import("@/components/site/ShopAndGetMore"));
const ValueProps = lazy(() => import("@/components/site/ValueProps"));
const AppDownload = lazy(() => import("@/components/site/AppDownload"));
const Stats = lazy(() => import("@/components/site/Stats"));
const CommonQuestions = lazy(() => import("@/components/site/CommonQuestions"));
const JoinFamily = lazy(() => import("@/components/site/JoinFamily"));
const Footer = lazy(() => import("@/components/site/Footer"));

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/* Single Suspense gate: every lazy section resolves before any render,
          so the reveal feels simultaneous rather than staggered. */}
      <Suspense fallback={null}>
        <Reveal variant="up"><CategoryGrid /></Reveal>
        <Reveal variant="slide-right"><PopularBrands /></Reveal>
        <Reveal variant="scale"><ShopAndGetMore /></Reveal>
        <Reveal variant="up-soft"><ValueProps /></Reveal>
        <Reveal variant="scale"><AppDownload /></Reveal>
        <Reveal variant="fade"><Stats /></Reveal>
        <Reveal variant="slide-left"><CommonQuestions /></Reveal>
        <Reveal variant="scale"><JoinFamily /></Reveal>
        <Reveal variant="fade"><Footer /></Reveal>
      </Suspense>
    </main>
  );
};

export default Index;

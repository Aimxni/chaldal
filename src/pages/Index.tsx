import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Footer from "@/components/site/Footer";
import CategoryGrid from "@/components/site/CategoryGrid";
import PopularBrands from "@/components/site/PopularBrands";
import ShopAndGetMore from "@/components/site/ShopAndGetMore";
import ValueProps from "@/components/site/ValueProps";
import Stats from "@/components/site/Stats";
import CommonQuestions from "@/components/site/CommonQuestions";
import JoinFamily from "@/components/site/JoinFamily";
import AppDownload from "@/components/site/AppDownload";
import Reveal from "@/components/Reveal";

/**
 * Landing page.
 *
 * Sections are imported eagerly (no lazy/Suspense) so scrolling is buttery
 * smooth — every section is parsed and ready in the initial bundle, with no
 * per-section JS fetch + mount delay as the user scrolls.
 *
 * Each section below the hero is wrapped in <Reveal> for a Cluely-style
 * fade/slide-in as it enters the viewport.
 */
const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/* Editorial sequence — each section gets a deliberate motion shape.
          Durations are unified via --reveal-duration; only the shape varies. */}
      <Reveal variant="up"><CategoryGrid /></Reveal>
      <Reveal variant="slide-right"><PopularBrands /></Reveal>
      <Reveal variant="scale"><ShopAndGetMore /></Reveal>
      <Reveal variant="up-soft"><ValueProps /></Reveal>
      <Reveal variant="scale"><AppDownload /></Reveal>
      <Reveal variant="fade"><Stats /></Reveal>
      <Reveal variant="slide-left"><CommonQuestions /></Reveal>
      <Reveal variant="scale"><JoinFamily /></Reveal>
      <Reveal variant="fade"><Footer /></Reveal>
    </main>
  );
};

export default Index;

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
      <Reveal><CategoryGrid /></Reveal>
      <Reveal><PopularBrands /></Reveal>
      <Reveal><ShopAndGetMore /></Reveal>
      <Reveal><ValueProps /></Reveal>
      <Reveal><Stats /></Reveal>
      <Reveal><CommonQuestions /></Reveal>
      <Reveal><JoinFamily /></Reveal>
      <Reveal variant="fade"><Footer /></Reveal>
    </main>
  );
};

export default Index;

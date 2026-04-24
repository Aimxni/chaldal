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

/**
 * Landing page.
 *
 * Sections are imported eagerly (no lazy/Suspense) so scrolling is buttery
 * smooth — every section is parsed and ready in the initial bundle, with no
 * per-section JS fetch + mount delay as the user scrolls.
 *
 * The hero image is still preloaded via <link rel="preload"> in index.html,
 * and other images use loading="lazy" so bandwidth stays in check.
 */
const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CategoryGrid />
      <PopularBrands />
      <ShopAndGetMore />
      <ValueProps />
      <Stats />
      <CommonQuestions />
      <JoinFamily />
      <Footer />
    </main>
  );
};

export default Index;

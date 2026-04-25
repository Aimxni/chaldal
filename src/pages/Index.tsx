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

/**
 * Landing page — Untill-style minimal layout. AisleDividers removed in
 * favor of clean hairline transitions handled inside each section.
 */
const Index = () => {
  return (
    <main className="min-h-screen bg-[hsl(38_45%_96%)]">
      <Navbar />
      <Hero />
      <CategoryGrid />
      <PopularBrands />
      <ShopAndGetMore />
      <ValueProps />
      <AppDownload />
      <Stats />
      <CommonQuestions />
      <JoinFamily />
      <Footer />
    </main>
  );
};

export default Index;

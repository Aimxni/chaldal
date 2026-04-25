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
import AisleDivider from "@/components/site/AisleDivider";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <AisleDivider number="No. 02" label="Today's market stalls" />
      <CategoryGrid />
      <AisleDivider number="No. 03" label="Brands we stock" />
      <PopularBrands />
      <ShopAndGetMore />
      <AisleDivider number="No. 04" label="Why shop with us" />
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

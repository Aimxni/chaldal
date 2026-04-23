import { Suspense } from "react";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Footer from "@/components/site/Footer";
import { useLazyComponent } from "@/hooks/useLazyComponent";

const Index = () => {
  // Below-the-fold sections — only fetch their JS when the user scrolls near them.
  const { ref: catRef, Component: CategoryGrid } = useLazyComponent(
    () => import("@/components/site/CategoryGrid"),
    { rootMargin: "600px" },
  );

  const { ref: brandsRef, Component: PopularBrands } = useLazyComponent(
    () => import("@/components/site/PopularBrands"),
    { rootMargin: "600px" },
  );

  const { ref: shopMoreRef, Component: ShopAndGetMore } = useLazyComponent(
    () => import("@/components/site/ShopAndGetMore"),
    { rootMargin: "600px" },
  );

  const { ref: whyRef, Component: ValueProps } = useLazyComponent(
    () => import("@/components/site/ValueProps"),
    { rootMargin: "600px" },
  );

  const { ref: statsRef, Component: Stats } = useLazyComponent(
    () => import("@/components/site/Stats"),
    { rootMargin: "600px" },
  );

  const { ref: faqRef, Component: CommonQuestions } = useLazyComponent(
    () => import("@/components/site/CommonQuestions"),
    { rootMargin: "600px" },
  );

  const { ref: familyRef, Component: JoinFamily } = useLazyComponent(
    () => import("@/components/site/JoinFamily"),
    { rootMargin: "600px" },
  );

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      <div ref={catRef} className="min-h-[60vh]">
        {CategoryGrid && (
          <Suspense fallback={<div className="h-full w-full" />}>
            <CategoryGrid />
          </Suspense>
        )}
      </div>

      <div ref={brandsRef} className="min-h-[30vh]">
        {PopularBrands && (
          <Suspense fallback={<div className="h-full w-full" />}>
            <PopularBrands />
          </Suspense>
        )}
      </div>

      <div ref={shopMoreRef} className="min-h-[60vh]">
        {ShopAndGetMore && (
          <Suspense fallback={<div className="h-full w-full" />}>
            <ShopAndGetMore />
          </Suspense>
        )}
      </div>

      <div ref={whyRef} className="min-h-[40vh]">
        {ValueProps && (
          <Suspense fallback={<div className="h-full w-full" />}>
            <ValueProps />
          </Suspense>
        )}
      </div>

      <div ref={statsRef} className="min-h-[50vh]">
        {Stats && (
          <Suspense fallback={<div className="h-full w-full" />}>
            <Stats />
          </Suspense>
        )}
      </div>

      <div ref={faqRef} className="min-h-[50vh]">
        {CommonQuestions && (
          <Suspense fallback={<div className="h-full w-full" />}>
            <CommonQuestions />
          </Suspense>
        )}
      </div>

      <div ref={familyRef} className="min-h-[40vh]">
        {JoinFamily && (
          <Suspense fallback={<div className="h-full w-full" />}>
            <JoinFamily />
          </Suspense>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default Index;

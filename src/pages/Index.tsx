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

  const { ref: dealsRef, Component: FeaturedDeals } = useLazyComponent(
    () => import("@/components/site/FeaturedDeals"),
    { rootMargin: "600px" },
  );

  const { ref: whyRef, Component: ValueProps } = useLazyComponent(
    () => import("@/components/site/ValueProps"),
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

      <div ref={dealsRef} className="min-h-[60vh]">
        {FeaturedDeals && (
          <Suspense fallback={<div className="h-full w-full" />}>
            <FeaturedDeals />
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

      <Footer />
    </main>
  );
};

export default Index;

import { Suspense } from "react";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Footer from "@/components/site/Footer";
import { useLazyComponent } from "@/hooks/useLazyComponent";

const Index = () => {
  // Only trigger JS downloads for these sections when the user scrolls near them.
  // This frees up the network and main thread for a blazing fast initial Hero paint.
  const { ref: featuredRef, Component: FeaturedRooms } = useLazyComponent(
    () => import("@/components/site/FeaturedRooms"),
    { rootMargin: "600px" }
  );
  
  const { ref: neighRef, Component: Neighbourhoods } = useLazyComponent(
    () => import("@/components/site/Neighbourhoods"),
    { rootMargin: "600px" }
  );

  const { ref: storyRef, Component: Story } = useLazyComponent(
    () => import("@/components/site/Story"),
    { rootMargin: "600px" }
  );

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Featured Rooms Section */}
      <div ref={featuredRef} className="min-h-screen">
        {FeaturedRooms && (
          <Suspense fallback={<div className="h-full w-full" />}>
            <FeaturedRooms />
          </Suspense>
        )}
      </div>

      {/* Neighbourhoods Section */}
      <div ref={neighRef} className="min-h-[80vh]">
        {Neighbourhoods && (
          <Suspense fallback={<div className="h-full w-full" />}>
            <Neighbourhoods />
          </Suspense>
        )}
      </div>

      {/* Story Section */}
      <div ref={storyRef} className="min-h-[60vh]">
        {Story && (
          <Suspense fallback={<div className="h-full w-full" />}>
            <Story />
          </Suspense>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default Index;

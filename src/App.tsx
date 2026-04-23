import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
const Rooms = lazy(() => import("./pages/Rooms.tsx"));
const RoomDetail = lazy(() => import("./pages/RoomDetail.tsx"));
const Checkout = lazy(() => import("./pages/Checkout.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Page transition involves framer-motion. We lazy load it so it doesn't block the initial FCP
const PageTransition = lazy(() => import("@/components/PageTransition"));

// Lazy load global toast providers so they don't block main-thread execution on launch
const Toaster = lazy(() => import("@/components/ui/toaster").then((module) => ({ default: module.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then((module) => ({ default: module.Toaster })));

const queryClient = new QueryClient();

const App = () => {
  // Fade out App Shell ONLY when both React has mounted AND CSS has loaded
  useEffect(() => {
    // @ts-ignore
    if (window.__APP_STATE) {
      // @ts-ignore
      window.__APP_STATE.reactMounted = true;
      // In dev mode (Vite serves CSS via <style> tags, not <link rel="stylesheet">),
      // the asyncCssPlugin onload handler never fires. Force cssLoaded=true so the
      // shell can be removed. In prod the onload usually wins first; this is a safety net.
      // @ts-ignore
      window.__APP_STATE.cssLoaded = true;
      // @ts-ignore
      if (typeof window.tryRemoveAppShell === "function") {
        // @ts-ignore
        window.tryRemoveAppShell();
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Suspense fallback={null}>
        <Toaster />
        <Sonner />
      </Suspense>
      <BrowserRouter>
        <Suspense fallback={null}>
          <PageTransition />
        </Suspense>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:slug" element={<RoomDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;

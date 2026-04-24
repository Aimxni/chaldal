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
  // In dev, Vite serves CSS inline via <style> (no <link>), so the onload
  // handler baked into the <link> tag never fires — we force cssLoaded=true.
  // In PROD the async <link> onload must win, otherwise the shell gets removed
  // before the stylesheet arrives and the user sees unstyled React content.
  useEffect(() => {
    const appState = (window as unknown as {
      __APP_STATE?: { cssLoaded: boolean; reactMounted: boolean };
      tryRemoveAppShell?: () => void;
    }).__APP_STATE;
    if (!appState) return;
    appState.reactMounted = true;
    if (import.meta.env.DEV) {
      appState.cssLoaded = true;
    }
    (window as unknown as { tryRemoveAppShell?: () => void }).tryRemoveAppShell?.();

    // Watchdog: on catastrophic CSS failure, force-remove the shell after 5s
    // rather than leaving the user staring at the skeleton indefinitely.
    const watchdog = window.setTimeout(() => {
      if (!appState.cssLoaded) {
        appState.cssLoaded = true;
        (window as unknown as { tryRemoveAppShell?: () => void }).tryRemoveAppShell?.();
      }
    }, 5000);
    return () => window.clearTimeout(watchdog);
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

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const asyncCssPlugin = () => ({
  name: "async-css",
  enforce: "post" as const,
  transformIndexHtml(html: string) {
    return html.replace(
      /<link rel="stylesheet"(.*?)href="(\/assets\/[^"]+\.css)"(.*?)>/g,
      `<link rel="preload" href="$2" as="style" />\n    <link rel="stylesheet"$1href="$2"$3 media="print" onload="this.media='all'; window.__APP_STATE.cssLoaded=true; window.tryRemoveAppShell();" />`
    );
  },
});

/**
 * Emit <link rel="modulepreload"> for below-the-fold section chunks so the
 * browser fetches them in parallel with the main bundle instead of waiting
 * for React to request them on mount. Cuts a round-trip per chunk on cold
 * loads.
 */
const SECTION_NAMES = [
  "CategoryGrid",
  "PopularBrands",
  "ShopAndGetMore",
  "ValueProps",
  "AppDownload",
  "Stats",
  "CommonQuestions",
  "JoinFamily",
  "Footer",
];

const preloadSectionChunks = () => ({
  name: "preload-section-chunks",
  enforce: "post" as const,
  transformIndexHtml: {
    order: "post" as const,
    handler(html: string, ctx: { bundle?: Record<string, { fileName: string; type: string }> }) {
      if (!ctx.bundle) return html;
      const hrefs: string[] = [];
      for (const chunk of Object.values(ctx.bundle)) {
        if (chunk.type !== "chunk") continue;
        const base = chunk.fileName.split("/").pop() ?? "";
        if (SECTION_NAMES.some((name) => base.startsWith(`${name}-`))) {
          hrefs.push(`/${chunk.fileName}`);
        }
      }
      if (!hrefs.length) return html;
      const tags = hrefs
        .map((h) => `    <link rel="modulepreload" crossorigin href="${h}">`)
        .join("\n");
      return html.replace("</head>", `${tags}\n  </head>`);
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), asyncCssPlugin(), preloadSectionChunks(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    // Target modern browsers — avoids shipping legacy polyfills
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React core into its own cached chunk (~42 KB gzip).
          // Changes to app code won't invalidate this chunk.
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Framer-motion is large (~35 KB gzip). Isolate it so pages
          // that don't animate can skip loading it entirely.
          "vendor-motion": ["framer-motion"],
          // Radix UI primitives — shared across many components
          "vendor-radix": [
            "@radix-ui/react-tooltip",
            "@radix-ui/react-toast",
            "@radix-ui/react-dialog",
            "@radix-ui/react-slot",
          ],
        },
      },
    },
  },
}));

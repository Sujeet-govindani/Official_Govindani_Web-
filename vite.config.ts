import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  
  build: {
    // Lighthouse Best Practices flags missing source maps for large
    // first-party JS. These are only fetched by devtools, never by visitors.
    sourcemap: true,
    // Split heavy vendor libraries out of the main bundle.
    //
    // Everything previously landed in one 3.3 MB file (1.11 MB over the wire),
    // all of which had to download and parse before anything rendered. three.js,
    // recharts and gsap are only needed by specific sections, so isolating them
    // lets the browser fetch them in parallel and cache them independently of
    // application code — a content change no longer invalidates the libraries.
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          // NOTE: do NOT list `three` or `recharts` here. Naming a bare package in
          // manualChunks FORCE-INCLUDES it even when nothing imports it — recharts
          // (~139 KB) was being force-bundled and executed ~840 ms on the homepage
          // although ui/chart.tsx (its only importer) is itself imported nowhere.
          // Leaving them out lets Rollup tree-shake both away entirely.
          "vendor-motion": ["framer-motion", "gsap"],
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": ["lucide-react", "embla-carousel-react", "styled-components"],
          "vendor-icons": ["react-icons"],
        },
      },
    },
  },
server: {
    // host: "official-govindani-web.vercel.app",
    host: "localhost",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Strip speculative <link rel="modulepreload"> for the heavy below-the-fold vendors
    // (framer-motion ~200 KB, recharts ~138 KB, three). Vite preloads them because the
    // homepage's lazy sections depend on them, but those sections are cv-defer + Suspense
    // deferred — preloading ~340 KB at first paint only starves the hero's bandwidth and
    // pushes out FCP/LCP on throttled mobile. They still load (lower priority) when their
    // section mounts. vendor-react / vendor-ui (the app shell) stay preloaded.
    {
      name: "strip-heavy-vendor-preload",
      transformIndexHtml(html: string) {
        return html.replace(
          /\s*<link[^>]*rel="modulepreload"[^>]*href="[^"]*vendor-(?:motion|charts|three)[^"]*"[^>]*>/g,
          ""
        );
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

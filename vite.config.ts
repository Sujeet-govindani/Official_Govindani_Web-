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
    // Vite speculatively <link rel=modulepreload>s the vendor deps of the homepage's
    // below-the-fold lazy sections (framer-motion ~200 KB, recharts ~138 KB, three).
    // That front-loads ~340 KB during first paint, starving the hero's bandwidth and
    // pushing out LCP/FCP on throttled mobile. These sections are cv-defer + Suspense
    // deferred, so let their heavy vendors load when the section actually mounts, not
    // at initial load. vendor-react / vendor-ui (the shell) stay preloaded.
    modulepreload: {
      resolveDependencies: (_url: string, deps: string[]) =>
        deps.filter((d) => !/vendor-(motion|charts|three)/.test(d)),
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-three": ["three"],
          "vendor-charts": ["recharts"],
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
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

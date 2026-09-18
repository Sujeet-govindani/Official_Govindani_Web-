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
          "vendor-three": ["three"],
          "vendor-charts": ["recharts"],
          "vendor-motion": ["framer-motion", "gsap"],
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": ["lucide-react", "embla-carousel-react", "styled-components"],
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

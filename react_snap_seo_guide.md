# React-Snap Pre-rendering Guide

This guide walks you through the configuration, implementation, and optimization of `react-snap` for pre-rendering your React application. I have already applied the basic installation and configuration steps to your Vite project.

> [!NOTE]
> Since you are using **Vite**, standard Create-React-App configuration for `react-snap` needs some tweaking. Vite builds into a `dist` directory by default, while `react-snap` expects `build`.

## 1. What Has Already Been Configured

I have already made the following changes to your project to get `react-snap` working:

### Installed Dependencies
Installed `react-snap` as a development dependency:
```bash
npm install --save-dev react-snap
```

### Updated `package.json` Scripts & Configuration
Added the `postbuild` script so that `react-snap` automatically runs after Vite finishes building your production bundle.
I also added the `"reactSnap"` configuration object to tell it where to look for the build output (`dist`).

```json
{
  "scripts": {
    "build": "vite build",
    "postbuild": "react-snap" // Automatically runs after 'npm run build'
  },
  "reactSnap": {
    "source": "dist", // Vite's default build directory
    "minifyHtml": {
      "collapseWhitespace": false,
      "removeComments": false
    },
    "puppeteerArgs": [
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ]
  }
}
```

### Hydration in `src/main.tsx` (React 18 Compatibility)
React 18 requires using `hydrateRoot` when mounting an app over pre-rendered HTML. I have modified your `main.tsx`:

```tsx
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import React from 'react';

const container = document.getElementById('root')!;

if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
```

---

## 2. Handling Dynamic Routes, API Calls & Lazy Loading

When `react-snap` visits your pages via a headless browser, it waits for the page to finish rendering before saving the HTML.

### Handling API Calls
If your components fetch data on mount, `react-snap` will wait for all network requests to finish before capturing the HTML. However, to prevent fetching the data **twice** (once during pre-rendering and once on hydration), you can check the `window.navigator.userAgent` to determine if `react-snap` is running.

```tsx
const isPrerendering = navigator.userAgent === 'ReactSnap';

useEffect(() => {
  if (!isPrerendering) {
    // Only fetch dynamic data when the user visits, not during the build
    fetchDynamicData();
  }
}, []);
```
> [!TIP]
> If using libraries like React Query, you might want to pre-fetch state during the build and embed it in the HTML, or simply let React Query fetch as normal when hydration occurs.

### Lazy Loaded Components (`React.lazy` & `Suspense`)
`react-snap` doesn't always play perfectly with standard `React.lazy` out of the box because hydration expects the chunk to already be loaded. 
If you encounter layout shifts or blank flashes on hydration, consider using **@loadable/component** instead of `React.lazy`, as it supports SSR/Pre-rendering chunk hydration better.

Alternatively, you can skip pre-rendering heavy lazy components by checking the user-agent:

```tsx
const isPrerendering = navigator.userAgent === 'ReactSnap';

return (
  <Suspense fallback={<Loader />}>
    {isPrerendering ? <Loader /> : <HeavyLazyComponent />}
  </Suspense>
);
```

### Pre-rendering Specific Dynamic Routes
By default, `react-snap` crawls your app by finding all `<a>` tags. If you have dynamic routes that aren't linked anywhere (e.g., `/user/:id`), you must manually include them in `package.json`:

```json
"reactSnap": {
  "include": [
    "/user/123",
    "/user/456",
    "/custom-unlinked-path"
  ]
}
```

---

## 3. How to Verify Pre-rendering is Working

1. **Build your project**: Run `npm run build`.
2. **Observe the terminal**: You should see `react-snap` outputting a list of routes it crawled:
   ```
   ✨  Done in 5.43s.
   react-snap
   ✅  crawled 1 out of 10 (/)
   ✅  crawled 2 out of 10 (/about)
   ✅  crawled 3 out of 10 (/services/google-ads)
   ...
   ```
3. **Inspect the `dist` folder**: Inside `dist`, you should now see `index.html` as well as generated directories for your routes (e.g., `dist/about/index.html`).
4. **Test the production build locally**:
   ```bash
   npm run preview
   ```
   Open the site, disable JavaScript in your browser settings (or DevTools), and refresh. You should still see the fully rendered page content (this is what search engine bots see!).

---

## 4. Common Troubleshooting Pitfalls

> [!WARNING]
> **Blank Pages in Production:**
> If you are using `<BrowserRouter>` and hosting on a static platform (like GitHub Pages or basic AWS S3 without rewrite rules), direct navigation to pre-rendered routes might fail. Ensure your web host redirects 404s to `index.html` or correctly resolves `/route-name/index.html`.

> [!WARNING]
> **Hydration Errors in Console:**
> `Warning: Expected server HTML to contain a matching <div> in <div>.`
> This happens when your React component output differs between the headless browser (Node environment) and the client browser. Common culprits include:
> - `window.innerWidth` checks inside components (headless browser size might differ from client browser).
> - Dynamic timestamps (`new Date()`) rendered in the component.
> - Third-party libraries that inject elements directly into the DOM outside of React's lifecycle.

> [!TIP]
> **Flickering Images/Layout:**
> Pre-rendering means HTML loads before JS. Ensure all your critical images have explicit `width` and `height` attributes to prevent layout shifts during hydration. Include necessary CSS directly.

## Modern Alternatives for Vite
While `react-snap` works, it relies on an older version of Puppeteer and isn't actively maintained. If you run into build errors you can't resolve, consider modern Vite-specific alternatives for static pre-rendering, such as `vite-plugin-ssg` or `vite-plugin-prerender`.

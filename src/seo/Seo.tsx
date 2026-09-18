import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTE_META, DEFAULT_META, CANONICAL_OVERRIDES } from './routeMeta';
import { BLOG_META } from './blogMeta';
import { schemaFor } from './schema';

const SITE = 'https://govindaniit.com';

/**
 * Routes that exist for navigation but should not be indexed: they duplicate a
 * section of another page and carry too little of their own content to rank for
 * anything except by cannibalising the page they came from.
 */
const NOINDEX = new Set([
  '/video-section',
  // The menu now offers Give Setu and nothing else priced. These pages still
  // work if someone has the link, but advertising them in search would keep
  // quoting website, social and service prices that have been withdrawn.
  '/pricing/websites',
  '/pricing/social-media',
  '/pricing/other-services',
  '/pricing/ngo-website',
]);

/**
 * Applies per-route <title>, meta description and canonical.
 *
 * Why this exists: every route previously served the identical static <head>
 * from index.html — same title, and a canonical pointing at the homepage. A
 * canonical is a directive, so all 90 pages were instructing Google to index
 * the homepage instead of themselves. Unique content, zero eligibility.
 *
 * This runs on route change and, critically, is captured by prerender.mjs —
 * the headless browser applies these effects before the HTML is written, so
 * each generated file ships with its own correct head. No SSR needed.
 */
/** One managed <script type="application/ld+json"> per page, replaced on navigation. */
function setPageSchema(json: unknown) {
  const ID = 'route-schema';
  let el = document.getElementById(ID) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = ID;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(json);
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Blog posts are routes, not ROUTE_META entries, so all 50 of them were falling
 * through to DEFAULT_META: fifty pages telling Google the same description.
 * Their own title and excerpt are far better signals, and BLOG_META carries
 * just those two fields so the 931 KB article file stays out of this bundle.
 */
function blogLookup(pathname: string) {
  const m = pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (!m) return null;
  const post = BLOG_META[m[1]];
  return post ? { title: post.seoTitle, description: post.description } : null;
}

/** Trailing slashes and casing both produce duplicate URLs — normalise before lookup. */
function lookup(pathname: string) {
  const post = blogLookup(pathname);
  if (post) return post;
  const exact = ROUTE_META[pathname];
  if (exact) return exact;
  const trimmed = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (ROUTE_META[trimmed]) return ROUTE_META[trimmed];
  const lower = Object.keys(ROUTE_META).find(k => k.toLowerCase() === trimmed.toLowerCase());
  return lower ? ROUTE_META[lower] : DEFAULT_META;
}

/**
 * A BreadcrumbList for the page. Google renders it as the little "site › section
 * › page" trail under the SERP result, and it was previously never emitted even
 * though createBreadcrumbSchema existed. Home is always first; intermediate
 * segments are only included when they are a real ROUTE_META page (so every
 * crumb points at a URL that actually resolves, never a 404 section stub); the
 * last crumb is the current page. Returned WITHOUT its own @context so it can
 * sit inside a page-level @graph.
 */
function breadcrumb(clean: string, currentName: string) {
  const items: { name: string; url: string }[] = [{ name: 'Home', url: SITE + '/' }];
  const segs = clean.split('/').filter(Boolean);
  let acc = '';
  segs.forEach((seg, i) => {
    acc += '/' + seg;
    if (i === segs.length - 1) {
      items.push({ name: currentName, url: SITE + acc + '/' });
    } else if (ROUTE_META[acc]) {
      const t = ROUTE_META[acc].title;
      items.push({
        name: t.includes('|') ? t.slice(0, t.indexOf('|')).trim() : t,
        url: SITE + acc + '/',
      });
    }
  });
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** Drop the top-level @context so an object can be nested inside an @graph. */
function stripContext(o: unknown) {
  const { ['@context']: _drop, ...rest } = (o ?? {}) as Record<string, unknown>;
  return rest;
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = lookup(pathname);
    const clean = pathname === '/' ? '' : pathname.replace(/\/+$/, '');
    // A duplicate route points at its preferred URL so signals consolidate.
    const preferred = CANONICAL_OVERRIDES[clean] ?? clean;
    // Trailing slash, deliberately.
    //
    // Pre-rendering writes each route as a real directory (dist/services/google-ads/
    // index.html), so Apache's DirectorySlash issues a 301 from /services/google-ads
    // to /services/google-ads/. Declaring the slash-less form as canonical would put
    // the canonical one redirect behind the URL Google actually lands on. Matching
    // the server's own behaviour keeps URL, canonical and sitemap identical.
    const canonical = SITE + (preferred ? preferred + '/' : '/');

    // Same 62-character ceiling as components/SEO.tsx, for routes that come
    // through ROUTE_META rather than a page-level <SEO>.
    const cut = meta.title.includes('|')
      ? meta.title.slice(0, meta.title.lastIndexOf('|')).trim()
      : '';
    const fitted =
      meta.title.length <= 62
        ? meta.title
        : cut.length >= 30 && cut.length <= 62
          ? cut
          : meta.title.slice(0, 62).replace(/\s+\S*$/, '');

    setMeta('name', 'robots',
      NOINDEX.has(clean) ? 'noindex, follow' : 'index, follow');

    document.title = fitted;
    setMeta('name', 'description', meta.description);
    setCanonical(canonical);

    // Social cards should match the page, not the homepage.
    setMeta('property', 'og:title', fitted);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', pathname === '/' ? 'website' : 'article');
    setMeta('name', 'twitter:title', fitted);
    setMeta('name', 'twitter:description', meta.description);

    // An article deserves Article schema, with its own dates.
    const blog = pathname.match(/^\/blog\/([^/]+)\/?$/);
    const post = blog ? BLOG_META[blog[1]] : undefined;
    if (post) {
      setMeta('property', 'article:published_time', post.date);
      setPageSchema({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
            author: { '@type': 'Organization', name: 'Govindani Infotech Pvt. Ltd.' },
            publisher: {
              '@type': 'Organization',
              name: 'Govindani Infotech Pvt. Ltd.',
              url: SITE,
            },
          },
          breadcrumb(clean, post.title),
        ],
      });
    } else if (clean) {
      // Every inner page gets its section schema PLUS a breadcrumb trail.
      setPageSchema({
        '@context': 'https://schema.org',
        '@graph': [stripContext(schemaFor(pathname)), breadcrumb(clean, fitted)],
      });
    } else {
      // Homepage: Organization + WebSite + LocalBusiness, no breadcrumb needed.
      setPageSchema(schemaFor(pathname));
    }
  }, [pathname]);

  return null;
}

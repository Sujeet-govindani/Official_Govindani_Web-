/**
 * BackstopJS visual-regression config for govindaniit.com.
 *
 * Captures a reference screenshot of every key page at phone + desktop widths,
 * then flags any later layout/spacing shift against that baseline. This is the
 * safety net for the "keep spacing consistent across the whole site" goal:
 * change something, run `npm run vr:test`, and every unintended shift shows up
 * as a red diff.
 *
 * Base URL is env-driven so you can point it at a local dev server or the live
 * site:
 *   BACKSTOP_BASE=http://localhost:5199  (default — your `npm run dev` port)
 *   BACKSTOP_BASE=https://govindaniit.com npm run vr:test   (against production)
 *
 * Usage (see VISUAL-REGRESSION.md):
 *   npm run vr:ref      # capture / refresh the baseline (do this on a known-good build)
 *   npm run vr:test     # compare current pages against the baseline, opens a report
 *   npm run vr:approve  # accept the current state as the new baseline
 */
const BASE = process.env.BACKSTOP_BASE || 'http://localhost:5199';

// [label, path]. Add a row here whenever a page should be watched for spacing.
const PAGES = [
  ['Home', '/'],
  ['Portfolio-NGO', '/portfolio/ngo'],
  ['Portfolio-Builders', '/portfolio/builders'],
  ['Portfolio-Business', '/portfolio/business'],
  ['Portfolio-Ecommerce', '/portfolio/ecommerce'],
  ['Portfolio-Healthcare', '/portfolio/healthcare'],
  ['Portfolio-Hospitality', '/portfolio/hospitality'],
  ['Services', '/services'],
  ['Service-SEO', '/services/seo'],
  ['WhatsApp-Business-API', '/whatsapp/business-api'],
  ['Blog', '/blog'],
  ['About-Company', '/about-us/about-company'],
  ['Contact', '/contact-us'],
  ['Pricing-NGO-OS', '/pricing/ngo-os'],
  ['USA-Landing', '/usa'],
];

module.exports = {
  id: 'govindaniit',
  viewports: [
    { label: 'phone', width: 390, height: 844 },
    { label: 'desktop', width: 1440, height: 900 },
  ],
  onReadyScript: 'onReady.cjs',
  scenarios: PAGES.map(([label, path]) => ({
    label,
    url: `${BASE}${path}`,
    // The homepage hero is an auto-rotating carousel, so its content differs
    // shot to shot; a higher tolerance there avoids false alarms while still
    // catching real layout shifts. Everything else is strict.
    misMatchThreshold: label === 'Home' ? 3 : 0.1,
    delay: 2500,
    postInteractionWait: 300,
    scrollToSelector: 'footer, body',
    selectors: ['document'],
    readySelector: 'main, #root',
  })),
  paths: {
    bitmaps_reference: 'backstop_data/bitmaps_reference',
    bitmaps_test: 'backstop_data/bitmaps_test',
    engine_scripts: 'backstop_data/engine_scripts',
    html_report: 'backstop_data/html_report',
    ci_report: 'backstop_data/ci_report',
  },
  report: ['browser'],
  engine: 'puppeteer',
  engineOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox'] },
  asyncCaptureLimit: 4,
  asyncCompareLimit: 25,
};

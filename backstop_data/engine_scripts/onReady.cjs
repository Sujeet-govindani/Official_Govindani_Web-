/**
 * Runs on each page once Backstop considers it ready, just before the shot.
 * Goal: make screenshots deterministic so only real layout/spacing changes diff.
 *  - freeze CSS animations/transitions (the site has floating/pulsing motion)
 *  - trigger lazy-loaded images by scrolling the whole page, then return to top
 *  - give fonts a beat to settle
 */
module.exports = async (page) => {
  // 1) Kill animations & transitions for a stable frame.
  await page.addStyleTag({
    content: `*,*::before,*::after{
      animation:none !important;
      transition:none !important;
      scroll-behavior:auto !important;
    }`,
  });

  // 2) Scroll through the page to force lazy images/sections to load.
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = Math.max(300, Math.floor(window.innerHeight * 0.9));
      const timer = setInterval(() => {
        window.scrollTo(0, y);
        y += step;
        if (y >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 120);
    });
  });

  // 3) Wait for web fonts and a final paint.
  try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch (e) {}
  await new Promise((r) => setTimeout(r, 600));
};

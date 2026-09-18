// ============================================================
// FILE: src/shared/styles.ts
// ROUTE: No route imported by all page files
// ============================================================

export const FONTS = ``;

export const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #090909; color: #F5F0E8; }

  .smm-gold-btn {
    background: linear-gradient(135deg, #C9A84C, #D4AF37, #B8962E);
    color: #090909; border: none; padding: 14px 32px;
    font-family: 'Montserrat', sans-serif; font-weight: 700;
    font-size: 12px; letter-spacing: 0.12em; cursor: pointer;
    transition: all 0.3s ease; text-transform: uppercase; display: inline-block;
  }
  .smm-gold-btn:hover { opacity: 0.85; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,168,76,0.3); }

  .smm-outline-btn {
    background: transparent; color: #C9A84C; border: 1px solid #C9A84C;
    padding: 13px 30px; font-family: 'Montserrat', sans-serif; font-weight: 500;
    font-size: 12px; letter-spacing: 0.12em; cursor: pointer;
    transition: all 0.3s ease; text-transform: uppercase; display: inline-block;
  }
  .smm-outline-btn:hover { background: rgba(201,168,76,0.08); transform: translateY(-2px); }
`;

export const colors = {
  black: "#090909",
  gold: "#C9A84C",
  goldLight: "#D4AF37",
  goldDark: "#B8962E",
  cream: "#F5F0E8",
  creamFade: "rgba(245,240,232,0.65)",
  goldFade: "rgba(201,168,76,0.15)",
  goldGlow: "rgba(201,168,76,0.08)",
};

export const fonts = {
  display: "'Cormorant Garamond', serif",
  body: "'EB Garamond', serif",
  ui: "'Montserrat', sans-serif",
};
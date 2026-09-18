// // ============================================================
// // FILE: src/shared/Components.tsx
// // ROUTE: No route imported by all page files
// // ============================================================

// import { useState } from "react";

// // ── SectionLabel ─────────────────────────────────────────────
// export function SectionLabel({ children }: { children: string }) {
//   return (
//     <div style={{
//       display: "inline-block", fontSize: 10, letterSpacing: "0.28em",
//       textTransform: "uppercase", color: "#C9A84C",
//       border: "1px solid rgba(201,168,76,0.4)",
//       padding: "5px 16px", marginBottom: 18,
//       fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
//     }}>
//       {children}
//     </div>
//   );
// }

// // ── SectionHeading ───────────────────────────────────────────
// export function SectionHeading({
//   label, title, subtitle, center = true,
// }: {
//   label: string;
//   title: string | JSX.Element;
//   subtitle?: string;
//   center?: boolean;
// }) {
//   return (
//     <div style={{ textAlign: center ? "center" : "left", marginBottom: 60 }}>
//       <SectionLabel>{label}</SectionLabel>
//       <h2 style={{
//         fontFamily: "'Cormorant Garamond', serif",
//         fontSize: "clamp(30px,5vw,52px)", fontWeight: 300,
//         color: "#F5F0E8", marginBottom: 16, lineHeight: 1.15,
//       }}>
//         {title}
//       </h2>
//       {subtitle && (
//         <p style={{
//           color: "rgba(245,240,232,0.5)", fontFamily: "'EB Garamond', serif",
//           fontSize: 18, maxWidth: 580,
//           margin: center ? "0 auto" : "0", lineHeight: 1.7,
//         }}>
//           {subtitle}
//         </p>
//       )}
//     </div>
//   );
// }

// // ── GoldButton ───────────────────────────────────────────────
// export function GoldButton({
//   children, onClick, fullWidth,
// }: {
//   children: string;
//   onClick?: () => void;
//   fullWidth?: boolean;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       style={{
//         background: "linear-gradient(135deg, #C9A84C, #D4AF37, #B8962E)",
//         color: "#090909", border: "none", padding: "14px 32px",
//         fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
//         fontSize: 12, letterSpacing: "0.12em", cursor: "pointer",
//         transition: "all 0.3s ease", textTransform: "uppercase",
//         width: fullWidth ? "100%" : "auto",
//       }}
//       onMouseOver={e => {
//         (e.currentTarget as HTMLElement).style.opacity = "0.85";
//         (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
//       }}
//       onMouseOut={e => {
//         (e.currentTarget as HTMLElement).style.opacity = "1";
//         (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
//       }}
//     >
//       {children}
//     </button>
//   );
// }

// // ── OutlineButton ────────────────────────────────────────────
// export function OutlineButton({
//   children, onClick, fullWidth,
// }: {
//   children: string;
//   onClick?: () => void;
//   fullWidth?: boolean;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       style={{
//         background: "transparent", color: "#C9A84C",
//         border: "1px solid #C9A84C", padding: "13px 30px",
//         fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
//         fontSize: 12, letterSpacing: "0.12em", cursor: "pointer",
//         transition: "all 0.3s ease", textTransform: "uppercase",
//         width: fullWidth ? "100%" : "auto",
//       }}
//       onMouseOver={e => {
//         (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.1)";
//         (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
//       }}
//       onMouseOut={e => {
//         (e.currentTarget as HTMLElement).style.background = "transparent";
//         (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
//       }}
//     >
//       {children}
//     </button>
//   );
// }

// // ── BulletList ───────────────────────────────────────────────
// export function BulletList({
//   items, accent = "#C9A84C", columns = 1,
// }: {
//   items: string[];
//   accent?: string;
//   columns?: number;
// }) {
//   return (
//     <ul style={{
//       listStyle: "none",
//       display: "grid",
//       gridTemplateColumns: `repeat(${columns}, 1fr)`,
//       gap: "10px 32px",
//     }}>
//       {items.map((item, i) => (
//         <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
//           <span style={{ color: accent, fontSize: 9, marginTop: 8, flexShrink: 0 }}>◆</span>
//           <span style={{
//             fontFamily: "'EB Garamond', serif", fontSize: 17,
//             color: "rgba(245,240,232,0.72)", lineHeight: 1.65,
//           }}>
//             {item}
//           </span>
//         </li>
//       ))}
//     </ul>
//   );
// }

// // ── ProcessSteps ─────────────────────────────────────────────
// export function ProcessSteps({
//   steps,
// }: {
//   steps: { num: string; title: string; desc: string }[];
// }) {
//   return (
//     <div style={{ maxWidth: 800, margin: "0 auto" }}>
//       {steps.map((step) => (
//         <div
//           key={step.num}
//           style={{
//             display: "flex", gap: 28, alignItems: "flex-start",
//             padding: "32px 0", borderBottom: "1px solid rgba(201,168,76,0.1)",
//           }}
//         >
//           <div style={{
//             flexShrink: 0, width: 56, height: 56,
//             border: "1px solid rgba(201,168,76,0.4)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             fontFamily: "'Cormorant Garamond', serif",
//             fontSize: 18, color: "#C9A84C", fontWeight: 600,
//           }}>
//             {step.num}
//           </div>
//           <div>
//             <div style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: 24, fontWeight: 500, color: "#F5F0E8", marginBottom: 8,
//             }}>
//               {step.title}
//             </div>
//             <div style={{
//               fontFamily: "'EB Garamond', serif", fontSize: 17,
//               color: "rgba(245,240,232,0.6)", lineHeight: 1.7,
//             }}>
//               {step.desc}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ── FAQAccordion ─────────────────────────────────────────────
// export function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
//   const [open, setOpen] = useState<number | null>(null);
//   return (
//     <div style={{ maxWidth: 860, margin: "0 auto" }}>
//       {faqs.map((faq, i) => (
//         <div key={i} style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
//           <button
//             onClick={() => setOpen(open === i ? null : i)}
//             style={{
//               width: "100%", background: "none", border: "none", color: "#F5F0E8",
//               textAlign: "left", padding: "22px 0",
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: 20, fontWeight: 500, cursor: "pointer",
//               display: "flex", justifyContent: "space-between",
//               alignItems: "center", gap: 16, lineHeight: 1.4,
//             }}
//             onMouseOver={e => (e.currentTarget.style.color = "#C9A84C")}
//             onMouseOut={e => (e.currentTarget.style.color = "#F5F0E8")}
//           >
//             <span>{faq.q}</span>
//             <span style={{
//               color: "#C9A84C", fontSize: 22, flexShrink: 0,
//               transition: "transform 0.3s",
//               transform: open === i ? "rotate(45deg)" : "none",
//               display: "inline-block",
//             }}>
//               +
//             </span>
//           </button>
//           {open === i && (
//             <div style={{
//               fontFamily: "'EB Garamond', serif", fontSize: 18,
//               lineHeight: 1.75, color: "rgba(245,240,232,0.65)", paddingBottom: 24,
//             }}>
//               {faq.a}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// // ── ClientStrip ──────────────────────────────────────────────
// export function ClientStrip({
//   label, clients, accent = "#C9A84C",
// }: {
//   label: string;
//   clients: string[];
//   accent?: string;
// }) {
//   return (
//     <div style={{ paddingTop: 24, borderTop: "1px solid rgba(201,168,76,0.1)", marginTop: 32 }}>
//       <div style={{
//         fontFamily: "'Montserrat',sans-serif", fontSize: 10,
//         letterSpacing: "0.15em", textTransform: "uppercase",
//         color: "rgba(245,240,232,0.35)", marginBottom: 14,
//       }}>
//         {label}
//       </div>
//       <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//         {clients.map((c) => (
//           <span key={c} style={{
//             padding: "6px 16px",
//             border: `1px solid ${accent}50`,
//             color: accent,
//             fontFamily: "'Montserrat',sans-serif", fontSize: 11, letterSpacing: "0.05em",
//           }}>
//             {c}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ── CTABand ──────────────────────────────────────────────────
// export function CTABand({ heading, sub }: { heading: string; sub: string }) {
//   return (
//     <section style={{
//       padding: "100px clamp(16px,5vw,80px)",
//       background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(9,9,9,1) 60%)",
//       borderTop: "1px solid rgba(201,168,76,0.18)", textAlign: "center",
//     }}>
//       <div style={{ maxWidth: 720, margin: "0 auto" }}>
//         <div style={{
//           display: "inline-block", fontSize: 10, letterSpacing: "0.28em",
//           textTransform: "uppercase", color: "#C9A84C",
//           border: "1px solid rgba(201,168,76,0.4)",
//           padding: "5px 16px", marginBottom: 18,
//           fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
//         }}>
//           Let's Work Together
//         </div>
//         <h2 style={{
//           fontFamily: "'Cormorant Garamond',serif",
//           fontSize: "clamp(32px,5vw,60px)", fontWeight: 300,
//           color: "#F5F0E8", marginBottom: 20, lineHeight: 1.15,
//           whiteSpace: "pre-line",
//         }}>
//           {heading}
//         </h2>
//         <p style={{
//           fontFamily: "'EB Garamond',serif", fontSize: 18,
//           color: "rgba(245,240,232,0.6)", marginBottom: 40, lineHeight: 1.7,
//         }}>
//           {sub}
//         </p>
//         <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
//           <GoldButton>Book a Strategy Call</GoldButton>
//           <OutlineButton>View Pricing Plans</OutlineButton>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ── EmbedPlaceholder ─────────────────────────────────────────
// export function EmbedPlaceholder({
//   icon, label, sub,
// }: {
//   icon: string;
//   label: string;
//   sub?: string;
// }) {
//   return (
//     <div style={{
//       height: 220, background: "rgba(201,168,76,0.03)",
//       border: "1px dashed rgba(201,168,76,0.22)",
//       display: "flex", flexDirection: "column",
//       alignItems: "center", justifyContent: "center", gap: 8,
//       color: "rgba(201,168,76,0.45)", fontFamily: "'Montserrat',sans-serif",
//       fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
//       textAlign: "center", padding: 16,
//     }}>
//       <span style={{ fontSize: 28 }}>{icon}</span>
//       <span style={{
//         fontFamily: "'Cormorant Garamond',serif", fontSize: 15,
//         color: "rgba(201,168,76,0.55)", textTransform: "none", letterSpacing: 0,
//       }}>
//         {label}
//       </span>
//       {sub && <span>{sub}</span>}
//     </div>
//   );
// }

// // ── GalleryGrid ──────────────────────────────────────────────
// export function GalleryGrid({
//   items,
// }: {
//   items: { label: string; tag: string; emoji?: string }[];
// }) {
//   return (
//     <div style={{
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
//       gap: 2, background: "rgba(201,168,76,0.06)",
//     }}>
//       {items.map((item) => (
//         <div
//           key={item.label}
//           style={{
//             aspectRatio: "1", background: "#090909",
//             border: "1px solid rgba(201,168,76,0.1)",
//             display: "flex", flexDirection: "column",
//             alignItems: "center", justifyContent: "center",
//             gap: 8, cursor: "pointer", transition: "all 0.3s", padding: 12,
//           }}
//           onMouseOver={e => {
//             (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.45)";
//             (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.06)";
//           }}
//           onMouseOut={e => {
//             (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.1)";
//             (e.currentTarget as HTMLElement).style.background = "#090909";
//           }}
//         >
//           <div style={{ fontSize: 28, color: "rgba(201,168,76,0.3)" }}>
//             {item.emoji || "🖼"}
//           </div>
//           <div style={{
//             fontFamily: "'EB Garamond',serif", fontSize: 14,
//             color: "rgba(245,240,232,0.55)", textAlign: "center", lineHeight: 1.4,
//           }}>
//             {item.label}
//           </div>
//           <div style={{
//             fontFamily: "'Montserrat',sans-serif", fontSize: 9,
//             color: "rgba(201,168,76,0.4)", letterSpacing: "0.12em", textTransform: "uppercase",
//           }}>
//             {item.tag}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ── StatBar ──────────────────────────────────────────────────
// export function StatBar({ stats }: { stats: { val: string; label: string }[] }) {
//   return (
//     <div style={{
//       display: "grid",
//       gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
//       gap: 1, background: "rgba(201,168,76,0.1)", marginTop: 64,
//     }}>
//       {stats.map((s) => (
//         <div key={s.label} style={{ background: "#090909", textAlign: "center", padding: "28px 16px" }}>
//           <div style={{
//             fontFamily: "'Cormorant Garamond',serif",
//             fontSize: 38, fontWeight: 600, color: "#C9A84C", lineHeight: 1,
//           }}>
//             {s.val}
//           </div>
//           <div style={{
//             fontFamily: "'Montserrat',sans-serif", fontSize: 10,
//             letterSpacing: "0.12em", textTransform: "uppercase",
//             color: "rgba(245,240,232,0.4)", marginTop: 8,
//           }}>
//             {s.label}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


// Stub replace with your actual shared UI components
import React from "react";

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", fontFamily: "'Montserrat',sans-serif", fontWeight: 600 }}>{children}</span>
);

export const SectionHeading = ({ label, title, subtitle }: { label: string; title: React.ReactNode; subtitle?: string }) => (
  <div style={{ marginBottom: 48, textAlign: "center" }}>
    <SectionLabel>{label}</SectionLabel>
    <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, lineHeight: 1.15, color: "#F5F0E8", margin: "12px 0 0" }}>{title}</h2>
    {subtitle && <p style={{ color: "rgba(245,240,232,0.5)", fontSize: 16, marginTop: 12, fontFamily: "'EB Garamond',serif" }}>{subtitle}</p>}
  </div>
);

export const GoldButton = ({ children }: { children: React.ReactNode }) => (
  <button style={{ background: "linear-gradient(135deg,#C9A84C,#A68A3A)", color: "#090909", border: "none", padding: "14px 36px", borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.04em" }}>{children}</button>
);

export const OutlineButton = ({ children }: { children: React.ReactNode }) => (
  <button style={{ background: "transparent", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.4)", padding: "14px 36px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.04em" }}>{children}</button>
);

export const BulletList = ({ items }: { items: string[] }) => (
  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
    {items.map((item, i) => (
      <li key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 14, color: "rgba(245,240,232,0.6)", lineHeight: 1.6, fontFamily: "'EB Garamond',serif" }}>
        <span style={{ color: "#C9A84C", flexShrink: 0 }}>→</span>{item}
      </li>
    ))}
  </ul>
);

export const ProcessSteps = ({ steps }: { steps: { num: string; title: string; desc: string }[] }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 2, background: "rgba(201,168,76,0.07)" }}>
    {steps.map(s => (
      <div key={s.num} style={{ background: "#090909", padding: "32px 24px" }}>
        <div style={{ color: "#C9A84C", fontSize: 28, fontWeight: 300, fontFamily: "'Cormorant Garamond',serif", marginBottom: 8 }}>{s.num}</div>
        <div style={{ color: "#F5F0E8", fontSize: 18, fontWeight: 500, fontFamily: "'Cormorant Garamond',serif", marginBottom: 10 }}>{s.title}</div>
        <p style={{ color: "rgba(245,240,232,0.55)", fontSize: 14, lineHeight: 1.6, fontFamily: "'EB Garamond',serif" }}>{s.desc}</p>
      </div>
    ))}
  </div>
);

export const FAQAccordion = ({ faqs }: { faqs: { q: string; a: string }[] }) => {
  const [open, setOpen] = React.useState<number | null>(null);
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {faqs.map((f, i) => (
        <div key={i} style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "none", border: "none", color: "#F5F0E8", textAlign: "left", padding: "20px 0", fontSize: 16, fontFamily: "'EB Garamond',serif", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {f.q}<span style={{ color: "#C9A84C", marginLeft: 12 }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <p style={{ color: "rgba(245,240,232,0.6)", fontSize: 14, lineHeight: 1.7, padding: "0 0 20px", fontFamily: "'EB Garamond',serif" }}>{f.a}</p>}
        </div>
      ))}
    </div>
  );
};

export const CTABand = ({ heading, sub }: { heading: string; sub: string }) => (
  <section style={{ padding: "80px clamp(16px,5vw,80px)", textAlign: "center", background: "rgba(201,168,76,0.04)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
    <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, color: "#F5F0E8", whiteSpace: "pre-line", marginBottom: 16 }}>{heading}</h2>
    <p style={{ color: "rgba(245,240,232,0.55)", fontSize: 16, maxWidth: 560, margin: "0 auto 32px", fontFamily: "'EB Garamond',serif" }}>{sub}</p>
    <GoldButton>Get Started</GoldButton>
  </section>
);

export const EmbedPlaceholder = ({ icon, label, sub }: { icon: string; label: string; sub: string }) => (
  <div style={{ background: "#090909", padding: "40px 24px", textAlign: "center" }}>
    <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
    <div style={{ color: "#F5F0E8", fontSize: 16, fontWeight: 500, marginBottom: 6 }}>{label}</div>
    <div style={{ color: "rgba(245,240,232,0.4)", fontSize: 12 }}>{sub}</div>
  </div>
);

export const ClientStrip = ({ label, clients }: { label: string; clients: string[] }) => (
  <div style={{ marginTop: 32, textAlign: "center" }}>
    <p style={{ color: "rgba(245,240,232,0.4)", fontSize: 12, marginBottom: 8 }}>{label}</p>
    <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
      {clients.map(c => <span key={c} style={{ color: "rgba(201,168,76,0.6)", fontSize: 13, fontWeight: 500 }}>{c}</span>)}
    </div>
  </div>
);

export const GalleryGrid = ({ items }: { items: { label: string; tag: string; emoji: string }[] }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 2, background: "rgba(201,168,76,0.07)" }}>
    {items.map(item => (
      <div key={item.label} style={{ background: "#090909", padding: "32px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>{item.emoji}</div>
        <div style={{ color: "#F5F0E8", fontSize: 14, fontWeight: 500, marginBottom: 6 }}>{item.label}</div>
        <span style={{ color: "#C9A84C", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.tag}</span>
      </div>
    ))}
  </div>
);

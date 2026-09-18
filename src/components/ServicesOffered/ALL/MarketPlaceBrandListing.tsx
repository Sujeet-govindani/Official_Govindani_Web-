// import { useState, useEffect, useRef } from "react";
// import ContactUsForm from "./ContactUsForm";
// import ServiceSection from "@/components/ServicesSection";

// const MARKETPLACES = [
//   {
//     name: "Myntra",
//     color: "#E91E63",
//     bg: "rgba(233,30,99,0.15)",
//     border: "rgba(233,30,99,0.4)",
//     icon: "M",
//     desc: "Fashion & Lifestyle Leader",
//   },
//   {
//     name: "Ajio",
//     color: "#FF6B00",
//     bg: "rgba(255,107,0,0.15)",
//     border: "rgba(255,107,0,0.4)",
//     icon: "A",
//     desc: "Curated Fashion Platform",
//   },
//   {
//     name: "Meesho",
//     color: "#9C27B0",
//     bg: "rgba(156,39,176,0.15)",
//     border: "rgba(156,39,176,0.4)",
//     icon: "Me",
//     desc: "Social Commerce Giant",
//   },
//   {
//     name: "Nyka",
//     color: "#FF4081",
//     bg: "rgba(255,64,129,0.15)",
//     border: "rgba(255,64,129,0.4)",
//     icon: "N",
//     desc: "Beauty & Wellness Hub",
//   },
// ];

// const PARTNERS = [
//   {
//     brand: "CI Builder",
//     tagline: "Construction Intelligence Platform",
//     desc: "A powerful SaaS platform for construction project management, built from the ground up with scalable architecture.",
//     images: [
//       "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
//       "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
//     ],
//     color: "#C9A84C",
//     accent: "rgba(201,168,76,0.2)",
//   },
//   {
//     brand: "HotelFolio",
//     tagline: "Premium Hospitality Experience",
//     desc: "An elegant hotel management and booking portal crafted for luxury properties seeking a digital-first guest journey.",
//     images: [
//       "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80",
//       "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80",
//       "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
//     ],
//     color: "#E8D5A3",
//     accent: "rgba(232,213,163,0.2)",
//   },
//   {
//     brand: "Perfume by Goldy",
//     tagline: "Artisanal Fragrance House",
//     desc: "A luxury fragrance brand's digital presence, designed to evoke sensory richness and exclusivity across every touchpoint.",
//     images: [
//       "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
//       "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
//       "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
//     ],
//     color: "#F0C674",
//     accent: "rgba(240,198,116,0.2)",
//   },
// ];

// const INQUIRY_FIELDS = [
//   { label: "Full Name", type: "text", placeholder: "Your full name" },
//   { label: "Business Email", type: "email", placeholder: "you@business.com" },
//   { label: "Phone Number", type: "tel", placeholder: "+91 92019 58271" },
//   { label: "Business Name", type: "text", placeholder: "Your company or store name" },
// ];

// export default function App() {
//   const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
//   const [formData, setFormData] = useState<Record<string, string>>({});
//   const [submitted, setSubmitted] = useState(false);
//   const [activePartnerImg, setActivePartnerImg] = useState<Record<number, number>>({});
//   const heroRef = useRef<HTMLDivElement>(null);
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const onScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const handleFormChange = (label: string, value: string) => {
//     setFormData((p) => ({ ...p, [label]: value }));
//   };

//   const handleSubmit = () => {
//     setSubmitted(true);
//     setTimeout(() => setSubmitted(false), 3000);
//     setFormData({});
//     setSelectedPlatform(null);
//   };

//   const setPartnerImg = (partnerIdx: number, imgIdx: number) => {
//     setActivePartnerImg((p) => ({ ...p, [partnerIdx]: imgIdx }));
//   };

//   const gold = "#C9A84C";
//   const cream = "#F5EDD6";
//   const goldLight = "#E8D5A3";

//   return (
//     <div
//       style={{
//         background: "#080808",
//         minHeight: "100vh",
//         fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
//         color: cream,
//         overflowX: "hidden",
//       }}
//     >
//       <style>{`
//
//         * { box-sizing: border-box; margin: 0; padding: 0; }

//         .title-font { font-family: 'Libre Baskerville', Georgia, serif; }
//         .sub-font { font-family: 'Inter', sans-serif; }

//         .glass {
//           background: rgba(255,255,255,0.03);
//           backdrop-filter: blur(10px);
//           -webkit-backdrop-filter: blur(10px);
//           border: 1px solid rgba(201,168,76,0.15);
//         }

//         .glass-strong {
//           background: rgba(201,168,76,0.05);
//           backdrop-filter: blur(10px);
//           -webkit-backdrop-filter: blur(10px);
//           border: 1px solid rgba(201,168,76,0.25);
//         }

//         .gold-line {
//           background: linear-gradient(90deg, transparent, ${gold}, transparent);
//           height: 1px;
//           width: 100%;
//         }

//         .platform-card {
//           cursor: pointer;
//           transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
//           position: relative;
//           overflow: hidden;
//         }
//         .platform-card::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           opacity: 0;
//           transition: opacity 0.35s;
//         }
//         .platform-card:hover {
//           transform: translateY(-6px);
//         }
//         .platform-card:hover::before {
//           opacity: 1;
//         }
//         .platform-card.selected {
//           transform: translateY(-4px) scale(1.02);
//         }

//         .partner-card {
//           transition: transform 0.3s ease;
//         }
//         .partner-card:hover {
//           transform: translateY(-4px);
//         }

//         .img-thumb {
//           cursor: pointer;
//           transition: all 0.25s ease;
//           opacity: 0.6;
//           border: 1px solid transparent;
//         }
//         .img-thumb:hover, .img-thumb.active {
//           opacity: 1;
//           border-color: ${gold};
//         }

//         .inquiry-input {
//           background: rgba(255,255,255,0.04);
//           border: 1px solid rgba(201,168,76,0.2);
//           border-radius: 8px;
//           color: ${cream};
//           font-family: 'Inter', sans-serif;
//           font-size: 14px;
//           padding: 12px 16px;
//           width: 100%;
//           outline: none;
//           transition: border-color 0.2s;
//         }
//         .inquiry-input:focus {
//           border-color: rgba(201,168,76,0.6);
//           background: rgba(201,168,76,0.05);
//         }
//         .inquiry-input::placeholder {
//           color: rgba(245,237,214,0.3);
//         }

//         .btn-gold {
//           background: linear-gradient(135deg, ${gold}, #a07830, ${gold});
//           background-size: 200% auto;
//           border: none;
//           border-radius: 6px;
//           color: #1a1005;
//           cursor: pointer;
//           font-family: 'Inter', sans-serif;
//           font-size: 14px;
//           font-weight: 600;
//           letter-spacing: 0.08em;
//           padding: 14px 32px;
//           text-transform: uppercase;
//           transition: background-position 0.4s, transform 0.2s;
//         }
//         .btn-gold:hover {
//           background-position: right center;
//           transform: scale(1.02);
//         }
//         .btn-gold:active {
//           transform: scale(0.98);
//         }

//         .orb {
//           position: absolute;
//           border-radius: 50%;
//           filter: blur(80px);
//           pointer-events: none;
//         }

//         .fade-in {
//           animation: fadeUp 0.8s ease both;
//         }

//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(24px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .shimmer-line {
//           background: linear-gradient(90deg, transparent 0%, ${gold} 50%, transparent 100%);
//           background-size: 200% auto;
//           animation: shimmer 3s linear infinite;
//           height: 1px;
//         }

//         @keyframes shimmer {
//           0% { background-position: -200% center; }
//           100% { background-position: 200% center; }
//         }

//         select.inquiry-input option {
//           background: #1a1208;
//           color: ${cream};
//         }

//         @media (max-width: 768px) {
//           .hero-title { font-size: clamp(28px, 8vw, 48px) !important; }
//           .section-title { font-size: clamp(22px, 6vw, 36px) !important; }
//           .platforms-grid { grid-template-columns: repeat(2, 1fr) !important; }
//           .partners-grid { grid-template-columns: 1fr !important; }
//           .hero-badges { flex-wrap: wrap; }
//         }

//         @media (max-width: 480px) {
//           .platforms-grid { grid-template-columns: 1fr 1fr !important; }
//           .form-grid { grid-template-columns: 1fr !important; }
//         }
//       `}</style>

      
//       {/* ─── HERO ─────────────────────────────────────── */}
//       <section
//         ref={heroRef}
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           textAlign: "center",
//           padding: "120px 24px 80px",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {/* Background orbs */}
//         <div
//           className="orb"
//           style={{
//             width: 600,
//             height: 600,
//             background: "rgba(201,168,76,0.06)",
//             top: "10%",
//             left: "50%",
//             transform: `translate(-50%, ${scrollY * 0.1}px)`,
//           }}
//         />
//         <div
//           className="orb"
//           style={{
//             width: 400,
//             height: 400,
//             background: "rgba(201,168,76,0.04)",
//             bottom: "5%",
//             right: "-10%",
//           }}
//         />

//         {/* Eyebrow */}
//         <div
//           className="sub-font fade-in"
//           style={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: 10,
//             padding: "6px 18px",
//             borderRadius: 40,
//             border: `1px solid rgba(201,168,76,0.3)`,
//             background: "rgba(201,168,76,0.07)",
//             fontSize: 11,
//             letterSpacing: "0.18em",
//             textTransform: "uppercase",
//             color: gold,
//             marginBottom: 32,
//             animationDelay: "0.1s",
//           }}
//         >
//           <span style={{ width: 6, height: 6, borderRadius: "50%", background: gold, display: "inline-block" }} />
//           India's Premier Marketplace Partner
//         </div>

//         {/* Main Title */}
//         <h1
//           className="title-font hero-title fade-in"
//           style={{
//             fontSize: "clamp(38px, 6vw, 72px)",
//             fontWeight: 700,
//             lineHeight: 1.1,
//             maxWidth: 860,
//             marginBottom: 24,
//             animationDelay: "0.2s",
//             color: "#fff",
//           }}
//         >
//           Sell on Every{" "}
//           <span
//             style={{
//               background: `linear-gradient(135deg, ${gold}, ${cream}, ${gold})`,
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Major Marketplace
//           </span>
//           <br />
//           with One Expert Partner
//         </h1>

//         {/* Subtitle */}
//         <p
//           className="sub-font fade-in"
//           style={{
//             fontSize: "clamp(15px, 2vw, 18px)",
//             lineHeight: 1.7,
//             maxWidth: 580,
//             color: "rgba(245,237,214,0.6)",
//             marginBottom: 48,
//             animationDelay: "0.3s",
//             fontWeight: 300,
//           }}
//         >
//           We handle your complete marketplace presence from listing creation and brand
//           storytelling to performance optimization across India's top ecommerce platforms.
//         </p>

//         {/* Platform badges */}
//         <div
//           className="hero-badges fade-in"
//           style={{
//             display: "flex",
//             gap: 12,
//             justifyContent: "center",
//             marginBottom: 48,
//             animationDelay: "0.4s",
//             flexWrap: "wrap",
//           }}
//         >
//           {MARKETPLACES.map((m) => (
//             <div
//               key={m.name}
//               style={{
//                 padding: "8px 18px",
//                 borderRadius: 40,
//                 background: m.bg,
//                 border: `1px solid ${m.border}`,
//                 fontSize: 12,
//                 fontWeight: 500,
//                 color: m.color,
//                 letterSpacing: "0.05em",
//               }}
//               className="sub-font"
//             >
//               {m.name}
//             </div>
//           ))}
//         </div>

//         {/* CTA */}
//         <div className="fade-in" style={{ animationDelay: "0.5s" }}>
//           <button
//             className="btn-gold"
//             onClick={() => {
//               document.getElementById("platforms")?.scrollIntoView({ behavior: "smooth" });
//             }}
//           >
//             Start Listing Today
//           </button>
//         </div>

//         {/* Stat row */}
//         <div
//           className="fade-in"
//           style={{
//             display: "flex",
//             gap: 48,
//             marginTop: 72,
//             animationDelay: "0.6s",
//             flexWrap: "wrap",
//             justifyContent: "center",
//           }}
//         >
//           {[
//             { num: "500+", label: "Brands Onboarded" },
//             { num: "4", label: "Major Platforms" },
//             { num: "98%", label: "Client Retention" },
//             { num: "₹50Cr+", label: "GMV Generated" },
//           ].map((s) => (
//             <div key={s.label} style={{ textAlign: "center" }}>
//               <div
//                 className="title-font"
//                 style={{ fontSize: 28, color: gold, fontWeight: 700 }}
//               >
//                 {s.num}
//               </div>
//               <div
//                 className="sub-font"
//                 style={{
//                   fontSize: 11,
//                   letterSpacing: "0.12em",
//                   textTransform: "uppercase",
//                   color: "rgba(245,237,214,0.4)",
//                   marginTop: 4,
//                 }}
//               >
//                 {s.label}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="shimmer-line" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
//       </section>

//       {/* ─── SECTION 1: MARKETPLACE LISTING ─────────────── */}
//       <section style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
//         {/* Section header */}
//         <div style={{ textAlign: "center", marginBottom: 64 }}>
//           <p
//             className="sub-font"
//             style={{
//               fontSize: 11,
//               letterSpacing: "0.2em",
//               textTransform: "uppercase",
//               color: gold,
//               marginBottom: 16,
//             }}
//           >
//             What We Do
//           </p>
//           <h2
//             className="title-font section-title"
//             style={{
//               fontSize: "clamp(28px, 4vw, 48px)",
//               fontWeight: 700,
//               color: "#fff",
//               lineHeight: 1.2,
//               marginBottom: 20,
//             }}
//           >
//             Marketplace Listing &<br />
//             <span style={{ color: gold }}>Brand Acceleration</span>
//           </h2>
//           <p
//             className="sub-font"
//             style={{
//               fontSize: 16,
//               color: "rgba(245,237,214,0.55)",
//               maxWidth: 520,
//               margin: "0 auto",
//               lineHeight: 1.7,
//             }}
//           >
//             End to end ecommerce solutions that transform your products into compelling
//             listings that convert at every touchpoint.
//           </p>
//         </div>

//         {/* Service cards */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//             gap: 24,
//           }}
//         >
//           {[
//             {
//               icon: "◈",
//               title: "Catalogue Creation",
//               desc: "Professional product imagery curation, keyword-rich descriptions, and SEO-optimised titles crafted for maximum discoverability.",
//             },
//             {
//               icon: "◉",
//               title: "Brand Storefront",
//               desc: "Custom brand stores on Myntra, Ajio, and Nyka with on-brand visuals, curated collections, and immersive product storytelling.",
//             },
//             {
//               icon: "◎",
//               title: "Performance Management",
//               desc: "Continuous monitoring of rankings, ads optimisation, review management, and competitive pricing strategy to grow your share.",
//             },
//             {
//               icon: "◐",
//               title: "Logistics & Returns",
//               desc: "Seamless fulfilment integration, return management, and inventory sync across all platforms for zero operational friction.",
//             },
//           ].map((s, i) => (
//             <div
//               key={i}
//               className="glass partner-card"
//               style={{
//                 borderRadius: 16,
//                 padding: "32px 28px",
//                 position: "relative",
//                 overflow: "hidden",
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: 28,
//                   color: gold,
//                   marginBottom: 16,
//                   lineHeight: 1,
//                 }}
//               >
//                 {s.icon}
//               </div>
//               <h3
//                 className="title-font"
//                 style={{
//                   fontSize: 18,
//                   color: goldLight,
//                   marginBottom: 12,
//                   fontWeight: 400,
//                 }}
//               >
//                 {s.title}
//               </h3>
//               <p
//                 className="sub-font"
//                 style={{
//                   fontSize: 14,
//                   lineHeight: 1.7,
//                   color: "rgba(245,237,214,0.55)",
//                 }}
//               >
//                 {s.desc}
//               </p>
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: 0,
//                   left: 0,
//                   right: 0,
//                   height: 2,
//                   background: `linear-gradient(90deg, transparent, ${gold}40, transparent)`,
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       </section>

//       <div className="gold-line" style={{ opacity: 0.2 }} />

//       {/* ─── SECTION 2: PLATFORM SELECTION + INQUIRY ─────── */}
//       <section id="platforms" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
//         {/* Header */}
//         <div style={{ textAlign: "center", marginBottom: 64 }}>
//           <p
//             className="sub-font"
//             style={{
//               fontSize: 11,
//               letterSpacing: "0.2em",
//               textTransform: "uppercase",
//               color: gold,
//               marginBottom: 16,
//             }}
//           >
//             Choose Your Platform
//           </p>
//           <h2
//             className="title-font section-title"
//             style={{
//               fontSize: "clamp(28px, 4vw, 48px)",
//               fontWeight: 700,
//               color: "#fff",
//               lineHeight: 1.2,
//               marginBottom: 20,
//             }}
//           >
//             Select a Marketplace &{" "}
//             <span style={{ color: gold }}>Inquire Now</span>
//           </h2>
//           <p
//             className="sub-font"
//             style={{
//               fontSize: 15,
//               color: "rgba(245,237,214,0.5)",
//               maxWidth: 480,
//               margin: "0 auto",
//               lineHeight: 1.7,
//             }}
//           >
//             Tap the platform you want to sell on, then fill out the short form below and our
//             specialist will contact you within 24 hours.
//           </p>
//         </div>

//         {/* Platform grid */}
//         <div
//           className="platforms-grid"
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(4, 1fr)",
//             gap: 20,
//             marginBottom: 56,
//           }}
//         >
//           {MARKETPLACES.map((m) => {
//             const isSelected = selectedPlatform === m.name;
//             return (
//               <div
//                 key={m.name}
//                 className={`platform-card glass${isSelected ? " selected" : ""}`}
//                 style={{
//                   borderRadius: 20,
//                   padding: "36px 20px",
//                   textAlign: "center",
//                   border: isSelected
//                     ? `1px solid ${m.color}`
//                     : "1px solid rgba(201,168,76,0.12)",
//                   background: isSelected
//                     ? m.bg
//                     : "rgba(255,255,255,0.02)",
//                   boxShadow: isSelected ? `0 0 30px ${m.color}20` : "none",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => setSelectedPlatform(isSelected ? null : m.name)}
//               >
//                 {/* Icon circle */}
//                 <div
//                   style={{
//                     width: 68,
//                     height: 68,
//                     borderRadius: "50%",
//                     background: isSelected ? m.color : m.bg,
//                     border: `1.5px solid ${m.color}`,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     margin: "0 auto 20px",
//                     fontSize: 22,
//                     fontWeight: 800,
//                     color: isSelected ? "#fff" : m.color,
//                     fontFamily: "'Inter', sans-serif",
//                     transition: "all 0.3s",
//                   }}
//                 >
//                   {m.icon}
//                 </div>
//                 <div
//                   className="title-font"
//                   style={{
//                     fontSize: 18,
//                     color: isSelected ? m.color : goldLight,
//                     marginBottom: 6,
//                     transition: "color 0.3s",
//                   }}
//                 >
//                   {m.name}
//                 </div>
//                 <div
//                   className="sub-font"
//                   style={{
//                     fontSize: 11,
//                     color: "rgba(245,237,214,0.4)",
//                     letterSpacing: "0.05em",
//                     lineHeight: 1.4,
//                   }}
//                 >
//                   {m.desc}
//                 </div>
//                 {isSelected && (
//                   <div
//                     style={{
//                       marginTop: 14,
//                       fontSize: 11,
//                       color: m.color,
//                       letterSpacing: "0.1em",
//                       textTransform: "uppercase",
//                     }}
//                     className="sub-font"
//                   >
//                     ✓ Selected
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* Inquiry form */}
//         <div
//           className="glass-strong"
//           style={{
//             borderRadius: 24,
//             padding: "48px 40px",
//             maxWidth: 860,
//             margin: "0 auto",
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           <div
//             className="orb"
//             style={{
//               width: 300,
//               height: 300,
//               background: "rgba(201,168,76,0.04)",
//               top: -100,
//               right: -100,
//             }}
//           />

//           {selectedPlatform && (
//             <div
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 8,
//                 padding: "6px 16px",
//                 borderRadius: 40,
//                 background: "rgba(201,168,76,0.1)",
//                 border: `1px solid ${gold}40`,
//                 fontSize: 12,
//                 color: gold,
//                 marginBottom: 28,
//                 letterSpacing: "0.08em",
//               }}
//               className="sub-font"
//             >
//               Enquiring for:{" "}
//               <strong style={{ fontWeight: 600 }}>{selectedPlatform}</strong>
//             </div>
//           )}

//           <h3
//             className="title-font"
//             style={{
//               fontSize: 24,
//               color: goldLight,
//               marginBottom: 8,
//               fontWeight: 400,
//             }}
//           >
//             Get in Touch
//           </h3>
//           <p
//             className="sub-font"
//             style={{
//               fontSize: 14,
//               color: "rgba(245,237,214,0.45)",
//               marginBottom: 36,
//               lineHeight: 1.6,
//             }}
//           >
//             {selectedPlatform
//               ? `Tell us about your business and we'll get back to you about ${selectedPlatform} listing.`
//               : "Select a platform above, then fill this form to begin your listing journey."}
//           </p>

//           <div
//             className="form-grid"
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: 20,
//               marginBottom: 20,
//             }}
//           >
//             {INQUIRY_FIELDS.map((f) => (
//               <div key={f.label}>
//                 <label
//                   className="sub-font"
//                   style={{
//                     fontSize: 11,
//                     letterSpacing: "0.1em",
//                     textTransform: "uppercase",
//                     color: "rgba(201,168,76,0.7)",
//                     display: "block",
//                     marginBottom: 8,
//                   }}
//                 >
//                   {f.label}
//                 </label>
//                 <input
//                   className="inquiry-input"
//                   type={f.type}
//                   placeholder={f.placeholder}
//                   value={formData[f.label] || ""}
//                   onChange={(e) => handleFormChange(f.label, e.target.value)}
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Platform select if none chosen */}
//           {!selectedPlatform && (
//             <div style={{ marginBottom: 20 }}>
//               <label
//                 className="sub-font"
//                 style={{
//                   fontSize: 11,
//                   letterSpacing: "0.1em",
//                   textTransform: "uppercase",
//                   color: "rgba(201,168,76,0.7)",
//                   display: "block",
//                   marginBottom: 8,
//                 }}
//               >
//                 Platform of Interest
//               </label>
//               <select
//                 className="inquiry-input"
//                 value={formData["platform"] || ""}
//                 onChange={(e) => {
//                   handleFormChange("platform", e.target.value);
//                   setSelectedPlatform(e.target.value);
//                 }}
//               >
//                 <option value="">Select a marketplace</option>
//                 {MARKETPLACES.map((m) => (
//                   <option key={m.name} value={m.name}>
//                     {m.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           <div style={{ marginBottom: 32 }}>
//             <label
//               className="sub-font"
//               style={{
//                 fontSize: 11,
//                 letterSpacing: "0.1em",
//                 textTransform: "uppercase",
//                 color: "rgba(201,168,76,0.7)",
//                 display: "block",
//                 marginBottom: 8,
//               }}
//             >
//               Brief Message
//             </label>
//             <textarea
//               className="inquiry-input"
//               placeholder="Tell us about your products, current challenges, or what you're looking for..."
//               value={formData["message"] || ""}
//               onChange={(e) => handleFormChange("message", e.target.value)}
//               style={{ minHeight: 110, resize: "vertical" }}
//             />
//           </div>

//           <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
//             <button className="btn-gold" onClick={handleSubmit}>
//               {submitted ? "✓ Submitted!" : "Send Enquiry"}
//             </button>
//             <span
//               className="sub-font"
//               style={{
//                 fontSize: 12,
//                 color: "rgba(245,237,214,0.35)",
//                 lineHeight: 1.5,
//               }}
//             >
//               We respond within 24 hours.
//               <br />
//               No spam, only business.
//             </span>
//           </div>
//         </div>
//       </section>

//       <div className="gold-line" style={{ opacity: 0.15 }} />

//       {/* ─── SECTION 3: PARTNER PROJECTS ─────────────── */}
//       <section style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
//         {/* Header */}
//         <div style={{ textAlign: "center", marginBottom: 64 }}>
//           <p
//             className="sub-font"
//             style={{
//               fontSize: 11,
//               letterSpacing: "0.2em",
//               textTransform: "uppercase",
//               color: gold,
//               marginBottom: 16,
//             }}
//           >
//             Our Work
//           </p>
//           <h2
//             className="title-font section-title"
//             style={{
//               fontSize: "clamp(28px, 4vw, 48px)",
//               fontWeight: 700,
//               color: "#fff",
//               lineHeight: 1.2,
//               marginBottom: 20,
//             }}
//           >
//             Websites We've Built{" "}
//             <br />
//             <span style={{ color: gold }}>& Proudly Partner With</span>
//           </h2>
//           <p
//             className="sub-font"
//             style={{
//               fontSize: 15,
//               color: "rgba(245,237,214,0.5)",
//               maxWidth: 520,
//               margin: "0 auto",
//               lineHeight: 1.7,
//             }}
//           >
//             Beyond marketplace listing, we craft digital experiences. These are brands we've
//             built and continue to grow as exclusive digital partners.
//           </p>
//         </div>

//         {/* Partner cards */}
//         <div
//           className="partners-grid"
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
//             gap: 32,
//           }}
//         >
//           {PARTNERS.map((p, pi) => {
//             const activeImg = activePartnerImg[pi] ?? 0;
//             return (
//               <div
//                 key={pi}
//                 className="glass partner-card"
//                 style={{
//                   borderRadius: 20,
//                   overflow: "hidden",
//                   border: `1px solid rgba(201,168,76,0.12)`,
//                   position: "relative",
//                 }}
//               >
//                 {/* Image area */}
//                 <div
//                   style={{
//                     position: "relative",
//                     width: "100%",
//                     paddingTop: "60%",
//                     overflow: "hidden",
//                     background: "#111",
//                   }}
//                 >
//                   <img
//                     src={p.images[activeImg]}
//                     alt={p.brand}
//                     style={{
//                       position: "absolute",
//                       inset: 0,
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       transition: "transform 0.6s ease, opacity 0.4s",
//                       transform: "scale(1.03)",
//                     }}
//                     onMouseEnter={(e) =>
//                       ((e.target as HTMLImageElement).style.transform = "scale(1.08)")
//                     }
//                     onMouseLeave={(e) =>
//                       ((e.target as HTMLImageElement).style.transform = "scale(1.03)")
//                     }
//                   />
//                   {/* Gradient overlay */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       inset: 0,
//                       background:
//                         "linear-gradient(to bottom, transparent 40%, rgba(8,8,8,0.85) 100%)",
//                     }}
//                   />
//                   {/* Partner badge */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: 16,
//                       right: 16,
//                       padding: "5px 12px",
//                       borderRadius: 40,
//                       background: "rgba(201,168,76,0.15)",
//                       border: `1px solid ${gold}50`,
//                       fontSize: 10,
//                       color: gold,
//                       letterSpacing: "0.12em",
//                       textTransform: "uppercase",
//                     }}
//                     className="sub-font"
//                   >
//                     Partner
//                   </div>
//                   {/* Thumbnails */}
//                   {p.images.length > 1 && (
//                     <div
//                       style={{
//                         position: "absolute",
//                         bottom: 12,
//                         left: "50%",
//                         transform: "translateX(-50%)",
//                         display: "flex",
//                         gap: 6,
//                       }}
//                     >
//                       {p.images.map((img, ii) => (
//                         <div
//                           key={ii}
//                           className={`img-thumb${ii === activeImg ? " active" : ""}`}
//                           style={{
//                             width: 42,
//                             height: 30,
//                             borderRadius: 4,
//                             overflow: "hidden",
//                           }}
//                           onClick={() => setPartnerImg(pi, ii)}
//                         >
//                           <img
//                             src={img}
//                             alt=""
//                             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Text content */}
//                 <div style={{ padding: "28px 28px 32px" }}>
//                   <div style={{ marginBottom: 4 }}>
//                     <span
//                       className="sub-font"
//                       style={{
//                         fontSize: 10,
//                         letterSpacing: "0.15em",
//                         textTransform: "uppercase",
//                         color: p.color,
//                         opacity: 0.8,
//                       }}
//                     >
//                       {p.tagline}
//                     </span>
//                   </div>
//                   <h3
//                     className="title-font"
//                     style={{
//                       fontSize: 22,
//                       color: p.color,
//                       fontWeight: 700,
//                       marginBottom: 12,
//                     }}
//                   >
//                     {p.brand}
//                   </h3>
//                   <p
//                     className="sub-font"
//                     style={{
//                       fontSize: 14,
//                       lineHeight: 1.7,
//                       color: "rgba(245,237,214,0.55)",
//                       marginBottom: 24,
//                     }}
//                   >
//                     {p.desc}
//                   </p>
//                   <div
//                     style={{
//                       display: "flex",
//                       gap: 12,
//                       alignItems: "center",
//                       flexWrap: "wrap",
//                     }}
//                   >
//                     {["Web Design", "Development", "Brand Strategy"].map((tag) => (
//                       <span
//                         key={tag}
//                         className="sub-font"
//                         style={{
//                           fontSize: 10,
//                           padding: "4px 10px",
//                           borderRadius: 40,
//                           background: p.accent,
//                           border: `1px solid ${p.color}30`,
//                           color: p.color,
//                           letterSpacing: "0.06em",
//                         }}
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Bottom accent */}
//                 <div
//                   style={{
//                     height: 2,
//                     background: `linear-gradient(90deg, transparent, ${p.color}60, transparent)`,
//                   }}
//                 />
//               </div>
//             );
//           })}
//         </div>
//         <ContactUsForm />
//         <ServiceSection />
//       </section>

//       <div className="gold-line" style={{ opacity: 0.15 }} />

      
//     </div>
//   );
// }

import React from 'react';
import { Link } from 'react-router-dom';
import ServiceSection from '@/components/HomePage/ServicesSection';
import ContactUsForm from '@/pages/ContactUsForm';

const platforms = [
  { name: 'Myntra', logo: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/platforms/myntra.webp', desc: 'India\'s leading fashion destination' },
  { name: 'JioMart', logo: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/platforms/jiomart.webp', desc: 'Reliance\'s marketplace powerhouse' },
  { name: 'Amazon', logo: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/platforms/amazon.webp', desc: 'Global e commerce giant' },
  { name: 'Flipkart', logo: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/platforms/flipkart.webp', desc: 'India\'s homegrown marketplace' },
  { name: 'Meesho', logo: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/platforms/meesho.webp', desc: 'Social commerce revolution' },
  { name: 'Ajio', logo: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/platforms/ajio.webp', desc: 'Premium fashion & lifestyle' },
];

const stats = [
  { number: '₹75,000 Cr+', label: 'Myntra\'s Annual GMV' },
  { number: '50M+', label: 'Active Buyers on Flipkart' },
  { number: '4X', label: 'Revenue Growth for Sellers' },
  { number: '30+', label: 'Marketplaces We Cover' },
];

const processSteps = [
  { step: '01', title: 'Brand Consultation', desc: 'We understand your product range, brand story, and target audience to identify the right platforms.' },
  { step: '02', title: 'Platform Registration', desc: 'Our team handles the entire registration and documentation process, bypassing common delays.' },
  { step: '03', title: 'Catalog & Listing', desc: 'Professional product photography guidance, compelling descriptions, and SEO-optimized listings.' },
  { step: '04', title: 'Account Optimization', desc: 'Pricing strategy, inventory management setup, and performance tracking dashboards.' },
  { step: '05', title: 'Launch & Scale', desc: 'Go live with full support ad management, promotions, and growth strategy.' },
];

const painPoints = [
  'Applied to Myntra months ago but haven\'t heard back?',
  'Struggling with complex documentation for marketplace onboarding?',
  'Missing out on festive season sales due to delays?',
  'Don\'t know which platform suits your product category?',
  'Need someone to manage listings while you focus on product?',
];

const PlatformListing: React.FC = () => {
  return (
    <div className="service-page">
      {/* Section 1: Hero */}
      <section className="service-section">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <p className="font-body text-gold uppercase tracking-[0.2em] text-sm font-semibold">
              E-COMMERCE PLATFORM LISTING
            </p>
            <h1 className="service-heading text-3xl md:text-4xl lg:text-5xl leading-tight">
              Get Your Brand on Every <span className="text-gold">Major Marketplace</span>
            </h1>
            <p className="service-text text-base md:text-lg">
              From Myntra to JioMart, Amazon to Flipkart we help brands onboard, list, and sell on
              India's and the world's biggest e commerce platforms. No delays, no rejections.
            </p>
            <Link to="/contact-us" className="cta-button inline-block">
              Start Selling Today
            </Link>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="image-container aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/platform-listing/hero.webp" alt="E commerce platforms" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Stats */}
      <section className="service-section">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-6 md:p-8 text-center transition-all duration-300 hover:scale-105">
              <p className="font-heading text-gold text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{stat.number}</p>
              <p className="service-text-muted text-xs md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Pain Points */}
      <section className="service-section">
        <div className="glass-card p-8 md:p-12 lg:p-16">
          <h2 className="service-heading text-2xl md:text-3xl text-center mb-4">Fed Up?</h2>
          <p className="service-text-muted text-center max-w-xl mx-auto mb-10">
            We get it. Getting listed on major marketplaces can be frustratingly slow and complicated.
          </p>
          <div className="space-y-4 max-w-2xl mx-auto">
            {painPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'hsla(43, 74%, 49%, 0.06)' }}>
                <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-midnight text-xs font-bold">!</span>
                </div>
                <p className="service-text text-sm md:text-base">{point}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <span className="service-heading text-lg md:text-xl">We solve all of this <span className="text-gold">guaranteed.</span></span>
          </p>
        </div>
      </section>

      {/* Section 4: Platforms We Cover */}
      <section className="service-section">
        <h2 className="service-heading text-2xl md:text-3xl lg:text-4xl text-center mb-12">
          Platforms We Cover
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {platforms.map((p, i) => (
            <div key={i} className="glass-card p-6 md:p-8 text-center transition-all duration-300 hover:scale-105 flex flex-col items-center gap-4">
              <div className="image-container w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden">
                <img src={p.logo} alt={p.name} className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </div>
              <h3 className="font-heading text-cream text-lg md:text-xl font-bold">{p.name}</h3>
              <p className="service-text-muted text-xs md:text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Our Process */}
      <section className="service-section">
        <h2 className="service-heading text-2xl md:text-3xl lg:text-4xl text-center mb-12">
          How We Get You Listed
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {processSteps.map((step, i) => (
            <div key={i} className="glass-card p-6 md:p-8 flex flex-col sm:flex-row items-start gap-6 transition-all duration-300 hover:scale-[1.02]">
              <div className="text-gold font-heading text-4xl md:text-5xl font-bold opacity-40 flex-shrink-0">
                {step.step}
              </div>
              <div>
                <h3 className="font-heading text-cream text-lg md:text-xl font-bold mb-2">{step.title}</h3>
                <p className="service-text-muted text-sm md:text-base">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: CTA */}
      {/* <section className="service-section text-center">
        <div className="glass-card p-8 md:p-12 lg:p-16 max-w-3xl mx-auto">
          <h3 className="service-subheading text-xl md:text-2xl lg:text-3xl mb-4">
            Don't Miss the Next Big Sale Season
          </h3>
          <p className="service-text-muted text-sm md:text-base mb-8 max-w-xl mx-auto">
            Get listed on top marketplaces today and start selling to millions of customers. We handle everything you focus on your products.
          </p>
          <Link to="/contact-us" className="cta-button">
            Get Started Now
          </Link>
        </div>
      </section> */}

      {/* Services Section */}
      <ContactUsForm/>
      <ServiceSection />
    </div>
  );
};

export default PlatformListing;

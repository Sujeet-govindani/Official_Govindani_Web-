import { useState, useEffect, useRef } from "react";
import ContactUsForm from "@/pages/ContactUsForm";
import {
  SectionLabel, SectionHeading, GoldButton, OutlineButton,
  BulletList, ProcessSteps, FAQAccordion, CTABand,
  EmbedPlaceholder, ClientStrip, GalleryGrid,
} from "../../ui/Components";
import { FONTS, GLOBAL_CSS } from "../../ui/styles";
import ServiceSection from "@/components/HomePage/ServicesSection";
import { FaInstagram, FaFacebook, FaExternalLinkAlt } from "react-icons/fa";

const processSteps = [
  { num: "01", title: "Project & Sales Audit", desc: "We study your current projects, sales pipeline, CRM setup and competitor positioning." },
  { num: "02", title: "Content Buckets & Launch Strategy", desc: "We define project-wise content categories and plan launch campaigns for upcoming inventory." },
  { num: "03", title: "Creative Production", desc: "Walk-through reels, site images, testimonial edits, renders all produced and branded consistently." },
  { num: "04", title: "Publishing & Lead Capture", desc: "Scheduled posts linked to lead forms integrated with your real estate CRM for instant sales team follow-up." },
  { num: "05", title: "Lead Reports & Monthly Review", desc: "Monthly breakdown of leads generated, cost per lead from organic social and campaign performance." },
];

const faqs = [
  { q: "How do you generate leads directly from social media?", a: "We use Meta Lead Forms, WhatsApp CTA buttons and landing page links in posts and stories all connected to your CRM so your sales team gets instant lead alerts." },
  { q: "Can you handle multiple projects at once?", a: "Yes. We create separate content buckets for each project so they don't overlap, while maintaining one consistent brand voice for your developer identity." },
  { q: "Do you produce video walk-throughs and reels?", a: "Yes we coordinate with your site team for footage, edit in-house and script the reel/video to highlight key selling points: location, lifestyle, approvals, pricing." },
  { q: "Can you run ads alongside organic content?", a: "Absolutely. We offer a performance marketing add-on that integrates Meta and Google Ads with the same creatives and landing pages used in organic campaigns." },
];

const galleryItems = [
  { label: "Project Launch Post", tag: "Real Estate", emoji: "" },
  { label: "Exterior Render", tag: "Creative", emoji: "" },
  { label: "Amenities Carousel", tag: "Showcase", emoji: "" },
  { label: "Floor Plan Highlight", tag: "Info", emoji: "" },
  { label: "Testimonial Reel Cover", tag: "Social Proof", emoji: "" },
  { label: "Site Visit Reel Cover", tag: "Video", emoji: "" },
  { label: "Limited Units Offer", tag: "Campaign", emoji: "" },
  { label: "Location USP Post", tag: "Awareness", emoji: "" },
];

const whatWeDoCards = [
  {
    title: "Project Content Buckets", icon: "",
    bullets: [
      "Exteriors, interiors, lifestyle, amenities, approvals each in its own content series",
      "Consistent visual language across all project handles and developer brand",
      "360° walkthroughs and on-site videos edited into thumb-stopping reels",
    ],
  },
  {
    title: "Launch & Offer Campaigns", icon: "",
    bullets: [
      "Project launch campaigns with countdown posts, teasers and reveal content",
      "Limited-unit offer campaigns with urgency messaging and deadline CTAs",
      "Festival offers mapped to buyer season: Navratri, Diwali, New Year windows",
    ],
  },
  {
    title: "Lead Capture & CRM Integration", icon: "",
    bullets: [
      "Meta Lead Forms connected directly to your real estate CRM",
      "WhatsApp CTA buttons for instant enquiry-to-conversation flow",
      "Site visit booking prompts with form links in bio and stories",
    ],
  },
  {
    title: "Trust & Credibility Content", icon: "",
    bullets: [
      "Customer testimonial reels and handover posts for social proof",
      "RERA approval posts, bank approval announcements and milestone updates",
      "Behind-the-scenes construction updates to build buyer confidence",
    ],
  },
];

const heroStats = [
  { val: "300+", label: "Sales Growth" },
  { val: "Multi", label: "Projects Handled" },
  { val: "CRM", label: "Integrated Leads" },
  { val: "Meta", label: "Ads Supported" },
];

const ciBuildersGridItems = [
  {
    id: 1,
    handle: "@cibuilders",
    avatar: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/Social-Media/SocialMedia-Real-Estate/social-media-real-estate-CI Builders-img1.webp",
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img6.webp",
    title: "Luxury High-Rise Launch",
    link: "https://www.instagram.com/ci.builders?igsh=MWkybmIwYzBuNmdieQ==",
    tag: "New Project"
  },
  {
    id: 2,
    handle: "@cibuilders",
    avatar: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/Social-Media/SocialMedia-Real-Estate/social-media-real-estate-CI Builders-img1.webp",
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img4.webp",
    title: "Premium Amenities Showcase",
    link: "https://www.instagram.com/ci.builders?igsh=MWkybmIwYzBuNmdieQ==",
    tag: "Lifestyle"
  },
  {
    id: 3,
    handle: "@cibuilders",
    avatar: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/Social-Media/SocialMedia-Real-Estate/social-media-real-estate-CI Builders-img1.webp",
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img10.webp",
    title: "Modern Architecture Spotlight",
    link: "https://www.instagram.com/ci.builders?igsh=MWkybmIwYzBuNmdieQ==",
    tag: "Design"
  },
  {
    id: 4,
    handle: "@cibuilders",
    avatar: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/Social-Media/SocialMedia-Real-Estate/social-media-real-estate-CI Builders-img1.webp",
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img14.webp",
    title: "Construction Milestone Update",
    link: "https://www.instagram.com/ci.builders?igsh=MWkybmIwYzBuNmdieQ==",
    tag: "Milestone"
  }
];

const mangalamReels = [
  {
    id: "reel-1",
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/updated%20mere%20guru%20kon%20reel.mp4",
    poster: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/mangalamposter.png",
    handle: "@mangalamlandmarks",
    instagramUrl: "https://www.instagram.com/mangalamlandmarks/"
  },
  {
    id: "reel-2",
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/chalta%20hai%20updated%20(1).mp4",
    poster: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/mangalamposter2.png",
    handle: "@mangalamlandmarks",
    instagramUrl: "https://www.instagram.com/mangalamlandmarks/"
  }
];

function ReelPlayer({ src, poster, handle, title, category, instagramUrl }: {
  src: string; poster: string; handle: string; title: string; category: string; instagramUrl: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(err => console.log(err));
    } else {
      videoRef.current.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onVolumeChange = () => setIsMuted(video.muted);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("volumechange", onVolumeChange);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("volumechange", onVolumeChange);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#000",
        borderRadius: 24,
        overflow: "hidden",
        border: "2px solid rgba(201,168,76,0.2)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        aspectRatio: "9/16"
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
        onClick={togglePlayPause}
      />

      <div style={{
        position: "absolute",
        top: 16,
        left: 16,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(0,0,0,0.6)",
        padding: "6px 12px",
        borderRadius: 20,
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(255,255,255,0.1)"
      }}>
        <FaInstagram style={{ color: "#E4405F", fontSize: 16 }} />
        <span style={{ fontSize: 11, fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: "#fff", letterSpacing: "0.05em" }}>
          REELS
        </span>
      </div>

      {!isPlaying && (
        <div
          onClick={togglePlayPause}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.25)",
            cursor: "pointer"
          }}
        >
          <div style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.7)",
            border: "2px solid #C9A84C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(201,168,76,0.3)"
          }}>
            <div style={{
              width: 0,
              height: 0,
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderLeft: "16px solid #C9A84C",
              marginLeft: 4
            }} />
          </div>
        </div>
      )}

      {(showControls || !isPlaying) && (
        <div style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          display: "flex",
          gap: 8,
          zIndex: 10
        }}>
          <button
            onClick={toggleMute}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.75)",
              border: "1.5px solid rgba(201,168,76,0.5)",
              color: "#C9A84C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(4px)",
              transition: "all 0.2s ease"
            }}
          >
            {isMuted ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>

          <button
            onClick={togglePlayPause}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.75)",
              border: "1.5px solid rgba(201,168,76,0.5)",
              color: "#C9A84C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(4px)",
              transition: "all 0.2s ease"
            }}
          >
            {isPlaying ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
        </div>
      )}

      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(0deg, rgba(0,0,0,0.95) 0%, transparent 100%)",
        padding: "40px 16px 16px",
        zIndex: 5,
        pointerEvents: "none"
      }}>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 9,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#C9A84C",
          margin: "0 0 4px",
          fontWeight: 600
        }}>
          {category}
        </p>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 14,
          fontWeight: 600,
          color: "#F5F0E8",
          margin: "0 0 4px",
          lineHeight: 1.2
        }}>
          {title}
        </p>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 10,
          color: "rgba(245,240,232,0.5)",
          margin: 0
        }}>
          {handle}
        </p>
      </div>
    </div>
  );
}

export default function RealEstateSocialMediaPage() {

  const scrollToContact = () => {
    const element = document.getElementById('contact-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ background: "#090909", color: "#F5F0E8", minHeight: "100vh", fontFamily: "'EB Garamond', serif" }}>
      <style>{`
        ${FONTS}
        ${GLOBAL_CSS}
        .back-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Montserrat',sans-serif; font-size: 11px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(201,168,76,0.65); text-decoration: none;
          margin-bottom: 32px; transition: color 0.2s;
        }
        .back-link:hover { color: #C9A84C; }
        .what-card { background: #090909; padding: 40px 32px; }
        @media (max-width: 600px) { .what-card { padding: 28px 20px; } }

        /* ── HERO SECTION ─────────────────────────────────────── */
        .re-hero-section {
          min-height: min(90vh, var(--hero-max));
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 160px;
          padding-bottom: 40px;
          padding-left: clamp(16px, 5vw, 80px);
          padding-right: clamp(16px, 5vw, 80px);
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .re-hero-section {
            padding-top: 120px;
            padding-bottom: 80px;
          }
        }

        /* ── INLINE STATS GRID ────────────────────────────────── */
        .re-hero-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          width: 100%;
          max-width: 680px;
          margin-top: 48px;
          background: rgba(201,168,76,0.1);
        }
        @media (min-width: 640px) {
          .re-hero-stats {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .re-stat-item {
          background: #090909;
          text-align: center;
          padding: 28px 16px;
          margin: 1px;
        }
        .re-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 5vw, 36px);
          font-weight: 600;
          color: #C9A84C;
          line-height: 1;
        }
        .re-stat-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.4);
          margin-top: 8px;
        }

        /* ── LIVE SOCIAL FEED ─────────────────────────────────── */
        .social-feed-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 24px;
          margin-top: 40px;
          max-width: 960px;
          margin-left: auto;
          margin-right: auto;
        }
        @media (min-width: 640px) {
          .social-feed-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .social-feed-card {
          background: #0d0d0d;
          border: 1px solid rgba(201,168,76,0.15);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border-radius: 8px;
        }
        .social-feed-card:hover {
          border-color: rgba(201,168,76,0.5);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(201,168,76,0.1);
        }
        .feed-header {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(201,168,76,0.1);
          z-index: 2;
        }
        .feed-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .feed-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          padding: 2px;
        }
        .feed-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid #0d0d0d;
          object-fit: cover;
        }
        .feed-handle {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #F5F0E8;
        }
        .feed-content {
          flex: 1;
          background: rgba(201,168,76,0.02);
          overflow: hidden;
          position: relative;
          min-height: 0;
        }
        .feed-iframe {
          width: 100%;
          height: 100%;
          border: none;
          overflow: auto;
        }
        .feed-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 4;
        }
        .social-feed-card:hover .feed-overlay {
          opacity: 1;
        }
        .social-feed-card:hover .feed-img {
          transform: scale(1.06);
          opacity: 0.35;
        }
        .feed-img {
          transition: all 0.4s ease;
        }
        .live-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #ff0000;
          color: white;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 2px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          animation: pulse 2s infinite;
          z-index: 3;
          pointer-events: none;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        .instagram-redirect {
          position: absolute;
          bottom: 15px;
          right: 15px;
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 4;
          pointer-events: auto;
        }
        .social-feed-card:hover .instagram-redirect {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>


      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="re-hero-section" >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg,rgba(201,168,76,0.02) 0px,transparent 1px,transparent 50px)", pointerEvents: "none" }} />

        <div style={{
          maxWidth: 1280,
          marginTop: "-20px",
          width: "100%",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 150 }}>
            <span style={{ fontSize: 52 }}></span>
            <SectionLabel>Real Estate · Developers</SectionLabel>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(40px,6.5vw,84px)", fontWeight: 300, lineHeight: 1.1, color: "#F5F0E8", marginBottom: 28, maxWidth: 860 }}>
            Social Media Marketing<br /><em style={{ color: "#C9A84C" }}>for Real Estate</em>
          </h1>
          <p style={{ fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.75, color: "rgba(245,240,232,0.72)", maxWidth: 660, marginBottom: 20, fontFamily: "'EB Garamond',serif" }}>
            For developers, we use social media as a lead-engine: project launches, site updates, offers and credibility-building content all mapped to your CRM and sales team.
          </p>
          <p style={{
            fontSize: 14, color: "rgba(201,168,76,0.85)",
            fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.03em",
            marginBottom: 44, paddingLeft: 16,
            borderLeft: "2px solid rgba(201,168,76,0.4)",
            textAlign: "left",
            maxWidth: 660,
          }}>
            300+ sales growth tracked for real estate clients through structured social content and lead systems.
          </p>

          <div className="re-hero-stats">
            {heroStats.map((s) => (
              <div key={s.label} className="re-stat-item">
                <div className="re-stat-val">{s.val}</div>
                <div className="re-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL ESTATE SHOWCASE SECTION ── */}
      <section style={{ padding: "60px clamp(16px,5vw,80px)", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            label="Social Showcase"
            title={<>Real Estate Portfolios<br /><em style={{ color: "#C9A84C" }}>We Manage</em></>}
            subtitle="Curated visual stories, high-converting lead campaigns, and interactive walkthroughs."
          />

          <style>{`
            .reels-container-grid {
              display: grid;
              grid-template-columns: repeat(1, 1fr);
              gap: 32px;
              max-width: 800px;
              margin: 40px auto 0;
            }
            @media (min-width: 640px) {
              .reels-container-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }
          `}</style>

          {/* 1. CI Builders Showcase */}
          <div style={{ marginBottom: 60 }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 3.5vw, 32px)",
              color: "#C9A84C",
              marginBottom: 24,
              borderBottom: "1px solid rgba(201,168,76,0.15)",
              paddingBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 12
            }}>
              <img
                src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/Social-Media/SocialMedia-Real-Estate/social-media-real-estate-CI Builders-img1.webp"
                alt="CI Builders Logo"
                style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(201,168,76,0.3)" }}
              />
              CI Builders
              <span style={{ fontSize: 13, fontFamily: "'Montserrat', sans-serif", color: "rgba(245,240,232,0.4)", fontWeight: 400, marginLeft: "auto" }}>
                @cibuilders
              </span>
            </h3>

            <div className="social-feed-grid">
              {ciBuildersGridItems.map((item) => (
                <div
                  key={item.id}
                  className="social-feed-card"
                  onClick={() => window.open(item.link, '_blank')}
                >
                  {/* Header */}
                  <div className="feed-header">
                    <div className="feed-user">
                      <div className="feed-avatar">
                        <img
                          src={item.avatar}
                          alt={`${item.handle} Avatar`}
                        />
                      </div>
                      <span className="feed-handle">{item.handle}</span>
                    </div>
                    <FaInstagram style={{ color: '#E4405F', fontSize: 18 }} />
                  </div>

                  {/* Image Container */}
                  <div className="feed-content" style={{ position: "relative", width: "100%", height: "auto", overflow: "hidden" }}>
                    <img
                      src={item.imgUrl}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        transition: "all 0.4s ease"
                      }}
                      className="feed-img"
                    />

                    {/* Hover Overlay */}
                    <div className="feed-overlay">
                      <FaInstagram style={{ color: "#C9A84C", fontSize: 44, display: "inline-block", zIndex: 5 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Mangalam Landmarks Video Showcase */}
          <div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 3.5vw, 32px)",
              color: "#C9A84C",
              marginBottom: 24,
              borderBottom: "1px solid rgba(201,168,76,0.15)",
              paddingBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 12
            }}>
              <img
                src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/Social-Media/SocialMedia-Real-Estate/social-media-real-estate-Mangalam-img3.webp"
                alt="Mangalam Logo"
                style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(201,168,76,0.3)" }}
              />
              Mangalam Landmarks
              <span style={{ fontSize: 13, fontFamily: "'Montserrat', sans-serif", color: "rgba(245,240,232,0.4)", fontWeight: 400, marginLeft: "auto" }}>
                @mangalamlandmarks
              </span>
            </h3>

            <div className="reels-container-grid">
              {mangalamReels.map((reel) => (
                <ReelPlayer
                  key={reel.id}
                  src={reel.src}
                  poster={reel.poster}
                  handle={reel.handle}

                  instagramUrl={reel.instagramUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────────────── */}
      <section style={{ padding: "20px clamp(16px,5vw,80px)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Our Approach" title={<>Real Estate Social<br /><em style={{ color: "#C9A84C" }}>That Generates Leads</em></>} subtitle="Every post is part of a lead funnel from awareness to site visit booking." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 2, background: "rgba(201,168,76,0.07)" }}>
            {whatWeDoCards.map((card) => (
              <div key={card.title} className="what-card">
                <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 500, color: "#F5F0E8", marginBottom: 18 }}>{card.title}</div>
                <BulletList items={card.bullets} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section style={{ padding: "20px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Our Process" title={<>How We Run Real Estate<br /><em style={{ color: "#C9A84C" }}>Social for You</em></>} />
          <ProcessSteps steps={processSteps} />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section style={{ padding: "20px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Quick Answers" title={<>Real Estate Social<br /><em style={{ color: "#C9A84C" }}>FAQ</em></>} />
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <div id="contact-form-section">
        <ContactUsForm />
      </div>

      <ServiceSection />
    </div>
  );
}
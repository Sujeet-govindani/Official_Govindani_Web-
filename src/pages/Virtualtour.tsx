"use client";

import {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  memo,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cards } from "@/components/constant";
import NgoFooter from "@/components/NgoFooter";
import ContactUsForm from "./ContactUsForm";

gsap.registerPlugin(ScrollTrigger);

// ─── STATIC DATA ─────────────────────────────────────────────────────────────

const services = [
  { title: "Videography", description: "Cinematic property tours that captivate and sell", video: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/videography.mp4", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Videography13.webp", link: "/services/videography" },
  { title: "Lead Generation", description: "Strategic marketing to attract quality buyers", video: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/lead-gen-back-BG.mp4", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/lead-generation12.webp", link: "/services/lead-generation" },
  { title: "360° Virtual Tour", description: "Immersion remote property exploration experience", video: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/360.mp4", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/virtualtour12.webp", link: "/services/virtual-tours" },
  { title: "Website Design", description: "Custom platforms for your real estate brand", video: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/web%20design.mp4", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop", link: "/services/website-creation" },
  { title: "Photography", description: "Professional imagery that showcases excellence", video: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/photography2.mp4", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/photographyreal.webp", link: "/services/photography" },
];

const premiumServices = [
  { title: "Videography", description: "Cinematic property tours that captivate and sell", link: "/services/social-media", color: "from-blue-500 to-cyan-400", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/VIDEOGRAPHYICON.webp" },
  { title: "Lead Generation", description: "Strategic marketing to attract quality buyers", link: "/services/seo", color: "from-green-500 to-emerald-400", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LGICON.png" },
  { title: "360° Virtual Tour", description: "Immersion remote property exploration experience", link: "/services/meta-ads", color: "from-purple-500 to-pink-400", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/360VT.webp" },
  { title: "Website Design", description: "Custom platforms for your real estate brand", link: "/services/linkedin-ads", color: "from-orange-500 to-yellow-400", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/WC.webp" },
  { title: "Photography", description: "Professional imagery that showcases excellence", link: "/services/google-ads", color: "from-red-500 to-pink-400", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PGIICON.webp" },
  { title: "Social Media Marketing", description: "300%+ sales growth tracked for real estate clients through structured social content and lead systems.", link: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/services/news-highlights", color: "from-indigo-500 to-purple-400", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/SMM.webp" },
];

const photoImages = [
  "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img1.webp",
  "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img2.webp",
  "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img3.webp",
  "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img4.webp",
  "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img5.webp",
  "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img6.webp",
  "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img7.webp",
  "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img8.webp",
  "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img9.webp",
  "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img10.webp",
  "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img11.webp",
  "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img12.webp",
  "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img13.webp",
  "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img14.webp",
];

const leadServices = [
  { title: "Real Estate Leads", color: "from-[#d4af37] to-[#f4e5b8]", content: "Capture and convert high-interest prospects into valuable clients with targeted real estate lead generation strategies." },
  { title: "Franchise Leads", color: "from-[#c9a961] to-[#d4af37]", content: "Identify and connect with potential franchisees who share your vision and are ready to invest in growth opportunities." },
  { title: "Interior Design Leads", color: "from-[#f4e5b8] to-[#c9a961]", content: "Attract clients looking for premium design solutions with our specialized interior design lead generation services." },
];

const matterportTours = [
  { cls: "mp3-card1", m: "W7z5TJPfsJS", title: "CI Grand" },
  { cls: "mp3-card2", m: "icGMBANVL1Y", title: "CI Estate The Park" },
];

// ─── SERVICE CARD (memoized) ──────────────────────────────────────────────────

const ServiceCard = memo(({ service, index, animatedIdx }: {
  service: typeof premiumServices[0]; index: number; animatedIdx: number;
}) => {
  const isActive = animatedIdx === index;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group cursor-pointer h-full">
      <div
        className={`relative h-full overflow-hidden rounded-2xl transition-all duration-700 min-h-[210px] md:min-h-[300px] ${isActive ? "scale-[1.04] -translate-y-2" : "scale-100"} hover:scale-[1.02] hover:-translate-y-1`}
        style={{
          background: "linear-gradient(135deg,rgba(0,0,0,0.95),rgba(10,10,10,0.85))",
          boxShadow: isActive ? "0 5px 15px rgba(212,175,55,0.5)" : "none",
          border: isActive ? "2px solid rgba(212,175,55,0.88)" : "1.5px solid rgba(212,175,55,0.38)",
        }}>
        {isActive && <div className="absolute inset-0 rounded-2xl animate-pulse-ring pointer-events-none" />}

        {/* Static flex layout no absolute so content is never clipped on mobile */}
        <div className="flex flex-col items-center justify-center p-4 md:p-7 text-center h-full">
          <div className={`mb-3 md:mb-5 transition-transform duration-700 ${isActive ? "scale-110" : "scale-100"}`}>
            {/* Fixed 80×80 px on mobile reliable, never collapses */}
            <div className="relative overflow-hidden rounded-xl w-[80px] h-[80px] md:w-[120px] md:h-[120px]">
              {!imgError ? (
                <img
                  src={service.image}
                  alt={service.title}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-1"
                  style={{
                    background: "linear-gradient(135deg,rgba(212,175,55,0.12),rgba(212,175,55,0.06))",
                    border: "1.5px dashed rgba(212,175,55,0.35)",
                    borderRadius: "12px",
                  }}
                />
              )}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ boxShadow: "inset 0 0 16px rgba(212,175,55,0.35), 0 0 20px rgba(212,175,55,0.25)" }}
                />
              )}
            </div>
          </div>

          <h3 className="text-sm md:text-xl font-bold mb-1.5 md:mb-2 vt-heading leading-snug">
            <span className="gold-text">{service.title}</span>
          </h3>
          <div className="h-px w-10 md:w-14 mb-2 md:mb-3 bg-gradient-to-r from-transparent via-[#d4af37]/55 to-transparent" />
          <p className="text-[11px] md:text-sm leading-relaxed text-slate-200/75 vt-body">{service.description}</p>
        </div>
      </div>
    </div>
  );
});
ServiceCard.displayName = "ServiceCard";

// ─── CAROUSEL HELPER ──────────────────────────────────────────────────────────

function positionCards(
  selector: string,
  rotation: number,
  radius: number,
  threshold = 0.7,
  cScale = 1.2,
  glowClass = ".center-glow",
  onCenter?: (i: number) => void,
) {
  const items = document.querySelectorAll(selector);
  const total = items.length;
  let found = -1;

  items.forEach((el, i) => {
    const angle = (360 / total) * i + rotation;
    const rad = (angle * Math.PI) / 180;
    const x = Math.sin(rad) * radius;
    const z = Math.cos(rad) * radius;
    const nz = (z + radius) / (radius * 2);
    const isC = z > radius * threshold;
    if (isC) found = i;

    gsap.to(el, {
      x,
      z,
      scale: isC ? cScale : 0.6 + nz * 0.7,
      opacity: isC ? 1 : 0.7 + nz * 0.3,
      filter: `blur(${isC ? 0 : (1 - nz) * 4}px) brightness(${isC ? 1.1 : 0.9})`,
      rotateY: -angle,
      duration: 1,
      ease: "power2.out",
      overwrite: "auto",
      force3D: true,
    });

    const glow = el.querySelector(glowClass);
    if (glow) {
      gsap.to(glow, { opacity: isC ? 0.8 : 0, duration: 0.8, overwrite: "auto" });
    }
  });

  if (found !== -1 && onCenter) onCenter(found);
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const Virtualtour = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const videomonialRef = useRef<HTMLDivElement>(null);
  const scrollCtxRef = useRef<gsap.Context | null>(null);
  const videomonialCtxRef = useRef<gsap.Context | null>(null);
  const vdRef = useRef<(HTMLVideoElement | null)[]>([]);
  const bgVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const carouselTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const photoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const desktopCarouselTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mobileCarouselTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [rot, setRot] = useState({ d: 0, m: 0, p: 0 });
  const [activeImg, setActiveImg] = useState(0);
  const [center, setCenter] = useState(0);
  const [animCard, setAnimCard] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const photoTouchStartX = useRef<number | null>(null);
  const expandRef = useRef<((idx: number) => void) | null>(null);

  const bubbles = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i, left: `${(i * 8.33) % 100}%`, size: `${14 + (i * 7) % 28}px`,
    drift: `${-40 + (i * 11) % 80}px`, dur: `${11 + (i * 3) % 10}s`,
    delay: `${-((i * 2.3) % 14)}s`, opacity: 0.12 + (i % 4) * 0.04, blur: `${0.5 + (i % 3)}px`,
  })), []);

  const stars = useMemo(() => Array.from({ length: 16 }).map((_, i) => ({
    id: i, left: `${(i * 6.25) % 100}%`, size: `${2 + (i % 4)}px`,
    drift: `${-50 + (i * 8) % 100}px`, dur: `${9 + (i * 2) % 10}s`,
    delay: `${-((i * 1.8) % 12)}s`, opacity: 0.18 + (i % 3) * 0.08,
  })), []);

  useEffect(() => {
    carouselTimerRef.current = setInterval(
      () => setAnimCard((p) => (p + 1) % premiumServices.length),
      3000
    );
    return () => {
      if (carouselTimerRef.current) clearInterval(carouselTimerRef.current);
    };
  }, []);

  useEffect(() => {
    photoTimerRef.current = setInterval(
      () => setPhotoIdx((p) => (p + 1) % photoImages.length),
      3000
    );
    return () => {
      if (photoTimerRef.current) clearInterval(photoTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (desktopCarouselTimerRef.current) clearInterval(desktopCarouselTimerRef.current);
    if (mobileCarouselTimerRef.current) clearInterval(mobileCarouselTimerRef.current);

    const isDesk = window.innerWidth >= 768;

    if (isDesk) {
      const r = window.innerWidth < 1024 ? 380 : 480;
      positionCards(".circular-card", rot.d, r, 0.7, window.innerWidth < 1024 ? 1.25 : 1.2, ".center-glow", setCenter);
      desktopCarouselTimerRef.current = setInterval(
        () => setRot((p) => ({ ...p, d: p.d - 360 / services.length })),
        4500
      );
    } else {
      positionCards(".mobile-circular-card", rot.m, 145, 0.7, 1.3, ".mobile-center-glow", setCenter);
      mobileCarouselTimerRef.current = setInterval(
        () => setRot((p) => ({ ...p, m: p.m - 360 / services.length })),
        4000
      );
    }

    const onResize = () => setRot((p) => ({ ...p }));
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      if (desktopCarouselTimerRef.current) clearInterval(desktopCarouselTimerRef.current);
      if (mobileCarouselTimerRef.current) clearInterval(mobileCarouselTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rot.d, rot.m]);

  useEffect(() => {
    bgVideoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === center) {
        v.play().catch(() => { });
      } else {
        v.pause();
      }
    });
  }, [center]);

  useEffect(() => {
    if (!rootRef.current) return;

    if (scrollCtxRef.current) {
      scrollCtxRef.current.revert();
      scrollCtxRef.current = null;
    }

    const ctx = gsap.context(() => {
      gsap.set(".vt2-video", { scale: 1.08, filter: "blur(8px) saturate(1.05)", opacity: 0.85, force3D: true });
      gsap.set(".vt2-glass", { opacity: 1, x: 0, y: 0, filter: "blur(0px)", force3D: true });
      gsap.set(".vt2-kicker", { opacity: 0, y: 10, force3D: true });
      gsap.set(".vt2-title", { opacity: 0, y: 14, filter: "blur(10px)", force3D: true });
      gsap.set(".vt2-para", { opacity: 0, y: 14, filter: "blur(10px)", force3D: true });
      gsap.set(".vt2-tags", { opacity: 0, y: 10, force3D: true });
      gsap.set(".mp3-kicker", { opacity: 0, y: 10, force3D: true });
      gsap.set(".mp3-title", { opacity: 0, y: 16, filter: "blur(10px)", force3D: true });
      gsap.set(".mp3-subtitle", { opacity: 0, y: 8, filter: "blur(5px)", force3D: true });
      gsap.set(".mp3-card1", { opacity: 1, scale: 1, filter: "blur(0px)", xPercent: -50, force3D: true });
      gsap.set(".mp3-card2", { opacity: 0, scale: 0.96, filter: "blur(10px)", xPercent: -50, force3D: true });

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          const tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: ".vt2-trigger",
              start: "top top",
              end: "+=140%",
              pin: true,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
            defaults: { ease: "none" },
          });

          tl2
            .to(".vt2-video", { scale: 1, opacity: 1, filter: "blur(0px) saturate(1)", duration: 0.35, force3D: true }, 0)
            .fromTo(".vt2-glass", { y: 12, filter: "blur(6px)", opacity: 0.85 }, { y: 0, filter: "blur(0px)", opacity: 1, duration: 0.22, force3D: true }, 0.12)
            .to(".vt2-kicker", { opacity: 1, y: 0, duration: 0.8, force3D: true }, 0.22)
            .to(".vt2-title", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.18, force3D: true }, 0.28)
            .to(".vt2-para", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.22, stagger: 0.08, force3D: true }, 0.36)
            .to(".vt2-tags", { opacity: 1, y: 0, duration: 0.14, force3D: true }, 0.62)
            .to(".vt2-videoCard", { y: -10, duration: 0.38, force3D: true }, 0.7)
            .to(".vt2-glass", { y: 6, duration: 0.38, force3D: true }, 0.7);

          gsap.to(".vt2-video", {
            scale: 1.012,
            duration: 2.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            force3D: true,
            scrollTrigger: {
              trigger: ".vt2-trigger",
              start: "top top",
              end: "+=140%",
              toggleActions: "play pause resume pause",
            },
          });

          const tl3 = gsap.timeline({
            scrollTrigger: {
              trigger: ".mp3-trigger",
              start: "top top",
              end: "+=150%",
              pin: true,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
            defaults: { ease: "none" },
          });

          tl3
            .to(".mp3-kicker", { opacity: 1, y: 0, duration: 0.12, force3D: true }, 0)
            .to(".mp3-title", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.18, force3D: true }, 0.04)
            .to(".mp3-subtitle", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.15, force3D: true }, 0.1)
            .to(".mp3-card1", { x: -22, xPercent: -100, scale: 0.92, duration: 0.32, zIndex: 1, force3D: true }, 0.22)
            .to(".mp3-card2", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.22, zIndex: 2, force3D: true }, 0.3)
            .to(".mp3-card2", { x: 22, xPercent: 0, scale: 0.92, duration: 0.32, force3D: true }, 0.52)
            .to([".mp3-card1", ".mp3-card2"], { filter: "blur(0px)", duration: 0.01, zIndex: "auto" }, 0.86);
        },

        "(max-width: 1023px)": () => {
          const tl2m = gsap.timeline({
            scrollTrigger: {
              trigger: ".vt2-trigger",
              start: "top 75%",
              end: "bottom 35%",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
            defaults: { ease: "power3.out" },
          });

          tl2m
            .to(".vt2-kicker", { opacity: 1, y: 0, duration: 0.35, force3D: true }, 0)
            .to(".vt2-title", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, force3D: true }, 0.08)
            .to(".vt2-para", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, stagger: 0.08, force3D: true }, 0.16)
            .to(".vt2-tags", { opacity: 1, y: 0, duration: 0.25, force3D: true }, 0.28)
            .to(".vt2-video", { scale: 1, opacity: 1, filter: "blur(0px) saturate(1)", duration: 0.45, force3D: true }, 0.1);

          const tl3m = gsap.timeline({
            scrollTrigger: {
              trigger: ".mp3-trigger",
              start: "top 75%",
              invalidateOnRefresh: true,
            },
            defaults: { ease: "power3.out" },
          });

          tl3m
            .to(".mp3-kicker", { opacity: 1, y: 0, duration: 0.45, force3D: true }, 0)
            .to(".mp3-title", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, force3D: true }, 0.08)
            .to(".mp3-subtitle", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, force3D: true }, 0.12)
            .to(".mp3-card1", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, force3D: true }, 0.18)
            .to(".mp3-card2", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, force3D: true }, 0.34);
        },
      });
    }, rootRef);

    scrollCtxRef.current = ctx;

    return () => {
      ctx.revert();
      scrollCtxRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!videomonialRef.current) return;

    if (videomonialCtxRef.current) {
      videomonialCtxRef.current.revert();
      videomonialCtxRef.current = null;
    }

    const ctx = gsap.context(() => {
      const el = videomonialRef.current!;

      gsap.set(el, { clearProps: "all" });
      gsap.set(el.querySelectorAll(".vd-card"), { clearProps: "all" });

      ScrollTrigger.matchMedia({
        "(max-width: 768px)": () => {
          const noMo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

          gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "110% top",
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          })
            .fromTo(el.querySelector(".first-title"), { xPercent: -6, opacity: 0 }, { xPercent: 6, opacity: 1, ease: "none", force3D: true })
            .fromTo(el.querySelector(".sec-title"), { xPercent: -3, opacity: 0 }, { xPercent: 5, opacity: 1, ease: "none", force3D: true }, "<")
            .fromTo(el.querySelector(".third-title"), { xPercent: 5, opacity: 0 }, { xPercent: -5, opacity: 1, ease: "none", force3D: true }, "<");

          if (!noMo) {
            const vc = gsap.utils.toArray<HTMLElement>(el.querySelectorAll(".vd-card"));

            vc.forEach((c, i) => {
              const m = cards[i]?.rotation?.match(/rotate-z-\[(-?\d+)deg\]/);
              gsap.set(c, {
                y: 70,
                scale: 0.92,
                rotation: m ? +m[1] : 0,
                opacity: 0,
                filter: "blur(10px)",
                force3D: true,
                zIndex: i + 1,
              });
            });

            const ct = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: "top top",
                end: `+=${Math.round(80 + vc.length * 25)}%`,
                scrub: 0.8,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                fastScrollEnd: true,
                preventOverlaps: true,
                invalidateOnRefresh: true,
              },
            });

            ct.to(el.querySelector(".pin-box"), { yPercent: 0 }, 0);

            vc.forEach((c, i) => {
              const m = cards[i]?.rotation?.match(/rotate-z-\[(-?\d+)deg\]/);
              const r = m ? +m[1] : 0;
              const t = i * 0.6;

              ct
                .to(c, {
                  y: 0,
                  scale: 1,
                  rotation: r,
                  opacity: 1,
                  filter: "blur(0px)",
                  ease: "power1.out",
                  duration: 0.5,
                  zIndex: vc.length + i,
                  force3D: true,
                }, t)
                .to(c, {
                  y: -80,
                  scale: 0.95,
                  opacity: 0.25,
                  rotation: r,
                  ease: "power1.in",
                  duration: 0.5,
                  zIndex: i,
                  force3D: true,
                }, t + 0.7);
            });
          }
        },

        "(min-width: 769px)": () => {
          gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          })
            .to(el.querySelector(".first-title"), { xPercent: 70, ease: "none", force3D: true })
            .to(el.querySelector(".sec-title"), { xPercent: 25, ease: "none", force3D: true }, "<")
            .to(el.querySelector(".third-title"), { xPercent: -50, ease: "none", force3D: true }, "<");

          const vc = el.querySelectorAll<HTMLElement>(".vd-card");

          vc.forEach((c, i) => {
            const m = cards[i]?.rotation?.match(/rotate-z-\[(-?\d+)deg\]/);
            gsap.set(c, {
              perspective: 1200,
              transformStyle: "preserve-3d",
              rotation: m ? +m[1] : 0,
              transformOrigin: "50% 70%",
              zIndex: i + 1,
              force3D: true,
            });
          });

          gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "10% top",
              end: "200% top",
              scrub: 1.2,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              fastScrollEnd: true,
              preventOverlaps: true,
              invalidateOnRefresh: true,
            },
          }).from(vc, {
            yPercent: 120,
            opacity: 0,
            force3D: true,
            stagger: { each: 0.7, ease: "power1.out" },
          });
        },

        "(prefers-reduced-motion: reduce)": () => {
          const titles = [".first-title", ".sec-title", ".third-title"]
            .map((s) => el.querySelector(s))
            .filter(Boolean);

          gsap.set(titles, { xPercent: 0 });
          gsap.set(el.querySelectorAll(".vd-card"), { clearProps: "all", opacity: 1 });
        },
      });
    }, videomonialRef);

    videomonialCtxRef.current = ctx;

    return () => {
      ctx.revert();
      videomonialCtxRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const imgs = document.querySelectorAll<HTMLElement>(".photo-ei");
    if (!imgs.length) return;

    const expand = (idx: number) => {
      imgs.forEach((img, j) => {
        const isTarget = j === idx;
        gsap.to(img, {
          width: isTarget ? "340px" : "44px",
          duration: 0.72,
          ease: "power3.inOut",
          overwrite: "auto",
        });
        img.classList.toggle("pei-active", isTarget);
        img.classList.toggle("pei-default", !isTarget);
      });
      setActiveImg(idx);
    };

    expandRef.current = expand;
    expand(0);

    let cur = 0;
    const id = setInterval(() => {
      cur = (cur + 1) % imgs.length;
      expand(cur);
    }, 3500);

    return () => {
      clearInterval(id);
      expandRef.current = null;
    };
  }, []);

  const handlePlay = useCallback((i: number) => vdRef.current[i]?.play(), []);
  const handlePause = useCallback((i: number) => vdRef.current[i]?.pause(), []);

  const prevPhoto = useCallback(
    () => setPhotoIdx((p) => (p - 1 + photoImages.length) % photoImages.length),
    []
  );
  const nextPhoto = useCallback(
    () => setPhotoIdx((p) => (p + 1) % photoImages.length),
    []
  );

  // ─── JSX ─────────────────────────────────────────────────────────────────

  return (
    <main ref={rootRef} className="min-h-screen overflow-x-hidden bg-black vt-body">

      {/* ── Fixed background layer ── */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-black overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full blur-[140px] bg-yellow-500/8 animate-sp1" />
        <div className="absolute -bottom-48 -right-48 w-[580px] h-[580px] rounded-full blur-[160px] bg-amber-600/10 animate-sp2" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#1e293b 1px,transparent 1px),linear-gradient(90deg,#1e293b 1px,transparent 1px)", backgroundSize: "56px 56px" }}
        />
        {bubbles.map((b) => (
          <span
            key={b.id}
            className="bg-bubble"
            style={{
              left: b.left, width: b.size, height: b.size,
              opacity: b.opacity, filter: `blur(${b.blur})`,
              ["--drift" as string]: b.drift,
              ["--dur" as string]: b.dur,
              ["--delay" as string]: b.delay,
            }}
          />
        ))}
        {stars.map((s) => (
          <span
            key={s.id}
            className="bg-star"
            style={{
              left: s.left, width: s.size, height: s.size, opacity: s.opacity,
              ["--drift" as string]: s.drift,
              ["--dur" as string]: s.dur,
              ["--delay" as string]: s.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">

        {/* ══ 1. HERO CAROUSEL ══════════════════════════════════════════════ */}
        {/*
          CHANGES:
          - Mobile: reduced pt from pt-0 to a tighter value; header text margin adjusted.
          - Desktop: unchanged (pt-24 kept via md:pt-24).
        */}

        <section className="relative overflow-hidden pt-12 md:pt-32 pb-8 md:pb-4 bg-black">
          <div className="absolute inset-0 pointer-events-none">
            {services.map((s, i) => (
              <video
                key={i}
                ref={(el) => (bgVideoRefs.current[i] = el)}
                src={s.video}
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                style={{ opacity: center === i ? 0.18 : 0, zIndex: center === i ? 1 : 0, willChange: "opacity" }}
              />
            ))}
          </div>

          {/*
            MOBILE FIX: Use padding-top on mobile to push content below the fixed navbar.
            Navbar is ~72px tall on mobile, so pt-24 (96px) gives a comfortable clearance.
            On desktop (md+): margin-top:100px via .hero-title-wrap CSS rule.
          */}
          <div className="relative z-10 container mx-auto px-5 text-center mb-2 md:mb-4 hero-title-wrap">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-3 vt-heading">
              <span className="gold-text">Real Estate</span>{" "}
              <span className="text-white">Services</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-300/75 max-w-xl mx-auto px-4 vt-body">
              Step into the future of real estate with immersive 360° property tours and premium visual storytelling
            </p>
          </div>

          {/* ── Desktop 3D carousel (UNCHANGED) ── */}
          <div className="hidden md:block relative z-10 -mt-4 md:-mt-8">
            <div className="relative w-full h-[480px] lg:h-[580px]" style={{ perspective: "1500px" }}>
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                {services.map((s, i) => (
                  <a
                    key={i}
                    href={s.link}
                    className="circular-card absolute group"
                    style={{ transformStyle: "preserve-3d", willChange: "transform, opacity, filter" }}
                  >
                    <div
                      className="card-content relative overflow-hidden rounded-2xl border-2 border-[#d4af37]/30 w-[160px] h-[160px] lg:w-[190px] lg:h-[190px]"
                      style={{ background: "rgba(0,0,0,0.9)" }}
                    >
                      <img
                        src={s.image}
                        alt={s.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />
                      <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/80 to-transparent" />
                      <div
                        className="center-glow absolute inset-0 rounded-2xl pointer-events-none opacity-0"
                        style={{ boxShadow: "inset 0 0 20px rgba(212,175,55,0.5),0 0 25px rgba(212,175,55,0.4)" }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                        <h2 className="text-sm font-bold mb-0.5 vt-heading"><span className="gold-text">{s.title}</span></h2>
                        <div className="h-px w-8 mx-auto mb-1 bg-gradient-to-r from-transparent via-[#d4af37]/65 to-transparent" />
                        <p className="text-[9px] text-white line-clamp-2 leading-snug vt-body">{s.description}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <button
                onClick={() => setRot((p) => ({ ...p, d: p.d + (360 / services.length) }))}
                className="absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center border border-[#d4af37]/40 bg-black/80 text-[#d4af37] hover:border-[#d4af37] hover:bg-[#d4af37]/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transition-all duration-300"
                style={{ left: "calc(40% - 95px - 12px - 44px)" }}
                aria-label="Previous service"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => setRot((p) => ({ ...p, d: p.d - (360 / services.length) }))}
                className="absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center border border-[#d4af37]/40 bg-black/80 text-[#d4af37] hover:border-[#d4af37] hover:bg-[#d4af37]/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transition-all duration-300"
                style={{ left: "calc(60% + 95px + 12px)" }}
                aria-label="Next service"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Mobile carousel (REFINED: removed pt-30, tightened spacing) ── */}
          <div className="md:hidden relative z-10 flex flex-col items-center pt-4">
            <div className="relative h-[300px] w-full flex items-center justify-center">
              <div className="relative" style={{ transformStyle: "preserve-3d", width: "280px", height: "280px" }}>
                {services.map((s, i) => (
                  <div
                    key={i}
                    className="mobile-circular-card absolute"
                    style={{ transformStyle: "preserve-3d", left: "50%", top: "50%", marginLeft: "-80px", marginTop: "-110px", willChange: "transform, opacity, filter" }}
                  >
                    <a href={s.link} className="block">
                      <div
                        className="relative overflow-hidden rounded-2xl border-2 border-[#d4af37]/30 w-[160px] h-[220px]"
                        style={{ background: "rgba(0,0,0,0.93)" }}
                      >
                        <img className="absolute inset-0 w-full h-full object-cover" src={s.image} alt={s.title} loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/38 to-black/8" />
                        <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-black/78 to-transparent" />
                        <div
                          className="mobile-center-glow absolute inset-0 rounded-2xl pointer-events-none opacity-0"
                          style={{ boxShadow: "inset 0 0 18px rgba(212,175,55,0.5),0 0 22px rgba(212,175,55,0.4)" }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-3.5 text-center">
                          <h2 className="text-sm font-bold mb-1 vt-heading"><span className="gold-text">{s.title}</span></h2>
                          <div className="h-px w-9 mx-auto mb-1.5 bg-gradient-to-r from-transparent via-[#d4af37]/65 to-transparent" />
                          <p className="text-[10px] text-white line-clamp-2 leading-snug px-1 vt-body">{s.description}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 mt-2 pb-4">
              <button
                onClick={() => setRot((p) => ({ ...p, m: p.m + (360 / services.length) }))}
                className="w-11 h-11 rounded-full flex items-center justify-center border border-[#d4af37]/40 bg-black/80 text-[#d4af37] active:bg-[#d4af37]/15 active:border-[#d4af37] transition-all duration-200"
                style={{ boxShadow: "0 0 14px rgba(212,175,55,0.2)" }}
                aria-label="Previous service"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setRot((p) => ({ ...p, m: p.m - (360 / services.length) }))}
                className="w-11 h-11 rounded-full flex items-center justify-center border border-[#d4af37]/40 bg-black/80 text-[#d4af37] active:bg-[#d4af37]/15 active:border-[#d4af37] transition-all duration-200"
                style={{ boxShadow: "0 0 14px rgba(212,175,55,0.2)" }}
                aria-label="Next service"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* ══ 3. REAL ESTATE INFO ═══════════════════════════════════════════ */}
        <section className="relative bg-black py-10 md:py-15">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 vt-heading">
                Understanding <span className="gold-text">Real Estate</span>
              </h2>
              <p className="text-sm md:text-base text-slate-400 max-w-md mx-auto vt-body">
                The foundation of modern property investment and development
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
              <div
                className="relative rounded-2xl border border-[#d4af37]/16 p-6 md:p-8"
                style={{ background: "linear-gradient(135deg,rgba(0,0,0,0.93),rgba(10,10,10,0.97))", boxShadow: "0 20px 60px rgba(0,0,0,0.45)" }}
              >
                <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-[#d4af37]/32" />
                <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-[#d4af37]/32" />
                <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-[#d4af37]/32" />
                <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-[#d4af37]/32" />
                <blockquote className="text-sm md:text-lg text-white/80 leading-relaxed font-light italic mb-5 vt-body">
                  <span className="gold-text font-semibold vt-heading">Real Estate</span> refers to property consisting of land, buildings, and natural resources encompassing residential, commercial, industrial, and agricultural properties.
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="h-px flex-grow bg-gradient-to-r from-[#d4af37]/32 to-transparent" />
                  <p className="text-xs text-[#d4af37]/60 italic vt-body">Where people live, work, and invest.</p>
                </div>
              </div>
              <div className="space-y-4 md:space-y-5">
                <h3 className="text-lg md:text-2xl font-bold text-white vt-heading">
                  The Power of a <span className="gold-text">Digital Platform</span>
                </h3>
                <p className="text-sm md:text-base text-slate-300/85 leading-relaxed vt-body">
                  A well-developed real estate platform provides a seamless connection between buyers, sellers, and agents a trustworthy hub for property listings, market trends, and informed decisions.
                </p>
                <p className="text-sm md:text-base text-slate-300/80 leading-relaxed border-l-4 border-[#d4af37]/42 pl-4 py-1 vt-body">
                  A professional website builds credibility and ensures easy access to valuable information, making property transactions smooth and efficient.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 4. PREMIUM SERVICES GRID ══════════════════════════════════════ */}
        <section className="relative bg-black py-2 md:py-2">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 vt-heading">
                <span className="gold-text">Premium Real Estate</span>{" "}
                <span className="text-white">Marketing Services</span>
              </h2>
              <p className="text-sm md:text-base text-slate-300/78 max-w-2xl mx-auto px-4 vt-body">
                Comprehensive digital solutions for real estate professionals
              </p>
              <div className="flex items-center justify-center gap-3 mt-5">
                <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-white/38" />
                <div className="w-2 h-2 rotate-45 bg-white/60" />
                <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-white/38" />
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 max-w-5xl mx-auto">
              {premiumServices.map((s, i) => (
                <ServiceCard key={i} service={s} index={i} animatedIdx={animCard} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ 5. 360° TOUR INFO ════════════════════════════════════════════ */}
        <div className="vt2-trigger relative" style={{ minHeight: "10vh", display: "flex", alignItems: "center", marginTop: "100px" }}>
          <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-stretch justify-center gap-5 md:gap-8 lg:gap-12" style={{ marginTop: "100px" }}>
                <div className="vt2-left w-full md:flex-1 md:min-w-0 md:[max-width:52%]">
                  <div
                    className="vt2-videoCard relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
                    style={{ height: "clamp(220px, 56vw, 560px)", willChange: "transform" }}
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-xl md:rounded-2xl lg:rounded-3xl ring-1 ring-cyan-400/15 z-10" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 z-10" />
                    <video
                      className="vt2-video w-full h-full object-cover"
                      style={{ willChange: "transform, opacity, filter" }}
                      src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/360%20min%20virtual%20tour%20(1).mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.35)_74%,rgba(0,0,0,0.62)_100%)] z-10" />
                    <div className="pointer-events-none absolute -bottom-16 left-1/2 h-32 w-[60%] -translate-x-1/2 rounded-full bg-cyan-400/12 blur-[50px] z-0" />
                  </div>
                </div>

                <div className="vt2-right w-full md:flex-1 md:min-w-0 md:[max-width:48%]">
                  <div
                    className="vt2-glass relative overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.45)] px-5 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12"
                    style={{ minHeight: "clamp(260px, 45vw, 560px)", display: "flex", flexDirection: "column", justifyContent: "center", willChange: "transform, opacity" }}
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-xl md:rounded-2xl lg:rounded-3xl ring-1 ring-white/10" />
                    <div className="pointer-events-none absolute -inset-16 bg-[conic-gradient(from_220deg,rgba(34,211,238,0.12),transparent_25%,transparent_65%,rgba(59,130,246,0.10))] opacity-60" />
                    <div className="relative z-10 space-y-3 md:space-y-5">
                      <p className="vt2-kicker text-blue-400/90 tracking-[0.15em] text-[10px] sm:text-xs md:text-sm font-semibold uppercase vt-body" style={{ willChange: "transform, opacity" }}>Do You Know</p>
                      <h2 className="vt2-title text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight vt-heading" style={{ willChange: "transform, opacity, filter" }}>
                        What is <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">360°</span> Virtual Tour?
                      </h2>
                      <div className="flex items-center gap-3">
                        <div className="h-px w-8 md:w-14 bg-gradient-to-r from-transparent to-cyan-400/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                        <div className="h-px w-8 md:w-14 bg-gradient-to-l from-transparent to-cyan-400/50" />
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        <p className="vt2-para text-slate-200/85 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed vt-body" style={{ willChange: "transform, opacity" }}>
                          A 360° virtual tour is an immersive experience that lets users explore a space as if they were physically present looking around in all directions and moving between areas seamlessly.
                        </p>
                        <p className="vt2-para text-slate-200/80 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed vt-body" style={{ willChange: "transform, opacity" }}>
                          Unlike normal photos or videos, it's interactive. With panoramic capture + tour software, viewers can explore every angle from the comfort of their device.
                        </p>
                      </div>
                      <div className="vt2-tags flex flex-wrap gap-1.5 md:gap-2 pt-1" style={{ willChange: "transform, opacity" }}>
                        <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.06] text-cyan-100 text-[10px] sm:text-xs md:text-sm vt-body">360° View</span>
                        <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.06] text-cyan-100 text-[10px] sm:text-xs md:text-sm vt-body">Interactive</span>
                        <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.06] text-cyan-100 text-[10px] sm:text-xs md:text-sm whitespace-nowrap vt-body">Seamless Navigation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ 6. MATTERPORT 360° TOURS ══════════════════════════════════════ */}
        <div className="mp3-trigger" style={{ marginTop: 0, paddingTop: 0 }}>
          <div className="min-h-[10vh] md:min-h-screen flex flex-col justify-center py-0 mt-0">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8 md:mb-12">
                <h2
                  className="mp3-title text-2xl sm:text-3xl md:text-3xl font-extrabold mb-3 vt-heading"
                  style={{ background: "linear-gradient(135deg,#fff 0%,#d4af37 30%,#f4e5b8 50%,#d4af37 70%,#fff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", willChange: "transform, opacity, filter", marginTop: "100px" }}
                >
                  Our 360° Virtual Tours
                </h2>
                <p className="mp3-subtitle text-sm md:text-lg text-slate-300/78 max-w-2xl mx-auto px-4 vt-body" style={{ willChange: "transform, opacity" }}>
                  Immersive remote property exploration walk through spaces from anywhere
                </p>
              </div>

              {/* Mobile */}
              <div className="flex flex-col gap-4 md:hidden">
                {matterportTours.map(({ m, title }) => (
                  <div
                    key={m}
                    className="rounded-2xl overflow-hidden border border-[#d4af37]/18"
                    style={{ background: "rgba(5,5,5,0.9)", backdropFilter: "blur(8px)" }}
                  >
                    <div className="px-4 py-3 border-b border-white/6 flex items-center gap-2">
                      <span className="text-blue-400/65 text-[10px] font-semibold uppercase tracking-wider vt-body">Real Estate</span>
                      <span className="text-white/20">·</span>
                      <h3 className="text-sm font-semibold gold-text vt-heading">{title}</h3>
                    </div>
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full"
                        src={`https://my.matterport.com/show/?m=${m}`}
                        title={title}
                        frameBorder="0"
                        allow="xr-spatial-tracking; fullscreen"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop */}
              <div className="hidden md:block mp3-stage relative max-w-5xl mx-auto">
                <div className="relative mp3-viewport h-[420px] lg:h-[480px]">
                  {matterportTours.map(({ cls, m, title }) => (
                    <article
                      key={m}
                      className={`mp3-card ${cls} absolute top-1/2 left-1/2 w-[64%] lg:w-[56%] -translate-y-1/2`}
                      style={{ willChange: "transform, opacity, filter", zIndex: cls === "mp3-card1" ? 2 : 1 }}
                    >
                      <div
                        className="rounded-2xl overflow-hidden border border-[#d4af37]/18"
                        style={{ background: "rgba(5,5,5,0.75)", backdropFilter: "blur(8px)" }}
                      >
                        <div className="px-5 py-4 border-b border-white/6">
                          <p className="text-blue-400/60 text-xs font-semibold uppercase tracking-wider mb-1 vt-body">Real Estate</p>
                          <h3 className="text-xl md:text-2xl font-semibold gold-text vt-heading">{title}</h3>
                        </div>
                        <div className="aspect-video">
                          <iframe
                            className="w-full h-full"
                            src={`https://my.matterport.com/show/?m=${m}`}
                            title={title}
                            frameBorder="0"
                            allow="xr-spatial-tracking; fullscreen"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ 7. LEAD GENERATION ════════════════════════════════════════════ */}
        {/*
          CHANGE: Added mt-12 md:mt-16 to give the section a clear top margin.
          py-1 md:py-1 kept as before (bottom spacing unchanged).
        */}
        <section className="relative bg-black mt-12 md:mt-16 py-1 md:py-1">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-14">
              <h2
                className="text-2xl md:text-3xl font-extrabold mb-3 vt-heading"
                style={{ background: "linear-gradient(135deg,#fff 0%,#d4af37 25%,#f4e5b8 50%,#d4af37 75%,#fff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                Lead Generation Services
              </h2>
              <p className="text-sm md:text-lg text-white/75 max-w-xl mx-auto px-4 vt-body">
                Fuel your business growth with targeted lead generation
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto mb-10">
              {leadServices.map((s, i) => (
                <div
                  key={i}
                  className="lead-card group relative overflow-hidden rounded-2xl border-2 p-5 flex flex-col"
                  style={{ background: "linear-gradient(135deg,rgba(0,0,0,0.93),rgba(10,10,10,0.88))", borderColor: "rgba(212,175,55,0.24)" }}
                >
                  <h3 className="text-sm md:text-base font-bold mb-2 vt-heading"><span className="gold-text">{s.title}</span></h3>
                  <p className="text-white/68 text-xs md:text-sm leading-relaxed flex-grow vt-body">{s.content}</p>
                  <div className={`absolute bottom-0 left-0 h-[3px] bg-gradient-to-r ${s.color} w-0 group-hover:w-full transition-all duration-500 rounded-b-xl`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 8. VIDEOMONIAL ════════════════════════════════════════════════ */}
        <section
          id="real-estate"
          ref={videomonialRef}
          className="testimonials-section relative isolation-isolate bg-black py-0"
        >
          <div className="testimonials-title-wrapper absolute inset-0 flex flex-col items-center justify-center pt-0 pointer-events-none">
            <div className="flex flex-col gap-4 items-center w-full">
              <h2 className="first-title ts-h1 uppercase text-[15vw] md:text-[18.5vw] leading-[105%] tracking-[-.2vw] font-bold vt-heading" style={{ willChange: "transform, opacity" }}>EXPLORE</h2>
              <h2 className="sec-title ts-h1 uppercase text-[15vw] md:text-[18.5vw] leading-[105%] tracking-[-.2vw] font-bold text-white vt-heading" style={{ willChange: "transform, opacity" }}>EVERY</h2>
              <h2 className="third-title ts-h1 uppercase text-[15vw] md:text-[18.5vw] leading-[105%] tracking-[-.2vw] font-bold vt-heading" style={{ willChange: "transform, opacity" }}>CORNER</h2>
            </div>
          </div>
          <div className="pin-box absolute w-full flex items-center justify-center">
            {cards.map((card, i) => (
              <div
                key={i}
                className={`vd-card ${card.rotation} ${card.translation || ""}`}
                style={{ willChange: "transform, opacity, filter" }}
                onMouseEnter={() => handlePlay(i)}
                onMouseLeave={() => handlePause(i)}
              >
                <video
                  ref={(el) => (vdRef.current[i] = el)}
                  src={card.src}
                  playsInline
                  muted
                  loop
                  autoPlay
                  preload="auto"
                  className="size-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ══ 9. PHOTOGRAPHY SHOWCASE ═══════════════════════════════════════ */}
        <section className="relative bg-black py-2 md:py-2">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2
                className="text-2xl md:text-4xl font-bold text-white mb-3 vt-heading"
                style={{ background: "linear-gradient(135deg,#fff 0%,#d4af37 25%,#f4e5b8 50%,#d4af37 75%,#fff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", paddingBottom: "0.15em" }}
              >
                Professional Photography
              </h2>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent via-[#d4af37]/52 to-[#d4af37]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                <div className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent via-[#d4af37]/52 to-[#d4af37]" />
              </div>
              <p className="text-sm md:text-base text-white/72 max-w-xl mx-auto px-4 vt-body">
                <span className="gold-text font-semibold vt-heading">Capturing moments that define brands.</span>{" "}
                Every frame tells a story.
              </p>
            </div>

            {/* Desktop accordion */}
            <div className="hidden md:flex flex-col items-center" style={{ marginBottom: 100 }}>
              <div className="flex items-center justify-center gap-2 h-[250px] lg:h-[300px] w-full max-w-5xl mx-auto">
                {photoImages.map((src, i) => (
                  <div
                    key={i}
                    onClick={() => expandRef.current?.(i)}
                    className="photo-ei pei-default relative group rounded-xl overflow-hidden h-full cursor-pointer border border-[#d4af37]/10"
                    style={{ willChange: "width" }}
                  >
                    <img
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={src}
                      alt={`Photography ${i + 1}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-black/10 to-transparent transition-opacity duration-500" />
                    {i === activeImg && (
                      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#d4af37] animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-5">
                {photoImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => expandRef.current?.(i)}
                    className={`rounded-full transition-all duration-300 h-2 ${i === activeImg ? "bg-[#d4af37] w-5" : "bg-white/30 w-2 hover:bg-white/50"}`}
                    aria-label={`Photo ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Mobile 3D carousel */}
            <div
              className="md:hidden select-none pb-6"
              onTouchStart={(e) => { photoTouchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                if (photoTouchStartX.current === null) return;
                const dx = e.changedTouches[0].clientX - photoTouchStartX.current;
                if (Math.abs(dx) > 40) dx < 0 ? nextPhoto() : prevPhoto();
                photoTouchStartX.current = null;
              }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{ height: "380px", perspective: "1200px", perspectiveOrigin: "50% 50%", overflow: "visible" }}
              >
                {photoImages.map((src, i) => {
                  const total = photoImages.length;
                  let diff = ((i - photoIdx) % total + total) % total;
                  if (diff > Math.floor(total / 2)) diff -= total;
                  if (Math.abs(diff) > 2) return null;
                  const cfg: Record<number, { tx: string; tz: string; ry: string; scale: number; opacity: number; z: number }> = {
                    [-2]: { tx: "-260px", tz: "-140px", ry: "42deg", scale: 0.58, opacity: 0, z: 1 },
                    [-1]: { tx: "-168px", tz: "-68px", ry: "26deg", scale: 0.82, opacity: 0.65, z: 5 },
                    [0]: { tx: "0px", tz: "0px", ry: "0deg", scale: 1.10, opacity: 1, z: 10 },
                    [1]: { tx: "168px", tz: "-68px", ry: "-26deg", scale: 0.82, opacity: 0.65, z: 5 },
                    [2]: { tx: "260px", tz: "-140px", ry: "-42deg", scale: 0.58, opacity: 0, z: 1 },
                  };
                  const c = cfg[diff];
                  return (
                    <div
                      key={i}
                      className="absolute"
                      onClick={() => diff !== 0 && setPhotoIdx(i)}
                      style={{
                        transform: `translateX(${c.tx}) translateZ(${c.tz}) rotateY(${c.ry}) scale(${c.scale})`,
                        opacity: c.opacity,
                        zIndex: c.z,
                        transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.55s ease",
                        transformStyle: "preserve-3d",
                        cursor: diff !== 0 ? "pointer" : "default",
                        willChange: "transform, opacity",
                      }}
                    >
                      <div
                        className="relative overflow-hidden rounded-2xl w-[172px] h-[240px]"
                        style={{
                          border: diff === 0 ? "2px solid rgba(212,175,55,0.65)" : "1.5px solid rgba(212,175,55,0.18)",
                          boxShadow: diff === 0 ? "0 0 28px rgba(212,175,55,0.28), 0 8px 28px rgba(0,0,0,0.7)" : "0 4px 14px rgba(0,0,0,0.55)",
                          background: "#0a0a0a",
                        }}
                      >
                        <img
                          src={src}
                          alt={`Photography ${i + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ filter: diff === 0 ? "brightness(1.06) saturate(1.08)" : "brightness(0.5) saturate(0.72)", transition: "filter 0.55s ease" }}
                          loading={Math.abs(diff) <= 1 ? "eager" : "lazy"}
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent pointer-events-none" />
                        {diff === 0 && <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: "inset 0 0 24px rgba(212,175,55,0.22)" }} />}
                        {diff === 0 && (
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/65 backdrop-blur-sm rounded-full px-2.5 py-1 border border-[#d4af37]/35">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                            <span className="text-[10px] font-bold tracking-wider vt-body">
                              <span className="text-[#d4af37]">{String(photoIdx + 1).padStart(2, "0")}</span>
                              <span className="text-white/40">/{String(photoImages.length).padStart(2, "0")}</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mx-10 mt-5 mb-3 h-[3px] rounded-full overflow-hidden bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#f4e5b8]"
                  style={{ width: `${((photoIdx + 1) / photoImages.length) * 100}%`, transition: "width 0.55s cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 0 8px rgba(212,175,55,0.65)" }}
                />
              </div>
              <div className="flex items-center justify-center gap-5 mt-2">
                <button
                  onClick={prevPhoto}
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-[#d4af37]/40 bg-black/80 text-[#d4af37] active:scale-90 transition-transform duration-150"
                  style={{ boxShadow: "0 0 14px rgba(212,175,55,0.22)" }}
                  aria-label="Previous photo"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="flex items-center gap-[7px]">
                  {(() => {
                    const total = photoImages.length;
                    const half = 3;
                    let start = photoIdx - half;
                    let end = photoIdx + half;
                    if (start < 0) { end = Math.min(total - 1, end - start); start = 0; }
                    if (end >= total) { start = Math.max(0, start - (end - total + 1)); end = total - 1; }
                    return Array.from({ length: end - start + 1 }, (_, k) => {
                      const idx = start + k;
                      const isActive = idx === photoIdx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setPhotoIdx(idx)}
                          className="rounded-full transition-all duration-300"
                          style={{ width: isActive ? "20px" : "7px", height: "7px", background: isActive ? "linear-gradient(90deg,#d4af37,#f4e5b8)" : "rgba(255,255,255,0.28)", boxShadow: isActive ? "0 0 7px rgba(212,175,55,0.65)" : "none" }}
                          aria-label={`Photo ${idx + 1}`}
                        />
                      );
                    });
                  })()}
                </div>
                <button
                  onClick={nextPhoto}
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-[#d4af37]/40 bg-black/80 text-[#d4af37] active:scale-90 transition-transform duration-150"
                  style={{ boxShadow: "0 0 14px rgba(212,175,55,0.22)" }}
                  aria-label="Next photo"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        <ContactUsForm />

      </div>

      <style>{`
        /* ── FONTS ── */

        /*
          vt-heading  → Libre Baskerville (all headings, gold labels, section titles)
          vt-body     → Inter (paragraphs, descriptions, tags, captions)
          Applied via utility classes so specificity is predictable.
        */
        .vt-heading,
        h1.vt-heading, h2.vt-heading, h3.vt-heading,
        h4.vt-heading, h5.vt-heading, h6.vt-heading {
          font-family: 'Libre Baskerville', Georgia, serif !important;
        }

        .vt-body,
        p.vt-body, span.vt-body, div.vt-body,
        a.vt-body, button.vt-body, li.vt-body {
          font-family: 'Inter', system-ui, sans-serif !important;
        }

        /* Fallback for any un-classed elements */
        body { font-family: 'Inter', system-ui, sans-serif; }

        /* ── GOLD TEXT ── */
        .gold-text {
          background: linear-gradient(90deg, #d4af37, #f4e5b8, #d4af37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── HERO: navbar clearance fix ──
           The navbar is fixed/sticky ~72px tall on mobile.
           padding-top pushes the title below the navbar on mobile.
           On desktop (md+) the original 100px margin-top is restored.
        */
        @media (max-width: 767px) {
          .hero-title-wrap {
            margin-top: 0 !important;
            padding-top: 120px !important; /* increased for better clearance */
          }
        }
        @media (min-width: 768px) {
          .hero-title-wrap {
            margin-top: 140px !important; /* increased a little more as requested */
            padding-top: 0 !important;
          }
        }

        /* ── ACCORDION ── */
        .pei-default {
          filter: brightness(0.62);
          border: 1px solid rgba(212,175,55,0.10);
          box-shadow: none;
        }
        .pei-active {
          z-index: 10;
          filter: brightness(1);
          border: 2px solid rgba(212,175,55,0.45);
          box-shadow: 0 14px 45px rgba(212,175,55,0.28);
        }

        /* ── LEAD CARDS ── */
        .lead-card {
          min-height: 190px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          will-change: transform;
        }
        .lead-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 44px rgba(212,175,55,0.24);
        }

        /* ── CAROUSEL ── */
        .circular-card,
        .mobile-circular-card {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          will-change: transform, opacity, filter;
        }

        /* ── VIDEO CARDS ── */
        .vd-card {
          isolation: isolate;
          will-change: transform, opacity, filter;
        }

        /* ── SCROLL SECTIONS ── */
        .vt2-trigger {
          background-color: #000 !important;
          isolation: isolate;
          position: relative;
          z-index: 2;
        }
        .mp3-trigger {
          background-color: #000 !important;
          isolation: isolate;
          position: relative;
          z-index: 2;
        }

        /* ── MP3 CARDS ── */
        .mp3-card {
          will-change: transform, opacity, filter;
          isolation: isolate;
        }
        .mp3-card1 { z-index: 2; }
        .mp3-card2 { z-index: 1; }

        /* ── MOBILE REFINEMENTS ── */
        @media (max-width: 767px) {
          .container { padding-left: 1rem; padding-right: 1rem; }
          .lead-card { min-height: 170px; }
        }

        /* ── REDUCED MOTION ── */
        @media (prefers-reduced-motion: reduce) {
          .bg-bubble,
          .bg-star,
          .animate-sp1,
          .animate-sp2,
          .animate-pulse-ring,
          .photo-ei {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
};

export default Virtualtour;
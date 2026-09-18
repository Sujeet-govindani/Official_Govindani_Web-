// components/ui/NgoVideomonial.tsx - Reduced text + styled card outlines
"use client";

import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { cardsngo } from "@/components/ConstantNgo"; // ✅ NGO-specific constants
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGsapManager } from "@/hooks/useScrollManager";

gsap.registerPlugin(ScrollTrigger);

const computePinType = (): "fixed" | "transform" => {
  if (typeof window === "undefined") return "fixed";
  const docEl = document.documentElement;
  const style = getComputedStyle(docEl);
  return style.transform !== "none" || style.webkitTransform !== "none"
    ? "transform"
    : "fixed";
};

// ✅ Calculate horizontal offset per card index
const getCardOffsetX = (index: number, total: number, gap = 220): number => {
  const centerIndex = (total - 1) / 2;
  return (index - centerIndex) * gap;
};

const NgoVideomonial = () => {
  const vdRef = useRef<HTMLVideoElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isRefreshingRef = useRef(false);
  const isInitializedRef = useRef(false);

  const {
    registerTrigger,
    unregisterTrigger,
    clearAllTriggers,
    refreshAll,
  } = useGsapManager();

  const { pathname } = useLocation();

  useEffect(() => {
    return () => {
      clearAllTriggers();
      if (sectionRef.current) {
        gsap.set(sectionRef.current, { clearProps: "all" });
      }
      isInitializedRef.current = false;
    };
  }, [clearAllTriggers]);

  const debouncedRefresh = useCallback(() => {
    if (isRefreshingRef.current) return;
    isRefreshingRef.current = true;
    const timeoutId = setTimeout(() => {
      refreshAll();
      isRefreshingRef.current = false;
    }, 150);
    return () => clearTimeout(timeoutId);
  }, [refreshAll]);

  useEffect(() => {
    const cleanup = debouncedRefresh();
    return () => cleanup?.();
  }, [pathname, debouncedRefresh]);

  useEffect(() => {
    const vids = vdRef.current.filter(Boolean);
    if (!vids.length) return;

    let loaded = 0;
    const cleanupFns: (() => void)[] = [];

    const onMeta = () => {
      loaded += 1;
      if (loaded === vids.length && !isRefreshingRef.current) {
        setTimeout(() => refreshAll(), 150);
      }
    };

    vids.forEach((v) => {
      if (v.readyState >= 1) {
        onMeta();
      } else {
        v.addEventListener("loadedmetadata", onMeta, { once: true });
        cleanupFns.push(() => v.removeEventListener("loadedmetadata", onMeta));
      }
    });

    return () => cleanupFns.forEach((fn) => fn());
  }, [refreshAll]);

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      isInitializedRef.current = true;

      gsap.set(el, {
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
      });

      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        limitCallbacks: true,
      });

      gsap.set(el, {
        marginTop: "0",
        paddingTop: "3rem",
        paddingBottom: "4rem",
        backgroundColor: "#000000",
        position: "relative",
        zIndex: 10,
      });

      ScrollTrigger.matchMedia({

        // ─── MOBILE ──────────────────────────────────────────────────
        "(max-width: 768px)": () => {
          const prefersReduced =
            window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

          const titleTl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id: "ngo-videomonial-title-mobile",
              trigger: el,
              start: "top 85%",
              end: "110% top",
              scrub: true,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
              preventOverlaps: true,
              onEnter: () => {
                const trigger = titleTl.scrollTrigger;
                if (trigger) registerTrigger("ngo-videomonial-title-mobile", trigger);
              },
              onEnterBack: () => {
                const trigger = titleTl.scrollTrigger;
                if (trigger) registerTrigger("ngo-videomonial-title-mobile", trigger);
              },
            },
          });

          titleTl
            .fromTo(el.querySelector(".first-title"), { xPercent: -6, autoAlpha: 0 }, { xPercent: 6, autoAlpha: 1 })
            .fromTo(el.querySelector(".sec-title"),   { xPercent: -3, autoAlpha: 0 }, { xPercent: 5, autoAlpha: 1 }, "<")
            .fromTo(el.querySelector(".third-title"), { xPercent: 5,  autoAlpha: 0 }, { xPercent: -5, autoAlpha: 1 }, "<");

          const vdCards = gsap.utils.toArray(el.querySelectorAll(".vd-card"));
          const stepsPerCard = 0.8;

          if (!prefersReduced && vdCards.length) {
            vdCards.forEach((cardElement: any, i) => {
              const card = cardsngo[i];
              let baseRot = 0;
              if (card.rotation) {
                const match = card.rotation.match(/rotate-z-\[(-?\d+)deg\]/);
                if (match) baseRot = parseInt(match[1]);
              }
              gsap.set(cardElement, {
                y: 70, scale: 0.92, rotation: baseRot,
                autoAlpha: 0, filter: "blur(10px)",
                transformOrigin: "50% 50%", force3D: true,
              });
            });

            const pinTl = gsap.timeline({
              scrollTrigger: {
                id: "ngo-videomonial-cards-mobile",
                trigger: el,
                start: "top top",
                end: `+=${Math.round(90 + vdCards.length * 25)}%`,
                scrub: 1, pin: true, pinSpacing: true, pinType: "transform",
                anticipatePin: 1, invalidateOnRefresh: true,
                fastScrollEnd: true, preventOverlaps: true,
                onEnter: () => {
                  const trigger = pinTl.scrollTrigger;
                  if (trigger) registerTrigger("ngo-videomonial-cards-mobile", trigger);
                },
                onEnterBack: () => {
                  const trigger = pinTl.scrollTrigger;
                  if (trigger) registerTrigger("ngo-videomonial-cards-mobile", trigger);
                },
              },
            });

            pinTl.to(el.querySelector(".pin-box"), { yPercent: 0 }, 0);

            vdCards.forEach((cardElement: any, i) => {
              const card = cardsngo[i];
              let baseRot = 0;
              if (card.rotation) {
                const match = card.rotation.match(/rotate-z-\[(-?\d+)deg\]/);
                if (match) baseRot = parseInt(match[1]);
              }
              const t = i * stepsPerCard;

              pinTl
                .fromTo(cardElement,
                  { y: 70, scale: 0.92, rotation: baseRot, autoAlpha: 0, filter: "blur(10px)" },
                  { y: 0, scale: 1, rotation: baseRot, autoAlpha: 1, filter: "blur(0px)", ease: "power1.out", duration: 0.45 },
                  t
                )
                .to(cardElement, { y: 0, scale: 1, autoAlpha: 1, rotation: baseRot, duration: 0.15, ease: "none" }, t + 0.45)
                .to(cardElement, { y: -80, scale: 0.95, autoAlpha: 0.25, rotation: baseRot, ease: "power1.inOut", duration: 0.5 }, t + 0.6);
            });
          }
        },

        // ─── DESKTOP ─────────────────────────────────────────────────
        "(min-width: 769px)": () => {
          gsap.set(el, {
            marginTop: "0",
            backgroundColor: "#000000",
            position: "relative",
            zIndex: 10,
          });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id: "ngo-videomonial-title-desktop",
              trigger: el,
              start: "top 80%",
              end: "bottom 20%",
              scrub: true,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
              preventOverlaps: true,
              onEnter: () => {
                const trigger = tl.scrollTrigger;
                if (trigger) registerTrigger("ngo-videomonial-title-desktop", trigger);
              },
              onEnterBack: () => {
                const trigger = tl.scrollTrigger;
                if (trigger) registerTrigger("ngo-videomonial-title-desktop", trigger);
              },
            },
          });

          tl.to(el.querySelector(".first-title"), { xPercent: 70 })
            .to(el.querySelector(".sec-title"),   { xPercent: 25 }, "<")
            .to(el.querySelector(".third-title"), { xPercent: -50 }, "<");

          const pinTl = gsap.timeline({
            scrollTrigger: {
              id: "ngo-videomonial-cards-desktop",
              trigger: el,
              start: "20% top",
              end: "200% top",
              scrub: 1.5, pin: true, pinSpacing: true,
              pinType: computePinType(),
              invalidateOnRefresh: true, anticipatePin: 1,
              fastScrollEnd: true, preventOverlaps: true,
              onEnter: () => {
                const trigger = pinTl.scrollTrigger;
                if (trigger) registerTrigger("ngo-videomonial-cards-desktop", trigger);
              },
              onEnterBack: () => {
                const trigger = pinTl.scrollTrigger;
                if (trigger) registerTrigger("ngo-videomonial-cards-desktop", trigger);
              },
            },
          });

          const vdCards = el.querySelectorAll(".vd-card");

          // ✅ Set horizontal spread + rotation for each card
          vdCards.forEach((cardEl: any, i) => {
            const card = cardsngo[i];
            let rotationZ = 0;
            if (card.rotation) {
              const match = card.rotation.match(/rotate-z-\[(-?\d+)deg\]/);
              if (match) rotationZ = parseInt(match[1]);
            }
            const offsetX = getCardOffsetX(i, cardsngo.length, 220);

            gsap.set(cardEl, {
              perspective: 1200,
              transformStyle: "preserve-3d",
              rotation: rotationZ,
              x: offsetX,
              transformOrigin: "50% 70%",
            });
          });

          pinTl.from(vdCards, {
            yPercent: 150,
            stagger: 0.2,
            ease: "power1.inOut",
            force3D: true,
          });
        },

        // ─── REDUCED MOTION ──────────────────────────────────────────
        "(prefers-reduced-motion: reduce)": () => {
          gsap.set(el, { backgroundColor: "#000000" });
          gsap.set(
            [".first-title", ".sec-title", ".third-title"].map((sel) => el?.querySelector(sel)),
            { xPercent: 0 }
          );
          gsap.set(el?.querySelectorAll(".vd-card"), { clearProps: "all", autoAlpha: 1 });
        },
      });

      setTimeout(() => debouncedRefresh(), 100);

      return () => {
        unregisterTrigger("ngo-videomonial-title-mobile");
        unregisterTrigger("ngo-videomonial-cards-mobile");
        unregisterTrigger("ngo-videomonial-title-desktop");
        unregisterTrigger("ngo-videomonial-cards-desktop");
      };
    },
    {
      scope: sectionRef,
      dependencies: [cardsngo, registerTrigger, unregisterTrigger, debouncedRefresh],
    }
  );

  const handlePlay = (i: number) => vdRef.current[i]?.play();
  const handlePause = (i: number) => vdRef.current[i]?.pause();

  const isMobile =
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false;

  const titleClass = isMobile ? "ts-h1" : "";

  return (
    <section
      ref={sectionRef}
      className="testimonials-section relative min-h-screen"
      style={{
        background: "#000000",
        contain: "layout style paint",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* ── Background decorative layer ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
        <div className="absolute -inset-32 rounded-[5rem] bg-gradient-to-r from-[#d4af37]/3 via-[#c9a961]/2 to-[#d4af37]/3" />
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-[140px] bg-[#d4af37]/3" />
        <div className="absolute -bottom-48 -right-48 w-[620px] h-[620px] rounded-full blur-[160px] bg-[#c9a961]/4" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(212,175,55,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(201,169,97,0.1) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* ── Title ✅ reduced font size so cards aren't buried ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none gap-3 text-center z-10 pointer-events-none">
        <h1
          className={`first-title ${titleClass} text-white font-extrabold tracking-tight`}
          style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}  // ✅ was 11rem → now max 5rem
        >
          EXPLORE 
        </h1>
        <h1
          className={`sec-title ${titleClass} text-[#d4af37] font-extrabold tracking-tight`}
          style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}  // ✅ reduced
        >
          EVERY
        </h1>
        <h1
          className={`third-title ${titleClass} text-white font-extrabold tracking-tight`}
          style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}  // ✅ reduced
        >
          CORNER
        </h1>
      </div>

      {/* ── Cards horizontally spread with gold glow outline ── */}
      <div className="pin-box relative h-screen flex items-center justify-center">
        {cardsngo.map((card, index) => {
          const offsetX = getCardOffsetX(index, cardsngo.length, 220); // 220px gap between cards

          return (
            <div
              key={index}
              className={`vd-card ${card.rotation ?? ""}`}
              style={{
                position: "absolute",
                width: "280px",
                height: "380px",
                borderRadius: "1.25rem",
                overflow: "hidden",
                // ✅ Gold glowing outline
                border: "2px solid rgba(212,175,55,0.8)",
                boxShadow: [
                  "0 0 0 1px rgba(212,175,55,0.15)",
                  "0 0 20px 3px rgba(212,175,55,0.4)",
                  "0 25px 50px -12px rgba(212,175,55,0.3)",
                  "inset 0 0 20px rgba(212,175,55,0.07)",
                ].join(", "),
                background: "rgba(0,0,0,0.8)",
                backdropFilter: "blur(10px)",
                transform: `translateX(${offsetX}px)`,
                transition: "box-shadow 0.35s ease, border-color 0.35s ease",
                cursor: "pointer",
              }}
              // ✅ Hover: brighten the glow
              onMouseEnter={(e) => {
                handlePlay(index);
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(212,175,55,1)";
                el.style.boxShadow = [
                  "0 0 0 1px rgba(212,175,55,0.3)",
                  "0 0 32px 8px rgba(212,175,55,0.6)",
                  "0 25px 50px -12px rgba(212,175,55,0.45)",
                  "inset 0 0 24px rgba(212,175,55,0.12)",
                ].join(", ");
              }}
              onMouseLeave={(e) => {
                handlePause(index);
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(212,175,55,0.8)";
                el.style.boxShadow = [
                  "0 0 0 1px rgba(212,175,55,0.15)",
                  "0 0 20px 3px rgba(212,175,55,0.4)",
                  "0 25px 50px -12px rgba(212,175,55,0.3)",
                  "inset 0 0 20px rgba(212,175,55,0.07)",
                ].join(", ");
              }}
            >
              <video
                ref={(el) => {
                  if (el) vdRef.current[index] = el;
                }}
                src={card.src}
                playsInline
                muted
                loop
                preload="none"
                className="size-full object-cover rounded-[1.25rem]"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NgoVideomonial;
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import gsap from "gsap";

type MenuItem =
  | { label: string; href: string; children?: never }
  | { label: string; children: { label: string; href: string }[]; href?: never };

const ITEMS: MenuItem[] = [
  { label: "App Development", href: "/services/app-development" },
  { label: "Content Marketing", href: "/services/content-marketing" },
  { label: "Email Marketing", href: "/services/email-marketing" },
  { label: "Graphic Designing", href: "/services/graphic-design" },
  { label: "Lead Generation", href: "/services/lead-generation" },
  { label: "Public Relations", href: "/services/public-relations" },
  {
    label: "Performance Marketing",
    children: [
      { label: "Google Ads", href: "/services/performance/google-ads" },
      { label: "Meta Ads", href: "/services/performance/meta-ads" },
      { label: "Conversion Optimization", href: "/services/performance/cro" },
    ],
  },
  {
    label: "Search Engine Optimization",
    children: [
      { label: "On-page SEO", href: "/services/seo/on-page" },
      { label: "Technical SEO", href: "/services/seo/technical" },
      { label: "Local SEO", href: "/services/seo/local" },
    ],
  },
  { label: "Social Media Management", href: "/services/social-media" },
  { label: "Videography", href: "/services/videography" },
  { label: "Virtual Tour", href: "/services/virtual-tour" },
  { label: "Web Creation", href: "/services/web-creation" },
];

export default function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState<string | null>(null);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // ✅ click animation target (trigger)
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // ✅ Your click animation (local)
  

   const playClickAnimation = (element: HTMLElement | null) => {
    if (!element) return;

    const tl = gsap.timeline();

    tl.to(element, {
      scale: 0.92,
      duration: 0.1,
      ease: "power2.out",
    })
      .to(element, {
        scale: 1.08,
        boxShadow: "0 0 28px rgba(34, 211, 238, 0.9)",
        duration: 0.18,
        ease: "elastic.out(1, 0.5)",
      })
      .to(element, {
        scale: 1,
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        duration: 0.25,
        ease: "power2.inOut",
      });


  // close: outside click + ESC
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSubOpen(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSubOpen(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // GSAP open/close
  useEffect(() => {
    if (!panelRef.current) return;

    gsap.killTweensOf(panelRef.current);

    if (open) {
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 10, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.18, ease: "power2.out" }
      );
    } else {
      gsap.to(panelRef.current, {
        autoAlpha: 0,
        y: 8,
        scale: 0.985,
        duration: 0.14,
        ease: "power2.in",
      });
    }
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();

          // ✅ click animation on trigger
          playClickAnimation(triggerRef.current);

          setOpen((v) => !v);
          if (open) setSubOpen(null);
        }}
        className="
          group relative text-sm font-medium text-muted-foreground
          transition-colors duration-300 hover:text-foreground
          nav-pressable
          inline-flex items-center gap-2
        "
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span>Services</span>

        {/* underline */}
        <span
          className="
            pointer-events-none
            absolute left-1/2 -bottom-1 h-[2px] w-0
            -translate-x-1/2
            bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]
            transition-all duration-300
            group-hover:w-full
          "
        />

        <ChevronDown
          className={`ml-1 h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180 text-foreground" : ""
          }`}
        />
      </button>

      {/* Panel */}
      <div
        ref={panelRef}
        style={{ visibility: open ? "visible" : "hidden" }}
        className="
          absolute left-0 mt-3 w-[320px] sm:w-[360px]
          rounded-2xl overflow-hidden
          border border-white/10
          bg-slate-900/70 backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          z-50
        "
        role="menu"
        onMouseLeave={() => setSubOpen(null)}
      >
        <div className="py-3">
          {ITEMS.map((it) => {
            const isParent = "children" in it;

            return (
              <div key={it.label} className="relative">
                <button
                  type="button"
                  className="w-full px-5 py-3 flex items-center justify-between text-left text-white/90 font-semibold hover:bg-white/5 transition"
                  onMouseEnter={() => {
                    if (isParent) setSubOpen(it.label);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();

                    // ✅ click animation on each row
                    playClickAnimation(e.currentTarget);

                    if (isParent) {
                      setSubOpen((v) => (v === it.label ? null : it.label));
                    } else {
                      window.location.href = it.href;
                      setOpen(false);
                      setSubOpen(null);
                    }
                  }}
                >
                  <span>{it.label}</span>
                  {isParent ? <ChevronRight className="h-4 w-4 opacity-80" /> : null}
                </button>

                {/* Submenu */}
                {isParent && (
                  <div
                    className={`
                      absolute top-0 left-full ml-2 w-[260px]
                      rounded-2xl overflow-hidden
                      border border-white/10
                      bg-slate-900/75 backdrop-blur-xl
                      shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                      transition
                      ${subOpen === it.label ? "opacity-100 visible" : "opacity-0 invisible"}
                    `}
                  >
                    <div className="py-3">
                      {it.children.map((c) => (
                        <button
                          key={c.label}
                          type="button"
                          className="w-full px-5 py-3 text-left text-white/85 font-semibold hover:bg-white/5 transition"
                          onClick={(e) => {
                            e.stopPropagation();

                            // ✅ click animation on submenu item
                            playClickAnimation(e.currentTarget);

                            window.location.href = c.href;
                            setOpen(false);
                            setSubOpen(null);
                          }}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  };
};

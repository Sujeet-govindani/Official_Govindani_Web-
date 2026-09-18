import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = {
  label: string;
  href?: string; // leaf links
  children?: MenuItem[]; // submenu (not rendered in this simple panel yet)
};

const ITEMS: MenuItem[] = [
  { label: "360° Virtual Tour", href: "/portfolio/virtualtour" },
  { label: "Apps", href: "/portfolio/apps" },
  { label: "Graphic Designs", href: "/portfolio/graphic-designs" },
  { label: "Video Editing", href: "/portfolio/video-editing" },
  {
    label: "Websites",
    children: [
      { label: "E-Commerce Websites", href: "/portfolio/websites/ecommerce" },
      {
        label: "NGO Websites",
        children: [
          { label: "Education NGO", href: "/portfolio/websites/ngo/education" },
          { label: "Healthcare NGO", href: "/portfolio/websites/ngo/healthcare" },
          { label: "Animal Welfare NGO", href: "/portfolio/websites/ngo/animal-welfare" },
          { label: "Fundraising NGO", href: "/portfolio/websites/ngo/fundraising" },
        ],
      },
      { label: "News & Blogging Websites", href: "/portfolio/websites/news-blog" },
      { label: "Our Business Websites", href: "/portfolio/websites/business" },
      { label: "Healthcare Websites", href: "/portfolio/websites/healthcare" },
      { label: "Real Estate Websites", href: "/portfolio/websites/real-estate" },
    ],
  },
];

export default function PortfolioDropdown() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Optional: keep dropdown open when you're on /portfolio routes
  useEffect(() => {
    if (location.pathname === "/portfolio" || location.pathname.startsWith("/portfolio/")) {
      // Comment this out if you DON'T want auto-open on portfolio pages
      setOpen(true);
    }
  }, [location.pathname]);

  // ✅ outside click + ESC close
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (wrapRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // ✅ simple open/close animation
  useEffect(() => {
    if (!panelRef.current) return;

    if (open) {
      panelRef.current.style.transform = "translateY(0) scale(1)";
      panelRef.current.style.opacity = "1";
      panelRef.current.style.visibility = "visible";
      panelRef.current.style.pointerEvents = "auto";
    } else {
      panelRef.current.style.transform = "translateY(8px) scale(0.985)";
      panelRef.current.style.opacity = "0";
      panelRef.current.style.visibility = "hidden";
      panelRef.current.style.pointerEvents = "none";
    }
  }, [open]);

  // ✅ helper for safe navigation
  const go = (href?: string) => {
    if (!href) return;
    navigate(href);
  };

  return (
    <div ref={wrapRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          // ✅ REQUIRED: redirect + open dropdown at the same time
          setOpen(true); // always open (no toggle)
          setActiveItem(null);
          go("/portfolio");
        }}
        className="
    group relative text-sm font-medium
    text-gray-400
    transition-colors duration-300 hover:text-white
    inline-flex items-center gap-2
  "
      >
        <span>Portfolio</span>

        {/* underline */}
        <span
          className="
      pointer-events-none absolute left-1/2 -bottom-1 h-[2px] w-0
      -translate-x-1/2
      bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400
      transition-all duration-300 group-hover:w-full
    "
        />

        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180 text-cyan-400" : ""
            }`}
        />
      </button>
      {/* Panel */}
      <div
        ref={panelRef}
        style={{
          visibility: "hidden",
          opacity: 0,
          transform: "translateY(8px) scale(0.985)",
          transition: "all 0.18s ease-out",
          pointerEvents: "none",
        }}
        className="
          absolute left-0 mt-3 w-[260px]
          rounded-2xl overflow-hidden
          border border-cyan-400/20
          bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95
          backdrop-blur-xl
          shadow-[0_8px_32px_rgba(6,182,212,0.25),0_0_80px_rgba(6,182,212,0.15),0_2px_8px_rgba(0,0,0,0.5)]
          z-50
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />

        <div className="py-2 relative">
          {ITEMS.map((item) => {
            // NOTE: this dropdown UI renders only first-level items (like your screenshot).
            // If you want nested menus (Websites -> NGO Websites -> etc.), tell me and I’ll add it.
            const clickableHref = item.href; // "Websites" has no href (children only)

            return (
              <button
                key={item.label}
                type="button"
                className={`
                  w-full px-5 py-3.5 text-left font-semibold
                  transition-all duration-300
                  group
                  ${activeItem === item.label ? "text-cyan-400" : "text-white hover:text-cyan-400"}
                `}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setActiveItem(item.label);

                  // If item has href, navigate + close
                  if (clickableHref) {
                    go(clickableHref);
                    setOpen(false);
                    return;
                  }

                  // If no href (like Websites), just keep menu open
                  setOpen(true);
                }}
              >
                <span className="group-hover:scale-105 transition-transform duration-200 inline-block">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

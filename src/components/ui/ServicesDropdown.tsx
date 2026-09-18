import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

type MenuItem =
  | { label: string; href: string; children?: never }
  | { label: string; children: { label: string; href: string }[]; href?: never };

const ITEMS: MenuItem[] = [
  { label: "App Development", href: "/services/app-development" },
  { label: "Content Marketing", href: "/services/content-marketing" },
  {
    label: "Performance Marketing",
    children: [
      { label: "Google Ads", href: "/services/performance/google-ads" },
      { label: "Meta Ads", href: "/services/performance/meta-ads" },
      { label: "Twitter Ads", href: "/services/performance/twitter-ads" },
      { label: "LinkedIn Ads", href: "/services/performance/linkedin-ads" },
    ],
  },
  { label: "Email Marketing", href: "/services/email-marketing" },
  { label: "Graphic Designing", href: "/services/graphic-designing" },
  { label: "Lead Generation", href: "/services/lead-generation" },
  { label: "Public Relations", href: "/services/public-relations" },
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
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Track which submenus are open
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // close: outside click + ESC
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setOpenSubmenus(new Set());
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setOpenSubmenus(new Set());
      }
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Animation effect
  useEffect(() => {
    if (!panelRef.current) return;

    if (open) {
      panelRef.current.style.transform = "translateY(0) scale(1)";
      panelRef.current.style.opacity = "1";
    } else {
      panelRef.current.style.transform = "translateY(8px) scale(0.985)";
      panelRef.current.style.opacity = "0";
    }
  }, [open]);

  const goTo = (href: string, label?: string) => {
    if (label) setActiveItem(label);
    navigate(href);
    setOpen(false);
    setOpenSubmenus(new Set());
  };

  // Toggle submenu
  const toggleSubmenu = (itemLabel: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setOpenSubmenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemLabel)) {
        newSet.delete(itemLabel);
      } else {
        newSet.add(itemLabel);
      }
      return newSet;
    });
  };

  // Check if submenu is open
  const isSubmenuOpen = (itemLabel: string) => {
    return openSubmenus.has(itemLabel);
  };

  return (
    <div ref={wrapRef} className="relative">
      {/* ✅ Trigger row: TEXT navigates, ARROW toggles */}
      <div className="inline-flex items-center gap-2">
        {/* ✅ TEXT click = redirect to /services */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goTo("/services", "Services");
          }}
          className="
            relative inline-flex items-center
            text-sm font-medium
            text-gray-400
            transition-colors duration-300
            hover:text-white
            after:content-['']
            after:absolute after:left-1/2 after:-bottom-1
            after:h-[2px] after:w-0
            after:-translate-x-1/2
            after:bg-gradient-to-r
            after:from-cyan-400 after:via-blue-500 after:to-cyan-400
            after:transition-all after:duration-300
            hover:after:w-full
          "
          aria-label="Go to Services page"
        >
          Services
        </button>

        {/* ✅ ARROW click = open dropdown (no redirect) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((v) => {
              const next = !v;
              if (!next) setOpenSubmenus(new Set());
              return next;
            });
          }}
          className="p-1"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Toggle Services dropdown"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              open ? "rotate-180 text-cyan-400" : "text-gray-300"
            }`}
          />
        </button>
      </div>

      {/* Panel */}
      <div
        ref={panelRef}
        style={{
          visibility: open ? "visible" : "hidden",
          opacity: 0,
          transform: "translateY(8px) scale(0.985)",
          transition: "all 0.18s ease-out",
        }}
        className="
          absolute left-0 mt-3 w-[320px] sm:w-[360px]
          rounded-2xl overflow-visible
          border border-cyan-400/20
          bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95
          backdrop-blur-xl
          shadow-[0_8px_32px_rgba(6,182,212,0.25),0_0_80px_rgba(6,182,212,0.15),0_2px_8px_rgba(0,0,0,0.5)]
          z-50
        "
        role="menu"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />

        <div className="py-2 relative">
          {ITEMS.map((it) => {
            const isParent = "children" in it;
            const submenuOpen = isSubmenuOpen(it.label);

            return (
              <div 
                key={it.label} 
                ref={el => itemRefs.current[it.label] = el}
                className="relative group"
              >
                <button
                  type="button"
                  className={`
                    w-full px-5 py-3.5 flex items-center justify-between text-left 
                    font-semibold
                    transition-all duration-300
                    hover:bg-cyan-400/10
                    relative z-10
                    ${activeItem === it.label
                      ? "text-cyan-400 bg-cyan-400/5"
                      : "text-white hover:text-cyan-400"
                    }
                    ${submenuOpen ? "bg-cyan-400/10" : ""}
                  `}
                  onClick={(e) => {
                    if (isParent) {
                      // Toggle submenu on click for parent items
                      toggleSubmenu(it.label, e);
                    } else {
                      // Navigate to page for regular items
                      e.preventDefault();
                      e.stopPropagation();
                      goTo(it.href, it.label);
                    }
                  }}
                >
                  <span className="group-hover:scale-105 transition-transform duration-200 inline-block">
                    {it.label}
                  </span>

                  {isParent ? (
                    <ChevronDown 
                      className={`h-4 w-4 text-cyan-400 opacity-60 group-hover:opacity-100 transition-all duration-200 ${
                        submenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  ) : null}
                </button>

                {/* Submenu - Opens on RIGHT side (DESKTOP) */}
                {isParent && !isMobile && (
                  <div
                    className={`
                      absolute left-full top-0 ml-2 w-[280px]
                      rounded-2xl overflow-hidden
                      border border-cyan-400/20
                      bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95
                      backdrop-blur-xl
                      shadow-[0_8px_32px_rgba(6,182,212,0.25),0_0_80px_rgba(6,182,212,0.15),0_2px_8px_rgba(0,0,0,0.5)]
                      transition-all duration-300 ease-out
                      z-40
                      transform origin-left
                      ${submenuOpen
                        ? "opacity-100 visible scale-100 translate-x-0"
                        : "opacity-0 invisible scale-95 -translate-x-4 pointer-events-none"
                      }
                    `}
                    style={{
                      // Position each submenu at its own parent's level
                      top: "0px", // Align with parent item
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />

                    <div className="py-2 relative">
                      {it.children.map((c) => (
                        <button
                          key={c.label}
                          type="button"
                          className={`
                            w-full px-5 py-3.5 text-left 
                            font-semibold
                            transition-all duration-300
                            hover:bg-cyan-400/10
                            ${activeItem === c.label
                              ? "text-cyan-400 bg-cyan-400/5"
                              : "text-white hover:text-cyan-400"
                            }
                          `}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            goTo(c.href, c.label);
                          }}
                        >
                          <span className="group-hover:scale-105 transition-transform duration-200 inline-block">
                            {c.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submenu - Opens BELOW (MOBILE) */}
                {isParent && isMobile && (
                  <div
                    className={`
                      relative w-full
                      transition-all duration-300 ease-in-out
                      overflow-hidden
                      ${submenuOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                      }
                    `}
                  >
                    <div className="border-l-2 border-cyan-400/30 ml-6 mr-4 my-1">
                      <div className="py-1">
                        {it.children.map((c) => (
                          <button
                            key={c.label}
                            type="button"
                            className={`
                              w-full px-5 py-3 text-left 
                              font-medium
                              transition-all duration-300
                              hover:bg-cyan-400/10
                              ${activeItem === c.label
                                ? "text-cyan-400 bg-cyan-400/5"
                                : "text-white hover:text-cyan-400"
                              }
                            `}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              goTo(c.href, c.label);
                            }}
                          >
                            <span className="group-hover:scale-105 transition-transform duration-200 inline-block text-sm">
                              {c.label}
                            </span>
                          </button>
                        ))}
                      </div>
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
}
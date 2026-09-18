import { useCallback, useEffect, useMemo, useState } from "react";
import { PRICING_LIVE, usePreviewVisible } from '@/config/flags';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IoClose } from "react-icons/io5";

import { useIsMobile } from "@/hooks/use-mobile";
import ContactUsForm from "@/pages/ContactUsForm";
import { PHONE_TEL, SUPPORT_EMAIL, MAPS_URL, whatsappBotLink, WHATSAPP_BOT_MESSAGE } from "@/config/contact";
import type { CatalogItem } from "@/config/serviceCatalog";
import { resolveNav, type NavItem } from "./navConfig";

/** Resolves the placeholder hrefs used in navConfig. */
const resolveHref = (href: string) => {
  if (href === "__wa__") return whatsappBotLink(WHATSAPP_BOT_MESSAGE);  // bot line → guided flow
  if (href === "__tel__") return `tel:${PHONE_TEL}`;
  if (href === "__mail__") return `mailto:${SUPPORT_EMAIL}`;
  if (href === "__map__") return MAPS_URL;
  return href;
};

const buzz = () => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(8);
    } catch {
      /* vibration is a nicety, never a requirement */
    }
  }
};

type SheetLevel = { title: string; options: CatalogItem[] };

/**
 * Scrolls to a section id once it exists. Pages under /pricing group several
 * offerings on one route, so drilling into e.g. "WordPress" navigates to the
 * page and then lands on that section.
 */
const scrollToSection = (id: string, retries = 10) => {
  const attempt = (n: number) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else if (n > 0) setTimeout(() => attempt(n - 1), 120);
  };
  attempt(retries);
};

export default function BottomNav() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const [stack, setStack] = useState<SheetLevel[]>([]);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const showPricing = usePreviewVisible(PRICING_LIVE);
  const baseConfig = useMemo(() => resolveNav(location.pathname), [location.pathname]);

  // Strip every pricing entry point while the flow is still being built. The
  // routes stay reachable by URL; this is about what a visitor can find.
  const config = useMemo(() => {
    if (showPricing) return baseConfig;
    const stripped = baseConfig.items
      .filter((it) => it.key !== 'pricing')
      .map((it) => (it.options
        ? { ...it, options: it.options.filter((o) => !String(o.to ?? '').startsWith('/pricing')) }
        : it));
    return { ...baseConfig, items: stripped };
  }, [baseConfig, showPricing]);
  const sheet = stack.length ? stack[stack.length - 1] : null;

  /* --- close overlays whenever the route changes --- */
  useEffect(() => {
    setStack([]);
    setQuoteOpen(false);
  }, [location.pathname]);

  /* --- esc closes whatever is open --- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setStack([]);
      setQuoteOpen(false);
    };
    if (sheet || quoteOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheet, quoteOpen]);

  /* --- lock background scroll while a sheet or the form is open --- */
  useEffect(() => {
    if (!sheet && !quoteOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheet, quoteOpen]);

  const isActive = useCallback(
    (item: NavItem) => {
      const here = location.pathname.toLowerCase().replace(/\/+$/, "") || "/";
      if (item.to) {
        return here === (item.to.toLowerCase().replace(/\/+$/, "") || "/");
      }
      // A picker slot lights up when the visitor is already inside one of its
      // destinations, so the dock always shows where you are.
      if (item.options?.length) {
        return item.options.some((o) => {
          const there = o.to.toLowerCase().replace(/\/+$/, "");
          return there !== "" && (here === there || here.startsWith(there + "/"));
        });
      }
      return false;
    },
    [location.pathname]
  );

  const handleAction = (item: NavItem) => {
    buzz();
    if (item.action === "back") {
      if (window.history.length > 1) navigate(-1);
      else navigate("/");
      return;
    }
    if (item.action === "quote") {
      setQuoteOpen(true);
      return;
    }
    if (item.action === "sheet" && item.options?.length) {
      const title = item.sheetTitle || item.label;
      setStack((cur) =>
        cur.length === 1 && cur[0].title === title
          ? []
          : [{ title, options: item.options! }]
      );
    }
  };

  if (!isMobile) return null;

  const renderSlot = (item: NavItem) => {
    const active = isActive(item);
    const primary = !!item.primary;
    const Icon = item.icon as React.ComponentType<{
      size?: number;
      strokeWidth?: number;
    }>;

    const inner = (
      <>
        <span
          className={
            primary
              ? "grid place-items-center h-12 w-12 -mt-6 rounded-full bg-[#d4af37] text-black shadow-[0_6px_20px_rgba(212,175,55,0.45)] ring-4 ring-[#0b0705] transition-all duration-200"
              : "grid place-items-center h-6 w-6 transition-all duration-200"
          }
        >
          <Icon size={primary ? 21 : 20} strokeWidth={active || primary ? 2.4 : 1.8} />
        </span>
        <span
          className={[
            "text-[10px] leading-none tracking-wide transition-colors duration-200",
            primary ? "mt-1 font-semibold text-[#d4af37]" : "mt-1.5",
            active && !primary ? "font-semibold text-[#d4af37]" : "",
          ].join(" ")}
        >
          {item.label}
        </span>
        {active && !primary && (
          <motion.span
            layoutId="dock-active"
            className="absolute top-0 h-[2px] w-8 rounded-full bg-[#d4af37]"
            transition={
              reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40 }
            }
          />
        )}
      </>
    );

    const slotClass = [
      "relative flex flex-1 flex-col items-center justify-center",
      "min-h-[56px] select-none outline-none",
      "focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:rounded-lg",
      "active:scale-[0.94] transition-transform duration-150",
      active || primary ? "text-[#d4af37]" : "text-white/60",
    ].join(" ");

    if (item.href) {
      const href = resolveHref(item.href);
      const external = href.startsWith("http");
      return (
        <a
          key={item.key}
          href={href}
          onClick={buzz}
          aria-label={item.label}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={slotClass}
        >
          {inner}
        </a>
      );
    }

    if (item.to) {
      return (
        <Link
          key={item.key}
          to={item.to}
          onClick={buzz}
          aria-label={item.label}
          aria-current={active ? "page" : undefined}
          className={slotClass}
        >
          {inner}
        </Link>
      );
    }

    const sheetIsOpen = !!sheet && sheet.title === (item.sheetTitle || item.label);

    return (
      <button
        key={item.key}
        type="button"
        onClick={() => handleAction(item)}
        aria-label={item.label}
        aria-expanded={item.action === "sheet" ? sheetIsOpen : undefined}
        className={slotClass}
      >
        {inner}
      </button>
    );
  };

  return (
    <>
      {/* Reserves the dock's height at the end of the page. A global
          `html, body { padding: 0 !important }` rule in the stylesheet beats any
          inline padding, so the space has to come from a real element. */}
      <div
        aria-hidden="true"
        className="md:hidden"
        style={{ height: "calc(68px + env(safe-area-inset-bottom, 0px))" }}
      />

      {/* ---------------- the dock (always fixed, never retracts) ---------------- */}
      <nav
        aria-label="Primary"
        className="
          fixed inset-x-0 bottom-0 z-[9999998] md:hidden
          border-t border-[#d4af37]/20
          bg-[#0b0705]/95 backdrop-blur-xl
          shadow-[0_-8px_30px_rgba(0,0,0,0.55)]
        "
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="mx-auto flex max-w-lg items-stretch px-1">
          {config.items.map(renderSlot)}
        </div>
      </nav>

      {/* ---------------- picker sheet ---------------- */}
      <AnimatePresence>
        {sheet ? (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={() => setStack([])}
              className="fixed inset-0 z-[9999998] bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="sheet"
              role="dialog"
              aria-label={sheet.title}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={
                reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 36 }
              }
              className="
                fixed inset-x-0 bottom-0 z-[9999999] md:hidden
                flex max-h-[78vh] flex-col
                rounded-t-3xl border-t border-[#d4af37]/25
                bg-[#0b0705] shadow-[0_-12px_40px_rgba(0,0,0,0.7)]
              "
            >
              <div className="flex justify-center pt-3">
                <span className="h-1 w-10 rounded-full bg-white/20" />
              </div>

              <div className="flex items-center justify-between gap-2 px-5 pb-3 pt-4">
                <div className="flex min-w-0 items-center gap-2">
                  {stack.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        buzz();
                        setStack((cur) => cur.slice(0, -1));
                      }}
                      aria-label="Back"
                      className="-ml-1 rounded-full p-1 text-[#d4af37] active:bg-white/10"
                    >
                      &lsaquo;
                    </button>
                  )}
                  <p className="truncate text-[15px] font-semibold text-[#d4af37]">{sheet.title}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStack([])}
                  aria-label="Close"
                  className="rounded-full border border-white/10 p-1.5 text-white/50 active:bg-white/10"
                >
                  <IoClose size={18} />
                </button>
              </div>

              <ul
                className="flex-1 overflow-y-auto px-3"
                style={{ paddingBottom: "calc(84px + env(safe-area-inset-bottom, 0px))" }}
              >
                {sheet.options.map((o) => (
                  <li key={o.label + o.to + (o.hash || "")}>
                    <Link
                      to={o.hash ? `${o.to}#${o.hash}` : o.to}
                      onClick={(e) => {
                        buzz();
                        if (o.children?.length) {
                          e.preventDefault();
                          setStack((cur) => [...cur, { title: o.label, options: o.children! }]);
                          return;
                        }
                        setStack([]);
                        if (o.hash) {
                          const already =
                            location.pathname.replace(/\/+$/, "") === o.to.replace(/\/+$/, "");
                          setTimeout(() => scrollToSection(o.hash!), already ? 120 : 450);
                        }
                      }}
                      className="
                        flex items-center justify-between gap-3 rounded-xl px-4 py-3
                        transition-colors active:bg-white/5
                      "
                    >
                      <span className="min-w-0">
                        <span className="block text-[15px] leading-snug text-white/90">
                          {o.label}
                        </span>
                        {o.desc && (
                          <span className="mt-0.5 block text-[12px] leading-snug text-white/40">
                            {o.desc}
                          </span>
                        )}
                      </span>
                      <span className="shrink-0 text-white/25">&rsaquo;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      {/* ---------------- quote form ---------------- */}
      {quoteOpen && (
        <div
          className="fixed inset-0 z-[10000000] flex items-end justify-center bg-black/85 backdrop-blur-md md:hidden"
          onClick={() => setQuoteOpen(false)}
        >
          <div
            className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl border-t border-[#d4af37]/30 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-[3] rounded-full border border-white/10 bg-black/60 p-2 text-white/60 transition-all active:bg-white/10"
              onClick={() => setQuoteOpen(false)}
              aria-label="Close"
            >
              <IoClose size={20} />
            </button>
            <ContactUsForm onSuccess={() => setQuoteOpen(false)} isModal={true} />
          </div>
        </div>
      )}
    </>
  );
}

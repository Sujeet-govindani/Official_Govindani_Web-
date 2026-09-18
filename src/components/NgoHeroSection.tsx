"use client";

import { ArrowRight, Play, X, Menu as MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import HeroGsapCard from "./ui/HeroGsapCard ";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── REPLACE WITH YOUR ACTUAL GOOGLE FORM COMPONENT PATH ──────────────────────
import GoogleForm from "./ui/GoogleForm"; // <-- change this import path to your form file
// ─────────────────────────────────────────────────────────────────────────────

// ── REPLACE WITH YOUR PORTFOLIO VIDEO PATH ────────────────────────────────────
const PORTFOLIO_VIDEO_PATH = "/public/your-portfolio-video.mp4"; // local or YouTube embed URL
// ─────────────────────────────────────────────────────────────────────────────

const NGO_QUOTES: Record<string, [string, string]> = {
    "Recurring Donations": ["Every small monthly gift", "keeps hope alive all year."],
    "Fee Recovery": ["More of your support reaches", "families who need it most."],
    "Form Field Manager": ["Giving stays simple and fast", "so kindness never waits."],
    "Funds and Designations": ["Choose where your help goes,", "see impact where it matters."],
    "Tributes": ["Honor someone you love by", "changing someone's tomorrow."],
    "Pdf Receipts": ["Transparent giving builds trust", "every time you contribute."],
    "Annual Receipts": ["Your year of generosity,", "summarized with care."],
    "Currency Switcher": ["Compassion knows no borders", "give from anywhere."],
    "Gift Aid": ["Make your donation go further", "at no extra cost."],
    "Stripe": ["Secure payments,", "secure impact."],
    "American Cloud": ["Reliable processing,", "reliable giving."],
    "Mollie Gateway": ["Smooth checkout,", "stronger support."],
    "PayU Money Gateway": ["Fast donations,", "real change."],
    "iATS Payments": ["Trusted payments,", "trusted outcomes."],
    "Paytm Gateway": ["One tap to help", "one step closer to change."],
    "Peer-to-Peer": ["Invite friends to join you", "together we lift more lives."],
    "Active Campaign": ["Stay connected to impact", "stories that keep you involved."],
    "Salesforce": ["Every donor matters", "every story is remembered."],
    "MailChimp": ["Updates that inspire action", "see what your support does."],
};

gsap.registerPlugin(ScrollTrigger);

type CarouselItem = { icon: string; title: string; image: string };
type AnimationType = "slide" | "fade" | "scale" | "pulse" | "driftX" | "heartbeat" | "parallax";

const mustHaveData: CarouselItem[] = [
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Recurring-Donations.png", title: "Recurring Donations", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RDimg1.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Fee-Recovery.png", title: "Fee Recovery", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/NGOimg2.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Form-Field-Manager.png", title: "Form Field Manager", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ngoimg3.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Funds-Designations.webp", title: "Funds and Designations", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/funds.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Tributes.png", title: "Tributes", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ngoimg5.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-PDF-Receipts.webp", title: "Pdf Receipts", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ngoimg6.webp" },
];
const toolsData: CarouselItem[] = [
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-woocommerce.png", title: "Donation Upsells For WooCommerce", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/NGOimg2.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Google-Analytics-Donation-Tracking.png", title: "Google Analytics Donation", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ngoimg3.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Annual-Receipts.png", title: "Annual Receipts", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ngoimg3.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-divi.png", title: "Donation Modules For Divi", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/funds.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Currency-Switcher.png", title: "Currency Switcher", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/currency switcher.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Gift-Aid.png", title: "Gift Aid", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/gift-aid.webp" },
];
const paymentData: CarouselItem[] = [
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Bitpay.webp", title: "Bitpay Donations", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/stripemain.png" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Americloud-Payments.webp", title: "American Cloud", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ACloud.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Braintree-Gateway.png", title: "Braintree Gateway", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/molliemain.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Payumain.jfif", title: "PayU Money Gateway", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/payU.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-iats-Payment.webp", title: "iATS Payments", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/iAts.png" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-paytm-gateway.webp", title: "Paytm Gateway", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/paytm.webp" },
];
const marketingData: CarouselItem[] = [
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/peer1.png", title: "Peer-to-Peer", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/peer1.png" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Active-Campaign.png", title: "Active Campaign", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/activecampn.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/salesforce-icon.png", title: "Salesforce", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/salesforce.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Mailchimp.png", title: "MailChimp", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/mailchimp.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Fee-Recovery.png", title: "Fee Recovery", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/NGOimg2.webp" },
    { icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-AWeber.png", title: "AWeber", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ngoimg6.webp" },
];

// ── Radial Nav Menu ───────────────────────────────────────────────────────────
const RadialNavMenu = () => {
    const [open, setOpen] = useState(false);
    const [activeLabel, setActiveLabel] = useState("Intro");

    const menuItems = [
        { label: "Intro", section: "intro" },
        { label: "Home", section: "home" },
        { label: "Ngo", section: "ngo-stats" },
        { label: "Partners", section: "partners" },
        { label: "Portfolio", section: "portfolio" },
        { label: "Services", section: "services" },
        { label: "Pricing", section: "pricing" },
    ];

    // ── SPACING FIX ──────────────────────────────────────────────────────────
    // All items + the toggle are treated as one uniform list.
    // Each slot is ITEM_GAP px tall; the toggle sits at slot index toggleIndex.
    // Every nav button is offset from center by (index - toggleIndex) * ITEM_GAP.
    const ITEM_GAP = 50;          // px between each button center
    const toggleIndex = 3;        // toggle sits at the 4th slot (0-based), i.e. between Partners and Portfolio

    // Slots: 0..toggleIndex-1 are nav items above toggle, toggleIndex+1..end are below
    const slotsAbove = menuItems.slice(0, toggleIndex);                 // Intro, Home, Ngo, Partners
    const slotsBelow = menuItems.slice(toggleIndex);                    // Portfolio, Services, Pricing
    const totalSlots = menuItems.length + 1;                            // nav items + 1 toggle
    const containerH = totalSlots * ITEM_GAP + 40;                     // +40 for breathing room

    useEffect(() => {
        const triggers = menuItems.map(item =>
            ScrollTrigger.create({
                trigger: `#${item.section}`,
                start: "top 20%",
                end: "bottom 20%",
                onToggle: (self) => { if (self.isActive) setActiveLabel(item.label); },
            })
        );
        return () => { triggers.forEach(t => t.kill()); };
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offsetPosition =
                element.getBoundingClientRect().top + window.pageYOffset - 90;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
        setOpen(false);
    };

    // Base style shared by all nav buttons
    const btnBase: React.CSSProperties = {
        position: "absolute",
        right: 0,
        width: "85px",
        padding: "8px 4px",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.03em",
        textAlign: "center",
        border: "1px solid rgba(251,191,36,0.45)",
        borderRadius: "8px 0 0 8px",
        background: "#000",
        color: "#fbbf24",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.6)",
        lineHeight: "1.3",
    };

    // Converts a slot index (relative to toggleIndex) into a top CSS value
    // centred in the container.
    const slotTop = (slotOffset: number): string =>
        `calc(50% + ${slotOffset * ITEM_GAP - 12}px)`; // -12 to centre the ~24px button

    // Above-toggle buttons: slot offsets are -(toggleIndex), ..., -1
    const aboveStyles: React.CSSProperties[] = slotsAbove.map((_, i) => {
        const offset = i - toggleIndex; // negative → above centre
        return {
            ...btnBase,
            top: slotTop(offset),
            opacity: open ? 1 : 0,
            transform: open ? "translateX(0) scale(1)" : "translateX(30px) scale(0.7)",
            transitionDelay: open
                ? `${i * 60}ms`
                : `${(slotsAbove.length - 1 - i) * 40}ms`,
            pointerEvents: open ? "auto" : "none",
        };
    });

    // Below-toggle buttons: slot offsets are +1, +2, ...
    const belowStyles: React.CSSProperties[] = slotsBelow.map((_, i) => {
        const offset = i + 1; // positive → below centre
        return {
            ...btnBase,
            top: slotTop(offset),
            opacity: open ? 1 : 0,
            transform: open ? "translateX(0) scale(1)" : "translateX(30px) scale(0.7)",
            transitionDelay: open
                ? `${i * 60}ms`
                : `${(slotsBelow.length - 1 - i) * 40}ms`,
            pointerEvents: open ? "auto" : "none",
        };
    });

    const hoverOn = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.currentTarget;
        btn.style.background = "linear-gradient(135deg,#92400e,#1a1200)";
        btn.style.color = "#fff";
        btn.style.boxShadow = "0 4px 18px rgba(251,191,36,0.3)";
    };
    const hoverOff = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.currentTarget;
        btn.style.background = "#000";
        btn.style.color = "#fbbf24";
        btn.style.boxShadow = "0 2px 12px rgba(0,0,0,0.6)";
    };

    return (
        <div
            style={{
                position: "fixed",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
            }}
        >
            <div
                style={{
                    position: "relative",
                    height: `${containerH}px`,
                    width: "95px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                {/* Above-toggle nav buttons */}
                {slotsAbove.map((item, i) => (
                    <button
                        key={item.section}
                        style={aboveStyles[i]}
                        onClick={() => scrollTo(item.section)}
                        onMouseEnter={hoverOn}
                        onMouseLeave={hoverOff}
                    >
                        {item.label}
                    </button>
                ))}

                {/* Toggle button — always at centre (top: 50%) */}
                <button
                    onClick={() => setOpen((p) => !p)}
                    style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "85px",
                        padding: "12px 4px",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textAlign: "center",
                        border: "1px solid rgba(251,191,36,0.7)",
                        borderRadius: "10px 0 0 10px",
                        background: open
                            ? "linear-gradient(135deg,#92400e,#451a03)"
                            : "linear-gradient(135deg,#451a03,#1a0800)",
                        color: "#fbbf24",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        backdropFilter: "blur(10px)",
                        boxShadow: open
                            ? "0 0 20px rgba(251,191,36,0.35), -4px 0 16px rgba(251,191,36,0.2)"
                            : "0 2px 14px rgba(0,0,0,0.7)",
                        zIndex: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "2px",
                    }}
                >
                    <MenuIcon
                        style={{
                            width: "14px",
                            height: "14px",
                            color: "#fbbf24",
                            transition: "transform 0.3s ease",
                            transform: open ? "rotate(90deg)" : "rotate(0deg)",
                        }}
                    />
                    <span style={{ fontSize: "10px", textTransform: "uppercase" }}>
                        {activeLabel}
                    </span>
                </button>

                {/* Below-toggle nav buttons */}
                {slotsBelow.map((item, i) => (
                    <button
                        key={item.section}
                        style={belowStyles[i]}
                        onClick={() => scrollTo(item.section)}
                        onMouseEnter={hoverOn}
                        onMouseLeave={hoverOff}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};


// ── Portfolio Video Modal ─────────────────────────────────────────────────────
const VideoModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    if (!open) return null;
    const isEmbed = PORTFOLIO_VIDEO_PATH.startsWith("http");
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 99999,
                background: "rgba(0,0,0,0.90)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(6px)",
                padding: "1rem",
            }}
            onClick={onClose}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "900px",
                    aspectRatio: "16/9",
                    background: "#000",
                    borderRadius: "16px",
                    border: "1px solid rgba(251,191,36,0.3)",
                    overflow: "hidden",
                    boxShadow: "0 0 60px rgba(251,191,36,0.15)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        zIndex: 10,
                        background: "rgba(0,0,0,0.7)",
                        border: "1px solid rgba(251,191,36,0.4)",
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "#fbbf24",
                    }}
                >
                    <X style={{ width: "18px", height: "18px" }} />
                </button>

                {isEmbed ? (
                    <iframe
                        src={PORTFOLIO_VIDEO_PATH}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        style={{ border: "none" }}
                        title="Portfolio Video"
                    />
                ) : (
                    <video
                        src={PORTFOLIO_VIDEO_PATH}
                        controls
                        autoPlay
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                )}
            </div>
        </div>
    );
};

// ── FloatingCarousel (100% unchanged) ────────────────────────────────────────
const FloatingCarousel = ({
    data, position, delay = 0, animationType = "slide", currentIndex, isAnimating,
}: {
    data: CarouselItem[];
    position: string;
    delay?: number;
    animationType?: AnimationType;
    currentIndex: number;
    isAnimating: boolean;
}) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const glowRef = useRef<HTMLDivElement | null>(null);
    const spotRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const innerFxRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        if (!contentRef.current || !isAnimating) return;
        gsap.to(contentRef.current, {
            opacity: 0,
            y: animationType === "slide" ? -8 : 0,
            scale: animationType === "scale" ? 0.97 : 1,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                gsap.fromTo(
                    contentRef.current,
                    { opacity: 0, y: animationType === "slide" ? 8 : 0, scale: animationType === "scale" ? 0.97 : 1 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
                );
            },
        });
    }, [currentIndex, isAnimating, animationType]);

    useEffect(() => {
        const inner = innerFxRef.current;
        const text = textRef.current;
        const title = titleRef.current;
        if (!inner || !text || !title) return;

        gsap.killTweensOf([inner, text, title]);
        gsap.set(inner, { scale: 1, rotateY: 0, rotateX: 0, z: 0, transformPerspective: 1000 });
        gsap.set(text, { opacity: 1, scale: 1, y: 0 });
        gsap.set(title, { textShadow: "0 0 0px rgba(251,191,36,0)" });

        const tl = gsap.timeline({ delay: 0.5, repeat: -1, repeatDelay: 2 });
        tl.to(title, { textShadow: "0 0 10px rgba(251,191,36,0.65)", duration: 1, ease: "power2.out" })
            .to(title, { textShadow: "0 0 0px rgba(251,191,36,0)", duration: 1, ease: "power2.in" });
        tl.to(inner, { rotateY: 5, rotateX: -2, duration: 1.2, ease: "sine.inOut" }, "-=0.5");
        tl.to(inner, {
            scale: 1.03, z: 8, duration: 1.5, ease: "power2.out",
            onStart: () => {
                gsap.to(inner, {
                    boxShadow: "0 0 15px rgba(217,119,6,0.18), inset 0 0 8px rgba(217,119,6,0.08)",
                    backgroundColor: "rgba(217,119,6,0.04)",
                    borderColor: "rgba(251,191,36,0.35)",
                    duration: 0.8,
                });
            },
        }, "-=0.8");
        tl.to(text, { scale: 1.02, y: -2, duration: 1.2, ease: "power2.out" }, "-=1.5");
        tl.to({}, { duration: 0.8 });
        tl.to(inner, {
            scale: 1, z: 0, rotateX: 0, rotateY: 0, duration: 1.5, ease: "power2.inOut",
            onStart: () => {
                gsap.to(inner, {
                    boxShadow: "none",
                    backgroundColor: "transparent",
                    borderColor: "rgba(251,191,36,0.20)",
                    duration: 1,
                });
            },
        }, "-=1.2");
        tl.to(text, { scale: 1, y: 0, duration: 0.8, ease: "power2.in" }, "-=1.5");

        return () => { tl.kill(); };
    }, [currentIndex]);

    useEffect(() => {
        const card = cardRef.current;
        const glow = glowRef.current;
        const spot = spotRef.current;
        if (!card || !glow || !spot) return;

        const ctx = gsap.context(() => {
            gsap.to(card, { y: -6, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true });
            if (animationType === "pulse") { gsap.to(glow, { opacity: 0.12, duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true }); }
            if (animationType === "driftX") { gsap.to(card, { x: 4, duration: 4.2, ease: "sine.inOut", repeat: -1, yoyo: true }); }

            const onMove = (e: MouseEvent) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                gsap.to(card, { rotateX: (0.5 - py) * 3, rotateY: (px - 0.5) * 3, transformPerspective: 1200, duration: 0.3, ease: "power2.out" });
                gsap.to(spot, { opacity: 1, duration: 0.2 });
                spot.style.background = `radial-gradient(240px circle at ${px * 100}% ${py * 100}%, rgba(217,119,6,0.12), transparent 72%)`;
            };
            const onLeave = () => {
                gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.4 });
                gsap.to(glow, { opacity: 0.04, duration: 0.3 });
                gsap.to(spot, { opacity: 0, duration: 0.3 });
            };

            card.addEventListener("mousemove", onMove);
            card.addEventListener("mouseleave", onLeave);
            return () => {
                card.removeEventListener("mousemove", onMove);
                card.removeEventListener("mouseleave", onLeave);
            };
        }, cardRef);

        return () => { ctx.revert(); };
    }, [animationType]);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;
        gsap.fromTo(
            card,
            { opacity: 0, scale: 0.8, y: -30 },
            {
                opacity: 1, scale: 1, y: 0,
                duration: 0.9,
                delay: delay / 1000,
                ease: "elastic.out(1, 0.7)",
                scrollTrigger: { trigger: card, start: "top 95%", once: true },
            }
        );
    }, [delay]);

    const currentItem = data[currentIndex % data.length];

    return (
        <div ref={cardRef} className={`relative w-full max-w-[300px] sm:w-[250px] ${position}`}>
            <div
                className="relative rounded-2xl overflow-hidden border border-amber-500/30"
                style={{ background: "linear-gradient(145deg, #0c0c0c, #131008)" }}
            >
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-amber-500/8 via-yellow-400/5 to-amber-500/8 blur-xl opacity-50 pointer-events-none" />

                <div className="absolute inset-0 backdrop-blur-[20px]" />
                <div
                    className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
                />


                <div ref={contentRef} className="relative p-3">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-white/60 rounded-lg blur-sm" />
                            <div className="relative w-12 h-12 bg-white/90 rounded-lg border border-amber-400/25 flex items-center justify-center shadow-sm">
                                <img
                                    src={currentItem.icon}
                                    alt={currentItem.title}
                                    className="w-9 h-9 object-contain"
                                    loading="lazy"
                                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                                />
                            </div>
                        </div>
                        <p ref={titleRef} className="text-sm text-white/90 font-semibold leading-tight pl-1">
                            {currentItem.title}
                        </p>
                    </div>

                    <div
                        ref={innerFxRef}
                        className="relative h-[140px] rounded-lg border border-amber-500/20 overflow-hidden"
                        style={{
                            background: "linear-gradient(135deg,#0a0800,#100c00)",
                            transformStyle: "preserve-3d",
                            width: "100%",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <div
                            ref={textRef}
                            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                            style={{ transformOrigin: "center center" }}
                        >
                            <div className="relative z-20 w-full">
                                <p className="text-sm font-semibold text-white/95 leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                                    &ldquo;{NGO_QUOTES[currentItem.title]?.[0] ?? "Every act of giving"}&rdquo;
                                </p>
                                <p className="text-sm font-semibold text-amber-300 leading-snug mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                                    &ldquo;{NGO_QUOTES[currentItem.title]?.[1] ?? "creates real change."}&rdquo;
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Main Section ──────────────────────────────────────────────────────────────
const NgoHeroSection = () => {
    // Counter starts at 28,000,000 (28 Cr)
    const [revenue, setRevenue] = useState<number>(28000000);
    const revenueRef = useRef<HTMLSpanElement | null>(null);
    const sparkleRef = useRef<HTMLSpanElement | null>(null);
    const lastRevenueRef = useRef<number>(revenue);
    const firstLineRef = useRef<HTMLSpanElement | null>(null);
    const livesRef = useRef<HTMLSpanElement | null>(null);
    const studentsRef = useRef<HTMLSpanElement | null>(null);
    const peopleRef = useRef<HTMLSpanElement | null>(null);
    const lastLineRef = useRef<HTMLSpanElement | null>(null);
    const [carouselIndex, setCarouselIndex] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showVideo, setShowVideo] = useState<boolean>(false);

    useEffect(() => {
        const iv = window.setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCarouselIndex((p) => (p + 1) % 6);
                setTimeout(() => { setIsAnimating(false); }, 400);
            }, 300);
        }, 8000);
        return () => { window.clearInterval(iv); };
    }, []);

    const handleWatchDemoClick = () => { document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" }); };

    useEffect(() => {
        if (!revenueRef.current) return;
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
        tl.to(revenueRef.current, { textShadow: "0 0 18px rgba(251,191,36,0.5)", duration: 1.2, ease: "power2.out" })
            .to(revenueRef.current, { textShadow: "0 0 0px rgba(251,191,36,0)", duration: 1.2, ease: "power2.in" });
        return () => { tl.kill(); };
    }, []);

    useEffect(() => {
        if (!firstLineRef.current) return;
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.5 });
        tl.to(firstLineRef.current, { textShadow: "0 0 12px rgba(251,191,36,0.7)", scale: 1.02, duration: 1.3, ease: "power2.out" })
            .to(firstLineRef.current, { textShadow: "0 0 0px rgba(251,191,36,0)", scale: 1, duration: 1.3, ease: "power2.in" });
        return () => { tl.kill(); };
    }, []);

    useEffect(() => {
        const timelines: gsap.core.Timeline[] = [];
        [livesRef, studentsRef, peopleRef].forEach((ref) => {
            if (!ref.current) return;
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
            tl.to(ref.current, { textShadow: "0 0 14px rgba(255,255,255,0.5)", scale: 1.03, duration: 1.2, ease: "power2.out" })
                .to(ref.current, { textShadow: "0 0 0px rgba(255,255,255,0)", scale: 1, duration: 1.2, ease: "power2.in" });
            timelines.push(tl);
        });
        return () => { timelines.forEach((tl) => { tl.kill(); }); };
    }, []);

    useEffect(() => {
        if (!lastLineRef.current) return;
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.8 });
        tl.to(lastLineRef.current, { textShadow: "0 0 12px rgba(251,191,36,0.7)", scale: 1.02, duration: 1.4, ease: "power2.out" })
            .to(lastLineRef.current, { textShadow: "0 0 0px rgba(251,191,36,0)", scale: 1, duration: 1.4, ease: "power2.in" });
        return () => { tl.kill(); };
    }, []);

    useEffect(() => {
        const iv = window.setInterval(() => {
            setRevenue((p) => p + Math.floor(Math.random() * 100) + 50);
        }, 2000);
        return () => { window.clearInterval(iv); };
    }, []);

    useEffect(() => {
        if (!sparkleRef.current || revenue <= lastRevenueRef.current) return;
        lastRevenueRef.current = revenue;
        const c = sparkleRef.current;
        while (c.firstChild) { c.removeChild(c.firstChild); }
        ["particle-1", "particle-2", "particle-3", "particle-4"].forEach((cls) => {
            const p = document.createElement("span");
            p.className = `rev-particle ${cls}`;
            c.appendChild(p);
        });
        const t = window.setTimeout(() => { while (c.firstChild) { c.removeChild(c.firstChild); } }, 900);
        return () => { window.clearTimeout(t); };
    }, [revenue]);

    useEffect(() => {
        if (!revenueRef.current) return;
        gsap.fromTo(revenueRef.current, { scale: 1 }, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.inOut" });
    }, [revenue]);

    return (
        <div id="intro">
            <VideoModal open={showVideo} onClose={() => setShowVideo(false)} />
            <RadialNavMenu />

            {/* Reduced mobile padding from pb-32 to pb-12 and added slight pt-8 for balance */}
            <section id="home" className="relative overflow-hidden bg-black" style={{ paddingTop: "clamp(80px, 8vw, 110px)" }}>

                <div className="absolute inset-0 bg-black pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] rounded-full blur-[160px]" style={{ background: "rgba(217,119,6,0.07)" }} />
                    <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] rounded-full blur-[150px]" style={{ background: "rgba(251,191,36,0.05)" }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full blur-[130px]" style={{ background: "rgba(180,90,0,0.04)" }} />
                    <div className="absolute inset-0 opacity-[0.025]"
                        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
                </div>

                <style>{`
          .rev-particle {
            position: absolute; width: 4px; height: 4px; background: #FBB024;
            border-radius: 50%; opacity: 0; pointer-events: none;
            animation: revParticleFloat 0.9s ease-out forwards;
            filter: drop-shadow(0 0 6px rgba(251,176,36,0.8));
          }
          .rev-particle.particle-1 { top: -2px;    left: -2px;  animation-delay: 0s;    }
          .rev-particle.particle-2 { top: -2px;    right: -2px; animation-delay: 0.06s; }
          .rev-particle.particle-3 { bottom: -2px; left: -2px;  animation-delay: 0.12s; }
          .rev-particle.particle-4 { bottom: -2px; right: -2px; animation-delay: 0.18s; }
          @keyframes revParticleFloat {
            0%   { opacity: 1;   transform: translate(0,  0px) scale(1);    }
            70%  { opacity: 0.8; transform: translate(0, -10px) scale(1.15);}
            100% { opacity: 0;   transform: translate(0, -18px) scale(0.6); }
          }
          @media (max-width: 640px) {
            .revenue-container     { flex-direction: row !important; gap: 0.5rem !important; align-items: baseline !important; justify-content: center !important; }
            .hero-badge            { margin-top: 0 !important; margin-bottom: 0.5rem !important; padding: 0.5rem 1rem !important; }
            .hero-title-shell      { margin-bottom: 0.5rem !important; }
            .revenue-number        { font-size: 2.5rem !important; }
            .hero-gsap-card-mobile { min-height: auto !important; max-height: none !important; width: 95% !important; max-width: 380px !important; padding: 1rem 0.5rem !important; }
            .hero-animate          { margin-top: 0.5rem !important; margin-bottom: 0.5rem !important; }
          }
          @media (max-width: 375px) { .hero-gsap-card-mobile { min-height: auto !important; } }
          @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
        `}</style>

                <div className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center py-8 md:py-0">
                    <div className="container mx-auto px-4 relative z-10">

                        {/* Tablet 2×2 */}
                        <div className="hidden lg:flex lg:grid xl:hidden grid-cols-2 gap-4 mb-6 max-w-xl mx-auto z-20 justify-items-center">
                            <FloatingCarousel data={mustHaveData} position="" delay={0} animationType="slide" currentIndex={carouselIndex} isAnimating={isAnimating} />
                            <FloatingCarousel data={toolsData} position="" delay={0} animationType="fade" currentIndex={carouselIndex} isAnimating={isAnimating} />
                            <FloatingCarousel data={paymentData} position="" delay={0} animationType="scale" currentIndex={carouselIndex} isAnimating={isAnimating} />
                            <FloatingCarousel data={marketingData} position="" delay={0} animationType="slide" currentIndex={carouselIndex} isAnimating={isAnimating} />
                        </div>

                        {/* XL corners */}
                        <div className="hidden xl:block absolute inset-0 pointer-events-none">
                            <div
                                className="absolute top-0 bottom-0 left-0 flex flex-col justify-between gap-4 py-20 pointer-events-auto z-20"
                                style={{ transform: "translate(24%, 0%)" }}
                            >
                                <div style={{ transform: "rotate(-4deg)" }}>
                                    <FloatingCarousel data={mustHaveData} position="" delay={0} animationType="pulse" currentIndex={carouselIndex} isAnimating={isAnimating} />
                                </div>
                                <div style={{ transform: "rotate(-4deg)" }}>
                                    <FloatingCarousel data={paymentData} position="" delay={0} animationType="heartbeat" currentIndex={carouselIndex} isAnimating={isAnimating} />
                                </div>
                            </div>
                            <div
                                className="absolute top-0 bottom-0 right-0 flex flex-col justify-between gap-4 py-20 pointer-events-auto z-20"
                                style={{ transform: "translate(-24%, 0%)" }}
                            >
                                <div style={{ transform: "rotate(4deg)" }}>
                                    <FloatingCarousel data={toolsData} position="" delay={0} animationType="driftX" currentIndex={carouselIndex} isAnimating={isAnimating} />
                                </div>
                                <div style={{ transform: "rotate(4deg)" }}>
                                    <FloatingCarousel data={marketingData} position="" delay={0} animationType="pulse" currentIndex={carouselIndex} isAnimating={isAnimating} />
                                </div>
                            </div>
                        </div>

                        {/* Hero card */}
                        <HeroGsapCard>
                            <div className="relative max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 hero-gsap-card-mobile">
                                <div className="text-center max-w-4xl mx-auto pt-0">

                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-amber-500/30 bg-amber-500/10 mb-3 md:mb-4 hero-badge">
                                        <span className="text-xs md:text-sm text-amber-200 tracking-widest font-medium">
                                            <span className="inline md:hidden">WELCOME TO<br />GOVINDANI INFOTECH</span>
                                            <span className="hidden md:inline">WELCOME TO GOVINDANI INFOTECH</span>
                                        </span>
                                    </div>

                                    {/* Counter starts at 28 Cr, ₹ symbol EXACTLY as original */}
                                    <div className="relative block hero-title-shell mb-2 md:mb-3">
                                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-2 revenue-container flex flex-row items-baseline justify-center gap-1 sm:gap-2 md:gap-3">
                                            <span ref={revenueRef} className="relative inline-flex items-center text-white revenue-number">
                                                <span className="relative whitespace-nowrap">
                                                    {revenue.toLocaleString("en-IN")}
                                                    <span ref={sparkleRef} className="pointer-events-none absolute inset-0" />
                                                </span>
                                            </span>
                                            {/* ₹ symbol identical to original */}
                                            <span className="relative flex-shrink-0">
                                                <span className="absolute inset-0 rounded-full bg-amber-500/8 blur-md animate-pulse" />
                                                <span className="relative text-amber-400">₹</span>
                                            </span>
                                        </h1>
                                    </div>

                                    {/* Center content quote from screenshot, white text */}
                                    <div className="relative mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto px-2 sm:px-0">
                                        <p className="text-base sm:text-lg md:text-xl leading-snug text-center space-y-1">
                                            <span className="block">
                                                <span ref={firstLineRef} className="font-bold text-white transition-all duration-300">
                                                    &ldquo;Every dollar raised here is proof
                                                </span>
                                            </span>
                                            <span className="block">
                                                <span className="font-bold text-white">of a system that works</span>
                                            </span>
                                            <span className="block">
                                                <span ref={lastLineRef} className="font-medium text-white transition-all duration-300">
                                                    for NGOs that want predictable, sustainable funding.&rdquo;
                                                </span>
                                            </span>
                                        </p>
                                    </div>

                                    {/* Buttons */}


                                </div>
                            </div>
                        </HeroGsapCard>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NgoHeroSection;
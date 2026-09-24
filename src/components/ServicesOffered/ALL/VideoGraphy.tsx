import { useEffect, useRef, useState } from "react";
import ServiceSection from "@/components/ServicesSection";
import ContactUsForm from "@/pages/ContactUsForm";
import SEO from "@/components/SEO";
import { pageSEO } from "@/seo/pageSEO";

// ── Hooks ──────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, inView };
}

const gold = "linear-gradient(135deg,#f5c842 0%,#fff8dc 50%,#c8952a 100%)";
const goldText: React.CSSProperties = {
    background: gold,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
};
const headingStyle: React.CSSProperties = {
    fontFamily: "'Baskerville', 'Libre Baskerville', Georgia, serif",
    fontSize: "18px",
    fontWeight: 700,
    letterSpacing: "0.04em",
    ...goldText,
};
const bodyFont: React.CSSProperties = {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
};
const sectionPad: React.CSSProperties = { paddingTop: "10px", paddingBottom: "20px" };

interface FadeProps {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "left" | "right" | "none";
    className?: string;
    style?: React.CSSProperties;
}
function Fade({ children, delay = 0, direction = "up", className = "", style = {} }: FadeProps) {
    const { ref, inView } = useInView();
    const translateMap = { up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)", none: "none" };
    return (
        <div ref={ref} className={className} style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : translateMap[direction],
            transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
            ...style,
        }}>
            {children}
        </div>
    );
}

function GoldLine() {
    return (
        <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 20px" }}>
            <div style={{ width: 80, height: 2, background: gold, borderRadius: 2 }} />
        </div>
    );
}

function SectionLabel({ text }: { text: string }) {
    return (
        <p style={{ ...bodyFont, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", ...goldText, marginBottom: 6 }}>
            {text}
        </p>
    );
}

function FeatureBadge({ icon, text }: { icon: string; text: string }) {
    const [hov, setHov] = useState(false);
    return (
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 16px", borderRadius: 10,
            border: hov ? "1px solid #f5c842" : "1px solid rgba(245,200,66,0.25)",
            background: hov ? "rgba(245,200,66,0.07)" : "rgba(255,255,255,0.03)",
            transition: "all 0.3s ease", marginBottom: 10, cursor: "default",
        }}>
            <span style={{ fontSize: 16 }}>{icon}</span>
            <span style={{ ...bodyFont, color: "#e8d98a", fontSize: 13 }}>{text}</span>
        </div>
    );
}

function IconCircle({ icon }: { icon: string }) {
    return (
        <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "linear-gradient(135deg,rgba(245,200,66,0.2),rgba(200,149,42,0.1))",
            border: "1.5px solid rgba(245,200,66,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, marginBottom: 14, flexShrink: 0,
        }}>
            {icon}
        </div>
    );
}

function BenefitCard({ icon, title, desc, delay = 0 }: { icon: string; title: string; desc: string; delay?: number }) {
    const [hov, setHov] = useState(false);
    return (
        <Fade delay={delay} direction="up">
            <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
                padding: "24px 20px", borderRadius: 16, textAlign: "center",
                border: hov ? "1px solid #f5c842" : "1px solid rgba(245,200,66,0.15)",
                background: hov ? "rgba(245,200,66,0.06)" : "rgba(255,255,255,0.02)",
                transform: hov ? "translateY(-6px)" : "none",
                transition: "all 0.35s ease",
                boxShadow: hov ? "0 12px 32px rgba(245,200,66,0.12)" : "none",
            }}>
                <div style={{ display: "flex", justifyContent: "center" }}><IconCircle icon={icon} /></div>
                <p style={{ ...headingStyle, marginBottom: 8 }}>{title}</p>
                <p style={{ ...bodyFont, color: "#8a7a4a", fontSize: 13, lineHeight: 1.6 }}>{desc}</p>
            </div>
        </Fade>
    );
}

function ServiceCard({ icon, title, points, delay = 0 }: { icon: string; title: string; points: string[]; delay?: number }) {
    const [hov, setHov] = useState(false);
    return (
        <Fade delay={delay} direction="up">
            <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
                padding: "28px 24px", borderRadius: 16,
                border: hov ? "1px solid #f5c842" : "1px solid rgba(245,200,66,0.15)",
                background: hov ? "rgba(245,200,66,0.05)" : "rgba(255,255,255,0.02)",
                transform: hov ? "translateY(-6px)" : "none",
                transition: "all 0.35s ease",
                boxShadow: hov ? "0 16px 40px rgba(245,200,66,0.1)" : "none",
            }}>
                <div style={{ display: "flex", justifyContent: "center" }}><IconCircle icon={icon} /></div>
                <p style={{ ...headingStyle, marginBottom: 14, textAlign: "center" }}>{title}</p>
                {points.map((pt, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                        <span style={{ color: "#f5c842", fontSize: 14, marginTop: 1 }}>✦</span>
                        <span style={{ ...bodyFont, color: "#ffffff", fontWeight: 500, fontSize: 13, lineHeight: 1.5 }}>{pt}</span>
                    </div>
                ))}
            </div>
        </Fade>
    );
}

function FactorCard({ icon, title, points, delay = 0 }: { icon: string; title: string; points: string[]; delay?: number }) {
    const [hov, setHov] = useState(false);
    return (
        <Fade delay={delay} direction="up">
            <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
                padding: "24px 20px", borderRadius: 14,
                border: hov ? "1px solid #f5c842" : "1px solid rgba(245,200,66,0.12)",
                background: hov ? "rgba(245,200,66,0.05)" : "rgba(255,255,255,0.02)",
                transform: hov ? "translateY(-4px)" : "none",
                transition: "all 0.35s ease",
            }}>
                <IconCircle icon={icon} />
                <p style={{ ...headingStyle, marginBottom: 12 }}>{title}</p>
                {points.map((pt, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                        <span style={{ color: "#f5c842", fontSize: 12, marginTop: 2 }}>◆</span>
                        <span style={{ ...bodyFont, color: "#ffffff", fontWeight: 500, fontSize: 12, lineHeight: 1.5 }}>{pt}</span>
                    </div>
                ))}
            </div>
        </Fade>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// YouTube Shorts Icon Component (using PNG image)
// ══════════════════════════════════════════════════════════════════════════════
function YouTubeShortsIcon({ size = 32 }: { size?: number }) {
    return (
        <img 
            src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/youtubeshort33.webp" 
            alt="YouTube Shorts"
            style={{ 
                width: size, 
                height: size * 0.7,
                objectFit: "contain"
            }}
        />
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// VIDEO SHOWCASE (CUSTOM MP4 PLAYER)
// ══════════════════════════════════════════════════════════════════════════════
interface VideoItem {
    id: string;
    title: string;
    category: string;
    src: string;
    poster: string;
    youtubeUrl: string;
}

interface SlotConfig {
    tx: number; tz: number; ry: number; scale: number; opacity: number; zIndex: number; diagY: number;
}

// Extended slot configs to support up to 5 visible cards on each side (total ~10 visible)
function getSlotConfig(slotOffset: number): SlotConfig {
    const configs: Record<number, SlotConfig> = {
        [-5]: { tx: -1000, tz: -380, ry: 60, scale: 0.35, opacity: 0.0, zIndex: 0, diagY: 90 },
        [-4]: { tx: -800, tz: -300, ry: 50, scale: 0.42, opacity: 0.15, zIndex: 1, diagY: 70 },
        [-3]: { tx: -590, tz: -240, ry: 38, scale: 0.54, opacity: 0.30, zIndex: 2, diagY: 52 },
        [-2]: { tx: -390, tz: -150, ry: 26, scale: 0.67, opacity: 0.50, zIndex: 3, diagY: 34 },
        [-1]: { tx: -210, tz: -55, ry: 15, scale: 0.82, opacity: 0.78, zIndex: 4, diagY: 16 },
        [0]:  { tx: 0,    tz: 0,    ry: 0,  scale: 1,    opacity: 1,    zIndex: 10, diagY: 0  },
        [1]:  { tx: 210,  tz: -55,  ry: -15, scale: 0.82, opacity: 0.78, zIndex: 4, diagY: 16 },
        [2]:  { tx: 390,  tz: -150, ry: -26, scale: 0.67, opacity: 0.50, zIndex: 3, diagY: 34 },
        [3]:  { tx: 590,  tz: -240, ry: -38, scale: 0.54, opacity: 0.30, zIndex: 2, diagY: 52 },
        [4]:  { tx: 800,  tz: -300, ry: -50, scale: 0.42, opacity: 0.15, zIndex: 1, diagY: 70 },
        [5]:  { tx: 1000, tz: -380, ry: -60, scale: 0.35, opacity: 0.0,  zIndex: 0, diagY: 90 },
    };
    const abs = Math.abs(slotOffset);
    if (abs > 5) return { tx: slotOffset > 0 ? 1200 : -1200, tz: -400, ry: slotOffset > 0 ? -65 : 65, scale: 0.3, opacity: 0, zIndex: 0, diagY: 100 };
    return configs[slotOffset] ?? configs[slotOffset > 0 ? 5 : -5];
}

// ── Arrow Button ───────────────────────────────────────────────────────────────
function ArrowBtn({ dir, onClick, isMobile }: { dir: "left" | "right"; onClick: () => void; isMobile: boolean }) {
    const [hov, setHov] = useState(false);
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                width: isMobile ? 48 : 52,
                height: isMobile ? 48 : 52,
                borderRadius: "50%",
                border: hov ? "1.5px solid #f5c842" : "1.5px solid rgba(245,200,66,0.4)",
                background: hov ? "rgba(245,200,66,0.18)" : "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
                color: "#f5c842",
                fontSize: isMobile ? 20 : 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: hov ? "0 0 20px rgba(245,200,66,0.35)" : "0 4px 16px rgba(0,0,0,0.5)",
                transform: hov ? "scale(1.1)" : "scale(1)",
                flexShrink: 0,
                padding: 0,
                lineHeight: 1,
            }}
            aria-label={dir === "left" ? "Previous" : "Next"}
        >
            {dir === "left" ? "‹" : "›"}
        </button>
    );
}

// Custom video player with autoplay WITH SOUND and bottom-right play/pause + YouTube Shorts icon
function VideoPlayer({ src, poster, isActive, autoPlay, onEnded, youtubeUrl }: {
    src: string; poster: string; isActive: boolean; autoPlay: boolean; onEnded: () => void; youtubeUrl: string;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);

    // Autoplay WITH SOUND when the video becomes active
    useEffect(() => {
        if (isActive && autoPlay && videoRef.current) {
            // Unmute for sound
            videoRef.current.muted = false;
            videoRef.current.play().catch(() => {
                // If autoplay with sound is blocked by browser, try muted first then unmute
                if (videoRef.current) {
                    videoRef.current.muted = true;
                    videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
                }
            });
        }
    }, [isActive, autoPlay]);

    // Pause and reset when no longer active
    useEffect(() => {
        if (!isActive && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [isActive]);

    // Track play/pause state
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        return () => {
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
        };
    }, []);

    const togglePlayPause = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.muted = false;
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    return (
        <div
            style={{ position: "relative", width: "100%", height: "100%", background: "#000" }}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                muted={false}
                loop={false}
                playsInline
                onEnded={onEnded}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            {/* YouTube Shorts icon — top-left corner, clickable */}
            <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "12px",
                    zIndex: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: showControls ? 1 : 0.75,
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                    transform: showControls ? "scale(1.1)" : "scale(1)",
                    cursor: "pointer",
                    textDecoration: "none",
                }}
            >
                <YouTubeShortsIcon size={36} />
            </a>

            {/* Custom play/pause button at bottom-right corner */}
            {(showControls || !isPlaying) && (
                <button
                    onClick={togglePlayPause}
                    style={{
                        position: "absolute",
                        bottom: "16px",
                        right: "16px",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "rgba(0,0,0,0.7)",
                        border: "1.5px solid rgba(245,200,66,0.6)",
                        color: "#f5c842",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        backdropFilter: "blur(4px)",
                        transition: "all 0.2s ease",
                        zIndex: 10,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.background = "rgba(245,200,66,0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "rgba(0,0,0,0.7)"; }}
                >
                    {isPlaying ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    )}
                </button>
            )}
        </div>
    );
}

function VideoShowcase({ isMobile, isTablet, videos }: {
    isMobile: boolean; isTablet: boolean; videos: VideoItem[];
}) {
    const N = videos.length;
    const [current, setCurrent] = useState(0);
    const [autoPlayActive, setAutoPlayActive] = useState(true);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const goNext = () => setCurrent(prev => (prev + 1) % N);
    const goPrev = () => setCurrent(prev => (prev - 1 + N) % N);
    const goTo = (idx: number) => {
        if (idx !== current) {
            setCurrent(((idx % N) + N) % N);
        }
    };

    // Auto-advance to next video after 7 seconds
    useEffect(() => {
        // Clear any existing timer
        if (autoAdvanceTimerRef.current) {
            clearTimeout(autoAdvanceTimerRef.current);
        }
        
        // Set new timer for 7 seconds
        autoAdvanceTimerRef.current = setTimeout(() => {
            goNext();
        }, 7000); // 7 seconds
        
        return () => {
            if (autoAdvanceTimerRef.current) {
                clearTimeout(autoAdvanceTimerRef.current);
            }
        };
    }, [current]); // Reset timer when current video changes

    // Ensure autoplay triggers on current change
    useEffect(() => {
        setAutoPlayActive(true);
    }, [current]);

    // Cleanup timers on unmount
    useEffect(() => {
        return () => { 
            if (timerRef.current) clearTimeout(timerRef.current);
            if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
        };
    }, []);

    const handleVideoEnded = () => {
        // Auto-advance to next video if video ends before 7 seconds
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(goNext, 800);
    };

    const stageH = isMobile ? "66vh" : isTablet ? 520 : 600;
    const phoneW = isMobile ? "55vw" : isTablet ? 220 : 260;
    const phoneH = isMobile ? "46vh" : isTablet ? 420 : 520;

    const getTransform = (cfg: SlotConfig) => {
        if (!isMobile) {
            return `translateX(${cfg.tx}px) translateZ(${cfg.tz}px) rotateY(${cfg.ry}deg) scale(${cfg.scale}) translateY(${cfg.diagY}px)`;
        }
        const txS = 0.62;
        const tzS = 0.40;
        const dyS = 0.45;
        return `translateX(${cfg.tx * txS}px) translateZ(${cfg.tz * tzS}px) rotateY(${cfg.ry}deg) scale(${cfg.scale}) translateY(${cfg.diagY * dyS}px)`;
    };

    return (
        <section style={{ padding: "40px 0 20px", width: "100%", overflow: "hidden", background: "#000" }}>
            {/* Header */}
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 20px 40px", textAlign: "center" }}>
                <Fade>
                    <SectionLabel text="Take A Look at Our Videography Projects" />
                    <h2 style={{ ...headingStyle, fontSize: isMobile ? 32 : 30, marginBottom: 12 }}>Our Videography</h2>
                    <GoldLine />
                    <p style={{ ...bodyFont, color: "#7a6a3a", fontSize: 14 }}>Premium visual stories crafted for impact</p>
                </Fade>
            </div>

            <style>{`
                @keyframes phone-pulse {
                    0%,100% { box-shadow: 0 28px 64px rgba(0,0,0,0.85), 0 0 0 0 rgba(245,200,66,0); }
                    50%     { box-shadow: 0 28px 64px rgba(0,0,0,0.85), 0 0 0 3px rgba(245,200,66,0.4); }
                }
            `}</style>

            <div style={{
                width: "100%",
                background: "linear-gradient(180deg,rgba(245,200,66,0.05) 0%,rgba(0,0,0,0) 50%,rgba(245,200,66,0.03) 100%)",
                borderTop: "1px solid rgba(245,200,66,0.12)",
                borderBottom: "1px solid rgba(245,200,66,0.12)",
                paddingTop: isMobile ? 30 : 20,
                paddingBottom: isMobile ? 40 : 40,
                position: "relative",
                overflow: "hidden",
                minHeight: isMobile ? "68vh" : "auto",
            }}>
                {/* Glow blob */}
                <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: isMobile ? 1100 : 700, height: isMobile ? 900 : 340,
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse,rgba(245,200,66,0.12) 0%,transparent 70%)",
                    pointerEvents: "none",
                }} />

                {/* Carousel stage */}
                <div style={{
                    position: "relative", width: "100%", height: stageH,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    perspective: "1400px",
                }}>
                    {videos.map((v, i) => {
                        let slotOffset = (i - current + N) % N;
                        if (slotOffset > N / 2) slotOffset -= N;
                        const cfg = getSlotConfig(slotOffset);
                        const isCenter = slotOffset === 0;

                        return (
                            <div
                                key={v.id}
                                onClick={() => !isCenter && goTo(i)}
                                style={{
                                    position: "absolute",
                                    bottom: isMobile ? 50 : 30,
                                    display: "flex", flexDirection: "column", alignItems: "center",
                                    transform: getTransform(cfg),
                                    opacity: cfg.opacity, zIndex: cfg.zIndex,
                                    transition: "transform 0.7s cubic-bezier(.23,1,.32,1), opacity 0.7s ease",
                                    cursor: isCenter ? "default" : "pointer",
                                }}
                            >
                                <div style={{
                                    width: phoneW, height: phoneH, background: "#111",
                                    borderRadius: isMobile ? 40 : 32,
                                    border: isCenter ? "3px solid rgba(245,200,66,0.65)" : "2.5px solid #3a3a3a",
                                    overflow: "hidden", position: "relative",
                                    boxShadow: "0 0 0 1px rgba(255,255,255,0.06) inset, 0 28px 64px rgba(0,0,0,0.85)",
                                    animation: isCenter ? "phone-pulse 2.5s ease-in-out infinite" : "none",
                                    transition: "border-color 0.5s ease",
                                }}>
                                    {/* Gold bar */}
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: isMobile ? 4 : 3, background: gold, zIndex: 5 }} />
                                    {/* Notch */}
                                    <div style={{
                                        position: "absolute",
                                        top: isMobile ? 14 : 10,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: isMobile ? 72 : 52,
                                        height: isMobile ? 18 : 13,
                                        background: "#000", borderRadius: isMobile ? 14 : 8, zIndex: 10,
                                    }} />
                                    {/* Video content */}
                                    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#000" }}>
                                        {isCenter ? (
                                            <VideoPlayer
                                                src={v.src}
                                                poster={v.poster}
                                                isActive={isCenter}
                                                autoPlay={autoPlayActive}
                                                onEnded={handleVideoEnded}
                                                youtubeUrl={v.youtubeUrl}
                                            />
                                        ) : (
                                            // Non-center: poster + play overlay + YouTube Shorts icon (no text)
                                            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                                <img
                                                    src={v.poster}
                                                    alt={v.title}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                                {/* YouTube Shorts icon top-left — no text */}
                                                <a
                                                    href={v.youtubeUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={e => e.stopPropagation()}
                                                    style={{
                                                        position: "absolute",
                                                        top: "20px",
                                                        left: "10px",
                                                        zIndex: 15,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        cursor: "pointer",
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <YouTubeShortsIcon size={28} />
                                                </a>

                                                {/* Play overlay — click to bring to center */}
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        goTo(i);
                                                    }}
                                                    style={{
                                                        position: "absolute", inset: 0,
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        background: "rgba(0,0,0,0.3)",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <div style={{
                                                        width: 48, height: 48, borderRadius: "50%",
                                                        background: "rgba(0,0,0,0.7)",
                                                        border: "2px solid rgba(245,200,66,0.6)",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                    }}>
                                                        <div style={{
                                                            width: 0, height: 0,
                                                            borderTop: "9px solid transparent",
                                                            borderBottom: "9px solid transparent",
                                                            borderLeft: "15px solid #f5c842",
                                                            marginLeft: 4,
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {/* Label overlay — bottom of card */}
                                    <div style={{
                                        position: "absolute", bottom: 0, left: 0, right: 0,
                                        background: "linear-gradient(0deg,rgba(0,0,0,0.95) 0%,transparent 100%)",
                                        padding: isMobile ? "40px 10px 14px" : "32px 12px 12px",
                                        zIndex: 6, pointerEvents: "none",
                                    }}>
                                        <p style={{ ...bodyFont, fontSize: isMobile ? 8 : 8, letterSpacing: "0.14em", textTransform: "uppercase", ...goldText, margin: "0 0 4px", fontWeight: 600 }}>
                                            {v.category}
                                        </p>
                                        <p style={{ fontFamily: "'Baskerville',serif", fontSize: isMobile ? 10 : 11, fontWeight: 700, ...goldText, margin: 0, lineHeight: 1.3 }}>
                                            {v.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Arrows */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: isMobile ? 20 : 16,
                    marginTop: isMobile ? 20 : 24,
                    position: "relative",
                    zIndex: 20,
                    padding: "0 20px",
                }}>
                    <ArrowBtn dir="left" onClick={goPrev} isMobile={isMobile} />
                    <ArrowBtn dir="right" onClick={goNext} isMobile={isMobile} />
                </div>
            </div>
        </section>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function VideographyPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    useEffect(() => {
        const check = () => {
            setIsMobile(window.innerWidth < 640);
            setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
        };
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const cols = (desktop: number, tablet: number, mobile: number) =>
        isMobile ? mobile : isTablet ? tablet : desktop;
    const grid = (n: number): React.CSSProperties => ({
        display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, gap: 20,
    });

    const videos: VideoItem[] = [
        { id: "ci-grand",    title: "",  category: "", src: "/Videos/Video1.mp4",  poster: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/thumb1.avif",    youtubeUrl: "https://youtube.com/shorts/hMpvTUhHP8E?si=snNftdYetfhoVBuO" },
        { id: "the-park",    title: "",  category: "", src: "/Videos/Video2.mp4",  poster: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/thumb2.avif",    youtubeUrl: "https://youtube.com/shorts/iPRuQtJe3jk?si=pVhI2b8OU6PcSQlV" },
        { id: "corporate",   title: "",  category: "", src: "/Videos/Video3.mp4",  poster: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/thumb3.avif",   youtubeUrl: "https://youtube.com/shorts/CtKBFYfnMgg?si=LLGaPPoAd88PuIA4" },
        { id: "product",     title: "",  category: "", src: "/Videos/Video4.mp4",  poster: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/thumb4.avif",     youtubeUrl: "https://youtube.com/shorts/13d_KJCztYU?si=uPnNYjjy520HNSZ8" },
        { id: "event",       title: "",  category: "", src: "/Videos/Video5.mp4",  poster: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/thumb5.avif",       youtubeUrl: "https://youtube.com/shorts/0Gq506qP8cM?si=lUqG9qdJvPHza21_" },
        { id: "promo",       title: "",  category: "", src: "/Videos/Video6.mp4",  poster: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/thumb6.avif",       youtubeUrl: "https://youtube.com/shorts/cqo7edWAiC4?si=2n13kY4owJSFVzvN" },
        { id: "ad-campaign", title: "",  category: "", src: "/Videos/Video7.mp4",  poster: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/thumb7.avif", youtubeUrl: "https://youtube.com/shorts/Juzd0iPKf0k?si=ftBRWnqzSwNXRDKe" },
        { id: "brand-story", title: "",  category: "", src: "/Videos/Video8.mp4",  poster: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/thumb8.avif", youtubeUrl: "https://youtube.com/shorts/v4khBqIWcqE?si=Zh6XBkCn7CDuIEWS" },
        { id: "social-ad",   title: "",  category: "", src: "/Videos/Video9.mp4",  poster: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/thumb9.avif",   youtubeUrl: "https://youtube.com/shorts/lWf7c9S8Rbg?si=laehd1KdYUZLDFFZ" },
        { id: "product-ad",  title: "",  category: "", src: "/Videos/Video10.mp4", poster: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/thumb10.avif",  youtubeUrl: "https://youtube.com/shorts/h59dYiyvgAA?si=sIheq_3qsAZrczw_" },
    ];

    const benefits = [
        { icon: "🎯", title: "Boost Brand Awareness", desc: "Compelling visual stories that elevate your brand above the noise and embed it in memory." },
        { icon: "📈", title: "Increase Audience Engagement", desc: "Dynamic content that captivates and keeps audiences watching until the very last frame." },
        { icon: "💬", title: "Improve Communication", desc: "Convey your message with clarity and emotional resonance through the power of film." },
        { icon: "🚀", title: "Enhance Marketing Campaigns", desc: "Supercharge every marketing channel with premium video assets that convert." },
    ];

    const services = [
        {
            icon: "🎬", title: "Corporate Videos",
            points: ["Professional films that communicate your corporate message", "Develop engaging corporate films", "Enhance internal and external communication"],
        },
        {
            icon: "🎞", title: "Promotional Films",
            points: ["Eye-catching visuals that promote your brand and products", "Highlight unique selling points and benefits", "Create promotional content for marketing campaigns"],
        },
    ];

    const qualities = [
        {
            icon: "🌟", title: "Creative Vision",
            points: ["We offer innovative and creative solutions", "Distinct concepts that align with your brand's identity", "Unique storytelling techniques to engage your audience"],
        },
        {
            icon: "🤝", title: "Client-Centric Approach",
            points: ["We prioritise your vision and satisfaction", "Collaborative process to understand your needs", "Commitment to delivering exceptional quality and value"],
        },
    ];

    const factors = [
        {
            icon: "🏆", title: "Experience and Expertise",
            points: ["Look for a company with a proven track record in videography", "Check their portfolio and past projects", "Assess their experience in different types of videography"],
        },
        {
            icon: "🎨", title: "Creative Capability",
            points: ["Ensure the company offers innovative and creative abilities", "Ability to develop unique visual concepts", "Consider their storytelling techniques and approach"],
        },
        {
            icon: "🛠", title: "Support and Maintenance",
            points: ["Ensure the company offers ongoing support protocols", "Post-production support policies", "Confirm their availability for updates and revisions"],
        },
    ];

    const keyComponents = [
        "Creative Concept Development", "Engaging Storytelling and Visual Aesthetics",
        "Event Coverage", "Creative Storytelling", "Product Videos",
        "Social Media Videos", "UGC Ads", "Post-Production Services",
    ];

  return (
    <div style={{ background: "#000000", minHeight: "100vh", color: "#e8d98a", ...bodyFont, overflowX: "hidden" }}>
      <SEO {...pageSEO.videography} />
            <div style={{
                position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
                opacity: 0.4,
            }} />

            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <section style={{
                position: "relative", overflow: "hidden",
                paddingTop: isMobile ? "clamp(80px, 10vw, 100px)" : 120,
                paddingBottom: isMobile ? 56 : 72,
                paddingLeft: isMobile ? 24 : 48,
                paddingRight: isMobile ? 24 : 0,
                display: "flex", alignItems: "center",
                minHeight: isMobile ? "auto" : 600,
            }}>
                <div style={{ position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)", width: isMobile ? 300 : 580, height: isMobile ? 300 : 580, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,200,66,0.09) 0%,transparent 70%)", pointerEvents: "none",marginTop:100 }} />
                <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 0, alignItems: "center" }}>
                        <div style={{ paddingRight: isMobile ? 0 : 48, marginTop: isMobile ? 180 : 0 }}>
                            <Fade direction="left">
                                <p style={{ ...bodyFont, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", ...goldText, marginBottom: isMobile ? 20 : 16, display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ color: "#f5c842" }}>✦</span> VIDEOGRAPHY
                                </p>
                                <h1 style={{
                                    fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
                                    fontSize: isMobile ? 34 : isTablet ? 38 : 52,
                                    fontWeight: 700,
                                    lineHeight: 1.2,
                                    ...goldText,
                                    margin: isMobile ? "0 0 28px 0" : "0 0 22px 0",
                                }}>
                                    Capturing Moments,<br />Crafting Stories
                                </h1>
                                <p style={{ ...bodyFont, color: "#9a8a5a", fontSize: isMobile ? 14 : 15, lineHeight: 1.85, marginBottom: isMobile ? 40 : 36, maxWidth: 520 }}>
                                    Professional videography services that transform your vision into compelling visual stories. Whether it's for corporate events, promotional videos, or creative projects our team delivers high-quality video content tailored to your needs.
                                </p>
                                <div style={{
                                    display: "flex",
                                    gap: isMobile ? 16 : 14,
                                    flexDirection: isMobile ? "column" : "row",
                                    alignItems: isMobile ? "stretch" : "center",
                                }}>
                                    {/* <button style={{
                                        background: gold, color: "#000", border: "none", borderRadius: 8,
                                        padding: isMobile ? "16px 32px" : "13px 32px",
                                        fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 13,
                                        letterSpacing: "0.1em", cursor: "pointer",
                                        boxShadow: "0 4px 24px rgba(245,200,66,0.4)",
                                        transition: "transform 0.2s, box-shadow 0.2s",
                                        width: isMobile ? "100%" : "auto",
                                        textAlign: "center",
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(245,200,66,0.55)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(245,200,66,0.4)"; }}>
                                        GET STARTED
                                    </button> */}
                                    {/* <button style={{
                                        background: "transparent", color: "#f5c842",
                                        border: "1.5px solid rgba(245,200,66,0.5)", borderRadius: 8,
                                        padding: isMobile ? "16px 32px" : "13px 32px",
                                        fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13,
                                        letterSpacing: "0.1em", cursor: "pointer",
                                        transition: "all 0.25s",
                                        width: isMobile ? "100%" : "auto",
                                        textAlign: "center",
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,200,66,0.08)"; e.currentTarget.style.borderColor = "#f5c842"; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(245,200,66,0.5)"; }}>
                                        VIEW PORTFOLIO
                                    </button> */}
                                </div>
                            </Fade>
                        </div>
                        <Fade direction="right" delay={0.2}>
                            <div style={{ width: "100%", height: isMobile ? 280 : 460, borderRadius: isMobile ? 16 : "16px 0 0 16px", overflow: "hidden" }}>
                                <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/video2.webp" alt="Videography" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}  loading="lazy" decoding="async" />
                            </div>
                        </Fade>
                    </div>
                </div>
            </section>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(245,200,66,0.4),transparent)" }} />
            </div>

            {/* ── ABOUT ────────────────────────────────────────────────────── */}
            <section style={{ ...sectionPad, padding: "10px 20px 20px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: isMobile ? 32 : 60, alignItems: "start" }}>
                        <Fade direction="left">
                            <div>
                                <SectionLabel text="About Videography" />
                                <h2 style={{ ...headingStyle, fontSize: 22, marginBottom: 16 }}>Know About Videography</h2>
                                <GoldLine />
                                <p style={{ ...bodyFont, color: "#9a8a5a", fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
                                    In the digital age, video content has become a powerful tool for engaging audiences and conveying messages effectively. At Govindani Infotech Pvt. Ltd., we specialise in creating compelling video content that resonates with your target audience. Our videography services encompass a wide range of solutions, from corporate videos and promotional films to event coverage and creative storytelling.
                                </p>
                                <p style={{ ...bodyFont, color: "#9a8a5a", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
                                    We employ state-of-the-art equipment and cutting-edge techniques to ensure your videos stand out. Our team of experienced videographers and editors work closely with you to understand your objectives, develop a creative concept, and produce videos that align with your brand's vision.
                                </p>
                                <h3 style={{ ...headingStyle, marginBottom: 16 }}>Key Components of Our Videography Services:</h3>
                                <div style={{ ...grid(cols(2, 2, 1)) }}>
                                    {keyComponents.map((item) => (
                                        <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                                            <span style={{ color: "#f5c842", fontSize: 12, marginTop: 3 }}>✦</span>
                                            <span style={{ ...bodyFont, color: "#9a8a5a", fontSize: 13 }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Fade>
                        <Fade direction="right" delay={0.15}>
                            <div style={{ border: "1.5px solid rgba(245,200,66,0.25)", borderRadius: 16, padding: 24, background: "rgba(245,200,66,0.03)", position: "sticky", top: 20 }}>
                                <div style={{ height: 3, background: gold, borderRadius: 2, marginBottom: 20 }} />
                                <p style={{ ...headingStyle, fontSize: 16, marginBottom: 16 }}>Feature</p>
                                {[["🏅", "High-Quality Production"], ["💡", "Creative Concepts"], ["✂️", "Professional Editing"], ["🎯", "Customised Solutions"], ["📡", "Comprehensive Coverage"]].map(([icon, text]) => (
                                    <FeatureBadge key={text} icon={icon} text={text} />
                                ))}
                            </div>
                        </Fade>
                    </div>
                </div>
            </section>

            {/* ── VIDEO SHOWCASE ───────────────────────────────────────────── */}
            <VideoShowcase isMobile={isMobile} isTablet={isTablet} videos={videos} />

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(245,200,66,0.3),transparent)" }} />
            </div>

            {/* ── BENEFITS ─────────────────────────────────────────────────── */}
            <section style={{ padding: "10px 20px 20px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <Fade>
                        <div style={{ textAlign: "center", marginBottom: 36 }}>
                            <SectionLabel text="How Videography Helps You" />
                            <h2 style={{ ...headingStyle, fontSize: 22, marginBottom: 6 }}>Enhance Your Marketing and Engagement<br />with Professional Videography</h2>
                            <GoldLine />
                        </div>
                    </Fade>
                    <div style={{ ...grid(cols(4, 2, 1)) }}>
                        {benefits.map((b, i) => <BenefitCard key={b.title} {...b} delay={i * 0.1} />)}
                    </div>
                </div>
            </section>

            {/* ══ SERVICES ════════════════════════════════════════════════════ */}
            <section style={{ padding: "10px 20px 20px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <Fade direction="none">
                        <div style={{
                            borderRadius: 20, overflow: "hidden",
                            border: "1.5px solid rgba(245,200,66,0.2)",
                            background: "linear-gradient(135deg, rgba(0,0,0,0.92), rgba(0,0,0,0.95)), url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/videography1.webp')",
                            backgroundSize: "cover", backgroundPosition: "center",
                            backgroundBlendMode: "overlay",
                            padding: isMobile ? "32px 20px" : "48px 60px",
                            position: "relative",
                        }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.82)", zIndex: 0, borderRadius: 20 }} />
                            <div style={{ position: "relative", zIndex: 1 }}>
                                <div style={{ marginBottom: 32 }}>
                                    <SectionLabel text="Our Services" />
                                    <h2 style={{ ...headingStyle, fontSize: 22 }}>What Is Included In Our<br />Videography Services?</h2>
                                    <GoldLine />
                                </div>
                                <div style={{ ...grid(cols(2, 2, 1)) }}>
                                    {services.map((s, i) => <ServiceCard key={s.title} {...s} delay={i * 0.15} />)}
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
            </section>

            {/* ── WHY CHOOSE US ────────────────────────────────────────────── */}
            <section style={{ padding: "10px 20px 20px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <Fade>
                        <div style={{ textAlign: "center", marginBottom: 36 }}>
                            <SectionLabel text="Why Choose Our Videography Services?" />
                            <h2 style={{ ...headingStyle, fontSize: 22, marginBottom: 6 }}>Exceptional Quality and Creative Excellence</h2>
                            <GoldLine />
                        </div>
                    </Fade>
                    <div style={{ ...grid(cols(2, 2, 1)) }}>
                        {qualities.map((q, i) => <ServiceCard key={q.title} {...q} delay={i * 0.15} />)}
                    </div>
                </div>
            </section>

            {/* ── FACTORS ──────────────────────────────────────────────────── */}
            <section style={{ padding: "10px 20px 20px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <Fade direction="none">
                        <div style={{ borderRadius: 20, background: "linear-gradient(135deg,rgba(245,200,66,0.05),rgba(0,0,0,0.7))", border: "1.5px solid rgba(245,200,66,0.15)", padding: isMobile ? "32px 20px" : "48px 60px", position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,200,66,0.07),transparent 70%)", pointerEvents: "none" }} />
                            <div style={{ marginBottom: 32 }}>
                                <SectionLabel text="Evaluation Criteria" />
                                <h2 style={{ ...headingStyle, fontSize: 22 }}>Factors to Evaluate in Your<br />Search for the Service of Videography</h2>
                                <GoldLine />
                            </div>
                            <div style={{ ...grid(cols(3, 2, 1)) }}>
                                {factors.map((f, i) => <FactorCard key={f.title} {...f} delay={i * 0.12} />)}
                            </div>
                        </div>
                    </Fade>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────────────────── */}
            <section style={{ padding: "10px 20px 20px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <Fade direction="up">
                        <div style={{
                            borderRadius: 20,
                            background: "linear-gradient(135deg,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.92) 100%), url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/videography1.webp')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundBlendMode: "overlay",
                            border: "1.5px solid rgba(245,200,66,0.35)",
                            padding: isMobile ? "40px 24px" : "60px 80px",
                            textAlign: "center",
                            position: "relative",
                            overflow: "hidden",
                            boxShadow: "0 0 60px rgba(245,200,66,0.08)",
                        }}>
                            <div style={{
                                position: "absolute", inset: 0, borderRadius: 20,
                                background: "rgba(0,0,0,0.72)",
                                zIndex: 0,
                            }} />
                            <div style={{ position: "relative", zIndex: 1 }}>
                                <div style={{
                                    position: "absolute", top: "50%", left: "50%",
                                    transform: "translate(-50%,-50%)",
                                    width: 400, height: 400, borderRadius: "50%",
                                    background: "radial-gradient(circle,rgba(245,200,66,0.06),transparent 70%)",
                                    pointerEvents: "none",
                                }} />
                                <SectionLabel text="Ready to Begin?" />
                                <h2 style={{ ...headingStyle, fontSize: isMobile ? 22 : 28, marginBottom: 14 }}>
                                    Let's Tell Your Story Together
                                </h2>
                                <p style={{ ...bodyFont, color: "#9a8a5a", fontSize: 14, lineHeight: 1.8, maxWidth: 520, margin: "0 auto 32px" }}>
                                    Partner with our expert videography team to create content that captures
                                    attention, builds trust, and drives results for your brand.
                                </p>
                                <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                                    {/* <button
                                        style={{ padding: "14px 40px", background: gold, border: "none", borderRadius: 10, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.1em", color: "#000", cursor: "pointer", boxShadow: "0 6px 24px rgba(245,200,66,0.4)", transition: "transform 0.2s, box-shadow 0.2s" }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(245,200,66,0.5)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(245,200,66,0.4)"; }}>
                                        GET STARTED TODAY
                                    </button> */}
                                    {/* <button
                                        style={{ padding: "14px 40px", background: "transparent", border: "1.5px solid rgba(245,200,66,0.5)", borderRadius: 10, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.1em", color: "#f5c842", cursor: "pointer", transition: "all 0.25s" }}
                                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,200,66,0.1)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                                        CONTACT US
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
            </section>
            <div style={{ height: 40 }} />
            <ContactUsForm/>
            <ServiceSection />
        </div>
    );
}
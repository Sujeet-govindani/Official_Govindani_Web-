import { useEffect, useRef, useState } from "react";
import ServiceSection from "@/components/HomePage/ServicesSection";
import ContactUsForm from "@/pages/ContactUsForm";

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
    fontFamily: "'Libre Baskerville', 'Baskerville', Georgia, serif",
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



function SectionLabel({ text }: { text: string }) {
    return (
        <p style={{ ...bodyFont, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", ...goldText, marginBottom: 6 }}>
            {text}
        </p>
    );
}







// ══════════════════════════════════════════════════════════════════════════════
// YouTube Shorts Icon Component (using PNG image)
// ══════════════════════════════════════════════════════════════════════════════
function YouTubeShortsIcon({ size = 32 }: { size?: number }) {
    return (
        <img
            src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Youtubeshort33.png"
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
        [-5]: { tx: -1200, tz: -380, ry: 60, scale: 0.35, opacity: 0.0, zIndex: 0, diagY: 90 },
        [-4]: { tx: -960, tz: -300, ry: 50, scale: 0.42, opacity: 0.15, zIndex: 1, diagY: 70 },
        [-3]: { tx: -720, tz: -240, ry: 38, scale: 0.54, opacity: 0.30, zIndex: 2, diagY: 52 },
        [-2]: { tx: -480, tz: -150, ry: 26, scale: 0.67, opacity: 0.50, zIndex: 3, diagY: 34 },
        [-1]: { tx: -260, tz: -55, ry: 15, scale: 0.82, opacity: 0.78, zIndex: 4, diagY: 16 },
        [0]: { tx: 0, tz: 0, ry: 0, scale: 1, opacity: 1, zIndex: 10, diagY: 0 },
        [1]: { tx: 260, tz: -55, ry: -15, scale: 0.82, opacity: 0.78, zIndex: 4, diagY: 16 },
        [2]: { tx: 480, tz: -150, ry: -26, scale: 0.67, opacity: 0.50, zIndex: 3, diagY: 34 },
        [3]: { tx: 720, tz: -240, ry: -38, scale: 0.54, opacity: 0.30, zIndex: 2, diagY: 52 },
        [4]: { tx: 960, tz: -300, ry: -50, scale: 0.42, opacity: 0.15, zIndex: 1, diagY: 70 },
        [5]: { tx: 1200, tz: -380, ry: -60, scale: 0.35, opacity: 0.0, zIndex: 0, diagY: 90 },
    };
    const abs = Math.abs(slotOffset);
    if (abs > 5) return { tx: slotOffset > 0 ? 1400 : -1400, tz: -400, ry: slotOffset > 0 ? -65 : 65, scale: 0.3, opacity: 0, zIndex: 0, diagY: 100 };
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

// Custom video player with autoplay MUTED and bottom-right controls (mute/play) + YouTube Shorts icon
function VideoPlayer({ src, poster, isActive, autoPlay, onEnded, youtubeUrl }: {
    src: string; poster: string; isActive: boolean; autoPlay: boolean; onEnded: () => void; youtubeUrl: string;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true); // Always start muted
    const [showControls, setShowControls] = useState(false);

    // Autoplay MUTED when the video becomes active
    useEffect(() => {
        if (isActive && autoPlay && videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        }
    }, [isActive, autoPlay]);

    // Pause and reset when no longer active
    useEffect(() => {
        if (!isActive && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [isActive]);

    // Track play/pause/mute state
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onVolumeChange = () => setIsMuted(video.muted);
        
        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        video.addEventListener('volumechange', onVolumeChange);
        
        return () => {
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
            video.removeEventListener('volumechange', onVolumeChange);
        };
    }, []);

    const togglePlayPause = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
    };

    const controlBtnStyle = {
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
                muted={isMuted}
                loop={false}
                playsInline
                onEnded={onEnded}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            {/* YouTube Shorts icon top-left corner, clickable */}
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

            {/* Custom controls at bottom-right corner */}
            {(showControls || !isPlaying) && (
                <div style={{
                    position: "absolute",
                    bottom: "16px",
                    right: "16px",
                    display: "flex",
                    gap: "10px",
                    zIndex: 10,
                }}>
                    <button
                        onClick={toggleMute}
                        style={controlBtnStyle}
                        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.background = "rgba(245,200,66,0.3)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "rgba(0,0,0,0.7)"; }}
                    >
                        {isMuted ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <line x1="23" y1="9" x2="17" y2="15" />
                                <line x1="17" y1="9" x2="23" y2="15" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={togglePlayPause}
                        style={controlBtnStyle}
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
                </div>
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
        if (autoAdvanceTimerRef.current) {
            clearTimeout(autoAdvanceTimerRef.current);
        }

        autoAdvanceTimerRef.current = setTimeout(() => {
            goNext();
        }, 7000);

        return () => {
            if (autoAdvanceTimerRef.current) {
                clearTimeout(autoAdvanceTimerRef.current);
            }
        };
    }, [current]);

    useEffect(() => {
        setAutoPlayActive(true);
    }, [current]);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
        };
    }, []);

    const handleVideoEnded = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(goNext, 800);
    };

    // INCREASED SIZES with proper spacing between cards
    const stageH = isMobile ? "75vh" : isTablet ? 650 : 750;
    const phoneW = isMobile ? "82vw" : isTablet ? 420 : 500;
    const phoneH = isMobile ? "62vh" : isTablet ? 540 : 620;

    // Adjusted spacing with gaps between cards - increased tx values for more separation
    const getTransform = (cfg: SlotConfig) => {
        if (!isMobile) {
            // Increased tx multiplier for more spacing between cards (1.4 for larger gap)
            const txScale = 1.4;
            const tzScale = 1.0;
            const dyScale = 0.9;
            return `translateX(${cfg.tx * txScale}px) translateZ(${cfg.tz * tzScale}px) rotateY(${cfg.ry}deg) scale(${cfg.scale}) translateY(${cfg.diagY * dyScale}px)`;
        }
        const txS = 0.7;
        const tzS = 0.4;
        const dyS = 0.45;
        return `translateX(${cfg.tx * txS}px) translateZ(${cfg.tz * tzS}px) rotateY(${cfg.ry}deg) scale(${cfg.scale}) translateY(${cfg.diagY * dyS}px)`;
    };

    return (
        <section style={{ padding: "40px 0 20px", width: "100%", overflow: "hidden", background: "#000" }}>
            {/* Header with NGO-focused heading */}
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 20px 40px", textAlign: "center" }}>
                <Fade>
                    <SectionLabel text="NGO Impact Stories" />
                    <h2 style={{ ...headingStyle, fontSize: isMobile ? 36 : 44, marginBottom: 12 }}>
                        Transforming Lives Through Visual Narratives
                    </h2>
                    <p style={{ ...bodyFont, color: "#b8a94e", fontSize: 15, maxWidth: 650, margin: "0 auto" }}>
                        Witness the real impact of our community-driven initiatives
                    </p>
                </Fade>
            </div>

            <div style={{
                width: "100%",
                background: "#000",
                borderTop: "1px solid rgba(245,200,66,0.12)",
                borderBottom: "1px solid rgba(245,200,66,0.12)",
                paddingTop: isMobile ? 40 : 30,
                paddingBottom: isMobile ? 50 : 50,
                position: "relative",
                overflow: "hidden",
                minHeight: isMobile ? "72vh" : "auto",
            }}>
                {/* Carousel stage */}
                <div style={{
                    position: "relative", width: "100%", height: stageH,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    perspective: "1800px",
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
                                    bottom: isMobile ? 60 : 40,
                                    display: "flex", flexDirection: "column", alignItems: "center",
                                    transform: getTransform(cfg),
                                    opacity: cfg.opacity, zIndex: cfg.zIndex,
                                    transition: "transform 0.7s cubic-bezier(.23,1,.32,1), opacity 0.7s ease",
                                    cursor: isCenter ? "default" : "pointer",
                                }}
                            >
                                <div style={{
                                    width: phoneW, height: phoneH, background: "#000",
                                    borderRadius: isMobile ? 40 : 32,
                                    border: isCenter ? "3px solid rgba(245,200,66,0.7)" : "2px solid #3a3a3a",
                                    overflow: "hidden", position: "relative",
                                    boxShadow: "0 0 0 1px rgba(255,255,255,0.06) inset, 0 30px 60px rgba(0,0,0,0.8)",
                                    animation: isCenter ? "phone-pulse 2.5s ease-in-out infinite" : "none",
                                    transition: "border-color 0.5s ease",
                                }}>
                                    {/* Notch */}
                                    <div style={{
                                        position: "absolute",
                                        top: isMobile ? 14 : 10,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: isMobile ? 70 : 50,
                                        height: isMobile ? 18 : 12,
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
                                            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                                <img
                                                    src={v.poster}
                                                    alt={v.title}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
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
                                                    <YouTubeShortsIcon size={30} />
                                                </a>

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
                                                        width: 52, height: 52, borderRadius: "50%",
                                                        background: "rgba(0,0,0,0.7)",
                                                        border: "2px solid rgba(245,200,66,0.6)",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                    }}>
                                                        <div style={{
                                                            width: 0, height: 0,
                                                            borderTop: "10px solid transparent",
                                                            borderBottom: "10px solid transparent",
                                                            borderLeft: "16px solid #f5c842",
                                                            marginLeft: 4,
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {/* Label overlay */}
                                    <div style={{
                                        position: "absolute", bottom: 0, left: 0, right: 0,
                                        background: "linear-gradient(0deg,rgba(0,0,0,0.95) 0%,transparent 100%)",
                                        padding: isMobile ? "45px 12px 16px" : "38px 12px 14px",
                                        zIndex: 6, pointerEvents: "none",
                                    }}>
                                        <p style={{ ...bodyFont, fontSize: isMobile ? 9 : 10, letterSpacing: "0.14em", textTransform: "uppercase", ...goldText, margin: "0 0 4px", fontWeight: 600 }}>
                                            {v.category}
                                        </p>
                                        <p style={{ fontFamily: "'Baskerville',serif", fontSize: isMobile ? 12 : 13, fontWeight: 700, ...goldText, margin: 0, lineHeight: 1.3 }}>
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
                    gap: isMobile ? 24 : 20,
                    marginTop: isMobile ? 30 : 32,
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
export default function NgoVideoShowcase() {
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

    const videos: VideoItem[] = [
        { id: "", title: "", category: "", src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Ngo-Videos/Ngo-Videography3.mp4", poster: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/thumbimg3.webp", youtubeUrl: "https://youtube.com/shorts/hMpvTUhHP8E?si=snNftdYetfhoVBuO" },
        { id: "", title: "", category: "", src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Ngo-Videos/Ngo-Videography2.mp4", poster: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/thumbimg2.webp", youtubeUrl: "https://youtube.com/shorts/iPRuQtJe3jk?si=pVhI2b8OU6PcSQlV" },
        { id: "", title: "", category: "", src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Services-VideoGraphy/Video2.mp4", poster: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/thumbimg4.webp", youtubeUrl: "https://youtube.com/shorts/CtKBFYfnMgg?si=LLGaPPoAd88PuIA4" },
    ];

    return (
        <div style={{ background: "#000", minHeight: "100vh", color: "#e8d98a", ...bodyFont, overflowX: "hidden" }}>
            {/* No background image - removed completely */}

            {/* ── VIDEO SHOWCASE ───────────────────────────────────────────── */}
            <VideoShowcase isMobile={isMobile} isTablet={isTablet} videos={videos} />

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                <div style={{ height: 1, background: "#000" }} />
            </div>
        </div>
    );
}
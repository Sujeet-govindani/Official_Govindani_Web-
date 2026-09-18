import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TrainTimeline from '@/components/TrainTimeline';
import '@/styles/train.css';
import '@/styles/aboutcompany.css';

/* ─── Social Icons ──────────────────────────────────────────────── */
const IG = () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>;
const FB = () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
const LI = () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
const YT = () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>;
const XICON = () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;

const SIcon = ({ t, u }: { t: string; u?: string }) => {
  const isLink = u && u !== "#";
  return (
    <a
      href={isLink ? u : "#"}
      className="ab-sicon"
      aria-label={t}
      target={isLink ? "_blank" : undefined}
      rel={isLink ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        if (!isLink) e.preventDefault();
      }}
    >
      {t === 'ig' && <IG />}{t === 'fb' && <FB />}
      {t === 'yt' && <YT />}
      {t === 'x' && <XICON />}
    </a>
  );
};

/* ─── Rotating Counter ─── */
function RotatingCounter({ to, suffix = '+', dur = 2200, on = false }: { to: number; suffix?: string; dur?: number; on?: boolean }) {
  const [display, setDisplay] = useState(0);
  const [rotating, setRotating] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!on) return;
    setRotating(true);
    let t0: number | null = null;
    const animate = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(eased * to));
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
      else { setDisplay(to); setRotating(false); }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [on, to, dur]);

  return (
    <span className={`rc-num${rotating ? ' rc-spinning' : ''}`}>
      {display.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

/* ─── Progress bar ─── */
function PBar({ idx, dur }: { idx: number; dur: number }) {
  const [w, setW] = useState(0);
  const r = useRef<number | null>(null);
  const s = useRef<number | null>(null);
  useEffect(() => {
    setW(0); s.current = null;
    if (r.current) cancelAnimationFrame(r.current);
    const go = (ts: number) => {
      if (!s.current) s.current = ts;
      const p = Math.min((ts - s.current) / dur, 1);
      setW(p * 100);
      if (p < 1) r.current = requestAnimationFrame(go);
    };
    r.current = requestAnimationFrame(go);
    return () => { if (r.current) cancelAnimationFrame(r.current); };
  }, [idx, dur]);
  return <div style={{ height: '100%', width: `${w}%`, background: 'linear-gradient(to right,#D4AF37,#FFD700)', borderRadius: 2 }} />;
}

const getInitials = (name: string) =>
  name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

/* ─── Rotating Canvas Globe ─── */
function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 340;
    canvas.width = size;
    canvas.height = size;
    const R = 148;
    const cx = size / 2;
    const cy = size / 2;

    const locs = [
      { name: 'India', lon: 78, lat: 22 },
      { name: 'USA', lon: -97, lat: 38 },
    ];

    let rotLon = 78;
    const rotY = -12;
    let activeIdx = 0;
    let lastSwitchTs = 0;

    const project = (lon: number, lat: number) => {
      const tiltRad = rotY * Math.PI / 180;
      const lonDiff = (lon - rotLon) * Math.PI / 180;
      const latRad = lat * Math.PI / 180;
      const x0 = Math.cos(latRad) * Math.sin(lonDiff);
      const y0 = Math.sin(latRad);
      const z0 = Math.cos(latRad) * Math.cos(lonDiff);
      const y1 = y0 * Math.cos(tiltRad) - z0 * Math.sin(tiltRad);
      const z1 = y0 * Math.sin(tiltRad) + z0 * Math.cos(tiltRad);
      return { x: cx + x0 * R, y: cy - y1 * R, visible: z1 > 0 };
    };

    const drawLine = (points: Array<{ lon: number; lat: number }>) => {
      let started = false;
      ctx.beginPath();
      for (const pt of points) {
        const p = project(pt.lon, pt.lat);
        if (p.visible) {
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        } else { started = false; }
      }
      ctx.stroke();
    };

    const draw = (ts: number) => {
      rotLon += 0.28;
      if (lastSwitchTs === 0) lastSwitchTs = ts;
      if (ts - lastSwitchTs > 5000) { lastSwitchTs = ts; activeIdx = (activeIdx + 1) % locs.length; }

      ctx.clearRect(0, 0, size, size);

      const outerGlow = ctx.createRadialGradient(cx, cy, R - 10, cx, cy, R + 28);
      outerGlow.addColorStop(0, 'rgba(212,175,55,0.18)');
      outerGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(cx, cy, R + 28, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow; ctx.fill();

      const grad = ctx.createRadialGradient(cx - R * 0.32, cy - R * 0.32, R * 0.04, cx, cy, R);
      grad.addColorStop(0, '#FFE066'); grad.addColorStop(0.3, '#D4AF37');
      grad.addColorStop(0.65, '#B8860B'); grad.addColorStop(1, '#5C3A0A');
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();

      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
      ctx.strokeStyle = 'rgba(0,0,0,0.38)'; ctx.lineWidth = 0.7;
      for (let lat = -80; lat <= 80; lat += 20) {
        const pts = []; for (let lon = -180; lon <= 180; lon += 3) pts.push({ lon, lat }); drawLine(pts);
      }
      for (let lon = -180; lon < 180; lon += 20) {
        const pts = []; for (let lat = -90; lat <= 90; lat += 3) pts.push({ lon, lat }); drawLine(pts);
      }
      ctx.strokeStyle = 'rgba(0,0,0,0.55)'; ctx.lineWidth = 1.1;
      const eqPts = []; for (let lon = -180; lon <= 180; lon += 2) eqPts.push({ lon, lat: 0 }); drawLine(eqPts);
      ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 0.5; ctx.setLineDash([4, 4]);
      for (const tLat of [23.5, -23.5]) {
        const tPts = []; for (let lon = -180; lon <= 180; lon += 2) tPts.push({ lon, lat: tLat }); drawLine(tPts);
      }
      ctx.setLineDash([]); ctx.restore();

      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,0,0,0.65)'; ctx.lineWidth = 2; ctx.stroke();

      const spec = ctx.createRadialGradient(cx - R * 0.42, cy - R * 0.42, 0, cx - R * 0.2, cy - R * 0.2, R * 0.55);
      spec.addColorStop(0, 'rgba(255,255,255,0.18)'); spec.addColorStop(0.5, 'rgba(255,255,255,0.04)');
      spec.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = spec; ctx.fill();

      const pulse = (Math.sin(ts * 0.004) + 1) / 2;
      locs.forEach((loc, i) => {
        const p = project(loc.lon, loc.lat);
        if (!p.visible) return;
        const isActive = i === activeIdx;
        if (isActive) {
          const pR = 14 + pulse * 10; const pAlpha = 0.35 + pulse * 0.25;
          const ringGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pR);
          ringGrad.addColorStop(0, `rgba(255,255,255,${pAlpha})`);
          ringGrad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.beginPath(); ctx.arc(p.x, p.y, pR, 0, Math.PI * 2);
          ctx.fillStyle = ringGrad; ctx.fill();
          ctx.beginPath(); ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 1.5; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, isActive ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? '#ffffff' : 'rgba(255,255,255,0.45)'; ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.5)'; ctx.lineWidth = 1; ctx.stroke();
        if (isActive) {
          const labelY = p.y - 16;
          ctx.font = 'bold 11px "Libre Baskerville", serif'; ctx.textAlign = 'center';
          ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillText(loc.name, p.x + 1, labelY + 1);
          ctx.fillStyle = '#FFD700'; ctx.fillText(loc.name, p.x, labelY);
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="globe-outer-wrap">
      <canvas ref={canvasRef} className="globe-canvas" />
    </div>
  );
}

const CITY_COORDS: Record<string, { top: string; left: string }> = {
  'Delhi': { top: '23.5%', left: '36%' },
  'Mumbai': { top: '56.5%', left: '19.5%' },
  'Pune': { top: '59.5%', left: '22%' },
  'Rajasthan': { top: '33%', left: '26%' },
  'Gujrat': { top: '44%', left: '16%' },
  'Nagpur': { top: '52%', left: '44%' },
  'Chattisgarh': { top: '53%', left: '55%' },
  'Bihar': { top: '38%', left: '66%' },
  'Tamilnadu': { top: '88%', left: '50%' },
  'Madhya Pradesh': { top: '46%', left: '39%' },
  'Haryana': { top: '20%', left: '34%' },
  'Bareilly': { top: '31%', left: '47%' },
  'Indore': { top: '48%', left: '33%' },
  'Telangana': { top: '67%', left: '44%' },
  'Karnataka': { top: '78%', left: '33%' },
};

/* ─── India Map SVG ─── */
function IndiaMap({ activeCities }: { activeCities: string[] }) {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    fetch('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/india-map.svg')
      .then(r => r.text())
      .then(text => {
        const gradientDef = `<defs><linearGradient id="indiaGoldGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#C8A415"/><stop offset="30%" stop-color="#D4AF37"/><stop offset="60%" stop-color="#F0C040"/><stop offset="100%" stop-color="#A07820"/></linearGradient></defs>`;
        const modified = text.replace('<svg ', '<svg style="width:100%;height:auto;" ').replace('>', '>' + gradientDef);
        setSvgContent(modified);
      })
      .catch(() => { });
  }, []);

  return (
    <div className="india-map-svg-wrap" style={{ position: 'relative' }}>
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
      <div className="india-map-pins">
        {activeCities.map((cityName, i) => {
          const pos = CITY_COORDS[cityName] || { top: '0%', left: '0%' };
          return (
            <div
              key={cityName + i}
              className="india-map-pin active"
              style={{ top: pos.top, left: pos.left }}
            >
              <div className="india-map-pin-pulse" />
              <div className="india-map-pin-dot" />
              <div className="india-map-pin-label">{cityName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Services + Map Section ─── */
const SERVICE_DATA = [
  {
    label: 'WordPress Website',
    sentence: '550 websites built for non-profits, powering their growth',
    cities: ['Nagpur', 'Rajasthan', 'Gujrat', 'Mumbai', 'Pune', 'Bihar', 'Chattisgarh', 'Tamilnadu']
  },
  {
    label: 'Social Media Marketing',
    sentence: 'Managing 10+ influencer, event & podcast marketing campaigns',
    cities: ['Madhya Pradesh', 'Delhi', 'Mumbai']
  },
  {
    label: 'Coding Website',
    sentence: '7+ custom platforms built for e-commerce, CRM & numerology systems',
    cities: ['Delhi', 'Haryana', 'Madhya Pradesh']
  },
  {
    label: 'Graphic Design',
    sentence: '25+ brand identities, social creatives & marketing designs delivered',
    cities: ['Delhi', 'Bareilly', 'Indore', 'Pune', 'Telangana', 'Mumbai', 'Gujrat']
  },
  {
    label: 'Photography',
    sentence: 'Delivered 35+ premium shoots for brands and events',
    cities: ['Madhya Pradesh', 'Pune', 'Karnataka']
  },
  {
    label: 'Video Editing',
    sentence: '1500+ reels, podcasts & campaign edits delivered for growing brands, including projects associated with Mangalam Builders, Birla School & CI',
    cities: ['Madhya Pradesh', 'Pune']
  },
  {
    label: 'Lead Generation',
    sentence: 'Experienced in running campaigns for real estate properties valued up to ₹5Cr+',
    cities: ['Delhi', 'Madhya Pradesh', 'Pune']
  }
];

function ServicesMapSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isUserInteracting = useRef(false);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isUserInteracting.current) setActiveIdx(s => (s + 1) % SERVICE_DATA.length);
    }, 3200);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleServiceClick = (idx: number) => {
    isUserInteracting.current = true;
    setActiveIdx(idx);
    resetTimer();
    setTimeout(() => { isUserInteracting.current = false; }, 8000);
  };

  const activeService = SERVICE_DATA[activeIdx];

  return (
    <section className="ab-section smap-section">
      <div className="ab-W">
        <div className="smap-header">
          <p className="ab-tag">Pan-India Presence</p>
          <h2 className="ab-section-h">
            <span className="ab-gx">Where We</span><br />
            <span>Deliver Excellence</span>
          </h2>
        </div>
        <div className="smap-body">
          <div className="smap-left">
            <p className="smap-subtitle">Our Services Across India</p>
            <div className="smap-btns">
              {SERVICE_DATA.map((s, i) => (
                <button
                  key={i}
                  className={`smap-btn${activeIdx === i ? ' smap-btn-active' : ''}`}
                  onClick={() => handleServiceClick(i)}
                >
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
            <div className="smap-sentences">
              {SERVICE_DATA.map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className={`smap-sentence${activeIdx === i ? ' smap-sentence-active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleServiceClick(i); }}
                >
                  <span className="smap-sent-arrow">›</span>
                  <span>{s.sentence}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="smap-right">
            <div className="smap-map-container">
              <IndiaMap activeCities={activeService.cities} />
              <div className="smap-map-label">
                <span className="ab-gx">India</span> Operations
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Section ─── */
const STATS = [
  { label: "CRM's Across Industries", value: 8, suffix: '+', sub: 'Industries Served', icon: '' },
  { label: 'Websites Developed', value: 900, suffix: '+', sub: 'WordPress & Shopify', icon: '' },
  { label: 'Social Media Posts', value: 10000, suffix: '+', sub: 'Content Published', icon: '' },
  { label: 'Website Visitors', value: 10, suffix: ' Cr+', sub: 'Across All Platforms', icon: '' },
  { label: 'Revenue Generated', value: 9.8, suffix: ' Cr+', sub: 'Platform Impact', icon: '' },
];

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.2 }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section className="ab-section ab-stats2-section" ref={ref}>
      <div className="ab-W">
        <div className="stats2-header">
          <p className="ab-tag">Numbers That Define Us</p>
          <h2 className="ab-section-h">
            <span className="ab-gx">Our</span> <span>Impact in Digits</span>
          </h2>
        </div>
        <div className="stats2-grid">
          {STATS.map((s, i) => (
            <div key={i} className="stats2-card">
              <div className="stats2-icon">{s.icon}</div>
              <div className="stats2-num-wrap">
                <RotatingCounter to={s.value} suffix={s.suffix} dur={2000 + i * 200} on={on} />
              </div>
              <div className="stats2-label">{s.label}</div>
              <div className="stats2-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Directors Section ─── */
function DirectorsSection() {
  return (
    <section className="ab-section ab-directors-section">
      <div className="ab-W">
        <div className="dir-header">
          <p className="ab-tag">Leadership & Vision</p>
          <h2 className="ab-section-h">
            <span className="ab-gx">The Visionaries</span><br />
            <span>Behind the Brand</span>
          </h2>
          <p className="dir-sub-text">The architects who dared to dream, built with conviction, and continue to lead with purpose.</p>
        </div>
        <div className="dir-grid">
          <div className="dir-card">

            <div className="dir-card-inner">
              <div className="dir-img-frame">
                <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Sujeetsir.webp" alt="Sujeet Govindani" className="dir-photo"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div className="dir-img-placeholder"><span>SG</span></div>
                <div className="dir-badge">Founder</div>
              </div>
              <div className="dir-info">
                <p className="dir-role">Founder & CEO</p>
                <div className="dir-divider" />
                <p className="dir-bio">Guinness World Record holder · Author of 25+ books rated 4.9/5 · 15M+ YouTube views · ₹130Cr+ revenue impact across industries.</p>
                <div className="dir-socs">
                  <SIcon t="ig" u="https://www.instagram.com/sujeet_govindani?igshid=1i674wkuw81ed" />
                  <SIcon t="fb" u="https://www.facebook.com/sujiiiiiiiiiii" />
                  <SIcon t="yt" u="https://www.youtube.com/@Sujeetgovindani" />
                  <SIcon t="x" u="https://x.com/sujeetgovindani?s=09" />
                </div>
              </div>
            </div>
          </div>
          <div className="dir-separator">
            <div className="dir-sep-line" />
            <div className="dir-sep-icon">✦</div>
            <div className="dir-sep-line" />
          </div>
          <div className="dir-card">
            <div className="dir-card-inner">
              <div className="dir-img-frame">
                <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LuckySir55.webp" alt="Gajendra Govindani" className="dir-photo"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div className="dir-img-placeholder"><span>GG</span></div>
                <div className="dir-badge">Co-Founder</div>
              </div>
              <div className="dir-info">
                <p className="dir-role">Co-Founder & Strategic Director</p>
                <div className="dir-divider" />
                <p className="dir-bio">Strategic visionary driving business growth across every vertical. Leads with clarity, innovation and unwavering conviction to scale brands across India and beyond.</p>
                <div className="dir-socs"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Team Strength Section ─── */
function TeamStrengthSection() {
  const departments = [
    { name: 'WordPress', count: 12, label: 'Developers', icon: '', desc: 'Full-stack WordPress & Shopify experts' },
    { name: 'Social Media', count: 6, label: 'Members', icon: '', desc: 'Content creators & community managers' },
    { name: 'Coding', count: 8, label: 'Developers', icon: '', desc: 'Full-stack & custom application engineers' },
    { name: 'Sales', count: 5, label: 'Members', icon: '', desc: 'Business development & client success' },
  ];

  return (
    <div className="ts-section">
      <div className="ts-label"><span className="ab-gx">Powered by</span> Talent</div>
      <div className="ts-grid">
        {departments.map((d, i) => (
          <div key={i} className="ts-card">
            <div className="ts-icon">{d.icon}</div>
            <div className="ts-count">{d.count}</div>
            <div className="ts-dept">{d.name}</div>
            <div className="ts-role">{d.label}</div>
            <div className="ts-desc">{d.desc}</div>
            <div className="ts-dots">
              {Array.from({ length: d.count }).map((_, j) => (
                <div key={j} className="ts-dot" style={{ animationDelay: `${j * 0.12}s` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Single Team Photo Container ─── */
const TEAM_MEMBERS = [
  { name: 'Anjali', img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Anjali.webp' },
  { name: 'Atharva', img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Atharva.webp' },
  { name: 'Gaurav', img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Gaurav.webp' },
  { name: 'Ravina', img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Sarita Mam.webp' },
  { name: 'Shankar', img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Shankar.webp' },
  { name: 'Tejas', img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Tejas.webp' },
  { name: 'Yash', img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Yash.webp' },
  { name: 'Sakshi', img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Sakshi.webp' },
  { name: 'Valaksh', img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/valaksh.webp' },
  { name: 'Kartik', img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Kartik.webp' },
  { name: 'Sakshi S', img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Sakshi S.webp' },
  { name: 'Hitesh', img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Hitesh.webp' },
];

/* ─── Single Team Photo Container ─── */
function TeamPhotoGrid() {
  return (
    <div className="tpg-wrap">
      <div className="tpg-header">
        <p className="ab-tag">The People Behind the Work</p>
        <h3 className="tpg-title">
          <span className="ab-gx">Faces of</span> Govindani
        </h3>
      </div>
      <div style={{
        width: '100%', borderRadius: 20, overflow: 'hidden',
        border: '1px solid rgba(212,175,55,0.35)',
        boxShadow: '0 0 60px rgba(212,175,55,0.08), 0 24px 80px rgba(0,0,0,0.5)',
        position: 'relative', background: 'rgba(255,255,255,0.02)',
        marginBottom: 48
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(to right, transparent, #D4AF37, transparent)', zIndex: 2,
        }} />

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
          display: 'flex', alignItems: 'flex-end', padding: '0 28px 20px', zIndex: 2,
        }}>
          <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 15, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.06em' }}>
            The Govindani Infotech Family ✦
          </span>
        </div>
      </div>

      <div className="tm-grid-wrap">
        <div className="tm-grid">
          {TEAM_MEMBERS.map((m, i) => (
            <div key={i} className="tm-card">
              <div className="tm-circle">
                <img
                  src={m.img}
                  alt={m.name}
                  className="tm-img"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Circle-Avatar.webp'; }}
                />
              </div>
              <p className="tm-name">{m.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


/* ─── Trust & Credentials Section ─── */
function TrustSection() {
  return (
    <section className="ab-section ab-trust-section">
      <div className="ab-W">
        <div className="trust-header">
          <p className="ab-tag">Our Credentials</p>
          <h2 className="ab-section-h">
            <span className="ab-gx">Established.</span><br />
            <span>Trusted. Verified.</span>
          </h2>
        </div>
        <TeamPhotoGrid />
        <div className="globe-presence-block">
          <GlobeCanvas />
          <div className="globe-presence-info">
            <h3 className="globe-presence-title">Global Presence</h3>
            <p className="globe-presence-text">
              Not just rooted in India we have an established footprint in the{' '}
              <strong className="ab-gx">United States of America</strong> as well.
              Two nations. One vision. Boundless impact.
            </p>
            <div className="globe-presence-flags">
              <span className="trust-flag">INDIA</span>
              <span className="trust-flag-sep">✦</span>
              <span className="trust-flag">USA</span>
            </div>
          </div>
        </div>
        <div className="trust-grid-3">
          <div className="trust-card">

            <h3 className="trust-cert-title">Incorporation Certificate</h3>
            <p className="trust-cert-sub">Govindani Infotech Pvt. Ltd.</p>
            <p className="trust-cert-text">Legally registered & incorporated under the Companies Act a document you can trust, sealed with the authority of law.</p>
            <div className="trust-badge">✓ Officially Incorporated</div>
          </div>
          <div className="trust-card">

            <h3 className="trust-cert-title">USA Certificate</h3>
            <p className="trust-cert-text">Recognised and certified in the United States a testament to international credibility, compliance and excellence.</p>
            <div className="trust-badge">✓ USA Certified</div>
          </div>
          <div className="trust-card">

            <h3 className="trust-cert-title">GST Registered</h3>
            <p className="trust-cert-sub">Pune, Maharashtra</p>
            <p className="trust-cert-text">Fully GST-compliant and registered in Pune every invoice, every transaction, backed by government-recognised accountability.</p>
            <div className="trust-badge">✓ GST Compliant · Pune</div>
          </div>
        </div>
        <div className="trust-tagline">
          <span className="ab-gx">Documents that speak.</span>
          <span> Credentials that lead. Trust that lasts.</span>
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN PAGE ─── */
export default function AboutPage() {
  const [slide, setSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const core = [
    {
      name: 'Sujeet Govindani',
      role: 'Founder & CEO',
      img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Sujeetsir.webp',
      info: 'Guinness World Record holder, Global Startup Mentor & author of 25+ books rated 4.9/5 with 15M+ YouTube views and ₹130Cr+ revenue impact.',
      s: ['ig', 'fb', 'yt', 'x'],
      links: {
        ig: "https://www.instagram.com/sujeet_govindani?igshid=1i674wkuw81ed",
        fb: "https://www.facebook.com/sujiiiiiiiiiii",
        yt: "https://www.youtube.com/@Sujeetgovindani",
        x: "https://x.com/sujeetgovindani?s=09"
      }
    },
    { name: 'Gajendra Govindani', role: 'Co-Founder', img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LuckySir55.webp', info: 'Strategic visionary driving business growth across every vertical with clarity, innovation and unwavering conviction.', s: [] },
    { name: 'Simranjeet Kaur', role: 'Chief Operations Manager', img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/SimranMam12.webp', info: 'Operations excellence specialist ensuring seamless delivery, client satisfaction and peak team performance across all projects.', s: [] },
  ];

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSlide(s => (s + 1) % core.length), 4000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goSlide = (i: number) => { setSlide(i); startTimer(); };

  return (
    <div className="ab-page">
      <div className="ab-amb"><div className="ab-g1" /><div className="ab-g2" /><div className="ab-g3" /></div>
      <div className="ab-grain" />

      <div className="ab-content">

        {/* §1 HERO */}
        <section className="ab-section ab-hero-section">
          <div className="ab-ghost">GOVINDANI</div>
          <div className="ab-W">
            <div className="ab-hero-center-head">
              <h1 className="ab-hero-h" style={{ marginTop: 120 }}>
                <span className="ab-gx">Empowering Brands</span><br />
                <span className="ab-hero-h2">Transforming Futures</span>
              </h1>
              <p className="ab-hero-subline">Your Digital Growth Partner Since 2018</p>
            </div>
            <div className="ab-hero-pills-center">
              <div className="ab-pills">
                {['Est. 2018', '5+ Years', '900+ Websites', 'India · USA'].map((b, i) => (
                  <span key={i} className="ab-pill">{b}</span>
                ))}
              </div>
            </div>
            <div className="ab-hero-journey-tag">
              <p className="ab-tag">Our Journey</p>
            </div>
          </div>
          <div className="ab-hero-train ab-hero-train-flipped">
            <TrainTimeline />
          </div>
          <div className="ab-W">
            <div className="ab-hero-below-train">
              <p className="ab-hero-sub">
                At <strong>Govindani Infotech Pvt. Ltd.</strong>, we turn bold visions into measurable digital impact from Pune to the world.
              </p>
            </div>
          </div>
        </section>

        {/* §2 SERVICES + MAP */}
        <ServicesMapSection />

        {/* §3 STATS */}
        <StatsSection />

        {/* §4 VALUES */}
        <section className="ab-section ab-values-section">
          <div className="ab-W">
            <div className="ab-values-intro">
              <div>
                <p className="ab-tag">What We Do</p>
                <h2 className="ab-section-h">
                  <span className="ab-gx">Our</span><br />
                  <span>Expertise &amp;<br />Commitments</span>
                </h2>
              </div>
              <p className="ab-values-sub">We are your intelligent digital-excellence partner that connects brands with people turning creative insights into measurable growth, impact and transformation across every channel.</p>
            </div>
          </div>
          <div className="ab-val-row">
            <div className="ab-val-cell ab-val-accent">
              <div className="ab-val-num">01</div>
              <div className="ab-val-title">Customer Satisfaction</div>
              <div className="ab-val-sub-text">Putting Clients First, Exceeding Expectations</div>
              <p className="ab-val-body">Customer satisfaction is our top priority. We are committed to providing exceptional service and support, ensuring that our clients are delighted with every aspect of our work.</p>
            </div>
            <div className="ab-val-cell ab-val-glass">
              <div className="ab-val-num">02</div>
              <div className="ab-val-title">Digital Excellence</div>
              <div className="ab-val-sub-text">Striving for Perfection &amp; Unmatched Quality</div>
              <p className="ab-val-body">Excellence is our standard. We are committed to delivering the highest quality services and solutions, ensuring clients achieve their digital goals with precision and efficiency.</p>
            </div>
          </div>
          <div className="ab-val-row">
            <div className="ab-val-cell ab-val-glass">
              <div className="ab-val-num">03</div><span className="ab-val-ico"></span>
              <div className="ab-val-title">Strategic Innovation</div>
              <div className="ab-val-sub-text">Future-Forward Thinking</div>
              <p className="ab-val-body">Data-driven strategy combined with creative execution. We build campaigns that don't just perform they transform industries and redefine growth for your brand.</p>
            </div>
            <div className="ab-val-cell ab-val-accent">
              <div className="ab-val-num">04</div><span className="ab-val-ico"></span>
              <div className="ab-val-title">Our Expertise Includes</div>
              <div className="ab-val-sub-text">Full-Stack Digital Solutions</div>
              <p className="ab-val-body">From performance marketing to SEO, brand strategy, web development and social media complete digital ecosystems built to scale.</p>

            </div>
          </div>
        </section>

        {/* §5 DIRECTORS */}
        <DirectorsSection />

        {/* §6 TEAM */}
        <section className="ab-section ab-team-section">
          <div className="ab-W">
            <div className="ab-ghr" />
            <div className="ab-team-head">
              <div>
                <p className="ab-tag">The Architects of Your Growth</p>
                <div className="ab-team-title">
                  <span className="ab-gx">Our</span> <span>Team</span>
                </div>
              </div>
              <p className="ab-team-desc">
                We Grow Together, We Learn Together,<br />
                We Stand Together For You, For Your Brand.
              </p>
            </div>

            <div className="ab-carousel">
              <div className="ab-glass-card">
                <div className="ab-gc-info">
                  <div className="ab-gc-role">{core[slide].role}</div>
                  <div className="ab-gc-name">{core[slide].name}</div>
                  <p className="ab-gc-txt">{core[slide].info}</p>
                  <div className="ab-gc-socs">{core[slide].s.map((s, i) => <SIcon key={i} t={s} u={(core[slide] as any).links?.[s]} />)}</div>
                </div>
                <div className="ab-gc-img">
                  {core[slide].img
                    ? <img key={core[slide].img} src={core[slide].img} alt={core[slide].name} className="ab-gc-photo" loading="lazy" decoding="async" />
                    : <div className="ab-gc-initials">{getInitials(core[slide].name)}</div>}
                </div>
              </div>
              <div className="ab-strip">
                {core.map((m, i) => (
                  <div key={i} className={`ab-strip-item${i === slide ? ' ab-strip-on' : ''}`} onClick={() => goSlide(i)}>
                    <div className="ab-strip-av">
                      {m.img ? <img src={m.img} alt={m.name} className="ab-strip-photo" loading="lazy" decoding="async" /> : <div className="ab-strip-ini">{getInitials(m.name)}</div>}
                    </div>
                    <span className="ab-strip-nm">{m.name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
              <div className="ab-pbar-wrap"><PBar idx={slide} dur={4000} /></div>
            </div>

            <TeamStrengthSection />
          </div>
        </section>

        {/* §7 TRUST / CREDENTIALS */}
        <TrustSection />

        {/* §8 CTA */}
        <section className="ab-section ab-cta-section">
          <div className="ab-W"><div className="ab-ghr" style={{ marginBottom: 68 }} /></div>
          <div className="ab-cta-bg">Grow.</div>

          <div
            className="ab-cta-in"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <p className="ab-cta-ey">Ready to Scale</p>

            <h2
              className="ab-cta-h"
              style={{
                whiteSpace: 'normal',
                textAlign: 'center',
                maxWidth: 700,
                width: '100%',
                lineHeight: 1.15,
                margin: '0 auto 24px',
              }}
            >
              <span className="ab-gx" style={{ display: 'block', paddingBottom: '0.15em' }}>We Grow Together,</span>
              <span style={{ display: 'block' }}>We Stand Together</span>
            </h2>

            <p
              className="ab-cta-p"
              style={{ maxWidth: 540, textAlign: 'center', margin: '0 auto 36px' }}
            >
              Partner with Govindani Infotech and unlock transformational growth strategies built precisely for your business goals.
            </p>

            <div
              className="ab-cta-btns"
              style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            >
              <Link to="/contact-us">
                <button className="ab-btn-gold">
                  Book a Strategy Session
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
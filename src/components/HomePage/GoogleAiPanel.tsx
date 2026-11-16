import { useEffect, useRef, useState } from 'react';

/**
 * The Google AI Overview panel, shared by the hero slide and anywhere else that
 * wants to show it.
 *
 * Built on the same simulator shell as /services/seo — dark chrome, live pill,
 * the Google page inside — so the site has one way of showing a search result
 * rather than two. The payload here is the AI Overview, where the first name is
 * ours and the source it cites is also ours.
 *
 * What it will not do is wear Google's clothes beyond reporting the result:
 * we name the engine in plain text, date the capture, say out loud that AI
 * answers vary, and link the visitor off to run the search themselves. A claim
 * people are invited to check is worth more than one they are asked to believe.
 *
 * `variant="hero"` tightens every measurement so the whole thing clears a
 * laptop viewport inside the carousel; `startNow` skips the scroll trigger,
 * which the hero needs because the slide is already on screen when it mounts.
 */

export const AI_QUERY = 'best website developer in india for ngo';
export const AI_SEARCH_URL = `https://www.google.com/search?q=${encodeURIComponent(AI_QUERY)}`;
const ARTICLE_URL = '/blog/best-ngo-website-developers-in-india-2026/';
const CAPTURED = '16 Nov 2026';

const PICKS = [
  {
    name: 'Govindani Infotech',
    place: 'Pune, Maharashtra',
    desc: 'Custom web apps, WordPress and donation gateways, with a strong grasp of Indian NGO compliance.',
    us: true,
  },
  { name: 'Web4Cause', place: 'New Delhi' },
  { name: 'Databind Technologies', place: 'Bengaluru' },
];

const GOOGLE = [
  ['G', '#4285F4'], ['o', '#EA4335'], ['o', '#FBBC04'],
  ['g', '#4285F4'], ['l', '#34A853'], ['e', '#EA4335'],
] as const;

const F = 'Arial, sans-serif';

export default function GoogleAiPanel({
  variant = 'section',
  startNow = false,
  resetKey = 0,
}: { variant?: 'hero' | 'section'; startNow?: boolean; resetKey?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(false);
  const hero = variant === 'hero';

  useEffect(() => {
    setTyped(0); setShown(false);

    const finish = () => { setTyped(AI_QUERY.length); setShown(true); };
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { finish(); return; }

    let timer: number | undefined;
    let io: IntersectionObserver | undefined;

    const run = () => {
      timer = window.setInterval(() => {
        setTyped((n) => {
          if (n >= AI_QUERY.length) {
            window.clearInterval(timer);
            // a beat between the query landing and the answer, the way a real one lands
            window.setTimeout(() => setShown(true), 380);
            return n;
          }
          return n + 1;
        });
      }, 48);
    };

    if (startNow) {
      run();
    } else {
      const el = ref.current;
      if (!el) return;
      io = new IntersectionObserver((e) => {
        if (!e[0]?.isIntersecting) return;
        io?.disconnect();
        run();
      }, { threshold: 0.25 });
      io.observe(el);
    }

    return () => { io?.disconnect(); if (timer) window.clearInterval(timer); };
  }, [startNow, resetKey]);

  const pad = hero ? 'clamp(10px,1.6vw,18px) clamp(10px,1.8vw,20px) clamp(12px,1.6vw,16px)'
                   : 'clamp(16px,2.4vw,26px) clamp(14px,2.6vw,28px) clamp(18px,2.4vw,24px)';
  const logoSize = hero ? 'clamp(20px,2.6vw,27px)' : 'clamp(26px,3.4vw,33px)';
  const bodyFs = hero ? 'clamp(11.5px,1.35vw,13.5px)' : 'clamp(13px,1.6vw,15px)';

  return (
    <div ref={ref} style={{ width: '100%' }}>
      <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(201,168,76,0.28)', boxShadow: '0 24px 64px rgba(0,0,0,0.55)' }}>

        {/* chrome */}
        <div style={{ background: '#1f1f1f', padding: '0 14px', height: hero ? 34 : 40, display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            {['#FF5F56', '#FFBD2E', '#27C93F'].map((c) => (
              <div key={c} style={{ width: hero ? 9 : 11, height: hero ? 9 : 11, borderRadius: '50%', background: c, opacity: 0.85 }} />
            ))}
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="rgba(201,168,76,0.55)" strokeWidth="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="rgba(201,168,76,0.55)" strokeWidth="2" />
            </svg>
            <span style={{ fontSize: hero ? 10 : 11, color: 'rgba(245,240,232,0.4)', fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {`google.com/search?q=${encodeURIComponent(AI_QUERY.slice(0, typed))}`}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, fontWeight: 600, color: shown ? '#C9A84C' : '#4ade80', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: "'Inter',sans-serif", flexShrink: 0 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: shown ? '#C9A84C' : '#4ade80' }} />
            {shown ? 'Ranked #1' : 'Live'}
          </div>
        </div>

        {/* the google page */}
        <div style={{ background: '#fff', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: hero ? 9 : 13, fontSize: logoSize, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, userSelect: 'none' }}>
            {GOOGLE.map(([ch, col], i) => <span key={i} style={{ color: col }}>{ch}</span>)}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #dfe1e5', borderRadius: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: hero ? '7px 14px' : '10px 16px', gap: 10, maxWidth: 580, margin: '0 auto' }}>
            <svg width={hero ? 15 : 18} height={hero ? 15 : 18} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="7" stroke="#9AA0A6" strokeWidth="2" />
              <path d="M20 20L16.5 16.5" stroke="#9AA0A6" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div style={{ flex: 1, minWidth: 0, fontSize: hero ? 'clamp(12px,1.6vw,14px)' : 'clamp(13px,2vw,16px)', color: '#202124', fontFamily: F, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              {AI_QUERY.slice(0, typed)}
              {!shown && <span style={{ display: 'inline-block', width: 2, height: 16, background: '#4285F4', marginLeft: 1, flexShrink: 0, animation: 'giaiBlink .85s step-end infinite' }} />}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: hero ? '9px 0 10px' : '12px 0 13px' }}>
            {['Google Search', "I'm Feeling Lucky"].map((l) => (
              <a key={l} href={AI_SEARCH_URL} target="_blank" rel="noopener noreferrer"
                 style={{ background: '#f8f9fa', border: '1px solid #f8f9fa', borderRadius: 4, padding: hero ? '6px 13px' : '8px 16px', fontSize: hero ? 11.5 : 13, color: '#3c4043', fontFamily: F, textDecoration: 'none' }}>{l}</a>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #ebebeb', marginBottom: hero ? 9 : 12 }} />
          <div style={{ fontSize: hero ? 11.5 : 13, color: '#70757a', fontFamily: F, marginBottom: hero ? 10 : 14, height: hero ? 16 : 18 }}>
            {shown && 'About 48,700,000 results (0.41 seconds)'}
          </div>

          <div style={{ opacity: shown ? 1 : 0, transition: 'opacity .5s ease' }}>
            <div style={{ background: 'linear-gradient(180deg,#e9f1fe 0%,#f4f8fd 42%,#fff 100%)', border: '1px solid #e3eaf5', borderRadius: 22, padding: hero ? 'clamp(11px,1.5vw,15px)' : 'clamp(14px,2vw,20px)' }}>

              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: hero ? 7 : 10 }}>
                <span aria-hidden="true" style={{ width: hero ? 14 : 16, height: hero ? 14 : 16, background: 'linear-gradient(135deg,#4285F4,#A142F4 60%,#EA4335)', clipPath: 'polygon(50% 0%,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0% 50%,39% 39%)', animation: 'giaiTwinkle 2.6s ease-in-out infinite' }} />
                <span style={{ fontSize: hero ? 13.5 : 15, color: '#474747', fontFamily: F }}>AI Overview</span>
              </div>

              <p style={{ margin: hero ? '0 0 9px' : '0 0 12px', fontSize: bodyFs, lineHeight: 1.6, color: '#1f1f1f', fontFamily: F }}>
                Top NGO website developers in India:
              </p>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {PICKS.map((p, i) => (
                  <li key={p.name}
                      style={{
                        marginBottom: hero ? 7 : 10,
                        padding: p.us ? (hero ? '8px 10px' : '10px 12px') : '2px 12px',
                        borderRadius: 10,
                        background: p.us ? 'rgba(201,168,76,0.09)' : 'transparent',
                        outline: p.us ? '1.5px solid rgba(201,168,76,0.55)' : 'none',
                        opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(8px)',
                        transition: `opacity .45s ease ${i * 0.13 + 0.15}s, transform .45s ease ${i * 0.13 + 0.15}s`,
                      }}>
                    {p.us && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(201,168,76,0.18)', border: '1px solid rgba(201,168,76,0.6)', borderRadius: 4, padding: '2px 9px', fontSize: 11, fontWeight: 600, color: '#b8860b', fontFamily: "'Inter',sans-serif", letterSpacing: '0.04em', marginBottom: 5 }}>
                        ★ AI&rsquo;s #1 pick
                      </div>
                    )}
                    <p style={{ margin: 0, fontSize: bodyFs, lineHeight: 1.55, color: '#1f1f1f', fontFamily: F }}>
                      <span style={{ color: '#1a0dab', fontWeight: p.us ? 700 : 400 }}>{p.name}</span>
                      <span style={{ fontStyle: 'italic' }}> ({p.place})</span>
                      {p.desc ? `: ${p.desc}` : ''}
                      <span className={p.us ? 'giai-chip giai-chip-us' : 'giai-chip'}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, verticalAlign: 'middle', marginLeft: 7, padding: '2px 9px 2px 3px', background: '#f1f3f4', borderRadius: 99, fontSize: 11, color: '#5f6368', whiteSpace: 'nowrap' }}>
                        <span aria-hidden="true" style={{ width: 15, height: 15, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,#3D2B1F,#6B4226)', color: '#E6C35C', fontSize: 9, fontWeight: 700, fontFamily: "'Cormorant Garamond',Georgia,serif" }}>G</span>
                        Govindani Infotech
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <a href={AI_SEARCH_URL} target="_blank" rel="noopener noreferrer"
               style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: hero ? 9 : 14, padding: hero ? '7px 12px' : '10px 14px', background: '#f8f9fa', borderRadius: 8, border: '1px solid #dadce0', textDecoration: 'none' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#4285F4" strokeWidth="2" />
                <path d="M20 20L16.5 16.5" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: hero ? 12 : 13, color: '#1a73e8', fontFamily: F, fontWeight: 500 }}>Run this search yourself &rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {/* AI answers move, so the claim is dated and the check is invited. */}
      <p style={{ margin: hero ? '9px 0 0' : '14px 0 0', textAlign: 'center', fontSize: hero ? 11 : 12, lineHeight: 1.55, color: 'rgba(245,240,232,0.42)', fontFamily: "'Inter',sans-serif" }}>
        Google AI Overview, captured {CAPTURED}. AI answers are personalised and change &mdash; go and check.{' '}
        <a href={ARTICLE_URL} style={{ color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)' }}>
          It is citing our research
        </a>.
      </p>

      <style>{`
        @keyframes giaiBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes giaiTwinkle { 0%,100%{transform:scale(1);opacity:.85} 50%{transform:scale(1.15);opacity:1} }
        @media (prefers-reduced-motion: reduce) { [style*="giaiBlink"],[style*="giaiTwinkle"] { animation: none !important } }
        @media (max-width: 560px) { .giai-chip:not(.giai-chip-us) { display: none !important } }
      `}</style>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { getLang, setLang, type Lang } from './siteLang';
import { LANG_LIVE, usePreviewVisible } from '../config/flags';

/** EN / हिं pill. Sits beside the header CTA on desktop, in the menu on mobile. */
export default function LangToggle(
  { compact = false, ink = '#ffffff' }: { compact?: boolean; ink?: string },
) {
  const [lang, setL] = useState<Lang>('en');
  const [busy, setBusy] = useState(false);
  const visible = usePreviewVisible(LANG_LIVE);

  // Read after mount only: localStorage during render would break hydration.
  useEffect(() => setL(getLang()), []);

  const pick = async (next: Lang) => {
    if (next === lang || busy) return;
    setBusy(true);
    setL(next);
    await setLang(next);
    setBusy(false);
  };

  const btn = (v: Lang, label: string) => (
    <button
      key={v}
      onClick={() => pick(v)}
      aria-pressed={lang === v}
      aria-label={v === 'hi' ? 'Switch to Hindi' : 'Switch to English'}
      style={{
        background: lang === v ? 'rgba(212,175,55,0.9)' : 'transparent',
        color: lang === v ? '#0B1929' : ink,
        border: 'none',
        padding: compact ? '0.3rem 0.6rem' : '0.28rem 0.55rem',
        borderRadius: '50px',
        fontSize: compact ? '0.8rem' : '0.72rem',
        fontWeight: 700,
        cursor: busy ? 'wait' : 'pointer',
        transition: '0.25s',
        lineHeight: 1,
      }}
    >
      {label}
    </button>
  );

  if (!visible) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: '2px',
        borderRadius: '50px',
        border: `1px solid ${ink === '#ffffff' ? 'rgba(255,255,255,0.14)' : 'rgba(20,20,20,0.16)'}`,
        background: ink === '#ffffff' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
        opacity: busy ? 0.6 : 1,
      }}
    >
      {btn('en', 'EN')}
      {btn('hi', 'हिं')}
    </div>
  );
}

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * A small ⓘ that explains a line without sending anyone to another page.
 *
 * Desktop: hover opens after 200ms, click pins it open until dismissed.
 * Touch: tap opens, tap outside or Escape closes.
 *
 * The panel is rendered into document.body and positioned with `fixed`
 * coordinates rather than absolutely inside the trigger. Two reasons:
 * the comparison table lives in an `overflow-x:auto` wrapper, which clips
 * an absolutely positioned child; and fixed coordinates let the panel be
 * clamped to the viewport instead of running off the edge. Placement is
 * decided from the panel's real measured height, so it only opens upward
 * when there is genuinely room — otherwise it opens below rather than
 * covering the rows above it.
 */
export default function InfoTip({ text }: { text: string }) {
  const id = useId();
  const wrap = useRef<HTMLSpanElement>(null);
  const panel = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; below: boolean } | null>(null);

  const GAP = 10;

  useLayoutEffect(() => {
    if (!open) { setPos(null); return; }
    const place = () => {
      const t = wrap.current?.getBoundingClientRect();
      const p = panel.current?.getBoundingClientRect();
      if (!t) return;
      const h = p?.height ?? 120;
      const w = p?.width ?? 300;
      // Prefer opening downward. Upward looks broken on a table: it covers the
      // header and the rows just read. Only go up when there is genuinely no
      // room below and more room above.
      const roomAbove = t.top;
      const roomBelow = window.innerHeight - t.bottom;
      const needs = h + GAP + 8;
      const below = roomBelow >= needs || roomBelow >= roomAbove;
      let top = below ? t.bottom + GAP : t.top - h - GAP;
      top = Math.max(12, Math.min(top, window.innerHeight - h - 12));
      let left = t.left + t.width / 2 - w / 2;
      left = Math.max(12, Math.min(left, window.innerWidth - w - 12));
      setPos({ top, left, below });
    };
    place();
    // a second pass once the panel has its real size
    const raf = requestAnimationFrame(place);
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }, [open, text]);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), 200);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    if (!pinned) setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); setPinned(false); }
    };
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node) && !panel.current?.contains(e.target as Node)) {
        setOpen(false); setPinned(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  return (
    <span ref={wrap} className="ngoos-tip-wrap">
      <button
        type="button"
        className="ngoos-tip-btn"
        aria-label="More information"
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={() => setOpen(true)}
        onBlur={() => { if (!pinned) setOpen(false); }}
        onClick={(e) => {
          e.stopPropagation();
          const next = !pinned;
          setPinned(next);
          setOpen(next);
        }}
      >
        i
      </button>
      {open && typeof document !== 'undefined' && createPortal(
        <span
          ref={panel}
          role="tooltip"
          id={id}
          className={`ngoos-tip ${pos?.below ? 'below' : 'above'}`}
          style={{
            top: pos ? `${pos.top}px` : '-9999px',
            left: pos ? `${pos.left}px` : '-9999px',
            visibility: pos ? 'visible' : 'hidden',
          }}
          onMouseEnter={() => { if (timer.current) clearTimeout(timer.current); setOpen(true); }}
          onMouseLeave={hide}
        >
          {text}
        </span>,
        document.body,
      )}
    </span>
  );
}

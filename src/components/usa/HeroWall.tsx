import { useMemo } from 'react';
import { ALL, type Work } from '@/data/usaWork';

/**
 * Decorative hero background for /pro & /prousa: a "wall of websites" — columns of
 * our past-work screenshots drifting slowly up/down behind the hero text, dimmed by
 * a cream veil so the headline stays readable. Portfolio images only (no video).
 * Deterministic order (no Math.random) to stay hydration-safe on the prerendered page.
 */

const COLS = 4;
const PER_COL = 12;

export default function HeroWall() {
  const columns = useMemo(() => {
    const pics = ALL.slice(0, COLS * PER_COL);
    const cols: Work[][] = Array.from({ length: COLS }, () => []);
    pics.forEach((p, i) => cols[i % COLS].push(p));   // round-robin → each column differs
    return cols;
  }, []);

  return (
    <div className="gusa-herowall" aria-hidden="true">
      {columns.map((col, ci) => (
        <div className={`gusa-wallcol ${ci % 2 ? 'down' : 'up'}`} key={ci}>
          <div className="gusa-walltrack">
            {[...col, ...col].map((w, i) => (
              <img key={`${w.n}-${i}`} src={w.i} alt="" loading="lazy" decoding="async" draggable={false} />
            ))}
          </div>
        </div>
      ))}
      <div className="gusa-wallveil" />
    </div>
  );
}

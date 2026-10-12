import { useEffect, useRef, useState, useCallback } from 'react';
import { FEATURES, DEMO_IDS, type Feature } from '@/data/giveSetuFeatures';
import '@/styles/ngo-demos.css';

/**
 * Live feature demos for the NGO landing page.
 *
 * A trustee does not buy a feature list — they buy the feeling that the
 * paperwork is already handled. So the headline flow runs itself: an amount is
 * chosen, the gift is switched to monthly, the payment clears and the 80G
 * receipt prints with the stamp on it, on a loop, without anyone touching it.
 * Twelve smaller demos do the same for the features that answer a real
 * objection, and the full 44 sit underneath as proof nothing was trimmed.
 *
 * Motion lives in CSS (see ngo-demos.css) and is paused until a card is on
 * screen. The hero is the one JS timeline, because its steps have to agree with
 * the commentary beside it.
 */

const STAGE_STEPS = [
  { k: 'amount', label: 'Donor picks an amount', ms: 1700 },
  { k: 'monthly', label: 'Switches it to monthly', ms: 1900 },
  { k: 'pay', label: 'Pays by UPI, card or net-banking', ms: 1800 },
  { k: 'clear', label: 'Payment clears', ms: 1500 },
  { k: 'receipt', label: '80G receipt is emailed as a PDF', ms: 3400 },
] as const;

/** Adds `is-live` while the element is on screen, so CSS loops stay paused off-screen. */
function useOnScreen<T extends HTMLElement>(rootMargin = '120px') {
  const ref = useRef<T>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setLive(true); return; }
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, live };
}

const Cursor = ({ x, y, tap }: { x: number; y: number; tap: boolean }) => (
  <div className={`gsd-cursor${tap ? ' tap' : ''}`} style={{ transform: `translate(${x}px, ${y}px)` }} aria-hidden="true">
    <span className="gsd-ripple" />
    <svg viewBox="0 0 24 24" width="19" height="19">
      <path d="M5 2l14 10-6.2.9L16 20l-2.6 1.2-3.2-7L5 18z" fill="#1a1a22" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  </div>
);

/* ── the headline flow ──────────────────────────────────────────────────── */
function DonationStage() {
  const { ref: wrapRef, live } = useOnScreen<HTMLDivElement>();
  const [step, setStep] = useState(0);
  const [tap, setTap] = useState(false);
  const [cursor, setCursor] = useState({ x: 150, y: 250 });

  const stageRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const monthlyRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  // park the cursor over whatever this step is about, measured from the real node
  const aimAt = useCallback((el: HTMLElement | null) => {
    const stage = stageRef.current;
    if (!el || !stage) return;
    const a = el.getBoundingClientRect(), b = stage.getBoundingClientRect();
    setCursor({ x: a.left - b.left + a.width / 2 - 4, y: a.top - b.top + a.height / 2 - 2 });
  }, []);

  useEffect(() => {
    if (!live) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % STAGE_STEPS.length), STAGE_STEPS[step].ms);
    return () => window.clearTimeout(t);
  }, [step, live]);

  // move, then tap — the ripple fires a beat after the cursor lands
  useEffect(() => {
    if (!live) return;
    const target = step === 0 ? chipRef.current : step === 1 ? monthlyRef.current : step === 2 ? ctaRef.current : null;
    if (!target) { setTap(false); return; }
    aimAt(target);
    const t = window.setTimeout(() => setTap(true), 620);
    const u = window.setTimeout(() => setTap(false), 1180);
    return () => { window.clearTimeout(t); window.clearTimeout(u); };
  }, [step, live, aimAt]);

  const amountPicked = step >= 0;
  const isMonthly = step >= 1;
  const paying = step === 2;
  const cleared = step >= 3;
  const showReceipt = step === 4;

  return (
    <div className="gsd-hero" ref={wrapRef}>
      <div className="gsd-hero-copy">
        <p className="gsd-eyebrow" style={{ textAlign: 'left' }}>Watch it work</p>
        <h3>Your donor gives in four taps.<br />The 80G receipt writes itself.</h3>
        <p>
          No spreadsheet, no chasing your CA in March, nobody typing receipts by hand. This is the
          actual flow on a Give Setu website &mdash; running by itself, right here.
        </p>
        <ol className="gsd-steps">
          {STAGE_STEPS.map((s, i) => (
            <li key={s.k} className={`gsd-step${i === step ? ' on' : ''}${i < step ? ' done' : ''}`}>
              <span className="gsd-step-dot">{i < step ? '✓' : i + 1}</span>
              <span>{s.label}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className={`gsd-stage${live ? ' is-live' : ''}`} ref={stageRef}>
        <div className="gsd-stage-bar" aria-hidden="true">
          <i /><i /><i />
          <span className="gsd-stage-url">yourngo.org/donate</span>
        </div>

        {!showReceipt ? (
          <>
            <p className="gsd-form-h">Support our work</p>
            <p className="gsd-form-s">Every rupee goes to the cause. 80G receipt sent instantly.</p>

            <div className="gsd-chips">
              <div className="gsd-chip">₹500</div>
              <div className="gsd-chip">₹1,000</div>
              <div className={`gsd-chip${amountPicked ? ' sel' : ''}`} ref={chipRef}>₹2,000</div>
              <div className="gsd-chip">₹5,000</div>
            </div>

            <div className="gsd-toggle">
              <button type="button" className={!isMonthly ? 'on' : ''} tabIndex={-1}>One-time</button>
              <button type="button" className={isMonthly ? 'on' : ''} ref={monthlyRef} tabIndex={-1}>Monthly</button>
              <button type="button" tabIndex={-1}>Yearly</button>
            </div>

            {isMonthly && (
              <div className="gsd-note">
                <span aria-hidden="true">↻</span> ₹2,000 every month &mdash; donor can cancel any time
              </div>
            )}

            <div className="gsd-field">Priya Sharma &middot; <b>priya@example.com</b></div>
            <div className="gsd-field">PAN <b>ABCDE1234F</b> &middot; for 80G</div>

            <button type="button" className={`gsd-cta${paying ? ' press' : ''}`} ref={ctaRef} tabIndex={-1}>
              {paying ? <><span className="gsd-spin" /> Processing…</> : <>Donate ₹2,000 {isMonthly ? '/ month' : ''}</>}
            </button>
          </>
        ) : (
          <div className="gsd-done">
            <div className="gsd-tick" aria-hidden="true">✓</div>
            <p className="gsd-done-h">Thank you, Priya</p>
            <p className="gsd-done-s">₹2,000 received &middot; monthly gift active</p>

            <div className="gsd-receipt">
              <div className="gsd-receipt-top">
                <div>
                  <p className="gsd-receipt-h">Donation Receipt</p>
                  <p className="gsd-receipt-m">GS/2026-27/004182</p>
                </div>
                <span className="gsd-stamp">80G<br />ELIGIBLE</span>
              </div>
              <div className="gsd-receipt-rows">
                <div className="gsd-receipt-row"><span>Donor</span><b>Priya Sharma</b></div>
                <div className="gsd-receipt-row"><span>Amount</span><b>₹2,000</b></div>
                <div className="gsd-receipt-row"><span>Mode</span><b>UPI &middot; recurring</b></div>
                <div className="gsd-receipt-row"><span>PAN</span><b>ABCDE1234F</b></div>
              </div>
              <div className="gsd-dl"><span aria-hidden="true">⬇</span> Receipt_80G_004182.pdf &middot; emailed to priya@example.com</div>
            </div>
          </div>
        )}

        {cleared ? null : <Cursor x={cursor.x} y={cursor.y} tap={tap} />}
      </div>
    </div>
  );
}

/* ── the twelve mini demos ──────────────────────────────────────────────── */
const VISUALS: Record<number, JSX.Element> = {
  1: (
    <div className="gsd-freq">
      <span>One-time</span><span>Monthly</span><span>Yearly</span>
    </div>
  ),
  2: (
    <div className="gsd-pdf gsd-card">
      <div className="gsd-sk" style={{ width: '60%' }} />
      <div className="gsd-sk" style={{ width: '88%' }} />
      <div className="gsd-sk" style={{ width: '74%' }} />
      <div className="gsd-sk" style={{ width: '82%' }} />
      <div className="gsd-sk" style={{ width: '45%' }} />
      <span className="gsd-pdf-badge">80G ✓</span>
    </div>
  ),
  3: (
    <div className="gsd-panel gsd-card">
      <div className="gsd-panel-row" style={{ fontWeight: 700 }}><span>My donations</span><span>₹9,500</span></div>
      <div className="gsd-panel-row"><span>12 Mar 2026</span><span>₹2,000 ↓</span></div>
      <div className="gsd-panel-row"><span>12 Feb 2026</span><span>₹2,000 ↓</span></div>
      <div className="gsd-panel-row"><span>12 Jan 2026</span><span>₹2,000 ↓</span></div>
    </div>
  ),
  12: (
    <div className="gsd-fee gsd-card">
      <div className="gsd-fee-row"><span>Donation</span><b>₹5,000</b></div>
      <div className="gsd-fee-row"><span>Gateway fee</span><b>₹118</b></div>
      <div className="gsd-fee-check"><span className="gsd-fee-box">✓</span> I&rsquo;ll cover the fee</div>
      <div className="gsd-fee-net"><span>NGO receives</span><span>₹5,000</span></div>
    </div>
  ),
  11: (
    <div className="gsd-trib gsd-card">
      <div className="gsd-trib-k">In memory of</div>
      <div className="gsd-trib-n">Ramesh Patel</div>
    </div>
  ),
  41: (
    <div className="gsd-goal gsd-card">
      <div className="gsd-goal-top"><span>Classroom fund</span><span>of ₹5,00,000</span></div>
      <div className="gsd-bar"><i /></div>
      <div className="gsd-goal-n"><span>₹3,90,000</span></div>
    </div>
  ),
  10: (
    <div className="gsd-led gsd-card">
      <div className="gsd-led-row"><span>Online · UPI</span><span>₹2,000</span></div>
      <div className="gsd-led-row"><span>Online · Card</span><span>₹1,500</span></div>
      <div className="gsd-led-new"><span>Cash · receipt #77</span><span>₹25,000</span></div>
    </div>
  ),
  7: (
    <div className="gsd-stack">
      <i /><i /><i />
      <span className="gsd-stack-tag">412 receipts · 1 click</span>
    </div>
  ),
  14: (
    <>
      <div className="gsd-cal gsd-card">
        <div className="gsd-cal-m">MARCH</div>
        <div className="gsd-cal-d">31</div>
        <div className="gsd-cal-y">2026</div>
      </div>
      <span className="gsd-mail">✉ Annual summary sent</span>
    </>
  ),
  31: (
    <div className="gsd-gw">
      <div className="gsd-gw-row"><span aria-hidden="true">▣</span> UPI</div>
      <div className="gsd-gw-row"><span aria-hidden="true">▤</span> Card</div>
      <div className="gsd-gw-row"><span aria-hidden="true">▥</span> Net-banking</div>
    </div>
  ),
  9: (
    <div className="gsd-tbl">
      <div className="gsd-tbl-r"><i /><i /><i /><i /></div>
      <div className="gsd-tbl-r"><i /><i /><i /><i /></div>
      <div className="gsd-tbl-r"><i /><i /><i /><i /></div>
      <div className="gsd-tbl-r"><i /><i /><i /><i /></div>
      <span className="gsd-xls">⬇ donors.xlsx</span>
    </div>
  ),
  30: (
    <div className="gsd-id gsd-card">
      <div className="gsd-id-top">
        <span className="gsd-id-av" />
        <div><div className="gsd-id-n">Priya Sharma</div><div className="gsd-id-r">Donor · 2026</div></div>
      </div>
      <div className="gsd-sk" style={{ width: '82%', marginBottom: 5 }} />
      <div className="gsd-sk" style={{ width: '58%' }} />
    </div>
  ),
};

function DemoCard({ f }: { f: Feature }) {
  const { ref, live } = useOnScreen<HTMLDivElement>();
  return (
    <article className={`gsd-demo${live ? ' is-live' : ''}`} ref={ref}>
      <div className="gsd-demo-vis">{VISUALS[f.n]}</div>
      <div className="gsd-demo-txt">
        <p className="gsd-demo-n">Feature {f.n}</p>
        <h4 className="gsd-demo-t">{f.t}</h4>
        <p className="gsd-demo-d">{f.d}</p>
      </div>
    </article>
  );
}

/* ── the section ────────────────────────────────────────────────────────── */
export default function GiveSetuDemos({ onBook }: { onBook: () => void }) {
  const demos = DEMO_IDS.map((n) => FEATURES.find((f) => f.n === n)).filter(Boolean) as Feature[];

  return (
    <section className="gsd gsd-wrap" id="how-it-works">
      <div className="gsd-in">
        <p className="gsd-eyebrow">The platform, running</p>
        <h2 className="gsd-h2">Watch it work</h2>
        <p className="gsd-sub">Live on this page &mdash; no video, no screenshots. Exactly what your donors and your admin team see.</p>

        <DonationStage />

        <div className="gsd-grid">
          {demos.map((f) => <DemoCard key={f.n} f={f} />)}
        </div>

        <div className="gsd-all">
          <h3 className="gsd-all-h">All {FEATURES.length} features. Every one included.</h3>
          <p className="gsd-all-s">Not add-ons, not an upgrade tier &mdash; this is the whole platform you own.</p>
          <div className="gsd-all-grid">
            {FEATURES.map((f) => (
              <div className="gsd-feat" key={f.n}>
                <span className="gsd-feat-n">{f.n}</span>
                <div>
                  <p className="gsd-feat-t">{f.t}</p>
                  <p className="gsd-feat-d">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gsd-foot">
          <p>All {FEATURES.length} features &middot; your own platform &middot; zero commission &mdash; from &#8377;40,000.</p>
          <button type="button" className="gusa-btn" onClick={onBook}>Book a free walkthrough &rarr;</button>
        </div>
      </div>
    </section>
  );
}

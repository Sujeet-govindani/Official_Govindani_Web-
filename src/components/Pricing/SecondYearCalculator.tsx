import { useMemo, useState } from 'react';

/**
 * Year-two plan estimator.
 *
 * Everything here is computed from the published plan limits and the published
 * add-on rates — donor caps, monthly receipt caps, marketing-email quotas, the
 * receipt overage ladder and the per-message WhatsApp rate. It recommends the
 * cheapest plan that genuinely holds the volume entered, then prices whatever
 * still spills over. It is an estimate of running cost, not a quotation.
 */

type PlanId = 'starter' | 'growth' | 'advanced';

const PLANS: {
  id: PlanId; name: string; annual: number;
  donors: number; receipts: number; emails: number; members: number;
  overage: number; waRate: number | null; site: string;
}[] = [
  { id: 'starter',  name: 'Starter',  annual: 25000, donors: 2000,  receipts: 1000,  emails: 1000,  members: 1000,  overage: 0.90, waRate: null, site: 'CMS portal' },
  { id: 'growth',   name: 'Growth',   annual: 45000, donors: 10000,  receipts: 5000,  emails: 2500,  members: 3000,  overage: 0.70, waRate: 1.00, site: 'CMS portal + a full WordPress website' },
  { id: 'advanced', name: 'Advanced', annual: 80000, donors: 25000, receipts: 15000, emails: 25000, members: 10000, overage: 0.50, waRate: 0.98, site: 'Full custom-coded design' },
];

/* Published marketing-email top-up ladder: 5,000 → ₹499 · 12,000 → ₹899 · 40,000 → ₹1,999 */
const EMAIL_TOPUPS = [
  { recipients: 5000, cost: 499 },
  { recipients: 12000, cost: 899 },
  { recipients: 40000, cost: 1999 },
];

function emailTopUpCost(extraPerMonth: number) {
  if (extraPerMonth <= 0) return { cost: 0, note: '' };
  const pack = EMAIL_TOPUPS.find((t) => t.recipients >= extraPerMonth) ?? EMAIL_TOPUPS[EMAIL_TOPUPS.length - 1];
  const packs = Math.ceil(extraPerMonth / pack.recipients);
  return {
    cost: pack.cost * packs * 12,
    note: `${packs > 1 ? `${packs} × ` : ''}${pack.recipients.toLocaleString('en-IN')}-recipient top-up each month`,
  };
}

const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

function Row({ label, hint, value, set, min, max, step }:
  { label: string; hint: string; value: number; set: (n: number) => void;
    min: number; max: number; step: number }) {
  return (
    <div className="calcrow">
      <label>
        <span className="cl">{label}</span>
        <span className="ch">{hint}</span>
      </label>
      <div className="cin">
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => set(Number(e.target.value))} aria-label={label} />
        <input type="number" min={min} max={max} value={value}
          onChange={(e) => set(Math.max(min, Math.min(max, Number(e.target.value) || 0)))}
          aria-label={`${label}, exact number`} />
      </div>
    </div>
  );
}

export default function SecondYearCalculator() {
  const [donors, setDonors] = useState(2500);
  const [donationsPm, setDonationsPm] = useState(400);
  const [emailsPm, setEmailsPm] = useState(2000);
  const [waPm, setWaPm] = useState(800);
  const [tookAdvanced, setTookAdvanced] = useState(true);

  const result = useMemo(() => {
    // receipts follow donations — one donation issues one receipt
    const receiptsPm = donationsPm;

    // Starter runs the CMS portal and cannot host, patch or support a
    // custom-coded site, so it is not a renewal option for anyone who took the
    // Advanced website in year one. Growth is the floor for them.
    const eligible = tookAdvanced ? PLANS.filter((p) => p.id !== 'starter') : PLANS;
    const fits = eligible.find((p) => donors <= p.donors && receiptsPm <= p.receipts);
    const outgrown = !fits;
    const plan = fits ?? PLANS[PLANS.length - 1];

    const receiptOver = Math.max(0, receiptsPm - plan.receipts);
    const receiptCost = receiptOver * plan.overage * 12;

    const emailOver = Math.max(0, emailsPm - plan.emails);
    const email = emailTopUpCost(emailOver);

    const waCost = plan.waRate ? waPm * plan.waRate * 12 : 0;
    const waBlocked = waPm > 0 && plan.waRate === null;

    const base = plan.annual;
    const usage = receiptCost + email.cost + waCost;
    const gst = (base + usage) * 0.18;

    return {
      plan, outgrown, receiptsPm, receiptOver, receiptCost,
      emailOver, emailNote: email.note, emailCost: email.cost,
      waCost, waBlocked, base, usage, gst, total: base + usage + gst,
    };
  }, [donors, donationsPm, emailsPm, waPm, tookAdvanced]);

  return (
    <div className="calc">
      <div className="calcgrid">
        <div className="calcinputs">
          <div className="calcrow calctoggle">
            <label>
              <span className="cl">We took the Advanced custom-coded website in year one</span>
              <span className="ch">
                If you did, Starter is not a renewal option — it runs the CMS portal and cannot
                host or support a custom-coded site. Growth is the floor. We would rather print
                that here than have you find it at renewal.
              </span>
            </label>
            <div className="cin">
              <button type="button" className={`seg${tookAdvanced ? ' on' : ''}`}
                aria-pressed={tookAdvanced} onClick={() => setTookAdvanced(true)}>Yes</button>
              <button type="button" className={`seg${!tookAdvanced ? ' on' : ''}`}
                aria-pressed={!tookAdvanced} onClick={() => setTookAdvanced(false)}>No</button>
            </div>
          </div>
          <Row label="Active donors" hint="People you actually work with. Sleeping donors are free and unlimited, so leave them out."
            value={donors} set={setDonors} min={100} max={30000} step={100} />
          <Row label="Donations a month" hint="Each one issues its own 80G receipt, so this drives your receipt count too."
            value={donationsPm} set={setDonationsPm} min={0} max={20000} step={50} />
          <Row label="Marketing emails a month" hint="Recipients, not sends. Receipts and confirmations are free and not counted here."
            value={emailsPm} set={setEmailsPm} min={0} max={60000} step={500} />
          <Row label="WhatsApp messages a month" hint="Meta charges for each one. We add no platform fee on top."
            value={waPm} set={setWaPm} min={0} max={30000} step={100} />
        </div>

        <div className="calcout">
          {result.outgrown ? (
            <>
              <p className="colbl">At this volume</p>
              <p className="coplan">Custom</p>
              <p className="conote">
                You are past what Advanced holds — {PLANS[2].donors.toLocaleString('en-IN')} donors
                and {PLANS[2].receipts.toLocaleString('en-IN')} receipts a month. That is a Custom
                plan from ₹15,000 a month + GST, negotiated against your actual numbers rather than
                estimated here.
              </p>
            </>
          ) : (
            <>
              <p className="colbl">Your second year needs</p>
              <p className="coplan">{result.plan.name}</p>
              <p className="cototal">{inr(result.total)}<span> for the year, all in</span></p>

              <ul className="colines">
                <li><span>{result.plan.name} plan</span><b>{inr(result.base)}</b></li>
                {result.receiptOver > 0 && (
                  <li>
                    <span>{result.receiptOver.toLocaleString('en-IN')} receipts a month beyond the plan,
                      at {result.plan.overage.toFixed(2)} each</span>
                    <b>{inr(result.receiptCost)}</b>
                  </li>
                )}
                {result.emailCost > 0 && (
                  <li><span>{result.emailNote}</span><b>{inr(result.emailCost)}</b></li>
                )}
                {result.waCost > 0 && (
                  <li>
                    <span>{(waPm * 12).toLocaleString('en-IN')} WhatsApp messages
                      at ₹{result.plan.waRate?.toFixed(2)}</span>
                    <b>{inr(result.waCost)}</b>
                  </li>
                )}
                <li><span>GST @ 18%</span><b>{inr(result.gst)}</b></li>
              </ul>

              <p className="conote">
                Website on this plan: <strong>{result.plan.site}</strong>.
                {result.waBlocked && ' WhatsApp starts from the Growth plan, so those messages are not costed here.'}
              </p>
            </>
          )}
        </div>
      </div>

      <p className="calcfoot">
        An estimate of running cost from the published plan limits and add-on rates, not a
        quotation. It picks the cheapest plan that genuinely holds the numbers you entered, then
        prices whatever still spills over. If you took the Advanced custom-coded website, Growth is as low as you can go, because Starter cannot support that site. Stepping down a plan changes your running limits and the
        website that comes with it — the site itself runs on our platform either way.
      </p>
    </div>
  );
}

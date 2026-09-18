import React, { useState } from 'react';
import WebsiteTracks from './WebsiteTracks';
import { useNavigate } from 'react-router-dom';
import ContactUsForm from '@/pages/ContactUsForm'; // ← adjust path to your ContactUsForm

const colors = {
  midnightBlue: '#0B1929',
  darkBlue: '#162438',
  white: '#FFFFFF',
  gold: '#D4AF37',
  lightGold: '#F5E6D3',
  cream: '#FDF8F0',
  royalBlue: '#4169E1',
  glowGold: 'rgba(212, 175, 55, 0.3)',
  glowGoldSoft: 'rgba(212, 175, 55, 0.12)',
};





const customCodingContent = {
  description: `Every business is unique. Our custom coding service is for those who need a truly bespoke digital experience no templates, no limitations. Whether it's a SaaS platform, a complex web application, or a high-performance marketing site, our team architects the perfect solution.`,
  process: [
    { step: '01', title: 'Discovery Call', desc: 'We understand your vision, goals, and technical requirements.' },
    { step: '02', title: 'Proposal & Scope', desc: 'Detailed project scope, timeline, and transparent pricing.' },
    { step: '03', title: 'Design & Prototype', desc: 'Wireframes and interactive prototypes before a single line of code.' },
    { step: '04', title: 'Development', desc: 'Agile sprints with regular demos and updates.' },
    { step: '05', title: 'Testing & Launch', desc: 'Rigorous QA, performance testing, and smooth go-live.' },
    { step: '06', title: 'Support & Scale', desc: 'Ongoing maintenance and feature additions as you grow.' },
  ],
  techStack: ['Front End (React, TypeScript, Angular)', 'Back End (Node.js, Python, Springboot)', 'Databases (MySQL, MongoDB, PostgreSQL)', 'APIs & Integrations', 'Custom CMS Development'],
};





// ── CONTACT MODAL OVERLAY ───────────────────────────────────────────────────
const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '20px',
          background: colors.midnightBlue,
          border: '1px solid rgba(212,175,55,0.3)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px', right: '12px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50%',
            width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.1rem',
            zIndex: 10,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
        >✕</button>
        <ContactUsForm />
      </div>
    </div>
  );
};

// ── MOBILE COMPARISON TABLE ─────────────────────────────────────────────────
const MobileComparisonTable = ({ plans, comparison, onOpenContact }: { plans: any[]; comparison: any[]; onOpenContact: () => void }) => {
  const recommendedIdx = plans.findIndex((p: any) => p.recommended);
  const [activeIdx, setActiveIdx] = useState(recommendedIdx >= 0 ? recommendedIdx : 0);
  const activePlan = plans[activeIdx];

  return (
    <div className="mobile-table">
      <div style={{
        display: 'flex', gap: '0.4rem', marginBottom: '1.2rem',
        background: 'rgba(255,255,255,0.03)', borderRadius: '14px',
        padding: '0.3rem', border: '1px solid rgba(255,255,255,0.07)',
      }}>
        {plans.map((plan: any, i: number) => (
          <button key={i} onClick={() => setActiveIdx(i)} style={{
            flex: 1, padding: '0.55rem 0.2rem', borderRadius: '10px', border: 'none',
            background: activeIdx === i
              ? plan.recommended ? `linear-gradient(135deg, ${colors.gold}, #B7950B)` : 'rgba(255,255,255,0.1)'
              : 'transparent',
            color: activeIdx === i
              ? plan.recommended ? colors.midnightBlue : colors.gold
              : 'rgba(255,255,255,0.45)',
            fontFamily: "'Inter', sans-serif", fontSize: '0.62rem',
            fontWeight: activeIdx === i ? 700 : 500, cursor: 'pointer',
            transition: 'all 0.25s', lineHeight: 1.3,
            boxShadow: activeIdx === i && plan.recommended ? '0 2px 10px rgba(212,175,55,0.3)' : 'none',
          }}>
            {plan.recommended && activeIdx === i && (
              <div style={{ fontSize: '0.42rem', letterSpacing: '0.05em', marginBottom: '2px', opacity: 0.9 }}>BEST</div>
            )}
            {plan.shortName || plan.name}
          </button>
        ))}
      </div>

      <div style={{
        background: activePlan.recommended
          ? 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))'
          : 'rgba(255,255,255,0.04)',
        borderRadius: '14px', padding: '1rem 1.2rem', marginBottom: '1rem',
        border: activePlan.recommended
          ? '1px solid rgba(212,175,55,0.4)' : '1px solid rgba(255,255,255,0.08)',
      }}>
        {activePlan.recommended && (
          <div style={{
            display: 'inline-block',
            background: `linear-gradient(135deg, ${colors.gold}, #B7950B)`,
            color: colors.midnightBlue, fontSize: '0.5rem', fontWeight: 800,
            padding: '2px 10px', borderRadius: '20px', letterSpacing: '0.1em',
            textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: "'Inter', sans-serif",
          }}>Recommended</div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{
              fontFamily: "'Libre Baskerville', serif", fontSize: '1.15rem', fontWeight: 700,
              color: activePlan.recommended ? colors.gold : colors.white, marginBottom: '0.2rem',
            }}>{activePlan.name}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>{activePlan.tagline}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem', fontWeight: 700,
              color: activePlan.recommended ? colors.gold : colors.white, lineHeight: 1,
            }}>{activePlan.price}</div>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: '0.55rem',
              color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>/{activePlan.period}</div>
          </div>
        </div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.02)', borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: '1.2rem',
      }}>
        {comparison.map((feature: any, i: number) => {
          const val = feature.values[activeIdx];
          return (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.6rem 1rem',
              background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
              borderBottom: i < comparison.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)' }}>{feature.name}</span>
              <span style={{ minWidth: '60px', textAlign: 'right' }}>
                {val === true ? (
                  <span style={{ color: '#4CAF50', fontSize: '1rem', fontWeight: 700 }}>✓</span>
                ) : val === false ? (
                  <span style={{ color: 'rgba(255,80,80,0.6)', fontSize: '0.95rem' }}>✗</span>
                ) : (
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '0.68rem',
                    color: activePlan.recommended ? colors.gold : 'rgba(255,255,255,0.7)',
                    fontWeight: activePlan.recommended ? 600 : 400,
                  }}>{val}</span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      <button onClick={onOpenContact} style={{
        width: '100%', padding: '0.85rem', borderRadius: '50px',
        border: activePlan.recommended ? 'none' : '1px solid rgba(212,175,55,0.35)',
        background: activePlan.recommended
          ? `linear-gradient(135deg, ${colors.gold}, #B7950B)`
          : activePlan.isCustom ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.06)',
        color: activePlan.recommended ? colors.midnightBlue : colors.gold,
        fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', fontWeight: 700,
        cursor: 'pointer', letterSpacing: '0.05em',
        boxShadow: activePlan.recommended ? '0 6px 20px rgba(212,175,55,0.35)' : 'none',
      }}>{activePlan.isCustom ? 'Request Custom Quote' : 'Book Now'}</button>
    </div>
  );
};

// ── PLAN CARD (desktop) ─────────────────────────────────────────────────────
const PlanCard = ({ plan, onOpenContact }: { plan: any; onOpenContact: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: plan.recommended
          ? `linear-gradient(145deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))`
          : plan.isCustom
          ? `linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`
          : `linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))`,
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '24px', padding: '2rem 1.5rem',
        border: plan.recommended
          ? `1px solid rgba(212,175,55,0.5)`
          : hovered ? `1px solid rgba(212,175,55,0.3)` : `1px solid rgba(255,255,255,0.08)`,
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-8px)' : plan.recommended ? 'translateY(-4px)' : 'none',
        boxShadow: hovered
          ? `0 20px 60px rgba(212,175,55,0.25), 0 0 40px rgba(212,175,55,0.1)`
          : plan.recommended ? `0 12px 40px rgba(212,175,55,0.2)` : `0 4px 20px rgba(0,0,0,0.3)`,
        flex: '1', minWidth: '240px', maxWidth: '280px',
      }}
    >
      {plan.recommended && (
        <div style={{
          position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
          background: `linear-gradient(135deg, ${colors.gold}, #B7950B)`,
          color: colors.midnightBlue, fontSize: '0.65rem', fontWeight: 800,
          padding: '5px 16px', borderRadius: '20px', letterSpacing: '0.1em',
          textTransform: 'uppercase', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif",
        }}>Recommended</div>
      )}
      {plan.isCustom && (
        <div style={{
          position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
          background: `linear-gradient(135deg, rgba(212,175,55,0.8), rgba(183,149,11,0.8))`,
          color: colors.midnightBlue, fontSize: '0.65rem', fontWeight: 800,
          padding: '5px 16px', borderRadius: '20px', letterSpacing: '0.1em',
          textTransform: 'uppercase', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif",
        }}>Flexible</div>
      )}

      <div style={{ marginBottom: '0.5rem' }}>
        <h3 style={{
          fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem', fontWeight: 700,
          color: plan.recommended ? colors.gold : colors.lightGold, margin: 0, letterSpacing: '-0.01em',
        }}>{plan.name}</h3>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)',
          margin: '0.3rem 0 0', lineHeight: 1.4,
        }}>{plan.tagline}</p>
      </div>

      <div style={{ margin: '1.2rem 0', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.2rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
          <span style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: plan.isCustom ? '1.6rem' : '2rem', fontWeight: 700,
            color: plan.recommended ? colors.gold : colors.white, lineHeight: 1,
          }}>{plan.price}</span>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>/{plan.period}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {plan.features.map((f: string, i: number) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <span style={{ color: colors.gold, fontSize: '0.75rem', marginTop: '2px', flexShrink: 0 }}>✓</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>{f}</span>
          </div>
        ))}
        {plan.notIncluded?.map((f: string, i: number) => (
          <div key={`n-${i}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <span style={{ color: 'rgba(255,80,80,0.6)', fontSize: '0.75rem', marginTop: '2px', flexShrink: 0 }}>✗</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>{f}</span>
          </div>
        ))}
      </div>

      <button onClick={onOpenContact} style={{
        width: '100%', padding: '0.85rem', borderRadius: '50px',
        border: plan.recommended ? 'none' : `1px solid rgba(212,175,55,0.3)`,
        background: plan.recommended
          ? `linear-gradient(135deg, ${colors.gold}, #B7950B)`
          : plan.isCustom
          ? `linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.1))`
          : `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
        color: plan.recommended ? colors.midnightBlue : colors.gold,
        fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', fontWeight: 700,
        cursor: 'pointer', letterSpacing: '0.05em', transition: 'all 0.3s',
      }}
        onMouseEnter={e => {
          (e.target as HTMLElement).style.transform = 'scale(1.03)';
          (e.target as HTMLElement).style.boxShadow = `0 6px 20px rgba(212,175,55,0.3)`;
        }}
        onMouseLeave={e => {
          (e.target as HTMLElement).style.transform = 'scale(1)';
          (e.target as HTMLElement).style.boxShadow = 'none';
        }}
      >{plan.isCustom ? 'Request Custom Quote' : 'Book Now'}</button>
    </div>
  );
};

const SCROLL_MARGIN = '140px';

const SectionHeader = ({ title, subtitle, id }: { title: string; subtitle: string; id: string }) => (
  <div id={id} style={{ textAlign: 'center', marginBottom: '3rem', scrollMarginTop: SCROLL_MARGIN, paddingTop: '1rem' }}>
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
      background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)',
      borderRadius: '50px', padding: '0.5rem 1.2rem', marginBottom: '1.2rem',
    }}>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: colors.gold, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{title}</span>
    </div>
    <h2 style={{
      fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
      color: colors.white, margin: '0 0 0.8rem', letterSpacing: '-0.02em', lineHeight: 1.2,
    }}>{title} <span style={{ color: colors.gold }}>Pricing</span></h2>
    <p style={{
      fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.55)',
      maxWidth: '560px', margin: '0 auto', lineHeight: 1.6,
    }}>{subtitle}</p>
  </div>
);

// ── MAIN PAGE ───────────────────────────────────────────────────────────────
const WebsitesPricingPage: React.FC = () => {
  const [showContact, setShowContact] = useState(false);
  const navigate = useNavigate();

  const handleContact = () => setShowContact(true);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #060b13 0%, #0B1929 40%, #060b13 100%)',
      color: colors.white, padding: '0',
    }}>
      {/* ── CONTACT FORM MODAL ── */}
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />

      {/* Hero */}
      <div style={{
        textAlign: 'center',
        padding: 'clamp(100px, 15vw, 140px) 1.5rem clamp(3rem, 6vw, 5rem)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: '50px', padding: '0.5rem 1.4rem', marginBottom: '1.5rem',
        }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: colors.gold, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Website Pricing Plans</span>
        </div>
        <h1 style={{
          fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700, margin: '0 0 1rem', letterSpacing: '-0.03em', lineHeight: 1.15, color: colors.white,
        }}>Predictable Pricing.<br /><span style={{ color: colors.gold }}>No Surprises.</span></h1>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
          color: 'rgba(255,255,255,0.55)', maxWidth: '560px', margin: '0 auto 2rem', lineHeight: 1.7,
        }}>Great value at affordable rates. No hidden costs, no frills. Choose the platform that powers your growth.</p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Choose your build', id: 'website-tracks' },
            
            { label: 'Custom Coding', id: 'custom-coding' },
          ].map(nav => (
            <button key={nav.id}
              onClick={() => {
                const el = document.getElementById(nav.id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: colors.gold,
                background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)',
                borderRadius: '50px', padding: '0.55rem 1.2rem', transition: 'all 0.3s',
                fontWeight: 500, cursor: 'pointer',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.2)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.1)')}
            >{nav.label}</button>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)', margin: '0 0 4rem' }} />

      {/* Choose your build — platform x purpose */}
      <WebsiteTracks />

      <section id="custom-coding" style={{ padding: '0 clamp(1rem, 5vw, 4rem) 6rem', scrollMarginTop: SCROLL_MARGIN, paddingTop: '1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)',
            borderRadius: '50px', padding: '0.5rem 1.2rem', marginBottom: '1.2rem',
          }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: colors.gold, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Custom Coded</span>
          </div>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: colors.white, margin: '0 0 0.8rem', letterSpacing: '-0.02em' }}>Built from <span style={{ color: colors.gold }}>Scratch</span></h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.55)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>{customCodingContent.description}</p>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '3rem' }}>
            {customCodingContent.process.map((step, i) => (
              <div key={i} style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                backdropFilter: 'blur(10px)', borderRadius: '18px', padding: '1.5rem',
                border: '1px solid rgba(212,175,55,0.12)', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.border = '1px solid rgba(212,175,55,0.35)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.border = '1px solid rgba(212,175,55,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
              >
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '2rem', color: 'rgba(212,175,55,0.25)', fontWeight: 700, marginBottom: '0.6rem', lineHeight: 1 }}>{step.step}</div>
                <h4 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1rem', color: colors.gold, margin: '0 0 0.5rem' }}>{step.title}</h4>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(145deg, rgba(212,175,55,0.08), rgba(212,175,55,0.03))',
            borderRadius: '20px', padding: '2rem',
            border: '1px solid rgba(212,175,55,0.2)', marginBottom: '2.5rem', textAlign: 'center',
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: colors.gold, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Our Tech Stack</p>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {customCodingContent.techStack.map((tech, i) => (
                <span key={i} style={{
                  fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: colors.lightGold,
                  background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: '50px', padding: '0.45rem 1rem',
                }}>{tech}</span>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.5rem', color: colors.white, marginBottom: '0.8rem' }}>Ready to build something <span style={{ color: colors.gold }}>extraordinary?</span></h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.8rem' }}>Share your requirements and get a detailed proposal within 24 hours.</p>
            <button onClick={() => navigate('/contact-us')} style={{
              background: `linear-gradient(135deg, ${colors.gold}, #B7950B)`,
              color: colors.midnightBlue, border: 'none', padding: '1rem 2.5rem',
              borderRadius: '50px', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem',
              fontWeight: 800, cursor: 'pointer', letterSpacing: '0.05em', transition: 'all 0.3s',
              boxShadow: `0 8px 30px rgba(212,175,55,0.3)`,
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'scale(1.05)'; (e.target as HTMLElement).style.boxShadow = `0 12px 40px rgba(212,175,55,0.4)`; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'scale(1)'; (e.target as HTMLElement).style.boxShadow = `0 8px 30px rgba(212,175,55,0.3)`; }}
            >Share Your Requirements</button>
          </div>
        </div>
      </section>

      <style>{`
        * { box-sizing: border-box; }
.desktop-cards { display: flex !important; }
        .mobile-table   { display: none !important; }
        @media (max-width: 767px) {
          .desktop-cards { display: none !important; }
          .mobile-table   { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export default WebsitesPricingPage;

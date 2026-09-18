import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactUsForm from '@/pages/ContactUsForm'; // ← adjust path to your ContactUsForm

const colors = {
  midnightBlue: '#0B1929',
  gold: '#D4AF37',
  lightGold: '#F5E6D3',
  white: '#FFFFFF',
  glowGold: 'rgba(212, 175, 55, 0.3)',
};

const portfolioItems = [
  { title: 'NGO', link: '/services/social-media/ngo', desc: 'Impactful storytelling for non-profits' },
  { title: 'Real Estate', link: '/services/social-media/real-estate', desc: 'Premium property showcasing' },
  { title: 'Ecommerce', link: '/services/social-media/ecommerce', desc: 'Product-driven social campaigns' },
  { title: 'Hospitality', link: '/services/social-media/hospitality', desc: 'Premium travel & resort storytelling' },
];

const plans = [
  {
    name: 'Basic Plan',
    shortName: 'Basic',
    price: 'Rs.14,999',
    period: '/monthly',
    recommended: false,
    tagline: 'Get started with social media',
    platforms: ['Facebook', 'Instagram'],
    features: [
      { label: 'Postings Per Month', value: '8 posts' },
      { label: 'Videos', value: '2/month' },
      { label: 'Bulk Posts', value: '2 (25 photos)' },
      { label: 'Blogs', value: '4/month' },
      { label: 'Carousels', value: '3/month' },
      { label: 'Profile Setup', value: 'Basic' },
      { label: 'Caption Writing', value: 'AI-created' },
      { label: 'Insights & Reports', value: 'Every 2 months' },
      { label: 'Festival Posts', value: 'Basic' },
      { label: 'Content Calendar', value: 'Basic' },
    ],
    notIncluded: [
      'Strategy Meetings',
      'Quick Posts (Last-Minute)',
      'Website Maintenance',
      'Landing Page',
      'Case Studies',
      'Customization',
      'Video Editing',
      'Community Engagement',
    ],
  },
  {
    name: 'Standard Plan',
    shortName: 'Standard',
    price: 'Rs.17,999',
    period: '/monthly',
    recommended: true,
    tagline: 'Most popular for growing brands',
    platforms: ['Facebook', 'Instagram', 'LinkedIn', '+ 1 more'],
    features: [
      { label: 'Postings Per Month', value: '15 posts' },
      { label: 'Videos', value: '4/month' },
      { label: 'Bulk Posts', value: '4 (50 photos)' },
      { label: 'Blogs', value: '8/month' },
      { label: 'Carousels', value: '6/month' },
      { label: 'Profile Setup', value: 'Standard' },
      { label: 'Caption Writing', value: 'Manual' },
      { label: 'Insights & Reports', value: 'Monthly' },
      { label: 'Festival Posts', value: 'Standard' },
      { label: 'Content Calendar', value: 'Standard' },
      { label: 'Strategy Meetings', value: 'Every 2 months' },
      { label: 'Quick Posts', value: 'Up to 2' },
      { label: 'Website Maintenance', value: 'Basic (24hrs)' },
      { label: 'Landing Page', value: '1/month' },
      { label: 'Case Studies', value: '2/month' },
      { label: 'Video Editing', value: 'Up to 4' },
      { label: 'Community Engagement', value: '24hr response' },
    ],
    notIncluded: [],
  },
  {
    name: 'Advance Plan',
    shortName: 'Advance',
    price: 'Rs.19,999',
    period: '/monthly',
    recommended: false,
    tagline: 'Full-scale social domination',
    platforms: ['Facebook', 'Instagram', 'Twitter', 'YouTube', 'Google', 'LinkedIn'],
    features: [
      { label: 'Postings Per Month', value: '25 posts' },
      { label: 'Videos', value: '10/month' },
      { label: 'Bulk Posts', value: '6 (100 photos)' },
      { label: 'Blogs', value: '16/month' },
      { label: 'Carousels', value: '9/month' },
      { label: 'Profile Setup', value: 'Advanced' },
      { label: 'Caption Writing', value: 'Manual' },
      { label: 'Insights & Reports', value: 'Monthly' },
      { label: 'Festival Posts', value: 'Customized' },
      { label: 'Content Calendar', value: 'Customized' },
      { label: 'Strategy Meetings', value: 'Monthly' },
      { label: 'Quick Posts', value: 'Up to 4' },
      { label: 'Website Maintenance', value: 'Advanced (4hrs)' },
      { label: 'Landing Page', value: '2/month' },
      { label: 'Case Studies', value: '5/month' },
      { label: 'Video Editing', value: 'Up to 12' },
      { label: 'Community Engagement', value: '8hr response' },
    ],
    notIncluded: [],
  },
];

const allFeatureLabels = Array.from(
  new Set(plans.flatMap(p => p.features.map(f => f.label)))
);

const smComparison = allFeatureLabels.map(label => ({
  name: label,
  values: plans.map(plan => {
    const found = plan.features.find(f => f.label === label);
    if (found) return found.value;
    return false;
  }),
}));

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
        {/* Close button */}
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
const MobileComparisonTable = ({ onOpenContact }: { onOpenContact: () => void }) => {
  const recommendedIdx = plans.findIndex(p => p.recommended);
  const [activeIdx, setActiveIdx] = useState(recommendedIdx >= 0 ? recommendedIdx : 0);
  const activePlan = plans[activeIdx];

  return (
    <div className="mobile-table">
      <div style={{
        display: 'flex', gap: '0.4rem', marginBottom: '1.2rem',
        background: 'rgba(255,255,255,0.03)', borderRadius: '14px',
        padding: '0.3rem', border: '1px solid rgba(255,255,255,0.07)',
      }}>
        {plans.map((plan, i) => (
          <button key={i} onClick={() => setActiveIdx(i)} style={{
            flex: 1, padding: '0.6rem 0.2rem', borderRadius: '10px', border: 'none',
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
            {plan.shortName}
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.5rem' }}>
              {activePlan.platforms.map((p, i) => (
                <span key={i} style={{
                  fontFamily: "'Inter', sans-serif", fontSize: '0.58rem', color: 'rgba(255,255,255,0.55)',
                  background: 'rgba(255,255,255,0.07)', borderRadius: '5px', padding: '2px 6px',
                }}>{p}</span>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: '0.5rem' }}>
            <div style={{
              fontFamily: "'Libre Baskerville', serif", fontSize: '1.2rem', fontWeight: 700,
              color: activePlan.recommended ? colors.gold : colors.white, lineHeight: 1,
            }}>{activePlan.price}</div>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: '0.55rem',
              color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>{activePlan.period}</div>
          </div>
        </div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.02)', borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: '1.2rem',
      }}>
        {activePlan.features.map((feature, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.6rem 1rem',
            background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
            borderBottom: i < activePlan.features.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', paddingRight: '0.5rem' }}>{feature.label}</span>
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: '0.68rem',
              color: activePlan.recommended ? colors.gold : 'rgba(255,255,255,0.8)',
              fontWeight: activePlan.recommended ? 600 : 400, textAlign: 'right', flexShrink: 0, maxWidth: '45%',
            }}>{feature.value}</span>
          </div>
        ))}
        {activePlan.notIncluded.length > 0 && (
          <>
            <div style={{
              padding: '0.5rem 1rem', background: 'rgba(255,50,50,0.04)',
              borderTop: '1px solid rgba(255,255,255,0.04)',
            }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', color: 'rgba(255,100,100,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Not Included</span>
            </div>
            {activePlan.notIncluded.map((f, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.5rem 1rem', background: 'rgba(255,50,50,0.02)',
                borderBottom: i < activePlan.notIncluded.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
              }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>{f}</span>
                <span style={{ color: 'rgba(255,80,80,0.55)', fontSize: '0.9rem' }}>✗</span>
              </div>
            ))}
          </>
        )}
      </div>

      <button onClick={onOpenContact} style={{
        width: '100%', padding: '0.85rem', borderRadius: '50px',
        border: activePlan.recommended ? 'none' : '1px solid rgba(212,175,55,0.35)',
        background: activePlan.recommended
          ? `linear-gradient(135deg, ${colors.gold}, #B7950B)` : 'rgba(255,255,255,0.06)',
        color: activePlan.recommended ? colors.midnightBlue : colors.gold,
        fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', fontWeight: 700,
        cursor: 'pointer', letterSpacing: '0.05em',
        boxShadow: activePlan.recommended ? '0 6px 20px rgba(212,175,55,0.35)' : 'none',
      }}>Book Now</button>
    </div>
  );
};

// ── DESKTOP PLAN CARD ───────────────────────────────────────────────────────
const PlanCard: React.FC<{ plan: typeof plans[0]; onOpenContact: () => void }> = ({ plan, onOpenContact }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: plan.recommended
          ? 'linear-gradient(145deg, rgba(212,175,55,0.13), rgba(212,175,55,0.05))'
          : 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '28px', padding: '2rem 1.6rem 1.8rem',
        border: plan.recommended
          ? '1px solid rgba(212,175,55,0.48)'
          : hovered ? '1px solid rgba(212,175,55,0.28)' : '1px solid rgba(255,255,255,0.07)',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-8px)' : plan.recommended ? 'translateY(-6px)' : 'none',
        boxShadow: hovered
          ? '0 24px 60px rgba(212,175,55,0.22), 0 0 40px rgba(212,175,55,0.08)'
          : plan.recommended ? '0 16px 50px rgba(212,175,55,0.18)' : '0 4px 24px rgba(0,0,0,0.3)',
        flex: '1', minWidth: '280px', maxWidth: '360px',
      }}
    >
      {plan.recommended && (
        <div style={{
          position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)',
          background: `linear-gradient(135deg, ${colors.gold}, #B7950B)`,
          color: colors.midnightBlue, fontSize: '0.62rem', fontWeight: 800,
          padding: '5px 18px', borderRadius: '20px', letterSpacing: '0.12em',
          textTransform: 'uppercase', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif",
          boxShadow: '0 4px 14px rgba(212,175,55,0.4)',
        }}>Recommended</div>
      )}

      <h3 style={{
        fontFamily: "'Libre Baskerville', serif", fontSize: '1.35rem', fontWeight: 700,
        color: plan.recommended ? colors.gold : colors.lightGold, margin: '0 0 0.3rem',
      }}>{plan.name}</h3>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {plan.platforms.map((p, i) => (
          <span key={i} style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)',
            background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '2px 8px',
          }}>{p}</span>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.2rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
          <span style={{
            fontFamily: "'Libre Baskerville', serif", fontSize: '2.1rem', fontWeight: 700,
            color: plan.recommended ? colors.gold : colors.white, lineHeight: 1,
          }}>{plan.price}/-</span>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em',
          }}>{plan.period}</span>
        </div>
      </div>

      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', color: colors.gold,
        fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
        marginBottom: '0.8rem', margin: '0 0 0.8rem',
      }}>Includes:</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
        {plan.features.map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
            <span style={{ color: colors.gold, fontSize: '0.72rem', flexShrink: 0, marginTop: '2px' }}>✓</span>
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.72)', lineHeight: 1.45,
            }}>
              <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>{f.label}:</strong> {f.value}
            </span>
          </div>
        ))}
        {plan.notIncluded.map((f, i) => (
          <div key={`x-${i}`} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
            <span style={{ color: 'rgba(255,80,80,0.55)', fontSize: '0.72rem', flexShrink: 0, marginTop: '2px' }}>✗</span>
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.28)', lineHeight: 1.45,
            }}>{f}: NA</span>
          </div>
        ))}
      </div>

      <button onClick={onOpenContact} style={{
        width: '100%', padding: '0.9rem', borderRadius: '50px',
        border: plan.recommended ? 'none' : '1px solid rgba(212,175,55,0.3)',
        background: plan.recommended
          ? `linear-gradient(135deg, ${colors.gold}, #B7950B)`
          : `linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.05))`,
        color: plan.recommended ? colors.midnightBlue : colors.gold,
        fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', fontWeight: 700,
        cursor: 'pointer', letterSpacing: '0.05em', transition: 'all 0.3s',
      }}
        onMouseEnter={e => {
          (e.target as HTMLButtonElement).style.transform = 'scale(1.03)';
          (e.target as HTMLButtonElement).style.boxShadow = '0 6px 24px rgba(212,175,55,0.3)';
        }}
        onMouseLeave={e => {
          (e.target as HTMLButtonElement).style.transform = 'scale(1)';
          (e.target as HTMLButtonElement).style.boxShadow = 'none';
        }}
      >Book Now</button>
    </div>
  );
};

// ── MAIN PAGE ───────────────────────────────────────────────────────────────
const SocialMediaPricingPage: React.FC = () => {
  const [hoveredPortfolio, setHoveredPortfolio] = useState<string | null>(null);
  const [showContact, setShowContact] = useState(false);

  const handleContact = () => setShowContact(true);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #060b13 0%, #0B1929 40%, #060b13 100%)',
      color: colors.white,
    }}>
      {/* ── CONTACT FORM MODAL ── */}
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />

      {/* Hero */}
      <div style={{
        textAlign: 'center',
        padding: 'clamp(100px, 14vw, 140px) 1.5rem clamp(2.5rem, 5vw, 4rem)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: '50px', padding: '0.5rem 1.4rem', marginBottom: '1.5rem',
        }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: colors.gold, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Social Media Marketing</span>
        </div>
        <h1 style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700,
          margin: '0 0 1rem', letterSpacing: '-0.03em', lineHeight: 1.15,
        }}>Grow Your Brand.<br /><span style={{ color: colors.gold }}>Dominate Social.</span></h1>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', color: 'rgba(255,255,255,0.5)',
          maxWidth: '540px', margin: '0 auto 2rem', lineHeight: 1.7,
        }}>Predictable pricing. No surprises. Great value at an affordable rate. No hidden costs, no frills.</p>
        <button
          onClick={() => document.getElementById('sm-pricing')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            background: `linear-gradient(135deg, ${colors.gold}, #B7950B)`,
            color: colors.midnightBlue, border: 'none', padding: '0.9rem 2rem',
            borderRadius: '50px', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem',
            fontWeight: 800, cursor: 'pointer', letterSpacing: '0.05em',
            boxShadow: '0 8px 30px rgba(212,175,55,0.3)',
          }}>View Plans & Pricing</button>
      </div>

      <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)', margin: '0 0 4rem' }} />

      {/* Portfolio Section */}
      <section style={{ padding: '0 clamp(1rem, 5vw, 4rem) 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: colors.white,
            margin: '0 0 0.6rem', letterSpacing: '-0.02em',
          }}>Our Social Media <span style={{ color: colors.gold }}>Portfolio</span></h2>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.45)', maxWidth: '500px', margin: '0 auto',
          }}>Explore our work across industries real results, real clients.</p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem', maxWidth: '1100px', margin: '0 auto 2rem',
        }}>
          {portfolioItems.map((item, i) => {
            const k = `smport-${i}`;
            return (
              <Link key={k} to={item.link}
                onMouseEnter={() => setHoveredPortfolio(k)}
                onMouseLeave={() => setHoveredPortfolio(null)}
                style={{
                  background: hoveredPortfolio === k
                    ? 'linear-gradient(145deg, rgba(212,175,55,0.12), rgba(212,175,55,0.05))'
                    : 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                  backdropFilter: 'blur(10px)', borderRadius: '18px', padding: '1.5rem',
                  border: hoveredPortfolio === k ? '1px solid rgba(212,175,55,0.35)' : '1px solid rgba(255,255,255,0.07)',
                  textDecoration: 'none', color: colors.white,
                  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                  transform: hoveredPortfolio === k ? 'translateY(-5px)' : 'none',
                  boxShadow: hoveredPortfolio === k ? '0 12px 30px rgba(212,175,55,0.18)' : 'none',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: '0.6rem', textAlign: 'center',
                }}>
                <span style={{
                  fontFamily: "'Libre Baskerville', serif", fontSize: '0.95rem', fontWeight: 700,
                  color: hoveredPortfolio === k ? colors.gold : colors.white, transition: 'color 0.3s',
                }}>{item.title}</span>
                <span style={{
                  fontFamily: "'Inter', sans-serif", fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.45)', lineHeight: 1.4,
                }}>{item.desc}</span>
              </Link>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', marginBottom: '0.8rem' }}>
            Need social media services for your brand?
          </p>
          <button onClick={() => document.getElementById('sm-pricing')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)',
              color: colors.gold, padding: '0.7rem 1.8rem', borderRadius: '50px',
              fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.1)')}
          >View Pricing Plans</button>
        </div>
      </section>

      <div style={{ width: '90%', maxWidth: '900px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)', margin: '0 auto 5rem' }} />

      {/* Pricing Section */}
      <section id="sm-pricing" style={{ padding: '0 clamp(1rem, 5vw, 4rem) 6rem', scrollMarginTop: '120px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: colors.white,
            margin: '0 0 0.8rem', letterSpacing: '-0.02em',
          }}>Plans & <span style={{ color: colors.gold }}>Pricing</span></h2>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.95rem',
            color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto',
          }}>Predictable Pricing. No Surprises. Great value at an affordable rate.</p>
        </div>

        <div className="desktop-cards" style={{
          display: 'flex', gap: '1.4rem', flexWrap: 'wrap',
          justifyContent: 'center', maxWidth: '1200px', margin: '0 auto', alignItems: 'flex-start',
        }}>
          {plans.map((plan, i) => <PlanCard key={i} plan={plan} onOpenContact={handleContact} />)}
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <MobileComparisonTable onOpenContact={handleContact} />
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

export default SocialMediaPricingPage;

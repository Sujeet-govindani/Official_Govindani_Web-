// ============================================================
// FILE: src/components/ServicesOffered/SocialMedia/SocialMediaLanding.tsx
// ADD ROUTE: /social-media
// This page opens when user clicks "Social Media Marketing" in header.
// Shows 6 industry cards → each redirects to its specific SMM page.
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceSection from '@/components/HomePage/ServicesSection';

const industryCards = [
  {
    title: 'NGO',
    icon: '',
    desc: 'Donor-friendly storytelling, impact campaigns and recurring donation systems.',
    route: '/services/social-media/ngo',
    stats: '10+ Cr Donations Raised',
  },
  {
    title: 'Real Estate',
    icon: '',
    desc: 'Project launches, walk-through reels, CRM-integrated lead capture campaigns.',
    route: '/services/social-media/real-estate',
    stats: '300%+ Sales Growth',
  },
  {
    title: 'Ecommerce',
    icon: '',
    desc: 'Product content, offer campaigns and UTM-tracked order-driving social systems.',
    route: '/services/social-media/ecommerce',
    stats: '700+ Orders / Day',
  },
  {
    title: 'Hospitality',
    icon: '',
    desc: 'Cinematic visual reels, gourmet showcases, and customized direct booking funnels.',
    route: '/services/social-media/hospitality',
    stats: 'OTAs Optimized & Direct Booking',
  },
  {
    title: 'Numerology & Astrology',
    icon: '',
    desc: 'Authority content, course launches and session booking funnels for spiritual brands.',
    route: '/services/social-media/astrology',
    stats: 'Calm · Aesthetic · Authoritative',
  },
  {
    title: 'Personal Branding',
    icon: '',
    desc: 'Ghostwritten in your voice LinkedIn, Instagram and YouTube content that builds authority.',
    route: '/services/social-media/personal-branding',
    stats: 'Your Voice · Our System',
  },
];

export default function SocialMediaLanding() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060b13',
      color: '#fff',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      paddingTop: '110px',
    }}>

      {/* ── HERO ── */}
      <div style={{
        textAlign: 'center',
        padding: '60px clamp(16px, 5vw, 80px) 48px',
        position: 'relative',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(212,175,55,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.06))',
          border: '1px solid rgba(212,175,55,0.35)',
          borderRadius: '50px',
          padding: '6px 20px',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#D4AF37',
          fontWeight: 600,
          marginBottom: '20px',
        }}>
          Social Media Marketing
        </div>

        <h1 style={{
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 700,
          lineHeight: 1.15,
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #fff 40%, #D4AF37)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Choose Your Industry
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2vw, 19px)',
          color: 'rgba(255,255,255,0.55)',
          maxWidth: '560px',
          margin: '0 auto 16px',
          lineHeight: 1.7,
        }}>
          We build tailored social media systems for each industry  
          click your category to see exactly what we do for you.
        </p>

        {/* Stats strip */}
        <div style={{
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '32px',
        }}>
          {[
            { val: '10+ Cr', label: 'Donations Raised' },
            { val: '300%+', label: 'Real Estate Growth' },
            { val: '700+', label: 'Orders / Day' },
            { val: '6', label: 'Industries' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#D4AF37', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)', margin: '0 clamp(16px,5vw,80px)' }} />

      {/* ── CARDS GRID ── */}
      <div style={{
        padding: '60px clamp(16px, 5vw, 80px) 80px',
        maxWidth: '1280px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2px',
          background: 'rgba(212,175,55,0.08)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          {industryCards.map((card) => {
            const hovered = hoveredCard === card.title;
            return (
              <div
                key={card.title}
                onClick={() => navigate(card.route)}
                onMouseEnter={() => setHoveredCard(card.title)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: hovered ? 'rgba(212,175,55,0.07)' : '#0a1120',
                  padding: '40px 36px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderLeft: hovered ? '3px solid #D4AF37' : '3px solid transparent',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Hover glow */}
                {hovered && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse 60% 40% at 20% 30%, rgba(212,175,55,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Icon */}
                <div style={{
                  fontSize: '44px',
                  marginBottom: '16px',
                  transition: 'transform 0.3s',
                  transform: hovered ? 'scale(1.1)' : 'scale(1)',
                  display: 'inline-block',
                }}>
                  {card.icon}
                </div>

                {/* Category label */}
                <div style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#D4AF37',
                  marginBottom: '8px',
                  fontWeight: 600,
                }}>
                  Social Media for
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: 'clamp(20px, 2.5vw, 26px)',
                  fontWeight: 700,
                  color: hovered ? '#fff' : 'rgba(255,255,255,0.9)',
                  marginBottom: '14px',
                  lineHeight: 1.2,
                  transition: 'color 0.3s',
                }}>
                  {card.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.65,
                  marginBottom: '24px',
                }}>
                  {card.desc}
                </p>

                {/* Stats badge */}
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  borderRadius: '50px',
                  padding: '5px 14px',
                  fontSize: '0.72rem',
                  color: '#D4AF37',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  marginBottom: '24px',
                }}>
                  {card.stats}
                </div>

                {/* CTA arrow */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: hovered ? '#D4AF37' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.3s',
                }}>
                  <span>View {card.title} Social Media</span>
                  <span style={{
                    transform: hovered ? 'translateX(6px)' : 'translateX(0)',
                    transition: 'transform 0.3s',
                    display: 'inline-block',
                  }}>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div style={{
        textAlign: 'center',
        padding: '0 clamp(16px,5vw,80px) 80px',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.03))',
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: '24px',
          padding: '48px 32px',
          maxWidth: '680px',
          margin: '0 auto',
        }}>
          <p style={{ fontSize: 'clamp(18px,3vw,28px)', fontWeight: 600, color: '#fff', marginBottom: '12px', lineHeight: 1.3 }}>
            Not sure which fits your brand?
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px', lineHeight: 1.6 }}>
            Book a free strategy call we'll map the right social media system for your industry and goals.
          </p>
          <button
            onClick={() => navigate('/contact-us')}
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #B7950B)',
              color: '#0B1929',
              border: 'none',
              padding: '14px 36px',
              borderRadius: '50px',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(212,175,55,0.4)';
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Book a Free Strategy Call
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          div[style*="padding: '40px 36px'"] {
            padding: 28px 20px !important;
          }
        }
      `}</style>
      <ServiceSection/>
    </div>
  );
}
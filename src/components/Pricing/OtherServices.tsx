import React, { useState } from 'react';
import ContactUsForm from '@/pages/ContactUsForm'; // ← adjust path to your ContactUsForm

const colors = {
  midnightBlue: '#0B1929',
  gold: '#D4AF37',
  lightGold: '#F5E6D3',
  white: '#FFFFFF',
};

const serviceCategories = [
  {
    id: 'seo',
    title: 'SEO',
    plans: [
      {
        name: 'SEO Starter', shortName: 'Starter', price: '₹9,999', period: '/monthly',
        tagline: 'Perfect for new websites',
        features: [
          { label: 'Target Keywords', value: 'Up to 10' },
          { label: 'On-page SEO', value: 'Full optimization' },
          { label: 'Search Console Setup', value: 'Included' },
          { label: 'Monthly Report', value: 'Ranking report' },
          { label: 'Technical SEO Audit', value: 'Included' },
        ],
        notIncluded: ['Link Building', 'Content Creation', 'Local SEO'],
      },
      {
        name: 'SEO Growth', shortName: 'Growth', price: '₹19,999', period: '/monthly',
        tagline: 'Best for growing businesses', recommended: true,
        features: [
          { label: 'Target Keywords', value: 'Up to 30' },
          { label: 'On-page + Off-page SEO', value: 'Full' },
          { label: 'Link Building', value: '10/month' },
          { label: 'Content SEO', value: '4 blogs/month' },
          { label: 'Local SEO', value: 'Included' },
          { label: 'Monthly Report', value: 'Performance report' },
          { label: 'Competitor Analysis', value: 'Included' },
        ],
        notIncluded: [],
      },
      {
        name: 'SEO Authority', shortName: 'Authority', price: '₹34,999', period: '/monthly',
        tagline: 'Dominate search results',
        features: [
          { label: 'Target Keywords', value: 'Unlimited' },
          { label: 'Link Building', value: '25+/month' },
          { label: 'Content Strategy', value: 'Full creation' },
          { label: 'E-commerce SEO', value: 'Included' },
          { label: 'Reporting Cadence', value: 'Weekly' },
          { label: 'Reputation Mgmt', value: 'Included' },
          { label: 'Technical Audit', value: 'Monthly' },
        ],
        notIncluded: [],
      },
    ],
    comparison: [
      { name: 'Keywords',      values: ['10',       '30',        'Unlimited'] },
      { name: 'On-page SEO',   values: [true,       true,        true]        },
      { name: 'Off-page SEO',  values: [false,      true,        true]        },
      { name: 'Link Building', values: [false,      '10/mo',     '25+/mo']    },
      { name: 'Content/Blogs', values: [false,      '4/mo',      'Full']      },
      { name: 'Local SEO',     values: [false,      true,        true]        },
      { name: 'Tech Audit',    values: ['One-time', 'Monthly',   'Monthly']   },
      { name: 'Reporting',     values: ['Monthly',  'Monthly',   'Weekly']    },
      { name: 'Competitor',    values: [false,      true,        true]        },
      { name: 'E-comm SEO',    values: [false,      false,       true]        },
      { name: 'Reputation',    values: [false,      false,       true]        },
    ],
  },
  {
    id: 'meta-ads',
    title: 'Meta Ads',
    plans: [
      {
        name: 'Ads Starter', shortName: 'Starter', price: '₹7,999', period: '/monthly',
        tagline: 'Launch your first campaigns',
        features: [
          { label: 'Ad Spend', value: 'Up to ₹25,000' },
          { label: 'Campaigns', value: '2' },
          { label: 'Audience Targeting', value: 'Basic' },
          { label: 'Monthly Report', value: 'Performance' },
          { label: 'Platforms', value: 'FB + Instagram' },
        ],
        notIncluded: ['Retargeting', 'Video Ads', 'A/B Testing'],
      },
      {
        name: 'Ads Pro', shortName: 'Pro', price: '₹14,999', period: '/monthly',
        tagline: 'Scale your ad performance', recommended: true,
        features: [
          { label: 'Ad Spend', value: 'Up to ₹75,000' },
          { label: 'Campaigns', value: '5' },
          { label: 'Audience Targeting', value: 'Advanced' },
          { label: 'Retargeting', value: 'Included' },
          { label: 'A/B Testing', value: 'Included' },
          { label: 'Video & Carousel', value: 'Included' },
          { label: 'Performance Calls', value: 'Bi-weekly' },
        ],
        notIncluded: [],
      },
      {
        name: 'Ads Elite', shortName: 'Elite', price: '₹24,999', period: '/monthly',
        tagline: 'Full-scale ad domination',
        features: [
          { label: 'Ad Spend', value: 'Unlimited mgmt' },
          { label: 'Campaigns', value: 'Unlimited' },
          { label: 'Strategy', value: 'Full-funnel' },
          { label: 'Lookalike Audiences', value: 'Included' },
          { label: 'Dynamic Product Ads', value: 'Included' },
          { label: 'Performance Calls', value: 'Weekly' },
          { label: 'Dedicated Manager', value: 'Assigned' },
        ],
        notIncluded: [],
      },
    ],
    comparison: [
      { name: 'Ad Spend',      values: ['₹25k',    '₹75k',      'Unlimited'] },
      { name: 'Campaigns',     values: ['2',        '5',         'Unlimited'] },
      { name: 'Targeting',     values: ['Basic',    'Advanced',  'Advanced']  },
      { name: 'Retargeting',   values: [false,      true,        true]        },
      { name: 'A/B Testing',   values: [false,      true,        true]        },
      { name: 'Video Ads',     values: [false,      true,        true]        },
      { name: 'Lookalike',     values: [false,      false,       true]        },
      { name: 'Dynamic Ads',   values: [false,      false,       true]        },
      { name: 'Calls',         values: ['Monthly',  'Bi-weekly', 'Weekly']    },
      { name: 'Ded. Manager',  values: [false,      false,       true]        },
    ],
  },
  {
    id: 'google-ads',
    title: 'Google Ads',
    plans: [
      {
        name: 'Google Basic', shortName: 'Basic', price: '₹8,999', period: '/monthly',
        tagline: 'Start appearing on Google',
        features: [
          { label: 'Ad Spend', value: 'Up to ₹30,000' },
          { label: 'Campaign Type', value: 'Search' },
          { label: 'Keywords', value: '30' },
          { label: 'Monthly Report', value: 'Included' },
          { label: 'Conversion Tracking', value: 'Basic' },
        ],
        notIncluded: ['Display Network', 'Shopping Ads', 'Remarketing'],
      },
      {
        name: 'Google Standard', shortName: 'Standard', price: '₹17,999', period: '/monthly',
        tagline: 'Best for most businesses', recommended: true,
        features: [
          { label: 'Ad Spend', value: 'Up to ₹80,000' },
          { label: 'Campaign Types', value: 'Search + Display' },
          { label: 'Shopping Ads', value: 'Included' },
          { label: 'Remarketing', value: 'Included' },
          { label: 'Conversion Tracking', value: 'Advanced' },
          { label: 'Optimization', value: 'Bi-weekly' },
          { label: 'Competitor Analysis', value: 'Included' },
        ],
        notIncluded: [],
      },
      {
        name: 'Google Premium', shortName: 'Premium', price: '₹29,999', period: '/monthly',
        tagline: 'Maximum Google presence',
        features: [
          { label: 'Ad Spend', value: 'Unlimited mgmt' },
          { label: 'All Ad Formats', value: 'Included' },
          { label: 'YouTube Ads', value: 'Included' },
          { label: 'Performance Max', value: 'Included' },
          { label: 'Smart Bidding', value: 'Included' },
          { label: 'Weekly Calls', value: 'Included' },
          { label: 'Attribution Setup', value: 'Full' },
        ],
        notIncluded: [],
      },
    ],
    comparison: [
      { name: 'Ad Spend',      values: ['₹30k',     '₹80k',      'Unlimited'] },
      { name: 'Search',        values: [true,        true,        true]        },
      { name: 'Display',       values: [false,       true,        true]        },
      { name: 'Shopping Ads',  values: [false,       true,        true]        },
      { name: 'Remarketing',   values: [false,       true,        true]        },
      { name: 'YouTube Ads',   values: [false,       false,       true]        },
      { name: 'Perf. Max',     values: [false,       false,       true]        },
      { name: 'Smart Bidding', values: [false,       false,       true]        },
      { name: 'Optimization',  values: ['Monthly',   'Bi-weekly', 'Weekly']   },
      { name: 'Attribution',   values: ['Basic',     'Advanced',  'Full']     },
    ],
  },
  {
    id: 'videography',
    title: 'Videography',
    plans: [
      {
        name: 'Video Starter', shortName: 'Starter', price: '₹12,999', period: '/project',
        tagline: 'Professional video production',
        features: [
          { label: 'Videos', value: '1 (up to 2 min)' },
          { label: 'Shooting', value: 'Professional' },
          { label: 'Editing', value: 'Basic + color grade' },
          { label: 'Revisions', value: '2 rounds' },
          { label: 'Delivery', value: '1080p' },
        ],
        notIncluded: ['Voiceover', 'Animation', 'Social Cuts'],
      },
      {
        name: 'Video Pro', shortName: 'Pro', price: '₹24,999', period: '/project',
        tagline: 'Complete video solution', recommended: true,
        features: [
          { label: 'Videos', value: '3 (up to 3 min)' },
          { label: 'Shooting', value: 'Pro + lighting' },
          { label: 'Editing', value: 'Advanced + grading' },
          { label: 'Sound Design', value: 'Music included' },
          { label: 'Voiceover', value: 'Script included' },
          { label: 'Social Cuts', value: 'Included' },
          { label: 'Delivery', value: '4K' },
          { label: 'Revisions', value: '4 rounds' },
        ],
        notIncluded: [],
      },
      {
        name: 'Video Premium', shortName: 'Premium', price: '₹49,999', period: '/project',
        tagline: 'Cinematic excellence',
        features: [
          { label: 'Videos', value: '6 (up to 5 min)' },
          { label: 'Shooting', value: 'Multi-location' },
          { label: 'Editing', value: 'Cinematic grade' },
          { label: 'Sound Design', value: 'Full design' },
          { label: 'Script Writing', value: 'Included' },
          { label: 'Motion Graphics', value: '2D/3D included' },
          { label: 'Delivery', value: '4K + vertical' },
          { label: 'Revisions', value: 'Unlimited' },
        ],
        notIncluded: [],
      },
    ],
    comparison: [
      { name: 'No. of Videos',  values: ['1',         '3',          '6']         },
      { name: 'Max Duration',   values: ['2 min',     '3 min',      '5 min']     },
      { name: 'Shooting',       values: ['Pro',       'Pro+Lights', 'Multi-loc'] },
      { name: 'Color Grading',  values: ['Basic',     'Advanced',   'Cinematic'] },
      { name: 'Sound Design',   values: [false,       'Music',      'Full']      },
      { name: 'Voiceover',      values: [false,       true,         true]        },
      { name: 'Script Writing', values: [false,       false,        true]        },
      { name: 'Motion Graphics',values: [false,       false,        '2D/3D']     },
      { name: 'Social Cuts',    values: [false,       true,         true]        },
      { name: 'Resolution',     values: ['1080p',     '4K',         '4K+Vert']  },
      { name: 'Revisions',      values: ['2',         '4',          '∞']         },
    ],
  },
  {
    id: 'logo-design',
    title: 'Logo & Branding',
    plans: [
      {
        name: 'Logo Basic', shortName: 'Basic', price: '₹4,999', period: '/one-time',
        tagline: 'Clean, professional logo',
        features: [
          { label: 'Logo Concepts', value: '3 initial' },
          { label: 'Revisions', value: '2 rounds' },
          { label: 'Files', value: 'PNG & SVG' },
          { label: 'Transparent BG', value: 'Included' },
          { label: 'Color Variations', value: 'Dark/light' },
        ],
        notIncluded: ['Brand Guidelines', 'Stationery', 'Social Media Kit'],
      },
      {
        name: 'Brand Identity', shortName: 'Identity', price: '₹14,999', period: '/one-time',
        tagline: 'Complete brand identity', recommended: true,
        features: [
          { label: 'Logo Concepts', value: '5 initial' },
          { label: 'Revisions', value: 'Unlimited' },
          { label: 'Brand Guidelines', value: 'Full PDF' },
          { label: 'Color + Typography', value: 'Complete palette' },
          { label: 'Business Card', value: 'Included' },
          { label: 'Letterhead', value: 'Included' },
          { label: 'Social Media Kit', value: 'Profile kit' },
          { label: 'Source Files', value: 'All included' },
        ],
        notIncluded: [],
      },
      {
        name: 'Complete Branding', shortName: 'Complete', price: '₹29,999', period: '/one-time',
        tagline: 'Full visual identity system',
        features: [
          { label: 'Visual Identity', value: 'Full system' },
          { label: 'Brand Strategy', value: 'Document included' },
          { label: 'Stationery Suite', value: 'Complete' },
          { label: 'Social Templates', value: '20+ templates' },
          { label: 'Presentation Template', value: 'Included' },
          { label: 'Brand Pattern & Icons', value: 'Included' },
          { label: 'Style Guide', value: '60+ pages' },
          { label: 'Brand Consultant', value: 'Dedicated' },
        ],
        notIncluded: [],
      },
    ],
    comparison: [
      { name: 'Logo Concepts',  values: ['3',        '5',         'Bespoke']   },
      { name: 'Revisions',      values: ['2',        '∞',         '∞']         },
      { name: 'Files',          values: ['PNG/SVG',  'All files', 'All files'] },
      { name: 'Brand Guidelines',values:[false,      'Full PDF',  '60+ pages'] },
      { name: 'Color Palette',  values: [false,      true,        true]        },
      { name: 'Business Card',  values: [false,      true,        true]        },
      { name: 'Letterhead',     values: [false,      true,        true]        },
      { name: 'Social Kit',     values: [false,      'Basic',     '20+ tpls']  },
      { name: 'Stationery',     values: [false,      false,       'Complete']  },
      { name: 'Strategy Doc',   values: [false,      false,       true]        },
      { name: 'Consultant',     values: [false,      false,       true]        },
    ],
  },
  {
    id: 'lead-gen',
    title: 'Lead Generation',
    plans: [
      {
        name: 'Lead Starter', shortName: 'Starter', price: '₹11,999', period: '/monthly',
        tagline: 'Start generating leads',
        features: [
          { label: 'Qualified Leads', value: 'Up to 50/month' },
          { label: 'Channels', value: 'LinkedIn + Meta' },
          { label: 'Lead Qualification', value: 'Basic' },
          { label: 'Monthly Report', value: 'Included' },
          { label: 'Industries', value: '1 niche' },
        ],
        notIncluded: ['CRM Integration', 'Email Sequences', 'Multi-channel'],
      },
      {
        name: 'Lead Pro', shortName: 'Pro', price: '₹22,999', period: '/monthly',
        tagline: 'Scale your lead pipeline', recommended: true,
        features: [
          { label: 'Qualified Leads', value: 'Up to 150/month' },
          { label: 'Channels', value: 'Multi-channel' },
          { label: 'CRM Integration', value: 'Included' },
          { label: 'Email Sequences', value: 'Automated' },
          { label: 'Lead Scoring', value: 'Included' },
          { label: 'Weekly Calls', value: 'Included' },
          { label: 'Industries', value: '3 niches' },
        ],
        notIncluded: [],
      },
      {
        name: 'Lead Enterprise', shortName: 'Enterprise', price: '₹39,999', period: '/monthly',
        tagline: 'Enterprise-grade lead engine',
        features: [
          { label: 'Qualified Leads', value: 'Unlimited' },
          { label: 'Strategy', value: 'Full-funnel' },
          { label: 'Dedicated BDR', value: 'Assigned' },
          { label: 'CRM Workflows', value: 'Custom' },
          { label: 'Inbound Strategy', value: 'Content-led' },
          { label: 'Reporting', value: 'Daily dashboard' },
          { label: 'Industries', value: 'Unlimited' },
        ],
        notIncluded: [],
      },
    ],
    comparison: [
      { name: 'Leads/Month',   values: ['50',       '150',       'Unlimited'] },
      { name: 'Channels',      values: ['2',        'Multi',     'All']       },
      { name: 'CRM Integ.',    values: [false,      true,        'Custom']    },
      { name: 'Email Seqs.',   values: [false,      'Automated', 'Custom']    },
      { name: 'Lead Scoring',  values: [false,      true,        true]        },
      { name: 'Ded. BDR',      values: [false,      false,       true]        },
      { name: 'Inbound Strat.',values: [false,      false,       true]        },
      { name: 'Reporting',     values: ['Monthly',  'Weekly',    'Daily']     },
      { name: 'Industries',    values: ['1',        '3',         'Unlimited'] },
    ],
  },
];

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
const MobileComparisonTable = ({ category, onOpenContact }: { category: any; onOpenContact: () => void }) => {
  const recommendedIdx = category.plans.findIndex((p: any) => p.recommended);
  const [activeIdx, setActiveIdx] = useState(recommendedIdx >= 0 ? recommendedIdx : 0);
  const activePlan = category.plans[activeIdx];

  return (
    <div className="mobile-table" style={{ marginTop: '1.5rem' }}>
      <div style={{
        display: 'flex', gap: '0.4rem', marginBottom: '1.2rem',
        background: 'rgba(255,255,255,0.03)', borderRadius: '14px',
        padding: '0.3rem', border: '1px solid rgba(255,255,255,0.07)',
      }}>
        {category.plans.map((plan: any, i: number) => (
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
          }}>Best Value</div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{
              fontFamily: "'Libre Baskerville', serif", fontSize: '1.1rem', fontWeight: 700,
              color: activePlan.recommended ? colors.gold : colors.white, marginBottom: '0.2rem',
            }}>{activePlan.name}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>{activePlan.tagline}</div>
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
        {category.comparison.map((row: any, i: number) => {
          const val = row.values[activeIdx];
          return (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.6rem 1rem',
              background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
              borderBottom: i < category.comparison.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>{row.name}</span>
              <span style={{ minWidth: '70px', textAlign: 'right' }}>
                {val === true ? (
                  <span style={{ color: '#4CAF50', fontSize: '1rem', fontWeight: 700 }}>✓</span>
                ) : val === false ? (
                  <span style={{ color: 'rgba(255,80,80,0.6)', fontSize: '0.95rem' }}>✗</span>
                ) : (
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '0.68rem',
                    color: activePlan.recommended ? colors.gold : 'rgba(255,255,255,0.75)',
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
          ? `linear-gradient(135deg, ${colors.gold}, #B7950B)` : 'rgba(255,255,255,0.06)',
        color: activePlan.recommended ? colors.midnightBlue : colors.gold,
        fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', fontWeight: 700,
        cursor: 'pointer', letterSpacing: '0.05em',
        boxShadow: activePlan.recommended ? '0 6px 20px rgba(212,175,55,0.35)' : 'none',
      }}>Get Started</button>
    </div>
  );
};

// ── DESKTOP MINI PLAN CARD ──────────────────────────────────────────────────
const MiniPlanCard: React.FC<{ plan: any; onOpenContact: () => void }> = ({ plan, onOpenContact }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: plan.recommended
          ? 'linear-gradient(145deg, rgba(212,175,55,0.13), rgba(212,175,55,0.05))'
          : 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '1.5rem 1.2rem',
        border: plan.recommended
          ? '1px solid rgba(212,175,55,0.42)'
          : hovered ? '1px solid rgba(212,175,55,0.25)' : '1px solid rgba(255,255,255,0.07)',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-6px)' : plan.recommended ? 'translateY(-3px)' : 'none',
        boxShadow: hovered
          ? '0 16px 40px rgba(212,175,55,0.18)'
          : plan.recommended ? '0 10px 30px rgba(212,175,55,0.14)' : '0 2px 16px rgba(0,0,0,0.25)',
        flex: '1', minWidth: '200px', maxWidth: '280px',
      }}
    >
      {plan.recommended && (
        <div style={{
          position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
          background: `linear-gradient(135deg, ${colors.gold}, #B7950B)`,
          color: colors.midnightBlue, fontSize: '0.58rem', fontWeight: 800,
          padding: '4px 14px', borderRadius: '20px', letterSpacing: '0.1em',
          textTransform: 'uppercase', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif",
        }}>Best Value</div>
      )}
      <h4 style={{
        fontFamily: "'Libre Baskerville', serif", fontSize: '1rem', fontWeight: 700,
        color: plan.recommended ? colors.gold : colors.lightGold, margin: '0 0 0.6rem',
      }}>{plan.name}</h4>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '1rem' }}>
        <span style={{
          fontFamily: "'Libre Baskerville', serif", fontSize: '1.5rem', fontWeight: 700,
          color: plan.recommended ? colors.gold : colors.white, lineHeight: 1,
        }}>{plan.price}</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)' }}>{plan.period}</span>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.38rem', marginBottom: '1.2rem' }}>
        {plan.features.map((f: any, i: number) => (
          <div key={i} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
            <span style={{ color: colors.gold, fontSize: '0.65rem', flexShrink: 0, marginTop: '2px' }}>✓</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>
              <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{f.label}:</strong> {f.value}
            </span>
          </div>
        ))}
        {plan.notIncluded?.map((f: string, i: number) => (
          <div key={`x-${i}`} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
            <span style={{ color: 'rgba(255,80,80,0.5)', fontSize: '0.65rem', flexShrink: 0, marginTop: '2px' }}>✗</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', lineHeight: 1.4 }}>{f}</span>
          </div>
        ))}
      </div>
      <button onClick={onOpenContact} style={{
        width: '100%', padding: '0.7rem', borderRadius: '50px',
        border: plan.recommended ? 'none' : '1px solid rgba(212,175,55,0.28)',
        background: plan.recommended
          ? `linear-gradient(135deg, ${colors.gold}, #B7950B)` : 'rgba(212,175,55,0.08)',
        color: plan.recommended ? colors.midnightBlue : colors.gold,
        fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 700,
        cursor: 'pointer', letterSpacing: '0.05em', transition: 'all 0.3s',
      }}>Get Started</button>
    </div>
  );
};

// ── MAIN PAGE ───────────────────────────────────────────────────────────────
const OtherServicesPricingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('seo');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [showContact, setShowContact] = useState(false);

  const active = serviceCategories.find(c => c.id === activeCategory)!;
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
        position: 'relative',
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
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: colors.gold, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Other Services</span>
        </div>
        <h1 style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700,
          margin: '0 0 1rem', letterSpacing: '-0.03em', lineHeight: 1.15,
        }}>All Services.<br /><span style={{ color: colors.gold }}>One Agency.</span></h1>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(0.9rem, 2vw, 1rem)', color: 'rgba(255,255,255,0.5)',
          maxWidth: '520px', margin: '0 auto', lineHeight: 1.7,
        }}>From SEO to videography every service priced transparently, delivered professionally.</p>
      </div>

      <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)', margin: '0 0 3rem' }} />

      {/* Category Tabs */}
      <div style={{ padding: '0 clamp(1rem, 4vw, 3rem)', marginBottom: '3rem' }}>
        <div style={{
          display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center',
          maxWidth: '900px', margin: '0 auto',
        }}>
          {serviceCategories.map(cat => (
            <button key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              onMouseEnter={() => setHoveredTab(cat.id)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{
                padding: '0.6rem 1.1rem', borderRadius: '50px',
                border: activeCategory === cat.id
                  ? '1px solid rgba(212,175,55,0.5)'
                  : hoveredTab === cat.id ? '1px solid rgba(212,175,55,0.25)' : '1px solid rgba(255,255,255,0.08)',
                background: activeCategory === cat.id
                  ? 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.08))'
                  : hoveredTab === cat.id ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
                color: activeCategory === cat.id ? colors.gold : 'rgba(255,255,255,0.6)',
                fontFamily: "'Inter', sans-serif", fontSize: '0.8rem',
                fontWeight: activeCategory === cat.id ? 700 : 400,
                cursor: 'pointer', transition: 'all 0.25s',
                boxShadow: activeCategory === cat.id ? '0 4px 16px rgba(212,175,55,0.2)' : 'none',
              }}>
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Active Category Plans */}
      <section style={{ padding: '0 clamp(1rem, 5vw, 4rem) 6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: colors.white,
            margin: '0 0 0.6rem', letterSpacing: '-0.02em',
          }}>{active.title} <span style={{ color: colors.gold }}>Pricing</span></h2>
        </div>

        <div className="desktop-cards" style={{
          display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center',
          maxWidth: '1000px', margin: '0 auto', alignItems: 'flex-start',
        }}>
          {active.plans.map((plan, i) => <MiniPlanCard key={i} plan={plan} onOpenContact={handleContact} />)}
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <MobileComparisonTable category={active} onOpenContact={handleContact} />
        </div>

        {/* Custom CTA */}
        <div style={{
          maxWidth: '600px', margin: '3.5rem auto 0',
          background: 'linear-gradient(145deg, rgba(212,175,55,0.1), rgba(212,175,55,0.04))',
          borderRadius: '24px', padding: '2rem',
          border: '1px solid rgba(212,175,55,0.2)', textAlign: 'center',
        }}>
          <h3 style={{
            fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem',
            color: colors.white, margin: '0 0 0.5rem',
          }}>Need a <span style={{ color: colors.gold }}>Custom Package?</span></h3>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.48)', lineHeight: 1.6, margin: '0 0 1.5rem',
          }}>Combine multiple services, get a bundle discount, or have unique requirements? We'll craft a bespoke plan just for you.</p>
          <button onClick={handleContact} style={{
            background: `linear-gradient(135deg, ${colors.gold}, #B7950B)`,
            color: colors.midnightBlue, border: 'none', padding: '0.85rem 2rem',
            borderRadius: '50px', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem',
            fontWeight: 800, cursor: 'pointer', letterSpacing: '0.05em',
            boxShadow: '0 8px 28px rgba(212,175,55,0.3)', transition: 'all 0.3s',
          }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1.04)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 12px 36px rgba(212,175,55,0.4)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(212,175,55,0.3)';
            }}
          >Request Custom Quote</button>
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

export default OtherServicesPricingPage;

import { Link } from 'react-router-dom';
import Header from '@/components/HomePage/Header';
import '@/styles/portfolio-index.css';

/**
 * Portfolio index — every website category we build, each tile linking to its
 * category page (which lists the actual projects). Reached from the homepage
 * "Check hundreds more" button.
 */
const CATEGORIES = [
  { name: 'E-Commerce', to: '/portfolio/ecommerce', desc: 'Custom online stores, marketplaces & D2C brands.', g: 'linear-gradient(150deg,#7a3f12,#c9772a)' },
  { name: 'Business Websites', to: '/portfolio/business', desc: 'Corporate, brand & service websites that convert.', g: 'linear-gradient(150deg,#1f3a5f,#3f7bbf)' },
  { name: 'NGO & Donations', to: '/portfolio/ngo', desc: '80G-compliant donation platforms & nonprofit sites.', g: 'linear-gradient(150deg,#6d1f22,#c0392b)' },
  { name: 'Real Estate', to: '/portfolio/builders', desc: 'Builder & property sites built for lead generation.', g: 'linear-gradient(150deg,#2f2a22,#8a6d3b)' },
  { name: 'Healthcare', to: '/portfolio/healthcare', desc: 'Clinics, hospitals & specialist practice websites.', g: 'linear-gradient(150deg,#134e4a,#2f9e91)' },
  { name: 'Hospitality & Education', to: '/portfolio/hospitality', desc: 'Schools, institutes & hospitality experiences.', g: 'linear-gradient(150deg,#4a2c5e,#8e5ab0)' },
  { name: 'Virtual Tours', to: '/portfolio/virtual-tour', desc: 'Immersive 360° tours for spaces & campuses.', g: 'linear-gradient(150deg,#0f3a4d,#2a86a8)' },
];

export default function Portfolio() {
  return (
    <>
      <Header />
      <main className="giport">
        <div className="giport-grid">
          {CATEGORIES.map((c, i) => (
            <Link key={c.to} className="giport-tile" to={c.to} style={{ ['--g' as string]: c.g }}>
              <span className="giport-tnum">{String(i + 1).padStart(2, '0')}</span>
              <span className="giport-tname">{c.name}</span>
              <span className="giport-tdesc">{c.desc}</span>
              <span className="giport-tgo">View work &rarr;</span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

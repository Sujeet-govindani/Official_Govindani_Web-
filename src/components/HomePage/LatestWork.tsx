import { Link } from 'react-router-dom';
import '@/styles/latest-work.css';

/**
 * "Check out our latest websites" — homepage showcase of three custom-built
 * sites (one per core category), each linking to the live site, plus a button
 * through to the full portfolio. Shown right after the video section.
 */
const WORKS = [
  {
    name: 'Baba Ji Ki Buti',
    category: 'E-Commerce',
    url: 'https://babajikibuti.com/home',
    display: 'babajikibuti.com',
    img: '/images/latest-work/babaji.jpg',
  },
  {
    name: 'Tarush Pranaa',
    category: 'Business Website',
    url: 'https://tarushpranaa.com',
    display: 'tarushpranaa.com',
    img: '/images/latest-work/tarush.jpg',
  },
  {
    name: 'Mahipatsinh Foundation',
    category: 'NGO & Donations',
    url: 'https://mahipatsinhfoundation.org',
    display: 'mahipatsinhfoundation.org',
    img: '/images/latest-work/mahipat.jpg',
  },
];

export default function LatestWork() {
  return (
    <section className="giwork" aria-labelledby="giwork-h">
      <div className="giwork-wrap">
        <header className="giwork-head">
          <p className="giwork-eyebrow">Custom coded · Custom developed</p>
          <h2 id="giwork-h" className="giwork-h">Check out our <em>latest websites</em></h2>
          <p className="giwork-sub">
            Real, live builds &mdash; each one custom-engineered to the client&rsquo;s own requirement, not a template.
          </p>
        </header>

        <div className="giwork-grid">
          {WORKS.map((w) => (
            <a key={w.name} className="giwork-card" href={w.url} target="_blank" rel="noopener noreferrer">
              <span className="giwork-cat">{w.category}</span>
              <span className="giwork-shot">
                <span className="giwork-bar" aria-hidden="true">
                  <i></i><i></i><i></i>
                  <span className="giwork-url">{w.display}</span>
                </span>
                <img src={w.img} alt={`${w.name} website built by Govindani Infotech`} loading="lazy" width="1280" height="820" />
              </span>
              <span className="giwork-info">
                <span className="giwork-name">{w.name}</span>
                <span className="giwork-tag">✦ Custom coded &amp; developed</span>
                <span className="giwork-visit">Visit live site &#8599;</span>
              </span>
            </a>
          ))}
        </div>

        <div className="giwork-more">
          <Link className="giwork-btn" to="/portfolio">Check hundreds more &rarr;</Link>
        </div>
      </div>
    </section>
  );
}

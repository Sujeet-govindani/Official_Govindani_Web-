import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "15M+", label: "Total Views" },
  { value: "100K+", label: "Subscribers" },
  { value: "25+", label: "Books Published" },
  { value: "2×", label: "Guinness Records" },
];

const highlights = [
  {

    title: "Guinness World Record",
    desc: "Youngest author to record 101 Startup Ideas at age 22",
  },
  {

    title: "25+ Global Books",
    desc: "All rated 4.9+ on Kindle - read by leaders, founders & creators worldwide",
  },
  {

    title: "Voice Heard by Millions",
    desc: "1,00,000+ subscribers · 15M+ views · 1 Lakh monthly avg",
  },
];

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`

        :root {
          --gold: #C9A84C;
          --gold-light: #E8C96D;
          --gold-pale: #F5E6B8;
          --white: #FAFAF8;
          --black: #000000;
          --glass-bg: rgba(255,255,255,0.04);
          --glass-border: rgba(201,168,76,0.25);
        }

        .about-section {
          background: #000;
          min-height: 100vh;
          height: auto;
          display: flex;
          align-items: center;
          padding: 60px 2vw 60px 3vw;
          box-sizing: border-box;
          overflow: visible;
          position: relative;
        }

        .about-section::before,
        .about-section::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .about-section::before {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%);
          top: -100px; right: 5%;
        }
        .about-section::after {
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%);
          bottom: -80px; left: 10%;
        }

        .about-inner {
          max-width: 1320px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 52% 1fr;
          gap: 40px;
          align-items: start;
          position: relative;
          z-index: 1;
        }

        /* ── LEFT: Image ── */
        .about-image-col {
          position: relative;
          display: flex;
          align-items: flex-start;
        }

        .image-glass-wrapper {
          position: relative;
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(10px) saturate(150%);
          -webkit-backdrop-filter: blur(10px) saturate(150%);
          box-shadow:
            0 0 0 1px rgba(201,168,76,0.15),
            0 20px 60px rgba(0,0,0,0.7),
            inset 0 1px 0 rgba(255,255,255,0.08);
          transform: translateX(${visible ? "0" : "-60px"});
          opacity: ${visible ? 1 : 0};
          transition: transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s ease;
        }

        .image-glass-wrapper .img-sizer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .image-glass-wrapper .img-sizer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          filter: brightness(0.88) contrast(1.05);
        }

        .image-glass-wrapper .img-aspect {
          width: 100%;
          padding-bottom: 115%;
          position: relative;
          pointer-events: none;
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(201,168,76,0.08) 0%,
            transparent 40%,
            rgba(0,0,0,0.3) 100%
          );
          pointer-events: none;
        }

        .image-shimmer {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold-light), transparent);
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.4; transform: scaleX(0.6); }
          50% { opacity: 1; transform: scaleX(1); }
        }

        .image-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(0,0,0,0.75);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 8px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .image-badge span {
          font-family: 'Libre Baskerville', serif;
          font-size: 11px;
          color: var(--gold-light);
          letter-spacing: 0.05em;
        }

        /* ── RIGHT: Content ── */
        .about-content-col {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 14px;
          padding-right: 0;
          transform: translateX(${visible ? "0" : "60px"});
          opacity: ${visible ? 1 : 0};
          transition: transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s, opacity 0.9s ease 0.1s;
          font-family: 'Libre Baskerville', serif;
        }

        .about-eyebrow {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          font-family: 'Libre Baskerville', serif;
          font-weight: 400;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .about-eyebrow::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: var(--gold);
        }

        .about-headline {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(22px, 2.4vw, 36px);
          font-weight: 700;
          color: var(--white);
          line-height: 1.2;
          margin: 0 0 8px 0;
        }
        .about-headline em {
          font-style: italic;
          color: var(--gold-light);
        }

        .about-subheadline {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(13px, 1.1vw, 15px);
          font-weight: 400;
          font-style: italic;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.5;
          margin: 0 0 8px 0;
          border-left: 2px solid var(--gold);
          padding-left: 14px;
        }

        .about-body {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(13px, 0.95vw, 15px);
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 1.6;
          margin: 0;
        }

        /* Stats row */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        .stat-item {
          text-align: center;
          padding: 8px 4px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          backdrop-filter: blur(10px);
          transition: border-color 0.3s, transform 0.3s;
        }
        .stat-item:hover {
          border-color: var(--gold);
          transform: translateY(-2px);
        }
        .stat-value {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(15px, 1.4vw, 20px);
          font-weight: 700;
          color: var(--gold-light);
          display: block;
          line-height: 1.1;
        }
        .stat-label {
          font-family: 'Libre Baskerville', serif;
          font-size: 9px;
          letter-spacing: 0.08em;
          color: rgba(250,250,248,0.5);
          text-transform: uppercase;
          margin-top: 3px;
          display: block;
        }

        /* Highlights */
        .highlights-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 12px;
          background: var(--glass-bg);
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 12px;
          backdrop-filter: blur(8px);
          transition: border-color 0.3s, background 0.3s;
        }
        .highlight-item:hover {
          border-color: rgba(201,168,76,0.35);
          background: rgba(201,168,76,0.05);
        }
        .highlight-icon {
          font-size: 18px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .highlight-text h3 {
          font-family: 'Libre Baskerville', serif;
          font-size: 12px;
          font-weight: 700;
          color: var(--gold-pale);
          margin: 0 0 2px 0;
          letter-spacing: 0.02em;
        }
        .highlight-text p {
          font-family: 'Libre Baskerville', serif;
          font-size: 11px;
          font-weight: 400;
          color: rgba(250,250,248,0.55);
          margin: 0;
          line-height: 1.5;
        }

        /* Divider */
        .gold-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          opacity: 0.4;
          margin: 0;
        }

        /* ── About Founder Button ── */
        .about-founder-btn-row {
          display: flex;
          justify-content: flex-end;
          padding-top: 4px;
        }

        .about-founder-btn {
          font-family: 'Libre Baskerville', serif;
          font-size: 13px;
          font-weight: 400;
          color: #6B5A2A;
          background: #F5E6B8;
          border: 1.5px solid #C9A84C;
          border-radius: 50px;
          padding: 10px 28px;
          cursor: pointer;
          letter-spacing: 0.04em;
          text-decoration: none;
          display: inline-block;
          transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.2s;
          white-space: nowrap;
        }
        .about-founder-btn:hover {
          background: #ECD48A;
          color: #4A3A10;
          border-color: #A07830;
          transform: translateY(-2px);
        }
        .about-founder-btn:active {
          transform: translateY(0px);
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .about-section {
            padding: 50px 3vw;
          }
          .about-inner {
            grid-template-columns: 48% 1fr;
            gap: 28px;
          }
        }

        @media (max-width: 900px) {
          .about-section {
            padding: 40px 5vw;
          }
          .about-inner {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .about-image-col {
            width: 100%;
          }
          .image-glass-wrapper {
            max-height: 60vh;
          }
          .image-glass-wrapper .img-aspect {
            padding-bottom: 100%;
          }
          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
          .about-content-col {
            transform: translateY(${visible ? "0" : "40px"});
          }
          .about-image-col .image-glass-wrapper {
            transform: translateY(${visible ? "0" : "-30px"});
          }
        }

        @media (max-width: 520px) {
          .about-section {
            padding: 30px 4vw 40px;
          }
          .about-headline {
            font-size: 22px;
          }
          .stats-row {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }
          .about-inner {
            gap: 20px;
          }
          .image-glass-wrapper .img-aspect {
            padding-bottom: 90%;
          }
          .image-glass-wrapper {
            max-height: 50vh;
          }
          .about-founder-btn-row {
            justify-content: center;
          }
        }
      `}</style>

      <section className="about-section" ref={sectionRef}>
        <div className="about-inner">

          {/* LEFT Image */}
          <div className="about-image-col">
            <div className="image-glass-wrapper">
              <div className="img-aspect" aria-hidden="true" />
              <div className="img-sizer">
                <img loading="lazy" decoding="async"
                  src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Sujeetsir.webp"
                  alt="Sujeet Govindani"
                />
              </div>
              <div className="image-overlay" />
              <div className="image-shimmer" />
              <div className="image-badge">

                <span>Guinness World Record Holder</span>
              </div>
            </div>
          </div>

          {/* RIGHT Content */}
          <div className="about-content-col">

            <div>
              <p className="about-eyebrow">Meet the Visionary</p>
              <h2 className="about-headline">
                Sujeet Govindani -<br />
                <em>He Doesn't Just Think Big.<br />He Builds Bigger.</em>
              </h2>
              <p className="about-subheadline">
                At 22, he shattered conventions. Today, he ignites founders, fuels CEOs,
                and leads millions toward growth, impact, and real transformation.
              </p>
              <p className="about-body">
                Imagine a mind that sees possibilities when others see problems. A young architect
                of ideas who didn't just write a book - he wrote{" "}
                <strong style={{ color: "var(--white)" }}>101 Startup Ideas</strong> the world had
                never seen before, and etched it into the Guinness World Records. Then, in less
                than a month, authored{" "}
                <strong style={{ color: "var(--white)" }}>25+ breakthrough books</strong> on digital
                marketing, strategy, SEO & growth - all published globally on Kindle, all rated
                4.9+ out of 5.
              </p>
            </div>

            {/* Stats */}
            <div className="stats-row">
              {stats.map((s) => (
                <div className="stat-item" key={s.label}>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="gold-divider" />

            {/* Highlights */}
            <div className="highlights-list">
              {highlights.map((h) => (
                <div className="highlight-item" key={h.title}>

                  <div className="highlight-text">
                    <h3>{h.title}</h3>
                    <p>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* About Founder Button */}
            <div className="about-founder-btn-row">
              <a href="/about-us/about-founder" className="about-founder-btn">
                About Founder
              </a>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
import React, { useState } from "react";

/*
 ╔═══════════════════════════════════════════════════════════════╗
 ║  SETUP:                                                       ║
 ║  1. Put book covers in: public/images/book1.jpg … book10.jpg  ║
 ║  2. Put Kindle icon in: public/images/kindle-icon.png         ║
 ║  3. Update paths below if your filenames differ               ║
 ╚═══════════════════════════════════════════════════════════════╝
*/

const KINDLE_ICON_PATH = "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/AK.png"; // ← change this to your local Kindle icon path

const GOLD = "#d4af37";
const GOLD_LIGHT = "#f4d03f";

const books = [
  { title: "The Truth About Entrepreneurship", author: "Sujeet Govindani", link: "https://amzn.in/d/0gXQ4HMo", coverImage: "https://m.media-amazon.com/images/I/81mOFOtf40S._SY522_.jpg", gradient: ["#0c1220", "#1a2744"], accent: "#E8C547" },
  { title: "All About Content Writing", author: "Sujeet Govindani", link: "https://amzn.in/d/0ev8kvWp", coverImage: "https://m.media-amazon.com/images/I/81kPFKiHSJS._SY522_.jpg", gradient: ["#0a192f", "#112d4e"], accent: "#64FFDA" },
  { title: "All About Blogging", author: "Sujeet Govindani", link: "https://amzn.in/d/0dTaH1Ou", coverImage: "https://m.media-amazon.com/images/I/81OHctalkcS._SY522_.jpg", gradient: ["#1B0A2A", "#2D1B4E"], accent: "#BD93F9" },
  { title: "All About Social Media Marketing", author: "Sujeet Govindani", link: "https://amzn.in/d/07P7rLM8", coverImage: "https://m.media-amazon.com/images/I/81NaTlpzXES._SY522_.jpg", gradient: ["#1a0000", "#3a1010"], accent: "#FF6B6B" },
  { title: "All About Affiliate Marketing", author: "Sujeet Govindani", link: "https://amzn.in/d/0cVXx8Hh", coverImage: "https://m.media-amazon.com/images/I/41Lz+aao4TL._SY445_SX342_QL70_FMwebp_.jpg", gradient: ["#002A1F", "#004d3a"], accent: "#00D9A6" },
  { title: "All About SEO", author: "Sujeet Govindani", link: "https://amzn.in/d/0g6nH25y", coverImage: "https://m.media-amazon.com/images/I/81mnFCaANCL._SY522_.jpg", gradient: ["#1C1107", "#3a2810"], accent: "#FFB347" },
  { title: "12 Social Media Hacks", author: "Sujeet Govindani", link: "https://amzn.in/d/08xdjeUA", coverImage: "https://m.media-amazon.com/images/I/81Ix5BescUL._SY522_.jpg", gradient: ["#0D1B2A", "#1B3550"], accent: "#48CAE4" },
  { title: "Building the Ultimate Marketing Agency", author: "Sujeet Govindani", link: "https://amzn.in/d/02tHy3ou", coverImage: "https://m.media-amazon.com/images/I/51VpBY68j5L._SY445_SX342_QL70_FMwebp_.jpg", gradient: ["#2A0A2A", "#4a1550"], accent: "#F472B6" },
  { title: "Accomplishing Business Deftness Part 1", author: "Sujeet Govindani", link: "https://amzn.in/d/0bAyhcal", coverImage: "https://m.media-amazon.com/images/I/81R7mNTQxFL._SY522_.jpg", gradient: ["#0A1628", "#1a2d4e"], accent: "#A8DADC" },
  { title: "Accomplishing Business Deftness Part 2", author: "Sujeet Govindani", link: "https://amzn.in/d/06Amt9bI", coverImage: "https://m.media-amazon.com/images/I/41u1DubBeOL._SY445_SX342_QL70_FMwebp_.jpg", gradient: ["#1A0A0A", "#3a1818"], accent: "#E07A5F" },
];

function FallbackCover({ book }) {
  return (
    <div
      style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "22px 16px",
        background: `linear-gradient(160deg, ${book.gradient[0]} 0%, ${book.gradient[1]} 100%)`,
        borderRadius: "0 5px 5px 0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
        <div style={{ width: 18, height: 1, background: book.accent, opacity: 0.5 }} />
        <div style={{ width: 5, height: 5, borderRadius: "50%", border: `1px solid ${book.accent}66` }} />
        <div style={{ width: 18, height: 1, background: book.accent, opacity: 0.5 }} />
      </div>
      <h3 className="book-cover-title" style={{ color: "#fff", fontFamily: "'Georgia', serif", fontSize: book.title.length > 30 ? 11 : 13, fontWeight: 700, textAlign: "center", lineHeight: 1.4, textTransform: "uppercase", letterSpacing: 1, margin: 0, textShadow: "0 2px 8px rgba(0,0,0,0.7)", padding: "0 4px" }}>
        {book.title}
      </h3>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16 }}>
        <div style={{ width: 18, height: 1, background: book.accent, opacity: 0.5 }} />
        <div style={{ width: 5, height: 5, borderRadius: "50%", border: `1px solid ${book.accent}66` }} />
        <div style={{ width: 18, height: 1, background: book.accent, opacity: 0.5 }} />
      </div>
      <p style={{ color: `${book.accent}BB`, fontFamily: "'Georgia', serif", fontSize: 8, marginTop: 14, letterSpacing: 2, textTransform: "uppercase" }}>
        {book.author}
      </p>
    </div>
  );
}

function MiniBook({ book }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const DEPTH = 28;

  const transform = hovered ? "rotate3d(0,1,0,-30deg) translateY(-6px)" : "rotate3d(0,1,0,0deg)";

  return (
    <div className="book-card">
      {/* 3D Book */}
      <div
        className="book-perspective"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => window.open(book.link, "_blank")}
      >
        <div className="book-3d" style={{ transform }}>
          {/* Front Cover */}
          <div className="book-front" style={{ background: `linear-gradient(160deg, ${book.gradient[0]}, ${book.gradient[1]})`, boxShadow: hovered ? `0 14px 40px rgba(0,0,0,0.5), 0 0 16px ${GOLD}15` : "0 4px 16px rgba(0,0,0,0.3)" }}>
            {!imgError && book.coverImage && (
              <img
                src={book.coverImage} alt={book.title}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className="book-cover-img"
                style={{ opacity: imgLoaded ? 1 : 0 }}
              />
            )}
            {(imgError || !imgLoaded) && <FallbackCover book={book} />}
            <div className="book-shine" />
            <div className="book-spine-edge" />
          </div>

          {/* Back */}
          <div className="book-back" style={{ background: `linear-gradient(160deg, ${book.gradient[0]}, ${book.gradient[1]})` }} />

          {/* Spine */}
          <div className="book-spine" style={{ background: `linear-gradient(to right, ${book.gradient[1]}, ${book.gradient[0]})` }}>
            <p className="book-spine-text">{book.title}</p>
          </div>

          {/* Pages */}
          <div className="book-pages-right" />
          <div className="book-pages-top" />
          <div className="book-pages-bottom" />
        </div>
      </div>

      {/* Info */}
      <div className="book-info">
        <h4 className="book-info-title">{book.title}</h4>
        <p className="book-info-author">{book.author}</p>
        <a
          href={book.link} target="_blank" rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="buy-btn"
        >
          Buy Now
          <img src={KINDLE_ICON_PATH} alt="Kindle" className="kindle-icon" onError={(e) => { e.target.style.display = "none"; }} />
        </a>
      </div>
    </div>
  );
}

export default function BooksShowcase() {
  const row1 = books.slice(0, 5);
  const row2 = books.slice(5, 10);

  return (
    <div className="showcase-root">
      {/* Ambient */}
      <div className="ambient-glow" />
      <div className="ambient-grid" />

      {/* Header */}
      <div className="showcase-header">
        <div className="header-badge">📘 Published Author 25+ Books</div>
        <h1 className="header-title">
          Books That Changed{" "}
          <span className="header-gold">Mindsets</span>
        </h1>
        <p className="header-sub">
          Each book is a playbook for real-world execution. Published on Kindle globally accessible.
        </p>
      </div>

      {/* ROW 1 */}
      <div className="books-row">
        {row1.map((book, i) => <MiniBook key={i} book={book} />)}
      </div>

      {/* Divider */}
      <div className="row-divider" />

      {/* ROW 2 */}
      <div className="books-row">
        {row2.map((book, i) => <MiniBook key={i + 5} book={book} />)}
      </div>

      {/* Footer */}
      <div className="showcase-footer">
        <span className="footer-badge">Available on Kindle Worldwide</span>
      </div>

      <style>{`
        .showcase-root {
          background: #000;
          min-height: 100vh;
          padding: 36px 0 44px;
          position: relative;
          font-family: 'Georgia', serif;
          overflow: hidden;
        }
        .ambient-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 15% 20%, rgba(212,175,55,0.06) 0%, transparent 50%),
                      radial-gradient(ellipse at 85% 80%, rgba(212,175,55,0.04) 0%, transparent 50%);
          pointer-events: none;
        }
        .ambient-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(212,175,55,0.012) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(212,175,55,0.012) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* Header */
        .showcase-header { text-align: center; margin-bottom: 32px; position: relative; z-index: 2; padding: 0 20px; }
        .header-badge {
          display: inline-block; color: ${GOLD}; font-size: 10px; font-weight: 600;
          letter-spacing: 3px; text-transform: uppercase; margin-bottom: 14px;
          padding: 6px 18px; border: 1px solid ${GOLD}40; border-radius: 20px;
          background: ${GOLD}0D;
        }
        .header-title {
          font-size: clamp(24px, 4vw, 46px); font-weight: 800; color: #fff;
          margin: 0 0 8px; line-height: 1.1; letter-spacing: -0.5px;
        }
        .header-gold {
          background: linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT} 50%, ${GOLD});
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .header-sub {
          font-size: clamp(11px, 1.4vw, 15px); color: rgba(255,255,255,0.5);
          max-width: 600px; margin: 0 auto; line-height: 1.6; letter-spacing: 0.2px;
        }

        /* Books Row Desktop: 5 centered, Mobile: 1 centered scroll */
        .books-row {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 20px;
          max-width: 1350px;
          margin: 0 auto;
          padding: 10px 16px;
          position: relative;
          z-index: 1;
        }

        /* Divider */
        .row-divider {
          max-width: 400px; margin: 20px auto;
          height: 1px;
          background: linear-gradient(to right, transparent, ${GOLD}33, transparent);
        }

        /* Book Card */
        .book-card {
          display: flex; flex-direction: column; align-items: center;
          gap: 14px; width: 230px; flex-shrink: 0;
        }

        /* 3D Book container */
        .book-perspective {
          width: 220px; height: 310px; perspective: 1600px; cursor: pointer;
        }
        .book-3d {
          width: 220px; height: 310px; position: relative;
          transform-style: preserve-3d;
          transition: all 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }

        /* Front */
        .book-front {
          width: 220px; height: 310px; position: absolute;
          transform: translateZ(16px);
          border-radius: 0 6px 6px 0; overflow: hidden;
          transition: box-shadow 0.5s;
        }
        .book-cover-img {
          width: 100%; height: 100%; object-fit: cover;
          position: absolute; inset: 0; transition: opacity 0.4s;
          border-radius: 0 6px 6px 0;
        }
        .book-shine {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%);
          pointer-events: none; border-radius: 0 6px 6px 0; z-index: 2;
        }
        .book-spine-edge {
          position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, ${GOLD}33, ${GOLD}11, ${GOLD}33); z-index: 3;
        }

        /* Back */
        .book-back {
          width: 220px; height: 310px; position: absolute;
          transform: rotateY(180deg) translateZ(16px);
          border-radius: 0 6px 6px 0;
        }

        /* Spine */
        .book-spine {
          width: 32px; height: 310px; position: absolute;
          left: -16px; top: 0; transform: rotateY(-90deg);
          display: flex; justify-content: center; align-items: center;
        }
        .book-spine-text {
          color: rgba(255,255,255,0.55); font-family: 'Georgia', serif;
          font-size: 8px; letter-spacing: 1px; writing-mode: vertical-rl;
          text-orientation: mixed; transform: rotate(180deg);
          text-transform: uppercase; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis; max-height: 290px;
        }

        /* Pages */
        .book-pages-right {
          width: 30px; height: 302px; position: absolute; top: 4px; right: -13px;
          background: repeating-linear-gradient(to right, #EEEEE9, #EEEEE9 1px, #E5E5E0 1px, #E5E5E0 2px);
          transform: rotateY(90deg); backface-visibility: hidden;
        }
        .book-pages-top {
          width: 216px; height: 30px; position: absolute; top: -14px; left: 0;
          background: #EEEEE9; transform: rotateX(90deg); backface-visibility: hidden;
        }
        .book-pages-bottom {
          width: 216px; height: 30px; position: absolute; bottom: -14px; left: 0;
          background: #E8E8E3; transform: rotateX(-90deg); backface-visibility: hidden;
        }

        /* Book Info */
        .book-info { text-align: center; max-width: 220px; }
        .book-info-title {
          font-family: 'Georgia', serif; font-size: 12px; font-weight: 700;
          color: #fff; margin: 0 0 4px; line-height: 1.3;
        }
        .book-info-author {
          font-family: 'Georgia', serif; font-size: 10px;
          color: ${GOLD}; margin: 0 0 10px; letter-spacing: 0.5px; opacity: 0.85;
        }

        /* Buy Now Button */
        .buy-btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 8px 16px; gap: 6px;
          background: linear-gradient(135deg, ${GOLD} 0%, #b8960f 100%);
          color: #1a1000; font-family: 'Georgia', serif;
          font-size: 11px; font-weight: 700; text-decoration: none;
          border-radius: 5px; letter-spacing: 0.3px;
          transition: all 0.3s;
          box-shadow: 0 3px 12px ${GOLD}44;
          white-space: nowrap;
        }
        .buy-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px ${GOLD}66;
          background: linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%);
        }
        .kindle-icon {
          width: 19px; height: 19px; object-fit: contain;
        }

        /* Footer */
        .showcase-footer { text-align: center; margin-top: 28px; position: relative; z-index: 2; }
        .footer-badge {
          display: inline-block; padding: 8px 18px;
          background: ${GOLD}0F; border: 1px solid ${GOLD}33;
          border-radius: 18px; color: rgba(255,255,255,0.45);
          font-size: 11px; letter-spacing: 1.5px;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { height: 4px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        ::-webkit-scrollbar-thumb { background: ${GOLD}44; border-radius: 10px; }

        /* ═══════════════════════════════════════ */
        /*  MOBILE one book centered at a time  */
        /* ═══════════════════════════════════════ */
        @media (max-width: 900px) {
          .books-row {
            justify-content: flex-start;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 0;
            padding: 10px 0;
            max-width: 100%;
          }
          .books-row::-webkit-scrollbar { display: none; }
          .books-row { scrollbar-width: none; }

          .book-card {
            min-width: 100vw;
            width: 100vw;
            scroll-snap-align: center;
            padding: 0 20px;
            box-sizing: border-box;
          }

          .row-divider { margin: 14px auto; }
        }

        /* Tablet 3 visible, scroll for rest */
        @media (min-width: 901px) and (max-width: 1350px) {
          .books-row {
            overflow-x: auto;
            justify-content: flex-start;
            scroll-snap-type: x mandatory;
            padding: 10px 24px;
          }
          .book-card {
            scroll-snap-align: center;
          }
        }
      `}</style>
    </div>
  );
}
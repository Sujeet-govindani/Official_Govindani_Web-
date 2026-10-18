import React from "react";
import reviewsData from "@/data/reviews.json";

/**
 * Real Google reviews, fetched at build time into src/data/reviews.json by
 * tools/seo/gen_reviews.py (source: our GBP listing via social-ops). The cards are
 * visible AND the aggregateRating/review JSON-LD is emitted inline right here, so the
 * schema is always co-located with the reviews it describes (Google's requirement).
 * Never fabricated — only what real clients wrote.
 */
type Review = { author: string; rating: number; text: string; date?: string };
const data = reviewsData as { aggregate: { ratingValue: number; reviewCount: number }; reviews: Review[] };

const GBP_REVIEWS = "https://search.google.com/local/reviews?placeid=ChIJZYfiox43pQ0RPDko6XGX_80";

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} out of 5`} className="gr-stars">
      {"★★★★★".slice(0, Math.round(n))}
      <span className="gr-stars-dim">{"★★★★★".slice(Math.round(n))}</span>
    </span>
  );
}

const GoogleReviews: React.FC = () => {
  const { aggregate, reviews } = data;
  if (!reviews?.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://govindaniit.com/#localbusiness",
    name: "Govindani Infotech Pvt. Ltd.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregate.ratingValue,
      reviewCount: aggregate.reviewCount,
      bestRating: 5,
    },
    review: reviews.slice(0, 9).map((r) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      author: { "@type": "Person", name: r.author },
      reviewBody: r.text,
    })),
  };

  return (
    <section className="gr-wrap" aria-labelledby="gr-title">
      <div className="gr-inner">
        <div className="gr-head">
          <h2 id="gr-title">What our clients say</h2>
          <a className="gr-badge" href={GBP_REVIEWS} target="_blank" rel="noopener noreferrer">
            <span className="gr-g">G</span>
            <span><b>{aggregate.ratingValue.toFixed(1)}</b> <Stars n={aggregate.ratingValue} /></span>
            <span className="gr-count">{aggregate.reviewCount} Google reviews</span>
          </a>
        </div>

        <div className="gr-grid">
          {reviews.slice(0, 6).map((r, i) => (
            <figure className="gr-card" key={i}>
              <Stars n={r.rating} />
              <blockquote>{r.text.length > 320 ? r.text.slice(0, 317).trimEnd() + "…" : r.text}</blockquote>
              <figcaption>
                <span className="gr-author">{r.author}</span>
                <span className="gr-via">via Google</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="gr-cta">
          <a href={GBP_REVIEWS} target="_blank" rel="noopener noreferrer">Read all reviews on Google →</a>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <style>{`
        .gr-wrap { background: #faf8f6; padding: 64px 16px; }
        .gr-inner { max-width: 1160px; margin: 0 auto; }
        .gr-head { display: flex; flex-wrap: wrap; gap: 16px; align-items: center;
                   justify-content: space-between; margin-bottom: 28px; }
        .gr-head h2 { font-size: clamp(1.6rem, 3.5vw, 2.4rem); font-weight: 800; color: #1c1c1e; margin: 0; }
        .gr-badge { display: inline-flex; align-items: center; gap: 10px; text-decoration: none;
                    background: #fff; border: 1px solid #ececed; border-radius: 999px;
                    padding: 8px 16px; color: #1c1c1e; box-shadow: 0 1px 2px rgba(0,0,0,.04); }
        .gr-g { font-weight: 800; color: #4285F4; font-size: 1.2rem; }
        .gr-badge b { font-size: 1.1rem; }
        .gr-count { color: #8a8a8e; font-size: .85rem; }
        .gr-stars { color: #FBBC04; letter-spacing: 1px; }
        .gr-stars-dim { color: #e3e3e3; }
        .gr-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
                   gap: 18px; }
        .gr-card { background: #fff; border: 1px solid #ececed; border-radius: 16px; padding: 22px;
                   margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .gr-card blockquote { margin: 0; color: #3a3a3c; font-size: .96rem; line-height: 1.6; }
        .gr-card figcaption { display: flex; justify-content: space-between; align-items: baseline;
                              border-top: 1px solid #f1f1f1; padding-top: 12px; }
        .gr-author { font-weight: 700; color: #1c1c1e; }
        .gr-via { color: #8a8a8e; font-size: .8rem; }
        .gr-cta { text-align: center; margin-top: 28px; }
        .gr-cta a { color: #AB1E23; font-weight: 700; text-decoration: none; }
        .gr-cta a:hover { text-decoration: underline; }
        @media (prefers-color-scheme: dark) {
          .gr-wrap { background: #141416; }
          .gr-head h2 { color: #f2f2f2; }
          .gr-badge { background: #1f1f22; border-color: #2a2a2e; color: #f2f2f2; }
          .gr-card { background: #1f1f22; border-color: #2a2a2e; }
          .gr-card blockquote { color: #d6d6d8; }
          .gr-author { color: #f2f2f2; }
          .gr-card figcaption { border-color: #2a2a2e; }
        }
      `}</style>
    </section>
  );
};

export default GoogleReviews;

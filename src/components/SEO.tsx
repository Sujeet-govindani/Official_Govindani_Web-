import { Helmet } from 'react-helmet-async';

const SITE = 'https://govindaniit.com';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  schema?: object;
  noindex?: boolean;
}

const SEO = ({
  title,
  description,
  canonical,
  ogImage = 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/og-default.jpg',
  ogType = 'website',
  keywords = '',
  schema,
  noindex = false,
}: SEOProps) => {
  // Derive the canonical from the page actually being rendered. Defaulting it
  // to the site root made 26 components declare the homepage as their canonical.
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const resolved = canonical
    ? (canonical.endsWith('/') || canonical === SITE ? canonical : `${canonical}/`)
    : `${SITE}${path.endsWith('/') ? path : `${path}/`}`;

  // The brand suffix is worth having, but not at the cost of the keyword: a
  // SERP truncates around 60 characters, so a 70-char title plus a 21-char
  // suffix loses the end of the sentence rather than the brand.
  const withBrand = `${title} | Govindani Infotech`;
  const chosen = title.includes('Govindani')
    ? title
    : withBrand.length <= 62
      ? withBrand
      : title;
  // Backstop. Several pages set their own title inline, so a limit enforced only
  // where titles are authored gets bypassed. Trim on a word boundary, and prefer
  // dropping a trailing "| segment" over cutting a sentence in half.
  // Dropping the tail after "|" is only an improvement if what survives is
  // still a real title. "Blog | Digital Marketing, Web Development & NGO
  // Solutions" became "Blog", which describes nothing.
  const trimmed = chosen.includes('|')
    ? chosen.slice(0, chosen.lastIndexOf('|')).trim()
    : '';
  const fullTitle =
    chosen.length <= 62
      ? chosen
      : trimmed.length >= 30 && trimmed.length <= 62
        ? trimmed
        : chosen.slice(0, 62).replace(/\s+\S*$/, '');
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={resolved} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={resolved} />
      <meta property="og:site_name" content="Govindani Infotech" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;

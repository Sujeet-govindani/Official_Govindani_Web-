export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://govindaniit.com/#organization",
  "name": "Govindani Infotech Pvt. Ltd.",
  "url": "https://govindaniit.com",
  "logo": "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LOGO.webp",
  "description": "Govindani Infotech builds NGO donation platforms, websites, CRM systems and digital growth solutions for nonprofits and businesses across India. 900+ websites engineered, 550 of them for non-profits, ₹1100+ crore processed.",
  "foundingDate": "2018",
  "email": "sujeet@govindaniit.org",
  "telephone": "+91-9201958271",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.linkedin.com/company/govindani-infotech",
    "https://www.instagram.com/govindani_infotech_pvt_ltd/",
    "https://www.facebook.com/people/Govindani-Infotech/100089453446845/",
    "https://www.youtube.com/channel/UCMPVJv_auCr-TAQiPFX1KZg"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "knowsAbout": [
    "NGO Website Development",
    "Donation Platform Development",
    "WhatsApp Business API",
    "Social Media Marketing",
    "Google Ads",
    "Meta Ads",
    "SEO Services",
    "Web Development",
    "Mobile App Development",
    "CRM Development",
    "E-Commerce Development",
    "Virtual Tour Technology",
    "AI Automation"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://govindaniit.com/#website",
  "url": "https://govindaniit.com",
  "name": "Govindani Infotech",
  "publisher": { "@id": "https://govindaniit.com/#organization" },
  "inLanguage": "en-IN",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://govindaniit.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://govindaniit.com/#localbusiness",
  "name": "Govindani Infotech Pvt. Ltd.",
  "image": "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LOGO.webp",
  "url": "https://govindaniit.com",
  "telephone": "+91-9201958271",
  "email": "sujeet@govindaniit.org",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 18.5204,
    "longitude": 73.8567
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "19:00"
  }
};

export function createServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  price?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": service.url,
    "provider": {
      "@type": "Organization",
      "@id": "https://govindaniit.com/#organization"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "serviceType": service.name,
    "offers": service.price ? {
      "@type": "Offer",
      "price": service.price,
      "priceCurrency": "INR"
    } : undefined
  };
}

export function createFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function createBlogSchema(post: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "url": post.url,
    "datePublished": post.datePublished,
    "dateModified": post.dateModified || post.datePublished,
    "image": post.image || "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LOGO.webp",
    "author": {
      "@type": "Organization",
      "@id": "https://govindaniit.com/#organization"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://govindaniit.com/#organization"
    }
  };
}

/** Per-route structured data. Called by Seo.tsx on every navigation. */
export function schemaFor(pathname: string) {
  const base = {
    "@context": "https://schema.org",
    "url": "https://govindaniit.com" + pathname,
  };

  // Homepage
  if (pathname === '/') {
    return {
      ...base,
      "@graph": [organizationSchema, websiteSchema, localBusinessSchema],
    };
  }

  // Services
  if (pathname.startsWith('/services/')) {
    const name = pathname.replace('/services/', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return {
      ...base,
      ...createServiceSchema({
        name,
        description: `${name} services by Govindani Infotech — 900+ websites engineered from Pune, India.`,
        url: 'https://govindaniit.com' + pathname,
      }),
    };
  }

  // Blog posts
  if (pathname.startsWith('/blog/')) {
    return {
      ...base,
      ...createBlogSchema({
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        url: 'https://govindaniit.com' + pathname,
        datePublished: '2026-01-01',
      }),
    };
  }

  // Default: Organization
  return { ...base, ...organizationSchema };
}

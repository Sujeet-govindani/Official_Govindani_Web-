export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://govindaniit.com/#organization",
  "name": "Govindani Infotech Pvt. Ltd.",
  "url": "https://govindaniit.com",
  "logo": "https://gi-img-cdn.sujeet.workers.dev/Images/LOGO.webp",
  "description": "Govindani Infotech builds NGO donation platforms, websites, CRM systems and digital growth solutions for nonprofits and businesses across India. 1000+ websites engineered, 550 of them for non-profits, ₹1100+ crore processed.",
  "foundingDate": "2018",
  "email": "sujeet@govindaniit.org",
  "telephone": "+91-9201958274",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2nd Floor, Landmark Plaza, 206, Satara Road, Parvati Paytha",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "postalCode": "411009",
    "addressCountry": "IN"
  },
  "parentOrganization": {
    "@type": "Organization",
    "@id": "https://govindanigroup.com/#org",
    "name": "Govindani Group",
    "url": "https://govindanigroup.com/"
  },
  "sameAs": [
    "https://www.linkedin.com/company/govindani-infotech",
    "https://www.instagram.com/govindani_infotech_pvt_ltd/",
    "https://www.facebook.com/people/Govindani-Infotech/100089453446845/",
    "https://www.youtube.com/channel/UCMPVJv_auCr-TAQiPFX1KZg",
    "https://www.google.com/maps?cid=14843749412335270204"
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
  /* This is the bold label Google prints above the URL in search. It reads it
     from WebSite.name, not from the title tag, which is why the SERP said
     "Govindani Infotech" however the titles were written. The registered name
     carries more weight with NGO boards and procurement.
     alternateName is not decoration: Google's guidance is that a site name
     should be short, so this hands it a sanctioned short form instead of
     letting it invent one. Every other site-name signal - index.html's static
     WebSite block and og:site_name - now says exactly the same thing; when
     they disagree Google discards all of them and falls back to the title. */
  "name": "Govindani Infotech Private Limited",
  "alternateName": "Govindani Infotech",
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
  "image": "https://gi-img-cdn.sujeet.workers.dev/Images/LOGO.webp",
  "url": "https://govindaniit.com",
  "telephone": "+91-9201958274",
  "email": "sujeet@govindaniit.org",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2nd Floor, Landmark Plaza, 206, Satara Road, Parvati Paytha",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "postalCode": "411009",
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
    "image": post.image || "https://gi-img-cdn.sujeet.workers.dev/Images/LOGO.webp",
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
/**
 * The products' identity for structured data. Kept here rather than imported
 * from src/data/groupProducts.ts on purpose: prerender.mjs evaluates this
 * module to bake schema into the static HTML, and schema.ts deliberately has no
 * component imports. Names and sites must match that file — when a product is
 * added there, add it here too.
 */
const PRODUCT_SCHEMA: Record<string, { name: string; description: string; category: string; site: string }> = {
  customerbond: {
    name: 'CustomerBond',
    description: "Sales CRM for Indian teams: Facebook, Google and WhatsApp leads routed to the right salesperson in minutes, every follow-up chased, GST quotes accepted online, and AI calling built in.",
    category: 'BusinessApplication',
    site: 'https://customerbond.com',
  },
  trring: {
    name: 'Trring',
    description: "Done-for-you AI calling platform for Indian businesses: it calls a whole list in Hindi, grades every lead, transfers the live call to the team, and bills only for calls a real person picked up.",
    category: 'BusinessApplication',
    site: 'https://trring.io',
  },
  msgsutra: {
    name: 'MsgSutra',
    description: "WhatsApp Business API platform for Indian businesses: a shared team inbox, broadcasts with retargeting, a no-code chatbot builder and AI agents trained on the business, on the official Cloud API.",
    category: 'BusinessApplication',
    site: 'https://msgsutra.io',
  },
  brandwheel: {
    name: 'Brandwheel',
    description: 'AI social media workspace for Indian brands and agencies: plan, approve, publish, reply and grow on 15 platforms and WhatsApp from one login.',
    category: 'BusinessApplication',
    site: 'https://brandwheel.in',
  },
  givesetu: {
    name: 'GiveSetu',
    description: "The operating system for Indian NGOs: donations straight to the NGO's own account with 0% taken, instant 80G receipts, Form 10BD and 10BE, donor CRM and WhatsApp on the NGO's own number.",
    category: 'BusinessApplication',
    site: 'https://givesetu.com',
  },
  productions: {
    name: 'Govindani Productions',
    description: "The media arm of the Govindani Group: The Sujeet Show podcast, the founder's YouTube channel and every product film, made in-house.",
    category: 'MultimediaApplication',
    site: 'https://govindanigroup.com/ventures/productions',
  },
};

export function schemaFor(pathname: string) {
  const base = {
    "@context": "https://schema.org",
    "url": "https://govindaniit.com" + pathname,
  };

  // Homepage. Only LocalBusiness: Organization and WebSite are emitted by the
  // static shell in index.html on every route, so returning them here put two
  // copies of the same @id on this one page - and they disagreed (areaServed
  // City/Pune in the shell vs Country/India here, plus description, sameAs and
  // streetAddress). The shell now carries the merged, richer version.
  // LocalBusiness stays: nothing else emits it, and it is the record local
  // search reads.
  if (pathname === '/') {
    return {
      ...base,
      "@graph": [localBusinessSchema],
    };
  }

  // A live opening — JobPosting is what puts it in Google for Jobs. Dates and
  // a stated location are given because Google demotes a posting without them,
  // and validThrough stops a filled role lingering in results.
  // Returned as ONE node, not a @graph: Seo.tsx puts every inner page's schema
  // into its own @graph beside a breadcrumb, and a @graph nested in a @graph
  // yields a typeless node that Google discards.
  if (pathname === '/careers/social-media-marketer') {
    return {
      ...base,
      "@type": "JobPosting",
      "title": "Social Media Marketer",
      "description":
        "Own content, short-form video and reels, graphic design and paid ads (Meta and Google) for Govindani Infotech's brands. Plan and create content, run campaigns end to end, and use AI tools to move fast. Looking for hands-on video editing (Premiere Pro, CapCut or DaVinci), graphic design (Canva, Photoshop or Figma), strong social content writing, real paid-ads experience, and AI and automation savvy.",
      "datePosted": "2026-10-15",
      "validThrough": "2026-12-31",
      "employmentType": "FULL_TIME",
      "directApply": true,
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Govindani Infotech Pvt. Ltd.",
        "sameAs": "https://govindaniit.com",
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Satara Road",
          "addressLocality": "Pune",
          "addressRegion": "MH",
          "addressCountry": "IN",
        },
      },
    };
  }

  // Services (listing + individual) — Service + BreadcrumbList
  if (pathname === '/services' || pathname.startsWith('/services/')) {
    const isChild = pathname.startsWith('/services/');
    const name = isChild
      ? pathname.replace('/services/', '').replace(/\/+$/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      : 'Services';
    const crumbs = [
      { name: 'Home', url: 'https://govindaniit.com/' },
      { name: 'Services', url: 'https://govindaniit.com/services' },
    ];
    if (isChild) crumbs.push({ name, url: 'https://govindaniit.com' + pathname });
    return {
      ...base,
      "@graph": [
        createServiceSchema({
          name,
          description: `${name} services by Govindani Infotech — 1000+ websites engineered from Pune, India.`,
          url: 'https://govindaniit.com' + pathname,
        }),
        createBreadcrumbSchema(crumbs),
      ],
    };
  }

  // The Govindani Group product shelf.
  //
  // Each product page emits SoftwareApplication, not Service: these are named
  // products with their own domains, and `sameAs` pointing at that domain is
  // what lets Google tie this page to the product's own site and to the group's
  // subOrganization node on govindanigroup.com. Without it the two sites look
  // like unrelated pages that happen to share a word.
  //
  // Returned as ONE node, never a @graph — Seo.tsx nests whatever comes back
  // inside the page's own @graph beside a breadcrumb, and a @graph inside a
  // @graph yields a typeless node Google throws away.
  if (pathname === '/products' || pathname.startsWith('/products/')) {
    const slug = pathname.replace('/products/', '').replace(/\/+$/, '');
    const p = pathname === '/products' ? undefined : PRODUCT_SCHEMA[slug];

    if (!p) {
      return {
        ...base,
        "@type": "CollectionPage",
        "name": "Products by Govindani Infotech",
        "description":
          "The software Govindani Infotech builds and runs: CustomerBond (sales CRM), Trring (AI calling), MsgSutra (WhatsApp Business API), Brandwheel (social media) and GiveSetu (the operating system for NGOs).",
        "isPartOf": { "@id": "https://govindaniit.com/#website" },
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": Object.entries(PRODUCT_SCHEMA).map(([s, v], i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": v.name,
            "url": "https://govindaniit.com/products/" + s,
          })),
        },
      };
    }

    return {
      ...base,
      "@type": "SoftwareApplication",
      "name": p.name,
      "description": p.description,
      "applicationCategory": p.category,
      "operatingSystem": "Web",
      "url": "https://govindaniit.com" + pathname,
      // The product's own site. This is the association that matters.
      "sameAs": [p.site],
      "publisher": { "@id": "https://govindaniit.com/#organization" },
      "brand": {
        "@type": "Organization",
        "name": "Govindani Infotech Private Limited",
        "url": "https://govindaniit.com",
      },
      "isPartOf": {
        "@type": "Organization",
        "name": "Govindani Group",
        "url": "https://govindanigroup.com/",
      },
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

  // Default: nothing. This used to return organizationSchema, which is how
  // every route with no branch of its own - /faq and /blog among them - ended
  // up with a SECOND Organization under the same @id, on top of the one the
  // static shell already puts on all 749 pages. The shell is the single source
  // of site identity now, so an unmatched route contributes no page schema and
  // Seo.tsx drops the null from the graph.
  return null;
}

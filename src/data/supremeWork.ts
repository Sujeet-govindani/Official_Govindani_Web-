/**
 * The sites we put our name to right now.
 *
 * Every banner is a real screenshot of the live site, captured 16 Nov 2026 and
 * served from the image CDN — not a mock-up and not a stock laptop. The stats
 * are the ones each site publishes on its own front page, so a visitor who
 * clicks through sees the same numbers rather than catching us rounding up.
 */
export interface SupremeSite {
  id: string;
  name: string;
  sector: string;
  /** one line: what this build actually is */
  headline: string;
  /** what makes it worth looking at, in our words */
  blurb: string;
  /** numbers the live site itself publishes */
  stats: { v: string; k: string }[];
  /** the engineering worth naming */
  tech: string[];
  url: string;
  image: string;
  /** our own case study, when one exists */
  caseStudy?: string;
  accent: string;
}

const IMG = 'https://gi-img-cdn.sujeet.workers.dev/Images/work';

const SITES: Omit<SupremeSite, 'image'>[] = [
  {
    id: 'gausevadham',
    name: 'Gau Seva Dham',
    sector: 'NGO · Hospital · Devi Chitralekha',
    headline: 'A hospital campaign, built to carry a 6.5-million audience.',
    blurb:
      'Devi Chitralekha ji speaks to millions. The site had to survive that attention and convert it — a rebuilt donation journey, the Hodal hospital campaign front and centre, and an animal-rescue record that reads as evidence rather than appeal.',
    stats: [{ v: '1,543+', k: 'Animals treated' }, { v: '400-500', k: 'In care daily' }, { v: '6.5M+', k: 'Audience reach' }],
    tech: ['Donation infrastructure', '80G receipts', 'Campaign microsite'],
    url: 'https://gausevadham.org/',
    caseStudy: '/pages/case-study/gau-seva-dham',
    accent: '#8a6a2f',
  },
  {
    id: 'jivika',
    name: 'Jivika Foundation',
    sector: 'NGO · CSR · PSU partnerships',
    headline: 'Built for boardrooms, not just donors.',
    blurb:
      'Jivika raises from corporates, PSUs and governments — an audience that reads a website the way it reads a due-diligence pack. So the site leads with programme architecture, measured outcomes and partner proof, and keeps the donation ask quiet until it has earned it.',
    stats: [{ v: '2.9M+', k: 'People served' }, { v: '55,000+', k: 'Girls vaccinated' }, { v: '50+', k: 'Corporate partners' }],
    tech: ['Programme IA', 'Impact reporting', 'CSR partner funnel'],
    url: 'https://jivika.org/',
    accent: '#2f7a4a',
  },
  {
    id: 'vivedamagro',
    name: 'Vivedam Agro',
    sector: 'Multi-vendor commerce · AgriTech',
    headline: 'A marketplace that also tells a farmer what his crop is worth today.',
    blurb:
      'Not a store — a multi-vendor marketplace in Marathi and English, with 20 product categories, buying journeys organised by crop and growth stage, and live mandi rates pulled from the government Agmarknet feed so a farmer checks the price before he sells.',
    stats: [{ v: '800+', k: 'Products' }, { v: '29+', k: 'Crops covered' }, { v: '150+', k: 'Verified farmers' }],
    tech: ['Multi-vendor engine', 'Live data.gov.in mandi feed', 'Bilingual UX', 'Agri calculator'],
    url: 'https://vivedamagro.com/',
    accent: '#3f7d34',
  },
  {
    id: 'mahipatsinh',
    name: 'Mahipatsinh Foundation',
    sector: 'NGO · Education · Compliance',
    headline: 'A name people Google — now with a system behind it.',
    blurb:
      'Recurring donations that auto-deduct monthly, an 80G receipt generated on every single gift, and the donor database and server kept under the foundation’s own ownership. He stopped asking for donations; he tells people his name.',
    stats: [{ v: '5,000+', k: 'Children supported' }, { v: '100%', k: '80G automated' }, { v: 'Owned', k: 'Donor database' }],
    tech: ['Recurring donations', 'Auto 80G receipts', 'Client-owned data'],
    url: 'https://mahipatsinhfoundation.org/',
    caseStudy: '/pages/case-study/mahipatsinh-foundation',
    accent: '#a8863c',
  },
  {
    id: 'babajikibuti',
    name: 'Baba Ji Ki Buti',
    sector: 'D2C commerce · Ayurveda',
    headline: 'Ayurveda that sells like a modern brand.',
    blurb:
      'A full D2C storefront in Hindi and English — shop by concern rather than by SKU, a membership tier, online payment with cash-on-delivery removed, and WhatsApp ordering for the customers who will never fill a checkout form.',
    stats: [{ v: 'Hi + En', k: 'Bilingual store' }, { v: 'Members', k: 'Loyalty tier' }, { v: 'WhatsApp', k: 'Order channel' }],
    tech: ['D2C storefront', 'Membership', 'WhatsApp commerce'],
    url: 'https://babajikibuti.com/home',
    caseStudy: '/pages/case-study/baba-ji-ki-buti',
    accent: '#9a6b32',
  },
  {
    id: 'tarushpranaa',
    name: 'Tarushpranaa',
    sector: 'Courses · Commerce · Wellness',
    headline: 'Where a course platform and a store share one brand.',
    blurb:
      'A spiritual-wellness brand that teaches and sells at once — tarot and healing courses with enrolment, a practitioner directory, a product store and a blog, held together by one unmistakable dark-and-gold identity.',
    stats: [{ v: 'Courses', k: 'Enrolment flow' }, { v: 'Experts', k: 'Practitioner directory' }, { v: 'Store', k: 'Product commerce' }],
    tech: ['Course enrolment', 'Expert directory', 'Commerce + content'],
    url: 'https://tarushpranaa.com/',
    accent: '#b08b3a',
  },
  {
    id: 'mahaveer',
    name: 'Mahaveer Eye Hospital',
    sector: 'Healthcare · Super-speciality',
    headline: 'A hospital site built the way a frightened patient searches.',
    blurb:
      'Thirteen specialities, cataract through paediatric eye care, each written as what happens and how we help rather than as a department list. Accreditation and cashless insurance sit where a patient looks for them, and the surgeon who will operate is on the page with his credentials.',
    stats: [{ v: '13', k: 'Specialities' }, { v: 'Cashless', k: 'Insurance accepted' }, { v: 'NABH', k: 'Accredited' }],
    tech: ['Treatment explainers', 'Appointment booking', 'Cashless insurance'],
    url: 'https://mahaveereyehospital.com/',
    caseStudy: '/pages/case-study/mahaveer-eye-hospital',
    accent: '#1f7a6a',
  },
];

export const supremeWork: SupremeSite[] = SITES.map((s) => ({ ...s, image: `${IMG}/${s.id}.webp?v=1440` }));

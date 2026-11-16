/**
 * The founders behind the NGO builds.
 *
 * Every follower count here was read off the live, verified Instagram profile
 * on 17 Nov 2026 — not carried over from older copy. Three of the four turned
 * out to be HIGHER than the figures the site had been publishing. The fourth,
 * Abujhmad Mallakhamb, is smaller on Instagram than the old copy claimed, but
 * their real credential is the one in their own bio: winners of India's Got
 * Talent season 10. That is the proof worth leading with, not a number.
 *
 * Harsh Chhikara is deliberately absent. His official Instagram carries 4,956
 * followers against the 1.2M the hero still claims, so he is not given a reach
 * panel until that figure is settled.
 */
export interface NgoFounder {
  id: string;
  name: string;
  org: string;
  orgUrl: string;
  handle: string;
  /** exactly as Instagram displays it */
  followers: string;
  verified: boolean;
  /** the single line that makes them matter */
  claim: string;
  /** a credential that outranks the follower count */
  badge?: string;
  portrait: string;
  feed: string;
}

const IG = 'https://gi-img-cdn.sujeet.workers.dev/Images/ig';
const IMG = 'https://gi-img-cdn.sujeet.workers.dev/Images';

export const ngoFounders: NgoFounder[] = [
  {
    id: 'chitralekha',
    name: 'Devi Chitralekha',
    org: 'Gau Seva Dham',
    orgUrl: 'https://gausevadham.org/',
    handle: 'chitralekhaji',
    followers: '6.5M',
    verified: true,
    claim: 'A spiritual preacher whose katha fills grounds — and whose audience funds a hospital for rescued animals.',
    portrait: `${IMG}/devichitra.webp`,
    feed: `${IG}/chitralekha.webp`,
  },
  {
    id: 'popatbhai',
    name: 'Popatbhai Ahir',
    org: 'Popatbhai Charitable Foundation',
    orgUrl: 'https://popatbhaicharitablefoundation.org/',
    handle: 'popatbhai_ahir',
    followers: '2.1M',
    verified: true,
    claim: 'Manav seva hi prabhu seva — service documented daily to an audience of millions.',
    portrait: `${IMG}/Popat.webp`,
    feed: `${IG}/popatbhai.webp`,
  },
  {
    id: 'mahipatsinh',
    name: 'Mahipatsinh Chauhan',
    org: 'Mahipatsinh Foundation',
    orgUrl: 'https://mahipatsinhfoundation.org/',
    handle: 'mahipatsinh_chauhan_official',
    followers: '1.8M',
    verified: true,
    claim: 'Food, shelter and schooling for thousands — and 11,000+ posts showing every day of it.',
    portrait: `${IMG}/founder-open.webp`,
    feed: `${IG}/mahipatsinh.webp`,
  },
  {
    id: 'mallakhamb',
    name: 'Abujhmad Mallakhamb',
    org: 'Mallakhamb Artist',
    orgUrl: 'https://mallakhambartist.org/',
    handle: 'abujhmadmallakhamb_',
    followers: '122K',
    verified: true,
    claim: 'Tribal athletes from Abujhmad who took an ancient Indian sport to a national stage — and won it.',
    badge: "Winners · India's Got Talent S10",
    portrait: `${IMG}/makkhammain.webp`,
    feed: `${IG}/mallakhamb.webp`,
  },
];

/** 6.5 + 2.1 + 1.8 + 0.122 — stated as "over 10 million" so it stays true as they grow. */
export const NGO_FOUNDER_REACH = '10 million';

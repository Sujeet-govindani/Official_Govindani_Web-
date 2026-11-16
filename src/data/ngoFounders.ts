/**
 * The founders behind the NGO builds.
 *
 * Every figure here was read off the live profile on 17 Nov 2026, not carried
 * over from older copy — and the older copy was wrong in both directions. Three
 * of the four Instagram counts were being UNDERSTATED.
 *
 * Two different kinds of number appear here, so each entry has to say which it
 * is. Four are Instagram counts from verified accounts. Harsh Chhikara's 1.2M
 * is a combined total across YouTube, Facebook and Instagram (confirmed by
 * Sujeet); his Instagram alone is 4,956. Printing a cross-platform total under
 * an Instagram grid without saying so is exactly the number a visitor checks
 * and catches, so `scope` exists to make that impossible.
 *
 * Abujhmad Mallakhamb is smaller on Instagram than the old copy claimed, so
 * their card leads with the credential from their own bio instead: winners of
 * India's Got Talent season 10. A trophy outranks a follower count.
 */
export interface NgoFounder {
  id: string;
  name: string;
  org: string;
  orgUrl: string;
  handle: string;
  /** the figure, exactly as its source displays it */
  followers: string;
  /** what that figure counts — an Instagram count and a combined total are not
      the same claim, and the card must not let them look alike */
  scope: 'instagram' | 'all-platforms';
  /** the Instagram account carries a verification badge */
  verified: boolean;
  /** the single line that makes them matter */
  claim: string;
  /** a credential that outranks the follower count */
  badge?: string;
  portrait: string;
  feed: string;
  /** a full-page capture of the site we built them, tall enough to scroll */
  site: string;
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
    scope: 'instagram',
    verified: true,
    claim: 'A spiritual preacher whose katha fills grounds — and whose audience funds a hospital for rescued animals.',
    portrait: `${IMG}/devichitra.webp`,
    feed: `${IG}/chitralekha.webp`,
    site: 'https://gi-img-cdn.sujeet.workers.dev/Images/sites/gausevadham.webp',
  },
  {
    id: 'popatbhai',
    name: 'Popatbhai Ahir',
    org: 'Popatbhai Charitable Foundation',
    orgUrl: 'https://popatbhaicharitablefoundation.org/',
    handle: 'popatbhai_ahir',
    followers: '2.1M',
    scope: 'instagram',
    verified: true,
    claim: 'Manav seva hi prabhu seva — service documented daily to an audience of millions.',
    portrait: `${IMG}/Popat.webp`,
    feed: `${IG}/popatbhai.webp`,
    site: 'https://gi-img-cdn.sujeet.workers.dev/Images/sites/popatbhai.webp',
  },
  {
    id: 'mahipatsinh',
    name: 'Mahipatsinh Chauhan',
    org: 'Mahipatsinh Foundation',
    orgUrl: 'https://mahipatsinhfoundation.org/',
    handle: 'mahipatsinh_chauhan_official',
    followers: '1.8M',
    scope: 'instagram',
    verified: true,
    claim: 'Food, shelter and schooling for thousands — and 11,000+ posts showing every day of it.',
    portrait: `${IMG}/founder-open.webp`,
    feed: `${IG}/mahipatsinh.webp`,
    site: 'https://gi-img-cdn.sujeet.workers.dev/Images/sites/mahipatsinh.webp',
  },
  {
    id: 'harsh',
    name: 'Harsh Chhikara',
    org: 'Harsh Chhikara Jan Sewa Trust',
    orgUrl: 'https://harshchhikara.com/',
    handle: 'harshchhikaraofficial',
    followers: '1.2M',
    scope: 'all-platforms',
    verified: false,
    claim: 'Relief work in Sonipat, documented to a following built across YouTube, Facebook and Instagram.',
    portrait: `${IMG}/harshi.webp`,
    feed: `${IG}/harsh.webp`,
    site: 'https://gi-img-cdn.sujeet.workers.dev/Images/sites/harsh.webp',
  },
  {
    id: 'mallakhamb',
    name: 'Abujhmad Mallakhamb',
    org: 'Mallakhamb Artist',
    orgUrl: 'https://mallakhambartist.org/',
    handle: 'abujhmadmallakhamb_',
    followers: '122K',
    scope: 'instagram',
    verified: true,
    claim: 'Tribal athletes from Abujhmad who took an ancient Indian sport to a national stage — and won it.',
    badge: "Winners · India's Got Talent S10",
    portrait: `${IMG}/makkhammain.webp`,
    feed: `${IG}/mallakhamb.webp`,
    site: 'https://gi-img-cdn.sujeet.workers.dev/Images/sites/mallakhamb.webp',
  },
];

/** 6.5 + 2.1 + 1.8 + 1.2 + 0.122 — stated as "over 11 million" so it stays true as they grow. */
export const NGO_FOUNDER_REACH = '11 million';

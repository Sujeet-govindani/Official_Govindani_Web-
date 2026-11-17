/**
 * Thumbnails for the wall behind the hero - one per real build we hold.
 *
 * 300x225, blur BAKED IN, about 2.7 KB each. They are NOT the full-page
 * captures the portfolio cards scroll, and that distinction is the whole
 * point. The wall used to load those originals - 800px wide, up to 4,688px
 * TALL - into a card displayed at 138x103, roughly 265x more pixels than the
 * card can show. At 128 cards that was ~40 MB of download and ~13 MB of raw
 * bitmap per image to decode, so phones thrashed and the hero stuttered.
 *
 * The blur is baked rather than applied with CSS because these columns animate
 * every frame: a filter on them makes the browser re-rasterise continuously,
 * while a pre-blurred bitmap is just a layer the compositor slides. Blurred
 * pixels also compress almost to nothing, so the files got smaller again.
 *
 * Regenerate with scripts/wall-thumbs.py, which reads the ORIGINAL capture
 * URLs from scripts/wall-sources.json - never this file, or each run would
 * re-blur what the last run blurred.
 *
 * The ?v= is not decoration: the CDN serves these immutable for a year, so
 * bump it whenever the files change or nobody will see the new ones.
 *
 * Shuffled once with a fixed seed, so the columns look unsorted but the order
 * is stable between builds and the CDN can cache them.
 */
export const websiteWall: string[] = [
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Trivanta-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Hands-For-Hope-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-V-Care-Ngo.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Business-Website-Aadev-International-Trade-Solutions.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Live-For-Others-Being-Helpful.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Parash-Dhyan-Shikshan-Prasarak-Mandal.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Doon-Animal-Welfare.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-AashraySamiti.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Life-for-Strays.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Helping-Hands-Society.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Wordpress-Madhav-Numerology.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Riday-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Real-Estate-Jank-Builders-x.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/popatbhai.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Aap-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Anekaa-Care-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Save-a-Stray.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Business-Website-Happili-Digital-Innovations.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Business-Website-Dr-C-K-Reddy-Group.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Bholeki-Nagri.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Child-Educational-Trust.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Little-Heart-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Wordpress-Dentivaa.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Manav-Janhit-Kalyan-Sansthan.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Vashundhara-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Sevak-Charity.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Wordpress-Purvi-Agro.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Just-Help-Me.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Krishna-Dham-Gaushala.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Real-Estate-Ci-Builders-x.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Raskala-Manch.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Hospitality-Cafe-Nouris-x.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Navdeepam-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Animals-Matterto-Me.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Humanity-Charity.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Kamayani-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Rekhant-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Citare-Foundationngo.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Tintern-Charitable-Trust.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Muskan-Sewa-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/mallakhamb.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Malini-Charitable-Trust-India.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Hand-In-Hand.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Shikshan-Krushi-Vikas-Prathisthan-Medshingi.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Ai-Amaan-Trust.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Hospitality-99-Tasty-Hub.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Hanshamaa-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Voice-Of-Slum.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Anitya-Welfare-Society.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Dharmyog-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Akhil-Bharat-Samiti.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-We-For-Orphans.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Mother-Teresa-Family.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Business-Website-Madhav-Numerology.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Av-Pravah-Foundationngo.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Vishramgahr-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Earthlings-Trust.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Arthashila-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Parag-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Mission-of-Happiness.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Aadev-Health-Serve-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Wordpress-Home-City-Bazaar.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Hospitality-Jungle-Brooke.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Charan-Vandan.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Satya-Abhiyan-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Wordpress-Terra-By-Trishla.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Vakula-Devi-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Barwa-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Wordpress-Rb-Neurozyme.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Nishchay-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Coding-Tarushpranna.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/harsh.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/gausevadham.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/mahipatsinh.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Samajik-Vikas-Kendra.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-One-Step-For-Help-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Second-Chance-India.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Yashr-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Sanyogam-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Samaira-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Ahilya-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Wordpress-Malini-Charitable-Trust.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Novel-India.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-We-Grow-Global-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Jidd-Pratishthan.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Neevira-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Vikasana-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Akhil-20Bhartiya-Apang-Kalyankari-Bahuuddeshiya-Sanstha.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Shopify-Muktashop.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Island-Development-Organization.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Joyful-Global-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Wordpress-Gau-Mandir-Satva.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Coding-Babajikibuti.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Aghor-Shakti-Peeth.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Mauli-Foundation.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Shopify-Khambani-Foods.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Palawingo.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Gau-Seva-Dham.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Wordpress-Gsd-Organics.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Nanhi-Pari-Foundationngo.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Shopify-kryelet-studios.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Shopify-Gllora.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Sarthak-Charitable-Trust.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Harit-Disha-Foundationngo.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Healthcare-mahaveer-eye-hospital.webp?v=2',
  'https://gi-img-cdn.sujeet.workers.dev/Images/wall/Ngo-Child-and-Baby-Care.webp?v=2',
];

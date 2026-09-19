// Work showcased on the USA landing page, grouped by category.
// n=name, u=live url, i=image (full-page screenshot where available).
export type Work = { n: string; u: string; i: string };
const R2 = 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images';
const ECOMR2 = `${R2}/PortfolioProjects/PortFolioWebsites/E-Commerce`;
const BIZR2 = `${R2}/PortfolioProjects/PortFolioWebsites/BusinessWebsites`;
const HEALTHR2 = `${R2}/PortfolioProjects/PortFolioWebsites/Healthcare`;

export const NGO: Work[] = [
  {n:'Mahipatsinh Foundation',u:'https://mahipatsinhfoundation.org',i:'/images/portfolio-sites/mahipatsinh.jpg'},
  {n:'Aajol Parivar',u:'https://aajol.org',i:'/images/portfolio-sites/aajol-parivar.jpg'},
  {n:'Anugrah Foundation',u:'https://anugrahfoundation.org',i:'/images/portfolio-sites/anugrah-foundation.jpg'},
  {n:'Amee Foundation',u:'https://ameefoundation.com',i:'/images/portfolio-sites/amee-foundation.jpg'},
  {n:'Nostro Destino Foundation',u:'https://nostrodestino.org',i:'/images/portfolio-sites/nostro-destino-foundation.jpg'},
  {n:'Bhumi Mitra Foundation',u:'https://bhumimitra.org',i:'/images/portfolio-sites/bhumi-mitra-foundation.jpg'},
  {n:'Kishan Singh Foundation',u:'https://kishanfoundation.org',i:'/images/portfolio-sites/kishan-singh-foundation.jpg'},
  {n:'Handmade Heart Foundation',u:'https://handmadehearts.org',i:'/images/portfolio-sites/handmade-heart-foundation.jpg'},
  {n:'Nekwan Charitable Trust',u:'https://nekwanfoundation.org',i:'/images/portfolio-sites/nekwan-charitable-trust.jpg'},
  {n:'Trikut Seva Foundation',u:'https://trikutsevafoundation.org',i:'/images/portfolio-sites/trikut-seva-foundation.jpg'},
  {n:'Aloka Foundation',u:'https://aloka-foundation.org',i:'/images/portfolio-sites/aloka-foundation.jpg'},
  {n:'Ashish Legal Foundation',u:'https://ashishlegalfoundation.org',i:'/images/portfolio-sites/ashish-legal-foundation.jpg'},
  {n:'Avyaym Foundation',u:'https://avyaymfoundation.org',i:'/images/portfolio-sites/avyaym-foundation.jpg'},
  {n:'Balyam Child Care',u:'https://balyamorphan.com',i:'/images/portfolio-sites/balyam-child-care.jpg'},
  {n:'Bharat Welfare Association',u:'https://bharatwelfare.org',i:'/images/portfolio-sites/bharat-welfare-association.jpg'},
  {n:'Dattaaie Foundation',u:'https://dattaaiefoundation.org',i:'/images/portfolio-sites/dattaaie-foundation.jpg'},
  {n:'DAVO Foundation',u:'https://davongo.in',i:'/images/portfolio-sites/davo-ngo.jpg'},
  {n:'Edugap Foundation',u:'https://edugap.org',i:'/images/portfolio-sites/edugap-foundation.jpg'},
  {n:'EMPCI Foundation',u:'https://empcofindia.com',i:'/images/portfolio-sites/empci-foundation.jpg'},
  {n:'Glid Care Foundation',u:'https://glidcarefoundation.org',i:'/images/portfolio-sites/glid-care-foundation.jpg'},
  {n:'Globira Medical Council',u:'https://globiramedicalcouncil.org',i:'/images/portfolio-sites/globira-medical-council.jpg'},
  {n:'Helping Hearts',u:'https://helpingheartsngo.com',i:'/images/portfolio-sites/helping-hearts.jpg'},
  {n:'Hetch Foundation',u:'https://hetchfoundation.com',i:'/images/portfolio-sites/hetch-foundation.jpg'},
  {n:'Jagrati Foundation',u:'https://jagratifoundation.com',i:'/images/portfolio-sites/jagrati-foundation.jpg'},
  {n:'K3 Learning & Development Foundation',u:'https://k3foundation.org',i:'/images/portfolio-sites/k3-foundation.jpg'},
  {n:'Karmada Foundation',u:'https://karmadafoundation.org',i:'/images/portfolio-sites/karmada-foundation.jpg'},
  {n:'Karuna Seva Trust',u:'https://karunasevatrust.org',i:'/images/portfolio-sites/karuna-seva-trust.jpg'},
  {n:'Lahari Home Foundation',u:'https://laharifoundation.org',i:'/images/portfolio-sites/lahari-home-foundation.jpg'},
  {n:'Manav Parivar Trust',u:'https://manavparivartrust.org',i:'/images/portfolio-sites/manav-parivar-trust.jpg'},
  {n:'Mayaraini Educational Foundation',u:'https://mayarainieducationalfoundation.org',i:'/images/portfolio-sites/mayaraini-educational-foundation.jpg'},
  {n:'MSMDM Association',u:'https://msmdmassociation.org',i:'/images/portfolio-sites/msmdm-association.jpg'},
  {n:'Nyay Ki Ganga',u:'https://nyaykiganga.org',i:'/images/portfolio-sites/nyay-ki-ganga.jpg'},
  {n:'Oshi Foundation',u:'https://oshifoundation.org',i:'/images/portfolio-sites/oshi-foundation.jpg'},
  {n:'Punit Kumar Sahu & Associates',u:'https://punitkumarsahu.com',i:'/images/portfolio-sites/punit-kumar-sahu.jpg'},
  {n:'Rajkumar Talwar Foundation',u:'https://rajkumartalwarfoundation.org',i:'/images/portfolio-sites/rajkumar-talwar-foundation.jpg'},
  {n:'Relief Helping Hands Foundation',u:'https://reliefhelpinghands.org',i:'/images/portfolio-sites/relief-helping-hands-foundation.jpg'},
  {n:'Sahaya India',u:'https://sahayaindia.org',i:'/images/portfolio-sites/sahaya-india.jpg'},
  {n:'Samarpan Pratishthan',u:'https://samarpanpratishthan.org',i:'/images/portfolio-sites/samarpan-pratishthan.jpg'},
  {n:'Sampoorna Seva Charitable Trust',u:'https://sampoornaseva.com',i:'/images/portfolio-sites/sampoorna-seva.jpg'},
  {n:'SHABASH',u:'https://shabash.org.in',i:'/images/portfolio-sites/shabash.jpg'},
  {n:'ShreeNiketan Child Care Foundation',u:'https://shreeniketanchildcare.org',i:'/images/portfolio-sites/shree-niketan-child-care.jpg'},
  {n:'Shree Satyanarayan Memorial Trust',u:'https://shreesatyanarayantrust.org',i:'/images/portfolio-sites/shree-satyanarayan-trust.jpg'},
  {n:'Snehankit Helpline',u:'https://snehankithelpline.org',i:'/images/portfolio-sites/snehankit-helpline.jpg'},
  {n:'Talent4Nation',u:'https://talent4nation.org',i:'/images/portfolio-sites/talent4nation.jpg'},
  {n:'Ajit Foundation',u:'https://theajitfoundation.in',i:'/images/portfolio-sites/ajit-foundation.jpg'},
  {n:'The Arms Of Hope Charitable Trust',u:'https://thearmsofhope.org.in',i:'/images/portfolio-sites/arms-of-hope.jpg'},
  {n:'Swarajya Foundation',u:'https://theswarajyafoundation.org',i:'/images/portfolio-sites/swarajya-foundation.jpg'},
  {n:'Trilochanay Welfare Foundation',u:'https://trilochanayngo.com',i:'/images/portfolio-sites/trilochanay-foundation.jpg'},
  {n:'Yakshit Yuva Foundation',u:'https://yakshitngo.in',i:'/images/portfolio-sites/yakshit-foundation.jpg'},
  {n:'Yuva Swaraj Foundation',u:'https://yuvaswarajfoundation.org',i:'/images/portfolio-sites/yuva-swaraj-foundation.jpg'},
];

export const ECOM: Work[] = [
  {n:'Baba Ji Ki Buti',u:'https://babajikibuti.com/home',i:`${ECOMR2}/Coding/Coding-Babajikibuti.webp`},
  {n:'Tarush Pranaa',u:'https://tarushpranaa.com',i:`${ECOMR2}/Coding/Coding-Tarushpranna.webp`},
  {n:'Terra by Trishla',u:'#',i:`${ECOMR2}/Wordpress/Wordpress-Terra-By-Trishla.webp`},
  {n:'GSD Organics',u:'#',i:`${ECOMR2}/Wordpress/Wordpress-Gsd-Organics.webp`},
  {n:'Madhav Numerology Store',u:'https://madhavnumerology.com',i:`${ECOMR2}/Wordpress/Wordpress-Madhav-Numerology.webp`},
  {n:'Mukta Shop',u:'#',i:`${ECOMR2}/Shopify/Shopify-Muktashop.webp`},
  {n:'Gllora',u:'#',i:`${ECOMR2}/Shopify/Shopify-Gllora.webp`},
  {n:'Kryelet Studios',u:'#',i:`${ECOMR2}/Shopify/Shopify-kryelet-studios.webp`},
];

export const HEALTH: Work[] = [
  {n:'Dentivaa',u:'https://dentivaa.com',i:'/images/portfolio-sites/dentivaa.jpg'},
  {n:'Mahaveer Eye Hospital',u:'https://mahaveereyehospital.com',i:`${HEALTHR2}/Healthcare-mahaveer-eye-hospital.webp`},
];

export const BUSINESS: Work[] = [
  {n:'Finosquare Reality & Loan LLP',u:'https://finosquare.com',i:'/images/portfolio-sites/finosquare-llp.jpg'},
  {n:'Happilee Digital Innovations',u:'https://happileedigitalinnovations.com',i:`${BIZR2}/Business-Website-Happili-Digital-Innovations.webp`},
  {n:'Aadev International Trade',u:'https://aadevtrade.com',i:`${BIZR2}/Business-Website-Aadev-International-Trade-Solutions.webp`},
  {n:'Madhav Numerology',u:'https://madhavnumerology.com',i:`${BIZR2}/Business-Website-Madhav-Numerology.webp`},
  {n:'Dr. C.K. Reddy Group',u:'https://drckreddygroup.com',i:`${BIZR2}/Business-Website-Dr-C-K-Reddy-Group.webp`},
];

// // src/components/IndustryCarousel.tsx
// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Instagram, ExternalLink, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
// //import { Language } from '../types';

// // interface HeroProps {
// //  // language: Language;
// // }

// const IndustryCarousel = ({ language }: any) => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const clients = [
//     {
//       name: 'Varun Malik',
//       industry: { en: 'Real Estate', hi: 'रियल एस्टेट', mr: 'रिअल इस्टेट' },
//       image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
//       followers: '125K',
//       projects: 12,
//       website: 'https://cibuilder.com',
//       quote: {
//         en: '"Govindani Infotech transformed our real estate business with their Custom CRM solution. Our sales increased by 300%!"',
        
//       },
//       services: {
//         en: ['Custom CRM', 'Lead Management', 'Analytics Dashboard', 'Mobile App'],
        
//       }
//     },
//     {
//       name: 'Dr. Priya Sharma',
//       industry: { en: 'Healthcare',  },
//       image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
//       followers: '89K',
//       projects: 8,
//       website: 'https://healthplus.com',
//       quote: {
//         en: '"The hospital management system they built revolutionized our patient care. Efficiency up by 250%!"',
        
//       },
//       services: {
//         en: ['Patient Management', 'Appointment System', 'EMR Integration', 'Billing System'],
        
//       }
//     },
//     {
//       name: 'Rajesh Kumar',
//       industry: { en: 'E-commerce', hi: 'ई-कॉमर्स', mr: 'ई-कॉमर्स' },
//       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
//       followers: '210K',
//       projects: 15,
//       website: 'https://shopmax.com',
//       quote: {
//         en: '"Their e-commerce platform scaled our business to 10 cities. Revenue grew 400% in 6 months!"',
       
//       },
//       services: {
//         en: ['Full-stack E-commerce', 'Payment Gateway', 'Inventory Management', 'Logistics Integration'],
       
//       }
//     },
//     {
//       name: 'Anita Desai',
//       industry: { en: 'NGO' },
//       image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
//       followers: '156K',
//       projects: 10,
//       website: 'https://helpinghands.org',
//       quote: {
//         en: '"Their donation management system helped us reach 50,000 beneficiaries. Transparency increased trust by 500%!"',
        
//       },
//       services: {
//         en: ['Donation Platform', 'Recurring Donations', 'Volunteer Management', 'Impact Tracking'],
        
//       }
//     }
//   ];

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % clients.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + clients.length) % clients.length);
//   };

//   const currentClient = clients[currentSlide];

//   return (
//     <section className="industry-carousel">
//       <div className="carousel-container">
//         <motion.div
//           className="carousel-header"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
         
          
//         </motion.div>

//         <div className="carousel-content">
//           <button className="carousel-btn prev" onClick={prevSlide}>
//             <ChevronLeft size={32} />
//           </button>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentSlide}
//               className="carousel-card"
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -100 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="card-image-section">
//                 <div className="client-image-wrapper">
//                   <img src={currentClient.image} alt={currentClient.name} className="client-image" loading="lazy" decoding="async" />
//                   <div className="image-overlay"></div>
//                 </div>

//                 {/* Instagram Followers Badge */}
//                 <motion.div
//                   className="instagram-badge"
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.3, type: 'spring' }}
//                 >
//                   <Instagram size={20} />
//                   <span>{currentClient.followers}</span>
//                   <span className="badge-label">
//                     {language === 'en' ? 'Followers' : language === 'hi' ? 'फॉलोअर्स' : 'फॉलोअर्स'}
//                   </span>
//                 </motion.div>

//                 {/* Projects Badge */}
//                 <motion.div
//                   className="projects-badge"
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.5, type: 'spring' }}
//                 >
//                   <TrendingUp size={20} />
//                   <span>{currentClient.projects}+</span>
//                   <span className="badge-label">
//                     {language === 'en' ? 'Projects' : language === 'hi' ? 'परियोजनाएं' : 'प्रकल्प'}
//                   </span>
//                 </motion.div>
//               </div>

//               <div className="card-content-section">
//                 <div className="client-info">
//                   <h3 className="client-name">{currentClient.name}</h3>
//                   <p className="client-industry">{currentClient.industry[language]}</p>
//                 </div>

//                 <blockquote className="client-quote">{currentClient.quote[language]}</blockquote>

//                 <div className="services-provided">
//                   <h4>
//                     {language === 'en' ? 'Services Provided:' : language === 'hi' ? 'प्रदान की गई सेवाएं:' : 'प्रदान केलेल्या सेवा:'}
//                   </h4>
//                   <ul className="services-list">
//                     {currentClient.services[language].map((service, index) => (
//                       <motion.li
//                         key={index}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.7 + index * 0.1 }}
//                       >
//                         {service}
//                       </motion.li>
//                     ))}
//                   </ul>
//                 </div>

//                 {currentClient.website && (
//                   <a href={currentClient.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
//                     {language === 'en' ? 'Visit Website' : language === 'hi' ? }
//                     <ExternalLink className="btn-icon" size={18} />
//                   </a>
//                 )}
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           <button className="carousel-btn next" onClick={nextSlide}>
//             <ChevronRight size={32} />
//           </button>
//         </div>

//         {/* Carousel Indicators */}
//         <div className="carousel-indicators">
//           {clients.map((_, index) => (
//             <button
//               key={index}
//               className={`indicator ${index === currentSlide ? 'active' : ''}`}
//               onClick={() => setCurrentSlide(index)}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default IndustryCarousel;
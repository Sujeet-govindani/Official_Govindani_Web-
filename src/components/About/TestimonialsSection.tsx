import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Quote, Star, CheckCircle2, MessageCircle } from 'lucide-react';

const testimonials = [
  {
    name: "Prashanth Kondapalli",
    title: "Founder & CEO",
    company: "TechVentures India",
    text: "They are professional website designers, and I am fully satisfied with their fast services. We delayed in submitting the required information, but they never delayed on their side.",
    rating: 5,
    metric: "300% Growth",
    period: "Q2 2024",
    avatar: "RS",
    verified: true,
  },
  {
    name: "Rahul Sharma Tiwari",
    title: "Marketing Director",
    company: "Hr&Admin Officer",
    text: "Awesome service by team Govindani. I appreciate your service & work.",
    rating: 5,
    metric: "5x ROI",
    period: "2023-2024",
    avatar: "PM",
    verified: true,
  },
  {
    name: "Amiya Sabat",
    title: "Managing Partner",
    company: "Ngo Administrator",
    text: "Very good service for small and growing organisation",
    rating: 5,
    metric: "₹100Cr+",
    period: "Portfolio Value",
    avatar: "VP",
    verified: true,
  },
];

// Elegant star rating component
const StarRating = ({ rating, delay }: { rating: number; delay: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            delay: delay + i * 0.1,
            duration: 0.4,
            type: "spring",
            stiffness: 200
          }}
        >
          <Star
            className={`w-4 h-4 ${i < rating ? 'fill-amber-600 text-amber-600' : 'text-gray-700'}`}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Sophisticated quote card
const TestimonialCard = ({ testimonial, index, isInView }: any) => {
  return (
    <motion.div
      className="group relative h-full"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.6 + index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <motion.div
        className="relative h-full bg-gradient-to-b from-zinc-900/40 to-black/40 backdrop-blur-sm border-t border-l border-amber-600/10 overflow-hidden"
        whileHover={{ y: -4, borderColor: 'rgba(217, 119, 6, 0.2)' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Content */}
        <div className="relative p-8 md:p-10 h-full flex flex-col">
          {/* Quote icon - elegant and subtle */}
          <motion.div
            className="absolute top-6 right-6 opacity-5"
            initial={{ scale: 0, rotate: -90 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.8 + index * 0.15, duration: 0.6 }}
          >
            <Quote className="w-24 h-24 text-amber-600" />
          </motion.div>

          {/* Header with rating */}
          <div className="flex items-start justify-between mb-6 relative z-10">
            <StarRating rating={testimonial.rating} delay={0.9 + index * 0.15} />

            {testimonial.verified && (
              <motion.div
                className="flex items-center gap-1.5 text-xs text-amber-600/80"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1 + index * 0.15 }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span style={{ fontFamily: "'Libre Baskerville', serif" }}>Verified</span>
              </motion.div>
            )}
          </div>

          {/* Testimonial text */}
          <motion.blockquote
            className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 flex-grow relative z-10"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.1 + index * 0.15, duration: 0.8 }}
          >
            <span className="text-amber-600/40 text-4xl leading-none mr-1">"</span>
            {testimonial.text}
            <span className="text-amber-600/40 text-4xl leading-none ml-1">"</span>
          </motion.blockquote>

          {/* Author section */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 + index * 0.15 }}
          >
            {/* Divider line */}
            <div className="h-[1px] bg-gradient-to-r from-amber-600/30 via-amber-600/10 to-transparent mb-6" />

            <div className="flex items-start gap-4">
              {/* Avatar */}
              <motion.div
                className="relative flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 border border-amber-600/30 bg-gradient-to-br from-amber-900/20 to-amber-950/20 flex items-center justify-center">
                  <span className="text-amber-600 font-serif text-sm" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                    {testimonial.avatar}
                  </span>
                </div>
                {testimonial.verified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-600 flex items-center justify-center">
                    <Star className="w-2.5 h-2.5 fill-black text-black" />
                  </div>
                )}
              </motion.div>

              {/* Details */}
              <div className="flex-grow">
                <h4 className="text-white font-serif text-lg mb-1" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  {testimonial.name}
                </h4>
                <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  {testimonial.title}
                </p>
                <p className="text-amber-600/60 text-xs font-light italic" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  {testimonial.company}
                </p>
              </div>

              {/* Metric badge */}
              <div className="text-right flex-shrink-0">
                <div className="text-amber-600 font-serif text-lg mb-1" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  {testimonial.metric}
                </div>
                <div className="text-gray-600 text-xs" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  {testimonial.period}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 via-amber-600/0 to-amber-600/0 group-hover:from-amber-600/5 transition-all duration-700 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={sectionRef} className="relative pt-4 pb-32 md:pb-48 px-6 overflow-hidden bg-black">
      {/* Elegant background */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{ y: backgroundY }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4af37' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative max-w-7xl mx-auto">
        {/* Royal Header */}
        <motion.div
          className="text-center mb-20 md:mb-28"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 border border-amber-600/30 bg-amber-600/5 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MessageCircle className="w-4 h-4 text-amber-600" />
            <span className="text-xs uppercase tracking-[0.2em] text-amber-600/80" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Client Testimonials
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-5xl md:text-5xl lg:text-7xl font-serif mb-8 tracking-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              <span className="block text-white font-light mb-2">
                Trusted by
              </span>
              <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent font-normal">
                Industry Leaders
              </span>
            </h2>
          </motion.div>

          {/* Elegant divider */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-amber-600/30" />
            <div className="flex gap-2">
              <div className="w-1 h-1 bg-amber-600/50" />
              <div className="w-1 h-1 bg-amber-600/70" />
              <div className="w-1 h-1 bg-amber-600/50" />
            </div>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-amber-600/30" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Distinguished partnerships built on excellence, integrity, and measurable success.
            Hear from the visionaries who have experienced transformational growth.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom section with stats */}
        <motion.div
          className="mt-24 md:mt-32 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          {/* Divider */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-600/20 to-transparent mb-12" />

          {/* Stats row */}
          <div className="grid grid-cols1 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto ">
            {[
              { value: "1000+", label: "Client Partnerships" },
              { value: "₹9.8Cr+", label: "Revenue Generated" },
              { value: "1500+", label: "Markets Served" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2 + i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-serif font-light text-white mb-2" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-[0.15em]" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom ornament */}
          <motion.div
            className="mt-16 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 2.5 }}
          >
            <div className="w-1.5 h-1.5 bg-amber-600/30" />
            <div className="w-1 h-1 bg-amber-600/40" />
            <div className="w-1.5 h-1.5 bg-amber-600/50" />
            <div className="w-1 h-1 bg-amber-600/40" />
            <div className="w-1.5 h-1.5 bg-amber-600/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
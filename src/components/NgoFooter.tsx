"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Career = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [currentCareerStage, setCurrentCareerStage] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const careerStages = [
    {
      title: "Students",
      description: "Early career professionals",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "Early career professionals",
      description: "Experienced professionals",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "Experienced professionals",
      description: "Career Rebooters",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "Career Rebooters",
      description: "Returning to work",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
    }
  ];

  const doCards = [
    {
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
      title: "AI and Analytics",
      description: "From machine learning to generative AI, use cutting-edge tools to tackle our clients' most complex challenges."
    },
    {
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
      title: "Technology",
      description: "Build innovative solutions that transform businesses and create lasting impact."
    },
    {
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop&q=80",
      title: "Consulting",
      description: "Shape strategies that drive change across industries and around the world."
    }
  ];

  // --- NEW CAROUSEL SLIDES (7 slides) ---
  const careerCarouselSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
      title: "Grow your career",
      description: "From developers and designers to strategists and SAP pros, there are endless opportunities for you to learn, grow and make a difference.",
      linkText: "Learn more",
      linkHref: "#"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
      title: "Develop your skills",
      description: "Access world-class training and certifications to stay ahead in emerging technologies like AI, cloud, and cybersecurity.",
      linkText: "Explore learning",
      linkHref: "#"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop&q=80",
      title: "Global opportunities",
      description: "Work with teams across 200+ cities and experience diverse cultures while building your career.",
      linkText: "See locations",
      linkHref: "#"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=80",
      title: "Mentorship matters",
      description: "Connect with experienced leaders who will guide you, challenge you, and champion your success.",
      linkText: "Find a mentor",
      linkHref: "#"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80",
      title: "Diverse perspectives",
      description: "Join employee resource groups and celebrate what makes you unique while driving inclusion.",
      linkText: "Belong here",
      linkHref: "#"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&auto=format&fit=crop&q=80",
      title: "Innovation at scale",
      description: "Work on groundbreaking projects that redefine industries and improve lives around the world.",
      linkText: "See innovation",
      linkHref: "#"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=80",
      title: "Your future starts now",
      description: "Find your place at Accenture and build a career that matters for you and the world.",
      linkText: "Search roles",
      linkHref: "#"
    }
  ];

  // Auto-rotate career stages - FIXED
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCareerStage((prev) => (prev + 1) % careerStages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle slide change for doCards (existing)
  const handleSlideChange = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setActiveSlide((prev) => (prev + 1) % doCards.length);
    } else {
      setActiveSlide((prev) => (prev - 1 + doCards.length) % doCards.length);
    }
  };

  // --- NEW: Carousel navigation for careerCarouselSlides ---
  const [careerCarouselIndex, setCareerCarouselIndex] = useState(0);
  const nextCareerSlide = () => {
    setCareerCarouselIndex((prev) => (prev + 1) % careerCarouselSlides.length);
  };
  const prevCareerSlide = () => {
    setCareerCarouselIndex((prev) => (prev - 1 + careerCarouselSlides.length) % careerCarouselSlides.length);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center px-4 md:px-8 py-20"
      >
        {/* Hero Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&auto=format&fit=crop&q=80"
            alt="Office background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1a1a] to-black" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-[#d4af37]/20 via-transparent to-transparent blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-[#f4e5b8]/15 via-transparent to-transparent blur-3xl"
          />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="block">Belong. Grow. Thrive.</span>
              <span className="block mt-2">Reinvent</span>
              <span className="block mt-2 bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#d4af37] bg-clip-text text-transparent">
                with Accenture
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed"
            >
              Join a great place to work for professionals who drive meaningful change for our clients, communities, and the world.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 bg-gradient-to-r from-[#d4af37] to-[#c9a961] text-white text-lg font-semibold rounded-full hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-500 relative overflow-hidden"
            >
              <span className="relative z-10">Search open roles</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#f4e5b8] to-[#d4af37]"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#d4af37]/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-3 bg-[#d4af37] rounded-full" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* NEW CAROUSEL SECTION Whatever you want to do + Carousel (7 slides) */}
      <section className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(30deg, transparent 48%, #d4af37 49%, #d4af37 51%, transparent 52%),
              linear-gradient(150deg, transparent 48%, #d4af37 49%, #d4af37 51%, transparent 52%)
            `,
            backgroundSize: '80px 80px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-16"
          >
            Whatever you want to do
          </motion.h2>

          {/* Carousel Container: left image, right content (7 slides) */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${careerCarouselIndex * 100}%)` }}
            >
              {careerCarouselSlides.map((slide) => (
                <div
                  key={slide.id}
                  className="w-full flex-shrink-0 flex flex-col md:flex-row"
                >
                  {/* Left: Image */}
                  <div className="w-full md:w-1/2 h-[300px] md:h-[450px]">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Right: Content */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#d4af37] to-[#f4e5b8] bg-clip-text text-transparent">
                      {slide.title}
                    </h3>
                    <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                      {slide.description}
                    </p>
                    <motion.a
                      href={slide.linkHref}
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-[#d4af37] font-semibold text-lg md:text-xl group w-fit"
                    >
                      {slide.linkText}
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </motion.a>
                    {/* Slide indicator (like 1/7) */}
                    <div className="mt-8 text-sm text-gray-500">
                      ← {slide.id} / {careerCarouselSlides.length} →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows BELOW the carousel */}
          <div className="flex gap-4 mt-10 justify-start">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevCareerSlide}
              className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextCareerSlide}
              className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Existing "Whatever you want to do" section with 3 cards KEPT INTACT below new carousel */}
      <section className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
        
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(30deg, transparent 48%, #d4af37 49%, #d4af37 51%, transparent 52%),
              linear-gradient(150deg, transparent 48%, #d4af37 49%, #d4af37 51%, transparent 52%)
            `,
            backgroundSize: '80px 80px'
          }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-16"
          >
            Whatever you want to do
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {doCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl cursor-pointer"
              >
                <div className="aspect-[4/5] relative">
                  <motion.img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl lg:text-3xl font-bold mb-3 bg-gradient-to-r from-[#d4af37] to-[#f4e5b8] bg-clip-text text-transparent"
                    >
                      {card.title}
                    </motion.h3>
                    <p className="text-gray-300 text-sm lg:text-base mb-6 line-clamp-2">
                      {card.description}
                    </p>
                    <motion.button
                      whileHover={{ gap: "0.75rem" }}
                      className="inline-flex items-center gap-2 text-[#d4af37] font-semibold text-sm lg:text-base"
                    >
                      Discover this field
                      <motion.svg
                        whileHover={{ x: 5 }}
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </motion.button>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#d4af37]/30 rounded-3xl transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4 mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSlideChange('prev')}
              className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSlideChange('next')}
              className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Wherever you are in your career Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
        
        <div className="absolute left-0 top-1/4 w-64 h-64 bg-gradient-radial from-[#d4af37]/10 to-transparent blur-3xl" />
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-gradient-radial from-[#f4e5b8]/10 to-transparent blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-16"
          >
            Wherever you are in your career
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {careerStages.map((stage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setCurrentCareerStage(index)}
                  className={`relative border-l-4 pl-8 py-4 cursor-pointer transition-all duration-500 ${
                    currentCareerStage === index
                      ? 'border-[#d4af37]'
                      : 'border-white/20 hover:border-[#d4af37]/50'
                  }`}
                >
                  <h3
                    className={`text-xl md:text-2xl font-semibold transition-all duration-500 ${
                      currentCareerStage === index
                        ? 'text-white'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {stage.title}
                  </h3>
                  {currentCareerStage === index && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#d4af37] to-transparent"
                    />
                  )}
                </motion.div>
              ))}

              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ gap: "0.75rem" }}
                className="inline-flex items-center gap-2 text-[#d4af37] font-semibold text-lg mt-8"
              >
                Explore opportunities
                <motion.svg
                  whileHover={{ x: 5 }}
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden">
                <motion.img
                  key={currentCareerStage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  src={careerStages[currentCareerStage].image}
                  alt={careerStages[currentCareerStage].title}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-6 right-6 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-[#d4af37]/30"
                >
                  <p className="text-sm font-semibold bg-gradient-to-r from-[#d4af37] to-[#f4e5b8] bg-clip-text text-transparent">
                    Join our talent network
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* YOU BELONG HERE SECTION - Mobile stacks vertically, Desktop maintains alternating layout */}
      <section className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
        
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              You belong here
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-4xl leading-relaxed border-l-4 border-[#d4af37] pl-6">
              No two people are the same. By prioritizing six areas of well-being, we foster an inclusive environment where we all feel valued, seen and heard we call this Net Better Off.
            </p>
          </motion.div>

          {/* CONTAINERS - Mobile: stack vertically, Desktop: alternating layout with empty spaces */}
          <div className="space-y-8">
            
            {/* ROW 1: Relational */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Image with Relational content - Always visible */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-3xl h-[450px] w-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                  alt="Relational"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-3">Relational</h3>
                  <p className="text-white text-xl md:text-2xl mb-4 font-light max-w-lg">
                    Ensuring a sense of belonging and connection for all
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-white">Explore our approach</span>
                    <span className="text-2xl text-[#d4af37]">🔍</span>
                  </div>
                </div>
              </motion.div>

              {/* Empty space - Hidden on mobile, visible on desktop */}
              <div className="hidden md:block h-[450px]"></div>
            </div>

            {/* ROW 2: Emotional & mental */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Empty space - Hidden on mobile, visible on desktop */}
              <div className="hidden md:block h-[450px]"></div>

              {/* Image with Emotional & mental content - Always visible */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-3xl h-[450px] w-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80"
                  alt="Emotional & mental"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-3">Emotional & mental</h3>
                  <p className="text-white text-xl md:text-2xl mb-4 font-light max-w-lg">
                    Ongoing support for mental health and wellness
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-white">See benefits</span>
                    <span className="text-2xl text-[#d4af37]">🔍</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ROW 3: Physical */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Image with Physical content - Always visible */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-3xl h-[450px] w-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=80"
                  alt="Physical"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-3">Physical</h3>
                  <p className="text-white text-xl md:text-2xl mb-4 font-light max-w-lg">
                    Supporting physical well-being
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-white">See benefits</span>
                    <span className="text-2xl text-[#d4af37]">🔍</span>
                  </div>
                </div>
              </motion.div>

              {/* Empty space - Hidden on mobile, visible on desktop */}
              <div className="hidden md:block h-[450px]"></div>
            </div>

            {/* ROW 4: Employable */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Empty space - Hidden on mobile, visible on desktop */}
              <div className="hidden md:block h-[450px]"></div>

              {/* Image with Employable content - Always visible */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-3xl h-[450px] w-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80"
                  alt="Employable"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-3">Employable</h3>
                  <p className="text-white text-xl md:text-2xl mb-4 font-light max-w-lg">
                    Helping you get the right skills to advance to higher paying roles
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-white">See benefits</span>
                    <span className="text-2xl text-[#d4af37]">🔍</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ROW 5: Purposeful */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Image with Purposeful content - Always visible */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-3xl h-[450px] w-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=80"
                  alt="Purposeful"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-3">Purposeful</h3>
                  <p className="text-white text-xl md:text-2xl mb-4 font-light max-w-lg">
                    Evolving our purpose to meet an enlightened workforce, customers and community
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-white">See what we believe</span>
                    <span className="text-2xl text-[#d4af37]">🔍</span>
                  </div>
                </div>
              </motion.div>

              {/* Empty space - Hidden on mobile, visible on desktop */}
              <div className="hidden md:block h-[450px]"></div>
            </div>

            {/* ROW 6: Financial */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Empty space - Hidden on mobile, visible on desktop */}
              <div className="hidden md:block h-[450px]"></div>

              {/* Image with Financial content - Always visible */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-3xl h-[450px] w-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80"
                  alt="Financial"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-3">Financial</h3>
                  <p className="text-white text-xl md:text-2xl mb-4 font-light max-w-lg">
                    Offering rewards and benefits packages to meet your needs
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-white">See benefits</span>
                    <span className="text-2xl text-[#d4af37]">🔍</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section - We are everywhere */}
      <section className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
        
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920&auto=format&fit=crop&q=80"
            alt="World map"
            className="w-full h-full object-cover"
          />
        </div>
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#d4af37]/10 rounded-full"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-20 text-center lg:text-left"
          >
            We are everywhere
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { number: "784k", label: "People with diverse skills" },
              { number: "200+", label: "Cities" },
              { number: "9,000+", label: "Clients globally" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-6xl md:text-7xl lg:text-8xl font-black mb-4 bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#c9a961] bg-clip-text text-transparent"
                >
                  {stat.number}
                </motion.div>
                <p className="text-gray-400 text-lg md:text-xl">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay connected Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
        
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-16"
          >
            Stay connected
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-sm"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#c9a961] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3">Newsletter</h3>
              <p className="text-gray-400 text-lg mb-8">
                Subscribe to get our latest news and updates in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-4 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-[#d4af37] transition-all text-white placeholder-gray-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#c9a961] rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all"
                >
                  Sign up
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-sm"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#c9a961] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3">SMS</h3>
              <p className="text-gray-400 text-lg mb-8">
                Stay up to date and get your job alerts.
              </p>
              <motion.button
                whileHover={{ gap: "0.75rem" }}
                className="inline-flex items-center gap-2 text-[#d4af37] font-semibold text-lg"
              >
                Learn more
                <motion.svg
                  whileHover={{ x: 5 }}
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer with "Let there be change" */}
      <section className="py-20 md:py-32 px-4 md:px-8 relative border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0a0a0a]" />
        
        <div className="absolute top-0 right-0 w-1/3 h-1/3 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-12">
                Let there be change
              </h2>

              <div className="grid grid-cols-2 gap-12 mb-12">
                <div>
                  <h4 className="text-sm font-bold text-[#d4af37] mb-6 tracking-wider">EXPLORE</h4>
                  <ul className="space-y-4">
                    <li>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors text-lg">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors text-lg">
                        About us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors text-lg">
                        Diversity & Inclusion
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#d4af37] mb-6 tracking-wider">SUPPORT</h4>
                  <ul className="space-y-4">
                    <li>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors text-lg">
                        Students
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors text-lg">
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors text-lg">
                        Scam Alerts
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-sm text-gray-500">
                  © 2025 Accenture. All Rights Reserved.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center justify-center lg:justify-end"
            >
              <div className="text-right">
                {['LET', 'THERE', 'BE', 'CHANGE'].map((word, index) => (
                  <motion.div
                    key={word}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] mb-2"
                  >
                    <span className="bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#c9a961] bg-clip-text text-transparent">
                      {word}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #000;
          color: #fff;
        }

::-webkit-scrollbar {
          width: 12px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #d4af37, #c9a961);
          border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f4e5b8, #d4af37);
        }

        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Career;
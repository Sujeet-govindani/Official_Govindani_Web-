"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useNavigate } from "react-router-dom";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const Career = () => {
  const [currentCareerStage, setCurrentCareerStage] = useState(0);
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const resultsSectionRef = useRef(null);
  const resultsStageRef = useRef(null);
  const resultsBgRef = useRef(null);
  const resultsRevealRef = useRef(null);
  const resultsKickerRef = useRef(null);
  const resultsHeadingRef = useRef(null);
  const resultsLeftRef = useRef(null);
  const resultsRightRef = useRef(null);
  const resultsHoverTl = useRef<gsap.core.Timeline | null>(null);
  const resultsSplitRef = useRef<{ kicker: any; heading: any }>({
    kicker: null,
    heading: null,
  });

  const careerStages = [
    {
      title: "Students & Fresh Graduates",
      description: "Start your IT career journey",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/student.webp",
    },
    {
      title: "Early Career Professionals",
      description: "Grow your technical expertise",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/EarlyCareer.webp",
    },
    {
      title: "Experienced Professionals",
      description: "Lead innovative projects",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Experience.webp",
    },
    {
      title: "Career Switchers",
      description: "Transition to digital innovation",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/CareersSwitch.webp",
    },
  ];

  // ── Each slide has its own button label + navigation target ───────────────
  const careerCarouselSlides = [
    {
      id: 1,
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/DigitalMarketing.webp",
      title: "Digital Marketing Excellence",
      description: "Join our dynamic team and work on cutting-edge digital marketing campaigns that drive real business results for our clients.",
      linkText: "Explore Opportunities",
      navigateTo: "/explore-career",           // Slide 1 → ExploreCareer
    },
    {
      id: 2,
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Itsolution.webp",
      title: "IT Solutions & Innovation",
      description: "Be part of innovative IT projects leveraging the latest technologies in cloud, AI, and enterprise solutions.",
      linkText: "View Tech Roles",
      navigateTo: "/tech-roles",               // Slide 2 → TechRoles
    },
    {
      id: 3,
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/creativeteam.webp",
      title: "Creative Design Team",
      description: "Shape digital experiences with our creative team, designing stunning solutions that captivate and convert.",
      linkText: "Join Our Creative Team",
      navigateTo: "/about-us/about-company",    // Slide 3 → About Team page
    },
    {
      id: 4,
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ContinuousLearning.webp",
      title: "Continuous Learning",
      description: "Access training, certifications, and mentorship programs to stay ahead in the rapidly evolving tech landscape.",
      linkText: "Learn & Grow",
      navigateTo: "/tutorials/ngo-videos",     // Slide 4 → Blogs/Tutorials
    },
    {
      id: 5,
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ShapeThe.webp",
      title: "Shape the Digital Future",
      description: "Work on exciting projects that leverage the latest technologies in digital marketing and IT solutions.",
      linkText: "Start Your Journey",
      navigateTo: "/explore-career",           // Slide 5 → ExploreCareer
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCareerStage((prev) => (prev + 1) % careerStages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const [careerCarouselIndex, setCareerCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCareerCarouselIndex((prev) => (prev + 1) % careerCarouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextCareerSlide = () =>
    setCareerCarouselIndex((prev) => (prev + 1) % careerCarouselSlides.length);

  const prevCareerSlide = () =>
    setCareerCarouselIndex(
      (prev) => (prev - 1 + careerCarouselSlides.length) % careerCarouselSlides.length
    );

  const belongData = [

    {
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ProfessionalGrowth.webp",
      title: "Professional Growth",
      description: "Continuous learning opportunities through training, certifications, and hands-on projects",
      linkText: "Career development",
      position: "left",
    },
    {
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/CuttingEdge.webp",
      title: "Cutting-Edge Technology",
      description: "Work with the latest tools and technologies in digital marketing and IT solutions",
      linkText: "Our tech stack",
      position: "right",
    },
    {
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/creativeteam.webp",
      title: "Team Collaboration",
      description: "Join a passionate team that values collaboration, knowledge sharing, and mutual support",
      linkText: "Meet the team",
      position: "left",
    },

  ];

  // Results section GSAP animations
  useEffect(() => {
    if (!resultsSectionRef.current || !resultsStageRef.current) return;
    const ctx = gsap.context(() => {
      if (resultsBgRef.current) {
        gsap.fromTo(resultsBgRef.current, { scale: 1.12, y: 30 }, {
          scale: 1, y: -30, ease: "none",
          scrollTrigger: { trigger: resultsStageRef.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      }
      if (resultsRevealRef.current) gsap.set(resultsRevealRef.current, { autoAlpha: 0, y: 18, pointerEvents: "none" });
      if (resultsKickerRef.current && resultsHeadingRef.current) {
        resultsSplitRef.current.kicker = new SplitText(resultsKickerRef.current, { type: "words", wordsClass: "split-word" });
        resultsSplitRef.current.heading = new SplitText(resultsHeadingRef.current, { type: "words", wordsClass: "split-word" });
        gsap.set([...resultsSplitRef.current.kicker.words, ...resultsSplitRef.current.heading.words], { opacity: 0, y: 18, filter: "blur(8px)" });
      }
      resultsHoverTl.current = gsap.timeline({ paused: true });
      resultsHoverTl.current
        .to(resultsRevealRef.current, { autoAlpha: 1, y: 0, duration: 0.38, ease: "power3.out", onStart: () => { if (resultsRevealRef.current) (resultsRevealRef.current as HTMLElement).style.pointerEvents = "auto"; } })
        .to(resultsSplitRef.current.kicker?.words || [], { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.28, ease: "power3.out", stagger: 0.022 }, 0.06)
        .to(resultsSplitRef.current.heading?.words || [], { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power3.out", stagger: 0.04 }, 0.14)
        .fromTo([resultsLeftRef.current, resultsRightRef.current], { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.48, ease: "power3.out", stagger: 0.14 }, 0.34);
      const noHover = typeof window !== "undefined" && window.matchMedia?.("(hover: none)").matches;
      if (noHover) ScrollTrigger.create({ trigger: resultsStageRef.current, start: "top 80%", onEnter: () => resultsHoverTl.current?.play() });
      ScrollTrigger.refresh();
    }, resultsSectionRef);
    return () => { resultsSplitRef.current.kicker?.revert(); resultsSplitRef.current.heading?.revert(); ctx.revert(); };
  }, []);

  const handleResultsEnter = () => resultsHoverTl.current?.play();
  const handleResultsLeave = () => {
    if (typeof window !== "undefined" && window.matchMedia?.("(hover: hover)").matches)
      resultsHoverTl.current?.reverse();
  };

  const goToExploreCareer = () => navigate("/explore-career");

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <motion.section ref={heroRef} style={{ opacity, scale, minHeight: "min(100vh, var(--hero-max))" }}
        className="relative flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-4 sm:pb-6 md:pb-8"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&auto=format&fit=crop&q=80" alt="Office" className="w-full h-full object-cover opacity-20" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1a1a] to-black" />
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-[#d4af37]/20 via-transparent to-transparent blur-3xl" />
          <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-[#f4e5b8]/15 via-transparent to-transparent blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="relative z-10 max-w-7xl mx-auto text-center w-full">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-[1.15] px-2 heading-font"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block mb-1 sm:mb-2">Innovate. Create.</span>
              <span className="block mb-1 sm:mb-2">Transform</span>
              <span className="block bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#d4af37] bg-clip-text text-transparent" style={{ WebkitBoxDecorationBreak: "clone" }}>The Digital Future</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4 body-font"
            >
              Join our passionate team shaping the future of digital marketing and IT solutions. Where innovation meets excellence.
            </motion.p>
            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={goToExploreCareer}
              className="group px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#d4af37] to-[#c9a961] text-white text-base sm:text-lg font-semibold rounded-full hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-500 relative overflow-hidden body-font"
            >
              <span className="relative z-10">Explore Careers</span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-[#f4e5b8] to-[#d4af37]" initial={{ x: "100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
              <span className="relative z-10 inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </motion.button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }} className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-6 h-10 border-2 border-[#d4af37]/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-[#d4af37] rounded-full" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ── Carousel ─────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2 initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#d4af37] bg-clip-text text-transparent px-2 heading-font"
            style={{ WebkitBoxDecorationBreak: "clone" }}
          >
            Whatever you want to do
          </motion.h2>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${careerCarouselIndex * 100}%)` }}>
              {careerCarouselSlides.map((slide) => (
                <div key={slide.id} className="w-full flex-shrink-0 flex flex-col md:flex-row">
                  <div className="relative w-full md:w-1/2 h-[280px] sm:h-[320px] md:h-[450px] overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none bg-black/40">
                    <img src={slide.image} alt="" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-50 scale-110 pointer-events-none" loading="lazy" decoding="async" />
                    <img src={slide.image} alt={slide.title} className="relative z-10 w-full h-full object-fill" loading="lazy" decoding="async" />
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:p-16">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 bg-gradient-to-r from-[#d4af37] to-[#f4e5b8] bg-clip-text text-transparent px-2 heading-font"
                      style={{ WebkitBoxDecorationBreak: "clone" }}
                    >
                      {slide.title}
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed text-gray-300 body-font">
                      {slide.description}
                    </p>

                    {/* ── Per-slide navigation button ── */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => navigate(slide.navigateTo)}
                      className="inline-flex items-center gap-2 text-[#d4af37] font-semibold text-base sm:text-lg w-fit body-font bg-transparent border-none p-0 cursor-pointer"
                    >
                      {slide.linkText}
                      <span className="transition-transform">→</span>
                    </motion.button>

                    <div className="mt-4 sm:mt-6 text-sm text-gray-500 body-font">
                      {slide.id} / {careerCarouselSlides.length}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prevCareerSlide}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={nextCareerSlide}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── Wherever you are in your career ─────────────────────────────── */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
        <div className="absolute left-0 top-1/4 w-64 h-64 bg-gradient-radial from-[#d4af37]/10 to-transparent blur-3xl" />
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-gradient-radial from-[#f4e5b8]/10 to-transparent blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2 initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#d4af37] bg-clip-text text-transparent px-2 heading-font"
            style={{ WebkitBoxDecorationBreak: "clone" }}
          >
            Wherever you are in your career
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              {careerStages.map((stage, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}
                  onClick={() => setCurrentCareerStage(index)}
                  className={`relative border-l-4 pl-6 sm:pl-8 py-3 sm:py-4 cursor-pointer transition-all duration-500 ${currentCareerStage === index ? "border-[#d4af37]" : "border-white/20 hover:border-[#d4af37]/50"}`}
                >
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold transition-all duration-500 heading-font ${currentCareerStage === index ? "text-white" : "text-gray-500 hover:text-gray-300"}`}>
                    {stage.title}
                  </h3>
                  <p className={`text-sm sm:text-base md:text-lg mt-2 transition-all duration-500 body-font ${currentCareerStage === index ? "text-gray-300" : "text-gray-600"}`}>
                    {stage.description}
                  </p>
                  {currentCareerStage === index && (
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#d4af37] to-transparent" />
                  )}
                </motion.div>
              ))}
              <motion.button initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} onClick={goToExploreCareer}
                className="inline-flex items-center gap-2 text-[#d4af37] font-semibold text-base sm:text-lg mt-4 sm:mt-6 body-font"
              >
                Explore opportunities
                <motion.svg whileHover={{ x: 5 }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.button>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <motion.img key={currentCareerStage} initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
                  src={careerStages[currentCareerStage].image} alt={careerStages[currentCareerStage].title} className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                  className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-black/80 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-3 rounded-full border border-[#d4af37]/30"
                >
                  <p className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#d4af37] to-[#f4e5b8] bg-clip-text text-transparent body-font">Join our team</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── You Belong Here ──────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#d4af37] bg-clip-text text-transparent px-2 heading-font"
              style={{ WebkitBoxDecorationBreak: "clone" }}
            >You belong here</h2>
            <p className="text-base sm:text-lg md:text-xl max-w-4xl leading-relaxed border-l-4 border-[#d4af37] pl-4 sm:pl-6 py-2 text-gray-300 body-font">
              At Govindani Infotech Pvt. Ltd., we believe in fostering a culture of innovation, creativity, and excellence. Our team is our greatest asset, and we are always on the lookout for passionate individuals eager to make a difference.
            </p>
          </motion.div>
          <div className="space-y-6 sm:space-y-8">
            {belongData.map((item, index) => (
              <div key={index} className="flex flex-col md:grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <motion.div initial={{ opacity: 0, x: item.position === "left" ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
                  className={`relative overflow-hidden rounded-3xl h-[280px] sm:h-[320px] md:h-[400px] w-full ${item.position === "right" ? "md:order-2" : ""}`}
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: item.position === "left" ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
                  className={`flex flex-col justify-center p-4 sm:p-6 md:p-8 ${item.position === "right" ? "md:order-1" : ""}`}
                >
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#d4af37] bg-clip-text text-transparent px-2 heading-font"
                    style={{ WebkitBoxDecorationBreak: "clone" }}
                  >{item.title}</h3>
                  <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 font-light max-w-lg leading-relaxed text-white body-font">{item.description}</p>
                  <motion.a href="#" whileHover={{ x: 5 }} className="inline-flex items-center gap-2 text-[#d4af37] font-semibold text-base sm:text-lg w-fit body-font">
                    {item.linkText}<span className="text-xl">→</span>
                  </motion.a>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── Footer / Career Opportunities ────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&auto=format&fit=crop&q=80" alt="Team collaboration" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
        </div>
        <div className="relative z-10 py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 heading-font">
                <span className="block text-white mb-2">What Is Included In Our</span>
                <span className="block bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#c9a961] bg-clip-text text-transparent">Career Opportunities?</span>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
            >
              {[
                { title: "Competitive Salaries", description: "Industry-leading compensation packages" },
                { title: "Flexible Work", description: "Remote and hybrid work options" },
                { title: "Health Benefits", description: "Comprehensive health insurance coverage" },
                { title: "Learning & Development", description: "Access to courses and certifications" },
                { title: "Career Growth", description: "Clear advancement opportunities" },
                { title: "Great Culture", description: "Collaborative and innovative environment" },
              ].map((feature, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300"
                >
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-white heading-font">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-300 body-font">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #000; color: #fff; }
::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #d4af37, #c9a961); border-radius: 5px; }
        .heading-font { font-family: 'Libre Baskerville', 'Baskerville', 'Times New Roman', Georgia, serif !important; }
        .body-font { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important; }
        h1, h2, h3, h4 { font-family: 'Libre Baskerville', 'Baskerville', 'Times New Roman', Georgia, serif; overflow: visible; }
        p, li, a, span, button, input, textarea, select, label { font-family: 'Inter', sans-serif; }
        .bg-clip-text { -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; padding: 0.1em 0; display: inline-block; }
        .split-word { display: inline-block; will-change: transform, opacity, filter; }
      `}</style>
    </div>
  );
};

export default Career;
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, TrendingUp, Users, DollarSign } from 'lucide-react';

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Award, label: "Guinness World Records", value: "Multiple" },
    { icon: Users, label: "YouTube Subscribers", value: "1L+" },
    { icon: TrendingUp, label: "Books Published", value: "25+" },
    { icon: DollarSign, label: "Revenue Unlocked", value: "₹100Cr+" }
  ];

  return (
    <section ref={ref} className="relative py-32 px-4 bg-black overflow-hidden">
      {/* Floating Golden Spheres Background */}
      <motion.div
        className="absolute top-20 left-[10%] w-48 h-48 rounded-full bg-gradient-to-br from-amber-600/40 to-yellow-700/40 blur-3xl"
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-[15%] w-64 h-64 rounded-full bg-gradient-to-br from-yellow-600/30 to-amber-800/30 blur-3xl"
        animate={{ y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 right-[5%] w-40 h-40 rounded-full bg-gradient-to-br from-amber-500/35 to-yellow-600/35 blur-2xl"
        animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Glass Morphism Card */}
      <motion.div
        className="relative max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/[0.03] to-transparent pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">

            {/* SEO Paragraph Section with Image */}
            <motion.div
              className="mb-12 pb-12 border-b border-white/[0.08]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="border-2 border-white/[0.15] rounded-2xl p-8 lg:p-10 bg-black/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

                  {/* Left Side - Image Box with Golden Border */}
                  <motion.div
                    className="lg:col-span-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <div className="relative border-l-[6px] border-t-[6px] border-b-[6px] border-amber-500 rounded-2xl p-6 lg:p-8 bg-gradient-to-br from-amber-500/5 to-transparent h-full flex flex-col justify-center">
                      <div className="w-52 h-52 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white/20 shadow-xl shadow-amber-500/20">
                        <img
                          src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/sg.webp"
                          alt="Sujeet Govindani"
                          className="w-full h-full object-cover object-center scale-110"
                        />
                      </div>
                      <p className="text-sm text-gray-400 text-center leading-relaxed">
                        Global Startup Mentor and Digital Growth Architect known for record-shattering achievements.
                      </p>
                    </div>
                  </motion.div>

                  {/* Right Side - Sujeet Govindani Content */}
                  <motion.div
                    className="lg:col-span-8"
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <div className="relative rounded-2xl p-6 lg:p-8 bg-gradient-to-br from-amber-500/5 to-transparent h-full flex flex-col justify-center">
                      <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent py-2 inline-block">
                          Sujeet Govindani
                        </span>
                      </h3>
                      <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                        <span className="font-semibold text-white">Global Startup Mentor and Digital Growth Architect</span> known for record-shattering achievements and measurable strategic impact. He holds <span className="text-amber-400 font-semibold">multiple Guinness World Records</span> for authoring <span className="text-amber-400">101 Startup Ideas at age 22</span> and publishing <span className="text-amber-400">25+ digital marketing books rated 4.9+/5</span> worldwide. With over <span className="text-amber-400">1 lakh YouTube subscribers</span> and <span className="text-amber-400">15 million views</span>, Sujeet leads creators, founders, and CEOs through transformational growth, generating over <span className="text-amber-400 font-semibold">₹5 crore in direct marketing impact</span>, <span className="text-amber-400 font-semibold">₹25 crore+ client profit</span>, and unlocking <span className="text-amber-400 font-semibold">₹100 crore+ in real estate revenue</span> across India's top cities.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="mb-12 pb-12 border-b border-white/[0.08]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50"></div>
                <Sparkles className="w-6 h-6 text-amber-400" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/50"></div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="backdrop-blur-sm bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-center hover:border-amber-500/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5, borderColor: 'rgba(251, 191, 36, 0.3)' }}
                  >
                    <stat.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Content */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9, type: "spring" }}
              >
                <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-6" />
              </motion.div>

              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Ready to{' '}
                <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                  Transform
                </span>
                ?
              </motion.h2>

              <motion.p
                className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                Scale your business with strategic precision. Decode market acceleration strategies.
                Build engines that outlast trends. Transform ideas into measurable impact.
              </motion.p>

              {/* Single centered button */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Link
                  to="/contact-us"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-semibold text-base tracking-wide overflow-hidden shadow-lg shadow-amber-500/25"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">Book a Strategy Session</span>
                    <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-amber-500/20 rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-amber-500/20 rounded-br-3xl" />
        </div>
      </motion.div>

      {/* Ambient light */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />

    </section>
  );
};

export default CTASection;
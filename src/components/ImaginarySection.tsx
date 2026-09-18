import React, { useState, useEffect } from 'react';

const MarketingSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const boxes = [
    {
      text: "Hume Dhudna hai aajao yaha pe Mil jayenge",
      
      gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
      delay: "0s"
    },
    {
      text: "Aap humse Kaam Karana chahte ho? HUm KAha Milenge?",
      
      gradient: "from-cyan-600 via-blue-600 to-indigo-600",
      delay: "0.2s"
    },
    {
      text: "KAam karaloge toh 💗 mai, nhi toh satara 🛣️ pe mil jayenge",
     
      gradient: "from-rose-600 via-pink-600 to-red-600",
      delay: "0.4s"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-zinc-950 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float-slowest" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial-purple animate-pulse-slow" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-down">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient-x">
              Let's Connect
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light tracking-wide">
            Your journey starts here
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
          {boxes.map((box, idx) => (
            <div
              key={idx}
              className={`group relative animate-slide-up opacity-0`}
              style={{ 
                animationDelay: box.delay,
                animationFillMode: 'forwards'
              }}
            >
              {/* Glowing border effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${box.gradient} rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-rotate`} />
              
              {/* Card content */}
              <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl p-10 md:p-12 rounded-2xl border border-white/10 min-h-[450px] flex flex-col transform transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                {/* Corner decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className={`absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br ${box.gradient} blur-xl`} />
                </div>
                <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
                  <div className={`absolute bottom-4 left-4 w-20 h-20 rounded-full bg-gradient-to-br ${box.gradient} blur-xl`} />
                </div>

                {/* Number indicator */}
                <div className="mb-6">
                  <div className="relative inline-block">
                    
                    
                  </div>
                  <div className={`h-1 w-20 bg-gradient-to-r ${box.gradient} mt-3 rounded-full transform origin-left transition-transform duration-500 group-hover:scale-x-150`} />
                </div>

                {/* Text content with creative typography */}
                <div className="relative flex-1 flex items-center">
                  {idx === 0 && (
                    <div className="space-y-2">
                      <p className="text-white text-2xl md:text-3xl font-light leading-tight tracking-wide"
                         style={{ fontFamily: '"Inter", sans-serif' }}>
                        <span className={`font-black text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r ${box.gradient}`}>
                          Hume Dhudna hai
                        </span>
                      </p>
                      <p className="text-white/90 text-3xl md:text-4xl font-extrabold uppercase tracking-wider"
                         style={{ fontFamily: '"Montserrat", sans-serif', letterSpacing: '0.1em' }}>
                        aajao yaha pe
                      </p>
                      <p className={`text-5xl md:text-6xl font-black italic bg-clip-text text-transparent bg-gradient-to-r ${box.gradient}`}
                         style={{ fontFamily: '"Libre Baskerville", serif' }}>
                        Mil jayenge
                      </p>
                    </div>
                  )}
                  
                  {idx === 1 && (
                    <div className="space-y-3">
                      <p className="text-white text-3xl md:text-4xl font-bold tracking-tight"
                         style={{ fontFamily: '"Montserrat", sans-serif' }}>
                        <span className={`bg-clip-text text-transparent bg-gradient-to-r ${box.gradient}`}>
                          Aap humse
                        </span>
                      </p>
                      <p className="text-white/95 text-4xl md:text-5xl font-black uppercase"
                         style={{ fontFamily: '"Montserrat", sans-serif', letterSpacing: '0.05em' }}>
                        Kaam Karana
                      </p>
                      <p className="text-white text-3xl md:text-4xl font-semibold"
                         style={{ fontFamily: '"Montserrat", sans-serif' }}>
                        chahte ho?
                      </p>
                      <p className={`text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r ${box.gradient}`}
                         style={{ fontFamily: '"Montserrat", sans-serif', letterSpacing: '0.02em' }}>
                        HUm KAha Milenge?
                      </p>
                    </div>
                  )}
                  
                  {idx === 2 && (
                    <div className="space-y-2">
                      <p className="text-white text-3xl md:text-4xl font-bold tracking-wide"
                         style={{ fontFamily: '"Inter", sans-serif' }}>
                        <span className={`bg-clip-text text-transparent bg-gradient-to-r ${box.gradient} font-black text-4xl md:text-5xl`}>
                          KAam karaloge
                        </span>
                      </p>
                      <p className="text-white/95 text-5xl md:text-6xl font-black flex items-center gap-3"
                         style={{ fontFamily: '"Montserrat", sans-serif' }}>
                        toh <span className="text-6xl md:text-7xl">❤️</span> mai
                      </p>
                      <p className="text-white/90 text-2xl md:text-3xl font-medium italic"
                         style={{ fontFamily: '"EB Garamond", serif' }}>
                        nhi toh
                      </p>
                      <p className={`text-4xl md:text-5xl font-black uppercase bg-clip-text text-transparent bg-gradient-to-r ${box.gradient} flex items-center gap-2`}
                         style={{ fontFamily: '"Impact", sans-serif', letterSpacing: '0.05em' }}>
                        satara <span className="text-5xl">🛣️</span>pe
                      </p>
                      <p className="text-white text-3xl md:text-4xl font-bold"
                         style={{ fontFamily: '"Inter", sans-serif' }}>
                        mil jayenge
                      </p>
                    </div>
                  )}
                  
                  {/* Decorative quote mark */}
                  <div className={`absolute -top-8 -left-6 text-9xl font-serif bg-clip-text text-transparent bg-gradient-to-br ${box.gradient} opacity-20`}>
                    "
                  </div>
                </div>

                {/* Hover effect particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full animate-ping" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute top-1/2 right-8 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'forwards', opacity: 0 }}>
          <button className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-full text-white font-semibold text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <span className="relative z-10 flex items-center gap-2">
              Get Started Now
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>
      </div>

      <style >{`

        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.15); }
          66% { transform: translate(30px, -20px) scale(0.95); }
        }

        @keyframes float-slowest {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 20px) scale(1.05); }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gradient-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }

        .animate-float-slowest {
          animation: float-slowest 12s ease-in-out infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-gradient-rotate {
          animation: gradient-rotate 8s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .bg-gradient-radial-purple {
          background: radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 70%);
        }
      `}</style>
    </div>
  );
};

export default MarketingSection;
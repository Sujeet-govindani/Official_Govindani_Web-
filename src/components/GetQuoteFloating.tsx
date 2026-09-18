import React, { useState, useEffect } from "react";
import { useScrolledPastHero } from "../hooks/useScrolledPastHero";
import ContactUsForm from "../pages/ContactUsForm";
import { IoClose } from "react-icons/io5";

const GetQuoteFloating = () => {
  const [isOpen, setIsOpen] = useState(false);
  // hidden until the hero has been scrolled past
  const show = useScrolledPastHero();
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Get Quote", "Reach Out", "Get in Touch"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleModal = () => setIsOpen(!isOpen);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Button */}
      <div 
        className="cursor-pointer bottom-20 sm:bottom-5"
        onClick={toggleModal}
        style={{ 
            position: 'fixed', 
            zIndex: 9999999, 
            left: '20px',
            display: 'block',
            opacity: show ? 1 : 0,
            visibility: show ? 'visible' : 'hidden',
            transform: show ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 260ms ease, transform 260ms ease, visibility 260ms',
            pointerEvents: show ? 'auto' : 'none'
        }}
      >
        <style>{`
          .get-quote-btn {
            color: #d4af37;
            border-color: #d4af37;
            box-shadow: 0 0 15px rgba(212,175,55,0.2);
          }
          .get-quote-btn:hover {
            box-shadow: 0 0 25px rgba(212,175,55,0.4);
          }
          .get-quote-glow {
            background-color: #d4af37;
            opacity: 0.2;
          }
          .group:hover .get-quote-glow {
            opacity: 0.4;
          }

          /* NGO Slide Overrides - Darker contrast for light background */
          body[data-active-slide="ngo"] .get-quote-btn {
            color: #3D2B1F !important;
            border-color: #3D2B1F !important;
            box-shadow: 0 0 15px rgba(61,43,31,0.2) !important;
          }
          body[data-active-slide="ngo"] .get-quote-btn:hover {
            box-shadow: 0 0 25px rgba(61,43,31,0.4) !important;
          }
          body[data-active-slide="ngo"] .get-quote-glow {
            background-color: #3D2B1F !important;
          }
        `}</style>
        <div className="relative group">
          {/* Main Button */}
          <div className="get-quote-btn bg-transparent backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300 flex items-center gap-2 border-2">
            <span className="font-bold text-[10px] sm:text-xs whitespace-nowrap min-w-[80px] sm:min-w-[100px] text-center font-inter uppercase tracking-[0.1em] sm:tracking-[0.15em]">
              {words[wordIndex]}
            </span>
          </div>
          
          {/* Outer glow */}
          <div className="get-quote-glow absolute -inset-1 rounded-full blur transition-opacity duration-300 -z-10"></div>
        </div>
      </div>

      {/* Modal Container */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={toggleModal}
        >
          <div 
            className="relative bg-black w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#d4af37]/30 shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}
          >
            <style>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all z-[10001] border border-white/10"
              onClick={toggleModal}
              aria-label="Close modal"
            >
              <IoClose size={24} />
            </button>

            {/* Form Content */}
            <div className="p-2 sm:p-4">
               {/* 
                  Passing a prop to potentially hide the header if we decide to add it.
                  For now, rendering the full component as requested.
               */}
               <ContactUsForm onSuccess={() => setIsOpen(false)} isModal={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GetQuoteFloating;

import { useScrolledPastHero } from "../hooks/useScrolledPastHero";
import { whatsappBotLink, WHATSAPP_BOT_MESSAGE } from "../config/contact";
import { FaWhatsapp } from "react-icons/fa";

type Props = {
  phone?: string;            // phone number in international format without '+' or dashes
  message?: string;            // prefilled message
};

// Points at the WhatsApp BOT line so a click opens the guided assistant flow,
// not the human sales inbox. Number + opener live in config/contact.ts.
const buildLink = (message?: string) => whatsappBotLink(message);

export default function WhatsappFloating({
  message = WHATSAPP_BOT_MESSAGE,
}: Props) {
  const href = buildLink(message);

  // hidden until the hero has been scrolled past
  const show = useScrolledPastHero();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        bottom-20 sm:bottom-5
        grid place-items-center
        h-12 w-12 sm:h-14 sm:w-14 rounded-full
        shadow-[0_12px_35px_rgba(37,211,102,0.4)]
        transition-all duration-300
        hover:scale-110 hover:shadow-[0_20px_45px_rgba(37,211,102,0.6)]
        active:scale-95
        focus:outline-none focus:ring-4 focus:ring-[#25D366]/40
        overflow-hidden
        group
      "
      style={{ 
        backgroundColor: "#25D366", 
        position: 'fixed', 
        zIndex: 9999999, 
        right: '20px',
        display: 'grid',
        opacity: show ? 1 : 0,
        visibility: show ? 'visible' : 'hidden',
        transform: show ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 260ms ease, transform 260ms ease, visibility 260ms',
        pointerEvents: show ? 'auto' : 'none'
      }}
    >
      {/* Outer glow effect */}
      <div
        className="absolute -inset-3 rounded-full opacity-30"
        style={{ 
          backgroundColor: "#25D366",
          filter: "blur(12px)"
        }}
      />
      
      {/* Inner glow */}
      <div
        className="absolute inset-0 rounded-full opacity-20"
        style={{ 
          backgroundColor: "#ffffff",
        }}
      />
      
      {/* Shine effect on top */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-full" />
      
      {/* WhatsApp Icon */}
      <FaWhatsapp 
        className="relative z-10 text-white w-6 h-6 sm:w-7 sm:h-7" 
      />
      
      {/* Subtle pulsing animation */}
      <div className="absolute inset-0 rounded-full border-2 border-white/30" />
      
      {/* Tooltip */}
      <div className="
        absolute right-full mr-3 top-1/2 -translate-y-1/2
        bg-black/90 text-white text-xs font-medium
        px-3 py-2 rounded-lg
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        whitespace-nowrap
        hidden sm:block
      ">
        Chat with us on WhatsApp
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-black/90" />
      </div>
    </a>
  );
}
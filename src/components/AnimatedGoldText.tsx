"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedGoldTextProps {
    text: string;
}

const AnimatedGoldText: React.FC<AnimatedGoldTextProps> = ({ text }) => {
    const textRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        if (!textRef.current) return;

        const words = textRef.current.querySelectorAll(".gold-word");

        gsap.fromTo(
            words,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.6,
                ease: "power3.out",
            }
        );
    }, []);

    return (
        <p
            ref={textRef}
            className="font-heading font-extrabold
      text-lg md:text-xl lg:text-2xl mb-3 leading-tight text-center"
        >
            {text.split(" ").map((word, i) => (
                <span
                    key={i}
                    className="
  gold-word inline-flex whitespace-nowrap mr-2
  font-heading font-extrabold
  text-lg md:text-xl lg:text-2xl

  bg-gradient-to-r 
    from-[#d9d9d9] 
    via-[#ffffff] 
    to-[#bfbfbf]
    bg-[length:200%_200%]
    bg-clip-text text-transparent

  transition-transform duration-400
  group-hover:scale-150
"
                >
                    {word}
                </span>
            ))}
        </p>
    );
};

export default AnimatedGoldText;

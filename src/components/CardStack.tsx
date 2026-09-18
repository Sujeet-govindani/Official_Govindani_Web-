import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
};

type CardStackProps = {
  items: CardStackItem[];
  initialIndex?: number;
  maxVisible?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  spreadDeg?: number;
  activeScale?: number;
  inactiveScale?: number;
};

function wrapIndex(n: number, len: number) {
  return ((n % len) + len) % len;
}

function signedOffset(i: number, active: number, len: number) {
  const raw = i - active;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export default function CardStack({
  items,
  initialIndex = 0,
  maxVisible = 5,
  cardWidth = 320,
  cardHeight = 200,
  overlap = 0.4,
  spreadDeg = 40,
  activeScale = 1.05,
  inactiveScale = 0.9,
}: CardStackProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = React.useState(initialIndex);
  const maxOffset = Math.floor(maxVisible / 2);
  const spacing = cardWidth * (1 - overlap);
  const stepDeg = spreadDeg / maxOffset;
  const next = () => setActive((a) => wrapIndex(a + 1, items.length));
  const prev = () => setActive((a) => wrapIndex(a - 1, items.length));

  return (
    <div className="w-full">
      <div
        className="relative flex items-end justify-center"
        style={{ height: cardHeight + 120 }}
      >
        <AnimatePresence>
          {items.map((item, i) => {
            const off = signedOffset(i, active, items.length);
            const abs = Math.abs(off);
            if (abs > maxOffset) return null;
            const x = off * spacing;
            const rotate = off * stepDeg;
            const scale = off === 0 ? activeScale : inactiveScale;
            const zIndex = 100 - abs;
            return (
              <motion.div
                key={item.id}
                className={cn(
                  "absolute bottom-0 rounded-xl overflow-hidden shadow-xl cursor-pointer border border-gold/20"
                )}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  zIndex,
                }}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 40, scale: 0.8 }
                }
                animate={{
                  opacity: 1,
                  x,
                  rotateZ: rotate,
                  scale,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                }}
                onClick={() => setActive(i)}
              >
                <div className="relative w-full h-full">
                  {item.imageSrc ? (
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-muted">
                      <span className="text-muted-foreground text-sm">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-3 text-foreground">
                    <h3 className="text-sm font-semibold font-heading">{item.title}</h3>
                    {item.description && (
                      <p className="text-xs text-cream-dark">{item.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="px-5 py-2 bg-primary text-primary-foreground rounded-lg font-body text-sm font-medium hover:bg-gold-light transition-colors"
        >
          Prev
        </button>
        <button
          onClick={next}
          className="px-5 py-2 bg-primary text-primary-foreground rounded-lg font-body text-sm font-medium hover:bg-gold-light transition-colors"
        >
          Next
        </button>
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActive(idx)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-colors",
              idx === active ? "bg-primary" : "bg-muted-foreground/40"
            )}
          />
        ))}
      </div>
      {items[active]?.href && (
        <div className="flex justify-center mt-3">
          <a href={items[active].href} target="_blank" rel="noreferrer">
            <SquareArrowOutUpRight className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
          </a>
        </div>
      )}
    </div>
  );
}

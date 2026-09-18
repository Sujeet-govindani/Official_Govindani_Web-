import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  formatAs?: 'compact' | 'full';
}

const formatNumber = (num: number, format: 'compact' | 'full') => {
  if (format === 'compact') {
    if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr+';
    if (num >= 100000) return (num / 100000).toFixed(0) + 'L+';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K+';
    return num.toString();
  }
  return num.toLocaleString('en-IN');
};

const AnimatedCounter = ({ value, label, suffix = '', prefix = '', duration = 2, formatAs = 'compact' }: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gradient-gold">
        {prefix}{formatNumber(displayValue, formatAs)}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground mt-1 font-body uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  );
};

export default AnimatedCounter;
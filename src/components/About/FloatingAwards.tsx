import { motion } from 'framer-motion';
import { Award, Trophy, Star } from 'lucide-react';

const awards = [
  { name: "Guinness World Record", subtitle: "101 Startup Ideas", icon: Trophy, delay: 0 },
  { name: "Guinness World Record", subtitle: "25+ Books Published", icon: Trophy, delay: 0.3 },
  { name: "India Book of Records", subtitle: "Digital Marketing", icon: Award, delay: 0.6 },
  { name: "Asia Book of Records", subtitle: "Youngest Author", icon: Star, delay: 0.9 },
];

const positions = [
  { x: -20, y: -70, rotate: -8 },
  { x: 40, y: -10, rotate: 5 },
  { x: -40, y: 40, rotate: -3 },
  { x: 20, y: 80, rotate: 7 },
];

const FloatingAwards = () => {
  return (
    <div className="relative h-[450px] sm:h-[500px] flex items-center justify-center">
      {awards.map((award, i) => {
        const Icon = award.icon;
        return (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center gap-1 cursor-pointer"
            style={{ x: positions[i].x }}
            initial={{ y: positions[i].y, rotate: positions[i].rotate, opacity: 0 }}
            animate={{
              y: [positions[i].y - 10, positions[i].y + 10, positions[i].y - 10],
              rotate: [positions[i].rotate - 2, positions[i].rotate + 2, positions[i].rotate - 2],
              opacity: 1,
            }}
            transition={{
              y: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.8, delay: award.delay },
            }}
            whileHover={{ scale: 1.15 }}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary border-2 border-primary/40 flex items-center justify-center animate-glow-pulse">
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            </div>
            <div className="text-center max-w-[100px]">
              <p className="text-[8px] sm:text-[9px] font-semibold text-foreground/90 leading-tight">{award.name}</p>
              <p className="text-[7px] sm:text-[8px] text-muted-foreground leading-tight">{award.subtitle}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingAwards;
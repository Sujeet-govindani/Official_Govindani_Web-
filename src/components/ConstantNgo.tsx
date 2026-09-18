// ✅ UPDATED: Each video now has DIFFERENT, MISMATCHED angles for left/right tilt
const cardsngo = [
  {
    src: "/public/Videos/r1.mp4",
    rotation: "rotate-z-[-8deg]",  // -8 degrees (left tilt)
    name: "Madison",
    img: "/public/1B.webp",
    translation: "translate-y-[-5%]",
  },
  {
    src: "/public/Videos/r2.mp4",
    rotation: "rotate-z-[6deg]",   // +6 degrees (right tilt)
    name: "Alexander",
    img: "/images/p2.png",
    translation: "",
  },
  {
    src: "/public/Videos/r3.mp4",
    rotation: "rotate-z-[-4deg]",  // -4 degrees (left tilt)
    name: "Andrew",
    img: "/images/p3.png",
    translation: "translate-y-[-5%]",
  },
  {
    src: "/public/Videos/r4.mp4",
    rotation: "rotate-z-[5deg]",  // +10 degrees (right tilt, more)
    name: "Bryan",
    img: "/images/p4.png",
    translation: "translate-y-[5%]",
  },
  {
    src: "/public/Videos/r5.mp4",
    rotation: "rotate-z-[-4deg]",  // -6 degrees (left tilt)
    name: "Chris",
    img: "/images/p5.png",
    translation: "",
  },
  {
    src: "/public/Videos/r1.mp4",
    rotation: "rotate-z-[3deg]",   // +3 degrees (right tilt, less)
    name: "Devante",
    img: "/images/p6.png",
    translation: "translate-y-[10%]",
  },
];

const nutrientLists = [
  { label: "Energy", img: "/images/c1.png" },
  { label: "Pain Relief", img: "/images/c2.png" },
  { label: "Skin", img: "/images/c3.png" },
  { label: "Digestion", img: "/images/c4.png" },
  { label: "Men's Health", img: "/images/c5.png" },

  { label: "Hair Care", img: "/images/c6.png" },
  { label: "Women Health", img: "/images/c7.png" },
  { label: "Weight", img: "/images/c8.png" },
];

export { nutrientLists, cardsngo }

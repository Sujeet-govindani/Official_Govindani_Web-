// ✅ UPDATED: Each video now has DIFFERENT, MISMATCHED angles for left/right tilt
const cards = [
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/Real-Estate-Capture-1.webm",
    rotation: "rotate-z-[-8deg]",  // -8 degrees (left tilt)
    name: "Madison",
    img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1B.webp",
    translation: "translate-y-[-5%]",
  },
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/Real-Estate-Capture2.webm",
    rotation: "rotate-z-[6deg]",   // +6 degrees (right tilt)
    name: "Alexander",
    img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/p2.webp",
    translation: "",
  },
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/Real-Estate-Capture3.webm",
    rotation: "rotate-z-[-4deg]",  // -4 degrees (left tilt)
    name: "Andrew",
    img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/p3.webp",
    translation: "translate-y-[-5%]",
  },
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/Real-Estate-Capture4.webm",
    rotation: "rotate-z-[5deg]",  // +10 degrees (right tilt, more)
    name: "Bryan",
    img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/p4.webp",
    translation: "translate-y-[5%]",
  },
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/Real-Estate-Capture5.webm",
    rotation: "rotate-z-[-4deg]",  // -6 degrees (left tilt)
    name: "Chris",
    img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/p5.png",
    translation: "",
  },
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/Real-Estate-Capture6.webm",
    rotation: "rotate-z-[3deg]",   // +3 degrees (right tilt, less)
    name: "Devante",
    img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/p6.png",
    translation: "translate-y-[10%]",
  },
];

const nutrientLists = [
  { label: "Energy", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/c1.png" },
  { label: "Pain Relief", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/c2.png" },
  { label: "Skin", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/c3.png" },
  { label: "Digestion", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/c4.png" },
  { label: "Men's Health", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/c5.png" },
  { label: "Hair Care", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/c6.png" },
  { label: "Women Health", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/c7.png" },
  { label: "Weight", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/c8.png" },
];

export { nutrientLists, cards };
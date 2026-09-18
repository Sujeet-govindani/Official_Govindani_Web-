import { Play } from 'lucide-react';

const videos = [
  { title: "101 Startup Ideas That Changed The Game", views: "2.3M" },
  { title: "Digital Marketing Secrets Revealed", views: "1.5M" },
  { title: "SEO Masterclass for Beginners", views: "890K" },
  { title: "Growth Hacking Strategies 2024", views: "1.2M" },
  { title: "Leadership That Transforms", views: "750K" },
  { title: "Scale Your Business 10X", views: "1.8M" },
  { title: "The Startup Mindset", views: "920K" },
  { title: "Content Strategy Blueprint", views: "1.1M" },
];

const gradients = [
  "linear-gradient(135deg, #1a1a2e, #16213e)",
  "linear-gradient(135deg, #0f3460, #1a1a2e)",
  "linear-gradient(135deg, #16213e, #0f3460)",
  "linear-gradient(135deg, #1a1a2e, #533483)",
  "linear-gradient(135deg, #0f3460, #16213e)",
  "linear-gradient(135deg, #16213e, #1a1a2e)",
  "linear-gradient(135deg, #1a1a2e, #0f3460)",
  "linear-gradient(135deg, #533483, #16213e)",
];

const VideoCard = ({ video, gradient, index }: { video: typeof videos[0]; gradient: string; index: number }) => (
  <div
    className="relative w-32 sm:w-40 h-20 sm:h-24 rounded-lg overflow-hidden group cursor-pointer flex-shrink-0 border border-border/50"
    style={{ background: gradient }}
  >
    <div className="absolute inset-0 bg-primary/5" />
    <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm">
        <Play className="w-3 h-3 text-primary" fill="currentColor" />
      </div>
    </div>
    <div className="absolute bottom-1 left-2 right-2">
      <p className="text-[9px] sm:text-[10px] text-foreground/80 font-medium truncate">{video.title}</p>
      <p className="text-[7px] sm:text-[8px] text-muted-foreground">{video.views} views</p>
    </div>
  </div>
);

const FilmStrip = () => {
  const doubledVideos = [...videos, ...videos];

  return (
    <div className="relative h-[450px] sm:h-[500px] overflow-hidden">
      <div className="flex gap-2 sm:gap-3 justify-center">
        {/* Column 1 - scrolling up */}
        <div className="relative">
          <div className="w-3 film-sprocket absolute left-0 top-0 bottom-0 opacity-30" />
          <div className="animate-scroll-up flex flex-col gap-2 sm:gap-3 pl-4">
            {doubledVideos.map((video, i) => (
              <VideoCard key={`up-${i}`} video={video} gradient={gradients[i % gradients.length]} index={i} />
            ))}
          </div>
        </div>

        {/* Column 2 - scrolling down */}
        <div className="relative">
          <div className="animate-scroll-down flex flex-col gap-2 sm:gap-3">
            {doubledVideos.map((video, i) => (
              <VideoCard key={`down-${i}`} video={videos[(i + 3) % videos.length]} gradient={gradients[(i + 4) % gradients.length]} index={i} />
            ))}
          </div>
          <div className="w-3 film-sprocket absolute right-0 top-0 bottom-0 opacity-30" />
        </div>
      </div>

      {/* Gradient masks */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default FilmStrip;
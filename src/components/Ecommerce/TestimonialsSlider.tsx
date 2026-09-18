import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Fashion Boutique Owner",
    avatar: "PS",
    content: "We got 100% more sales after launching our own website. No more marketplace fees eating into our profits!",
    rating: 5,
    metric: "+100% Sales",
  },
  {
    name: "Rahul Verma",
    role: "Electronics Store Owner",
    avatar: "RV",
    content: "The custom website gave us complete control over our brand. Our customers trust us more now.",
    rating: 5,
    metric: "+85% Trust",
  },
  {
    name: "Anita Patel",
    role: "Jewelry Business Owner",
    avatar: "AP",
    content: "Best investment we made. One-time payment, lifetime ownership. No monthly bleeding of profits.",
    rating: 5,
    metric: "₹0 Monthly",
  },
  {
    name: "Vikram Singh",
    role: "Home Decor Brand",
    avatar: "VS",
    content: "The seamless checkout and delivery integration made our operations so much smoother.",
    rating: 5,
    metric: "+60% Efficiency",
  },
];

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none"
           style={{ background: "radial-gradient(circle, hsla(38, 92%, 50%, 0.05) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-primary/10 text-primary border border-primary/20">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-gradient-gold">Clients Say</span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="relative">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl p-8 md:p-12 glass-card-gold relative overflow-hidden">
              {/* Quote icon */}
              <Quote size={60} className="absolute top-6 right-6 text-primary/10" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Author - Stack on mobile, inline on desktop */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{testimonials[currentIndex].name}</p>
                    <p className="text-muted-foreground text-sm">{testimonials[currentIndex].role}</p>
                  </div>
                </div>

                {/* Metric badge */}
                <span className="px-4 py-2 rounded-full bg-success/10 text-success font-bold text-sm border border-success/20">
                  {testimonials[currentIndex].metric}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:border-primary/30 transition-all"
            >
              <ChevronLeft size={20} className="text-foreground" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIsAutoPlaying(false); setCurrentIndex(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:border-primary/30 transition-all"
            >
              <ChevronRight size={20} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
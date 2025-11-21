import React, { useEffect, useRef, useState, useCallback } from "react";
import { CheckCircle2 } from "lucide-react";
import worksGif from "../assets/works.gif";

// Define the single permanent image/GIF here
const STATIC_GIF_SRC = worksGif;

const steps = [
  {
    number: "01",
    title: "AI-Tailored Nutrition",
    description:
      "Our AI analyzes your unique body metrics to craft the perfect diet roadmap. Whether cutting, bulking, or maintaining, get a plan tailored just for you.",
  },
  {
    number: "02",
    title: "Smart AI Swaps",
    description:
      "Don't like a suggestion? Our AI instantly recommends delicious alternatives that fit your macros perfectly. Your diet, your rules.",
  },
  {
    number: "03",
    title: "Intelligent Tracking",
    description:
      "Log meals and weight while our smart system tracks your progress toward specific milestones, helping you celebrate every victory on your journey.",
  },
  {
    number: "04",
    title: "Monthly AI Booklets",
    description:
      "Download comprehensive, AI-curated monthly diet planner booklets. Keep your personalized nutrition organized and accessible anywhere you go.",
  },
];

const AUTO_PLAY_MS = 3000;

export default function HowItWorksCarousel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Logic to scroll the active card into view automatically
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-slide]"));
    const card = cards[currentIndex];
    
    if (card) {
      // Calculate the position to center the active card
      const left = card.offsetLeft - (el.clientWidth - card.clientWidth) / 2;
      el.scrollTo({ left, behavior: "smooth" });
    }
  }, [currentIndex]);

  // Auto-play timer logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % steps.length);
    }, AUTO_PLAY_MS);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  const goToIndex = useCallback((index: number) => {
    const safeIndex = ((index % steps.length) + steps.length) % steps.length;
    setCurrentIndex(safeIndex);
  }, []);

  // Touch Swipe Logic for mobile users
  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartX.current;
    if (startX === null) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToIndex(currentIndex + 1); // Swipe Left -> Next
      } else {
        goToIndex(currentIndex - 1); // Swipe Right -> Prev
      }
    }
    
    touchStartX.current = null;
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <section id="how-it-works" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            How GoalChef Works —{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Your Journey
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how GoalChef guides you from goal setting to real results.
          </p>
        </div>

        <div 
          className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* LEFT PANEL - Clean Image Placeholder */}
          <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-1">
            <div className="relative w-full max-w-lg mx-auto aspect-video rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-muted/30">
               {/* The Static GIF/Image */}
               <img
                src={STATIC_GIF_SRC} 
                alt="GoalChef App Demo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT PANEL - Auto-scrolling Carousel Text */}
          <div className="w-full lg:w-1/2 order-2 lg:order-2">
            <div
              ref={containerRef}
              // 'relative' ensures the scroll calculation logic works correctly
              className="relative flex gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {steps.map((step, i) => (
                <article
                  key={i}
                  data-slide
                  onClick={() => goToIndex(i)}
                  // Only active cards are highlighted, others are visible but slightly scaled down
                  className={`snap-center shrink-0 w-full cursor-pointer transition-all duration-500 ease-out
                    ${i === currentIndex ? "scale-100 z-10 opacity-100" : "scale-95 z-0 opacity-100"} 
                  `}
                >
                  <div className={`bg-card border rounded-2xl p-6 shadow-sm transition-all duration-300
                    ${i === currentIndex 
                      ? "border-primary ring-1 ring-primary/20 shadow-lg" 
                      : "border-border hover:border-primary/30"}
                  `}>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-inner transition-colors duration-300 ${
                          i === currentIndex 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          <span className="text-2xl font-bold">{step.number}</span>
                        </div>

                        <h3 className={`text-2xl font-bold transition-colors ${
                          i === currentIndex ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-base text-muted-foreground leading-relaxed pl-1">
                        {step.description}
                      </p>
                      
                      {/* Active Indicator */}
                      {i === currentIndex && (
                         <div className="flex items-center text-primary text-sm font-medium animate-in fade-in slide-in-from-left-2 duration-500">
                           <CheckCircle2 className="h-4 w-4 mr-2" />
                           Current Step
                         </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="mt-6 flex items-center justify-center gap-3">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToIndex(i)}
                  aria-label={`Go to step ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-muted-foreground/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import heroImage from "@/assets/hero-image.png";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import { useState } from "react";

const LargeHero = () => {
  const { ref, isVisible } = useScrollFadeIn(0.15);
  const [isHovering, setIsHovering] = useState(false);

  const textLines = [
    "Contemporary jewelry crafted with timeless elegance",
    "Each piece tells a story of heritage and innovation",
    "Blending modern aesthetics with traditional craftsmanship",
    "Celebrating the beauty of refined design"
  ];

  return (
    <section className="w-full mb-16 px-6">
      <div
        ref={ref}
        className={`transition-all duration-[800ms] ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div 
          className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] mb-4 overflow-hidden rounded-2xl shadow-[0_4pc_20px_-6px_hsl(25_30%_15%/0.08)] group cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img
            src={heroImage}
            alt="Modern jewelry collection"
            className="w-full h-full object-cover image-cinematic transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Hover overlay with text animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center p-6 md:p-10 lg:p-12">
            <div className="space-y-4 w-full max-w-2xl">
              <h3
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                style={{
                  fontFamily: 'var(--font-display)',
                  animation: isHovering ? 'fadeInTitle 0.8s ease-out forwards' : 'none',
                  opacity: isHovering ? 1 : 0
                }}
              >
                Modern Heritage
              </h3>
              
              {textLines.map((line, index) => (
                <p
                  key={index}
                  className={`text-base md:text-lg lg:text-2xl font-light text-white leading-relaxed transition-all duration-700 transform`}
                  style={{
                    fontFamily: 'var(--font-display)',
                    transitionDelay: isHovering ? `${(index + 1) * 150}ms` : "0ms",
                    opacity: isHovering ? 1 : 0,
                    transform: isHovering ? 'translateY(0)' : 'translateY(16px)'
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Static text below image */}
        <div className="px-1">
          <h2 className="text-sm font-medium tracking-widest uppercase text-foreground mb-1">
            Modern Heritage
          </h2>
          <p className="text-sm font-light text-muted-foreground">
            Contemporary jewelry crafted with timeless elegance
          </p>
        </div>
      </div>
    </section>
  );
};

export default LargeHero;

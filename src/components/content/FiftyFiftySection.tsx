import earringsCollection from "@/assets/earrings-collection.png";
import linkBracelet from "@/assets/link-bracelet.png";
import { Link } from "react-router-dom";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FiftyFiftySection = () => {
  const { ref, isVisible } = useScrollFadeIn(0.15);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const heroItems = [
    {
      id: 1,
      title: "Organic Forms",
      subtitle: "Nature-inspired pieces with fluid, sculptural details",
      description: "Each earring is meticulously crafted to capture the essence of natural geometry. Our artisanal collection celebrates the beauty of imperfection, blending contemporary design with timeless elegance. Explore our curated selection of statement earrings that transform any moment.",
      image: earringsCollection,
      alt: "Earrings collection",
      link: "/category/earrings"
    },
    {
      id: 2,
      title: "Chain Collection",
      subtitle: "Refined links and connections in precious metals",
      description: "Discover the art of precision in our chain collection. Hand-selected links and connections, each piece represents a perfect balance of strength and sophistication. Whether delicate or bold, every bracelet tells a story of craftsmanship and luxury.",
      image: linkBracelet,
      alt: "Chain link bracelet",
      link: "/category/bracelets"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroItems.length]);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + heroItems.length) % heroItems.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % heroItems.length);
  };

  const currentItem = heroItems[activeIndex];

  return (
    <section className="w-full mb-16 lg:mb-24 px-6" ref={ref}>
      <div className={`transition-all duration-[800ms] ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left: Text Info */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-light text-foreground leading-tight">
                {currentItem.title}
              </h2>
              <p className="text-base font-light text-muted-foreground leading-relaxed">
                {currentItem.subtitle}
              </p>
              <p className="text-base font-light text-muted-foreground/90 leading-relaxed max-w-lg">
                {currentItem.description}
              </p>
            </div>
            
            {/* Indicators */}
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                {heroItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`transition-all duration-300 ${
                      index === activeIndex
                        ? "w-8 h-1 bg-foreground"
                        : "w-4 h-1 bg-border"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Link 
              to={currentItem.link}
              className="inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors duration-300 text-sm font-light tracking-widest uppercase"
            >
              Explore Collection
              <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right: Image Slider */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] group">
            {/* Images */}
            {heroItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-all duration-700 ease-out rounded-2xl overflow-hidden shadow-[0_4px_20px_-6px_hsl(25_30%_15%/0.08)] ${
                  index === activeIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            ))}

            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={goToPrevious}
                className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-all duration-300 border border-border/20 hover:shadow-md"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-all duration-300 border border-border/20 hover:shadow-md"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Slide Counter */}
            <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg text-xs font-light text-muted-foreground border border-border/20">
              {activeIndex + 1} / {heroItems.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiftyFiftySection;

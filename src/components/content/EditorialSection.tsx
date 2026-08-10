import founders from "@/assets/founders.png";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const EditorialSection = () => {
  const { ref: textRef, isVisible: textVisible } = useScrollFadeIn(0.15, 0);
  const { ref: imgRef, isVisible: imgVisible } = useScrollFadeIn(0.15, 200);

  const highlights = [
    { title: "Architecture & Design", description: "Inspired by spatial concepts and geometric principles" },
    { title: "Fine Craftsmanship", description: "Each piece created with meticulous attention to detail" },
    { title: "Contemporary Vision", description: "Modern interpretations of timeless elegance" }
  ];

  return (
    <section className="w-full mb-16 lg:mb-24 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left: Text Content */}
        <div
          ref={textRef}
          className={`space-y-6 transition-all duration-[800ms] ease-out ${
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-display font-normal text-foreground leading-tight">
              Jewelry Drawn From Shadows and Lines
            </h2>
            <p className="text-base font-light text-muted-foreground leading-relaxed max-w-xl">
              Linea was born from the meeting of two minds who saw beauty not just in ornament, but in structure. With backgrounds spanning architecture and fine arts, the founders believed that jewelry could be more than decoration — it could be an extension of space, light, and line.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {highlights.map((highlight, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-sm font-medium text-foreground tracking-wide">{highlight.title}</h4>
                <p className="text-xs font-light text-muted-foreground leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>

          <Link
            to="/about/our-story"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors duration-300 group pt-2"
          >
            <span>Read our full story</span>
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Right: Image */}
        <div
          ref={imgRef}
          className={`order-first lg:order-last transition-all duration-[800ms] ease-out ${
            imgVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="w-full aspect-square overflow-hidden rounded-2xl shadow-[0_4px_20px_-6px_hsl(25_30%_15%/0.08)] group hover:shadow-[0_8px_24px_-8px_hsl(25_30%_15%/0.12)] transition-shadow duration-300">
            <img
              src={founders}
              alt="Linea founders - two women in minimalist jewelry"
              className="w-full h-full object-cover image-cinematic transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;

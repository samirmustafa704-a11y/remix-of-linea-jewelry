import circularCollection from "@/assets/circular-collection.png";
import organicEarring from "@/assets/organic-earring.png";
import { Link } from "react-router-dom";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const OneThirdTwoThirdsSection = () => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollFadeIn(0.15, 0);
  const { ref: rightRef, isVisible: rightVisible } = useScrollFadeIn(0.15, 200);

  return (
    <section className="w-full mb-16 lg:mb-24 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-center">
        <div
          ref={leftRef}
          className={`lg:col-span-1 transition-all duration-[800ms] ease-out ${
            leftVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link to="/category/rings" className="block group">
            <div className="w-full aspect-[3/4] mb-4 overflow-hidden rounded-2xl shadow-[0_4px_20px_-6px_hsl(25_30%_15%/0.08)] group-hover:shadow-[0_8px_24px_-8px_hsl(25_30%_15%/0.12)] transition-shadow duration-300">
              <img
                src={organicEarring}
                alt="Artisan crafted jewelry"
                className="w-full h-full object-cover image-cinematic"
              />
            </div>
          </Link>
          <div className="px-1">
            <h3 className="text-sm font-medium tracking-widest uppercase text-foreground mb-1">
              Artisan Craft
            </h3>
            <p className="text-sm font-light text-muted-foreground">
              Handcrafted pieces with meticulous attention to detail
            </p>
          </div>
        </div>

        <div
          ref={rightRef}
          className={`lg:col-span-3 transition-all duration-[800ms] ease-out ${
            rightVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link to="/category/necklaces" className="block group">
            <div className="w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] mb-4 overflow-hidden rounded-2xl shadow-[0_4px_20px_-6px_hsl(25_30%_15%/0.08)] group-hover:shadow-[0_8px_24px_-8px_hsl(25_30%_15%/0.12)] transition-shadow duration-300">
              <img
                src={circularCollection}
                alt="Circular jewelry collection"
                className="w-full h-full object-cover image-cinematic"
              />
            </div>
          </Link>
          <div className="px-1">
            <h3 className="text-sm font-medium tracking-widest uppercase text-foreground mb-1">
              Circular Elements
            </h3>
            <p className="text-sm font-light text-muted-foreground">
              Geometric perfection meets contemporary minimalism
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneThirdTwoThirdsSection;

import circularCollection from "@/assets/circular-collection.png";
import organicEarring from "@/assets/organic-earring.png";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const OneThirdTwoThirdsSection = () => (
  <section className="section-container mb-16">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

      {/* 1/3 card */}
      <div className="lg:col-span-1">
        <Link to="/category/rings" className="group block">
          <div
            className="relative w-full rounded-2xl overflow-hidden mb-4"
            style={{ height: "clamp(400px, 55vw, 720px)", boxShadow: "var(--shadow-card)" }}
          >
            <img
              src={organicEarring}
              alt="Artisan crafted jewelry"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-medium px-3 py-1 rounded-full bg-background/80 text-foreground backdrop-blur-sm">
              Rings
            </span>
          </div>
          <div className="px-1 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">Artisan Craft</h3>
              <p className="text-sm font-light text-muted-foreground">Handcrafted pieces with meticulous attention to detail</p>
            </div>
            <span className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-foreground">
              <ArrowRight size={15} />
            </span>
          </div>
        </Link>
      </div>

      {/* 2/3 card */}
      <div className="lg:col-span-2">
        <Link to="/category/necklaces" className="group block">
          <div
            className="relative w-full rounded-2xl overflow-hidden mb-4"
            style={{ height: "clamp(400px, 55vw, 720px)", boxShadow: "var(--shadow-card)" }}
          >
            <img
              src={circularCollection}
              alt="Circular jewelry collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-medium px-3 py-1 rounded-full bg-background/80 text-foreground backdrop-blur-sm">
              Necklaces
            </span>
          </div>
          <div className="px-1 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">Circular Elements</h3>
              <p className="text-sm font-light text-muted-foreground">Geometric perfection meets contemporary minimalism</p>
            </div>
            <span className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-foreground">
              <ArrowRight size={15} />
            </span>
          </div>
        </Link>
      </div>
    </div>
  </section>
);

export default OneThirdTwoThirdsSection;

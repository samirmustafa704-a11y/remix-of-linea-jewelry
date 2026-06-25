import heroImage from "@/assets/hero-image.png";
import earringsCollection from "@/assets/earrings-collection.png";
import circularCollection from "@/assets/circular-collection.png";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroGrid = () => (
  <section className="section-container pt-10 pb-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5" style={{ height: "clamp(400px, 52vw, 560px)" }}>

      {/* Left — large editorial card */}
      <Link to="/category/shop" className="group relative rounded-2xl overflow-hidden flex items-end"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.13)" }}>
        <img
          src={heroImage}
          alt="Summer Collection"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="relative z-10 p-8 md:p-10 text-white">
          <p className="text-[10px] tracking-[0.22em] uppercase mb-3 opacity-75 font-light">Summer Collection</p>
          <h1 className="font-serif text-4xl leading-tight mb-5">
            Sculpted<br />for the Sun
          </h1>
          <span className="inline-flex items-center gap-2 bg-white text-foreground text-sm font-normal px-6 py-2.5 rounded-full hover:bg-background/90 transition-colors group-hover:gap-3">
            Shop Now <ArrowRight size={14} />
          </span>
        </div>
      </Link>

      {/* Right — two stacked cards */}
      <div className="grid grid-rows-2 gap-5">

        {/* Top card */}
        <Link to="/category/earrings" className="group relative rounded-2xl overflow-hidden flex items-end"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.09)" }}>
          <img
            src={earringsCollection}
            alt="Arcus Collection"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="relative z-10 p-5 md:p-6 text-white">
            <p className="text-[10px] tracking-[0.2em] uppercase mb-1 opacity-75 font-light">New In</p>
            <h2 className="font-serif text-xl">Arcus Collection</h2>
          </div>
        </Link>

        {/* Bottom card */}
        <Link to="/category/bracelets" className="group relative rounded-2xl overflow-hidden flex items-end"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.09)" }}>
          <img
            src={circularCollection}
            alt="Chain Edit"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="relative z-10 p-5 md:p-6 text-white">
            <p className="text-[10px] tracking-[0.2em] uppercase mb-1 opacity-75 font-light">Bestsellers</p>
            <h2 className="font-serif text-xl">Chain Edit</h2>
          </div>
        </Link>
      </div>
    </div>
  </section>
);

export default HeroGrid;

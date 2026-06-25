import heroImage from "@/assets/hero-image.png";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LargeHero = () => (
  <section className="section-container mb-16">
    <Link to="/category/shop" className="group block">
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ aspectRatio: "21/9", boxShadow: "var(--shadow-md)" }}
      >
        <img
          src={heroImage}
          alt="Modern jewelry collection"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/70 mb-2 font-light">Collection</p>
              <h2 className="font-serif text-white text-3xl md:text-4xl leading-tight">Modern Heritage</h2>
              <p className="text-sm font-light text-white/75 mt-2 max-w-xs">
                Contemporary jewelry crafted with timeless elegance
              </p>
            </div>
            <div className="hidden md:flex shrink-0 items-center gap-2 text-white text-sm font-light border border-white/30 rounded-full px-5 py-2.5 group-hover:bg-white/10 transition-colors backdrop-blur-sm">
              Shop Now <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  </section>
);

export default LargeHero;

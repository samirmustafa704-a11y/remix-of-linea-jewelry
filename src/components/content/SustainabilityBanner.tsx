import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SustainabilityBanner = () => (
  <section className="section-container pb-16">
    <div
      className="rounded-2xl p-10 md:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden"
      style={{
        background: "hsl(var(--foreground))",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      {/* Subtle glow orb */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <p className="text-[10px] tracking-[0.22em] uppercase mb-3 font-light"
          style={{ color: "hsl(var(--primary))" }}>
          Sustainability
        </p>
        <h2 className="font-serif text-3xl mb-3" style={{ color: "hsl(var(--background))" }}>
          Crafted with Conscience
        </h2>
        <p className="text-sm font-light leading-relaxed max-w-md"
          style={{ color: "hsl(var(--background) / 0.55)" }}>
          Responsibly sourced gold, recycled silver, and natural gemstones. Every piece tells a story worth telling.
        </p>
      </div>

      <Link
        to="/about/sustainability"
        className="relative z-10 shrink-0 inline-flex items-center gap-2 text-sm font-light px-8 py-3.5 rounded-full transition-colors group"
        style={{
          border: "1px solid hsl(var(--background) / 0.25)",
          color: "hsl(var(--background))",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "hsl(var(--background) / 0.1)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
      >
        Our Story <ArrowRight size={14} />
      </Link>
    </div>
  </section>
);

export default SustainabilityBanner;

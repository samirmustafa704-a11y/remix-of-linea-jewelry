import founders from "@/assets/founders.png";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EditorialSection = () => (
  <section className="section-container mb-16">
    <div className="rounded-2xl overflow-hidden bg-card border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* Image */}
        <div className="relative order-last md:order-first overflow-hidden" style={{ minHeight: 420 }}>
          <img
            src={founders}
            alt="Missoma founders"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent md:bg-gradient-to-l" />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4 font-medium">Our Story</p>
          <h2 className="font-serif text-2xl md:text-3xl text-foreground leading-snug mb-5">
            Jewelry Drawn From<br />Shadows and Lines
          </h2>
          <p className="text-sm font-light text-muted-foreground leading-relaxed mb-8 max-w-sm">
            Missoma was born from the meeting of two minds who saw beauty not just in ornament, but in structure. With backgrounds spanning architecture and fine arts, the founders believed that jewelry could be an extension of space, light, and line.
          </p>
          <Link
            to="/about/our-story"
            className="inline-flex items-center gap-2 text-sm font-normal text-foreground hover:gap-3 transition-all duration-200 group"
          >
            Read our full story
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default EditorialSection;

import earringsCollection from "@/assets/earrings-collection.png";
import linkBracelet from "@/assets/link-bracelet.png";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    href: "/category/earrings",
    image: earringsCollection,
    alt: "Earrings collection",
    tag: "Earrings",
    title: "Organic Forms",
    desc: "Nature-inspired pieces with fluid, sculptural details",
  },
  {
    href: "/category/bracelets",
    image: linkBracelet,
    alt: "Chain link bracelet",
    tag: "Bracelets",
    title: "Chain Collection",
    desc: "Refined links and connections in precious metals",
  },
];

const FiftyFiftySection = () => (
  <section className="section-container mb-16">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {cards.map(({ href, image, alt, tag, title, desc }) => (
        <Link key={href} to={href} className="group block">
          <div
            className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <img
              src={image}
              alt={alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-medium px-3 py-1 rounded-full bg-background/80 text-foreground backdrop-blur-sm">
              {tag}
            </span>
          </div>
          <div className="px-1 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">{title}</h3>
              <p className="text-sm font-light text-muted-foreground">{desc}</p>
            </div>
            <span className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-foreground">
              <ArrowRight size={15} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default FiftyFiftySection;

import { Link } from "react-router-dom";

const categories = [
  { label: "Rings", href: "/category/rings" },
  { label: "Necklaces", href: "/category/necklaces" },
  { label: "Earrings", href: "/category/earrings" },
  { label: "Bracelets", href: "/category/bracelets" },
  { label: "New In", href: "/category/new-in" },
];

const CategoryPills = () => (
  <section className="section-container pb-10">
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-light mr-1">Browse</span>
      {categories.map(({ label, href }) => (
        <Link
          key={label}
          to={href}
          className="px-5 py-2 rounded-full text-sm font-light border border-border text-muted-foreground hover:border-foreground hover:text-foreground hover:bg-foreground/[0.04] transition-all duration-200"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
        >
          {label}
        </Link>
      ))}
    </div>
  </section>
);

export default CategoryPills;

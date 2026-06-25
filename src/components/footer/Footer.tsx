import { Instagram, Globe, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "New In", href: "/category/new-in" },
      { label: "Rings", href: "/category/rings" },
      { label: "Earrings", href: "/category/earrings" },
      { label: "Bracelets", href: "/category/bracelets" },
      { label: "Necklaces", href: "/category/necklaces" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Size Guide", href: "/about/size-guide" },
      { label: "Care Instructions", href: "/about/customer-care" },
      { label: "Returns", href: "/about/customer-care" },
      { label: "Shipping", href: "/about/customer-care" },
      { label: "Contact", href: "/about/customer-care" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about/our-story" },
      { label: "Sustainability", href: "/about/sustainability" },
      { label: "Store Locator", href: "/about/store-locator" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-card border-t border-border mt-24">
      <div className="section-container pt-16 pb-8">

        {/* Newsletter strip */}
        <div className="rounded-2xl bg-foreground p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16"
          style={{ boxShadow: "var(--shadow-md)" }}>
          <div>
            <h3 className="font-serif text-xl text-background mb-1.5">Stay in the loop</h3>
            <p className="text-sm font-light text-background/60">New arrivals, exclusive offers, and our latest stories.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-64 bg-background/10 border border-background/20 rounded-full px-5 py-2.5 text-sm font-light text-background placeholder:text-background/40 outline-none focus:border-background/50 transition-colors"
            />
            <button className="shrink-0 bg-background text-foreground rounded-full p-2.5 hover:bg-background/90 transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <img src="/Missoma_Jewelry_Inc-2.svg" alt="Missoma Jewelry Inc." className="h-5 w-auto mb-5 dark:invert" />
            <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-xs mb-7">
              Minimalist jewelry crafted for the modern individual. Responsible sourcing, timeless design.
            </p>
            <div className="flex gap-2.5">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Globe, label: "Pinterest" },
                { Icon: Mail, label: "Email" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors duration-200"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] uppercase tracking-widest font-medium text-foreground mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link to={href} className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 py-8 border-y border-border">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 font-medium">Visit Us</p>
            <p className="text-sm font-light text-foreground">123 Madison Avenue, New York, NY 10016</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 font-medium">Contact</p>
            <p className="text-sm font-light text-foreground">+1 (212) 555-0123 · hello@missoma.com</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs font-light text-muted-foreground">
            © 2024–{currentYear} Missoma. All rights reserved.{" "}
            <a href="https://m-said-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline underline-offset-2">
              Template by M.Said
            </a>
          </p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

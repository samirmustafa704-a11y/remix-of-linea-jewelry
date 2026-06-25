import { ArrowRight, X, Sun, Moon, Search, Heart, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingBagPanel from "./ShoppingBag";
import { useCart } from "@/contexts/CartContext";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = [
  {
    name: "Shop", href: "/category/shop",
    submenuItems: ["Rings", "Necklaces", "Earrings", "Bracelets", "Watches"],
    images: [
      { src: "/rings-collection.png", alt: "Rings Collection", label: "Rings", link: "/category/rings" },
      { src: "/earrings-collection.png", alt: "Earrings Collection", label: "Earrings", link: "/category/earrings" },
    ],
  },
  {
    name: "New in", href: "/category/new-in",
    submenuItems: ["This Week's Arrivals", "Spring Collection", "Featured Designers", "Limited Edition", "Pre-Orders"],
    images: [
      { src: "/arcus-bracelet.png", alt: "Arcus Bracelet", label: "Arcus Bracelet", link: "/product/arcus-bracelet" },
      { src: "/span-bracelet.png", alt: "Span Bracelet", label: "Span Bracelet", link: "/product/span-bracelet" },
    ],
  },
  {
    name: "About", href: "/about/our-story",
    submenuItems: ["Our Story", "Sustainability", "Size Guide", "Customer Care", "Store Locator"],
    images: [
      { src: "/founders.png", alt: "Company Founders", label: "Read our story", link: "/about/our-story" },
    ],
  },
];

const popularSearches = ["Gold Rings", "Silver Necklaces", "Pearl Earrings", "Designer Bracelets", "Wedding Rings", "Vintage Collection"];

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [offCanvasType, setOffCanvasType] = useState<"favorites" | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, updateQuantity, totalItems, isShoppingBagOpen, setIsShoppingBagOpen } = useCart();
  const { theme, toggleTheme } = useTheme();

  const iconBtn = "p-2.5 rounded-full transition-colors duration-200 text-nav-foreground hover:text-nav-hover hover:bg-foreground/[0.06]";

  return (
    <nav className="relative glass-header border-b border-border">
      {/* Main bar */}
      <div className="section-container flex items-center h-[66px] justify-between gap-4">

        {/* Mobile hamburger */}
        <button className={`lg:hidden ${iconBtn}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
          <div className="w-5 h-5 relative">
            <span className={`absolute block w-5 h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 top-2.5" : "top-1.5"}`} />
            <span className={`absolute block w-5 h-px bg-current transition-all duration-300 top-2.5 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute block w-5 h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 top-2.5" : "top-3.5"}`} />
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <div key={item.name} className="relative" onMouseEnter={() => setActiveDropdown(item.name)} onMouseLeave={() => setActiveDropdown(null)}>
              <Link to={item.href} className="flex items-center gap-0.5 text-sm font-light text-nav-foreground hover:text-nav-hover transition-colors duration-200 py-5 tracking-wide">
                {item.name}
                <ChevronDown size={12} className={`mt-0.5 opacity-50 transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180 opacity-80" : ""}`} />
              </Link>
            </div>
          ))}
        </div>

        {/* Logo — absolutely centered */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          <Link to="/" className="block">
            <img src="/MISSOMA-1.svg" alt="Missoma" className="h-5 w-auto dark:invert" />
          </Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-0.5">
          <button className={iconBtn} aria-label="Search" onClick={() => { setIsSearchOpen(!isSearchOpen); setActiveDropdown(null); }}>
            <Search size={18} />
          </button>
          <button className={`hidden lg:flex ${iconBtn}`} aria-label="Favorites" onClick={() => setOffCanvasType("favorites")}>
            <Heart size={18} />
          </button>
          <button
            className={iconBtn}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className={`relative ${iconBtn}`} aria-label="Shopping bag" onClick={() => setIsShoppingBagOpen(true)}>
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-semibold rounded-full flex items-center justify-center leading-none">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mega dropdown */}
      {activeDropdown && (
        <div
          className="absolute top-full left-0 right-0 bg-nav border-b border-border z-50 animate-fade-in"
          style={{ boxShadow: "var(--shadow-overlay)" }}
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="section-container py-8">
            <div className="flex gap-12">
              <div className="flex-1 min-w-[180px]">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4 font-medium">{activeDropdown}</p>
                <ul className="space-y-1">
                  {navItems.find((i) => i.name === activeDropdown)?.submenuItems.map((sub, idx) => (
                    <li key={idx}>
                      <Link
                        to={activeDropdown === "About" ? `/about/${sub.toLowerCase().replace(/\s+/g, "-")}` : `/category/${sub.toLowerCase()}`}
                        className="text-sm font-light text-nav-foreground hover:text-nav-hover transition-colors duration-200 block py-1.5 group flex items-center gap-1"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform duration-150 inline-block">{sub}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-5">
                {navItems.find((i) => i.name === activeDropdown)?.images.map((img, idx) => (
                  <Link key={idx} to={img.link} className="group relative overflow-hidden rounded-xl block" style={{ width: 320, height: 220 }} onClick={() => setActiveDropdown(null)}>
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white text-xs font-light flex items-center gap-1">
                      <span>{img.label}</span>
                      <ArrowRight size={11} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search panel */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-nav border-b border-border z-50 animate-fade-in" style={{ boxShadow: "var(--shadow-overlay)" }}>
          <div className="section-container py-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 border-b border-border pb-3 mb-7">
                <Search size={18} className="text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search for jewelry, collections…"
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base font-light"
                  autoFocus
                />
                <button onClick={() => setIsSearchOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 font-medium">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((s, i) => (
                    <button key={i} className="text-sm font-light px-4 py-1.5 rounded-full border border-border text-foreground hover:border-foreground transition-colors duration-200">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-nav border-b border-border z-50 animate-fade-in" style={{ boxShadow: "var(--shadow-overlay)" }}>
          <div className="section-container py-7">
            <div className="space-y-5">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link to={item.href} className="text-base font-light text-nav-foreground hover:text-nav-hover transition-colors block py-1" onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </Link>
                  <div className="mt-2 pl-4 space-y-1.5">
                    {item.submenuItems.map((sub, i) => (
                      <Link key={i} to={item.name === "About" ? `/about/${sub.toLowerCase().replace(/\s+/g, "-")}` : `/category/${sub.toLowerCase()}`} className="text-sm font-light text-muted-foreground hover:text-nav-hover block py-1 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ShoppingBagPanel
        isOpen={isShoppingBagOpen}
        onClose={() => setIsShoppingBagOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        onViewFavorites={() => { setIsShoppingBagOpen(false); setOffCanvasType("favorites"); }}
      />

      {offCanvasType === "favorites" && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOffCanvasType(null)} />
          <div className="absolute right-0 top-0 h-full w-96 bg-background border-l border-border animate-slide-in-right flex flex-col" style={{ boxShadow: "var(--shadow-overlay)" }}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="text-sm font-medium text-foreground tracking-wide">Your Favourites</h2>
              <button onClick={() => setOffCanvasType(null)} className="p-2 rounded-full hover:bg-foreground/[0.06] text-foreground transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 flex-1">
              <p className="text-sm font-light text-muted-foreground leading-relaxed">You haven't added any favourites yet. Browse our collection and click the heart icon to save pieces you love.</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

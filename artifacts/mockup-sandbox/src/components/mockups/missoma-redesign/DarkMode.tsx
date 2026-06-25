import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sun,
  ArrowRight,
  Star,
  ChevronDown,
  Instagram,
  Globe,
  Mail,
} from "lucide-react";

export function DarkMode() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bagCount] = useState(2);

  const products = [
    { name: "Arcus Hoop Earrings", price: "£95", tag: "Bestseller", rating: 4.8, reviews: 214 },
    { name: "Sphere Chain Necklace", price: "£120", tag: "New In", rating: 4.9, reviews: 87 },
    { name: "Vintage Signet Ring", price: "£145", tag: "Low Stock", rating: 4.7, reviews: 156 },
    { name: "Orbit Bracelet", price: "£85", tag: "New In", rating: 5.0, reviews: 43 },
  ];

  const categories = ["Rings", "Necklaces", "Earrings", "Bracelets", "New In"];

  return (
    <div className="min-h-screen font-['Outfit',sans-serif]"
      style={{ background: "#0f0f0f", color: "#e8e2d8" }}>

      {/* Announcement Bar */}
      <div className="text-center py-2.5 text-xs tracking-widest uppercase font-light"
        style={{ background: "#1f8c67", color: "#d4f5e9" }}>
        Free UK delivery on orders over £75 · Use code SUMMER10 for 10% off
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(18,18,18,0.92)",
          backdropFilter: "blur(16px)",
          borderColor: "#2a2a2a",
          boxShadow: "0 1px 30px rgba(0,0,0,0.4)"
        }}>
        <div className="max-w-[1400px] mx-auto px-8 h-[68px] flex items-center justify-between gap-8">
          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {["Shop", "New In", "About"].map((item) => (
              <button key={item}
                className="text-sm font-light tracking-wide flex items-center gap-1 group transition-colors"
                style={{ color: "#a09890" }}>
                <span className="group-hover:text-white transition-colors">{item}</span>
                <ChevronDown size={12} className="opacity-40 group-hover:opacity-70 transition-opacity" />
              </button>
            ))}
          </nav>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <span style={{ fontFamily: "'Lora', serif", letterSpacing: "0.18em", fontSize: "1.2rem", color: "#e8e2d8", fontWeight: 400 }}>
              MISSOMA
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto">
            {[Search, Heart, Sun, ShoppingBag].map((Icon, i) => (
              <button key={i}
                className="relative p-2.5 rounded-full transition-colors"
                style={{ color: "#a09890" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#1e1e1e"; (e.currentTarget as HTMLButtonElement).style.color = "#e8e2d8"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#a09890"; }}>
                <Icon size={18} />
                {Icon === ShoppingBag && bagCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 text-[9px] font-semibold rounded-full flex items-center justify-center"
                    style={{ background: "#1f8c67", color: "#fff" }}>
                    {bagCount}
                  </span>
                )}
              </button>
            ))}
            <button className="lg:hidden p-2.5 rounded-full" onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "#a09890" }}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-8 pt-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[520px]">
          {/* Left */}
          <div className="relative rounded-2xl overflow-hidden flex items-end"
            style={{
              background: "linear-gradient(135deg, #1a2e26 0%, #0d1f1a 100%)",
              boxShadow: "0 8px 50px rgba(0,0,0,0.5)"
            }}>
            {/* Subtle glowing orb */}
            <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(31,140,103,0.25) 0%, transparent 70%)" }} />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
            <div className="relative z-10 p-10">
              <p className="text-xs tracking-[0.2em] uppercase mb-3 font-light" style={{ color: "#1f8c67" }}>Summer Collection</p>
              <h1 style={{ fontFamily: "'Lora', serif", fontSize: "2.4rem", lineHeight: 1.2, color: "#e8e2d8", marginBottom: "1.2rem" }}>
                Sculpted<br />for the Sun
              </h1>
              <button className="inline-flex items-center gap-2 text-sm font-light px-6 py-3 rounded-full transition-colors"
                style={{ background: "#1f8c67", color: "#fff" }}>
                Shop Now <ArrowRight size={14} />
              </button>
            </div>
          </div>
          {/* Right */}
          <div className="grid grid-rows-2 gap-5">
            <div className="relative rounded-2xl overflow-hidden flex items-end"
              style={{ background: "linear-gradient(135deg, #2a1f14 0%, #1a1208 100%)", boxShadow: "0 4px 30px rgba(0,0,0,0.4)" }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(212,169,106,0.2) 0%, transparent 70%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
              <div className="relative z-10 p-6">
                <p className="text-xs tracking-[0.18em] uppercase mb-1 font-light" style={{ color: "#d4a96a" }}>New In</p>
                <h2 style={{ fontFamily: "'Lora', serif", fontSize: "1.25rem", color: "#e8e2d8" }}>Arcus Collection</h2>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden flex items-end"
              style={{ background: "linear-gradient(135deg, #131f1c 0%, #0a1512 100%)", boxShadow: "0 4px 30px rgba(0,0,0,0.4)" }}>
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
              <div className="relative z-10 p-6">
                <p className="text-xs tracking-[0.18em] uppercase mb-1 font-light" style={{ color: "#60a890" }}>Bestsellers</p>
                <h2 style={{ fontFamily: "'Lora', serif", fontSize: "1.25rem", color: "#e8e2d8" }}>Chain Edit</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-[1400px] mx-auto px-8 pb-10">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs uppercase tracking-widest font-light mr-2" style={{ color: "#555" }}>Browse</span>
          {categories.map((cat) => (
            <button key={cat}
              className="px-5 py-2 rounded-full text-sm font-light transition-all"
              style={{
                border: "1px solid #2a2a2a",
                color: "#a09890",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "#e8e2d8";
                el.style.color = "#e8e2d8";
                el.style.background = "#1e1e1e";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "#2a2a2a";
                el.style.color = "#a09890";
                el.style.background = "transparent";
              }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-[1400px] mx-auto px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 style={{ fontFamily: "'Lora', serif", fontSize: "1.5rem", color: "#e8e2d8" }}>New Arrivals</h2>
          <button className="text-sm font-light flex items-center gap-1.5 transition-all" style={{ color: "#1f8c67" }}>
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="rounded-xl aspect-square mb-4 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${["#1e1a14", "#131e1a", "#1a1218", "#1a1e14"][i]} 0%, ${["#0f0d0a", "#0a1210", "#100c10", "#0f120a"][i]} 100%)`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
                }}>
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.08)", color: "#e8e2d8", backdropFilter: "blur(8px)" }}>
                  {p.tag}
                </span>
                <button className="absolute top-2.5 right-2.5 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(255,255,255,0.1)" }}>
                  <Heart size={14} style={{ color: "#e8e2d8" }} />
                </button>
                {/* Jewelry illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full" style={{ border: "3px solid rgba(212,169,106,0.2)" }} />
                  <div className="absolute w-10 h-10 rounded-full" style={{ border: "2px solid rgba(212,169,106,0.15)" }} />
                  <div className="absolute w-3 h-3 rounded-full" style={{ background: "rgba(212,169,106,0.3)" }} />
                </div>
              </div>
              <div className="px-1">
                <h3 className="text-sm font-normal mb-1" style={{ color: "#e8e2d8" }}>{p.name}</h3>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={10} className={j < Math.floor(p.rating) ? "" : ""}
                        style={{ fill: j < Math.floor(p.rating) ? "#d4a96a" : "transparent", color: j < Math.floor(p.rating) ? "#d4a96a" : "#3a3a3a" }} />
                    ))}
                  </div>
                  <span className="text-[10px]" style={{ color: "#555" }}>({p.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-light" style={{ color: "#e8e2d8" }}>{p.price}</span>
                  <button className="text-[10px] uppercase tracking-wider font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "#1f8c67" }}>
                    Add to bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="max-w-[1400px] mx-auto px-8 pb-16">
        <div className="rounded-2xl p-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0d1f1a 0%, #071410 100%)",
            border: "1px solid #1a2e26",
            boxShadow: "0 8px 50px rgba(0,0,0,0.5)"
          }}>
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(31,140,103,0.12) 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <p className="text-xs tracking-[0.2em] uppercase mb-3 font-light" style={{ color: "#1f8c67" }}>Sustainability</p>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: "1.85rem", color: "#e8e2d8", marginBottom: "0.75rem" }}>Crafted with Conscience</h2>
            <p className="text-sm font-light leading-relaxed max-w-md" style={{ color: "#787060" }}>
              Responsibly sourced gold, recycled silver, and natural gemstones. Every piece tells a story worth telling.
            </p>
          </div>
          <button className="relative z-10 shrink-0 inline-flex items-center gap-2 text-sm font-light px-8 py-3.5 rounded-full transition-colors"
            style={{ border: "1px solid #1f8c67", color: "#1f8c67" }}>
            Our Story <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0a0a0a", borderTop: "1px solid #1e1e1e" }}>
        <div className="max-w-[1400px] mx-auto px-8 pt-14 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <span style={{ fontFamily: "'Lora', serif", fontSize: "1.1rem", letterSpacing: "0.15em", color: "#e8e2d8" }}>MISSOMA</span>
              <p className="text-sm font-light leading-relaxed mt-4 max-w-xs" style={{ color: "#555" }}>
                Minimalist jewelry crafted for the modern individual.
              </p>
              <div className="flex gap-3 mt-6">
                {[Instagram, Globe, Mail].map((Icon, i) => (
                  <button key={i} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{ border: "1px solid #2a2a2a", color: "#555" }}>
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>
            {[
              { title: "Shop", links: ["New In", "Rings", "Earrings", "Bracelets", "Necklaces"] },
              { title: "Support", links: ["Size Guide", "Care Instructions", "Returns", "Shipping", "Contact"] },
              { title: "Connect", links: ["Our Story", "Sustainability", "Press", "Careers", "Newsletter"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs uppercase tracking-widest font-medium mb-5" style={{ color: "#e8e2d8" }}>{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="text-sm font-light transition-colors" style={{ color: "#555" }}>{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3" style={{ borderTop: "1px solid #1e1e1e" }}>
            <p className="text-xs font-light" style={{ color: "#3a3a3a" }}>© 2026 Missoma. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs font-light transition-colors" style={{ color: "#3a3a3a" }}>Privacy Policy</a>
              <a href="#" className="text-xs font-light transition-colors" style={{ color: "#3a3a3a" }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

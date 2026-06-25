import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Moon,
  ArrowRight,
  Star,
  ChevronDown,
  Instagram,
  Globe,
  Mail,
} from "lucide-react";

export function LightMode() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bagCount] = useState(2);

  const products = [
    { name: "Arcus Hoop Earrings", price: "£95", tag: "Bestseller", rating: 4.8, reviews: 214, color: "bg-amber-100" },
    { name: "Sphere Chain Necklace", price: "£120", tag: "New In", rating: 4.9, reviews: 87, color: "bg-stone-100" },
    { name: "Vintage Signet Ring", price: "£145", tag: "Low Stock", rating: 4.7, reviews: 156, color: "bg-rose-50" },
    { name: "Orbit Bracelet", price: "£85", tag: "New In", rating: 5.0, reviews: 43, color: "bg-amber-50" },
  ];

  const categories = ["Rings", "Necklaces", "Earrings", "Bracelets", "New In"];

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-['Outfit',sans-serif] text-[#1a1a1a]">

      {/* Announcement Bar */}
      <div className="bg-[#1a1a1a] text-white text-center py-2.5 text-xs tracking-widest uppercase font-light">
        Free UK delivery on orders over £75 · Use code SUMMER10 for 10% off
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#e8e2db]"
        style={{ boxShadow: "0 1px 20px rgba(0,0,0,0.06)" }}>
        <div className="max-w-[1400px] mx-auto px-8 h-[68px] flex items-center justify-between gap-8">
          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {["Shop", "New In", "About"].map((item) => (
              <button key={item} className="text-sm font-light text-[#444] hover:text-[#1a1a1a] transition-colors tracking-wide flex items-center gap-1 group">
                {item}
                <ChevronDown size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </nav>

          {/* Logo — centered */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <span className="text-xl font-['Lora',serif] tracking-[0.18em] text-[#1a1a1a] font-normal select-none">
              MISSOMA
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto">
            <button className="p-2.5 rounded-full hover:bg-[#f0ede8] transition-colors text-[#444] hover:text-[#1a1a1a]">
              <Search size={18} />
            </button>
            <button className="hidden lg:flex p-2.5 rounded-full hover:bg-[#f0ede8] transition-colors text-[#444] hover:text-[#1a1a1a]">
              <Heart size={18} />
            </button>
            {/* Dark mode toggle placeholder */}
            <button className="p-2.5 rounded-full hover:bg-[#f0ede8] transition-colors text-[#444] hover:text-[#1a1a1a]">
              <Moon size={18} />
            </button>
            <button className="relative p-2.5 rounded-full hover:bg-[#f0ede8] transition-colors text-[#444] hover:text-[#1a1a1a]">
              <ShoppingBag size={18} />
              {bagCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#2d6a4f] text-white text-[9px] font-semibold rounded-full flex items-center justify-center">
                  {bagCount}
                </span>
              )}
            </button>
            <button className="lg:hidden p-2.5 rounded-full hover:bg-[#f0ede8] transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero — full bleed split */}
      <section className="max-w-[1400px] mx-auto px-8 pt-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[520px]">
          {/* Left — editorial */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#d4b896] to-[#c4956a] flex items-end"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="relative z-10 p-10 text-white">
              <p className="text-xs tracking-[0.2em] uppercase mb-3 opacity-80 font-light">Summer Collection</p>
              <h1 className="font-['Lora',serif] text-4xl leading-tight mb-4">Sculpted<br />for the Sun</h1>
              <button className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] text-sm font-normal px-6 py-3 rounded-full hover:bg-[#f7f5f2] transition-colors">
                Shop Now <ArrowRight size={14} />
              </button>
            </div>
          </div>
          {/* Right — two stacked */}
          <div className="grid grid-rows-2 gap-5">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#f0e6d3] to-[#e8d5b7] flex items-end"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              <div className="relative z-10 p-6 text-white">
                <p className="text-xs tracking-[0.18em] uppercase mb-1 opacity-80 font-light">New In</p>
                <h2 className="font-['Lora',serif] text-xl">Arcus Collection</h2>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#c9d8c5] to-[#9db8a0] flex items-end"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              <div className="relative z-10 p-6 text-white">
                <p className="text-xs tracking-[0.18em] uppercase mb-1 opacity-80 font-light">Bestsellers</p>
                <h2 className="font-['Lora',serif] text-xl">Chain Edit</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-[1400px] mx-auto px-8 pb-10">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs uppercase tracking-widest text-[#888] font-light mr-2">Browse</span>
          {categories.map((cat) => (
            <button key={cat}
              className="px-5 py-2 rounded-full text-sm font-light border border-[#d8d0c8] text-[#444] hover:border-[#1a1a1a] hover:text-[#1a1a1a] hover:bg-white transition-all"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-[1400px] mx-auto px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-['Lora',serif] text-2xl text-[#1a1a1a]">New Arrivals</h2>
          <button className="text-sm text-[#2d6a4f] font-light flex items-center gap-1.5 hover:gap-2.5 transition-all">
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              {/* Product image */}
              <div className={`${p.color} rounded-xl aspect-square mb-4 relative overflow-hidden`}
                style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full bg-white/90 text-[#1a1a1a]">
                  {p.tag}
                </span>
                <button className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart size={14} className="text-[#444]" />
                </button>
                {/* Subtle jewelry illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-[#d4a96a]/40" />
                  <div className="absolute w-10 h-10 rounded-full border-2 border-[#d4a96a]/30" />
                </div>
              </div>
              {/* Product info */}
              <div className="px-1">
                <h3 className="text-sm font-normal text-[#1a1a1a] mb-1">{p.name}</h3>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={10} className={j < Math.floor(p.rating) ? "fill-[#d4a96a] text-[#d4a96a]" : "text-[#d8d0c8]"} />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#999]">({p.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-light text-[#1a1a1a]">{p.price}</span>
                  <button className="text-[10px] uppercase tracking-wider text-[#2d6a4f] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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
        <div className="rounded-2xl bg-[#1a1a1a] p-12 flex flex-col lg:flex-row items-center justify-between gap-8"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#888] mb-3 font-light">Sustainability</p>
            <h2 className="font-['Lora',serif] text-3xl text-white mb-3">Crafted with Conscience</h2>
            <p className="text-sm text-[#999] font-light max-w-md leading-relaxed">Responsibly sourced gold, recycled silver, and natural gemstones. Every piece tells a story worth telling.</p>
          </div>
          <button className="shrink-0 inline-flex items-center gap-2 border border-white/30 text-white text-sm font-light px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors">
            Our Story <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#e8e2db] mt-4">
        <div className="max-w-[1400px] mx-auto px-8 pt-14 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-1">
              <span className="font-['Lora',serif] text-lg tracking-[0.15em] text-[#1a1a1a]">MISSOMA</span>
              <p className="text-sm font-light text-[#888] leading-relaxed mt-4 max-w-xs">
                Minimalist jewelry crafted for the modern individual.
              </p>
              <div className="flex gap-3 mt-6">
                {[Instagram, Globe, Mail].map((Icon, i) => (
                  <button key={i} className="w-9 h-9 rounded-full border border-[#e0d9d0] flex items-center justify-center text-[#888] hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-colors">
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
                <h4 className="text-xs uppercase tracking-widest font-medium text-[#1a1a1a] mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="text-sm font-light text-[#888] hover:text-[#1a1a1a] transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-[#e8e2db] pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-[#aaa] font-light">© 2026 Missoma. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-[#aaa] hover:text-[#1a1a1a] font-light transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-[#aaa] hover:text-[#1a1a1a] font-light transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

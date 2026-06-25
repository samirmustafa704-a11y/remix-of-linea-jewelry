import { Link } from "react-router-dom";
import { ShoppingBag, Heart, ArrowRight, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import pantheonImage from "@/assets/pantheon.jpg";
import eclipseImage from "@/assets/eclipse.jpg";
import haloImage from "@/assets/halo.jpg";
import obliqueImage from "@/assets/oblique.jpg";
import organicEarring from "@/assets/organic-earring.png";
import linkBracelet from "@/assets/link-bracelet.png";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  hoverImage: string;
  badge?: string;
  rating: number;
  reviews: number;
}

const products: Product[] = [
  { id: 1, name: "Arcus Hoop Earrings", category: "Earrings", price: "£95", image: pantheonImage, hoverImage: organicEarring, badge: "Bestseller", rating: 4.8, reviews: 214 },
  { id: 2, name: "Sphere Chain Necklace", category: "Bracelets", price: "£120", image: eclipseImage, hoverImage: linkBracelet, badge: "New In", rating: 4.9, reviews: 87 },
  { id: 3, name: "Vintage Signet Ring", category: "Earrings", price: "£145", image: haloImage, hoverImage: organicEarring, badge: "Low Stock", rating: 4.7, reviews: 156 },
  { id: 4, name: "Orbit Bracelet", category: "Bracelets", price: "£85", image: obliqueImage, hoverImage: linkBracelet, badge: "New In", rating: 5.0, reviews: 43 },
];

const StarRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
  <div className="flex items-center gap-1.5 mb-1.5">
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={10}
          className={i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-border fill-transparent"}
        />
      ))}
    </div>
    <span className="text-[10px] text-muted-foreground">({reviews})</span>
  </div>
);

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const { addToCart } = useCart();
  const { ref, isVisible } = useScrollFadeIn(0.1, index * 70);

  return (
    <div
      ref={ref}
      className={`group cursor-pointer transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image */}
        <div
          className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-card"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:opacity-0"
          />
          <img
            src={product.hoverImage}
            alt={`${product.name} detail`}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-0 group-hover:opacity-100"
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 text-[9px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full bg-background/90 text-foreground backdrop-blur-sm">
              {product.badge}
            </span>
          )}

          {/* Hover fav */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity text-foreground hover:bg-background"
            aria-label="Add to favourites"
          >
            <Heart size={14} />
          </button>

          {/* Add to bag strip */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category });
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-background/90 backdrop-blur-sm text-foreground text-[11px] font-medium hover:bg-background transition-colors"
            >
              <ShoppingBag size={12} /> Add to bag
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="px-0.5">
          <h3 className="text-sm font-normal text-foreground mb-1">{product.name}</h3>
          <StarRating rating={product.rating} reviews={product.reviews} />
          <div className="flex items-center justify-between">
            <span className="text-sm font-light text-foreground">{product.price}</span>
            <span className="text-[10px] uppercase tracking-wider text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Add to bag
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ProductGrid = () => (
  <section className="section-container pb-16">
    <div className="flex items-center justify-between mb-8">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-light">Collection</p>
        <h2 className="font-serif text-2xl text-foreground">New Arrivals</h2>
      </div>
      <Link
        to="/category/shop"
        className="hidden md:flex items-center gap-1.5 text-sm font-light text-primary hover:gap-3 transition-all duration-200 group"
      >
        View all <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  </section>
);

export default ProductGrid;

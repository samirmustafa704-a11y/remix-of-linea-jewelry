import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import pantheonImage from "@/assets/pantheon.jpg";
import eclipseImage from "@/assets/eclipse.jpg";
import haloImage from "@/assets/halo.jpg";
import obliqueImage from "@/assets/oblique.jpg";
import lintelImage from "@/assets/lintel.jpg";
import shadowlineImage from "@/assets/shadowline.jpg";
import organicEarring from "@/assets/organic-earring.png";
import linkBracelet from "@/assets/link-bracelet.png";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  badge?: string;
}

const products: Product[] = [
  { id: 1, name: "Pantheon", category: "Earrings", price: "€2,850", image: pantheonImage, badge: "New" },
  { id: 2, name: "Eclipse", category: "Bracelets", price: "€3,200", image: eclipseImage },
  { id: 3, name: "Halo", category: "Earrings", price: "€1,950", image: haloImage, badge: "New" },
  { id: 4, name: "Oblique", category: "Earrings", price: "€1,650", image: obliqueImage },
  { id: 5, name: "Lintel", category: "Earrings", price: "€2,250", image: lintelImage },
  { id: 6, name: "Shadowline", category: "Bracelets", price: "€3,950", image: shadowlineImage },
];

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const { addToCart } = useCart();
  const { ref, isVisible } = useScrollFadeIn(0.1, index * 80);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category });
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      <Link to={`/product/${product.id}`} className="group block">
        {/* Image container */}
        <div
          className="relative aspect-square rounded-xl overflow-hidden mb-3.5 bg-card"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-0"
          />
          <img
            src={product.category === "Earrings" ? organicEarring : linkBracelet}
            alt={`${product.name} lifestyle`}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-0 group-hover:opacity-100"
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full bg-foreground text-background">
              {product.badge}
            </span>
          )}

          {/* Hover actions */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="p-2 rounded-full bg-background/90 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
              aria-label="Add to favourites"
            >
              <Heart size={14} />
            </button>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm text-foreground text-[11px] font-medium hover:bg-background transition-colors"
              aria-label="Add to bag"
            >
              <ShoppingBag size={13} />
              Add to bag
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-0.5 px-0.5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-light">{product.category}</p>
          <div className="flex justify-between items-baseline gap-2">
            <h3 className="text-sm font-normal text-foreground">{product.name}</h3>
            <p className="text-sm font-light text-foreground shrink-0">{product.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ProductCarousel = () => (
  <section className="mb-16">
    <div className="section-container mb-6 flex items-center justify-between">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-light">Collection</p>
        <h2 className="font-serif text-2xl text-foreground">New Arrivals</h2>
      </div>
      <Link to="/category/shop" className="hidden md:flex items-center gap-1.5 text-sm font-light text-foreground hover:gap-2.5 transition-all duration-200 group">
        View all
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
      </Link>
    </div>
    <div className="pl-6 lg:pl-10">
      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent className="-ml-4">
          {products.map((product, index) => (
            <CarouselItem key={product.id} className="pl-4 basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <ProductCard product={product} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  </section>
);

export default ProductCarousel;

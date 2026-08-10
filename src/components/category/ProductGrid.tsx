import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import Pagination from "./Pagination";
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
  isNew?: boolean;
}

const products: Product[] = [
  { id: 1, name: "Pantheon", category: "Earrings", price: "€2,850", image: pantheonImage, isNew: true },
  { id: 2, name: "Eclipse", category: "Bracelets", price: "€3,200", image: eclipseImage },
  { id: 3, name: "Halo", category: "Earrings", price: "€1,950", image: haloImage, isNew: true },
  { id: 4, name: "Oblique", category: "Earrings", price: "€1,650", image: obliqueImage },
  { id: 5, name: "Lintel", category: "Earrings", price: "€2,250", image: lintelImage },
  { id: 6, name: "Shadowline", category: "Bracelets", price: "€3,950", image: shadowlineImage },
  { id: 7, name: "Meridian", category: "Earrings", price: "€2,450", image: pantheonImage },
  { id: 8, name: "Vertex", category: "Bracelets", price: "€2,800", image: eclipseImage },
  { id: 9, name: "Apex", category: "Earrings", price: "€1,550", image: haloImage },
  { id: 10, name: "Zenith", category: "Earrings", price: "€1,850", image: obliqueImage },
  { id: 11, name: "Prism", category: "Earrings", price: "€2,050", image: lintelImage },
  { id: 12, name: "Radiant", category: "Bracelets", price: "€3,650", image: shadowlineImage },
  { id: 13, name: "Stellar", category: "Earrings", price: "€2,150", image: pantheonImage },
  { id: 14, name: "Cosmos", category: "Bracelets", price: "€2,950", image: eclipseImage },
  { id: 15, name: "Aurora", category: "Earrings", price: "€1,750", image: haloImage },
  { id: 16, name: "Nebula", category: "Earrings", price: "€1,850", image: obliqueImage },
  { id: 17, name: "Orbit", category: "Earrings", price: "€2,350", image: lintelImage },
  { id: 18, name: "Galaxy", category: "Bracelets", price: "€3,450", image: shadowlineImage },
  { id: 19, name: "Lunar", category: "Earrings", price: "€2,050", image: pantheonImage },
  { id: 20, name: "Solar", category: "Bracelets", price: "€3,150", image: eclipseImage },
  { id: 21, name: "Astral", category: "Earrings", price: "€1,650", image: haloImage },
  { id: 22, name: "Cosmic", category: "Earrings", price: "€1,950", image: obliqueImage },
  { id: 23, name: "Celestial", category: "Earrings", price: "€2,250", image: lintelImage },
  { id: 24, name: "Ethereal", category: "Bracelets", price: "€3,750", image: shadowlineImage },
];

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const { addToCart } = useCart();
  const { ref, isVisible } = useScrollFadeIn(0.1, (index % 4) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[700ms] ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <Link to={`/product/${product.id}`}>
        <Card className="border-none shadow-none bg-transparent group cursor-pointer transition-all duration-500 hover-lift">
          <CardContent className="p-0">
            <div className="aspect-[3/4] mb-4 overflow-hidden bg-card relative rounded-2xl shadow-[0_4px_20px_-6px_hsl(25_30%_15%/0.08)] group-hover:shadow-[0_8px_24px_-8px_hsl(25_30%_15%/0.12)] transition-shadow duration-300">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105" />
              <img src={product.category === "Earrings" ? organicEarring : linkBracelet} alt={`${product.name} lifestyle`} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105" />
              {product.isNew && (
                <div className="absolute top-3 left-3 px-3 py-1 text-[10px] font-medium tracking-widest uppercase text-foreground bg-background/80 backdrop-blur-sm rounded-full">
                  New
                </div>
              )}
              <button
                onClick={handleAddToCart}
                className="absolute bottom-3 right-3 p-2.5 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background hover:scale-110 text-foreground shadow-sm"
                aria-label="Add to bag"
              >
                <ShoppingBag size={15} />
              </button>
            </div>
            <div className="space-y-1 px-1">
              <p className="text-xs font-light tracking-wider uppercase text-muted-foreground">{product.category}</p>
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
                <p className="text-sm font-light text-muted-foreground">{product.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

const ProductGrid = () => {
  return (
    <section className="w-full mb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <Pagination />
      </div>
    </section>
  );
};

export default ProductGrid;

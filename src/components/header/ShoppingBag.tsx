import { X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  category: string;
}

interface ShoppingBagProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (id: number, newQuantity: number) => void;
  onViewFavorites?: () => void;
}

const ShoppingBag = ({ isOpen, onClose, cartItems, updateQuantity, onViewFavorites }: ShoppingBagProps) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('€', '').replace(',', ''));
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 h-screen">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm h-screen backdrop-fade"
        onClick={onClose}
      />
      
      {/* Off-canvas panel */}
      <div className="absolute right-0 top-0 h-screen w-96 bg-background border-l border-border rounded-l-3xl shadow-[0_0_60px_-20px_hsl(25_30%_15%/0.45)] animate-slide-in-right flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <h2 className="text-lg font-light text-foreground">Shopping Bag</h2>
          <button
            onClick={onClose}
            className="p-2 text-foreground hover:text-muted-foreground transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Mobile favorites toggle - only show on mobile */}
        {onViewFavorites && (
          <div className="px-6 py-3 md:hidden border-b border-border flex-shrink-0">
            <button
              onClick={onViewFavorites}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-border/20 rounded-lg text-nav-foreground hover:text-nav-hover hover:border-border/40 hover:shadow-sm transition-all duration-200 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <span className="font-light">View Favorites</span>
            </button>
          </div>
        )}

        {cartItems.length === 0 ? (
          <>
            {/* Empty state */}
            <div className="flex-1 flex items-center justify-center px-6 py-8">
              <p className="text-muted-foreground text-sm text-center leading-relaxed">
                Your shopping bag is empty.<br />
                Continue shopping to add items to your bag.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Cart items */}
            <div className="flex-1 px-6 pt-3 pb-4">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 md:gap-4">
                    <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0 bg-muted/10 rounded-lg md:rounded-xl lg:rounded-xl overflow-hidden border border-border/10 shadow-sm md:shadow-md lg:shadow-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <div className="min-w-0">
                          <p className="text-xs md:text-sm font-light text-muted-foreground truncate">{item.category}</p>
                          <h3 className="text-sm md:text-base font-medium text-foreground truncate">{item.name}</h3>
                        </div>
                        <p className="text-sm md:text-base font-light text-foreground flex-shrink-0">{item.price}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-border/20 rounded-lg md:rounded-xl overflow-hidden shadow-xs bg-background">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 sm:p-1.5 md:p-2 hover:bg-muted/30 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} className="sm:w-3 sm:h-3 md:w-4 md:h-4" />
                          </button>
                          <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 text-xs md:text-sm font-light min-w-[28px] sm:min-w-[32px] md:min-w-[36px] text-center border-l border-r border-border/20">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 sm:p-1.5 md:p-2 hover:bg-muted/30 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} className="sm:w-3 sm:h-3 md:w-4 md:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtotal and checkout - ALWAYS AT BOTTOM */}
            <div className="px-6 py-6 border-t border-border space-y-4 flex-shrink-0 bg-background">
              <div className="flex justify-between items-center">
                <span className="text-sm font-light text-foreground">Subtotal</span>
                <span className="text-sm font-medium text-foreground">€{subtotal.toLocaleString('en-EU', { minimumFractionDigits: 2 })}</span>
              </div>
              
              <p className="text-sm text-muted-foreground leading-tight">
                Shipping and taxes calculated at checkout
              </p>
              
              <div className="space-y-2">
                <Button 
                  asChild 
                  className="w-full rounded-lg" 
                  size="lg"
                  onClick={onClose}
                >
                  <Link to="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full rounded-lg" 
                  size="lg"
                  onClick={onClose}
                  asChild
                >
                  <Link to="/category/shop">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingBag;
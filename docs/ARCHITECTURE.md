# 🏗️ Architecture

Deep dive into Linea Jewelry's system design, data flow, and component hierarchy.

---

## 📊 High-Level Overview

```
┌─────────────────────────────────────────┐
│         Browser / Client                 │
├─────────────────────────────────────────┤
│  React App (App.tsx)                    │
│  ├─ QueryClientProvider (React Query)  │
│  ├─ ThemeProvider (next-themes)        │
│  ├─ CartProvider (Context API)         │
│  ├─ TooltipProvider (Radix UI)         │
│  └─ BrowserRouter (React Router)       │
│     └─ Routes (Pages)                  │
├─────────────────────────────────────────┤
│  Local State                             │
│  ├─ Cart (Context)                     │
│  ├─ Theme (localStorage)               │
│  └─ React Query Cache                  │
└─────────────────────────────────────────┘
```

---

## 🎯 Application State Flow

### 1. Global Providers (App.tsx)

```tsx
<QueryClientProvider>        // Data fetching & caching
  <ThemeProvider>            // Light/dark mode (persisted to localStorage)
    <TooltipProvider>        // Accessible tooltips
      <CartProvider>         // Shopping cart state
        <BrowserRouter>      // Routing
          <Routes>           // Page routing
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </ThemeProvider>
</QueryClientProvider>
```

### 2. Context-Based State (CartContext.tsx)

**Cart Context manages:**
```typescript
interface CartContextType {
  cartItems: CartItem[];                    // Current items in cart
  totalItems: number;                       // Sum of all quantities
  addToCart: (item: CartItem) => void;      // Add/increment item
  removeFromCart: (id: number) => void;     // Remove item
  updateQuantity: (id: number, qty) => void; // Change quantity
  isShoppingBagOpen: boolean;               // UI state
  setIsShoppingBagOpen: (bool) => void;     // Toggle bag visibility
}
```

**Data Structure:**
```typescript
interface CartItem {
  id: number;              // Product ID
  name: string;            // Product name
  price: string;           // Formatted price (€2,850)
  image: string;           // Product image URL
  quantity: number;        // How many of this item
  category: string;        // Product category (Earrings, Bracelets, etc.)
}
```

**Usage in Components:**
```tsx
const { cartItems, addToCart } = useCart();

// Add item to cart
addToCart({
  id: 1,
  name: "Pantheon",
  price: "€2,850",
  image: imagePath,
  category: "Earrings"
});
```

---

## 📄 Page Structure & Routes

```
App.tsx (root with all providers)
│
├─ / (Index.tsx)
│  ├─ Header
│  ├─ FiftyFiftySection
│  ├─ ProductCarousel
│  ├─ LargeHero
│  ├─ OneThirdTwoThirdsSection
│  ├─ EditorialSection
│  └─ Footer
│
├─ /category/:category (Category.tsx)
│  ├─ Header
│  ├─ CategoryHeader
│  ├─ FilterSortBar
│  ├─ ProductGrid
│  ├─ Pagination
│  └─ Footer
│
├─ /product/:productId (ProductDetail.tsx)
│  ├─ Header
│  ├─ ProductImageGallery
│  ├─ ProductInfo
│  ├─ ProductDescription
│  ├─ ProductCarousel (related items)
│  └─ Footer
│
├─ /checkout (Checkout.tsx)
│  ├─ Header
│  ├─ CartSummary
│  ├─ CheckoutForm
│  └─ Footer
│
├─ /about/* (About pages)
│  ├─ /about/our-story (OurStory.tsx)
│  ├─ /about/sustainability (Sustainability.tsx)
│  ├─ /about/size-guide (SizeGuide.tsx)
│  ├─ /about/customer-care (CustomerCare.tsx)
│  └─ /about/store-locator (StoreLocator.tsx)
│
├─ /privacy-policy (PrivacyPolicy.tsx)
│
├─ /terms-of-service (TermsOfService.tsx)
│
└─ * (NotFound.tsx) - 404 page
```

---

## 🎨 Component Hierarchy

### Header Components

```
Header
├─ Navigation
│  ├─ Logo (links to home)
│  ├─ Nav Links (About, Store)
│  └─ Actions
│     ├─ Search (disabled)
│     ├─ Theme Toggle (sun/moon icon)
│     └─ Shopping Bag
│        ├─ Item Count Badge
│        └─ Shopping Bag Drawer
│           └─ CartItems List
```

### Product Components

```
ProductCarousel
└─ CarouselItem (×4 visible on desktop)
   └─ ProductCard
      ├─ ProductImage (with zoom on hover)
      ├─ "New" Badge (conditionally)
      ├─ Add to Cart Button
      ├─ Category Label
      ├─ Product Name
      └─ Price

ProductDetail
├─ ProductImageGallery
│  ├─ MainImage
│  └─ Thumbnail Strip
├─ ProductInfo
│  ├─ Title
│  ├─ Price
│  ├─ Description
│  ├─ Quantity Selector
│  └─ Add to Cart Button
└─ ProductDescription
   └─ Specifications/Details
```

### Footer Components

```
Footer
├─ Newsletter Section
├─ Footer Links
│  ├─ Shop
│  ├─ About
│  ├─ Support
│  └─ Legal
└─ Copyright
```

---

## 🔄 Data Flow Examples

### Adding Product to Cart

```
User clicks "Add to Cart" button on ProductCard
         ↓
ProductCard calls addToCart(productData)
         ↓
CartProvider's addToCart() function:
  - Checks if item already in cart
  - If yes: increment quantity
  - If no: add new CartItem with quantity=1
         ↓
cartItems state updates (via useState)
         ↓
All consumers re-render:
  - Header badge count updates
  - Shopping bag drawer opens
  - Cart summary in checkout updates
```

### Viewing Product Detail

```
User clicks on product in ProductCarousel
         ↓
Link to="/product/{productId}" navigates
         ↓
ProductDetail.tsx receives productId from URL params
         ↓
useParams() hook extracts productId
         ↓
ProductDetail component renders:
  - ProductImageGallery loads images
  - ProductInfo shows price, description
  - Related products carousel
         ↓
User can add to cart from this page
```

### Theme Switching

```
User clicks sun/moon icon in Header
         ↓
ThemeProvider's setTheme() is called
         ↓
next-themes applies class "dark" to <html>
         ↓
Tailwind CSS dark: prefix styles activate
         ↓
Theme persists to localStorage
         ↓
Next visit: theme restored automatically
```

---

## 🎯 Key Design Patterns

### 1. Context API for Global State

**Why:** Simple, built-in React solution for cart state

```tsx
// Access cart anywhere in the app
const { cartItems } = useCart();
```

**Trade-offs:**
- ✅ No external dependencies
- ✅ Simple for small state trees
- ❌ Can cause unnecessary re-renders
- ❌ Doesn't persist across page refreshes

### 2. React Router for Navigation

**Why:** Industry standard, handles SPA routing

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/product/:productId" element={<ProductDetail />} />
  </Routes>
</BrowserRouter>
```

### 3. Tailwind CSS for Styling

**Why:** Utility-first, responsive, performant

```tsx
// Responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Columns: 1 on mobile, 2 on tablet, 4 on desktop */}
</div>

// Dark mode
<div className="bg-white dark:bg-slate-900">
```

### 4. React Query (TanStack Query)

**Current state:** Configured but not yet used for API calls

**Future use:**
```tsx
const { data: products, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: () => fetch('/api/products').then(r => r.json())
});
```

---

## 💾 State Management Summary

| State | Storage | Scope | Persistence |
|-------|---------|-------|-------------|
| **Cart Items** | Context API (memory) | Global | ❌ None (lost on refresh) |
| **Theme** | localStorage | Global | ✅ Yes (restored on load) |
| **Route Params** | URL (react-router) | Current page | ✅ Yes (shareable) |
| **Form Input** | useState | Component | ❌ None |

---

## 🎨 Styling Architecture

### File Structure

```
src/
├── index.css                    // Global styles
├── App.css                      // App-level styles
└── tailwind.config.ts           // Tailwind configuration
```

### Tailwind Configuration

```typescript
{
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { /* custom colors */ },
      fontFamily: { /* custom fonts */ },
      animation: { /* custom animations */ }
    }
  }
}
```

### Dark Mode

Tailwind dark mode is class-based via `next-themes`:

```tsx
// Light mode (default)
<div className="bg-white">Light</div>

// Dark mode (when .dark class on <html>)
<div className="dark:bg-slate-900">Dark</div>
```

---

## 🔌 API Integration Points

**Current State:** No backend API connected yet

**Planned Integration Points:**

```typescript
// Product data
GET /api/products
GET /api/products/:id
GET /api/categories

// Orders
POST /api/orders
GET /api/orders/:id

// User
GET /api/user
POST /api/user/register
POST /api/user/login

// Payments
POST /api/payments
```

**See:** [API_INTEGRATION.md](API_INTEGRATION.md)

---

## 🚀 Performance Considerations

### 1. Code Splitting

Vite automatically splits code by route:
```
dist/
├── index.js           // Shared code
├── product-xyz.js     // ProductDetail page
├── category-xyz.js    // Category page
└── checkout-xyz.js    // Checkout page
```

### 2. Image Optimization

All product images should be:
- ✅ Compressed (tools: TinyPNG, ImageOptim)
- ✅ Responsive (multiple sizes)
- ✅ WebP format when possible

### 3. Bundle Size

**Current size:** ~150KB gzipped (good ✅)

Key dependencies by size:
- React + ReactDOM: ~42KB
- TailwindCSS: ~30KB
- shadcn/ui components: ~25KB
- React Router: ~20KB

---

## 🧩 Extension Points

### Adding a New Page

1. Create file: `src/pages/NewPage.tsx`
2. Add route in `App.tsx`:
   ```tsx
   <Route path="/new-page" element={<NewPage />} />
   ```
3. Link to it from navigation

### Adding a New Component

1. Create: `src/components/MyComponent.tsx`
2. Export as function component
3. Import where needed

### Adding Global State

1. Create context: `src/contexts/MyContext.tsx`
2. Create provider component
3. Wrap App with provider
4. Use `useContext(MyContext)` to access

---

## 🔐 Security Considerations

- ✅ No hardcoded API keys in code
- ✅ No sensitive data in localStorage (only theme)
- ✅ All inputs validated via Zod schemas
- ✅ Component state is client-only (no server communication)

**[See SECURITY.md](../SECURITY.md)**

---

## 📈 Scalability

### Current Limitations

- Cart state lost on page refresh
- No real-time syncing
- No user authentication
- No database integration

### Future Improvements

1. Add backend API
2. Implement Redux or Zustand for complex state
3. Add user authentication (JWT tokens)
4. Implement order persistence
5. Add real-time inventory updates

---

<div align="center">

**Architecture decisions prioritize simplicity and maintainability.**

[← Back to README](../README.md) | [Next: API Integration →](API_INTEGRATION.md)

</div>

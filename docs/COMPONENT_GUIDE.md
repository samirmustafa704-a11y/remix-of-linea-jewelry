# 🎨 Component Guide

Complete reference for all UI components and custom components in Linea Jewelry.

---

## 📦 Component Overview

| Category | Count | Details |
|----------|-------|---------|
| **shadcn/ui** | 60+ | Radix UI primitives + Tailwind CSS |
| **Custom** | 25+ | Project-specific components |
| **Pages** | 10+ | Route components |

---

## 🧩 Custom Components

### Header Components

#### `Header`
```tsx
import Header from '@/components/header/Header';

export default function Page() {
  return <Header />;
}
```

**Features:**
- Navigation menu
- Shopping bag with count badge
- Theme toggle (light/dark)
- Logo/branding
- Responsive drawer on mobile

**Props:** None (uses context internally)

---

### Product Components

#### `ProductCarousel`
```tsx
import ProductCarousel from '@/components/content/ProductCarousel';

export default function Home() {
  return <ProductCarousel />;
}
```

**Features:**
- Horizontally scrollable product list
- Hover effects with image swap
- "New" badges for featured products
- Add to cart button
- Responsive: 2 cols (mobile) → 4 cols (desktop)

**Props:**
```typescript
interface ProductCarouselProps {
  // Currently uses hardcoded product data
  // Future: accept products as prop
}
```

**Data Structure:**
```typescript
interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}
```

#### `ProductCard`
```tsx
import ProductCard from '@/components/content/ProductCarousel';

// Used internally by ProductCarousel
```

**Features:**
- Product image with 3/4 aspect ratio
- Hover animation showing lifestyle image
- Category and price
- Add to cart button
- "New" badge support

#### `ProductImageGallery`
```tsx
import ProductImageGallery from '@/components/product/ProductImageGallery';

export default function ProductDetail() {
  return <ProductImageGallery />;
}
```

**Features:**
- Main image display
- Thumbnail strip below
- Click to switch images
- Zoom on hover (optional)
- Swipe support on mobile

#### `ProductInfo`
```tsx
import ProductInfo from '@/components/product/ProductInfo';

export default function ProductDetail() {
  return <ProductInfo />;
}
```

**Features:**
- Product title and price
- Brief description
- Quantity selector
- Add to cart button
- Stock availability

#### `ProductDescription`
```tsx
import ProductDescription from '@/components/product/ProductDescription';

export default function ProductDetail() {
  return <ProductDescription />;
}
```

**Features:**
- Detailed specifications
- Materials information
- Care instructions
- Size guide link

---

### Category Components

#### `CategoryHeader`
```tsx
import CategoryHeader from '@/components/category/CategoryHeader';

export default function Category() {
  return <CategoryHeader category="Earrings" />;
}
```

**Props:**
```typescript
interface CategoryHeaderProps {
  category: string;
}
```

**Features:**
- Breadcrumb navigation
- Category title
- Description

#### `FilterSortBar`
```tsx
import FilterSortBar from '@/components/category/FilterSortBar';

export default function Category() {
  return (
    <FilterSortBar 
      onFilter={handleFilter}
      onSort={handleSort}
    />
  );
}
```

**Props:**
```typescript
interface FilterSortBarProps {
  onFilter: (filters: FilterOptions) => void;
  onSort: (sortBy: string) => void;
}
```

**Features:**
- Sort by: Price, Name, Newest
- Filter by: Price range, Size, Availability
- Results count

#### `ProductGrid`
```tsx
import ProductGrid from '@/components/category/ProductGrid';

export default function Category() {
  return <ProductGrid products={products} />;
}
```

**Props:**
```typescript
interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}
```

**Features:**
- Responsive grid (1-4 columns)
- Loading skeleton
- Empty state message

---

### Content Sections

#### `FiftyFiftySection`
```tsx
import FiftyFiftySection from '@/components/content/FiftyFiftySection';

// Used on home page
```

**Layout:** 50% image + 50% text

#### `OneThirdTwoThirdsSection`
```tsx
import OneThirdTwoThirdsSection from '@/components/content/OneThirdTwoThirdsSection';

// Used on home page
```

**Layout:** 33% image + 67% text

#### `LargeHero`
```tsx
import LargeHero from '@/components/content/LargeHero';

// Used on home page
```

**Layout:** Full-width hero image with CTA

#### `EditorialSection`
```tsx
import EditorialSection from '@/components/content/EditorialSection';

// Used on home page
```

**Layout:** Grid of editorial images with titles

---

### Footer Components

#### `Footer`
```tsx
import Footer from '@/components/footer/Footer';

export default function Layout() {
  return <Footer />;
}
```

**Features:**
- Newsletter signup
- Quick links
- Social links
- Contact info
- Legal links
- Copyright

---

## 📚 shadcn/ui Components

All components from `@/components/ui/`:

### Form Components

#### Button
```tsx
import { Button } from '@/components/ui/button';

export function MyComponent() {
  return (
    <>
      <Button>Click me</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button disabled>Disabled</Button>
    </>
  );
}
```

**Variants:** `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`

#### Input
```tsx
import { Input } from '@/components/ui/input';

export function SearchForm() {
  return <Input type="text" placeholder="Search..." />;
}
```

#### Label
```tsx
import { Label } from '@/components/ui/label';

export function Form() {
  return (
    <div>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" />
    </div>
  );
}
```

#### Select
```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function CategorySelect() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Choose category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="earrings">Earrings</SelectItem>
        <SelectItem value="bracelets">Bracelets</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

#### Checkbox
```tsx
import { Checkbox } from '@/components/ui/checkbox';

export function FilterOptions() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="inStock" />
      <label htmlFor="inStock">In Stock Only</label>
    </div>
  );
}
```

#### RadioGroup
```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function SortOptions() {
  return (
    <RadioGroup>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="price-low" id="price-low" />
        <label htmlFor="price-low">Price: Low to High</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="price-high" id="price-high" />
        <label htmlFor="price-high">Price: High to Low</label>
      </div>
    </RadioGroup>
  );
}
```

### Display Components

#### Card
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ProductCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pantheon</CardTitle>
        <CardDescription>Earrings</CardDescription>
      </CardHeader>
      <CardContent>
        <p>€2,850</p>
      </CardContent>
    </Card>
  );
}
```

#### Badge
```tsx
import { Badge } from '@/components/ui/badge';

export function ProductBadge() {
  return <Badge>New</Badge>;
}
```

**Variants:** `default`, `secondary`, `destructive`, `outline`

#### Tabs
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ProductTabs() {
  return (
    <Tabs defaultValue="description">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specs">Specifications</TabsTrigger>
      </TabsList>
      <TabsContent value="description">Description text</TabsContent>
      <TabsContent value="specs">Specs here</TabsContent>
    </Tabs>
  );
}
```

### Dialog Components

#### Dialog
```tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function ConfirmDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>Are you sure?</DialogDescription>
        </DialogHeader>
        {/* Content */}
      </DialogContent>
    </Dialog>
  );
}
```

#### Drawer
```tsx
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

export function CartDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>Shopping Bag</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Your Cart</DrawerTitle>
        </DrawerHeader>
        {/* Cart items */}
      </DrawerContent>
    </Drawer>
  );
}
```

### Dropdown & Menu

#### DropdownMenu
```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Feedback Components

#### Toast
```tsx
import { Toaster, toast } from '@/components/ui/sonner';

export function MyComponent() {
  const handleClick = () => {
    toast('Added to cart!', {
      description: 'Pantheon - €2,850',
    });
  };

  return (
    <>
      <Toaster />
      <button onClick={handleClick}>Add to Cart</button>
    </>
  );
}
```

#### Tooltip
```tsx
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function InfoIcon() {
  return (
    <Tooltip>
      <TooltipTrigger>?</TooltipTrigger>
      <TooltipContent>Helpful information</TooltipContent>
    </Tooltip>
  );
}
```

---

## 🎯 Custom Hooks

### useCart
```typescript
import { useCart } from '@/contexts/CartContext';

export function ProductCard() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  return (
    <button onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  );
}
```

**Returns:**
```typescript
{
  cartItems: CartItem[];
  totalItems: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  isShoppingBagOpen: boolean;
  setIsShoppingBagOpen: (open: boolean) => void;
}
```

### useScrollFadeIn
```typescript
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn';

export function ProductCard() {
  const { ref, isVisible } = useScrollFadeIn(0.1, 100);

  return (
    <div
      ref={ref}
      className={isVisible ? 'opacity-100' : 'opacity-0'}
    >
      Product
    </div>
  );
}
```

---

## 🎨 Theming

### Using Theme Variables

All components support light/dark mode via Tailwind:

```tsx
// Light mode (default)
<div className="bg-white text-black">Light</div>

// Dark mode
<div className="dark:bg-slate-900 dark:text-white">Auto dark</div>
```

### Available Colors

- **Background:** `bg-background` / `dark:bg-background`
- **Foreground:** `text-foreground` / `dark:text-foreground`
- **Muted:** `text-muted-foreground` / `dark:text-muted-foreground`
- **Card:** `bg-card` / `dark:bg-card`
- **Accent:** `bg-accent` / `dark:bg-accent`
- **Border:** `border-border` / `dark:border-border`

---

## 📱 Responsive Patterns

### Mobile-First Approach

```tsx
// Default: mobile layout
// md: tablet layout
// lg: desktop layout

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Auto-responsive */}
</div>
```

### Hide/Show Components

```tsx
// Hide on mobile
<div className="hidden lg:block">Desktop only</div>

// Hide on desktop
<div className="lg:hidden">Mobile only</div>

// Responsive text size
<h1 className="text-2xl md:text-3xl lg:text-4xl">Heading</h1>
```

---

## 🚀 Creating New Components

### 1. Create Component File

```tsx
// src/components/MyComponent.tsx

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export default function MyComponent({ title, onClick }: MyComponentProps) {
  return (
    <button onClick={onClick}>
      {title}
    </button>
  );
}
```

### 2. Export from Index

```typescript
// src/components/index.ts
export { default as MyComponent } from './MyComponent';
```

### 3. Use in Pages

```tsx
import { MyComponent } from '@/components';

export default function Page() {
  return <MyComponent title="Click me" />;
}
```

---

## ✅ Component Checklist

When creating new components:

- [ ] TypeScript interfaces for props
- [ ] JSDoc comments
- [ ] Accessibility (ARIA labels, keyboard support)
- [ ] Responsive design (mobile-first)
- [ ] Dark mode support
- [ ] Error states
- [ ] Loading states
- [ ] Unit tests (future)

---

<div align="center">

**Explore all components and build amazing UIs!**

[← Back to README](../README.md)

</div>

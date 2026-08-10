# ✨ Linea Jewelry

> **Minimalist jewelry crafted for the modern individual.**

A production-ready e-commerce storefront built with React, TypeScript, and modern web technologies.

---

## 🎯 Quick Links

| 📚 Resource | 🔗 Link |
|-----------|--------|
| **Getting Started** | [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md) |
| **Architecture** | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| **Deployment** | [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) |
| **Contributing** | [CONTRIBUTING.md](CONTRIBUTING.md) |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ ([Install](https://nodejs.org))
- **npm** 9+ or **Bun** 1+

### Setup (30 seconds)

```bash
# 1. Clone & install
git clone https://github.com/Mostafa-SAID7/linea-jewelry.git
cd linea-jewelry
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# → http://localhost:8080
```

---

## 🏗️ Project Structure

```
src/
├── pages/              # Route pages (Home, Product, Category, etc.)
├── components/         # React components (UI, layout, product)
├── contexts/          # State management (Cart)
├── hooks/             # Custom React hooks
├── lib/               # Utilities & helpers
└── assets/            # Images & static files
```

**[See full architecture →](docs/ARCHITECTURE.md)**

---

## ✨ Core Features

| Feature | Status | Details |
|---------|--------|---------|
| 🏪 **Product Catalog** | ✅ | Browse by category with filtering & sorting |
| 🛒 **Shopping Cart** | ✅ | Add, remove, update quantities in real-time |
| 📦 **Product Details** | ✅ | Image galleries with zoom & detailed info |
| 🎨 **Dark Mode** | ✅ | Light/dark theme toggle |
| 📱 **Responsive Design** | ✅ | Mobile-first, works on all devices |
| ♿ **Accessible UI** | ✅ | shadcn/ui + Radix primitives |
| 🔍 **Type Safe** | ✅ | Full TypeScript coverage |

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| **Framework** | React 18 + TypeScript |
| **Build** | Vite 5 |
| **Styling** | Tailwind CSS 3 + Animations |
| **Components** | shadcn/ui (60+ Radix UI primitives) |
| **Routing** | React Router 6 |
| **State** | Context API + React Query |
| **Forms** | React Hook Form + Zod validation |
| **Icons** | Lucide React |

---

## 📋 Available Commands

```bash
npm run dev       # Start dev server (port 8080)
npm run build     # Production build
npm run lint      # Check code quality
npm run preview   # Preview production build
```

---

## 🌐 Pages & Routes

| Path | Page | Purpose |
|------|------|---------|
| `/` | Home | Featured products, hero sections |
| `/category/:category` | Category | Browse products by collection |
| `/product/:productId` | Product Detail | Full product page with images |
| `/checkout` | Checkout | Cart review & order |
| `/about/*` | About | Story, sustainability, size guide, support |
| `/privacy-policy` | Legal | Privacy information |
| `/terms-of-service` | Legal | Terms & conditions |

---

## 📦 State Management

**Cart State** (Context API)
```typescript
CartItem {
  id: number
  name: string
  price: string
  image: string
  quantity: number
  category: string
}
```

**Usage:**
```tsx
import { useCart } from '@/contexts/CartContext';

const { cartItems, addToCart, removeFromCart } = useCart();
```

---

## 🔄 Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
```bash
# Code, test, commit
git add .
git commit -m "feat: add new feature"
```

### 3. Push & Create PR
```bash
git push origin feature/your-feature-name
# Open PR on GitHub
```

**→ [Full Contributing Guide](CONTRIBUTING.md)**

---

## 🚢 Deployment

The app can be deployed to:
- **Vercel** (recommended, 1-click)
- **Netlify** (1-click)
- **Traditional servers** (nginx, Apache)

**→ [Deployment Guide](docs/DEPLOYMENT.md)**

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [GETTING_STARTED.md](docs/GETTING_STARTED.md) | Local setup, troubleshooting |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design, data flow |
| [API_INTEGRATION.md](docs/API_INTEGRATION.md) | Backend integration guide |
| [COMPONENT_GUIDE.md](docs/COMPONENT_GUIDE.md) | UI component library |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Build & deployment instructions |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute |
| [SECURITY.md](SECURITY.md) | Security guidelines |

---

## 🔒 Security

- ✅ No hardcoded secrets
- ✅ Dependencies scanned with Snyk
- ✅ ESLint enforces code quality
- ✅ TypeScript prevents type errors

**→ [Security Policy](SECURITY.md)**

---

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code style guidelines
- Commit message format
- PR process
- Development setup

---

## 📄 License

This project is private. All rights reserved.

---

## ❓ Questions or Issues?

- 💬 [Open an issue](../../issues)
- 📧 Contact the team
- 📖 Check [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

---

<div align="center">

**Built with ❤️ for modern minimalists**

[↑ Back to top](#-linea-jewelry)

</div>

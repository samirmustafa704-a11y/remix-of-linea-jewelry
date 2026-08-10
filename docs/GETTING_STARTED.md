# 🚀 Getting Started

Everything you need to set up Linea Jewelry locally and start developing.

---

## 📋 Prerequisites

Before you begin, ensure you have:

| Requirement | Version | Install |
|-------------|---------|---------|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org) |
| **npm** | 9+ | Included with Node.js |
| **Git** | Any | [git-scm.com](https://git-scm.com) |

**Alternative:** Use **Bun** instead of npm (faster)
```bash
curl -fsSL https://bun.sh/install | bash
```

---

## 🔧 Step-by-Step Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mostafa-SAID7/linea-jewelry.git
cd linea-jewelry
```

### 2️⃣ Install Dependencies

Using npm:
```bash
npm install
```

Or using Bun:
```bash
bun install
```

> This installs all 370+ packages defined in `package.json`

### 3️⃣ Verify Installation

```bash
npm run lint
```

Should show no errors (warnings about Tailwind durations are acceptable).

### 4️⃣ Start Development Server

```bash
npm run dev
```

Expected output:
```
VITE v5.4.19  ready in 1234 ms

➜  Local:   http://localhost:8080/
➜  Network: http://192.168.x.x:8080/
```

### 5️⃣ Open in Browser

Navigate to **http://localhost:8080**

You should see the Linea Jewelry homepage with:
- ✅ Navigation header with shopping bag
- ✅ Hero sections and product carousels
- ✅ Responsive layout on mobile/tablet/desktop

---

## 📁 Project Structure

```
linea-jewelry/
├── .github/                 # GitHub workflows, issue templates
├── docs/                    # Documentation
├── src/
│   ├── pages/              # Route components
│   ├── components/         # Reusable UI components
│   ├── contexts/           # State management (Cart)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities & helpers
│   ├── assets/             # Images, logos, static files
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── public/                 # Static files
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite configuration
└── tailwind.config.ts      # Tailwind CSS config
```

---

## 🎯 Common Commands

| Command | Purpose | Time |
|---------|---------|------|
| `npm run dev` | Start dev server | 2-3s |
| `npm run build` | Production build | 10-15s |
| `npm run lint` | Check code quality | 5-10s |
| `npm run preview` | Preview production build | 2s |

---

## 🎨 Understanding the Architecture

### Home Page Flow
```
App.tsx (root)
  ├── QueryClientProvider (data fetching)
  ├── ThemeProvider (dark/light mode)
  ├── CartProvider (shopping cart state)
  └── BrowserRouter (routing)
      └── Index.tsx (home page)
          ├── Header (navigation)
          ├── FiftyFiftySection
          ├── ProductCarousel (featured products)
          ├── LargeHero
          ├── EditorialSection
          └── Footer
```

### Shopping Cart Flow
```
User clicks "Add to Cart"
  → ProductCard component calls addToCart()
  → useCart hook (CartContext)
  → Cart state updates
  → Header badge count increases
  → Shopping bag opens
```

**[See full architecture →](ARCHITECTURE.md)**

---

## 🛒 Testing the Cart

1. Open http://localhost:8080
2. Hover over a product card
3. Click the shopping bag icon
4. Shopping bag should open with the item added
5. Click the item to view product detail page
6. Adjust quantity or add different sizes (when available)

---

## 🌓 Testing Dark Mode

```tsx
// Dark mode toggle is in the Header component
// Click the sun/moon icon in the top-right
```

Dark mode colors are defined in `tailwind.config.ts` and automatically applied.

---

## 🔍 Debugging Tips

### Issue: Port 8080 Already in Use

```bash
# Find what's using port 8080
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows

# Kill the process or use a different port
npm run dev -- --port 3000
```

### Issue: Node Modules Corrupted

```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript Errors

```bash
# Clear cache and rebuild
rm -rf dist
npm run build
```

### Issue: Hot Reload Not Working

```bash
# Restart dev server
npm run dev

# Check file permissions
ls -la src/
```

---

## 📦 Understanding package.json

```json
{
  "scripts": {
    "dev": "vite",                    // Dev server
    "build": "vite build",            // Production build
    "build:dev": "vite build --mode development",
    "lint": "eslint .",               // Code linting
    "preview": "vite preview"         // Preview prod build
  },
  "dependencies": {
    "react": "^18.3.1",               // UI framework
    "typescript": "^5.8",             // Type safety
    "tailwindcss": "^3.4.17",         // Styling
    "@radix-ui/*": "^1.x",            // Accessible components
    "react-router-dom": "^6.30",      // Routing
    "@tanstack/react-query": "^5.83", // Data fetching
    "react-hook-form": "^7.61",       // Form state
    "zod": "^3.25"                    // Schema validation
  }
}
```

---

## 🧪 Running Tests

Currently, no test files are configured. To add tests:

```bash
# Install testing libraries
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Create tests in __tests__ or .test.ts files
# Run with: npm run test
```

**[See testing guide →](../docs/TESTING.md)**

---

## 🎓 Next Steps

1. ✅ **Setup complete!** Server is running
2. 📖 **Read** [ARCHITECTURE.md](ARCHITECTURE.md) to understand the codebase
3. 🛠️ **Start coding** - Make a change in `src/pages/Index.tsx` and see hot reload
4. 🚀 **Deploy** - Follow [DEPLOYMENT.md](DEPLOYMENT.md) when ready
5. 🤝 **Contribute** - Read [../CONTRIBUTING.md](../CONTRIBUTING.md)

---

## 🆘 Still Stuck?

- 📚 Check existing [GitHub issues](../../issues)
- 💬 Open a new issue with:
  - What you tried
  - Error message (exact text)
  - Environment (Node version, OS, npm version)
  - Steps to reproduce

---

## ✨ Pro Tips

- **Fast reload:** Edit `src/components/` files - hot reload is instant
- **Type checking:** Run `npx tsc --noEmit` to check types without building
- **Bundle size:** Run `npm run build` and check `dist/` folder size
- **Performance:** Open DevTools → Lighthouse for performance audit

---

<div align="center">

**Ready to start?** Run `npm run dev` and open http://localhost:8080 🚀

[← Back to README](../README.md)

</div>

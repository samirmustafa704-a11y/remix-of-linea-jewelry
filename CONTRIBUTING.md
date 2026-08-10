# 🤝 Contributing

Thank you for your interest in contributing to Linea Jewelry! This guide will help you get started.

---

## 📋 Code of Conduct

Be respectful, inclusive, and constructive. We're building something great together.

---

## 🚀 Getting Started

### 1. Fork the Repository

```bash
# Click "Fork" on GitHub
git clone https://github.com/YOUR-USERNAME/linea-jewelry.git
cd linea-jewelry
```

### 2. Create a Feature Branch

```bash
# Always branch from main
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**
- `feature/add-wishlist` - New feature
- `fix/cart-bug` - Bug fix
- `docs/update-readme` - Documentation
- `refactor/extract-component` - Refactoring
- `chore/update-deps` - Maintenance

### 3. Setup Development Environment

```bash
npm install
npm run dev
```

**[Detailed setup →](docs/GETTING_STARTED.md)**

---

## ✍️ Making Changes

### Code Style

We follow these conventions:

**TypeScript:**
- ✅ Full type coverage (no `any`)
- ✅ Descriptive variable names
- ✅ JSDoc comments on functions

```typescript
/**
 * Add an item to the shopping cart
 * @param item - The product to add
 * @returns Updated cart items
 */
export function addToCart(item: CartItem): CartItem[] {
  // Implementation
}
```

**React Components:**
- ✅ Functional components only
- ✅ Use hooks (useState, useContext, etc.)
- ✅ Props typed with interfaces

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function MyButton({ label, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

**Styling:**
- ✅ Tailwind CSS utilities (no inline styles)
- ✅ Dark mode support with `dark:` prefix
- ✅ Responsive design with `md:` and `lg:` prefixes

```tsx
<div className="text-sm md:text-base lg:text-lg dark:text-white">
  Responsive, themed text
</div>
```

### Linting

```bash
# Check code quality
npm run lint

# Fix auto-fixable issues
npx eslint . --fix
```

**Fix before committing:**
- ✅ No unused imports
- ✅ No console.log in production code
- ✅ No TypeScript errors

---

## 🔄 Commit Messages

Use clear, descriptive commit messages:

```bash
git commit -m "feat: add product filtering to category page"
git commit -m "fix: resolve cart quantity update bug"
git commit -m "docs: update API integration guide"
```

**Format:**
```
<type>(<scope>): <message>

<optional body with more details>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting (no code change)
- `refactor:` - Code restructure
- `test:` - Add/update tests
- `chore:` - Dependency/config updates

**Examples:**
```bash
feat(cart): add quantity validation
fix(header): resolve shopping bag alignment on mobile
docs(api): add payment integration example
refactor(hooks): extract cart logic to custom hook
chore(deps): update react to 18.3.1
```

---

## 🧪 Testing

### Before Committing

```bash
# 1. Run linter
npm run lint

# 2. Type check
npx tsc --noEmit

# 3. Build
npm run build

# 4. Test locally
npm run dev
# → Open http://localhost:8080
# → Test your changes manually
```

### Manual Testing Checklist

- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] Dark mode works
- [ ] Existing features still work
- [ ] No performance degradation

---

## 📤 Submitting a Pull Request

### 1. Push to Your Fork

```bash
git add .
git commit -m "feat: your feature"
git push origin feature/your-feature-name
```

### 2. Create PR on GitHub

1. Go to [github.com/Mostafa-SAID7/linea-jewelry](https://github.com/Mostafa-SAID7/linea-jewelry)
2. Click "Compare & pull request"
3. Fill in the PR template with:
   - **Description:** What does this PR do?
   - **Type:** Feature, fix, docs, etc.
   - **Related issues:** Closes #123
   - **Testing:** How did you test this?
   - **Screenshots:** For UI changes

### 3. PR Template

```markdown
## 📋 Description
Brief description of changes

## 🎯 Type of Change
- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 📝 Documentation

## 🔗 Related Issues
Closes #123

## ✅ Testing
How did you test this?

## 📸 Screenshots
(if applicable)
```

---

## 🔍 Review Process

### What Reviewers Look For

- ✅ Code quality and consistency
- ✅ No breaking changes
- ✅ Tests passing
- ✅ Documentation updated
- ✅ Performance impact
- ✅ Accessibility compliance

### Addressing Feedback

```bash
# Make changes based on review comments
git add .
git commit -m "refactor: address PR feedback"
git push origin feature/your-feature-name

# Don't force push - reviewers see the updates
```

### Getting Approved

Once approved:
1. Your PR will be merged to `main`
2. Automatic deployment triggers
3. Your changes go live! 🎉

---

## 🐛 Reporting Bugs

Found a bug? Use [GitHub Issues](../../issues) or our bug report template.

**Include:**
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Environment (OS, browser, Node version)
5. Screenshots/videos if applicable

**Use the template:**
```bash
# Click "New Issue" → "Bug Report"
```

---

## 💡 Feature Requests

Have an idea? Share it!

**Use the feature request template:**
```bash
# Click "New Issue" → "Feature Request"
```

**Include:**
1. Use case (why is this needed?)
2. Proposed solution
3. Alternatives considered
4. Priority (low/medium/high)

---

## 📚 Documentation

Good documentation is part of contribution.

### Update These When Relevant

- ✅ `README.md` - Overview changes
- ✅ `docs/ARCHITECTURE.md` - Design changes
- ✅ `docs/COMPONENT_GUIDE.md` - New components
- ✅ `docs/API_INTEGRATION.md` - API changes
- ✅ Code comments - Explain complex logic

---

## 🚀 Development Workflow

### Scenario: Add a New Feature

```bash
# 1. Create branch
git checkout -b feature/wishlist

# 2. Code your feature
# Edit: src/contexts/WishlistContext.tsx
# Edit: src/components/WishlistButton.tsx
# Add: src/hooks/useWishlist.ts

# 3. Test locally
npm run lint
npm run dev
# Manual testing at http://localhost:8080

# 4. Commit
git add src/
git commit -m "feat(wishlist): add save to wishlist functionality"

# 5. Push
git push origin feature/wishlist

# 6. Create PR on GitHub
# Fill in PR template
# Wait for review

# 7. Address feedback if needed
git add .
git commit -m "refactor(wishlist): improve performance"
git push origin feature/wishlist

# 8. Merge!
# PR gets merged to main
```

---

## 🔗 Useful Links

| Resource | Link |
|----------|------|
| **Issues** | [github.com/Mostafa-SAID7/linea-jewelry/issues](https://github.com/Mostafa-SAID7/linea-jewelry/issues) |
| **Discussions** | [github.com/Mostafa-SAID7/linea-jewelry/discussions](https://github.com/Mostafa-SAID7/linea-jewelry/discussions) |
| **Architecture** | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| **Component Guide** | [docs/COMPONENT_GUIDE.md](docs/COMPONENT_GUIDE.md) |

---

## ❓ Questions?

- 💬 Open a [Discussion](https://github.com/Mostafa-SAID7/linea-jewelry/discussions)
- 📧 Email the team
- 📖 Check [FAQ](docs/TROUBLESHOOTING.md)

---

## 🎁 Recognition

Contributors will be recognized in:
- ✅ README.md
- ✅ Release notes
- ✅ GitHub contributors page

Thank you for making Linea Jewelry better! 💚

---

<div align="center">

**Ready to contribute?** Start with [Getting Started →](docs/GETTING_STARTED.md)

[← Back to README](README.md)

</div>

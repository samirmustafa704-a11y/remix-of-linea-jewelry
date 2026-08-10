# Git Flow Workflow Guide - Linea Jewelry

## Overview

This project uses Git Flow for professional version control with automated releases, tags, and branch management.

## Branch Structure

```
main (production)
  ↑
  ├─ release/v*.*.* (release branches)
  │
develop (staging)
  ├─ feature/* (new features)
  ├─ bugfix/* (bug fixes)
  └─ hotfix/* (urgent production fixes)
```

## Branch Naming Conventions

### Feature Branches
```bash
git flow feature start my-feature-name
# Creates: feature/my-feature-name
# Prefix: feat:
```

**Examples:**
- `feature/responsive-hero` → `feat: Responsive hero section`
- `feature/shadow-system` → `feat: Unified shadow system`
- `feature/product-carousel` → `feat: Interactive product carousel`

### Bug Fix Branches
```bash
git flow bugfix start login-validation
# Creates: bugfix/login-validation
# Prefix: fix:
```

**Examples:**
- `bugfix/cart-calculation` → `fix: Cart total calculation`
- `bugfix/image-loading` → `fix: Image loading on slow networks`
- `bugfix/mobile-menu` → `fix: Mobile menu overlap issue`

### Release Branches
```bash
git flow release start 1.2.0
# Creates: release/1.2.0
# Prefix: release:
```

**Version Format:** `v{major}.{minor}.{patch}`
- `1.0.0` → Initial release
- `1.1.0` → Minor features added
- `1.0.1` → Bug fixes only
- `2.0.0` → Major breaking changes

### Hotfix Branches
```bash
git flow hotfix start critical-bug
# Creates: hotfix/critical-bug
# Prefix: hotfix:
```

**Use for:** Urgent production fixes that can't wait for next release

---

## Workflow Examples

### Adding a New Feature

```bash
# Start feature from develop
git flow feature start user-authentication

# Make changes and commit
git add .
git commit -m "feat: User authentication system

- Implement login form
- Add password validation
- Create auth context
"

# Finish feature (merge to develop)
git flow feature finish user-authentication

# Push to remote
git push origin develop
```

### Fixing a Bug

```bash
# Start bugfix from develop
git flow bugfix start cart-total-error

# Fix the bug
git add .
git commit -m "fix: Cart total calculation

- Fixed tax calculation issue
- Added validation for coupon codes
- Updated cart update mechanism
"

# Finish bugfix
git flow bugfix finish cart-total-error
git push origin develop
```

### Creating a Release

```bash
# Start release from develop
git flow release start 1.2.0

# Update version numbers, changelog
git add package.json CHANGELOG.md
git commit -m "release: Prepare v1.2.0 release"

# Finish release (merges to main + develop, creates tag)
git flow release finish 1.2.0
git tag -a v1.2.0 -m "Release v1.2.0"

# Push to remote
git push origin main develop --tags
```

### Applying an Urgent Hotfix

```bash
# Start hotfix from main
git flow hotfix start critical-security-issue

# Fix the issue
git add .
git commit -m "hotfix: Security vulnerability patch

- Fixed XSS vulnerability in user input
- Added sanitization layer
- Updated security headers
"

# Finish hotfix (creates tag)
git flow hotfix finish critical-security-issue

# Push to remote
git push origin main develop --tags
```

---

## Commit Message Format

Follow the Conventional Commits format for automatic changelog generation:

```
type(scope): subject

body

footer
```

### Types
- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation only
- **style:** Code style (formatting, semicolons, etc)
- **refactor:** Code refactoring
- **perf:** Performance improvement
- **test:** Test additions/updates
- **chore:** Build process, dependencies, etc

### Example Commits

```bash
feat(hero): Add interactive slider to FiftyFiftySection

- Auto-rotate images every 5 seconds
- Manual navigation with arrows
- Responsive heights: 400px/500px/600px

Closes #42
```

```bash
fix(cart): Fix total calculation with multiple discounts

Previously, the total was calculated incorrectly when
applying multiple discount codes. Fixed by updating
the calculation order and validation.

Fixes #89
```

---

## Release Checklist

Before creating a release:

- [ ] All features complete and merged to develop
- [ ] All tests passing (`npm run lint`, `npm run build`)
- [ ] Security audit passing (`npm audit --audit-level=moderate`)
- [ ] CHANGELOG.md updated
- [ ] package.json version bumped
- [ ] Code reviewed
- [ ] Browser testing done (desktop + mobile)

---

## Tag Management

### Creating Tags

```bash
# Automatic (with git flow)
git flow release finish 1.2.0

# Manual tag
git tag -a v1.2.0 -m "Release v1.2.0 - New responsive design"

# Push tags
git push origin --tags
```

### Tag Format
- `v1.0.0` - Initial release
- `v1.1.0` - New features
- `v1.0.1` - Patch/bugfix
- `v2.0.0` - Major release

### Viewing Tags
```bash
# List all tags
git tag -l

# Show tag details
git show v1.2.0

# Checkout specific tag
git checkout v1.2.0
```

---

## Automatic CI/CD Pipeline

GitHub Actions workflows run on:

1. **Pull Requests** (develop ← feature/bugfix)
   - Run linting: `npm run lint`
   - Build: `npm run build`
   - Security: `npm audit --audit-level=moderate`

2. **Release Branch** (main ← release)
   - All PR checks
   - Create GitHub Release
   - Tag version
   - Deploy to production

3. **Hotfix** (main ← hotfix)
   - Priority checks
   - Quick deployment
   - Automated tag creation

---

## Best Practices

### DO ✅
- Create feature branches for all changes
- Write descriptive commit messages
- Keep commits focused and atomic
- Review code before merging
- Use conventional commit format
- Tag all releases
- Keep develop stable (always deployable)

### DON'T ❌
- Commit directly to main or develop
- Mix unrelated changes in one commit
- Skip testing/linting before merge
- Use vague commit messages
- Force push to shared branches
- Skip code review
- Leave stale branches

---

## Useful Commands

```bash
# Initialize git flow (one time)
git flow init -d

# Start/finish features
git flow feature start feature-name
git flow feature finish feature-name

# Start/finish bugfixes
git flow bugfix start bug-name
git flow bugfix finish bug-name

# Start/finish releases
git flow release start 1.2.0
git flow release finish 1.2.0

# Start/finish hotfixes
git flow hotfix start critical-issue
git flow hotfix finish critical-issue

# View all branches
git branch -a

# View all tags
git tag -l

# Push everything
git push origin --all --tags

# Delete local branch
git branch -d feature/old-feature

# Delete remote branch
git push origin --delete feature/old-feature
```

---

## Remote Integration

### GitHub Setup
1. Require PR reviews before merge
2. Protect main and develop branches
3. Require status checks (lint, build, security)
4. Automatic deployment on main merge

### Branch Protection Rules

**main branch:**
- ✅ Require pull request reviews (2 reviewers)
- ✅ Require status checks before merge
- ✅ Require branches to be up to date
- ✅ Require code review from owners
- ❌ Allow force push

**develop branch:**
- ✅ Require pull request reviews (1 reviewer)
- ✅ Require status checks before merge
- ✅ Require branches to be up to date
- ❌ Allow force push

---

## Version Numbering (Semantic Versioning)

**Format:** `major.minor.patch`

- **Major (1.0.0 → 2.0.0):** Breaking changes
- **Minor (1.0.0 → 1.1.0):** New features (backward compatible)
- **Patch (1.0.0 → 1.0.1):** Bug fixes

**Release Schedule:**
- Major releases: Quarterly or as needed
- Minor releases: Monthly
- Patch releases: As needed for critical bugs
- Hotfixes: Immediate for critical issues

---

## Troubleshooting

### Accidentally committed to main
```bash
# Move last commit to new branch
git branch feature/oops
git reset --hard HEAD~1
git checkout feature/oops
```

### Need to undo last commit
```bash
# Keep changes, undo commit
git reset --soft HEAD~1

# Discard changes completely
git reset --hard HEAD~1
```

### Merge conflict in release
```bash
# View conflicts
git status

# Resolve in editor, then
git add .
git commit -m "Resolve merge conflicts"
git flow release finish <version>
```

---

## Resources

- [Git Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)

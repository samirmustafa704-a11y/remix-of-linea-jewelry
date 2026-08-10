# 🔒 Security Policy

Security is a top priority for Linea Jewelry. This document outlines our security practices and how to report vulnerabilities.

---

## 🚨 Reporting Vulnerabilities

**PLEASE DO NOT open a public issue for security vulnerabilities.**

Instead, report to: **[security@linea-jewelry.com](mailto:security@linea-jewelry.com)**

### Include in Report

- 📝 Description of the vulnerability
- 🔍 Steps to reproduce
- 💥 Potential impact
- 🛠️ Suggested fix (if any)
- 👤 Your contact information

**Response time:** We aim to respond within 48 hours.

---

## ✅ Security Checklist

### Code Security

- [x] **No hardcoded secrets**
  ```tsx
  // ❌ BAD - Never do this
  const API_KEY = "sk_live_1234567890";
  
  // ✅ GOOD - Use environment variables
  const API_KEY = import.meta.env.VITE_API_KEY;
  ```

- [x] **No sensitive data in localStorage**
  ```tsx
  // ❌ BAD
  localStorage.setItem('password', userPassword);
  
  // ✅ GOOD - Only theme/non-sensitive data
  localStorage.setItem('theme', 'dark');
  ```

- [x] **Validate all inputs**
  ```tsx
  // ❌ BAD - Unvalidated form submission
  function handleSubmit(data) {
    submitOrder(data);
  }
  
  // ✅ GOOD - Use Zod validation
  const schema = z.object({
    email: z.string().email(),
    quantity: z.number().min(1)
  });
  const validated = schema.parse(formData);
  ```

- [x] **Prevent XSS attacks**
  ```tsx
  // ❌ BAD - Unescaped HTML
  return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
  
  // ✅ GOOD - React auto-escapes
  return <div>{userInput}</div>;
  ```

### Dependency Security

```bash
# 1. Audit dependencies regularly
npm audit

# 2. Fix vulnerabilities
npm audit fix

# 3. Update major versions carefully
npm update
npm run build
npm run lint

# 4. Check for outdated packages
npm outdated
```

**Automated:**
- ✅ Dependabot enabled (`.github/dependabot.yml`)
- ✅ Security audit on every PR (GitHub Actions)
- ✅ Snyk integration for vulnerability scanning

### Environment Security

**Never commit:**
- ❌ `.env` (local environment variables)
- ❌ `.env.production` (production variables)
- ❌ API keys or tokens
- ❌ Database credentials
- ❌ Private certificates

**Instead:**
- ✅ Use `.env.example` template
- ✅ Store secrets in CI/CD platform
- ✅ Use secure vaults for production

**Example `.env.example`:**
```bash
# API Configuration (public)
VITE_API_URL=https://api.example.com

# Stripe Key (public)
VITE_STRIPE_PUBLIC_KEY=pk_test_...

# Private keys (never commit, set in CI)
# SECRET_API_KEY=sk_... (set in GitHub Secrets)
```

---

## 🛡️ Authentication Security

### Password Best Practices

**Backend (Node/Express):**

```javascript
// ❌ BAD - Plain text passwords
db.savePassword(user.email, plainPassword);

// ✅ GOOD - Hash with bcrypt
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(plainPassword, 10);
db.savePassword(user.email, hashedPassword);
```

### Token Security

**JWT Storage:**
```typescript
// ❌ BAD - Stored in localStorage (XSS vulnerable)
localStorage.setItem('token', jwtToken);

// ✅ GOOD - Use HTTP-only cookies (XSS safe)
// Set by backend: Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict
```

**Token Validation:**
```typescript
// Validate token expiry
if (jwt.isExpired(token)) {
  refreshToken();
}

// Validate token signature
jwt.verify(token, SECRET_KEY);
```

---

## 🔐 API Security

### CORS Configuration

```typescript
// ✅ GOOD - Restrict CORS to trusted domains
const cors = require('cors');
app.use(cors({
  origin: ['https://linea-jewelry.com', 'https://www.linea-jewelry.com'],
  credentials: true
}));

// ❌ BAD - Allow all origins
app.use(cors()); // Don't do this in production
```

### Rate Limiting

```typescript
// ✅ GOOD - Prevent brute force attacks
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### Input Validation

```typescript
// ✅ GOOD - Validate and sanitize inputs
const email = validator.normalizeEmail(req.body.email);
const quantity = Math.min(Math.max(parseInt(req.body.quantity), 1), 1000);

// ✅ GOOD - Reject invalid data
if (!validator.isEmail(email)) {
  return res.status(400).json({ error: 'Invalid email' });
}
```

### SQL Injection Prevention

```typescript
// ❌ BAD - String concatenation
const query = `SELECT * FROM users WHERE email = '${email}'`;
db.execute(query);

// ✅ GOOD - Parameterized queries
const query = 'SELECT * FROM users WHERE email = ?';
db.execute(query, [email]);
```

---

## 🚀 Deployment Security

### HTTPS/SSL

- ✅ All traffic encrypted with SSL/TLS
- ✅ Valid SSL certificate from trusted CA
- ✅ Redirect HTTP → HTTPS

### Security Headers

```nginx
# Add security headers in nginx.conf
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self'" always;
```

### Environment Configuration

```bash
# Production .env (set in deployment platform)
NODE_ENV=production
VITE_API_URL=https://api.linea-jewelry.com
VITE_STRIPE_PUBLIC_KEY=pk_live_...
LOG_LEVEL=warn
ENABLE_DEBUG=false
```

---

## 📊 Monitoring & Logging

### Error Tracking

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://...",
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// Capture errors
Sentry.captureException(error);
```

### Audit Logging

```typescript
// ✅ GOOD - Log sensitive actions
logger.info('User login', { userId: user.id, timestamp: new Date() });
logger.warn('Failed login attempt', { email, ip: req.ip });
logger.error('Payment failed', { orderId, error: error.message });

// ❌ BAD - Log sensitive data
logger.info('User login', { email, password }); // Never log passwords!
```

---

## 🔄 Security Updates

### Regular Updates

```bash
# Weekly: Check for updates
npm outdated

# Monthly: Update dependencies
npm update

# Quarterly: Major version updates
npm audit fix --force
# Test thoroughly before deploying
```

### Emergency Patches

If a critical vulnerability is found:

1. ✅ Assess impact immediately
2. ✅ Create emergency patch
3. ✅ Test thoroughly
4. ✅ Deploy to production
5. ✅ Notify users if affected
6. ✅ Post-mortem analysis

---

## 👥 Team Security Training

All team members should understand:

- ✅ OWASP Top 10 vulnerabilities
- ✅ Secure coding practices
- ✅ Password management
- ✅ Phishing awareness
- ✅ Data handling procedures

**Resources:**
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [CWE/SANS Top 25](https://cwe.mitre.org/top25/)

---

## 📋 Security Incident Response

### If We Find a Vulnerability

1. **Isolate** - Remove from production if critical
2. **Assess** - Determine scope and impact
3. **Fix** - Create patch and test
4. **Deploy** - Roll out fix quickly
5. **Notify** - Inform affected users
6. **Review** - Post-mortem to prevent recurrence

### User Communication

```markdown
Subject: Important Security Update

We discovered and fixed a security vulnerability:
- What: [Brief description]
- Impact: [Who was affected]
- Action: [What users should do]
- Status: [Fixed as of date]

Thank you for your trust.
```

---

## 🔗 External Security Resources

- [OWASP Security Cheat Sheet](https://cheatsheetseries.owasp.org/)
- [npm Security Best Practices](https://docs.npmjs.com/securing-your-code)
- [React Security](https://snyk.io/learn/react-security/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

---

## ✅ Security Checklist for Contributors

Before submitting a PR:

- [ ] No hardcoded secrets or API keys
- [ ] Sensitive data not stored in localStorage
- [ ] User inputs validated (Zod, validators)
- [ ] No `dangerouslySetInnerHTML`
- [ ] No `eval()` or similar dynamic code execution
- [ ] Dependencies audited (`npm audit`)
- [ ] Environment variables used for configuration
- [ ] Error messages don't expose sensitive info
- [ ] No console.log with sensitive data
- [ ] TypeScript strict mode enabled

---

## 📞 Security Contact

- **Email:** [security@linea-jewelry.com](mailto:security@linea-jewelry.com)
- **Response time:** 48 hours
- **Disclosure:** Coordinated disclosure after fix

---

<div align="center">

**Security is everyone's responsibility.** Thank you for helping us keep Linea Jewelry safe. 🔒

[← Back to README](README.md)

</div>

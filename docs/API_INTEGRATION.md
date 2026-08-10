# 🔌 API Integration

Guide for integrating Linea Jewelry frontend with backend APIs.

---

## 📋 Current State

**Status:** Frontend configured, no backend connected yet

**React Query Setup:** ✅ Ready
**HTTP Client:** Ready to add (axios or fetch)
**Environment Variables:** ✅ Ready

---

## 🚀 Quick Start: Add Your API

### 1. Install HTTP Client

```bash
npm install axios
```

### 2. Create API Module

Create `src/lib/api.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 3. Set Environment Variables

Create `.env.local`:

```bash
VITE_API_URL=http://localhost:3000/api
```

Or `.env.production`:

```bash
VITE_API_URL=https://api.linea-jewelry.com
```

### 4. Create API Hooks

Create `src/hooks/useProducts.ts`:

```typescript
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get<Product[]>('/products');
      return data;
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data } = await api.get<Product>(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
```

### 5. Use in Components

```typescript
import { useProducts } from '@/hooks/useProducts';

export function ProductList() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

---

## 🔌 API Endpoints Reference

### Products

**GET /api/products**
```json
[
  {
    "id": 1,
    "name": "Pantheon",
    "category": "Earrings",
    "price": "€2,850",
    "image": "https://...",
    "description": "...",
    "stock": 5
  }
]
```

**GET /api/products/:id**
```json
{
  "id": 1,
  "name": "Pantheon",
  "category": "Earrings",
  "price": "€2,850",
  "image": "https://...",
  "images": ["url1", "url2"],
  "description": "Detailed description",
  "specifications": "14k gold, 2.5cm",
  "stock": 5
}
```

**GET /api/categories**
```json
[
  {
    "id": 1,
    "name": "Earrings",
    "image": "https://..."
  },
  {
    "id": 2,
    "name": "Bracelets",
    "image": "https://..."
  }
]
```

### Orders

**POST /api/orders**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "US"
  },
  "paymentMethod": "stripe"
}
```

**Response:**
```json
{
  "id": "order_12345",
  "status": "pending",
  "total": 5700,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**GET /api/orders/:orderId**
```json
{
  "id": "order_12345",
  "status": "shipped",
  "items": [...],
  "total": 5700,
  "createdAt": "2024-01-15T10:30:00Z",
  "trackingNumber": "1Z999AA10123456784"
}
```

### Authentication

**POST /api/auth/register**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**POST /api/auth/login**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Payments

**POST /api/payments/intent**
```json
{
  "amount": 5700,
  "currency": "usd",
  "orderId": "order_12345"
}
```

**Response:**
```json
{
  "clientSecret": "pi_..._secret_...",
  "status": "requires_payment_method"
}
```

---

## 🎯 Integration Examples

### Example 1: Fetch Products on Home Page

```typescript
// src/pages/Index.tsx
import { useProducts } from '@/hooks/useProducts';

export default function Index() {
  const { data: products, isLoading } = useProducts();

  return (
    <div>
      <Header />
      <main>
        {isLoading ? (
          <div>Loading products...</div>
        ) : (
          <ProductCarousel products={products} />
        )}
      </main>
      <Footer />
    </div>
  );
}
```

### Example 2: Submit Order

```typescript
// src/hooks/useCheckout.ts
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';

export function useCreateOrder() {
  return useMutation({
    mutationFn: async (orderData) => {
      const { data } = await api.post('/orders', orderData);
      return data;
    },
    onSuccess: (data) => {
      console.log('Order created:', data.id);
    },
    onError: (error) => {
      console.error('Order failed:', error.message);
    },
  });
}

// In component
import { useCreateOrder } from '@/hooks/useCheckout';

export function CheckoutForm() {
  const { mutate: createOrder, isPending } = useCreateOrder();

  const handleSubmit = async (formData) => {
    createOrder({
      items: cartItems,
      shippingAddress: formData,
      paymentMethod: 'stripe',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={isPending}>
        {isPending ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
}
```

### Example 3: Handle Errors

```typescript
import api from '@/lib/api';

async function fetchProducts() {
  try {
    const { data } = await api.get('/products');
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.error('Products not found');
    } else if (error.response?.status === 500) {
      console.error('Server error');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    throw error;
  }
}
```

---

## 🔐 Authentication Flow

### 1. User Logs In

```typescript
async function login(email: string, password: string) {
  const { data } = await api.post('/auth/login', { email, password });
  
  // Store token
  localStorage.setItem('auth_token', data.token);
  
  // Store user
  localStorage.setItem('user', JSON.stringify(data.user));
  
  return data;
}
```

### 2. Include Token in Requests

```typescript
// Automatically added by interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 3. Handle Token Expiry

```typescript
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const { data } = await api.post('/auth/refresh');
        localStorage.setItem('auth_token', data.token);

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
```

---

## 💳 Payment Integration

### Stripe Example

```bash
npm install @stripe/react-stripe-js @stripe/js
```

```typescript
// src/lib/stripe.ts
import { loadStripe } from '@stripe/js';

export const stripe = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY
);
```

```typescript
// src/pages/Checkout.tsx
import { Elements, CardElement, useStripe } from '@stripe/react-stripe-js';
import { stripe } from '@/lib/stripe';

export default function Checkout() {
  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  );
}

function CheckoutForm() {
  const stripe = useStripe();

  const handlePayment = async () => {
    const { error, paymentIntent } = await stripe?.confirmCardPayment(
      clientSecret
    );

    if (error) {
      console.error('Payment failed:', error);
    } else {
      console.log('Payment successful:', paymentIntent);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement />
      <button>Pay</button>
    </form>
  );
}
```

---

## 🚨 Error Handling Strategy

### Global Error Handler

```typescript
// src/lib/errorHandler.ts
export function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    switch (status) {
      case 400:
        return { message: 'Invalid request', type: 'validation' };
      case 401:
        return { message: 'Please log in', type: 'auth' };
      case 403:
        return { message: 'Access denied', type: 'auth' };
      case 404:
        return { message: 'Not found', type: 'not-found' };
      case 422:
        return { message, type: 'validation' };
      case 500:
        return { message: 'Server error', type: 'server' };
      default:
        return { message: 'Unknown error', type: 'unknown' };
    }
  }

  return { message: 'Unknown error', type: 'unknown' };
}
```

### Use in Components

```typescript
import { handleApiError } from '@/lib/errorHandler';

try {
  await api.post('/products', data);
} catch (error) {
  const { message, type } = handleApiError(error);
  
  if (type === 'validation') {
    // Show form errors
  } else if (type === 'auth') {
    // Redirect to login
  } else {
    // Show generic error toast
    showErrorToast(message);
  }
}
```

---

## 🧪 Testing API Integration

### Test with Mock Data

```typescript
// src/lib/api.mock.ts
export const mockProducts = [
  {
    id: 1,
    name: 'Pantheon',
    category: 'Earrings',
    price: '€2,850',
    image: 'https://...',
  },
];

// In development, intercept requests
if (import.meta.env.DEV) {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.config?.url === '/products') {
        return Promise.resolve({ data: mockProducts });
      }
      return Promise.reject(error);
    }
  );
}
```

### Test Endpoints with Postman

1. Download [Postman](https://postman.com)
2. Create collection for API
3. Add requests:
   ```
   GET http://localhost:3000/api/products
   POST http://localhost:3000/api/orders
   ```
4. Save environment variables
5. Share collection with team

---

## 📋 Response Format Best Practices

**Consistent response format:**

```json
{
  "success": true,
  "data": { /* actual data */ },
  "error": null,
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

**Error responses:**

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with ID 123 not found",
    "status": 404
  }
}
```

---

## 🔄 Caching Strategy

### Cache Products (1 hour)

```typescript
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => api.get('/products'),
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
```

### Cache Single Product (24 hours)

```typescript
export function useProduct(id: number) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => api.get(`/products/${id}`),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
```

### Invalidate Cache on Update

```typescript
function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.put(`/products/${data.id}`, data),
    onSuccess: () => {
      // Invalidate product queries
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
```

---

## 📚 Resources

- [Axios Documentation](https://axios-http.com)
- [React Query Documentation](https://tanstack.com/query)
- [Stripe Integration Guide](https://stripe.com/docs/stripe-js)
- [REST API Design Best Practices](https://restfulapi.net)

---

<div align="center">

**Ready to integrate with your backend?** Follow the quick start guide above. 🔌

[← Back to README](../README.md) | [Next: Component Guide →](COMPONENT_GUIDE.md)

</div>

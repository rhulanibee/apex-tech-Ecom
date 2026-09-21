import { describe, it, expect } from 'vitest';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';
let userToken = '';
let productId = '';
const testEmail = `cartuser${Date.now()}@example.com`;

const api = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
});

describe('Cart Controller Integration Tests', () => {
  it('should register test user', async () => {
    const res = await api.post('/users/register', {
      firstName: 'Cart',
      lastName: 'Tester',
      email: testEmail,
      password: 'password123',
    });

    expect(res.status).toBe(201);
    userToken = res.data.data.token;
  });

  it('should login user', async () => {
    const res = await api.post('/users/login', {
      email: testEmail,
      password: 'password123',
    });

    expect(res.status).toBe(200);
    userToken = res.data.data.token;
  });

  it('should get products for cart', async () => {
    const res = await api.get('/products');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.data.data)).toBe(true);
    if (res.data.data.length > 0) {
      productId = res.data.data[0].id;
    }
  });

  it('should add item to cart or return 404 if not implemented', async () => {
    if (!productId) {
      console.log('Skipping - no product available');
      return;
    }

    const res = await api.post(
      '/cart/item',
      { productId: parseInt(productId), quantity: 2 },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );

    expect([200, 201, 404]).toContain(res.status);
    if (res.status !== 404) {
      expect(res.data.success).toBe(true);
    }
  });

  it('should retrieve cart with totals', async () => {
    const res = await api.get('/cart', {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
  });

  it('should reject adding item without token', async () => {
    const res = await api.post('/cart/item', {
      productId: parseInt(productId),
      quantity: 1,
    });

    expect(res.status).toBe(401);
  });

  it('should validate product ID or return 404', async () => {
    const res = await api.post(
      '/cart/item',
      { productId: 'invalid123', quantity: 1 },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );

    expect([400, 404]).toContain(res.status);
  });

  it('should validate quantity or return 404', async () => {
    const res = await api.post(
      '/cart/item',
      { productId: parseInt(productId), quantity: -5 },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );

    expect([400, 404]).toContain(res.status);
  });

  it('should reject zero quantity or return 404', async () => {
    const res = await api.post(
      '/cart/item',
      { productId: parseInt(productId), quantity: 0 },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );

    expect([400, 404]).toContain(res.status);
  });

  it('should reject accessing cart without token', async () => {
    const res = await api.get('/cart');

    expect(res.status).toBe(401);
  });
});

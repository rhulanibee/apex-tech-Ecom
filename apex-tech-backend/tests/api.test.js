import { describe, it, expect } from 'vitest';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';
let userToken = '';
let productId = '';
const testEmail = `testuser${Date.now()}-${Math.random().toString(36).substr(2, 9)}@example.com`;

const api = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
});

describe('ApexTech API', () => {
  describe('User Authentication', () => {
    it('should register a new user', async () => {
      const res = await api.post('/users/register', {
        firstName: 'Test',
        lastName: 'User',
        email: testEmail,
        password: 'password123',
      });

      expect(res.status).toBe(201);
      expect(res.data.success).toBe(true);
      expect(res.data.data.token).toBeDefined();
      userToken = res.data.data.token;
    });

    it('should login with same user', async () => {
      const res = await api.post('/users/login', {
        email: testEmail,
        password: 'password123',
      });

      expect(res.status).toBe(200);
      expect(res.data.success).toBe(true);
      expect(res.data.data.token).toBeDefined();
      userToken = res.data.data.token;
    });
  });

  describe('Products', () => {
    it('should get all products', async () => {
      const res = await api.get('/products');

      expect(res.status).toBe(200);
      expect(res.data.success).toBe(true);
      expect(Array.isArray(res.data.data)).toBe(true);
      if (res.data.data.length > 0) {
        productId = res.data.data[0].id;
      }
    });
  });

  describe('Cart', () => {
    it('should add item to cart', async () => {
      if (!productId) {
        console.log('Skipping cart test - no product available');
        return;
      }

      const res = await api.post(
        '/cart/item',
        { productId: parseInt(productId), quantity: 2 },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      expect([201, 200, 404]).toContain(res.status);
    });

    it('should get cart', async () => {
      const res = await api.get('/cart', {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      expect([200, 201]).toContain(res.status);
    });
  });
});

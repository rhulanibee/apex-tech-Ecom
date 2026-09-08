import client from './client';

// GET /api/products?category=&isFlashDeal=
export const getProducts = (params = {}) => client.get('/products', { params });

// GET /api/products/:id
export const getProductById = (id) => client.get(`/products/${id}`);

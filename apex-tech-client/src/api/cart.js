import client from './client';

export const getCart = () => client.get('/cart');
export const addCartItem = (payload) => client.post('/cart/items', payload);
export const removeCartItem = (cartId, productId) =>
  client.delete(`/cart/${cartId}/items/${productId}`);

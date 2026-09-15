import client from './client';

export const getWishlist = () => client.get('/wishlist');
export const addWishlistItem = (productId) => client.post('/wishlist/items', { productId });
export const removeWishlistItem = (productId) => client.delete(`/wishlist/items/${productId}`);

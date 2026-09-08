import client from './client';

export const createOrder = (payload) => client.post('/orders', payload);
export const getMyOrders = () => client.get('/orders/mine');
export const getOrderById = (id) => client.get(`/orders/${id}`);

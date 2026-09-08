import client from './client';

export const registerUser = (payload) => client.post('/users/register', payload);
export const loginUser = (payload) => client.post('/users/login', payload);
export const getMe = () => client.get('/users/me');

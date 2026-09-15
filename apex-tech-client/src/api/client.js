import axios from 'axios';

// Centralized Axios instance. All API modules (products, cart, orders, auth)
// import THIS instead of calling axios directly, so base URL, auth headers,
// and error handling live in exactly one place.
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: attach the JWT (if we have one) to every outgoing request.
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('apexTechToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Auth-desync fix ---
// The old version cleared localStorage here on a 401 but never told React
// about it, so AuthContext kept believing the user was logged in while every
// subsequent request kept silently failing (looked like "forced re-login on
// add to cart"). AuthContext now subscribes via onUnauthorized() and calls
// its own logout() the moment this fires, keeping storage and UI in sync.
const unauthorizedListeners = new Set();
export const onUnauthorized = (callback) => {
  unauthorizedListeners.add(callback);
  return () => unauthorizedListeners.delete(callback);
};

// Response interceptor: unwrap the backend's { success, data, message } shape
// and normalize errors into something components can display directly.
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      (error.code === 'ERR_NETWORK'
        ? 'Cannot reach the server. Is the backend running?'
        : 'Something went wrong. Please try again.');

    if (error.response?.status === 401) {
      unauthorizedListeners.forEach((cb) => cb());
    }

    return Promise.reject({ message, status: error.response?.status });
  }
);

export default client;

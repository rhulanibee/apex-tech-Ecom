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

// Response interceptor: unwrap the backend's { success, data, message } shape
// and normalize errors into something components can display directly.
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';

    // If the token is invalid/expired, clear it so the UI can fall back to
    // logged-out state instead of silently failing every subsequent request.
    if (error.response?.status === 401) {
      localStorage.removeItem('apexTechToken');
      localStorage.removeItem('apexTechUser');
    }

    return Promise.reject({ message, status: error.response?.status });
  }
);

export default client;

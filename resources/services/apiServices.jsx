import axios from 'axios';

const API_BASE_URL = window.env.API_BASE_URL;

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add CSRF token to every request
apiService.interceptors.request.use(
  (config) => {
    // Get CSRF token from meta tag and add it to request headers
    const csrfToken = document.querySelector('meta[name="csrf-token"]');
    if (csrfToken) {
      const token = csrfToken.getAttribute('content');
      if (token) {
        config.headers['X-CSRF-TOKEN'] = token;
      }
    }

    // Add Authorization header if available
    const authToken = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiService;

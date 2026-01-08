import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// Get API base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add authorization token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        // Handle common errors
        if (error.response) {
            // Server responded with error status
            const status = error.response.status;

            switch (status) {
                case 401:
                    // Unauthorized - clear token and redirect to login
                    localStorage.removeItem('auth_token');
                    window.location.href = '/login';
                    break;
                case 403:
                    console.error('Forbidden: You do not have permission');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
                default:
                    console.error(`Error ${status}:`, error.response.data);
            }
        } else if (error.request) {
            // Request made but no response
            console.error('Network error: No response from server');
        } else {
            // Error in request setup
            console.error('Request error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;

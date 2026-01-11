import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// Get API base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
        // Extract error data from backend response
        const errorData = error.response?.data as any;
        const status = error.response?.status;

        // Determine error message
        let message = 'An unexpected error occurred';

        if (errorData?.message) {
            // Backend provided a message
            message = errorData.message;
        } else if (status === 400) {
            message = 'Invalid request data';
        } else if (status === 404) {
            message = 'Resource not found';
        } else if (status === 500) {
            message = 'Server error occurred';
        } else if (!error.response) {
            message = 'Network error - please check your connection';
        }

        // Handle authentication errors
        if (status === 401) {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
            message = 'Session expired - please login again';
        }

        // Create enhanced error with extracted message
        const enhancedError = new Error(message);
        (enhancedError as any).status = status;
        (enhancedError as any).data = errorData;

        return Promise.reject(enhancedError);
    }
);

export default apiClient;

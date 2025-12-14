/**
 * API Client Configuration
 * Base axios instance with interceptors for authentication and error handling
 */
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// API base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Initialize mock token for development if none exists
if (!localStorage.getItem('auth_token')) {
  // Create a mock token for development (backend uses stub auth)
  localStorage.setItem('auth_token', 'mock-dev-token-123');
  localStorage.setItem('user', JSON.stringify({
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'user@example.com',
    name: 'Mock User'
  }));
}

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    // Extract data from standard API response format
    if (response.data?.success && response.data?.data !== undefined) {
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error: AxiosError<any>) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    // Format error message
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

// Standard API response types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message?: string;
  data: T[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

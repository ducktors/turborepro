import axios from 'axios';
import type { ApiResponse, ApiError } from '@turborepro/shared';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data as ApiResponse<unknown>,
  (error) => {
    const apiError: ApiError = {
      code: error.response?.data?.code || 'UNKNOWN_ERROR',
      message: error.response?.data?.message || 'An unexpected error occurred',
      details: error.response?.data?.details,
    };
    return Promise.reject(apiError);
  }
);

export default api; 

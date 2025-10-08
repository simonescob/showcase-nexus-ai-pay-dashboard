import axios from 'axios';

// Get base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Log when VITE_API_BASE_URL is loaded and its value
console.log('VITE_API_BASE_URL loaded:', API_BASE_URL);

// Rate limiting configuration
const RATE_LIMIT_DELAY = 1000; // 1 second between requests
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second base delay for retries

// Simple in-memory rate limiting
let lastRequestTime = 0;

// Utility function for delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Rate limiting function
const enforceRateLimit = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    const waitTime = RATE_LIMIT_DELAY - timeSinceLastRequest;
    await delay(waitTime);
  }

  lastRequestTime = Date.now();
};

// Retry function with exponential backoff
const retryRequest = async (requestFn, retries = MAX_RETRIES) => {
  try {
    return await requestFn();
  } catch (error) {
    if (retries > 0 && (
      error.code === 'ECONNABORTED' || // Timeout
      error.response?.status >= 500 || // Server errors
      error.code === 'NETWORK_ERROR'   // Network issues
    )) {
      const delayTime = RETRY_DELAY * (MAX_RETRIES - retries + 1);
      await delay(delayTime);
      return retryRequest(requestFn, retries - 1);
    }
    throw error;
  }
};

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token and rate limiting
apiClient.interceptors.request.use(
  async (config) => {
    // Apply rate limiting
    await enforceRateLimit();

    // Add auth token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log API request
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
      headers: config.headers,
      data: config.data,
      timestamp: new Date().toISOString()
    });

    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh, errors, and retries
apiClient.interceptors.response.use(
  (response) => {
    // Log successful API response
    console.log(`API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      data: response.data,
      timestamp: new Date().toISOString()
    });
    return response;
  },
  async (error) => {
    // Log API error
    console.error('API Error:', {
      status: error.response?.status,
      method: error.config?.method?.toUpperCase(),
      url: error.config?.url,
      data: error.response?.data,
      message: error.message,
      timestamp: new Date().toISOString()
    });

    if (error.response?.status === 401) {
      // Token expired or invalid, clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // For other errors, the retry logic is handled in individual API calls
    return Promise.reject(error);
  }
);

export const api = {
  // Authentication endpoints
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/api/v1/auth/login', {
        email,
        password,
      });

      const jsonResponse = response.data;
      if (jsonResponse.error) {
        throw new Error(jsonResponse.message || 'Login failed');
      }

      const { access_token } = jsonResponse.data;
      return {
        token: access_token,
      };
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Login failed');
    }
  },

  register: async (email, password, firstName, lastName) => {
    try {
      const response = await apiClient.post('/api/v1/auth/register', {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      const jsonResponse = response.data;
      if (jsonResponse.error) {
        throw new Error(jsonResponse.message || 'Registration failed');
      }

      const { access_token } = jsonResponse.data;
      return {
        token: access_token,
      };
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Registration failed');
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/api/v1/auth/me');
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to get user profile');
    }
  },

  // Task management endpoints
  getTasks: async (params = {}) => {
    try {
      const response = await retryRequest(() =>
        apiClient.get('/api/v1/dashboard/tasks', { params })
      );
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch tasks');
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await apiClient.post('/api/v1/dashboard/tasks', {
        title: taskData.title,
        description: taskData.description || '',
        completed: taskData.completed || false,
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to create task');
    }
  },

  updateTask: async (taskId, taskData) => {
    try {
      const response = await apiClient.put(`/api/v1/dashboard/tasks/${taskId}`, {
        title: taskData.title,
        description: taskData.description || '',
        completed: taskData.completed,
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to update task');
    }
  },

  deleteTask: async (taskId) => {
    try {
      await apiClient.delete(`/api/v1/dashboard/tasks/${taskId}`);
      return true;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to delete task');
    }
  },

  // Billing endpoints
  getPlans: async () => {
    try {
      const response = await apiClient.get('/api/v1/billing/plans');
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch subscription plans');
    }
  },


  createPaymentIntent: async (planId, amount, paymentMethodId, email) => {
    try {
      const response = await apiClient.post('/billing/create-payment-intent', {
        // plan: planId,
        amount: amount,
        payment_method_id: paymentMethodId,
        email: email,
      });
      // Include the plan property in the billing section of the API response
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to create payment intent');
    }
  },

  createCustomerPortal: async () => {
    try {
      const response = await apiClient.get('/api/v1/billing/customer-portal');
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to create customer portal session');
    }
  },

  // Analytics endpoints
  getAnalytics: async () => {
    try {
      const response = await apiClient.get('/api/v1/dashboard/analytics');
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch analytics data');
    }
  },

  // User management endpoints
  getUserProfile: async () => {
    try {
      const response = await apiClient.get('/api/v1/users/me');
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch user profile');
    }
  },

  updateUserProfile: async (userData) => {
    try {
      const response = await apiClient.put('/api/v1/users/me', userData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to update user profile');
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.data;
    } catch (error) {
      throw new Error('Backend is not responding');
    }
  },
};
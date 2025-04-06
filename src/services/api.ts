
import { toast } from 'sonner';

const API_BASE_URL = 'http://localhost:8000/api';

// Helper function for making API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  } catch (error: any) {
    console.error('API request error:', error);
    toast.error(error.message || 'An error occurred');
    throw error;
  }
};

// Authentication services
export const authAPI = {
  register: async (userData: { name: string; email: string; password: string; password_confirmation: string }) => {
    return apiRequest('/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },
  
  login: async (credentials: { email: string; password: string }) => {
    return apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },
  
  logout: async () => {
    return apiRequest('/logout', {
      method: 'POST'
    });
  }
};

// User services
export const userAPI = {
  getCurrentUser: async () => {
    return apiRequest('/user');
  }
};

// You can add more API services here as needed

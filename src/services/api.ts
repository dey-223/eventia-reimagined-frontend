
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
  },

  updateProfile: async (profileData: any) => {
    return apiRequest('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },

  changePassword: async (passwordData: { current_password: string; password: string; password_confirmation: string }) => {
    return apiRequest('/password', {
      method: 'PUT',
      body: JSON.stringify(passwordData)
    });
  }
};

// Event services
export const eventAPI = {
  // Get all events
  getEvents: async (params = {}) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/events?${queryString}` : '/events';
    
    return apiRequest(endpoint);
  },
  
  // Get a single event by ID
  getEvent: async (id: number | string) => {
    return apiRequest(`/events/${id}`);
  },
  
  // Create a new event
  createEvent: async (eventData: any) => {
    return apiRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  },
  
  // Update an existing event
  updateEvent: async (id: number | string, eventData: any) => {
    return apiRequest(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData)
    });
  },
  
  // Delete an event
  deleteEvent: async (id: number | string) => {
    return apiRequest(`/events/${id}`, {
      method: 'DELETE'
    });
  },
  
  // Get attendees for an event
  getEventAttendees: async (eventId: number | string, params = {}) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/events/${eventId}/attendees?${queryString}` : `/events/${eventId}/attendees`;
    
    return apiRequest(endpoint);
  },
  
  // Register an attendee for an event
  registerAttendee: async (eventId: number | string, attendeeData: any) => {
    return apiRequest(`/events/${eventId}/attendees`, {
      method: 'POST',
      body: JSON.stringify(attendeeData)
    });
  },
  
  // Update an attendee's registration
  updateAttendeeRegistration: async (eventId: number | string, attendeeId: number | string, data: any) => {
    return apiRequest(`/events/${eventId}/attendees/${attendeeId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  
  // Remove an attendee from an event
  removeAttendee: async (eventId: number | string, attendeeId: number | string) => {
    return apiRequest(`/events/${eventId}/attendees/${attendeeId}`, {
      method: 'DELETE'
    });
  },
  
  // Get event statistics
  getEventStatistics: async (eventId: number | string) => {
    return apiRequest(`/events/${eventId}/statistics`);
  },
  
  // Send communication to event attendees
  sendCommunication: async (eventId: number | string, communicationData: any) => {
    return apiRequest(`/events/${eventId}/communications`, {
      method: 'POST',
      body: JSON.stringify(communicationData)
    });
  },
  
  // Export event attendees list
  exportAttendees: async (eventId: number | string, format = 'csv') => {
    return apiRequest(`/events/${eventId}/export-attendees?format=${format}`);
  },
  
  // Get dashboard overview statistics
  getDashboardStatistics: async () => {
    return apiRequest('/dashboard/statistics');
  },
};

// Utility services
export const utilAPI = {
  // Get available categories
  getCategories: async () => {
    return apiRequest('/categories');
  },
  
  // Get available ticket types
  getTicketTypes: async () => {
    return apiRequest('/ticket-types');
  },
  
  // Upload file (e.g., event image)
  uploadFile: async (file: File, type = 'event') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    // Note: When sending FormData, don't set Content-Type header, browser will set it automatically
    return fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
      },
      body: formData
    }).then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.message || 'Failed to upload file');
        });
      }
      return response.json();
    });
  }
};

export default {
  auth: authAPI,
  user: userAPI,
  event: eventAPI,
  util: utilAPI
};

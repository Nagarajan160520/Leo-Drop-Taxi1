import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API URL - Update this based on your backend deployment
  const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://leo-drop-taxi.onrender.com/api'  // Your Render backend URL
    : 'http://localhost:5000/api';  // Local development

  // Set axios defaults
  axios.defaults.baseURL = API_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.timeout = 10000; // 10 seconds timeout

  // Add request interceptor for debugging
  axios.interceptors.request.use(
    (config) => {
      console.log(`🚀 ${config.method.toUpperCase()} request to ${config.url}`);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor for error handling
  axios.interceptors.response.use(
    (response) => {
      console.log('✅ Response received:', response.status);
      return response;
    },
    (error) => {
      console.error('❌ Response error:', error.message);
      
      if (error.code === 'ECONNABORTED') {
        toast.error('Request timeout - server is slow');
      } else if (!error.response) {
        toast.error('Network error - cannot connect to server');
      } else if (error.response.status === 401) {
        // Unauthorized - clear token
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      }
      
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await fetchUser();
      } else {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      console.log('Fetching user data...');
      
      const { data } = await axios.get('/auth/me');
      
      if (data.success && data.data) {
        setUser(data.data);
        console.log('User data loaded:', data.data.name);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Fetch user error:', error);
      
      // Clear invalid token
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      
      // Show error message only if not loading
      if (!loading) {
        toast.error('Session expired. Please login again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Registering user:', userData.email);
      
      const { data } = await axios.post('/auth/register', userData);
      
      if (data.success && data.data) {
        // Save token
        localStorage.setItem('token', data.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
        
        // Set user
        setUser(data.data);
        
        toast.success(`Welcome to Leo Drop Taxi, ${data.data.name}! 🚖`);
        return { success: true, data: data.data };
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Register error:', error);
      
      let message = 'Registration failed';
      
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.response?.data?.errors) {
        message = error.response.data.errors.map(e => e.msg).join(', ');
      } else if (error.message) {
        message = error.message;
      }
      
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Logging in user:', email);
      
      const { data } = await axios.post('/auth/login', { email, password });
      
      if (data.success && data.data) {
        // Save token
        localStorage.setItem('token', data.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
        
        // Set user
        setUser(data.data);
        
        toast.success(`Welcome back, ${data.data.name}! 🚖`);
        return { success: true, data: data.data };
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      let message = 'Login failed';
      
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.response?.status === 401) {
        message = 'Invalid email or password';
      } else if (error.message) {
        message = error.message;
      }
      
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('localBookings');
    
    // Clear axios headers
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear user state
    setUser(null);
    setError(null);
    
    toast.info('Logged out successfully. See you again! 👋');
  };

  const updateUserProfile = async (userData) => {
    try {
      setLoading(true);
      
      const { data } = await axios.put('/auth/updatedetails', userData);
      
      if (data.success) {
        setUser(prev => ({ ...prev, ...data.data }));
        toast.success('Profile updated successfully');
        return { success: true, data: data.data };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
      return { success: false, error: error.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      
      const { data } = await axios.put('/auth/updatepassword', {
        currentPassword,
        newPassword
      });
      
      if (data.success) {
        toast.success('Password changed successfully');
        return { success: true };
      }
    } catch (error) {
      console.error('Change password error:', error);
      toast.error(error.response?.data?.message || 'Failed to change password');
      return { success: false, error: error.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateUserProfile,
    changePassword,
    API_URL,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
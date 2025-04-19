import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your laptop's IP address if testing on a mobile device
const API_URL = 'http://192.168.162.244:3000';

const api = {
  register: async (user: { name: string; email: string; password: string; city: string; role: string }) => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/register`, user);
      return response.data.user; // Expecting { name, email, city, role, _id } from server
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Something went wrong. Please try again.');
      }
    }
  },

  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/login`, credentials);
      const { token, role } = response.data;
  
      if (!token) throw new Error("Token not received from server");
  
      await AsyncStorage.setItem('access_token', token); // Store token
  
      return { token, role }; // Return both
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Login failed. Please try again.');
      }
    }
  },

  getUser: async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) throw new Error('No token found. Please log in.');
      const response = await axios.get(`${API_URL}/api/v1/user/getUser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.user; // Expecting user object without password
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to fetch user. Please try again.');
      }
    }
  },

  logout: async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        await axios.post(`${API_URL}/api/v1/user/logout`, {}, { headers: { Authorization: `Bearer ${token}` } });
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('currentUser'); // Clear user data
      }
      return { success: true };
    } catch (error: any) {
      throw new Error('Logout failed. Please try again.');
    }
  },
};

export { api };
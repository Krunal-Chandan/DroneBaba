import axios from 'axios';

// Replace with your laptop's IP address if testing on a mobile device
// const API_URL = 'http://localhost:8000'; // Use http://<your-laptop-ip>:8000 for mobile testing
const API_URL = 'http://192.168.204.244:8000'; // Use http://<your-laptop-ip>:8000 for mobile testing

export const api = {
  // Register a new user
  register: async (user: { name: string; email: string; password: string; city: string; role: string }) => {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
  },

  // Login a user
  login: async (user: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/login`, user);
    return response.data;
  },

  // Fetch all users
  getAllUsers: async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },

  // Create a farmer
  createFarmer: async (farmer: any) => {
    const response = await axios.post(`${API_URL}/farmers`, farmer);
    return response.data;
  },

  // Get a farmer by ID
  getFarmer: async (farmerId: number) => {
    const response = await axios.get(`${API_URL}/farmers/${farmerId}`);
    return response.data;
  },

  // Create a drone owner
  createDroneOwner: async (droneOwner: any) => {
    const response = await axios.post(`${API_URL}/drone_owners`, droneOwner);
    return response.data;
  },

  // Get a drone owner by ID
  getDroneOwner: async (droneOwnerId: number) => {
    const response = await axios.get(`${API_URL}/drone_owners/${droneOwnerId}`);
    return response.data;
  },

  // Create a pilot
  createPilot: async (pilot: any) => {
    const response = await axios.post(`${API_URL}/pilots`, pilot);
    return response.data;
  },

  // Get a pilot by ID
  getPilot: async (pilotId: number) => {
    const response = await axios.get(`${API_URL}/pilots/${pilotId}`);
    return response.data;
  },
};
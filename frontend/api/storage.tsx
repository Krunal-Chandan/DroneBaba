import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  // Save users to local storage
  saveUsers: async (users: any[]) => {
    try {
      await AsyncStorage.setItem('users', JSON.stringify(users));
    } catch (err) {
      console.error('Error saving users to storage:', err);
    }
  },

  // Get users from local storage
  getUsers: async () => {
    try {
      const users = await AsyncStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    } catch (err) {
      console.error('Error getting users from storage:', err);
      return [];
    }
  },

  // Save current user
  saveCurrentUser: async (user: any) => {
    try {
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
    } catch (err) {
      console.error('Error saving current user:', err);
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const user = await AsyncStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch (err) {
      console.error('Error getting current user:', err);
      return null;
    }
  },
};
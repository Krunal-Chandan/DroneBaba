import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '@/api/api'; // Adjust the path as needed
import { storage } from '@/api/storage'; // Adjust the path as needed

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required!');
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      // Authenticate with the server
      const user = await api.login({ email, password });
      console.log('Logged in user:', user); // Log the user data
  
      // Fetch all users and cache them locally
      const users = await api.getAllUsers();
      console.log('Fetched users:', users); // Log the fetched users
      await storage.saveUsers(users);
  
      // Save the current user
      await storage.saveCurrentUser(user);
  
      // Navigate to the appropriate home screen based on role
      if (user.role === 'Farmer') {
        router.replace({ pathname: '/Farmer/fhome', params: { userId: user.id.toString() } });
      } else if (user.role === 'DroneOwner') {
        router.replace({ pathname: '/drone-owner/dhome', params: { userId: user.id.toString() } });
      } else if (user.role === 'Pilot') {
        router.replace({ pathname: '/Pilot/pilotHome', params: { userId: user.id.toString() } });
      } else {
        setError('Invalid role');
      }
    } catch (err: any) {
      console.error('Login error:', err); // Log the full error
      console.error('Error response:', err.response?.data); // Log the server response (if any)
      setError(err.response?.data?.detail || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/MainLogo.png')}
        style={styles.logo}
      />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
            value={password}
            style={styles.passwordInput}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
            <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#666" />
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(auth)/register')}>
          <Text style={styles.link}>Don't have an account? Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
          <MaterialCommunityIcons name="google" size={24} color="#666" />
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F6FA',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#F9F9F9',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonDisabled: {
    backgroundColor: '#95A5A6',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  error: {
    color: '#E74C3C',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  link: {
    fontSize: 14,
    color: '#3498DB',
    marginBottom: 15,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  googleText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
});
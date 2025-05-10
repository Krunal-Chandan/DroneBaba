import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '@/api/api'; // Adjust the path as needed
import { storage } from '@/api/storage'; // Adjust the path as needed

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [role, setRole] = useState<string | undefined>(undefined);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { selectedCity } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (typeof selectedCity === 'string') {
      setCity(selectedCity);
    }
  }, [selectedCity]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !city) {
      setError('All fields are required!');
      return;
    }
    if (!role) {
      setError('Please select a role!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await api.register({ name, email, password, city, role });
      console.log('Registered user:', user); 

      router.replace({ pathname: '/(auth)/login' });
    } catch (err: any) {
      console.error('Registration error:', err); 
      console.error('Error response:', err.response?.data); 
      // setError(err.response?.data?.detail || 'Registration failed. Email might be in use.');
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roles = ['Farmer', 'Drone Owner', 'Pilot'];

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/MainLogo.png')}
        style={styles.logo}
      />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Account</Text>
        <TextInput
          placeholder="Name"
          onChangeText={setName}
          value={name}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="City"
          onChangeText={setCity}
          value={city}
          style={styles.input}
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
        <Text style={styles.roleLabel}>Select Role:</Text>
        <View style={styles.radioGroup}>
          {roles.map(r => (
            <TouchableOpacity
              key={r}
              style={[styles.radioButton, role === r && styles.radioButtonSelected]}
              onPress={() => setRole(r)}
            >
              <Text style={[styles.radioText, role === r && styles.radioTextSelected]}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
          <Text style={styles.link}>Already have an account? Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
          <MaterialCommunityIcons name="google" size={24} color="#666" />
          <Text style={styles.googleText}>Sign up with Google</Text>
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
  roleLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  radioButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#2ECC71',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  radioButtonSelected: {
    backgroundColor: '#2ECC71',
  },
  radioText: {
    fontSize: 14,
    color: '#2ECC71',
  },
  radioTextSelected: {
    color: '#FFF',
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
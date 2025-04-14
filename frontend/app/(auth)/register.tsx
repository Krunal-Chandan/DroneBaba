// import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
// import React, { useMemo, useState, useEffect } from 'react';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import Colors from '@/components/Colors';
// import Button from '@/components/shared/button';
// import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { UserDB } from '@/components/database/UserDB';
// import * as Crypto from 'expo-crypto';

// export default function Register() {
//   const [name, onChangeName] = React.useState('');
//   const [email, onChangeEmail] = React.useState('');
//   const [pass, onChangePass] = React.useState('');
//   const [error, setError] = React.useState('');
//   const [selectedId, setSelectedId] = useState<string | undefined>();
//   const { selectedCity } = useLocalSearchParams();
//   const [city, setCity] = React.useState<string>(typeof selectedCity === 'string' ? selectedCity : '');
//   const { createUser } = UserDB();
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     if (typeof selectedCity === 'string') setCity(selectedCity);
//   }, [selectedCity]);

//   const radioButtons: RadioButtonProps[] = useMemo(() => ([
//     { id: '1', label: 'Farmer', value: 'Farmer', labelStyle: styles.label, containerStyle: styles.radioContainer },
//     { id: '2', label: 'Drone Owner', value: 'DroneOwner', labelStyle: styles.label, containerStyle: styles.radioContainer },
//     { id: '3', label: 'Pilot', value: 'Pilot', labelStyle: styles.label, containerStyle: styles.radioContainer }
//   ]), []);

//   const hashPassword = async (password: string) => {
//     return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA384, password);
//   };

//   const handleRegister = async () => {
//     if (!name || !email || !pass || !city) {
//       setError('** All fields are required! **');
//       return;
//     }
//     if (!selectedId) {
//       setError('Please select a valid role!');
//       return;
//     }
//     try {
//       const hashedPass = await hashPassword(pass);
//       const userId = await createUser({ name, email, pass: hashedPass, city, role: selectedId });
//       setError('');
//       if (selectedId === 'Farmer') {
//         router.replace({ pathname: '/Farmer/fhome', params: { userId: userId.toString() } });
//       } else if (selectedId === 'DroneOwner') {
//         router.replace({ pathname: '/drone-owner/dhome', params: { userId: userId.toString() } });
//       } else if (selectedId === 'Pilot') {
//         router.replace({ pathname: '/Pilot/pilotHome', params: { userId: userId.toString() } });
//       }
//     } catch (err) {
//       setError('Registration failed. Email might be in use.');
//     }
//   };

//   const toggleShowPassword = () => setShowPassword(!showPassword);

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("./../../assets/images/MainLogo.png")}
//         style={styles.logo}
//       />
//       <View style={styles.formContainer}>
//         <Text style={styles.title}>Create Account</Text>
//         <TextInput
//           placeholder="Name"
//           onChangeText={onChangeName}
//           value={name}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Email"
//           keyboardType="email-address"
//           onChangeText={onChangeEmail}
//           value={email}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="City"
//           onChangeText={setCity}
//           value={city}
//           style={styles.input}
//         />
//         <View style={styles.passwordContainer}>
//           <TextInput
//             placeholder="Password"
//             secureTextEntry={!showPassword}
//             onChangeText={onChangePass}
//             value={pass}
//             style={styles.passwordInput}
//           />
//           <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
//             <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#666" />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.radioGroup}>
//           <RadioGroup
//             radioButtons={radioButtons}
//             onPress={(id) => setSelectedId(radioButtons.find(rb => rb.id === id)?.value)}
//             selectedId={radioButtons.find(rb => rb.value === selectedId)?.id}
//             layout="row"
//           />
//         </View>
//         <Button style={styles.button} text="Register" onPress={handleRegister} />
//         {error ? <Text style={styles.error}>{error}</Text> : null}
//         <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
//           <Text style={styles.link}>Already have an account? Sign In</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.googleButton}>
//           <MaterialCommunityIcons name="google" size={24} color="#666" />
//           <Text style={styles.googleText}>Google</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#F5F6FA',
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 20,
//   },
//   formContainer: {
//     width: '90%',
//     backgroundColor: '#FFF',
//     borderRadius: 15,
//     padding: 20,
//     alignItems: 'center',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     fontSize: 16,
//     color: '#333',
//     backgroundColor: '#F9F9F9',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 8,
//     backgroundColor: '#F9F9F9',
//     marginBottom: 15,
//   },
//   passwordInput: {
//     flex: 1,
//     height: 50,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     color: '#333',
//   },
//   eyeIcon: {
//     padding: 10,
//   },
//   radioGroup: {
//     marginVertical: 15,
//   },
//   radioContainer: {
//     marginHorizontal: 10,
//   },
//   label: {
//     fontSize: 16,
//     color: '#333',
//   },
//   button: {
//     marginVertical: 15,
//   },
//   error: {
//     color: '#E74C3C',
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   link: {
//     fontSize: 14,
//     color: '#3498DB',
//     marginBottom: 15,
//   },
//   googleButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F1F1F1',
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     opacity: 0.7,
//   },
//   googleText: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: '#666',
//   },
// });

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

  // const handleRegister = async () => {
  //   if (!name || !email || !password || !city) {
  //     setError('All fields are required!');
  //     return;
  //   }
  //   if (!role) {
  //     setError('Please select a role!');
  //     return;
  //   }

  //   setLoading(true);
  //   setError('');

  //   try {
  //     // Register the user on the server
  //     const user = await api.register({ name, email, password, city, role });

  //     // Fetch all users and cache them locally
  //     const users = await api.getAllUsers();
  //     await storage.saveUsers(users);

  //     // Save the current user
  //     await storage.saveCurrentUser(user);

  //     // Navigate to the appropriate home screen based on role
  //     if (role === 'Farmer') {
  //       router.replace({ pathname: '/Farmer/fhome', params: { userId: user.id.toString() } });
  //     } else if (role === 'DroneOwner') {
  //       router.replace({ pathname: '/drone-owner/dhome', params: { userId: user.id.toString() } });
  //     } else if (role === 'Pilot') {
  //       router.replace({ pathname: '/Pilot/pilotHome', params: { userId: user.id.toString() } });
  //     }
  //   } catch (err) {
  //     setError('Registration failed. Email might be in use.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
      // Register the user on the server
      const user = await api.register({ name, email, password, city, role });
      console.log('Registered user:', user); // Log the user data
  
      // Fetch all users and cache them locally
      const users = await api.getAllUsers();
      console.log('Fetched users:', users); // Log the fetched users
      await storage.saveUsers(users);
  
      // Save the current user
      await storage.saveCurrentUser(user);
  
      // Navigate to the appropriate home screen based on role
      if (role === 'Farmer') {
        router.replace({ pathname: '/Farmer/fhome', params: { userId: user.id.toString() } });
      } else if (role === 'DroneOwner') {
        router.replace({ pathname: '/drone-owner/dhome', params: { userId: user.id.toString() } });
      } else if (role === 'Pilot') {
        router.replace({ pathname: '/Pilot/pilotHome', params: { userId: user.id.toString() } });
      }
    } catch (err: any) {
      console.error('Registration error:', err); // Log the full error
      console.error('Error response:', err.response?.data); // Log the server response (if any)
      setError(err.response?.data?.detail || 'Registration failed. Email might be in use.');
    } finally {
      setLoading(false);
    }
  };

  const roles = ['Farmer', 'DroneOwner', 'Pilot'];

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
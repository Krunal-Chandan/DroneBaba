import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '@/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddDrone() {
  const [droneName, setDroneName] = useState('');
  const [droneType, setDroneType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [pricePerAcre, setPricePerAcre] = useState('');
  const [durability, setDurability] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [isNGOSupported, setIsNGOSupported] = useState<boolean | null>(null);
  const [ngoName, setNgoName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddDrone = async () => {
    if (!droneName || !droneType || !capacity || !pricePerAcre || !durability || !purchaseDate || isNGOSupported === null) {
      Alert.alert('Error', 'All fields except NGO Name (if not NGO) are required!');
      return;
    }

    setLoading(true);
    try {
      const droneData = {
        name: droneName,
        type: droneType,
        capacity,
        pricePerAcre,
        durability,
        purchasedDate: purchaseDate,
        isNGO: isNGOSupported,
        ngoName: isNGOSupported ? ngoName : undefined,
      };
      const response = await api.addDrone(droneData);
      Alert.alert('Success', `Drone "${droneName}" added successfully! Drone ID: ${response.droneId}`, [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to add drone.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add New Drone</Text>
      <TextInput
        style={styles.input}
        placeholder="Drone Name"
        value={droneName}
        onChangeText={setDroneName}
      />
      <TextInput
        style={styles.input}
        placeholder="Drone Type"
        value={droneType}
        onChangeText={setDroneType}
      />
      <TextInput
        style={styles.input}
        placeholder="Capacity (e.g., 10L)"
        value={capacity}
        onChangeText={setCapacity}
      />
      <TextInput
        style={styles.input}
        placeholder="Price Per Acre (e.g., 50)"
        value={pricePerAcre}
        onChangeText={setPricePerAcre}
      />
      <TextInput
        style={styles.input}
        placeholder="Durability (e.g., 30 min)"
        value={durability}
        onChangeText={setDurability}
      />
      <TextInput
        style={styles.input}
        placeholder="Purchase Date (e.g., 2025-04-09)"
        value={purchaseDate}
        onChangeText={setPurchaseDate}
      />
      <Text style={styles.label}>NGO Supported?</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setIsNGOSupported(true)}
        >
          <View style={[styles.radioCircle, isNGOSupported === true && styles.radioSelected]}>
            {isNGOSupported === true && <View style={styles.radioInnerCircle} />}
          </View>
          <Text>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setIsNGOSupported(false)}
        >
          <View style={[styles.radioCircle, isNGOSupported === false && styles.radioSelected]}>
            {isNGOSupported === false && <View style={styles.radioInnerCircle} />}
          </View>
          <Text>No</Text>
        </TouchableOpacity>
      </View>
      {isNGOSupported && (
        <TextInput
          style={styles.input}
          placeholder="NGO Name"
          value={ngoName}
          onChangeText={setNgoName}
        />
      )}
      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleAddDrone}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Adding...' : 'Add Drone'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  radioSelected: {
    backgroundColor: '#007bff',
  },
  radioInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#95C2DE',
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
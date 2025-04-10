import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddDrone() {
  const [droneName, setDroneName] = useState('');
  const [droneType, setDroneType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [batteryDurability, setBatteryDurability] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [isNGOSupported, setIsNGOSupported] = useState<boolean | null>(null); // For radio buttons
  const router = useRouter();

  const handleAddDrone = () => {
    if (!droneName || !droneType || !capacity || !batteryDurability || !purchaseDate || isNGOSupported === null) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    // Simulate adding drone (replace with API call later)
    const droneData = {
      droneName,
      droneType,
      capacity,
      batteryDurability,
      purchaseDate,
      isNGOSupported,
    };
    Alert.alert('Success', `Drone "${droneName}" added successfully!`, [
      { text: 'OK', onPress: () => router.back() },
    ]);
    console.log('Drone added:', droneData); // Log for debugging
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
        placeholder="Battery Durability (e.g., 30 min)"
        value={batteryDurability}
        onChangeText={setBatteryDurability}
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
      <TouchableOpacity style={styles.button} onPress={handleAddDrone}>
        <Text style={styles.buttonText}>Add Drone</Text>
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
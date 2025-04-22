import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@/api/api';

export default function DHome() {
  const workItems = [
    {
      id: 1,
      name: 'John Doe, Nagpur',
      details: 'Area: 5 Acres\nType: Standard\nDate: 2025-04-06 10:00\nEarning: ₹2500',
      link: 'https://maps.app.goo.gl/16MGbR9QGimPu9tb8',
    },
    {
      id: 2,
      name: 'Jane Smith, Pune',
      details: 'Area: 3 Acres\nType: Premium\nDate: 2025-04-07 14:00\nEarning: ₹1800',
      link: 'https://maps.app.goo.gl/w6CPAPLb7J6dBGyL8',
    },
  ];

  const router = useRouter();
  const [locationDetailsExist, setLocationDetailsExist] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLocationDetails = async () => {
      try {
        const res = await api.getUserLocationDetails(); // Adjust this call to match your actual API
        if (res && res.data) {
          await AsyncStorage.setItem('locationDetails', JSON.stringify(res.data));
          setLocationDetailsExist(true);
        } else {
          setLocationDetailsExist(false);
        }
      } catch (err) {
        console.error('Error fetching location details:', err);
        setLocationDetailsExist(false);
      }
    };
  
    checkLocationDetails();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.headerButton}>
          <TouchableOpacity style={{ marginRight: 20 }}>
            <MaterialIcons name="notifications" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/drone-owner-Profile/drone-owner-Profile')}>
            <MaterialIcons name="account-circle" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading the update profile */}
      {locationDetailsExist === false && (
        <TouchableOpacity
          style={styles.profilePrompt}
          onPress={() => router.push('/locDetails')}
        >
          <Text style={styles.profilePromptText}>🚨 Please complete your profile to continue.</Text>
        </TouchableOpacity>
      )}

      {/* Title */}
      <Text style={styles.title}>Today's Work</Text>

      {/* Work Items */}
      <ScrollView style={styles.scrollView}>
        {workItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDetails}>{item.details}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.acceptButton} onPress={() => alert(`Accepted job for ${item.name}`)}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ignoreButton} onPress={() => alert(`Ignored job for ${item.name}`)}>
                <Text style={styles.buttonText}>Ignore</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mapButton} onPress={() => Linking.openURL(item.link)}>
                <Text style={styles.mapText}>📍 Map</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* FAB for Adding Drone */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/drone-owner/addDrone')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 8,
  },
  cardDetails: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  ignoreButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  mapButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mapText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '500',
  },
  fab: {
    backgroundColor: '#007bff',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 6,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profilePrompt: {
    backgroundColor: '#FFEFD5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFA07A',
  },
  profilePromptText: {
    color: '#d35400',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
});
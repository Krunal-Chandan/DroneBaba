import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, SafeAreaView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const checkLocationDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await api.getUserLocationDetails(); // Returns { user: {...} }
          if (res && Object.keys(res).length > 0) {
            await AsyncStorage.setItem('locationDetails', JSON.stringify(res));
            setLocationDetailsExist(true);
          } else {
            setLocationDetailsExist(false);
          }
        } catch (err: any) {
          console.error('Error fetching location details:', err);
          setError(err.message || 'Failed to fetch location details.');
          setLocationDetailsExist(false);
        } finally {
          setLoading(false);
        }
      };

      checkLocationDetails();
    }, [])
  );


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.headerButton}>
          <TouchableOpacity style={{ marginRight: 20 }} onPress={() => alert('Notifications clicked')}>
            <MaterialIcons name="notifications" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/drone-owner-Profile/drone-owner-Profile')}>
            <MaterialIcons name="account-circle" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading State */}
      {loading && <ActivityIndicator size="large" color="#2ECC71" style={styles.loading} />}

      {/* Error State */}
      {/* {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => router.push('/locDetails')}>
            <Text style={styles.retryButtonText}>Retry or Update Profile</Text>
          </TouchableOpacity>
        </View>
      )} */}

      {/* Profile Details Check */}
      {locationDetailsExist === false && (
        <View style={styles.noDetailsBlock}>
          <Text style={styles.noDetailsText}>It seems we do not have your Details</Text>
          <Text style={styles.noDetailsText}>Fill your Details</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => router.push('/locDetails')}>
            <Text style={styles.editButtonText}>Fill Details</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Title and Work Items (shown regardless of location details) */}
      <Text style={styles.title}>Today's Work</Text>
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
      {/* <TouchableOpacity style={styles.fab} onPress={() => router.push('/drone-owner/addDrone')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity> */}
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
    justifyContent: 'space-between',
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
    flexDirection: 'row',
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
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    backgroundColor: '#FFEFD5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFA07A',
  },
  errorText: {
    color: '#d35400',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  noDetailsBlock: {
    backgroundColor: '#FFEFD5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFA07A',
  },
  noDetailsText: {
    color: '#d35400',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
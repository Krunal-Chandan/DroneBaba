import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { api } from '@/api/api';
import { useRefreshOnFocus } from '@/components/refresh';

type Drone = {
  _id: string;
  name: string;
  type: string;
  capacity: string;
  pricePerAcre: string;
  durability: string;
  purchasedDate: string;
  isNGO: string; // Updated to string to match API response
  ngoName?: string;
  schedule: Array<{ date: string; timeSlot: string }>;
};

export default function DronesListScreen() {
  const [drones, setDrones] = useState<Drone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const fetchDrones = async () => {
        try {
          setLoading(true);
          const drones = await api.getAllDroneOfDroneOwner();
          console.log('🛸 Total drones fetched:', drones.length);
          setDrones(drones);
        } catch (err: any) {
          setError(err.message || 'Failed to fetch drones.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchDrones();
    }, [])
  );

  const renderDroneItem = ({ item }: { item: Drone }) => {
    console.log('🛸 Rendering drone:', item); // Debug log for each item
    return (
      <View style={styles.droneItem}>
        <Text style={styles.droneName}>{item.name}</Text>
        <Text style={styles.droneDetail}>Type: {item.type}</Text>
        <Text style={styles.droneDetail}>Capacity: {item.capacity}</Text>
        <Text style={styles.droneDetail}>Price/Acre: ${item.pricePerAcre}</Text>
        <Text style={styles.droneDetail}>Durability: {item.durability}</Text>
        <Text style={styles.droneDetail}>
          Purchased: {new Date(item.purchasedDate).toLocaleDateString()}
        </Text>
        <Text style={styles.droneDetail}>
          NGO: {item.isNGO === 'yes' ? (item.ngoName || 'Yes') : 'No'}
        </Text>
        <Text style={styles.droneDetail}>
          Schedules: {Array.isArray(item.schedule) && item.schedule.length > 0
            ? item.schedule.map((s, index) => `${s.date} (${s.timeSlot})`).join(', ')
            : 'None'}
        </Text>
      </View>
    );
  };

  if (loading) return <ActivityIndicator size="large" color="#2ECC71" style={styles.loading} />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>My Drones</Text>
      <FlatList
        data={drones}
        renderItem={renderDroneItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No drones found.</Text>}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={() => router.push('/drone-owner/addDrone')}>
        <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 10 },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  list: { paddingBottom: 70 },
  droneItem: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  droneName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  droneDetail: { fontSize: 14, color: '#666', marginTop: 5 },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2ECC71',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  loading: { flex: 1, justifyContent: 'center' },
  errorText: { textAlign: 'center', color: '#E74C3C', fontSize: 16, marginTop: 20 },
  emptyText: { textAlign: 'center', color: '#666', fontSize: 16, marginTop: 20 },
});
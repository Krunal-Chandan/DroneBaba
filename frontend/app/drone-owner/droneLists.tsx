import React, { useState, useEffect } from 'react';
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
import { useRouter } from 'expo-router';
import { api } from '@/api/api';

type Drone = {
  _id: string;
  name: string;
  type: string;
  capacity: string;
  pricePerAcre: string;
  durability: string;
  purchasedDate: string;
  isNGO: boolean;
  ngoName?: string;
  schedule: Array<{ date: string; timeSlot: string }>;
};

export default function DronesListScreen() {
  const [drones, setDrones] = useState<Drone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const schedules = await api.getSchedulesOfDroneOwner();
        // Fetch detailed drone info for each drone ID in schedules
        const dronePromises = schedules.map(async (schedule : any) => {
          const droneDetail = await api.getDroneDetails(schedule.DroneName); // Assuming DroneName is the _id
          return droneDetail;
        });
        const droneDetails = await Promise.all(dronePromises);
        setDrones(droneDetails);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch drones.');
      } finally {
        setLoading(false);
      }
    };
    fetchDrones();
  }, []);

  const renderDroneItem = ({ item }: { item: Drone }) => (
    <View style={styles.droneItem}>
      <Text style={styles.droneName}>{item.name}</Text>
      <Text style={styles.droneDetail}>Type: {item.type}</Text>
      <Text style={styles.droneDetail}>Capacity: {item.capacity}</Text>
      <Text style={styles.droneDetail}>Price/Acre: ${item.pricePerAcre}</Text>
      <Text style={styles.droneDetail}>Durability: {item.durability}</Text>
      <Text style={styles.droneDetail}>Purchased: {item.purchasedDate}</Text>
      <Text style={styles.droneDetail}>NGO: {item.isNGO ? (item.ngoName || 'Yes') : 'No'}</Text>
      <Text style={styles.droneDetail}>
        Schedules: {item.schedule.length > 0 ? item.schedule.map(s => `${s.date} (${s.timeSlot})`).join(', ') : 'None'}
      </Text>
    </View>
  );

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
});
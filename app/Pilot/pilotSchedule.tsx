import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Mock database for pilot schedule (replace with your actual database implementation)
const PilotDB = () => ({
  fetchPilotSchedule: async (pilotId: string) => {
    // Mock data - replace with actual database query
    return [
      {
        id: 'B001',
        date: '2025-03-26',
        time: '08:00 AM',
        location: 'Nagpur, Maharashtra',
        farmArea: '5 Acre',
        droneName: 'DJI Agras T30',
        status: 'Accepted',
      },
      {
        id: 'B002',
        date: '2025-03-27',
        time: '09:00 AM',
        location: 'Pune, Maharashtra',
        farmArea: '3 Acre',
        droneName: 'DJI Mavic 2',
        status: 'Accepted',
      },
    ];
  },
});

export default function PilotScheduleScreen() {
  const [schedule, setSchedule] = useState<any[]>([]);
  const router = useRouter();
  const pilotId = 'P001'; // Replace with actual pilot ID

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const pilotDB = PilotDB();
        const pilotSchedule = await pilotDB.fetchPilotSchedule(pilotId);
        setSchedule(pilotSchedule);
      } catch (err) {
        console.error('Error fetching pilot schedule:', err);
      }
    };

    fetchSchedule();
  }, [pilotId]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Schedule</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Schedule List */}
      <ScrollView contentContainerStyle={styles.content}>
        {schedule.length === 0 ? (
          <Text style={styles.noSchedule}>No upcoming bookings in your schedule.</Text>
        ) : (
          schedule.map(item => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.date}</Text>
                <MaterialCommunityIcons
                  name={item.status === 'Completed' ? 'check-circle' : 'clock'}
                  size={24}
                  color={item.status === 'Completed' ? '#2ECC71' : '#E74C3C'}
                />
              </View>
              <Text style={styles.cardDetails}>
                Time: {item.time}{'\n'}
                Location: {item.location}{'\n'}
                Farm Area: {item.farmArea}{'\n'}
                Drone: {item.droneName}{'\n'}
                Status: {item.status}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 24,
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  noSchedule: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDetails: {
    fontSize: 14,
    color: '#555',
  },
});
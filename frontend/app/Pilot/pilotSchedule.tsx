import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '@/api/api';

type ScheduleItem = {
  date: string;
  timeSlot: string;
  job: {
    _id: string;
    farmLocation: string;
    farmArea: string;
    droneId: { name: string };
  };
};

export default function PilotScheduleScreen() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const router = useRouter();
  const pilotId = 'P001'; // Replace with actual pilot ID

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const pilotSchedule = await api.getPilotSchedule();
        setSchedule(pilotSchedule || []);
      } catch (err: any) {
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
          schedule.map((item, index) => (
            <View key={`${item.job._id}-${index}`} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.date}</Text>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={24}
                  color="#2ECC71"
                />
              </View>
              <Text style={styles.cardDetails}>
                Time: {item.timeSlot}{'\n'}
                Location: {item.job.farmLocation}{'\n'}
                Farm Area: {item.job.farmArea || 'N/A'} Acre{'\n'}
                Drone: {item.job.droneId.name}{'\n'}
                Status: Accepted
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
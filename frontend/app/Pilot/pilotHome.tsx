import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Mock database for pilot bookings (replace with your actual database implementation)
const PilotDB = () => ({
  fetchPilotBookings: async (pilotId: string) => {
    // Mock data - replace with actual database query
    return [
      {
        id: 'B001',
        pilotId: 'P001',
        farmerId: 'F001',
        farmArea: '5 Acre',
        date: '2025-03-26',
        time: '08:00 AM',
        status: 'Accepted',
        location: 'Nagpur, Maharashtra',
        mapLink: 'https://maps.app.goo.gl/16MGbR9QGimPu9tb8',
        droneName: 'DJI Agras T30',
      },
      {
        id: 'B002',
        pilotId: 'P001',
        farmerId: 'F002',
        farmArea: '3 Acre',
        date: '2025-03-27',
        time: '09:00 AM',
        status: 'Accepted',
        location: 'Pune, Maharashtra',
        mapLink: 'https://maps.app.goo.gl/w6CPAPLb7J6dBGyL8',
        droneName: 'DJI Mavic 2',
      },
    ];
  },
});

export default function PilotHomeScreen() {
  const [bookings, setBookings] = useState<any[]>([]);
  const router = useRouter();
  const pilotId = 'P001'; // Replace with actual pilot ID (e.g., from auth context)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const pilotDB = PilotDB();
        const pilotBookings = await pilotDB.fetchPilotBookings(pilotId);
        setBookings(pilotBookings);
      } catch (err) {
        console.error('Error fetching pilot bookings:', err);
      }
    };

    fetchBookings();
    const interval = setInterval(fetchBookings, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [pilotId]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pilot Dashboard</Text>
        <TouchableOpacity>
          <MaterialIcons name="notifications" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Assigned Bookings</Text>

      {/* Bookings List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {bookings.length === 0 ? (
          <Text style={styles.noBookings}>No assigned bookings available.</Text>
        ) : (
          bookings.map(booking => (
            <TouchableOpacity
              key={booking.id}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/Pilot/pilotBooking',
                  params: { bookingId: booking.id },
                })
              }
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{booking.location}</Text>
                <MaterialCommunityIcons name="drone" size={24} color="#2ECC71" />
              </View>
              <Text style={styles.cardDetails}>
                Farm Area: {booking.farmArea}{'\n'}
                Date & Time: {booking.date} at {booking.time}{'\n'}
                Drone: {booking.droneName}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* FAB for Viewing Schedule */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/Pilot/pilotSchedule')}
      >
        <MaterialCommunityIcons name="calendar" size={24} color="#FFF" />
        <Text style={styles.fabText}>View Schedule</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  noBookings: {
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
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ECC71',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 30,
    right: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
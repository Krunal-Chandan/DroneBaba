import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Mock database for bookings and farmers (replace with your actual database implementation)
const BookingDB = () => ({
  fetchBookingById: async (bookingId: string) => {
    // Mock data - replace with actual database query
    return {
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
    };
  },
  updateBookingStatus: async (bookingId: string, status: string) => {
    console.log(`Updated booking ${bookingId} to status: ${status}`);
  },
});

const FarmerDB = () => ({
  fetchFarmerById: async (farmerId: string) => {
    // Mock data - replace with actual database query
    return {
      id: 'F001',
      name: 'John Doe',
      contactNo: '+919876543210',
      location: 'Nagpur, Maharashtra',
    };
  },
});

export default function PilotBookingDetailsScreen() {
  const { bookingId } = useLocalSearchParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [farmer, setFarmer] = useState<any>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const bookingDB = BookingDB();
        const farmerDB = FarmerDB();
        const bookingData = await bookingDB.fetchBookingById(bookingId as string);
        const farmerData = await farmerDB.fetchFarmerById(bookingData.farmerId);
        setBooking(bookingData);
        setFarmer(farmerData);
      } catch (err) {
        console.error('Error fetching booking details:', err);
        Alert.alert('Error', 'Failed to load booking details.');
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handleStartJob = async () => {
    try {
      const bookingDB = BookingDB();
      await bookingDB.updateBookingStatus(bookingId as string, 'In Progress');
      setBooking((prev: any) => ({ ...prev, status: 'In Progress' }));
      Alert.alert('Success', 'Job started successfully!');
    } catch (err) {
      console.error('Error starting job:', err);
      Alert.alert('Error', 'Failed to start job.');
    }
  };

  const handleCompleteJob = async () => {
    try {
      const bookingDB = BookingDB();
      await bookingDB.updateBookingStatus(bookingId as string, 'Completed');
      Alert.alert('Success', 'Job completed successfully!', [
        { text: 'OK', onPress: () => router.replace('/Pilot/pilotHome') },
      ]);
    } catch (err) {
      console.error('Error completing job:', err);
      Alert.alert('Error', 'Failed to complete job.');
    }
  };

  const handleWhatsApp = () => {
    if (!farmer?.contactNo) {
      Alert.alert('Error', 'Farmer contact number not available.');
      return;
    }
    const message = `Hello ${farmer.name}, I am the pilot for your booking on ${booking?.date} at ${booking?.time}. Let's discuss the details.`;
    const url = `https://wa.me/${farmer.contactNo}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  if (!booking || !farmer) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Booking Information */}
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="map-marker" size={24} color="#2ECC71" style={styles.icon} />
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{booking.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="ruler-square" size={24} color="#2ECC71" style={styles.icon} />
            <Text style={styles.label}>Farm Area:</Text>
            <Text style={styles.value}>{booking.farmArea}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="calendar" size={24} color="#2ECC71" style={styles.icon} />
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{booking.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="clock" size={24} color="#2ECC71" style={styles.icon} />
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>{booking.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="drone" size={24} color="#2ECC71" style={styles.icon} />
            <Text style={styles.label}>Drone:</Text>
            <Text style={styles.value}>{booking.droneName}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="information" size={24} color="#2ECC71" style={styles.icon} />
            <Text style={styles.label}>Status:</Text>
            <Text style={[styles.value, { color: booking.status === 'Completed' ? '#2ECC71' : '#E74C3C' }]}>
              {booking.status}
            </Text>
          </View>
          <TouchableOpacity style={styles.mapButton} onPress={() => Linking.openURL(booking.mapLink)}>
            <Text style={styles.mapText}>📍 Open Map</Text>
          </TouchableOpacity>
        </View>

        {/* Farmer Contact Information */}
        <Text style={styles.sectionTitle}>Farmer Contact</Text>
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="account" size={24} color="#2ECC71" style={styles.icon} />
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{farmer.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="phone" size={24} color="#2ECC71" style={styles.icon} />
            <Text style={styles.label}>Contact:</Text>
            <Text style={styles.value}>{farmer.contactNo}</Text>
          </View>
          <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
            <MaterialCommunityIcons name="whatsapp" size={24} color="#FFF" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Contact via WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        {booking.status === 'Accepted' && (
          <TouchableOpacity style={styles.actionButton} onPress={handleStartJob}>
            <Text style={styles.buttonText}>Start Job</Text>
          </TouchableOpacity>
        )}
        {booking.status === 'In Progress' && (
          <TouchableOpacity style={styles.actionButton} onPress={handleCompleteJob}>
            <Text style={styles.buttonText}>Complete Job</Text>
          </TouchableOpacity>
        )}
      </View>
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
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#555',
    flex: 1,
    textAlign: 'right',
  },
  mapButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  mapText: {
    fontSize: 14,
    color: '#3498DB',
    fontWeight: '600',
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonIcon: {
    marginRight: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});
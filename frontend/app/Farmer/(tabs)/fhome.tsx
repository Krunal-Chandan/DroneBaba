import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '@/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FarmerDashboard() {
  const [selectedDate, setSelectedDate] = useState('');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Fetch user data on mount using the token
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await api.getUser();
        setUser(userData);
        // Store user data in local storage
        await AsyncStorage.setItem('currentUser', JSON.stringify({ ...userData, id: userData._id.toString() }));
        console.log('User data stored:', userData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch user data.');
        console.error('User fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Set the selected date to 3 days after the current date when the component mounts
  useEffect(() => {
    const currentDate = new Date();
    const minDate = new Date(currentDate);
    minDate.setDate(currentDate.getDate() + 1);
    const formattedDate = minDate.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
  }, []);

  // Generate dates from 3 days after the current date to 3 weeks after
  const generateDates = () => {
    const dates = [];
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() + 3);
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 21);

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const day = date.toLocaleString('default', { weekday: 'short' }).toUpperCase();
      const dayNum = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
      const formattedDate = date.toISOString().split('T')[0];
      dates.push({ day, dayNum, month, formattedDate });
    }
    return dates;
  };

  const dates = generateDates();

  // Mock drone data (to be replaced with API call)
  // const filteredDrones = dronesData.filter((drone) => {
  //   const availabilityForDate = drone.availability.find((avail) => avail.date === selectedDate);
  //   if (!availabilityForDate) return false;
  //   return availabilityForDate.slots.some((slot) => slot.status === 'Available');
  // });

  const DroneSlots = ({ drone }: { drone: any }) => {
    const availability = drone.availability.find((avail: { date: string }) => avail.date === selectedDate);
    const availableSlots = availability?.slots.filter((slot: { status: string }) => slot.status === 'Available') || [];

    return (
      <View style={styles.locationContainer}>
        <View style={styles.locationHeader}>
          <Text style={styles.locationTitle}>{drone.name}, {drone.city}</Text>
          <TouchableOpacity onPress={() => console.log(`View info for ${drone.name}`)}>
            <Text style={styles.infoLink}>INFO</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.cancellationText}>Booking Available</Text>
        <View style={styles.slotsContainer}>
          {availableSlots.length === 0 ? (
            <Text style={styles.noSlots}>No slots available</Text>
          ) : (
            availableSlots.map((slot: any, index: any) => (
              <TouchableOpacity
                key={index}
                style={styles.slotButton}
                onPress={() => {
                  console.log(`Booking drone ${drone.id} on ${selectedDate} at ${slot.time}`);
                  router.push({
                    pathname: '/Farmer/selectFarm',
                    params: { droneId: drone.id, selectedDate, slotTime: slot.time },
                  });
                }}
              >
                <Text style={styles.slotText}>{slot.time}</Text>
                <Text style={styles.slotSubText}>Covers {slot.coverage}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    );
  };

  if (loading) return <Text style={styles.loadingText}>Loading user data...</Text>;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      {/* User Info Section */}
      {/* <View style={styles.userInfo}>
        <Text style={styles.userName}>Welcome, {user?.name || 'Guest'}</Text>
        <Text style={styles.userDetails}>Email: {user?.email || 'N/A'}</Text>
        <Text style={styles.userDetails}>City: {user?.city || 'N/A'}</Text>
        <Text style={styles.userDetails}>Role: {user?.role || 'N/A'}</Text>
      </View> */}

      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.headerTitle, { marginTop: 0, marginLeft: 10 }]}>Book Drone</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push('/farmerProfile/(tabs)/farmerProfile')}>
            <MaterialCommunityIcons name="account-circle-outline" size={40} color="#333" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="menu" size={40} color="#333" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.coverage}>Coverage: 1 acre per hour</Text>

      {/* Date Selection Grid */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
        <View style={styles.dateContainer}>
          {dates.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dateButton, selectedDate === date.formattedDate && styles.selectedDateButton]}
              onPress={() => setSelectedDate(date.formattedDate)}
            >
              <Text style={[styles.dateDay, selectedDate === date.formattedDate && styles.selectedDateText]}>{date.day}</Text>
              <Text style={[styles.dateNum, selectedDate === date.formattedDate && styles.selectedDateText]}>{date.dayNum}</Text>
              <Text style={[styles.dateMonth, selectedDate === date.formattedDate && styles.selectedDateText]}>{date.month}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Drone List with Slots */}
      {/* <ScrollView style={styles.droneContainer}>
        {filteredDrones.length === 0 ? (
          <Text style={styles.noData}>No drones available on {selectedDate}</Text>
        ) : (
          filteredDrones.map((drone) => <DroneSlots key={drone.id} drone={drone} />)
        )}
      </ScrollView> */}

      <Text style={styles.infoText}>* Slots indicate available booking times for drone usage</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F6FA',
  },
  userInfo: {
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
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#E74C3C',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 0,
  },
  coverage: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  dateScroll: {
    marginBottom: 15,
    maxHeight: 100,
  },
  dateContainer: {
    flexDirection: 'row',
  },
  dateButton: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginRight: 10,
    width: 70,
    height: 90,
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedDateButton: {
    backgroundColor: '#E74C3C',
  },
  dateDay: {
    fontSize: 12,
    color: '#666',
  },
  dateNum: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  dateMonth: {
    fontSize: 12,
    color: '#666',
  },
  selectedDateText: {
    color: '#FFF',
  },
  droneContainer: {
    flex: 1,
  },
  locationContainer: {
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
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoLink: {
    fontSize: 14,
    color: '#3498DB',
    fontWeight: '600',
  },
  cancellationText: {
    fontSize: 14,
    color: '#2ECC71',
    marginBottom: 10,
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  slotButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#2ECC71',
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  slotText: {
    fontSize: 14,
    color: '#2ECC71',
    fontWeight: '600',
  },
  slotSubText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  noSlots: {
    fontSize: 14,
    color: '#666',
  },
  noData: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  infoText: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
});
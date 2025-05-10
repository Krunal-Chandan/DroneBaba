import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { api } from '@/api/api';
import { Picker } from '@react-native-picker/picker';

type Drone = {
  _id: string;
  name: string;
  type: string;
  capacity: string;
  durability: string;
  pricePerAcre?: string;
  isNGO?: string;
  ngoName?: string;
  purchasedDate?: string;
};

export default function DroneDetailScreen() {
  const { droneId, selectedDate, slotTime } = useLocalSearchParams();
  const [drone, setDrone] = useState<Drone | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingType, setBookingType] = useState<'Urgent' | 'Regular'>('Regular');
  const [selectedFarm, setSelectedFarm] = useState<string | null>(null);
  const router = useRouter();

  // Fetch drone details
  useEffect(() => {
    const fetchDroneDetails = async () => {
      try {
        const droneData = await api.getDroneDetails(droneId as string);
        setDrone(droneData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch drone details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDroneDetails();
  }, [droneId]);

  // Mock farms (replace with actual farm data in the future)
  const farms = [
    { id: '1', name: 'Farm A - 5 Acres' },
    { id: '2', name: 'Farm B - 3 Acres' },
    { id: '3', name: 'Farm C - 10 Acres' },
  ];

  // Calculate price (mocked pricePerAcre if not available)
  const basePricePerAcre = drone?.pricePerAcre ? parseFloat(drone.pricePerAcre) : 50; // Mock default price
  const urgentFee = 20; // Nominal fee for urgent booking
  const totalPrice = bookingType === 'Urgent' ? basePricePerAcre + urgentFee : basePricePerAcre;

  const handleProceedToPayment = () => {
    if (!selectedFarm) {
      alert('Please select a farm before proceeding.');
      return;
    }

    router.push({
      pathname: '/',
      params: {
        droneId,
        selectedDate,
        slotTime,
        bookingType,
        farm: selectedFarm,
        totalPrice: totalPrice.toString(),
      },
    });
  };

  if (loading) return <Text style={styles.loadingText}>Loading drone details...</Text>;
  if (error) return <Text style={styles.errorText}>{error}</Text>;
  if (!drone) return <Text style={styles.errorText}>Drone not found.</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Drone Image */}
        <Image
          source={{ uri: 'https://www.folio3.ai/blog/wp-content/uploads/2024/07/Untitled-design-12.jpg' }}
          style={styles.droneImage}
        />

        {/* Drone Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.droneName}>{drone.name}</Text>
          <Text style={styles.infoText}>Type: {drone.type}</Text>
          <Text style={styles.infoText}>Capacity: {drone.capacity}</Text>
          <Text style={styles.infoText}>Durability: {drone.durability}</Text>
          {drone.pricePerAcre && <Text style={styles.infoText}>Price per Acre: ${drone.pricePerAcre}</Text>}
          {drone.isNGO && <Text style={styles.infoText}>NGO: {drone.isNGO === 'yes' ? (drone.ngoName || 'Yes') : 'No'}</Text>}
          {drone.purchasedDate && (
            <Text style={styles.infoText}>
              Purchased: {new Date(drone.purchasedDate).toLocaleDateString()}
            </Text>
          )}
          {selectedDate && slotTime && (
            <>
              <Text style={styles.infoText}>Booking Date: {selectedDate}</Text>
              <Text style={styles.infoText}>Time Slot: {slotTime}</Text>
            </>
          )}
        </View>

        {/* Booking Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Type</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setBookingType('Regular')}
            >
              <View style={[styles.radioCircle, bookingType === 'Regular' && styles.radioSelected]}>
                {bookingType === 'Regular' && <View style={styles.radioInnerCircle} />}
              </View>
              <Text style={styles.radioText}>Regular</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setBookingType('Urgent')}
            >
              <View style={[styles.radioCircle, bookingType === 'Urgent' && styles.radioSelected]}>
                {bookingType === 'Urgent' && <View style={styles.radioInnerCircle} />}
              </View>
              <Text style={styles.radioText}>Urgent (+${urgentFee})</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Price Display */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total Price</Text>
          <Text style={styles.priceText}>${totalPrice} per acre</Text>
          {bookingType === 'Urgent' && (
            <Text style={styles.priceNote}>Includes ${urgentFee} urgent booking fee</Text>
          )}
        </View>

        {/* Farm Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Farm</Text>
          <Picker
            selectedValue={selectedFarm}
            onValueChange={(itemValue : any) => setSelectedFarm(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a farm..." value={null} />
            {farms.map((farm) => (
              <Picker.Item key={farm.id} label={farm.name} value={farm.name} />
            ))}
          </Picker>
        </View>

        {/* Proceed to Payment */}
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceedToPayment}>
          <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 20,
  },
  droneImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  infoContainer: {
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
  droneName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ECC71',
  },
  priceNote: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  picker: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  proceedButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
});
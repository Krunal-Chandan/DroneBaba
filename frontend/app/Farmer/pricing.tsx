import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '@/api/api';

export default function PricingScreen() {
  const { droneId, selectedDate, slotTime, pricePerAcre, farmArea, farmName, selectedFarms } = useLocalSearchParams();
  const router = useRouter();

  const parsedPricePerAcre = parseFloat(pricePerAcre as string) || 10;
  const parsedFarmArea = parseFloat(farmArea as string) || 0;
  const totalCost = parsedPricePerAcre * parsedFarmArea;

  const [pricingData] = useState({
    farmArea: farmArea || 'Not available',
    costPerAcre: parsedPricePerAcre,
    totalCost: totalCost,
  });

  const handleConfirmBooking = async () => {
    try {
      await api.createSchedule(droneId as string, {
        date: selectedDate as string,
        timeSlot: slotTime as string,
      });

      router.replace({
        pathname: '/Farmer/fhome',
        params: { showBookingModal: 'true' },
      });
    } catch (error: any) {
      alert(error.message || 'Failed to confirm booking.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pricing Details</Text>
        <MaterialCommunityIcons name="drone" size={30} color="#2ECC71" />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Booking Summary</Text>

        <View style={styles.card}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="calendar" size={24} color="#2ECC71" style={styles.icon} />
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{selectedDate || 'Not selected'}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="clock" size={24} color="#2ECC71" style={styles.icon} />
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>{slotTime || 'Not selected'}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="sprout" size={24} color="#2ECC71" style={styles.icon} />
            <Text style={styles.label}>Farms:</Text>
            <Text style={styles.value}>{farmName || 'Not selected'}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="ruler-square" size={24} color="#2ECC71" style={styles.icon} />
            <Text style={styles.label}>Total Area:</Text>
            <Text style={styles.value}>{pricingData.farmArea} acres</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Pricing Breakdown</Text>
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="currency-usd" size={24} color="#2ECC71" style={styles.icon} />
            <Text style={styles.label}>Cost per Acre:</Text>
            <Text style={styles.value}>${pricingData.costPerAcre.toFixed(2)}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="calculator" size={24} color="#2ECC71" style={styles.icon} />
            <Text style={styles.label}>Total Cost:</Text>
            <Text style={styles.value}>${pricingData.totalCost.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
          <MaterialCommunityIcons name="check-circle" size={24} color="#FFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
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
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
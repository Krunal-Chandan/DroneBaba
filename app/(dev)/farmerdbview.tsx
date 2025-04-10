import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FarmerDB } from '@/components/database/FarmerDB';
import { useRouter } from 'expo-router';

type Farmer = {
  id: number;
  name: string;
  address: string;
  location: string;
  taluka: string;
  city: string;
  state: string;
  country: string;
  contactNo: string;
  whatsAppNo: string;
  aadharCardNo: string;
  panCardNo: string;
  emailId: string;
  cropName: string;
  farmArea: string;
  cropType: string;
  season: string;
  previousCropName: string;
};

export default function FarmerListScreen({ navigation }: { navigation: any }) {
  const { getAllFarmers } = FarmerDB();
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const router = useRouter()


  // Fetch all farmers when the screen mounts
  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const allFarmers = await getAllFarmers();
      setFarmers(allFarmers);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch farmers from the database.');
    }
  };

  // Render each farmer item in the list
  const renderFarmerItem = ({ item }: { item: Farmer }) => (
    <View style={styles.farmerItem}>
      <Text style={styles.farmerName}>Name: {item.name}</Text>
      <Text style={styles.farmerDetail}>Email: {item.emailId || 'N/A'}</Text>
      <Text style={styles.farmerDetail}>Contact No: {item.contactNo || 'N/A'}</Text>
      <Text style={styles.farmerDetail}>City: {item.city || 'N/A'}</Text>
      <Text style={styles.farmerDetail}>Crop Name: {item.cropName || 'N/A'}</Text>
      <Text style={styles.farmerDetail}>Crop Type: {item.cropType || 'N/A'}</Text>
      <Text style={styles.farmerDetail}>Season: {item.season || 'N/A'}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('FarmerDetails', { farmerId: item.id })}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Farmers List</Text>
      </View>
      {farmers.length === 0 ? (
        <Text style={styles.emptyText}>No farmers found in the database.</Text>
      ) : (
        <FlatList
          data={farmers}
          renderItem={renderFarmerItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
      <TouchableOpacity style={styles.refreshButton} onPress={fetchFarmers}>
        <Text style={styles.refreshButtonText}>Refresh List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        // onPress={() => router.navigate('')}
      >
        <Text style={styles.addButtonText}>Add New Farmer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    padding: 20,
  },
  farmerItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  farmerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  farmerDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: '#2ECC71',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  refreshButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  refreshButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  addButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
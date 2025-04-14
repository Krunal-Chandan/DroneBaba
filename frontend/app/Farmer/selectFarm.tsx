import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Initial farm data (replace with dynamic data in a real app)
const initialFarmsData = [
  { id: 'F001', name: 'Sunset Acres', location: 'Nagpur', area: '5 acres', coordinates: null },
  { id: 'F002', name: 'Green Valley', location: 'Goa', area: '3 acres', coordinates: null },
  { id: 'F003', name: 'River Fields', location: 'Nagpur', area: '7 acres', coordinates: null },
  { id: 'F004', name: 'Golden Harvest', location: 'Pune', area: '4 acres', coordinates: null },
];

export default function FarmSelectionScreen() {
  const router = useRouter();
  const { droneId, date, time, coordinates: paramsCoordinates } = useLocalSearchParams();
  const [selectedFarms, setSelectedFarms] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newFarmName, setNewFarmName] = useState('');
  const [newCoordinates, setNewCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editFarmId, setEditFarmId] = useState<string | null>(null);
  const [editFarmName, setEditFarmName] = useState('');
  const [farms, setFarms] = useState<Farm[]>(initialFarmsData);

  // Handle coordinates returned from MapScreen
  useEffect(() => {
    if (paramsCoordinates) {
      console.log('Received paramsCoordinates:', paramsCoordinates);
      // Check if paramsCoordinates is the string "undefined" or an empty value
      const coordsToParse = Array.isArray(paramsCoordinates) ? paramsCoordinates[0] : paramsCoordinates;
      if (!coordsToParse || coordsToParse === 'undefined') {
        setNewCoordinates(null);
        return;
      }

      try {
        const parsedCoords = JSON.parse(coordsToParse) as { latitude: number; longitude: number };
        // Validate latitude and longitude
        if (
          typeof parsedCoords.latitude === 'number' &&
          typeof parsedCoords.longitude === 'number' &&
          !isNaN(parsedCoords.latitude) &&
          !isNaN(parsedCoords.longitude)
        ) {
          setNewCoordinates(parsedCoords);
          // Set a demo farm name based on the current number of farms
          setNewFarmName(`Farm ${farms.length + 1}`);
          setModalVisible(true); // Show modal to name the farm
        } else {
          console.warn('Invalid coordinates format:', parsedCoords);
          setNewCoordinates(null);
          Alert.alert('Error', 'Invalid coordinates received. Please try again.');
        }
      } catch (error) {
        console.error('Error parsing coordinates:', error);
        setNewCoordinates(null);
        Alert.alert('Error', 'Failed to parse coordinates. Please try again.');
      }
    } else {
      setNewCoordinates(null);
    }
  }, [paramsCoordinates, farms.length]);

  // Toggle farm selection
  const toggleFarmSelection = (farmId: string) => {
    if (selectedFarms.includes(farmId)) {
      setSelectedFarms(selectedFarms.filter(id => id !== farmId));
    } else {
      setSelectedFarms([...selectedFarms, farmId]);
    }
  };

  // Navigate to MapScreen to add a new farm
  const handleAddFarm = () => {
    router.push('/Farmer/map');
  };

  type Farm = {
    id: string;
    name: string;
    location: string;
    area: string;
    coordinates: { latitude: number; longitude: number } | null;
  };

  // Add new farm to the list
  const handleAddNewFarm = () => {
    if (!newFarmName.trim()) {
      Alert.alert('Error', 'Please enter a farm name.');
      return;
    }
    if (
      !newCoordinates ||
      typeof newCoordinates.latitude !== 'number' ||
      typeof newCoordinates.longitude !== 'number' ||
      isNaN(newCoordinates.latitude) ||
      isNaN(newCoordinates.longitude)
    ) {
      Alert.alert('Error', 'No valid coordinates selected.');
      return;
    }

    const newFarm = {
      id: `F${farms.length + 1}`.padStart(4, '0'),
      name: newFarmName.trim(),
      location: 'Custom Location',
      area: 'Unknown',
      coordinates: newCoordinates,
    };

    setFarms([...farms, newFarm]);
    setModalVisible(false);
    setNewFarmName('');
    setNewCoordinates(null);
    // Instead of setting coordinates to undefined, set it to an empty string
    router.setParams({ coordinates: '' });
  };

  // Open edit modal
  const handleEditFarmName = (farmId: string, currentName: string) => {
    setEditFarmId(farmId);
    setEditFarmName(currentName);
    setEditModalVisible(true);
  };

  // Save edited farm name
  const handleSaveEdit = () => {
    if (!editFarmName.trim()) {
      Alert.alert('Error', 'Please enter a farm name.');
      return;
    }

    setFarms(farms.map(farm =>
      farm.id === editFarmId ? { ...farm, name: editFarmName.trim() } : farm
    ));
    setEditModalVisible(false);
    setEditFarmId(null);
    setEditFarmName('');
  };

  // Proceed to the next step (e.g., confirm booking)
  const handleProceed = () => {
    if (selectedFarms.length === 0) {
      alert('Please select at least one farm to proceed.');
      return;
    }
    console.log('Selected Farms:', selectedFarms);
    console.log('Drone Slot:', { droneId, date, time });
    router.push({
      pathname: '/Farmer/pricing',
      params: { farmerId: '1', droneId: 'D001', selectedDate: '2025-03-26', slotTime: '08:00 AM' },
      // params: {
      //   droneId,
      //   date,
      //   time,
      //   selectedFarms: JSON.stringify(selectedFarms),
      // },
    });
  };

  // Render each farm item
  const renderFarmItem = ({ item }: { item: Farm }) => (
    <TouchableOpacity
      style={[
        styles.farmItem,
        selectedFarms.includes(item.id) && styles.selectedFarmItem,
      ]}
      onPress={() => toggleFarmSelection(item.id)}
    >
      <View style={styles.farmInfo}>
        <Text style={styles.farmName}>{item.name}</Text>
        <Text style={styles.farmDetails}>{item.location} • {item.area}</Text>
        {item.coordinates && (
          <Text style={styles.coordinatesText}>
            Lat: {item.coordinates.latitude.toFixed(6)}, Lon: {item.coordinates.longitude.toFixed(6)}
          </Text>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEditFarmName(item.id, item.name)}>
          <Ionicons name="pencil" size={20} color="#2ECC71" style={styles.editIcon} />
        </TouchableOpacity>
        <View
          style={[
            styles.checkbox,
            selectedFarms.includes(item.id) && styles.selectedCheckbox,
          ]}
        >
          {selectedFarms.includes(item.id) && (
            <Ionicons name="checkmark" size={16} color="#FFF" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Farms</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Selected Slot Info */}
      <View style={styles.slotInfo}>
        <Text style={styles.slotText}>
          Selected Slot: {date} at {time}
        </Text>
      </View>

      {/* Farm List */}
      <FlatList
        data={farms}
        renderItem={renderFarmItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.farmList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No farms available. Add a new farm to get started.</Text>
        }
      />

      {/* Proceed Button */}
      <TouchableOpacity
        style={[
          styles.proceedButton,
          selectedFarms.length === 0 && styles.disabledButton,
        ]}
        onPress={handleProceed}
        disabled={selectedFarms.length === 0}
      >
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>

      {/* Floating Action Button to Add New Farm */}
      <TouchableOpacity style={styles.fab} onPress={handleAddFarm}>
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>

      {/* Modal for Naming New Farm */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Name Your Farm</Text>
            <TextInput
              style={styles.modalInput}
              value={newFarmName}
              onChangeText={setNewFarmName}
              placeholder="Enter farm name (e.g., Farm 5)"
              autoFocus
            />
            {newCoordinates &&
            typeof newCoordinates.latitude === 'number' &&
            typeof newCoordinates.longitude === 'number' &&
            !isNaN(newCoordinates.latitude) &&
            !isNaN(newCoordinates.longitude) ? (
              <Text style={styles.modalCoordinates}>
                Coordinates: Lat {newCoordinates.latitude.toFixed(6)}, Lon {newCoordinates.longitude.toFixed(6)}
              </Text>
            ) : (
              <Text style={styles.modalCoordinates}>No valid coordinates available</Text>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  setNewFarmName('');
                  setNewCoordinates(null);
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={handleAddNewFarm}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextConfirm]}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Editing Farm Name */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Farm Name</Text>
            <TextInput
              style={styles.modalInput}
              value={editFarmName}
              onChangeText={setEditFarmName}
              placeholder="Enter new farm name"
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={handleSaveEdit}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextConfirm]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  slotInfo: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  slotText: {
    fontSize: 16,
    color: '#333',
  },
  farmList: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  farmItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedFarmItem: {
    borderWidth: 2,
    borderColor: '#2ECC71',
  },
  farmInfo: {
    flex: 1,
  },
  farmName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  farmDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  coordinatesText: {
    fontSize: 12,
    color: '#2ECC71',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginRight: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCheckbox: {
    backgroundColor: '#2ECC71',
    borderColor: '#2ECC71',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  proceedButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  proceedButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#FF6347',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  modalCoordinates: {
    fontSize: 14,
    color: '#2ECC71',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: '#E0E0E0',
  },
  modalButtonConfirm: {
    backgroundColor: '#2ECC71',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalButtonTextConfirm: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
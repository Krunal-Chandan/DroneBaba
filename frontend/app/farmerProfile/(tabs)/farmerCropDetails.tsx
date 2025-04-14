import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { FarmerDB } from '@/components/database/FarmerDB';
import { useRouter } from 'expo-router';

type MaterialCommunityIconName =
  | 'sprout'
  | 'ruler-square'
  | 'grain'
  | 'calendar'
  | 'sprout-outline'
  | 'check'
  | 'pencil';

export default function CropInfoScreen({ route }: { route: any }) {
  const { updateFarmer } = FarmerDB();
  const router = useRouter()

  const [cropData, setCropData] = useState({
    cropName: '',
    farmArea: '',
    cropType: '',
    season: '',
    previousCropName: '',
  });

  const [editingField, setEditingField] = useState<string | null>(null);

  const cropTypeOptions = [
    { label: 'Select Crop Type', value: '' },
    { label: 'Kharif', value: 'Kharif' },
    { label: 'Rabi', value: 'Rabi' },
    { label: 'Zaid', value: 'Zaid' },
  ];

  const seasonOptions = [
    { label: 'Select Season', value: '' },
    { label: 'Monsoon', value: 'Monsoon' },
    { label: 'Winter', value: 'Winter' },
    { label: 'Summer', value: 'Summer' },
    { label: 'Spring', value: 'Spring' },
    { label: 'Autumn', value: 'Autumn' },
  ];

  const handleChange = (field: keyof typeof cropData, value: string) => {
    setCropData(prev => ({ ...prev, [field]: value }));
  };

  // const handleSave = async () => {
  //   const farmerId = route?.params?.farmerId;
  //   if (!farmerId) {
  //     Alert.alert('Error', 'Farmer ID is required to save crop information.');
  //     return;
  //   }

  //   const cropInfo = {
  //     cropName: cropData.cropName,
  //     farmArea: cropData.farmArea,
  //     cropType: cropData.cropType,
  //     season: cropData.season,
  //     previousCropName: cropData.previousCropName,
  //   };

  //   try {
  //     await updateFarmer(farmerId, cropInfo);
  //     Alert.alert('Success', 'Crop information updated successfully!');
  //   } catch (err) {
  //     Alert.alert('Error', 'Failed to save crop information.');
  //   }
  // };

  const handleSave = async () => {
    const farmerId = route?.params?.farmerId;
    if (!farmerId) {
      Alert.alert('Error', 'Farmer ID is required to save crop information.');
      return;
    }
  
    const cropInfo = {
      cropName: cropData.cropName,
      farmArea: cropData.farmArea,
      cropType: cropData.cropType,
      season: cropData.season,
      previousCropName: cropData.previousCropName,
    };
  
    try {
      console.log('Updating farmer with ID:', farmerId, 'with crop info:', cropInfo);
      await updateFarmer(farmerId, cropInfo);
      console.log('Crop information updated successfully');
      Alert.alert('Success', 'Crop information updated successfully!', [
        { text: 'OK' },
      ]);
    } catch (err) {
      console.error('Error saving crop info:', err);
      Alert.alert('Error', 'Failed to save crop information.');
    }
  };

  const renderTextField = (
    label: string,
    field: keyof typeof cropData,
    icon: MaterialCommunityIconName,
    keyboardType: 'default' | 'numeric' = 'default'
  ) => {
    const isEditing = editingField === field;
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={styles.fieldRow}>
          <MaterialCommunityIcons name={icon} size={20} color="#2ECC71" style={styles.fieldIcon} />
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={cropData[field]}
              onChangeText={text => handleChange(field, text)}
              placeholder={`Enter ${label.toLowerCase()}`}
              keyboardType={keyboardType}
              autoFocus
            />
          ) : (
            <Text style={styles.fieldValue}>
              {cropData[field] || `No ${label.toLowerCase()} provided`}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => setEditingField(isEditing ? null : field)}
            style={styles.editButton}
          >
            <MaterialCommunityIcons
              name={isEditing ? 'check' : 'pencil'}
              size={20}
              color="#2ECC71"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderDropdownField = (
    label: string,
    field: keyof typeof cropData,
    icon: MaterialCommunityIconName,
    options: { label: string; value: string }[]
  ) => {
    const isEditing = editingField === field;
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={styles.fieldRow}>
          <MaterialCommunityIcons name={icon} size={20} color="#2ECC71" style={styles.fieldIcon} />
          {isEditing ? (
            <Picker
              selectedValue={cropData[field]}
              onValueChange={(value) => handleChange(field, value)}
              style={styles.picker}
            >
              {options.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          ) : (
            <Text style={styles.fieldValue}>
              {cropData[field] || `No ${label.toLowerCase()} provided`}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => setEditingField(isEditing ? null : field)}
            style={styles.editButton}
          >
            <MaterialCommunityIcons
              name={isEditing ? 'check' : 'pencil'}
              size={20}
              color="#2ECC71"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Crop Information</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Crop Details</Text>
        {renderTextField('Crop Name', 'cropName', 'sprout')}
        {renderTextField('Farm Area', 'farmArea', 'ruler-square', 'numeric')}
        {renderDropdownField('Crop Type', 'cropType', 'grain', cropTypeOptions)}
        {renderDropdownField('Season', 'season', 'calendar', seasonOptions)}
        {renderTextField('Previous Crop Name', 'previousCropName', 'sprout-outline')}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Crop Info</Text>
        </TouchableOpacity>
      </ScrollView>
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
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  fieldIcon: {
    marginRight: 10,
  },
  fieldValue: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  picker: {
    flex: 1,
    height: 53,
  },
  editButton: {
    padding: 5,
  },
  saveButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
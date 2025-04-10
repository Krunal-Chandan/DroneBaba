import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FarmerDB } from '@/components/database/FarmerDB';

type MaterialCommunityIconName =
  | 'account'
  | 'account-outline'
  | 'email'
  | 'lock'
  | 'home'
  | 'map-marker'
  | 'map'
  | 'city'
  | 'earth'
  | 'flag'
  | 'phone'
  | 'whatsapp'
  | 'card-account-details'
  | 'card-account-details-outline'
  | 'camera'
  | 'check'
  | 'pencil';

export default function FarmerDetailsScreen({ route, navigation }: { route: any; navigation: any }) {
  const { createFarmer, updateFarmer } = FarmerDB();

  const [farmerData, setFarmerData] = useState({
    name: 'John Doe',
    username: '',
    email: 'john.doe@example.com',
    password: 'password123',
    address: '',
    location: '',
    taluka: '',
    city: 'Nagpur',
    state: '',
    country: '',
    contactNo: '',
    whatsAppNo: '',
    aadharCardNo: '',
    panCardNo: '',
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleChange = (field: keyof typeof farmerData, value: string) => {
    setFarmerData(prev => ({ ...prev, [field]: value }));
  };

  const handleImagePick = () => {
    Alert.alert('Image Picker', 'Image picking functionality would be implemented here.');
  };

  // const handleSave = async () => {
  //   const farmer = {
  //     name: farmerData.name,
  //     address: farmerData.address,
  //     location: farmerData.location,
  //     taluka: farmerData.taluka,
  //     city: farmerData.city,
  //     state: farmerData.state,
  //     country: farmerData.country,
  //     contactNo: farmerData.contactNo,
  //     whatsAppNo: farmerData.whatsAppNo,
  //     aadharCardNo: farmerData.aadharCardNo,
  //     panCardNo: farmerData.panCardNo,
  //     emailId: farmerData.email,
  //     cropName: '', // Will be updated in CropInfoScreen
  //     farmArea: '',
  //     cropType: '',
  //     season: '',
  //     previousCropName: '',
  //   };

  //   try {
  //     const farmerId = route?.params?.farmerId;
  //     if (farmerId) {
  //       await updateFarmer(farmerId, farmer);
  //       Alert.alert('Success', 'Farmer details updated successfully!');
  //     } else {
  //       const newFarmerId = await createFarmer(farmer);
  //       Alert.alert('Success', `Farmer details saved successfully! ID: ${newFarmerId}`);
  //       navigation.navigate('CropInfo', { farmerId: newFarmerId, farmerName: farmer.name });
  //     }
  //   } catch (err) {
  //     Alert.alert('Error', 'Failed to save farmer details.');
  //   }
  // };

  const handleSave = async () => {
    const farmer = {
      name: farmerData.name,
      address: farmerData.address,
      location: farmerData.location,
      taluka: farmerData.taluka,
      city: farmerData.city,
      state: farmerData.state,
      country: farmerData.country,
      contactNo: farmerData.contactNo,
      whatsAppNo: farmerData.whatsAppNo,
      aadharCardNo: farmerData.aadharCardNo,
      panCardNo: farmerData.panCardNo,
      emailId: farmerData.email,
      cropName: '', // Will be updated in CropInfoScreen
      farmArea: '',
      cropType: '',
      season: '',
      previousCropName: '',
    };
  
    try {
      console.log('Saving farmer data:', farmer);
      const farmerId = route?.params?.farmerId;
      if (farmerId) {
        console.log('Updating farmer with ID:', farmerId);
        await updateFarmer(farmerId, farmer);
        console.log('Farmer updated successfully');
        Alert.alert('Success', 'Farmer details updated successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('FarmerList') },
        ]);
      } else {
        console.log('Creating new farmer');
        const newFarmerId = await createFarmer(farmer);
        console.log('Farmer created with ID:', newFarmerId);
        Alert.alert('Success', `Farmer details saved successfully! ID: ${newFarmerId}`, [
          { text: 'OK', onPress: () => navigation.navigate('CropInfo', { farmerId: newFarmerId, farmerName: farmer.name }) },
        ]);
      }
    } catch (err) {
      console.error('Error saving farmer:', err);
      Alert.alert('Error', 'Failed to save farmer details.');
    }
  };

  
  const renderField = (
    label: string,
    field: keyof typeof farmerData,
    icon: MaterialCommunityIconName,
    keyboardType: 'default' | 'email-address' | 'phone-pad' | 'numeric' | 'visible-password' = 'default',
    secureTextEntry = false
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
              value={farmerData[field]}
              onChangeText={text => handleChange(field, text)}
              placeholder={`Enter ${label.toLowerCase()}`}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              autoFocus
            />
          ) : (
            <Text style={styles.fieldValue}>
              {farmerData[field] || `No ${label.toLowerCase()} provided`}
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
        <Text style={styles.headerTitle}>Farmer Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={image ? { uri: image } : require('./../../../assets/images/Azmuth.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
            <MaterialCommunityIcons name="camera" size={20} color="#FFF" style={styles.uploadIcon} />
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Personal Information</Text>
        {renderField('Name', 'name', 'account')}
        {renderField('Username', 'username', 'account-outline')}
        {renderField('Email', 'email', 'email', 'email-address')}
        {renderField('Password', 'password', 'lock', 'default', true)}
        {renderField('Address', 'address', 'home')}
        {renderField('Location', 'location', 'map-marker')}
        {renderField('Taluka', 'taluka', 'map')}
        {renderField('City', 'city', 'city')}
        {renderField('State', 'state', 'earth')}
        {renderField('Country', 'country', 'flag')}
        {renderField('Contact No', 'contactNo', 'phone', 'phone-pad')}
        {renderField('WhatsApp No', 'whatsAppNo', 'whatsapp', 'phone-pad')}
        {renderField('Aadhar Card No', 'aadharCardNo', 'card-account-details', 'numeric')}
        {renderField('PAN Card No', 'panCardNo', 'card-account-details-outline')}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Details</Text>
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#2ECC71',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  uploadIcon: {
    marginRight: 5,
  },
  uploadButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
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
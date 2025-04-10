// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Alert,
//   ScrollView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// // Assuming PilotDB provides these methods
// const PilotDB = () => ({
//   createPilot: async (pilot: any) => Promise.resolve('P001'), // Mock implementation
//   updatePilot: async (pilotId: string, pilot: any) => Promise.resolve(),
// });

// type MaterialCommunityIconName =
//   | 'account'
//   | 'email'
//   | 'home'
//   | 'map-marker'
//   | 'map'
//   | 'city'
//   | 'earth'
//   | 'flag'
//   | 'phone'
//   | 'whatsapp'
//   | 'card-account-details'
//   | 'card-account-details-outline'
//   | 'certificate'
//   | 'calendar'
//   | 'drone'
//   | 'text'
//   | 'camera'
//   | 'check'
//   | 'pencil';

// export default function PilotDetailsScreen({ route, navigation }: { route: any; navigation: any }) {
//   const { createPilot, updatePilot } = PilotDB();

//   const [pilotData, setPilotData] = useState({
//     name: '',
//     address: '',
//     location: '',
//     taluka: '',
//     city: '',
//     state: '',
//     country: '',
//     contactNo: '',
//     whatsAppNo: '',
//     aadharCardNo: '',
//     panCardNo: '',
//     email: '',
//     pilotLicenceNumber: '',
//     validUpto: '',
//     licenceType: '',
//     flyingExperience: '',
//     previousExperienceSummary: '',
//     flyingDroneName: '',
//     fir: 'No', // Yes/No for FIR
//   });

//   const [editingField, setEditingField] = useState<string | null>(null);
//   const [image, setImage] = useState<string | null>(null);

//   const handleChange = (field: keyof typeof pilotData, value: string) => {
//     setPilotData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleImagePick = () => {
//     Alert.alert('Image Picker', 'Image picking functionality would be implemented here.');
//   };

//   const handleSave = async () => {
//     const pilot = {
//       name: pilotData.name,
//       address: pilotData.address,
//       location: pilotData.location,
//       taluka: pilotData.taluka,
//       city: pilotData.city,
//       state: pilotData.state,
//       country: pilotData.country,
//       contactNo: pilotData.contactNo,
//       whatsAppNo: pilotData.whatsAppNo,
//       aadharCardNo: pilotData.aadharCardNo,
//       panCardNo: pilotData.panCardNo,
//       emailId: pilotData.email,
//       pilotLicenceNumber: pilotData.pilotLicenceNumber,
//       validUpto: pilotData.validUpto,
//       licenceType: pilotData.licenceType,
//       flyingExperience: pilotData.flyingExperience,
//       previousExperienceSummary: pilotData.previousExperienceSummary,
//       flyingDroneName: pilotData.flyingDroneName,
//       fir: pilotData.fir,
//     };

//     try {
//       console.log('Saving pilot data:', pilot);
//       const pilotId = route?.params?.pilotId;
//       if (pilotId) {
//         console.log('Updating pilot with ID:', pilotId);
//         await updatePilot(pilotId, pilot);
//         console.log('Pilot updated successfully');
//         Alert.alert('Success', 'Pilot details updated successfully!', [
//           { text: 'OK', onPress: () => navigation.navigate('PilotList') },
//         ]);
//       } else {
//         console.log('Creating new pilot');
//         const newPilotId = await createPilot(pilot);
//         console.log('Pilot created with ID:', newPilotId);
//         Alert.alert('Success', `Pilot details saved successfully! ID: ${newPilotId}`, [
//           { text: 'OK' },
//         ]);
//       }
//     } catch (err) {
//       console.error('Error saving pilot:', err);
//       Alert.alert('Error', 'Failed to save pilot details.');
//     }
//   };

//   const renderField = (
//     label: string,
//     field: keyof typeof pilotData,
//     icon: MaterialCommunityIconName,
//     keyboardType: 'default' | 'email-address' | 'phone-pad' | 'numeric' = 'default'
//   ) => {
//     const isEditing = editingField === field;
//     return (
//       <View style={styles.fieldContainer}>
//         <Text style={styles.fieldLabel}>{label}</Text>
//         <View style={styles.fieldRow}>
//           <MaterialCommunityIcons name={icon} size={20} color="#2ECC71" style={styles.fieldIcon} />
//           {isEditing ? (
//             <TextInput
//               style={styles.input}
//               value={pilotData[field]}
//               onChangeText={text => handleChange(field, text)}
//               placeholder={`Enter ${label.toLowerCase()}`}
//               keyboardType={keyboardType}
//               autoFocus
//             />
//           ) : (
//             <Text style={styles.fieldValue}>
//               {pilotData[field] || `No ${label.toLowerCase()} provided`}
//             </Text>
//           )}
//           <TouchableOpacity
//             onPress={() => setEditingField(isEditing ? null : field)}
//             style={styles.editButton}
//           >
//             <MaterialCommunityIcons
//               name={isEditing ? 'check' : 'pencil'}
//               size={20}
//               color="#2ECC71"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   const renderRadioField = (
//     label: string,
//     field: keyof typeof pilotData,
//     icon: MaterialCommunityIconName
//   ) => {
//     const isEditing = editingField === field;
//     return (
//       <View style={styles.fieldContainer}>
//         <Text style={styles.fieldLabel}>{label}</Text>
//         <View style={styles.fieldRow}>
//           <MaterialCommunityIcons name={icon} size={20} color="#2ECC71" style={styles.fieldIcon} />
//           {isEditing ? (
//             <View style={styles.radioContainer}>
//               <TouchableOpacity
//                 style={[
//                   styles.radioButton,
//                   pilotData[field] === 'Yes' && styles.radioButtonSelected,
//                 ]}
//                 onPress={() => handleChange(field, 'Yes')}
//               >
//                 <Text
//                   style={[
//                     styles.radioText,
//                     pilotData[field] === 'Yes' && styles.radioTextSelected,
//                   ]}
//                 >
//                   Yes
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[
//                   styles.radioButton,
//                   pilotData[field] === 'No' && styles.radioButtonSelected,
//                 ]}
//                 onPress={() => handleChange(field, 'No')}
//               >
//                 <Text
//                   style={[
//                     styles.radioText,
//                     pilotData[field] === 'No' && styles.radioTextSelected,
//                   ]}
//                 >
//                   No
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <Text style={styles.fieldValue}>{pilotData[field]}</Text>
//           )}
//           <TouchableOpacity
//             onPress={() => setEditingField(isEditing ? null : field)}
//             style={styles.editButton}
//           >
//             <MaterialCommunityIcons
//               name={isEditing ? 'check' : 'pencil'}
//               size={20}
//               color="#2ECC71"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Pilot Details</Text>
//       </View>
//       <ScrollView contentContainerStyle={styles.content}>
//         <View style={styles.imageContainer}>
//           <Image
//             source={image ? { uri: image } : require('./../../assets/images/Azmuth.png')}
//             style={styles.profileImage}
//           />
//           <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
//             <MaterialCommunityIcons name="camera" size={20} color="#FFF" style={styles.uploadIcon} />
//             <Text style={styles.uploadButtonText}>Upload Image</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.sectionTitle}>Personal Information</Text>
//         {renderField('Name', 'name', 'account')}
//         {renderField('Address', 'address', 'home')}
//         {renderField('Location', 'location', 'map-marker')}
//         {renderField('Taluka', 'taluka', 'map')}
//         {renderField('City', 'city', 'city')}
//         {renderField('State', 'state', 'earth')}
//         {renderField('Country', 'country', 'flag')}
//         {renderField('Contact No', 'contactNo', 'phone', 'phone-pad')}
//         {renderField('WhatsApp No', 'whatsAppNo', 'whatsapp', 'phone-pad')}
//         {renderField('Aadhar Card No', 'aadharCardNo', 'card-account-details', 'numeric')}
//         {renderField('PAN Card No', 'panCardNo', 'card-account-details-outline')}
//         {renderField('Email', 'email', 'email', 'email-address')}

//         <Text style={styles.sectionTitle}>Licence Details</Text>
//         {renderField('Pilot Licence Number', 'pilotLicenceNumber', 'certificate')}
//         {renderField('Valid Upto', 'validUpto', 'calendar')}
//         {renderField('Licence Type', 'licenceType', 'certificate')}
//         {renderField('Flying Experience', 'flyingExperience', 'drone')}
//         {renderField('Previous Experience Summary', 'previousExperienceSummary', 'text')}
//         {renderField('Flying Drone Name', 'flyingDroneName', 'drone')}
//         {renderRadioField('FIR', 'fir', 'text')}

//         <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//           <Text style={styles.saveButtonText}>Save Details</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F6FA',
//   },
//   header: {
//     padding: 20,
//     backgroundColor: '#FFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   content: {
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 15,
//     marginTop: 10,
//   },
//   imageContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#E0E0E0',
//   },
//   uploadButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//     backgroundColor: '#2ECC71',
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//   },
//   uploadIcon: {
//     marginRight: 5,
//   },
//   uploadButtonText: {
//     color: '#FFF',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   fieldContainer: {
//     marginBottom: 15,
//   },
//   fieldLabel: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   fieldRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//     borderRadius: 8,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   fieldIcon: {
//     marginRight: 10,
//   },
//   fieldValue: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//     padding: 0,
//   },
//   radioContainer: {
//     flexDirection: 'row',
//     flex: 1,
//   },
//   radioButton: {
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     borderWidth: 1,
//     borderColor: '#2ECC71',
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   radioButtonSelected: {
//     backgroundColor: '#2ECC71',
//   },
//   radioText: {
//     fontSize: 14,
//     color: '#2ECC71',
//   },
//   radioTextSelected: {
//     color: '#FFF',
//   },
//   editButton: {
//     padding: 5,
//   },
//   saveButton: {
//     backgroundColor: '#2ECC71',
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   saveButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
// });

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type IconName = 'account' | 'home' | 'map-marker' | 'city' | 'earth' | 'flag' | 'phone' | 'whatsapp' | 'card-account-details' | 'email';

export default function PilotDetailsScreen({ navigation }: { navigation: any }) {
  const [pilotData, setPilotData] = useState({
    name: '',
    address: '',
    location: '',
    taluka: '',
    city: '',
    state: '',
    country: '',
    contactNo: '',
    whatsAppNo: '',
    aadharCardNo: '',
    panCardNo: '',
    emailId: '',
  });

  const [editingField, setEditingField] = useState<string | null>(null);

  const handleChange = (field: keyof typeof pilotData, value: string) => {
    setPilotData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    navigation.navigate('PilotLicenseDetails');
  };

  const renderField = (
    label: string,
    field: keyof typeof pilotData,
    icon: IconName,
    keyboardType: 'default' | 'email-address' | 'phone-pad' | 'numeric' = 'default'
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldRow}>
        <MaterialCommunityIcons name={icon} size={20} color="#2ECC71" style={styles.fieldIcon} />
        {editingField === field ? (
          <TextInput
            style={styles.input}
            value={pilotData[field]}
            onChangeText={text => handleChange(field, text)}
            keyboardType={keyboardType}
            autoFocus
          />
        ) : (
          <Text style={styles.fieldValue}>{pilotData[field] || `Add ${label}`}</Text>
        )}
        <TouchableOpacity onPress={() => setEditingField(editingField === field ? null : field)}>
          <MaterialCommunityIcons
            name={editingField === field ? 'check' : 'pencil'}
            size={20}
            color="#2ECC71"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pilot Personal Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {renderField('Name', 'name', 'account')}
        {renderField('Address', 'address', 'home')}
        {renderField('Location', 'location', 'map-marker')}
        {renderField('Taluka', 'taluka', 'city')}
        {renderField('City', 'city', 'city')}
        {renderField('State', 'state', 'earth')}
        {renderField('Country', 'country', 'flag')}
        {renderField('Contact No', 'contactNo', 'phone', 'phone-pad')}
        {renderField('WhatsApp No', 'whatsAppNo', 'whatsapp', 'phone-pad')}
        {renderField('Aadhar Card No', 'aadharCardNo', 'card-account-details', 'numeric')}
        {renderField('PAN Card No', 'panCardNo', 'card-account-details', 'numeric')}
        {renderField('Email ID', 'emailId', 'email', 'email-address')}

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next: License Details</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  content: { padding: 20 },
  fieldContainer: { marginBottom: 15 },
  fieldLabel: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  fieldIcon: { marginRight: 10 },
  fieldValue: { flex: 1, fontSize: 16, color: '#333' },
  input: { flex: 1, fontSize: 16, color: '#333', padding: 0 },
  nextButton: {
    backgroundColor: '#2ECC71',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
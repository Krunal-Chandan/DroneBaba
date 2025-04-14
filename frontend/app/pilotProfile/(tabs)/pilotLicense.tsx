import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

type IconName = 'license' | 'clock' | 'drone' | 'alert-circle';

export default function PilotLicenseDetailsScreen({ route, navigation }: { route: any, navigation: any }) {
  const [licenseData, setLicenseData] = useState({
    pilotLicenseNo: '',
    validUpto: '',
    licenseType: '',
    flyingExp: '',
    previousExpSummary: '',
    flyingDroneName: '',
    fir: 'NO',
  });

  const [editingField, setEditingField] = useState<string | null>(null);

  const licenseTypes = ['Commercial', 'Recreational', 'Other'];
  const firOptions = ['YES', 'NO'];

  const handleChange = (field: keyof typeof licenseData, value: string) => {
    setLicenseData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const completeData = { ...route.params.pilotData, ...licenseData };
    console.log('Complete Pilot Data:', completeData);
    Alert.alert('Success', 'Pilot data saved!');
    navigation.navigate('PilotList');
  };

  const renderField = (
    label: string,
    field: keyof typeof licenseData,
    icon: IconName,
    keyboardType: 'default' | 'numeric' = 'default'
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldRow}>
        <MaterialCommunityIcons name={icon} size={20} color="#2ECC71" style={styles.fieldIcon} />
        {editingField === field ? (
          <TextInput
            style={styles.input}
            value={licenseData[field]}
            onChangeText={text => handleChange(field, text)}
            keyboardType={keyboardType}
            autoFocus
          />
        ) : (
          <Text style={styles.fieldValue}>{licenseData[field] || `Add ${label}`}</Text>
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

  const renderPickerField = (
    label: string,
    field: keyof typeof licenseData,
    icon: IconName,
    options: string[]
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldRow}>
        <MaterialCommunityIcons name={icon} size={20} color="#2ECC71" style={styles.fieldIcon} />
        {editingField === field ? (
          <Picker
            selectedValue={licenseData[field]}
            onValueChange={(value) => handleChange(field, value)}
            style={styles.picker}
          >
            {options.map(option => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        ) : (
          <Text style={styles.fieldValue}>{licenseData[field] || `Select ${label}`}</Text>
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
        <Text style={styles.headerTitle}>Pilot License Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {renderField('License Number', 'pilotLicenseNo', 'license', 'numeric')}
        {renderField('Valid Upto', 'validUpto', 'clock')}
        {renderPickerField('License Type', 'licenseType', 'license', licenseTypes)}
        {renderField('Flying Experience', 'flyingExp', 'drone')}
        {renderField('Previous Experience', 'previousExpSummary', 'drone')}
        {renderField('Flying Drone Name', 'flyingDroneName', 'drone')}
        {renderPickerField('FIR Filed', 'fir', 'alert-circle', firOptions)}
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Pilot Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    header: { 
      padding: 20, 
      backgroundColor: '#FFF', 
      borderBottomWidth: 1, 
      borderBottomColor: '#E0E0E0',
      alignItems: 'center'
    },
    headerTitle: { 
      fontSize: 20, 
      fontWeight: 'bold', 
      color: '#333' 
    },
    content: { padding: 20 },
    fieldContainer: { marginBottom: 15 },
    fieldLabel: { 
      fontSize: 14, 
      fontWeight: 'bold', 
      color: '#333', 
      marginBottom: 5 
    },
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
    picker: { flex: 1, height: 40 },
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
    saveButton: {
      backgroundColor: '#2ECC71',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    saveButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
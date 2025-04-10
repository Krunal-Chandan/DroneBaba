// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { Database } from '@/components/database/FarmerDB'; // Assuming this is your database file

// export default function PricingScreen() {
//   const { farmerId, droneId, selectedDate, slotTime } = useLocalSearchParams();
//   const router = useRouter();
//   const { readFarmer } = Database();

//   const [pricingData, setPricingData] = useState({
//     farmArea: '',
//     costPerAcre: 10, // Hardcoded cost per acre ($10 per acre)
//     totalCost: 0,
//   });

//   // Fetch farm area based on farmerId
//   useEffect(() => {
//     if (farmerId) {
//       loadFarmData(farmerId as string);
//     }
//   }, [farmerId]);

//   const loadFarmData = async (farmerId: string) => {
//     try {
//       const farmer = await readFarmer(parseInt(farmerId));
//       if (farmer && farmer.farmArea) {
//         const area = parseFloat(farmer.farmArea) || 0;
//         setPricingData(prev => ({
//           ...prev,
//           farmArea: farmer.farmArea,
//           totalCost: area * prev.costPerAcre,
//         }));
//       } else {
//         Alert.alert('Error', 'Farm area not found for this farmer.');
//       }
//     } catch (err) {
//       Alert.alert('Error', 'Failed to load farm data.');
//     }
//   };

//   const handleConfirmBooking = () => {
//     // Placeholder for booking confirmation logic
//     Alert.alert('Success', 'Booking confirmed successfully!', [
//       { text: 'OK', onPress: () => router.replace('/Farmer/fhome') }, // Replace with your desired navigation
//     ]);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Pricing Details</Text>
//         <MaterialCommunityIcons name="drone" size={30} color="#2ECC71" />
//       </View>

//       {/* Pricing Information */}
//       <View style={styles.content}>
//         <Text style={styles.sectionTitle}>Booking Summary</Text>

//         {/* Booking Details Card */}
//         <View style={styles.card}>
//           <View style={styles.detailRow}>
//             <MaterialCommunityIcons name="calendar" size={24} color="#2ECC71" style={styles.icon} />
//             <Text style={styles.label}>Date:</Text>
//             <Text style={styles.value}>{selectedDate || 'Not selected'}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <MaterialCommunityIcons name="clock" size={24} color="#2ECC71" style={styles.icon} />
//             <Text style={styles.label}>Time:</Text>
//             <Text style={styles.value}>{slotTime || 'Not selected'}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <MaterialCommunityIcons name="ruler-square" size={24} color="#2ECC71" style={styles.icon} />
//             <Text style={styles.label}>Farm Area:</Text>
//             <Text style={styles.value}>{pricingData.farmArea ? `${pricingData.farmArea} acres` : 'Not available'}</Text>
//           </View>
//         </View>

//         {/* Pricing Details Card */}
//         <Text style={styles.sectionTitle}>Pricing Breakdown</Text>
//         <View style={styles.card}>
//           <View style={styles.detailRow}>
//             <MaterialCommunityIcons name="currency-usd" size={24} color="#2ECC71" style={styles.icon} />
//             <Text style={styles.label}>Cost per Acre:</Text>
//             <Text style={styles.value}>${pricingData.costPerAcre.toFixed(2)}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <MaterialCommunityIcons name="calculator" size={24} color="#2ECC71" style={styles.icon} />
//             <Text style={styles.label}>Total Cost:</Text>
//             <Text style={styles.value}>${pricingData.totalCost.toFixed(2)}</Text>
//           </View>
//         </View>

//         {/* Confirm Button */}
//         <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
//           <MaterialCommunityIcons name="check-circle" size={24} color="#FFF" style={styles.buttonIcon} />
//           <Text style={styles.buttonText}>Confirm Booking</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F6FA',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#FFF',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 15,
//   },
//   card: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 20,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     flex: 1,
//   },
//   value: {
//     fontSize: 16,
//     color: '#555',
//     flex: 1,
//     textAlign: 'right',
//   },
//   confirmButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#2ECC71',
//     paddingVertical: 15,
//     borderRadius: 12,
//     marginTop: 20,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   buttonIcon: {
//     marginRight: 10,
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
// });

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PricingScreen() {
    const { selectedDate, slotTime } = useLocalSearchParams();
    const router = useRouter();

    const [pricingData, setPricingData] = useState({
        farmArea: 'Not available',
        costPerAcre: 10, // Hardcoded cost per acre ($10 per acre)
        totalCost: 0,
    });

    const handleConfirmBooking = () => {
        Alert.alert('Success', 'Booking confirmed successfully!', [
            { text: 'OK', onPress: () => router.replace('/Farmer/fhome') },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Pricing Details</Text>
                <MaterialCommunityIcons name="drone" size={30} color="#2ECC71" />
            </View>

            {/* Pricing Information */}
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Booking Summary</Text>

                {/* Booking Details Card */}
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
                        <MaterialCommunityIcons name="ruler-square" size={24} color="#2ECC71" style={styles.icon} />
                        <Text style={styles.label}>Farm Area:</Text>
                        <Text style={styles.value}>{pricingData.farmArea}</Text>
                    </View>
                </View>

                {/* Pricing Details Card */}
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

                {/* Confirm Button */}
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

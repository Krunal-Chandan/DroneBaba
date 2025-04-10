// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'expo-router';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// // Hardcoded drone data (same as before, covering March 26 to April 13, 2025)
// const dronesData = [
//   {
//     id: 'D001',
//     name: 'SkySpray 1000',
//     owner: 'DroneOwner1',
//     city: 'Nagpur',
//     availability: [
//       {
//         date: '2025-03-26', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-03-27', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-03-28', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-03-29', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-03-30', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-03-31', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-01', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-02', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-03', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-04', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-05', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-06', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-07', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-08', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-09', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-10', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-11', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-12', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-13', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//     ],
//   },
//   {
//     id: 'D002',
//     name: 'AgriFly 200',
//     owner: 'DroneOwner2',
//     city: 'Goa',
//     availability: [
//       {
//         date: '2025-03-26', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-03-27', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-03-28', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-03-29', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-03-30', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-03-31', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-01', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-02', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-03', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-04', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-05', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-06', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-07', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-08', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-09', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-10', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-11', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-12', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-13', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Booked', coverage: '1 acre' },
//         ]
//       },
//     ],
//   },
//   {
//     id: 'D003',
//     name: 'CropDuster 500',
//     owner: 'DroneOwner3',
//     city: 'Nagpur',
//     availability: [
//       {
//         date: '2025-03-26', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-03-27', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-03-28', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-03-29', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-03-30', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-03-31', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-01', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-02', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-03', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-04', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-05', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-06', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-07', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-08', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-09', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-10', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-11', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-12', slots: [
//           { time: '08:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Booked', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//       {
//         date: '2025-04-13', slots: [
//           { time: '08:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '09:00 AM', status: 'Available', coverage: '1 acre' },
//           { time: '10:00 AM', status: 'Available', coverage: '1 acre' },
//         ]
//       },
//     ],
//   },
// ];

// export default function FarmerDashboard() {
//   const [selectedDate, setSelectedDate] = useState('');
//   const router = useRouter();

//   // Set the selected date to 3 days after the current date when the component mounts
//   useEffect(() => {
//     const currentDate = new Date(); // Dynamically get the current date
//     const minDate = new Date(currentDate);
//     minDate.setDate(currentDate.getDate() + 3); // 3 days after current date
//     const formattedDate = minDate.toISOString().split('T')[0]; // e.g., "2025-03-26"
//     setSelectedDate(formattedDate);
//   }, []); // Empty dependency array ensures this runs only on mount

//   // Generate dates from 3 days after the current date to 3 weeks after the current date
//   const generateDates = () => {
//     const dates = [];
//     const currentDate = new Date(); // Use the current date
//     const startDate = new Date(currentDate);
//     startDate.setDate(currentDate.getDate() + 3); // Start 3 days after current date
//     const endDate = new Date(currentDate);
//     endDate.setDate(currentDate.getDate() + 21); // End 3 weeks (21 days) after current date

//     for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
//       const day = date.toLocaleString('default', { weekday: 'short' }).toUpperCase();
//       const dayNum = date.getDate();
//       const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
//       const formattedDate = date.toISOString().split('T')[0]; // e.g., "2025-03-26"
//       dates.push({ day, dayNum, month, formattedDate });
//     }
//     return dates;
//   };

//   const dates = generateDates();

//   const filteredDrones = dronesData.filter(drone => {
//     const availabilityForDate = drone.availability.find(avail => avail.date === selectedDate);
//     if (!availabilityForDate) return false;
//     return availabilityForDate.slots.some(slot => slot.status === 'Available');
//   });

//   const DroneSlots = ({ drone }: { drone: any }) => {
//     const availability = drone.availability.find((avail: { date: string; }) => avail.date === selectedDate);
//     const availableSlots = availability?.slots.filter((slot: { status: string; }) => slot.status === 'Available') || [];

//     return (
//       <View style={styles.locationContainer}>
//         <View style={styles.locationHeader}>
//           <Text style={styles.locationTitle}>{drone.name}, {drone.city}</Text>
//           <TouchableOpacity onPress={() => console.log(`View info for ${drone.name}`)}>
//             <Text style={styles.infoLink}>INFO</Text>
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.cancellationText}>Booking Available</Text>
//         <View style={styles.slotsContainer}>
//           {availableSlots.length === 0 ? (
//             <Text style={styles.noSlots}>No slots available</Text>
//           ) : (
//             availableSlots.map((slot: any, index: any) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.slotButton}
//                 onPress={() => {
//                   console.log(`Booking drone ${drone.id} on ${selectedDate} at ${slot.time}`)
//                   router.push("/Farmer/selectFarm")
//                   params: { drone.id, selectedDate, slot.time }
//                 }}
//               >
//                 <Text style={styles.slotText}>{slot.time}</Text>
//                 <Text style={styles.slotSubText}>Covers {slot.coverage}</Text>
//               </TouchableOpacity>
//             ))
//           )}
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerIcons}>
//           <TouchableOpacity onPress={()=>{
//             router.replace('/Farmer/(tabs)/farmerProfile')
//           }}>
//             <MaterialCommunityIcons name="account-circle-outline" size={35} color="black" style={styles.icon} />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <MaterialCommunityIcons name="menu" size={35} color="black" style={styles.icon} />
//           </TouchableOpacity>
//         </View>
//       </View>
//       {/*  */}
//       <Text style={styles.header2}>Book a Drone</Text>
//       <Text style={styles.coverage}>Coverage: 1 acre per hour</Text>

//       {/* Date Selection Grid (Horizontal Scroll) */}
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
//         <View style={styles.dateContainer}>
//           {dates.map((date, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.dateButton,
//                 selectedDate === date.formattedDate && styles.selectedDateButton,
//               ]}
//               onPress={() => setSelectedDate(date.formattedDate)}
//             >
//               <Text style={[
//                 styles.dateDay,
//                 selectedDate === date.formattedDate && styles.selectedDateText,
//               ]}>{date.day}</Text>
//               <Text style={[
//                 styles.dateNum,
//                 selectedDate === date.formattedDate && styles.selectedDateText,
//               ]}>{date.dayNum}</Text>
//               <Text style={[
//                 styles.dateMonth,
//                 selectedDate === date.formattedDate && styles.selectedDateText,
//               ]}>{date.month}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>

//       {/* Drone List with Slots */}
//       <ScrollView style={styles.droneContainer}>
//         {filteredDrones.length === 0 ? (
//           <Text style={styles.noData}>No drones available on {selectedDate}</Text>
//         ) : (
//           filteredDrones.map(drone => (
//             <DroneSlots key={drone.id} drone={drone} />
//           ))
//         )}
//       </ScrollView>

//       <Text style={styles.infoText}>* Slots indicate available booking times for drone usage</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#ffffff',
//   },
//   header: {
//     flexDirection: 'row',
//     marginTop: 30,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     paddingVertical: 10,
//     // borderBottomWidth: 1,
//     // borderColor: '#ccc',
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textTransform: 'uppercase',
//   },
//   headerIcons: {
//     flexDirection: 'row',
//   },
//   icon: {
//     width: 35,
//     height: 35,
//     marginLeft: 10,
//   },
//   header2: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     fontFamily: 'Gaga',
//     color: '#000',
//     marginTop: 20,
//   },
//   coverage: {
//     fontSize: 16,
//     marginVertical: 10,
//     fontFamily: 'Gaga',
//     color: '#000',
//   },
//   dateScroll: {
//     marginBottom: 15,
//     maxHeight: 100,
//   },
//   dateContainer: {
//     flexDirection: 'row',
//   },
//   dateButton: {
//     alignItems: 'center',
//     // lineHeight: 10,  
//     paddingVertical: 5, // Reduced padding to make the button shorter
//     paddingHorizontal: 10, // Adjusted for better spacing
//     borderRadius: 5,
//     backgroundColor: '#f0f0f0',
//     marginRight: 10, // Space between date buttons
//     width: 60, // Fixed width for each date button
//     height: 90, // Fixed height for each date button
//     justifyContent: 'center',
//   },
//   selectedDateButton: {
//     backgroundColor: '#ff0000', // Red background for selected date
//   },
//   dateDay: {
//     fontSize: 10, // Reduced font size
//     fontFamily: 'Gaga',
//     color: '#000',
//   },
//   dateNum: {
//     fontSize: 14, // Reduced font size
//     fontWeight: 'bold',
//     fontFamily: 'Gaga',
//     color: '#000',
//   },
//   dateMonth: {
//     fontSize: 10, // Reduced font size
//     fontFamily: 'Gaga',
//     color: '#000',
//   },
//   selectedDateText: {
//     color: '#fff', // White text for selected date
//   },
//   droneContainer: {
//     flex: 1,
//   },
//   locationContainer: {
//     marginBottom: 20,
//   },
//   locationHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   locationTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     fontFamily: 'Gaga',
//     color: '#000',
//   },
//   infoLink: {
//     fontSize: 14,
//     fontFamily: 'Gaga',
//     color: '#007AFF', // Blue color for "INFO"
//   },
//   cancellationText: {
//     fontSize: 14,
//     color: 'green', // Green to indicate availability
//     fontFamily: 'Gaga',
//     marginVertical: 5,
//   },
//   slotsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   slotButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: '#4CAF50', // Green border like the showtime buttons
//     borderRadius: 5,
//     marginRight: 10,
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   slotText: {
//     fontSize: 14,
//     fontFamily: 'Gaga',
//     color: '#4CAF50', // Green text for available slots
//   },
//   slotSubText: {
//     fontSize: 12,
//     fontFamily: 'Gaga',
//     color: '#666',
//   },
//   noSlots: {
//     fontSize: 14,
//     fontFamily: 'Gaga',
//     color: '666',
//   },
//   noData: {
//     fontSize: 18,
//     fontFamily: 'Gaga',
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   infoText: {
//     fontSize: 12,
//     fontFamily: 'Gaga',
//     color: 'gray',
//     marginTop: 20,
//   },
// }); 

import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { dronesData } from '@/components/DroneDetails'; // Import the drone data

export default function FarmerDashboard() {
  const [selectedDate, setSelectedDate] = useState('');
  const router = useRouter();

  // Set the selected date to 3 days after the current date when the component mounts
  useEffect(() => {
    const currentDate = new Date(); // Dynamically get the current date
    const minDate = new Date(currentDate);
    minDate.setDate(currentDate.getDate() + 3); // 3 days after current date
    const formattedDate = minDate.toISOString().split('T')[0]; // e.g., "2025-03-26"
    setSelectedDate(formattedDate);
  }, []); // Empty dependency array ensures this runs only on mount

  // Generate dates from 3 days after the current date to 3 weeks after the current date
  const generateDates = () => {
    const dates = [];
    const currentDate = new Date(); // Use the current date
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() + 3); // Start 3 days after current date
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 21); // End 3 weeks (21 days) after current date

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const day = date.toLocaleString('default', { weekday: 'short' }).toUpperCase();
      const dayNum = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
      const formattedDate = date.toISOString().split('T')[0]; // e.g., "2025-03-26"
      dates.push({ day, dayNum, month, formattedDate });
    }
    return dates;
  };

  const dates = generateDates();

  const filteredDrones = dronesData.filter(drone => {
    const availabilityForDate = drone.availability.find(avail => avail.date === selectedDate);
    if (!availabilityForDate) return false;
    return availabilityForDate.slots.some(slot => slot.status === 'Available');
  });

  const DroneSlots = ({ drone }: { drone: any }) => {
    const availability = drone.availability.find((avail: { date: string; }) => avail.date === selectedDate);
    const availableSlots = availability?.slots.filter((slot: { status: string; }) => slot.status === 'Available') || [];

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
                    pathname: "/Farmer/selectFarm",
                    params: { droneId: drone.id, selectedDate, slotTime: slot.time }
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          {/* <MaterialCommunityIcons name="home" size={40} color="#333" style={styles.icon} /> */}
          <Text style={[styles.headerTitle, { marginTop: 0, marginLeft: 10 }]}>Book Drone</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => {
            router.push('/farmerProfile/(tabs)/farmerProfile');
          }}>
            <MaterialCommunityIcons name="account-circle-outline" size={40} color="#333" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="menu" size={40} color="#333" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* <Text style={styles.headerTitle}>Book a Drone</Text> */}
      <Text style={styles.coverage}>Coverage: 1 acre per hour</Text>

      {/* Date Selection Grid (Horizontal Scroll) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
        <View style={styles.dateContainer}>
          {dates.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateButton,
                selectedDate === date.formattedDate && styles.selectedDateButton,
              ]}
              onPress={() => setSelectedDate(date.formattedDate)}
            >
              <Text style={[
                styles.dateDay,
                selectedDate === date.formattedDate && styles.selectedDateText,
              ]}>{date.day}</Text>
              <Text style={[
                styles.dateNum,
                selectedDate === date.formattedDate && styles.selectedDateText,
              ]}>{date.dayNum}</Text>
              <Text style={[
                styles.dateMonth,
                selectedDate === date.formattedDate && styles.selectedDateText,
              ]}>{date.month}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Drone List with Slots */}
      <ScrollView style={styles.droneContainer}>
        {filteredDrones.length === 0 ? (
          <Text style={styles.noData}>No drones available on {selectedDate}</Text>
        ) : (
          filteredDrones.map(drone => (
            <DroneSlots key={drone.id} drone={drone} />
          ))
        )}
      </ScrollView>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    // backgroundColor: 'white',
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
    marginTop: 20,
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
    backgroundColor: '#E74C3C', // Red background for selected date
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
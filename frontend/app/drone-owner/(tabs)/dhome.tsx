// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// export default function dhome() {
//   const workItems = [
//     {
//       id: 1,
//       name: 'Farmers name, location',
//       details: 'ex., 5 Acre\nex., Standard ex., date and Time\nex., Earning: Rs. 2500/-',
//       link: 'https://maps.app.goo.gl/16MGbR9QGimPu9tb8',
//     },
//     {
//       id: 2,
//       name: 'Farmers name, location',
//       details: 'ex., 5 Acre\nex., Standard ex., date and Time\nex., Earning: Rs. 2500/-',
//       link: 'https://maps.app.goo.gl/w6CPAPLb7J6dBGyL8',
//     },
//   ];

//   const nav = useRouter()

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>DRONE APP</Text>
//         <TouchableOpacity>
//           <MaterialIcons name="notifications" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.title}>Today's Work -</Text>
//       <ScrollView>
//         {workItems.map(item => (
//           <View key={item.id} style={styles.card}>
//             <Text style={styles.cardTitle}>{item.name}</Text>
//             <Text style={styles.cardDetails}>{item.details}</Text>
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity style={styles.button}>
//                 <Text style={styles.buttonText}>Accept</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.button}>
//                 <Text style={styles.buttonText}>Ignore</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.mapButton} onPress={() => Linking.openURL(item.link)} >
//                 <Text style={styles.mapText}>📍 Open Map</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//       <TouchableOpacity style={styles.fab}>
//         <Text style={styles.fabText}>Add Drone</Text>
//       </TouchableOpacity>
//       {/* <TouchableOpacity onPress={() => nav.push('/Farmer/farmerDashboard')}>
//         <Text>To home</Text>
//       </TouchableOpacity> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     padding: 16,
//     marginTop: 40,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#e0e0e0',
//     padding: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   title: {
//     fontSize: 24,
//     marginVertical: 10,
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 2,
//   },
//   cardTitle: {
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   cardDetails: {
//     marginVertical: 10,
//     fontSize: 14,
//     color: '#555',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   button: {
//     backgroundColor: '#555',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//   },
//   mapButton: {
//     paddingVertical: 10,
//   },
//   mapText: {
//     color: '#007bff',
//   },
//   fab: {
//     backgroundColor: '#007bff',
//     borderRadius: 50,
//     padding: 15,
//     position: 'absolute',
//     bottom: 50,
//     right: 20,
//   },
//   fabText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DHome() {
  const workItems = [
    {
      id: 1,
      name: 'John Doe, Nagpur',
      details: 'Area: 5 Acres\nType: Standard\nDate: 2025-04-06 10:00\nEarning: ₹2500',
      link: 'https://maps.app.goo.gl/16MGbR9QGimPu9tb8',
    },
    {
      id: 2,
      name: 'Jane Smith, Pune',
      details: 'Area: 3 Acres\nType: Premium\nDate: 2025-04-07 14:00\nEarning: ₹1800',
      link: 'https://maps.app.goo.gl/w6CPAPLb7J6dBGyL8',
    },
  ];

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Drone App</Text>
        <TouchableOpacity onPress={() => alert('Notifications clicked')}>
          <MaterialIcons name="notifications" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Today's Work</Text>

      {/* Work Items */}
      <ScrollView style={styles.scrollView}>
        {workItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDetails}>{item.details}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.acceptButton} onPress={() => alert(`Accepted job for ${item.name}`)}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ignoreButton} onPress={() => alert(`Ignored job for ${item.name}`)}>
                <Text style={styles.buttonText}>Ignore</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mapButton} onPress={() => Linking.openURL(item.link)}>
                <Text style={styles.mapText}>📍 Map</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* FAB for Adding Drone */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/drone-owner/addDrone')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    // marginTop: 'auto'
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 8,
  },
  cardDetails: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  ignoreButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  mapButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mapText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '500',
  },
  fab: {
    backgroundColor: '#007bff',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 6,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
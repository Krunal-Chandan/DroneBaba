import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import Colors from '@/components/Colors'

export default function SelectCity() {

  const [isSelected, setIsSelected] = useState<any | null>(null)
  const [isClicked, setIsClicked] = useState(true)
  const [city, setCity] = useState('')

  const nav = useRouter()

  const handleSelectCity = (city: string) => {
    nav.replace({
      pathname: '/(auth)/register',
      params: { selectedCity: city }, // Pass data as params
    });
  };

  const cities = [
    'Chandrapur',
    'Bhandara',
    'Nagpur',
    'Amravti',
    'Katol',
    'Hingna',
    'Wanadongri',
    'Goa'
  ]

  return (
    // <ScreenWrapper></ScreenWrapper>
    <View style={{ flex: 1, backgroundColor: Colors.PRIMARY, paddingHorizontal: 20, paddingVertical: 20 }}>

      <Text style={{ fontFamily: 'Gaga', fontSize: 30, color: '#000', marginTop: 40 }}>Select City</Text>

      <View>
        <FlatList style={{ marginTop: 40 }} numColumns={3} data={cities} renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setIsSelected(index)
              setCity(item)
              setIsClicked(false)
            }}
            style={{
              borderWidth: isSelected === index ? 3 : 2,
              borderColor: isSelected === index ? Colors.BGCOLOR2 : Colors.BGCOLOR,
              marginLeft: 20,
              marginBottom: 15,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 17,
              backgroundColor: Colors.BGCOLOR
            }}>
            <Text style={{ fontFamily: 'Gaga', color: isSelected === index ? 'black' : 'grey' }}>{item}</Text>
          </TouchableOpacity>
        )} />
      </View>

      <View style={{ flex: 0.9, justifyContent: 'flex-end' }}>
        <TouchableOpacity
          disabled={isClicked}
          onPress={() => {
            console.log(city)
            handleSelectCity(city)
            // nav.push('/register')
          }}
          style={{
            backgroundColor: isClicked === false ? 'red' : '#e3e3e3',
            marginHorizontal: 50,
            height: 50,
            borderRadius: 17,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: 'Gaga', color: isClicked === false ? '#fff' : 'grey', fontSize: 20 }} >Sign Up</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          disabled={isClicked}
          onPress={() => {
            console.log("Going to Farmer Home page")
            nav.push('/(auth)/trialpage')
          }}
          style={{
            backgroundColor: isClicked===false?'red': '#e3e3e3',
            marginHorizontal: 50,
            height: 50,
            borderRadius: 17,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: 'Gaga', color:  isClicked===false?'#fff':'grey', fontSize: 20 }} >Farmer</Text>
        </TouchableOpacity>
      </View> */}

      <View></View>

    </View>

  )
}

// import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
// import React, { useState } from 'react';
// import { useRouter } from 'expo-router';
// import Colors from '@/components/Colors';
// import { UserDB } from '@/components/UserDB';

// export default function SelectCity() {
//   const [isSelected, setIsSelected] = useState<any | null>(null);
//   const [isClicked, setIsClicked] = useState(true);
//   const [city, setCity] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [pass, setPass] = useState('');
//   const [role, setRole] = useState<string | undefined>('Farmer'); // Default to Farmer
//   const nav = useRouter();
//   const { createUser } = UserDB();

//   const handleSelectCity = async (city: string) => {
//     if (!name || !email || !pass || !role) {
//       console.log('Missing fields');
//       return;
//     }
//     try {
//       await createUser({ name, email, pass, city, role });
//       nav.push({
//         pathname: '/(auth)/register',
//         params: { name, email, pass, city, role },
//       });
//     } catch (err) {
//       console.error('Registration failed:', err);
//     }
//   };

//   const cities = ['Chandrapur', 'Bhandara', 'Nagpur', 'Amravti', 'Katol', 'Hingna', 'Wanadongri', 'Goa'];

//   return (
//     <View style={{ flex: 1, backgroundColor: Colors.PRIMARY, paddingHorizontal: 20, paddingVertical: 20 }}>
//       <Text style={{ fontFamily: 'Gaga', fontSize: 30, color: '#000', marginTop: 40 }}>Select City</Text>
//       <TextInput placeholder="Name" onChangeText={setName} value={name} style={styles.input} />
//       <TextInput placeholder="Email" onChangeText={setEmail} value={email} style={styles.input} />
//       <TextInput placeholder="Password" onChangeText={setPass} value={pass} secureTextEntry style={styles.input} />
//       <FlatList style={{ marginTop: 40 }} numColumns={3} data={cities} renderItem={({ item, index }) => (
//         <TouchableOpacity
//           onPress={() => {
//             setIsSelected(index);
//             setCity(item);
//             setIsClicked(false);
//           }}
//           style={{
//             borderWidth: isSelected === index ? 3 : 2,
//             borderColor: isSelected === index ? Colors.BGCOLOR2 : Colors.BGCOLOR,
//             marginLeft: 20,
//             marginBottom: 15,
//             paddingHorizontal: 10,
//             paddingVertical: 10,
//             borderRadius: 17,
//             backgroundColor: Colors.BGCOLOR,
//           }}>
//           <Text style={{ fontFamily: 'Gaga', color: isSelected === index ? 'black' : 'grey' }}>{item}</Text>
//         </TouchableOpacity>
//       )} />
//       <View style={{ flex: 0.9, justifyContent: 'flex-end' }}>
//         <TouchableOpacity
//           disabled={isClicked}
//           onPress={() => handleSelectCity(city)}
//           style={{
//             backgroundColor: isClicked === false ? 'red' : '#e3e3e3',
//             marginHorizontal: 50,
//             height: 50,
//             borderRadius: 17,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Text style={{ fontFamily: 'Gaga', color: isClicked === false ? '#fff' : 'grey', fontSize: 20 }}>Sign Up</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={{ marginTop: 30 }}>
//         <TouchableOpacity
//           disabled={isClicked}
//           onPress={() => nav.push('/(auth)/trialpage')}
//           style={{
//             backgroundColor: isClicked === false ? 'red' : '#e3e3e3',
//             marginHorizontal: 50,
//             height: 50,
//             borderRadius: 17,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Text style={{ fontFamily: 'Gaga', color: isClicked === false ? '#fff' : 'grey', fontSize: 20 }}>Farmer</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   input: { borderBottomWidth: 1, width: 200, marginVertical: 10, padding: 5, backgroundColor: Colors.BGCOLOR },
// });
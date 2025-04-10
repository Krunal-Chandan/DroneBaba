// CitySelectionScreen.js
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Button from '@/components/shared/button';
import { useRouter } from 'expo-router';

const CitySelectionScreen = () => {
  const nav = useRouter()
  return (
    <ScrollView>
      <View style={{ marginTop: 60 }}>
        <View style={styles.container}>
          <Button text="Farmer" onPress={() => { nav.push("/Farmer/(tabs)/fhome") }} />
          <Button text="Farmer Profile" onPress={() => { nav.push("/farmerProfile/(tabs)/farmerProfile") }} />
          <Button text="Farmer DB" onPress={() => { nav.push("/(dev)/farmerdbview") }} />
          <Button text="Pricing" onPress={() => { nav.push("/Farmer/pricing") }} />
          <Button text="Drone Owner" onPress={() => { nav.push("/drone-owner/(tabs)/dhome") }} />
          <Button text="Drone Profile" onPress={() => { nav.push("/drone-owner-Profile/(tabs)/drone-owner-Profile") }} />
          <Button text="Pilot" onPress={() => { nav.push("/Pilot/pilotHome") }} />
          <Button text="Pilot Profile" onPress={() => { nav.push("/pilotProfile/(tabs)/pilotProfile") }} />
          <Button text="Pilot Booking" onPress={() => { nav.push("/Pilot/pilotBooking") }} />
          <Button text="Login" onPress={() => { nav.push("/(auth)/login") }} />
          <Button text="Register" onPress={() => { nav.push("/(auth)/register") }} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    height: 'auto',
    margin: 'auto'
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default CitySelectionScreen;
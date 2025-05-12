import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Colors from '@/components/Colors';

export default function SelectCity() {
  const [isSelected, setIsSelected] = useState<any | null>(null);
  const [isClicked, setIsClicked] = useState(true);
  const [city, setCity] = useState('');
  const nav = useRouter();

  const handleSelectCity = (city: string) => {
    nav.replace({ pathname: '/(auth)/register', params: { selectedCity: city } });
  };

  const cities = [
    'Chandrapur',
    'Bhandara',
    'Nagpur',
    'Amravti',
    'Katol',
    'Hingna',
    'Wanadongri',
    'Goa',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Your City</Text>
      <View style={styles.cityListContainer}>
        <FlatList
          numColumns={3}
          data={cities}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setIsSelected(index);
                setCity(item);
                setIsClicked(false);
              }}
              style={[
                styles.cityButton,
                isSelected === index && styles.selectedCityButton,
              ]}
            >
              <Text
                style={[
                  styles.cityText,
                  isSelected === index && styles.selectedCityText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={isClicked}
          onPress={() => handleSelectCity(city)}
          style={[
            styles.signUpButton,
            isClicked && styles.disabledSignUpButton,
          ]}
        >
          <Text
            style={[
              styles.signUpText,
              isClicked && styles.disabledSignUpText,
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    fontSize: 30,
    color: '#333',
    // marginTop: 40,
    fontWeight: 'bold',
  },
  cityListContainer: {
    marginTop: 40,
  },
  cityButton: {
    borderWidth: 2,
    borderColor: Colors.BGCOLOR,
    marginLeft: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 17,
    backgroundColor: Colors.BGCOLOR,
  },
  selectedCityButton: {
    borderWidth: 3,
    borderColor: Colors.BGCOLOR,
    backgroundColor: Colors.BGCOLOR2,
  },
  cityText: {
    color: 'grey',
  },
  selectedCityText: {
    color: 'black',
  },
  buttonContainer: {
    flex: 0.9,
    justifyContent: 'flex-end',
  },
  signUpButton: {
    backgroundColor: Colors.BGCOLOR,
    marginHorizontal: 50,
    height: 50,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSignUpButton: {
    backgroundColor: Colors.BGCOLOR,
  },
  signUpText: {
    color: Colors.PRIMARY,
    fontSize: 20,
  },
  disabledSignUpText: {
    color: Colors.BGCOLOR2,
  },
});
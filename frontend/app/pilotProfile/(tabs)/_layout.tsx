import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="pilotProfile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pilotLicense"
        options={{
          title: 'License',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="sprout" size={30} color={color} />,
        }}
      />
    </Tabs>
  );
}

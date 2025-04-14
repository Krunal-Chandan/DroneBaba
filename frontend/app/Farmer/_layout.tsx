import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';

export default function DroneOwnerLayout() {

  useFonts({
    'Gaga': require('./../../assets/fonts/Gagalin-Regular.otf'),
    'Meri-sb': require('./../../assets/fonts/Merienda-SemiBold.ttf'),
    'Meri': require('./../../assets/fonts/Merienda-Bold.ttf'),
  })

  return (
    <SQLiteProvider databaseName="FarmerDB.db">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="selectFarm" />
      </Stack>
    </SQLiteProvider>
  );
}


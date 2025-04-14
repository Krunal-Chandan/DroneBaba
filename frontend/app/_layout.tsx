import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { SQLiteProvider } from 'expo-sqlite'
export default function RootLayout() {

  useFonts({
    'Gaga': require('./../assets/fonts/Gagalin-Regular.otf'),
    'Meri-sb': require('./../assets/fonts/Merienda-SemiBold.ttf'),
    'Meri': require('./../assets/fonts/Merienda-Bold.ttf'),
  })

  return (
    <SQLiteProvider databaseName="userDB.db">
      {/* <StatusBar hidden={true} /> */}
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
    </SQLiteProvider>
  )
}

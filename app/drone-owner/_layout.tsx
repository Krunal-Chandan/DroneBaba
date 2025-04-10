import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
export default function DroneOwnerLayout() {

    useFonts({
        'Gaga': require('./../../assets/fonts/Gagalin-Regular.otf'),
        'Meri-sb': require('./../../assets/fonts/Merienda-SemiBold.ttf'),
        'Meri': require('./../../assets/fonts/Merienda-Bold.ttf'),
    })

    //   return (
    //       <Stack initialRouteName="dhome" screenOptions={{headerShown: false}}>
    //         <Stack.Screen name="dhome" />
    //       </Stack>
    //   )

    // return <Redirect href="./dhome" />;
    return (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="dhome" />
        </Stack>
      );
}


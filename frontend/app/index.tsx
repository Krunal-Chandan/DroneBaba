import Colors from "@/components/Colors";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function Index() {

  const nav = useRouter()

  useEffect(() => {
    setTimeout(() => {
      nav.replace("/trialpage")
    }, 2000)
  }, [])
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.PRIMARY,
      }}
    >
      <Image source={require('./../assets/images/MainLogo.png')} style={{height:"100%", width:"100%", resizeMode:"contain"}} />
    </View>
  );
}

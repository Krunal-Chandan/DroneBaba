import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import Button from '@/components/shared/button'
import Colors from '@/components/Colors'
import { useRouter } from 'expo-router'

export default function landing() {

  const router = useRouter()

  return (
    <View style={{ flex: 1, backgroundColor: Colors.PRIMARY }}>
      <Image
        source={require("./../assets/images/authScreen.png")}
        style={{
          width: '100%',
          height: 550,
          position: 'absolute',
        }}
      />

      <View style={{
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: 400,
        backgroundColor: Colors.PRIMARY
      }}>
        <Text style={{
          fontSize: 50,
          fontFamily: 'Gaga',
          textAlign: 'center'
        }}>
          DroneBaba
        </Text>
        <Text style={{
          fontSize: 25,
          fontFamily: 'Gaga',
          textAlign: 'center',
          marginTop: 20
        }}>
          Tap, Spray, Grow
        </Text>
        <Text style={{
          fontSize: 20,
          fontFamily: 'Gaga',
          textAlign: 'center',
          marginTop: 20
        }}>
          Revolutionizing farming with precision drone services. Tap, spray, and grow smarter with DroneBaba{'\n\n'}
        </Text>
        <Button text='Get Started' onPress={() => router.push('/selectCity')} />
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={{
            fontSize: 20,
            fontFamily: 'Gaga',
            textAlign: 'center',
            marginTop: 2
          }}>
            Already have an account?? Sign In
          </Text>
        </TouchableOpacity>
      </View >
    </View >

  )
}
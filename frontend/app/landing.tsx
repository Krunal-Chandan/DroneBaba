import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Button from '@/components/shared/button';
import Colors from '@/components/Colors';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Landing() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('./../assets/images/authScreen.png')}
        style={styles.heroImage}
        resizeMode="cover"
      />

      <View style={styles.bottomSheet}>
        <Text style={styles.title}>DroneBaba</Text>
        <Text style={styles.tagline}>Tap, Spray, Grow</Text>
        <Text style={styles.description}>
          Revolutionizing farming with precision drone services. Tap, spray, and grow smarter with DroneBaba.
        </Text>

        <Button text="Get Started" onPress={() => router.push('/selectCity')} />

        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.loginText}>Already have an account? <Text style={styles.link}>Sign In</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  heroImage: {
    width: width,
    height: height * 0.65,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.45,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 25,
    paddingTop: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 42,
    fontFamily: 'Gaga',
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 20,
    fontFamily: 'Gaga',
    color: '#444',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    color: '#555',
    textAlign: 'center',
    marginVertical: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
  },
  link: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
  },
});

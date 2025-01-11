import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image style={styles.backgroundImage} source={require('../assets/images/Logo1.png')} />

      <LinearGradient
        colors={['transparent', Colors.background]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
      >
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.titleContainer}>
          <Text style={styles.title}>
          Suas <Text style={styles.highlight}>Refeições na palma </Text>
          </Text>
          <Text style={styles.title}>da mão.</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => router.push('/step')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>gerar dieta</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    position: 'absolute',
    height: '120%',
    width: '100%',
    resizeMode: 'contain',
     borderWidth: 0,
  },
  gradient: {
    width: wp(100),
    height: hp(70),
    justifyContent: 'flex-end',
    paddingBottom: hp(5),
    paddingHorizontal: wp(5),
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: hp(5),
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  highlight: {
    color: Colors.orange,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    height: hp(7),
    width: wp(80),
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  buttonText: {
    fontSize: hp(3),
    color: Colors.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

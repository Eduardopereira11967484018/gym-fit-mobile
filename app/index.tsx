import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../constants/Colors';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />

     

      <Text style={styles.text}>
      Start your journey with a personal trainer powered by artificial intelligence
      </Text>
      <Link href="/step" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>start training</Text>
        </Pressable>
      </Link>


      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.green,
    textAlign: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 16
    ,
    color: Colors.blue,
    width: 240,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.blue,
        width: '80%',
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        elevation: 4, // Para sombra no Android
        shadowColor: '#000', // Para sombra no iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
  },
  buttonText: {
    color: Colors.blue,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

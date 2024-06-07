import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { RNSScreen } from 'react-native-screens';


const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Navigate to the Home screen after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer if component is unmounted
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Adjust the path to your logo
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color of the splash screen
  },
  logo: {
    width: 200, // Adjust width and height as needed
    height: 200,
  },
});

export default SplashScreen;

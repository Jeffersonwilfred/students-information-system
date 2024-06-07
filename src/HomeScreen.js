import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';


const HomeScreen = ({ navigation }) => {
  const handleRoleSelect = (role) => {
      if (role === 'staff') {
        navigation.navigate('StaffLoginForm');
      } else if (role === 'student') {
        navigation.navigate('StudentLoginForm');
      }
    console.log(`Selected Role: ${role}`);
  };
  const handleButtonClick = () => {
    navigation.navigate('AdminLog'); // Replace 'OtherScreen' with the actual name of the screen you want to navigate to
  };
  

  return (
    
    <View style={styles.container}>
      <Text style={styles.label}>Choose Your Role?</Text>
      <TouchableOpacity onPress={() => handleRoleSelect('staff')}>
        <Image source={require('../assets/staff.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRoleSelect('student')}>
        <Image source={require('../assets/student.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleButtonClick()}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Admin</Text>
      </View>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  label: 
  {
    fontSize: 20,
    color: 'black',
    marginBottom: 50,
    justifyContent: 'space-between',
  },
  container: 
  {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: 
  {
    width: 250,
    height: 250,
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;

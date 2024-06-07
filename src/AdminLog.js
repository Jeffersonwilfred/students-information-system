import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from '../component/axiosConfig';


const AdminLog = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');



  const handleLogin = async () => {
    try {
      const response = await axios.post('/loginad', {
        id,
        password,
      });
      if (response.data.message === 'Invalid credentials') {
        setErrorMessage('Invalid credentials. Please try again.');
      } else {
        setErrorMessage('Login Successfully');
        console.log(response.data.message);
  
        navigation.navigate('Admain');

      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/log_staff.png')} // Add your logo image file to the project
        style={styles.logo}
      />
      <Text style={styles.label}>Welcome</Text>
      <TextInput
        style={styles.input}
        placeholder="Admin ID"
        placeholderTextColor="grey"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="grey"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.errorText}>{errorMessage}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    color: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'black',
    marginBottom: 40,

  },
  logo: {
    width: 155,
    height: 155,
    marginBottom: 35,
  },
  input: {
    width: '80%',
    height: 40,
    color: 'black',
    borderBottomWidth: 1,
    textDecorationColor: 'white',
    borderBottomColor: '#000',
    borderBottomColor: 'black',
    borderWidth: 0,
    borderRadius: 5,
    marginTop: 0,
    marginBottom: 40,
    paddingHorizontal: 7,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 25,
    marginTop: 25,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default AdminLog;

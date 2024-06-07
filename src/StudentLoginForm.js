import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import axios from '../component/axiosConfig';
import { useAppContext } from '../AppContext';

const StudentLoginForm = ({ navigation }) => {
  const { regNo, setRegNo } = useAppContext();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/studlogin', {
        reg_no: regNo, // Use regNo from context
        password: password,
      });

      if (response.data.message === 'Login successful') {
        const reg_no = response.data.reg_no;
        setRegNo(reg_no); // Save reg_no to context
        navigation.navigate('UserDetailsScreen');
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('Error in Network');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/log_stud.png')}
        style={styles.logo}
      />
      <Text style={styles.label}>Welcome</Text>
      <TextInput
        style={styles.input}
        placeholder="Registration Number"
        value={regNo} // Use regNo from context
        onChangeText={setRegNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {errorMessage && <Text style={styles.errorText}>Error: {errorMessage}</Text>}
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

export default StudentLoginForm;
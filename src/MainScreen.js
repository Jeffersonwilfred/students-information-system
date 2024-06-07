import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../component/axiosConfig';

const MainScreen = ({navigation}) => {
  const [username, setUsername] = useState('');

  
  return (
      <View style={styles.container}>
    <Text style={styles.welcomeText}>Welcome</Text>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MarkEntryScreen')}>
      <Text style={styles.buttonText}>To Enter Mark</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AttendanceEntryScreen')}>
      <Text style={styles.buttonText}>To Enter Attendance</Text>
    </TouchableOpacity>
  </View>
    );
  };
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
      },
      welcomeText: {
        fontSize: 24,
        marginBottom: 30,
        color: '#333',
      },
      button: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 15,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
    });
    
  

export default MainScreen;

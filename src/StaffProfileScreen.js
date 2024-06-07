import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from '../component/axiosConfig';

const validationSchema = Yup.object().shape({
  staff_id: Yup.string().required('Staff id is required'),
  username: Yup.string().matches(/^[A-Za-z\s]+$/, 'Name cannot contain numbers').required('Name is required'),
  password: Yup.string().required('Password is required'),
});

const StaffProfileScreen = () => {
    const [registrationStatus, setRegistrationStatus] = React.useState(null);
  const handleRegister = async (values) => {
    try {
      const response = await axios.post('/staffprofile', values);
      console.log(response.data);
      console.log(values);
      setRegistrationStatus('Registration successful');
    } catch (error) {
      console.error(error);
      setRegistrationStatus('Registration Failed');
    }
  };
    
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>
      <Formik
        initialValues={{
          staff_id: '',
          username: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
          <Text style={styles.label}>Create Staff Profile!</Text>
            <TextInput
              style={styles.input}
              placeholder="Staff ID"
              placeholderTextColor="gray"
              onChangeText={handleChange('staff_id')}
              onBlur={handleBlur('staff_id')}
              value={values.staff_id}
            />

            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="gray"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
        

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            

            <Button title="Register" style={styles.btn} onPress={handleSubmit}  />
          </>
        )}
      </Formik>
      {registrationStatus && <Text style={styles.registrationStatus}>{registrationStatus}</Text>}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
      flexGrow: 1,
    },
    container: {
      padding: 25,
      backgroundColor: 'white', // Changed background color to white
    },
    label: {
        fontSize: 45,
        marginBottom: 30,
        color: 'black', // Set label color here
      },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      fontSize: 16,
      color: 'black',
    },
    btn: {
      borderRadius: 100,
      backgroundColor: 'black', // Set button background color to black
    },
    registrationStatus: {
        fontSize: 16,
        color: 'green', // Set the color of the status message
        marginTop: 10, // Add some space above the status message
      },
  });
  
  export default StaffProfileScreen;
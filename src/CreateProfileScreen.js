import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from '../component/axiosConfig';

const validationSchema = Yup.object().shape({
  reg_no: Yup.string().required('Registration Number is required'),
  name: Yup.string().matches(/^[A-Za-z\s]+$/, 'Name cannot contain numbers').required('Name is required'),
  dob: Yup.date().required('Date of Birth is required').max(new Date(), 'Invalid Date'),
  course: Yup.string().required('Course is required'),
  section: Yup.string().required('Section is required'),
  phone_no: Yup.string().required('Phone Number is required'),
  email: Yup.string().matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Invalid email')
  .transform((value) => value.toLowerCase()).required('Email is required'),
  address: Yup.string().required('Address is required'),
  password: Yup.string().required('Password is required'),
});

const CreateProfileScreen = () => {
  const [registrationStatus, setRegistrationStatus] = React.useState(null);
  const handleRegister = async (values) => {
    try {
      const response = await axios.post('/profile', values);
      console.log(response.data);
      console.log(values);
      setRegistrationStatus('Registration Successfull');
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
          reg_no: '',
          name: '',
          dob: '',
          course: '',
          section: '',
          phone_no: '',
          email: '',
          address: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
          <Text style={styles.label}>Create Students Profile!</Text>
            <TextInput
              style={styles.input}
              placeholder="Registration Number"
              placeholderTextColor="gray"
              onChangeText={handleChange('reg_no')}
              onBlur={handleBlur('reg_no')}
              value={values.reg_no}
            />

            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="gray"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
        

            <TextInput
              style={styles.input}
              placeholder="Date of Birth (YYYY-MM-DD)"
              placeholderTextColor="gray"
              onChangeText={handleChange('dob')}
              onBlur={handleBlur('dob')}
              value={values.dob}
            />


            <TextInput
              style={styles.input}
              placeholder="Course"
              placeholderTextColor="gray"
              onChangeText={handleChange('course')}
              onBlur={handleBlur('course')}
              value={values.course}
            />
            

            <TextInput
              style={styles.input}
              placeholder="Section"
              placeholderTextColor="gray"
              onChangeText={handleChange('section')}
              onBlur={handleBlur('section')}
              value={values.section}
            />
            

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="gray"
              onChangeText={handleChange('phone_no')}
              onBlur={handleBlur('phone_no')}
              value={values.phone_no}
            />
            

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="gray"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            

            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="gray"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
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
  
  export default CreateProfileScreen;
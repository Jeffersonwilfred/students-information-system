import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from '../component/axiosConfig';


  const StudMain = ({ route }) => {
    console.log(route);
    const { reg_no } = route.params;
    const [studentData, setStudentData] = useState(null);



      
    // Now you have access to the reg_no
    // You can use it to retrieve additional data from your backend

  

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`/studentDetails/${reg_no}`);
        setStudentData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentData();
  }, [reg_no]);

  if (!studentData) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Name: {studentData.name}</Text>
      <Text>Date of Birth: {studentData.dob}</Text>
      <Text>Address: {studentData.address}</Text>
      <Text>Phone Number: {studentData.phone_no}</Text>
      <Text>Email: {studentData.email}</Text>
      <Text>Course: {studentData.course}</Text>
      <Text>Section: {studentData.section}</Text>
      <Text>Code: {studentData.code}</Text>
    </View>
  );
};

export default StudMain;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import axios from '../component/axiosConfig';

const AttendanceEntryScreen = () => {
  const [date, setDate] = useState('');
  const [period, setPeriod] = useState('');
  const [subject, setSubject] = useState('');
  const [attendance, setAttendance] = useState({});
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch registration numbers from the backend
    axios.get('/get_registration_numbers')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSaveAttendance = async () => {
    const attendanceData = students.map(reg_no => ({
      reg_no,
      date,
      period,
      subject,
      attendance: attendance[reg_no] || 'Absent', // Default attendance to Absent if not entered
    }));

    try {
      const response = await axios.post('/enter_attendance', attendanceData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Date:</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} />

      <Text style={styles.label}>Period:</Text>
      <TextInput style={styles.input} value={period} onChangeText={setPeriod} />

      <Text style={styles.label}>Subject:</Text>
      <TextInput style={styles.input} value={subject} onChangeText={setSubject} />

      {students.map(reg_no => (
        <View key={reg_no} style={styles.studentRow}>
          <Text style={styles.studentText}>{reg_no}</Text>
          <TextInput
            style={styles.input}
            value={attendance[reg_no] ? attendance[reg_no] : 'Absent'}
            onChangeText={value => setAttendance(prev => ({ ...prev, [reg_no]: value }))}
          />
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Save Attendance" onPress={handleSaveAttendance} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
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
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  studentText: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    marginBottom: 50,
  },
});

export default AttendanceEntryScreen;

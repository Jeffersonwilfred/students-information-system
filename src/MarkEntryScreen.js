import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import axios from '../component/axiosConfig';

const MarkEntryScreen = () => {
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [testNumber, setTestNumber] = useState('');
  const [marks, setMarks] = useState({});
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch registration numbers from backend
    axios.get('/get_registration_numbers')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSaveMarks = async () => {
    const markData = students.map(reg_no => ({
      reg_no,
      semester,
      subject,
      test_number: testNumber,
      marks: marks[reg_no] || 0, // Default marks to 0 if not entered
    }));

    try {
      const response = await axios.post('/enter_marks', markData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Select Semester:</Text>
      <TextInput style={styles.input} value={semester} onChangeText={setSemester} />

      <Text style={styles.label}>Select Subject:</Text>
      <TextInput style={styles.input} value={subject} onChangeText={setSubject} />

      <Text style={styles.label}>Test Number:</Text>
      <TextInput style={styles.input} value={testNumber} onChangeText={setTestNumber} />

      {students.map(reg_no => (
        <View key={reg_no} style={styles.studentRow}>
          <Text style={styles.studentText}>{reg_no}</Text>
          <TextInput
            style={styles.input}
            value={marks[reg_no] ? marks[reg_no].toString() : ''}
            onChangeText={value => setMarks(prev => ({ ...prev, [reg_no]: parseInt(value) }))}
          />
        </View>
      ))}
      <View style={styles.buttonContainer}>
      <Button title="Save Marks" onPress={handleSaveMarks} />
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
    color: 'black', // Set text color to black
  },
  buttonContainer: {
    marginBottom: 50, // Pushes the button to the bottom
  },
});

export default MarkEntryScreen;
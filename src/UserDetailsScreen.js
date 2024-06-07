import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from '../component/axiosConfig';
import { useAppContext } from '../AppContext';

const UserDetailsScreen = () => {
  const { regNo } = useAppContext();
  const [details, setDetails] = useState(null);
  const [marks, setMarks] = useState(null);
  const [error, setError] = useState(null);
 // const rawDate = new Date(details.dob);
 // const formattedDate = rawDate.toLocaleDateString();

  useEffect(() => {
    if (regNo) {
      axios.get(`/details/${regNo}`)
        .then(response => {
          setDetails(response.data.details);
        })
        .catch(error => {
          setError(error);
        });
        axios.get(`/marks/${regNo}`) // Fetch marks
        .then(response => {
          setMarks(response.data.marks);
        })
        .catch(error => {
          setError(error);
        });
    }
  }, [regNo]);

  return (
    <View style={styles.container}>
      {details ? (
       <View style={styles.detailsContainer}>
        <Text style={styles.label}>Personal Details</Text>
       <View style={styles.detailRow}>
         <Text style={styles.leftText}>Name:</Text>
         <Text style={styles.rightText}>{details.name}</Text>
       </View>
       <View style={styles.detailRow}>
         <Text style={styles.leftText}>Date of Birth:</Text>
         <Text style={styles.rightText}>{details.dob}</Text>
       </View>
       <View style={styles.detailRow}>
         <Text style={styles.leftText}>Course:</Text>
         <Text style={styles.rightText}>{details.course}</Text>
       </View>
       <View style={styles.detailRow}>
         <Text style={styles.leftText}>Section:</Text>
         <Text style={styles.rightText}>{details.section}</Text>
       </View>
       <View style={styles.detailRow}>
         <Text style={styles.leftText}>Phone Number:</Text>
         <Text style={styles.rightText}>{details.phone_no}</Text>
       </View>
       <View style={styles.detailRow}>
         <Text style={styles.leftText}>Email:</Text>
         <Text style={styles.rightText}>{details.email}</Text>
       </View>
       <View style={styles.detailRow}>
         <Text style={styles.leftText}>Address:</Text>
         <Text style={styles.rightText}>{details.address}</Text>
       </View>
       <View style={styles.line}></View>
     </View>
     

      ) : (
        <Text>Loading...</Text>
      )}
      {marks ? (
        <View style={styles.marksContainer}>
        <Text style={styles.marksLabel}>Marks</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Subject</Text>
            <Text style={styles.tableHeader}>Marks</Text>
            <Text style={styles.tableHeader}>Internal</Text>
          </View>
          {marks.map((mark, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{mark.subject}</Text>
              <Text style={styles.tableCell}>{mark.marks}</Text>
              <Text style={styles.tableCell}>{mark.test_number}</Text>
            </View>
          ))}
        </View>
        <View style={styles.line}></View>
      </View>
      
      ) : (
        <Text>Loading marks...</Text>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  rightText: {
    flex: 2,
    fontSize: 18,
    color: 'black',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
    color: 'black',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  marksLabel:
  {
    color: 'black',
    fontSize: 35,
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    flex: 1,
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: 'black',
    color: 'black', // Font color set to black
  },
  tableCell: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: 'black',
    color: 'black', // Font color set to black
  },
  
  
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default UserDetailsScreen;
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { AuthContext } from './AuthContext';

const PatientDetailScreen = ({ route }) => {
  const { patientId } = route.params;
  const { token } = useContext(AuthContext);
  const [patient, setPatient] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(
          `http://benessanaturals.com/hms/api/patients/read_one.php?patient_id=${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setPatient(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchClinicalNotes = async () => {
      try {
        const response = await fetch(
          `http://benessanaturals.com/hms/api/notes/read_by_patient.php?patient_id=${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setNotes(data.records);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatientDetails();
    fetchClinicalNotes();
  }, [patientId, token]);

  const renderNote = ({ item }) => {
    let content;
    try {
      content = JSON.parse(item.content);
    } catch (e) {
      content = { content: item.content };
    }


    return (
      <View>
        <Text>{item.note_date}</Text>
        <Text>{item.note_type}</Text>
        <Text>{item.provider_name}</Text>
        {item.note_type === 'SOAP Note' ? (
          <View>
            <Text>Subjective: {content.s}</Text>
            <Text>Objective: {content.o}</Text>
            <Text>Assessment: {content.a}</Text>
            <Text>Plan: {content.p}</Text>
          </View>
        ) : (
          <Text>{content.content}</Text>
        )}
      </View>
    );
  };

  if (!patient) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>
        {patient.first_name} {patient.last_name} ({patient.age}) - MRN: {patient.mrn}
      </Text>
      {/* Add more patient details here */}
      <Button
        title="Lab Reports"
        onPress={() => navigation.navigate('LabReports', { patientId })}
      />
      <Button
        title="Radiology Reports"
        onPress={() => navigation.navigate('RadiologyReports', { patientId })}
      />
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default PatientDetailScreen;

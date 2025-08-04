import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { AuthContext } from './AuthContext';

const LabReportsScreen = ({ route }) => {
  const { patientId } = route.params;
  const { token } = useContext(AuthContext);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchLabReports = async () => {
      try {
        const response = await fetch(
          `http://benessanaturals.com/hms/api/reports/read_lab_by_patient.php?patient_id=${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setReports(data.records);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLabReports();
  }, [patientId, token]);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.report_date}</Text>
      <Text>{item.report_name}</Text>
      <Text>{item.report_content}</Text>
    </View>
  );

  return (
    <View>
      <Text>Lab Reports</Text>
      <FlatList
        data={reports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default LabReportsScreen;

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { AuthContext } from './AuthContext';

const RadiologyReportsScreen = ({ route }) => {
  const { patientId } = route.params;
  const { token } = useContext(AuthContext);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchRadiologyReports = async () => {
      try {
        const response = await fetch(
          `http://benessanaturals.com/hms/api/reports/read_radiology_by_patient.php?patient_id=${patientId}`,
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

    fetchRadiologyReports();
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
      <Text>Radiology Reports</Text>
      <FlatList
        data={reports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default RadiologyReportsScreen;

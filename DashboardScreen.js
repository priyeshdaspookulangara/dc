import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { AuthContext } from './AuthContext';

const DashboardScreen = ({ navigation }) => {
  const { token, user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://benessanaturals.com/hms/api/appointments/read_by_provider.php?provider_id=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setAppointments(data.records);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchAppointments();
    }
  }, [user, token]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PatientDetail', { patientId: item.patient_id })
      }
    >
      <View>
        <Text>{item.appointment_time}</Text>
        <Text>{item.patient_name}</Text>
        <Text>{item.reason_for_visit}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>Today's Appointments</Text>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default DashboardScreen;

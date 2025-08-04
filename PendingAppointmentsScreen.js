import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { AuthContext } from './AuthContext';

const PendingAppointmentsScreen = ({ navigation }) => {
  const { token, user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPendingAppointments = async () => {
      try {
        const response = await fetch(
          `http://benessanaturals.com/hms/api/appointments/read_pending_by_provider.php?provider_id=${user.id}`,
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
      fetchPendingAppointments();
    }
  }, [user, token]);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.appointment_time}</Text>
      <Text>{item.patient_name}</Text>
      <Text>{item.reason_for_visit}</Text>
    </View>
  );

  return (
    <View>
      <Text>Pending Appointments</Text>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default PendingAppointmentsScreen;

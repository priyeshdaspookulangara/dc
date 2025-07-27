import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { AuthContext } from './AuthContext';

const PatientListScreen = ({ navigation }) => {
  const { token, user } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `http://benessanaturals.com/hms/api/patients/read_by_provider.php?provider_id=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setPatients(data.records);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchPatients();
    }
  }, [user, token]);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.first_name.toLowerCase().includes(search.toLowerCase()) ||
      patient.last_name.toLowerCase().includes(search.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PatientDetail', { patientId: item.id })
      }
    >
      <View>
        <Text>
          {item.first_name} {item.last_name}
        </Text>
        <Text>DOB: {item.date_of_birth}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <TextInput
        placeholder="Search by name or MRN"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredPatients}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default PatientListScreen;

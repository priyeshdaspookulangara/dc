import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './AuthContext';
import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen';
import PatientDetailScreen from './PatientDetailScreen';
import LabReportsScreen from './LabReportsScreen';
import RadiologyReportsScreen from './RadiologyReportsScreen';
import PatientListScreen from './PatientListScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="PatientDetail" component={PatientDetailScreen} />
          <Stack.Screen name="LabReports" component={LabReportsScreen} />
          <Stack.Screen name="RadiologyReports" component={RadiologyReportsScreen} />
          <Stack.Screen name="PatientList" component={PatientListScreen} />
          <Stack.Screen name="PendingAppointments" component={PendingAppointmentsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

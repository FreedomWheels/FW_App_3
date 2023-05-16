import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddStudentScreen from '../Screens/AddStudentScreen';
import HomePageScreen from '../Screens/HomePageScreen';

const Stack = createStackNavigator();

function AddStudentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePageScreen} />
      <Stack.Screen name="AddStudent" component={AddStudentScreen} />
      {/* <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
}

export default AddStudentStack;
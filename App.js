import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddStudentStack from './Navigations/AddStudentStack';
import { enableScreens } from 'react-native-screens';

enableScreens();



export default function App() {
  return (
    <NavigationContainer>
      <AddStudentStack />
    </NavigationContainer>
  );
}
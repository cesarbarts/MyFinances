import React from 'react';
import { View, Text } from 'react-native';
import HomeView from './screens/Home';
import EditarFinancasView from './screens/EditarFinanca';
import Analisar from "./screens/Analisar"

import { createStackNavigator } from '@react-navigation/stack';

export default function Stacks() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          shadowOpacity: 0,
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Inicio" component={HomeView}></Stack.Screen>
      <Stack.Screen name="Analisar" component={Analisar}></Stack.Screen>
      
      <Stack.Screen
        name="EditarFinanca"
        component={EditarFinancasView}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

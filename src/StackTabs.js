import React from 'react';
import { View, Text } from 'react-native';
import HomeView from './screens/Home';
import CadastrarFinancaView from './screens/CadastrarFinanca';
import EditarFinancasView from './screens/EditarFinanca';

import { createStackNavigator } from '@react-navigation/stack';

export default function StackTabs() {
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
      <Stack.Screen name="Home" component={HomeView}></Stack.Screen>
      <Stack.Screen
        name="CadastrarFinanca"
        component={CadastrarFinancaView}
      ></Stack.Screen>
      <Stack.Screen
        name="EditarFinanca"
        component={EditarFinancasView}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

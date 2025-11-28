import React from "react";
import { View, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CadastrarFinancaView from "./src/screens/CadastrarFinanca"
import HomeView from "./src/screens/Home"

export default function App() {
    
    const Stack = createStackNavigator()


    return <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Home' component={HomeView}></Stack.Screen>
            <Stack.Screen name='CadastrarFinanca' component={CadastrarFinancaView}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
}
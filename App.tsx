import React from "react";
import { View, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CadastrarFinancaView from "./src/screens/CadastrarFinanca"
import HomeView from "./src/screens/Home"
import EditarFinancasView from "./src/screens/EditarFinanca"

export default function App() {
    
    const Stack = createStackNavigator()


    return <NavigationContainer>
        <Stack.Navigator screenOptions={{headerStyle:{
            shadowOpacity: 0,
            
        }, headerShown: false}}>
            <Stack.Screen name='Home' component={HomeView}></Stack.Screen>
            <Stack.Screen name='CadastrarFinanca' component={CadastrarFinancaView}></Stack.Screen>
            <Stack.Screen name='EditarFinanca' component={EditarFinancasView}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
}
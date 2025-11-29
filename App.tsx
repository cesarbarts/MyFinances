import React, { useEffect, useState } from "react";
import { View, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CadastrarFinancaView from "./src/screens/CadastrarFinanca"
import HomeView from "./src/screens/Home"
import EditarFinancasView from "./src/screens/EditarFinanca"
import EntrarView from "./src/screens/Entrar"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
export default function App() {

    const Stack = createStackNavigator()

    const [user, setUser] = useState<FirebaseAuthTypes.User | null>()

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((_user) => {
            if (_user) {
                setUser(_user)
            }
        });

        unsubscribe();
    }, [])

    if (user) {
        return <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    shadowOpacity: 0,

                }, headerShown: false
            }}>
                <Stack.Screen name='Home' component={HomeView}></Stack.Screen>
                <Stack.Screen name='CadastrarFinanca' component={CadastrarFinancaView}></Stack.Screen>
                <Stack.Screen name='EditarFinanca' component={EditarFinancasView}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    }
    return <EntrarView funcaoSetUser={setUser}></EntrarView>

}
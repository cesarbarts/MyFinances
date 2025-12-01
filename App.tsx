import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import EntrarView from './src/screens/Entrar';
import About from './src/screens/About';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackTabs from './src/StackTabs';
import Feather from '@react-native-vector-icons/feather';
export default function App() {
  const [loading, setLoading] = useState(true);
  const Tabs = createBottomTabNavigator();

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  const Stack = createStackNavigator();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(_user => {
      setUser(_user);

      setLoading(false);
    });

    unsubscribe;
  }, []);

  if (loading) {
    return (
      <View
        style={[
          estilos.second,
          estilos.geral,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      ></View>
    );
  }

  if (user) {
    return (
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarActiveTintColor: '#00A8E8',
            tabBarStyle: { backgroundColor: '#00171F', borderTopWidth: 0 },
          }}
        >
          <Tabs.Screen
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name="dollar-sign" size={size} color={color}></Feather>
              ),
            }}
            name="Finanças"
            component={StackTabs}
          />
         
          <Tabs.Screen
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name="user" size={size} color={color}></Feather>
              ),
            }}
            name="Meu perfil"
            component={About}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={() => <EntrarView funcaoSetUser={setUser}></EntrarView>}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const estilos = StyleSheet.create({
  geral: {
    flex: 1,
  },
  first: {
    flex: 0.3,
  },
  second: {
    backgroundColor: '#00171F',
    flex: 0.7,
    paddingTop: 20,
  },
  firstText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  firstLabel: {
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  texto18: {
    fontSize: 16,
  },
  btnBack: {
    backgroundColor: '#383e5500',
    margin: 20,
  },
  btnText: {
    color: '#00A8E8',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

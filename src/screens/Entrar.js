import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import auth from '@react-native-firebase/auth';

import notifee, { AndroidImportance, AuthorizationStatus } from '@notifee/react-native';

import { useFocusEffect } from '@react-navigation/native';
export default function EntrarView({ funcaoSetUser }) {
  const [email, setEmail] = useState();

  const [senha, setSenha] = useState();

  async function boasVindas() {
    const verificar = await notifee.requestPermission();
    if (verificar.authorizationStatus === AuthorizationStatus.AUTHORIZED) {

        const channelId = await notifee.createChannel({
            id: "1",
            name: "Boas Vindas ao MyDailyFinances",
            importance: AndroidImportance.HIGH,
            vibration: true,
            pressAction: {
                id: '1',
                },
            
        })

        await notifee.displayNotification({
            id: "1",
            title: "Saudações! 🤑",
            body: "Boas vindas ao MyDailyFinances.",
            android: { channelId, largeIcon: require("../MyDailyFinances.jpg") }
        })


    }
  }

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setSenha('');
    }, []),
  );

  function login() {
    if (!email || !senha) {
      return Alert.alert('Erro', 'E-mail e senha devem ser preenchidos');
    } else {
      auth()
        .signInWithEmailAndPassword(email, senha)
        .then(userCredential => {
          boasVindas();
          funcaoSetUser(userCredential.user);
        })
        .catch(error => {
          Alert.alert('Erro', error.code);
        });
    }
  }

  function cadastrar() {
    if (!email || !senha) {
      Alert.alert('Erro', 'E-mail e senha devem ser preenchidos');
    } else {
      auth()
        .createUserWithEmailAndPassword(email, senha)
        .then(userCredential => {
          boasVindas();
          funcaoSetUser(userCredential.user);
        })
        .catch(error => {
          Alert.alert('Erro', error.code);
        });
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={estilos.main}
    >
        <Image style={{width: 100, height: 100, borderRadius: 1000}} source={require("../MyDailyFinances.jpg")}></Image>
      <Text style={estilos.titulo}>MyDailyFinances</Text>

      <View style={estilos.editingField}>
        <Text style={estilos.rotulo}>E-mail</Text>
        <TextInput
          value={email}
          keyboardType="email-address"
          onChangeText={text => setEmail(text.toLowerCase())}
          style={estilos.entrada}
        ></TextInput>
        <Text style={estilos.rotulo}>Senha</Text>
        <TextInput
          value={senha}
          secureTextEntry
          onChangeText={setSenha}
          style={estilos.entrada}
        ></TextInput>
      </View>

      <View style={estilos.areabtn}>
        <TouchableOpacity disabled={false} onPress={login}>
          <View style={estilos.selecao}>
            <Text style={[estilos.texto18, { color: '#fff' }]}>Entrar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity disabled={false} onPress={cadastrar}>
          <View style={estilos.naoselecao}>
            <Text style={[estilos.texto18]}>Cadastrar grátis</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#001011',
  },
  editingField: {
    width: '100%',
    paddingHorizontal: 20,
  },
  entrada: {
    backgroundColor: '#093A3E',
    padding: 20,
    borderRadius: 20,
    color: '#ffffff',
    fontSize: 16,
    textTransform: 'lowercase',
  },
  selecao: {
    padding: 20,
    backgroundColor: '#64E9EE',
    borderRadius: 20,
  },
  texto18: {
    fontSize: 18,
    color: '#ffffff',
  },
  naoselecao: {
    padding: 20,
    backgroundColor: '#00000000',
  },
  areabtn: {
    flexDirection: 'row',
    margin: 10,
  },
  muted: {
    color: '#96a29dff',
    fontSize: 18,
  },
  btnBack: {
    padding: 20,
    backgroundColor: '#093A3E',
    borderRadius: 20,
  },
  btnText: {
    color: '#fff',
  },
  titulo: {
    fontSize: 28,
    color: '#ffffff',
  },

  rotulo: {
    color: '#ffffff',
    fontSize: 18,
    padding: 10,
  },
});

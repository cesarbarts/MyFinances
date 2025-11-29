import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
export default function EntrarView({ funcaoSetUser }) {
  const [email, setEmail] = useState();

  const [senha, setSenha] = useState();

  function login() {
    if (email === '' || senha === '') {
      return Alert.alert('Erro', 'E-mail e senha devem ser preenchidos');
    } else {
      auth()
        .signInWithEmailAndPassword(email, senha)
        .then(userCredential => {
          Alert.alert('Olá!', 'Saudações ao MyFinances');
          funcaoSetUser(userCredential.user);
        })
        .catch(error => {
          Alert.alert('Erro', error.code);
        });
    }
  }

  function cadastrar() {
    if (email === '' || senha === '') {
      return Alert.alert('Erro', 'E-mail e senha devem ser preenchidos');
    } else {
      auth()
        .createUserWithEmailAndPassword(email, senha)
        .then(userCredential => {
          Alert.alert('Olá!', 'Saudações ao MyFinances');
          funcaoSetUser(userCredential.user);
        })
        .catch(error => {
          Alert.alert('Erro', error.code);
        });
    }
  }

  return (
    <View style={estilos.main}>
      <Text style={estilos.titulo}>Entrar</Text>

      <View style={estilos.editingField}>
        <Text style={estilos.rotulo}>E-mail</Text>
        <TextInput onChangeText={setEmail} style={estilos.entrada}></TextInput>
        <Text style={estilos.rotulo}>Senha</Text>
        <TextInput
          secureTextEntry
          onChangeText={setSenha}
          style={estilos.entrada}
        ></TextInput>
      </View>

      <View style={estilos.areabtn}>
        <TouchableOpacity
          disabled={false}
          onPress={cadastrar}
        >
          <View style={estilos.selecao}>
            <Text style={[estilos.texto18, { color: '#fff' }]}>Cadastrar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={false}
          onPress={login}
        >
          <View style={estilos.naoselecao}>
            <Text style={[estilos.texto18]}>Entrar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#e9f2efff',
  },
  editingField: {
    width: '100%',
    paddingHorizontal: 20,
  },
  entrada: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    color: '#383e55ff',
    fontSize: 16,
  },
  selecao: {
    padding: 20,
    backgroundColor: '#3bb898ff',
    borderRadius: 100,
  },
  texto18: {
    fontSize: 18,
  },
  naoselecao: {
    padding: 20,
    backgroundColor: '#77b9ff00',
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
    backgroundColor: '#383e55ff',
    borderRadius: 100,
  },
  btnText: {
    color: '#fff',
  },
  titulo: {
    fontSize: 28,
    color: '#383e55ff',
  },

  rotulo: {
    color: '#383e55ff',
    fontSize: 18,
    padding: 10,
  },
});

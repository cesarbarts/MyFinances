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
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
export default function EntrarView({ funcaoSetUser }) {
  const [email, setEmail] = useState();

  const [senha, setSenha] = useState();

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
          Alert.alert('Olá!', 'Saudações ao MyFinances');
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
          Alert.alert('Olá!', 'Saudações ao MyFinances');
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
      <Text style={estilos.titulo}>MyFinances</Text>

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
            <Text style={[estilos.texto18]}>Cadastrar</Text>
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
    backgroundColor: '#00171F',
  },
  editingField: {
    width: '100%',
    paddingHorizontal: 20,
  },
  entrada: {
    backgroundColor: '#003459',
    padding: 20,
    borderRadius: 20,
    color: '#ffffff',
    fontSize: 16,
    textTransform: 'lowercase',
  },
  selecao: {
    padding: 20,
    backgroundColor: '#00A8E8',
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
    backgroundColor: '#003459',
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

import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';

import auth from '@react-native-firebase/auth';
import { Link } from '@react-navigation/native';

export default function About() {
  function sair() {
    auth().signOut();
  }

  return (
    <View style={estilos.geral}>
      <View style={estilos.first}>
        <View
          style={[
            {
              flex: 1,
              backgroundColor: '#64E9EE',
              justifyContent: 'flex-end',
              padding: 20,
            },
          ]}
        >
          <Text style={estilos.firstLabel}>Entrou como {auth().currentUser.email}</Text>
          <Text numberOfLines={1} style={estilos.firstText}>
            Sobre o App
          </Text>
        </View>
      </View>

      <View style={estilos.second}>
        <Image
          style={{ width: 100, height: 100, borderRadius: 1000 }}
          source={require('../MyDailyFinances.jpg')}
        ></Image>
        <Text style={estilos.titulo}>MyDailyFinances</Text>

        <Text style={estilos.muted}>Obrigado por usar o MyDailyFinances!</Text>
        <Text style={estilos.muted}>Feito por Cesar Buril.</Text>
        <TouchableOpacity disabled={false} onPress={sair}>
          <View
            style={[
              estilos.selecao,
              estilos.btnSubmit,
              { flexDirection: 'row', alignItems: 'center', gap: 2 },
            ]}
          >
            <Feather name="log-out" size={18} color="#fff"></Feather>
            <Text style={[estilos.texto18, { color: '#fff' }]}>
              Fazer logout
            </Text>
          </View>
        </TouchableOpacity>
        <View style={estilos.redes}>
          <TouchableOpacity
            style={estilos.rede}
            onPress={() =>
              Linking.openURL('https://linkedin.com/in/cesarburil')
            }
          >
            <Feather name="linkedin" size={18} color="#fff"></Feather>
            <Text style={estilos.redeName}>Meu LinkedIn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={estilos.rede}
            onPress={() =>
              Linking.openURL("mailto:cesaareffects@gmail.com")
            }
          >
            <Feather name="mail" size={18} color="#fff"></Feather>
            <Text style={estilos.redeName}>Sugestões ou dúvidas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  redes: {
    gap: 60,
    flexDirection: 'row',
  },
  rede: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  redeName: { color: '#fff' },
  geral: {
    flex: 1,
  },
  first: {
    flex: 0.3,
  },
  second: {
    backgroundColor: '#001011',
    flex: 0.7,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    padding: 20,
  },
  muted: {
    color: '#96a29dff',
    fontSize: 18,
  },
  firstText: {
    color: '#001011',
    fontSize: 32,
    fontWeight: 'bold',
  },
  firstLabel: {
    color: '#001011',
    textTransform: 'uppercase',
  },
  texto18: {
    fontSize: 18,
  },
  btnBack: {
    backgroundColor: '#383e5500',
    margin: 20,
  },
  btnText: {
    color: '#64E9EE',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  selecao: {
    padding: 20,
    backgroundColor: '#64E9EE',
    borderRadius: 20,
    margin: 20,
  },
  titulo: {
    fontSize: 28,
    color: '#ffffff',
  },

  btnSubmit: {
    backgroundColor: '#A6C36F',
  },
});

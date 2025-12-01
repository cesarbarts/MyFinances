import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';

import auth from '@react-native-firebase/auth';

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
                  backgroundColor: '#00A8E8',
                  justifyContent: 'flex-end',
                  padding: 20,
                },
              ]}
            >
              <Text style={estilos.firstLabel}>Seu Perfil</Text>
              <Text numberOfLines={1} style={estilos.firstText}>
                {auth().currentUser.email}
              </Text>
            </View>
      </View>

      <View style={estilos.second}>
        <TouchableOpacity disabled={false} onPress={sair}>
          <View
            style={[
              estilos.selecao,
              estilos.btnSubmit,
              { flexDirection: 'row', alignItems: 'center', gap: 2 },
            ]}
          >
            <Feather name="log-out" size={18} color="#fff"></Feather>
            <Text style={[estilos.texto18, { color: '#fff' }]}>Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
    fontSize: 18,
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
  selecao: {
    padding: 20,
    backgroundColor: '#00A8E8',
    borderRadius: 20,
    margin: 20,
  },
  btnSubmit: {
    backgroundColor: '#007EA7',
  },
});

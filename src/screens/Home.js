import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import { useFocusEffect } from '@react-navigation/native';

import { useCallback } from 'react';

import CardTransacao from './CardTransacao';

export default function HomeView() {
  const navegacao = useNavigation();

  const [financas, setFinancas] = useState([]);

  const [soma, setSoma] = useState(0.0);

  useFocusEffect(
    useCallback(() => {
      async function obterFinancas() {
        await firestore()
          .collection('financas')
          .get()
          .then(financasObtidas => {
            setFinancas(financasObtidas.docs);
            let total = 0.0;
            financasObtidas.docs.forEach(el => {
              total += el.data().valor;
            });

            setSoma(total);
          });
      }

      obterFinancas();
    }, []),
  );

  return (
    <View style={estilos.geral}>
      <View style={estilos.first}>
        <ScrollView
          horizontal={true}
          decelerationRate="fast"
          snapToOffsets={[0, 410, 820]}
        >
          <View style={{ width: 1230, flexDirection: 'row' }}>
            <View
              style={[
                {
                  flex: 1,
                  backgroundColor: soma > 0 ? '#26ab91ff' : '#c74242ff',
                  justifyContent: 'flex-end',
                  padding: 20,
                },
              ]}
            >
              <Text style={estilos.firstLabel}>Soma</Text>
              <Text style={estilos.firstText}>
                R${Number(soma).toFixed(2).replace('.', ',')}
              </Text>
            </View>
            <View
              style={[
                {
                  flex: 1,
                  backgroundColor: soma > 0 ? '#c74242ff' : '#c74242ff',
                  justifyContent: 'flex-end',
                  padding: 20,
                },
              ]}
            >
              <Text style={estilos.firstLabel}>Soma</Text>
              <Text style={estilos.firstText}>
                R${soma.toFixed(2).replace('.', ',')}
              </Text>
            </View>
            <View
              style={[
                {
                  flex: 1,
                  backgroundColor: soma > 0 ? '#26ab91ff' : '#c74242ff',
                  justifyContent: 'flex-end',
                  padding: 20,
                },
              ]}
            >
              <Text style={estilos.firstLabel}>Soma</Text>
              <Text style={estilos.firstText}>
                R${soma.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={estilos.second}>
        <FlatList
          data={financas}
          renderItem={({ item }) => (
            <CardTransacao idItem={item.id} itemRecebido={item.data()} />
          )}
        ></FlatList>
        <Button
          title="Cadastrar"
          onPress={() => navegacao.navigate('CadastrarFinanca')}
        ></Button>
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
    backgroundColor: '#e9f2efff',
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
});

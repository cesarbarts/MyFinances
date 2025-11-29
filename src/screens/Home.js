import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Filter } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';

import { useFocusEffect } from '@react-navigation/native';

import { useCallback } from 'react';

import CardTransacao from './CardTransacao';

import { Calendar } from 'react-native-calendars';

export default function HomeView() {
  const [modal, setModal] = useState(false);
  const navegacao = useNavigation();

  const [financas, setFinancas] = useState([]);
  const [daySelec, setDaySelec] = useState(0);

  const [soma, setSoma] = useState(0.0);

  useFocusEffect(
    useCallback(() => {
      async function obterFinancas() {
        await firestore()
          .collection('financas')
          .where(
            Filter.and(
              Filter('data', '<', daySelec + 86400000),
              Filter('data', '>=', daySelec),
            ),
          )
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
    }, [daySelec]),
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
        <View>
          <TouchableOpacity onPress={() => setModal(true)}>
          <View>
            <View style={estilos.btnBack}>
                      <Text style={[estilos.btnText, estilos.texto18]}>☰ Filtrar - {new Date(daySelec).getUTCDate() + "/" + new Date(daySelec).getUTCMonth()}</Text>
                    </View>
          </View>
        </TouchableOpacity>
        </View>
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
      <Modal transparent={true} visible={modal} animationType={'slide'}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => setModal(false)}
            style={{ flex: 0.5 }}
          >
            <View style={{ backgroundColor: '#ffffff00', flex: 1 }}></View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: '#fff',
              flex: 0.5,
              borderRadius: 20,
              marginHorizontal: 10,
              shadowColor: '#000',
              shadowRadius: 10,
              shadowOpacity: 0.2,
              padding: 20,
            }}
          >
            <Text>Filtrar </Text>
            <Calendar
              onDayPress={day => {
                setDaySelec(day.timestamp+1);
                setModal(false);
              }}
              markedDates={{
                [daySelec]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: 'orange',
                },
              }}
            />
          </View>
        </View>
      </Modal>
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
  texto18: {
    fontSize: 16,
  },
  btnBack: {
    backgroundColor: '#383e5500',
    margin: 20,
  },
  btnText: {
    color: '#26ab91ff',
    fontWeight: "bold",
    textTransform: "uppercase"
  },
});

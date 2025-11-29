import React, { useState } from 'react';

import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';
import { Filter, queryEqual } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';

import { useFocusEffect } from '@react-navigation/native';

import { useCallback } from 'react';

import CardTransacao from './CardTransacao';

import { Calendar, LocaleConfig } from 'react-native-calendars';

import auth from '@react-native-firebase/auth';

LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul.',
    'Ago',
    'Set.',
    'Out.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'br';

export default function HomeView() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const navegacao = useNavigation();
  const [financas, setFinancas] = useState([]);
  const [daySelec, setDaySelec] = useState(new Date().setHours(0, 0, 0, 0));
  const [soma, setSoma] = useState(0.0);
  const [idUser, setIdUser] = useState(String(auth().currentUser.uid));

  function formataData(data, tipo) {
    const date = new Date(data);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; //datas são indexadas
    const day = date.getUTCDate();

    if (tipo == 1) {
      return `${day}/${month}/${year}`;
    }

    return `${year}-${month}-${day}`;
  }

  useFocusEffect(
    useCallback(() => {
      async function obterFinancas() {
        await firestore()
          .collection('financas')
          .where(
            Filter.and(
              Filter('data', '<', daySelec + 86400000),
              Filter('data', '>=', daySelec),
              Filter('idUser', '==', idUser),
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
            setLoading(false);
          });
      }
      obterFinancas();
    }, [daySelec]),
  );

  if (loading) {
    return (
      <View
        style={[
          estilos.second,
          estilos.geral,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size={30} color={'#26ab91ff'}></ActivityIndicator>
      </View>
    );
  }

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
              <View style={[estilos.btnBack, {flexDirection: "row", alignItems: "center", gap: 2}]}>
                <Feather name="filter" size={18} color="#26ab91ff"></Feather>
                <Text style={[estilos.btnText, estilos.texto18]}>
                  Filtrar - {formataData(daySelec, 1)}
                </Text>
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

        <TouchableOpacity
          disabled={false}
          onPress={() =>
            navegacao.navigate('EditarFinanca', {
              itemSelecionado: '',
              idItem: '',
            })
          }
        >
          <View
            style={[
              estilos.selecao,
              estilos.btnSubmit,
              { flexDirection: 'row', alignItems: 'center', gap: 2 },
            ]}
          >
            <Feather name="plus" size={18} color="#fff"></Feather>
            <Text style={[estilos.texto18, { color: '#fff' }]}>Novo</Text>
          </View>
        </TouchableOpacity>
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
            <Calendar
            
              theme={{
                selectedDayBackgroundColor: '#26ab91ff',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#26ab91ff',
                arrowColor: "#26ab91ff"
              }}
              onDayPress={day => {
                setDaySelec(day.timestamp + 1);
                setModal(false);
              }}
              markedDates={{
                [formataData(daySelec, 2)]: {
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
    backgroundColor: '#e9f2efff',
  },
  first: {
    flex: 0.3,
  },
  second: {
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
    color: '#26ab91ff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  selecao: {
    padding: 20,
    backgroundColor: '#3bb898ff',
    borderRadius: 20,
    margin: 20,
  },
  btnSubmit: {
    backgroundColor: '#3b8cb8ff',
  },
});

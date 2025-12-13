import React, { useState } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';
import { Filter } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';

import { useFocusEffect } from '@react-navigation/native';
import { Dimensions } from 'react-native';

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
  const larguraTela = Dimensions.get('window').width;

  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const navegacao = useNavigation();
  const [financas, setFinancas] = useState([]);
  const [daySelec, setDaySelec] = useState(new Date().setHours(0, 0, 0, 0));
  const [soma, setSoma] = useState(0.0);
  const [somaN, setSomaN] = useState(0.0);
  const [somaP, setSomaP] = useState(0.0);
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
            let totalN = 0.0;
            let totalP = 0.0;
            financasObtidas.docs.forEach(el => {
              if (el.data().valor < 0) {
                totalN += el.data().valor;
              } else {
                totalP += el.data().valor;
              }
            });

            setSomaN(totalN);
            setSomaP(totalP);
            setSoma(totalN + totalP);
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
        <ActivityIndicator size={30} color={'#64E9EE'}></ActivityIndicator>
      </View>
    );
  }

  return (
    <View style={estilos.geral}>
      <View style={estilos.first}>
        <ScrollView
          horizontal={true}
          decelerationRate="fast"
          snapToOffsets={[0, larguraTela, 2 * larguraTela]}
        >
          <View
            style={{
              backgroundColor: soma < 0 ? '#FFA552' : '#64E9EE',
              justifyContent: 'flex-end',
              width: larguraTela,
              padding: 20,
            }}
          >
            <Text style={estilos.firstLabel}>Total</Text>
            <Text style={estilos.firstText}>
              R${Number(soma).toFixed(2).replace('.', ',')}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#7df4f9ff',
              justifyContent: 'flex-end',
              width: larguraTela,
              padding: 20,
            }}
          >
            <Text style={estilos.firstLabel}>Receita</Text>
            <Text style={estilos.firstText}>
              R${Number(somaP).toFixed(2).replace('.', ',')}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: soma < 0 ? '#FFA552' : '#FFA552', //Vermelho
              justifyContent: 'flex-end',
              width: larguraTela,
              padding: 20,
            }}
          >
            <Text style={estilos.firstLabel}>Despesa</Text>
            <Text style={estilos.firstText}>
              R${Math.abs(Number(somaN)).toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </ScrollView>
      </View>

      <View style={estilos.second}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => setModal(true)}>
            <View>
              <View
                style={[
                  estilos.btnBack,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                  },
                ]}
              >
                <Feather name="filter" size={18} color="#64E9EE"></Feather>
                <Text style={[estilos.btnText, estilos.texto18]}>
                  Filtrar - {formataData(daySelec, 1)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navegacao.navigate('Analisar', { dados: financas })}
          >
            <View>
              <View
                style={[
                  estilos.btnBack,
                  {
                    flexDirection: 'row',
                    alignItems: 'right',
                    gap: 2,
                    justifyContent: 'flex-end',
                  },
                ]}
              >
                <Feather name="bar-chart-2" size={18} color="#64E9EE"></Feather>
                <Text style={[estilos.btnText, estilos.texto18]}>Analisar</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            borderRadius: 20,
            overflow: 'hidden',
            height: '50%',
            flex: 1,
          }}
        >
          <FlatList
            data={financas}
            renderItem={({ item }) => (
              <CardTransacao idItem={item.id} itemRecebido={item.data()} />
            )}
          ></FlatList>
        </View>

        <View>
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
              <Text style={[estilos.texto18, { color: '#fff' }]}>
                Adicionar nova
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modal transparent={true} visible={modal} animationType={'slide'}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => setModal(false)}
            style={{ flex: 0.55,  }}
          >
            <View style={{ backgroundColor: '#093A3E00', flex: 1 }}></View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: '#093A3E',
              flex: 0.45,
              borderRadius: 20,
              marginHorizontal: 10,
              shadowColor: '#000',
              shadowRadius: 10,
              shadowOpacity: 0.2,
              padding: 20,
            }}
          >
            <Text
              style={[estilos.btnText, estilos.texto18, { marginBottom: 20 }]}
            >
              <Feather name="calendar" size={18} color="#64E9EE"></Feather>{' '}
              ESCOLHA UMA DATA
            </Text>
            <Calendar
              style={{ backgroundColor: '#093A3E' }}
              theme={{
                backgroundColor: '#001011',
                selectedDayBackgroundColor: '#64E9EE',
                todayTextColor: '#64E9EE',
                arrowColor: '#64E9EE',
                calendarBackground: '#093A3E',
                dotColor: '#fff',
                dayTextColor: '#fff',
                monthTextColor: '#fff',
              }}
              onDayPress={day => {
                setDaySelec(day.timestamp + 1);
                setModal(false);
              }}
              markedDates={{
                [formataData(daySelec, 2)]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: '#FFA552',
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
    backgroundColor: '#001011',
  },
  first: {
    flex: 0.3,
  },
  second: {
    flex: 0.7,
    paddingTop: 20,
  },
  firstText: {
    color: '#001011', //branco
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
    marginHorizontal: 20,
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
  btnSubmit: {
    backgroundColor: '#A6C36F',
  },
});

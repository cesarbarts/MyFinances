import React, { useCallback, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import { BarChart } from 'react-native-gifted-charts';
import auth from '@react-native-firebase/auth';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
export default function Analisar({ route }) {
  const [dados2, setDados2] = useState([]);

  const [modal, setModal] = useState(false);
  const [itemSelec, setItemSelec] = useState(false);
  const { dados } = route.params;
  useFocusEffect(
    useCallback(() => {
      let matriz = [];
      let soma = 0;
      let itemId = 0;
      dados.forEach(el => {
        soma += el.data().valor;
        matriz.push({
          itemId: itemId,
          value: soma,
          valorOriginal: el.data().valor,
          frontColor: soma < 0 ? '#c74242ff' : '#3bb898ff',
          label: el.data().nome,
        });
        ++itemId;
      });
      setDados2(matriz);
    }, []),
  );

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
              backgroundColor: '#26ab91ff',
              justifyContent: 'flex-end',
              padding: 20,
            },
          ]}
        >
          <Text style={estilos.firstLabel}>Evolução do</Text>
          <Text numberOfLines={1} style={estilos.firstText}>
            seu dinheiro
          </Text>
        </View>
      </View>

      <View style={estilos.second}>
        <BarChart
          vertical
          barWidth={50}
          barBorderRadius={4}
          data={dados2}
          yAxisThickness={0}
          xAxisThickness={0}
          autoShiftLabels
          showValuesAsTopLabel
          hideYAxisText
          isAnimated
          onPress={item => {
            setItemSelec(item);
            setModal(true);
            console.log(dados2);
          }}
        />
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
            <Text style={estilos.rotulo}>
              {itemSelec.itemId === 0
                ? 'Você começou o dia '
                : 'Nesse momento você estava '}
              <Text
                style={{
                  fontWeight: 'bold',
                  color:
                    itemSelec.valorOriginal < 0 ? '#c74242ff' : '#3bb898ff',
                }}
              >
                {itemSelec.valorOriginal < 0 ? 'perdendo ' : 'ganhando '}
              </Text>
              <Text>
                R$
                {Math.abs(itemSelec.valorOriginal)} com {itemSelec.label}.{' '}
              </Text>
              <Text>
                {itemSelec.itemId < 1
                  ? ''
                  : ('Perceba: R$'  +
                    Math.abs(dados2[itemSelec.itemId - 1]?.valorOriginal) +
                    ' tinha sido o valor de ' +
                    dados2[itemSelec.itemId - 1]?.label +
                    '. Com ' + itemSelec.label + ', ' +
                    (itemSelec.value < dados2[itemSelec.itemId - 1]?.value
                      ? 'a redução'
                      : 'o aumento') +
                    ' foi de ' +
                    Math.abs(
                      (100 *
                        (itemSelec.value -
                          dados2[itemSelec.itemId - 1]?.value)) /
                        dados2[itemSelec.itemId - 1]?.value,
                    ).toFixed(2).replace('.', ',') +
                    '%')}
              </Text>
            </Text>
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

  rotulo: {
    fontSize: 16,
    color: '#383e55ff',
  },
});

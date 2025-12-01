import React, { useCallback, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Share,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import { BarChart } from 'react-native-gifted-charts';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { generatePDF } from 'react-native-html-to-pdf';
export default function Analisar({ route }) {
  async function exportarPDF() {

    let results = await generatePDF({
      html: '<h2>' + html + '</h2>',
      fileName: 'PDF - ' + new Date(),
      base64: true,
    });

    console.log(results);

    Share.share({
      url: 'file://' + results.filePath,
    });
  }

  const [dados2, setDados2] = useState([]);
  const [html, setHtml] = useState('');
  const [modal, setModal] = useState(false);
  const [itemSelec, setItemSelec] = useState(false);
  const navegacao = useNavigation();
  const { dados } = route.params;
  useFocusEffect(
    useCallback(() => {
      let matriz = [];
      let soma = 0;
      let itemId = 0;
      let html = '';
      dados.forEach(el => {
        soma += el.data().valor;
        html +=
          '<h1>' +
          el.data().nome +
          ',' +
          el.data().valor +
          ',' +
          soma +
          '</h1><br>';
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
      setHtml(html);
    }, []),
  );

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
        <View>
          <View
            style={[
              estilos.btnBack,
              {
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                backgroundColor: '#ffffff00',
              },
            ]}
          >
            <Feather name="eye" size={18} color="#26ab91ff"></Feather>
            <Text style={[estilos.btnText, estilos.texto18]}>
              Selecione um para ver detalhes
            </Text>
          </View>
        </View>
        <BarChart
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
        <TouchableOpacity disabled={false} onPress={exportarPDF}>
          <View
            style={[
              estilos.selecao,
              estilos.btnSubmit,
              { flexDirection: 'row', alignItems: 'center', gap: 2 },
            ]}
          >
            <Feather name="share" size={18} color="#fff"></Feather>
            <Text style={[estilos.texto18, { color: '#fff' }]}>
              Exportar dados
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navegacao.goBack()}>
          <View
            style={[
              estilos.selecao,
              estilos.btnBack,
              { flexDirection: 'row', alignItems: 'center', gap: 2 },
            ]}
          >
            <Feather name="arrow-left" size={18} color="#fff"></Feather>
            <Text style={[estilos.texto18, { color: '#fff' }]}>Voltar</Text>
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
          <View style={estilos.modalText}>
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
                  : 'Perceba: R$' +
                    Math.abs(dados2[itemSelec.itemId - 1]?.valorOriginal) +
                    ' tinha sido o valor de ' +
                    dados2[itemSelec.itemId - 1]?.label +
                    '. Com ' +
                    itemSelec.label +
                    ', ' +
                    (itemSelec.value < dados2[itemSelec.itemId - 1]?.value
                      ? 'a redução'
                      : 'o aumento') +
                    ' foi de ' +
                    Math.abs(
                      (100 *
                        (itemSelec.value -
                          dados2[itemSelec.itemId - 1]?.value)) /
                        dados2[itemSelec.itemId - 1]?.value,
                    )
                      .toFixed(2)
                      .replace('.', ',') +
                    '%'}
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
    justifyContent: "space-between"
  },
  first: {
    flex: 0.3,
  },
  second: {
    backgroundColor: '#e9f2efff',
    flex: 0.7,
    justifyContent: "flex-start",
    gap: 20,
    padding: 20
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
    backgroundColor: '#46675dff',
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
  },
  btnSubmit: {
    backgroundColor: '#3b8cb8ff',
  },

  rotulo: {
    fontSize: 16,
    color: '#383e55ff',
  },
  modalText: {
    backgroundColor: '#fff',
    flex: 0.25,
    borderRadius: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 0.2,
    padding: 20,
  },
});

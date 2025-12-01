import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CardTransacao({ itemRecebido, idItem }) {
  const navegacao = useNavigation();
  return (
    <View style={estilos.valor}>
      <TouchableOpacity
        onPress={() =>
          navegacao.navigate('EditarFinanca', {
            itemSelecionado: itemRecebido,
            idItem: idItem,
          })
        }
      >
        <View style={estilos.innerValor}>
          <Text style={estilos.rotulo}>{itemRecebido.nome}</Text>
          <Text
            style={[
              estilos.firstText,
              {
                color:
                  Number(itemRecebido.valor) > 0 ? '#00A8E8' : '#c74242ff',
              },
            ]}
          >
            {Number(itemRecebido.valor) > 0 ? '' : '-'}R$
            {Math.abs(Number(itemRecebido.valor)).toFixed(2).replace('.', ',')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  innerValor: {
    backgroundColor: '#003459',
    padding: 20,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  valor: { },
  firstText: {
    fontSize: 18,
    textAlign: 'right',
  },
  rotulo: {
    fontSize: 16,
    color: '#fff',
  },
});

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
                  Number(itemRecebido.valor) > 0 ? '#64E9EE' : '#FFA552',
              },
            ]}
          >
            {Number(itemRecebido.valor) > 0 ? '+' : '-'}R$
            {Math.abs(Number(itemRecebido.valor)).toFixed(2).replace('.', ',')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  innerValor: {
    backgroundColor: '#093A3E',
    padding: 20,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  firstText: {
    fontSize: 18,
    textAlign: 'right',
    fontWeight: 500
  },
  rotulo: {
    fontSize: 16,
    color: '#fff',
  },
});

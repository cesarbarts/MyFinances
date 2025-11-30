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
                  Number(itemRecebido.valor) > 0 ? '#3bb898ff' : '#c74242ff',
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
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOffset: 0,
    shadowOpacity: 0.05,
  },
  valor: { paddingHorizontal: 20 },
  firstText: {
    fontSize: 18,
    textAlign: 'right',
  },
  rotulo: {
    fontSize: 16,
    color: '#383e55ff',
  },
});

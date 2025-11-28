import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CardTransacao({ itemRecebido }) {
  return (
    <View style={estilos.valor}>
        <Text style={estilos.rotulo}>{itemRecebido.nome}</Text>
      <Text
        style={[estilos.firstText,{
          color:
            Number(itemRecebido.valor) > 0 ? '#3bb898ff' : '#c74242ff',
        }]}
      >
        {Number(itemRecebido.valor) > 0? "" : "-"}R${Math.abs(itemRecebido.valor)}
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  valor: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 1,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  firstText: {
    fontSize: 18,
    textAlign: "right"
  },
  rotulo: { 
    fontSize: 16,
    color: "#383e55ff"
  }
});

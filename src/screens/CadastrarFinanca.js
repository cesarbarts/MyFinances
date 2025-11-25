import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

export default function CadastrarFinancaView() {
  const [lucro, setLucro] = useState(true);

  const [valor, setValor] = useState(0.0);

  return (
    <View style={estilos.main}>
      <Text>Cadastre Financa</Text>

      <TextInput
        value={valor}
        style={estilos.entrada}
        keyboardType="numeric"
        onChangeText={setValor}
      />

      <View style={estilos.botoes}>
        <TouchableOpacity disabled={lucro} onPress={() => setLucro(true)}>
          <View>
            <Text>Lucro</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity disabled={!lucro} onPress={() => setLucro(false)}>
          <View>
            <Text>Despesa</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <View>
            <Text>Enviar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  entrada: {
    width: '100%',
    backgroundColor: '#e2e7e8ff',
    padding: 10,
  },
});

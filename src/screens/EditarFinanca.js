import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

export default function EditarFinancasView({ route }) {
  const navegacao = useNavigation();
  const { itemSelecionado } = route.params;
  const [valor, setValor] = useState(itemSelecionado.valor);
  const [lucro, setLucro] = useState(true);

  useLayoutEffect(() => {
    navegacao.setOptions({ title: itemSelecionado.valor });
    itemSelecionado.valor < 0 ? setLucro(false) : setLucro(true);
  }, [itemSelecionado]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Página Edição {itemSelecionado.valor}</Text>
      <Text>Valor</Text>
      <TextInput
        defaultValue={String(valor)}
        onChangeText={setValor}
        style={estilos.entrada}
      ></TextInput>
      <Text>Titulo</Text>
      <TextInput
        defaultValue={String(valor)}
        onChangeText={setValor}
        style={estilos.entrada}
      ></TextInput>
      <View style={estilos.areabtn}>
        <TouchableOpacity disabled={lucro} onPress={() => setLucro(true)}>
          <View style={lucro ? estilos.selecao : estilos.naoselecao}>
            <Text>Ganho</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity disabled={!lucro} onPress={() => setLucro(false)}>
          <View style={!lucro ? estilos.selecao : estilos.naoselecao}>
            <Text>Despesa</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Button title="Voltar" onPress={() => navegacao.goBack()}></Button>
      <Button
        disabled={false}
        title="Finalizar"
        onPress={() => navegacao.goBack()}
      ></Button>
    </View>
  );
}

const estilos = StyleSheet.create({
  entrada: {
    backgroundColor: '#fff',
    padding: 10,
    width: '80%',
  },
  selecao: {
    padding: 10,
    backgroundColor: '#77b9ffff',
  },
  naoselecao: {
    padding: 10,
    backgroundColor: '#77b9ff00',
  },
  areabtn: {
    flexDirection: 'row',
    margin: 10,
  },
});

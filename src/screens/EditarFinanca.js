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
import firestore from '@react-native-firebase/firestore';

export default function EditarFinancasView({ route }) {
  const navegacao = useNavigation();
  const { itemSelecionado, idItem } = route.params;
  const [valor, setValor] = useState(Math.abs(itemSelecionado.valor));
  const [nome, setNome] = useState(itemSelecionado.nome);
  const [lucro, setLucro] = useState(true);
  const [disabled, setDisabled] = useState(true);

  useLayoutEffect(() => {
    navegacao.setOptions({ title: itemSelecionado.valor });
    itemSelecionado.valor < 0 ? setLucro(false) : setLucro(true);
  }, [itemSelecionado]);

  function acao() {
    if (valor !== '' && nome !== '') {
      itemSelecionado ? editar() : cadastrar();
    } else {
      alert('vazio!');
    }
  }

  async function editar() {
    await firestore()
      .collection('financas')
      .doc(idItem)
      .update({
        valor: lucro ? Math.abs(Number(valor)) : -Math.abs(Number(valor)),
        nome: nome,
        data: Date.now(),
      })
      .then(() => {
        navegacao.goBack();
      });
  }

  function cadastrar() {
    alert('cadastrando!');
  }

  return (
    <View style={estilos.main}>
      <TouchableOpacity onPress={() => navegacao.goBack()}>
        <View style={estilos.btnBack}>
          <Text style={[estilos.btnText, estilos.texto18]}>&larr; Voltar</Text>
        </View>
      </TouchableOpacity>
      <Text style={estilos.muted}>
        Última edição em {new Date(itemSelecionado.data).toLocaleDateString()}
      </Text>
      <Text style={estilos.titulo}>{itemSelecionado.nome}</Text>

      <View style={estilos.editingField}>
        <Text style={estilos.rotulo}>Valor</Text>
        <TextInput
          defaultValue={String(valor)}
          onChangeText={setValor}
          style={estilos.entrada}
        ></TextInput>
        <Text style={estilos.rotulo}>Título</Text>
        <TextInput
          defaultValue={String(nome)}
          onChangeText={setNome}
          style={estilos.entrada}
        ></TextInput>
      </View>

      <View style={estilos.areabtn}>
        <TouchableOpacity disabled={lucro} onPress={() => setLucro(true)}>
          <View style={lucro ? estilos.selecao : estilos.naoselecao}>
            <Text style={[estilos.texto18, lucro? {color: "#fff"}:{}]}>&uarr; Receita</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity disabled={!lucro} onPress={() => setLucro(false)}>
          <View style={!lucro ? estilos.selecao : estilos.naoselecao}>
            <Text style={[estilos.texto18, !lucro? {color: "#fff"}:{}]}>&darr; Despesa</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Button
        disabled={disabled}
        title="Finalizar"
        onPress={() => acao()}
      ></Button>
    </View>
  );
}

const estilos = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#e9f2efff',
  },
  editingField: {
    width: "100%",
    paddingHorizontal: 20
  },
  entrada: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    color: "#383e55ff",
    fontSize: 16
  },
  selecao: {
    padding: 20,
    backgroundColor: '#3bb898ff',
    borderRadius: 100
  },
  texto18: {
    fontSize: 18,
  },
  naoselecao: {
    padding: 20,
    backgroundColor: '#77b9ff00',
  },
  areabtn: {
    flexDirection: 'row',
    margin: 10,
  },
  muted: {
    color: '#96a29dff',
    fontSize: 18,
  },
  btnBack: {
    padding: 20,
    backgroundColor: '#383e55ff',
    borderRadius: 100,
  },
  btnText: {
    color: '#fff',
  },
  titulo: {
    fontSize: 28,
    color: '#383e55ff',
  },

  rotulo: {
    color: "#383e55ff",
    fontSize: 18,
    padding: 10
  }
});

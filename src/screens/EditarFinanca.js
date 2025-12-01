import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
export default function EditarFinancasView({ route }) {
  const navegacao = useNavigation();
  const { itemSelecionado, idItem } = route.params;
  const [valor, setValor] = useState(
    Math.abs(itemSelecionado ? itemSelecionado.valor : ''),
  );
  const [nome, setNome] = useState(itemSelecionado ? itemSelecionado.nome : '');
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
      Alert.alert('Erro', 'Valor e título precisam ser preenchidos.');
    }
  }

  async function editar() {
    await firestore()
      .collection('financas')
      .doc(idItem)
      .update({
        valor: lucro ? Math.abs(Number(valor)) : -Math.abs(Number(valor)),
        nome: nome,
      })
      .then(() => {
        navegacao.goBack();
      });
  }

  async function cadastrar() {
    await firestore()
      .collection('financas')
      .add({
        valor: lucro ? Math.abs(Number(valor)) : -Math.abs(Number(valor)),
        nome: nome,
        data: Date.now(),
        idUser: auth().currentUser.uid,
      })
      .then(() => navegacao.goBack());
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={estilos.main}
    >
      <TouchableOpacity onPress={() => navegacao.goBack()}>
        <View
          style={[
            estilos.btnBack,
            { flexDirection: 'row', gap: 2, alignItems: 'center' },
          ]}
        >
          <Feather name="arrow-left" size={18} color="#fff"></Feather>
          <Text style={[estilos.btnText, estilos.texto18, { color: '#fff' }]}>
            Voltar
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={estilos.muted}>
        {itemSelecionado
          ? 'Última edição em ' +
            new Date(itemSelecionado.data).toLocaleDateString()
          : 'Nova finança'}
      </Text>

      <View style={estilos.editingField}>
        <Text style={estilos.rotulo}>Valor</Text>
        <TextInput
          keyboardType="numeric"
          defaultValue={String(valor)}
          onChangeText={text => setValor(text.replace(',', '.'))}
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
          <View
            style={[
              lucro ? estilos.selecao : estilos.naoselecao,
              { flexDirection: 'row', alignItems: 'center', gap: 2 },
            ]}
          >
            <Feather
              name="arrow-up"
              size={18}
              color={lucro ? '#fff' : {}}
            ></Feather>
            <Text style={[estilos.texto18, lucro ? { color: '#fff' } : {}]}>
              Receita
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity disabled={!lucro} onPress={() => setLucro(false)}>
          <View
            style={[
              !lucro ? estilos.selecao : estilos.naoselecao,
              { flexDirection: 'row', alignItems: 'center', gap: 2 },
            ]}
          >
            <Feather
              name="arrow-down"
              size={18}
              color={!lucro ? '#fff' : {}}
            ></Feather>
            <Text style={[estilos.texto18, !lucro ? { color: '#fff' } : {}]}>
              Despesa
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity disabled={false} onPress={() => acao()}>
        <View
          style={[
            estilos.selecao,
            estilos.btnSubmit,
            { flexDirection: 'row', alignItems: 'center', gap: 2 },
          ]}
        >
          <Feather name="check" size={18} color="#fff"></Feather>
          <Text style={[estilos.texto18, { color: '#fff' }]}>
            {itemSelecionado ? 'Salvar alterações' : 'Cadastrar'}
          </Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#e9f2efff',
    padding: 20
  },
  editingField: {
    width: '100%',
  },
  entrada: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    color: '#383e55ff',
    fontSize: 16,
  },
  selecao: {
    padding: 20,
    backgroundColor: '#3bb898ff',
    borderRadius: 20,
  },
  btnSubmit: {
    backgroundColor: '#3b8cb8ff',
  },
  texto18: {
    fontSize: 18,
    color: '#383e55ff',
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
    backgroundColor: '#46675dff',
    borderRadius: 20,
  },
  btnText: {
    color: '#fff',
  },
  titulo: {
    fontSize: 28,
    color: '#383e55ff',
  },

  rotulo: {
    color: '#383e55ff',
    fontSize: 18,
    padding: 10,
  },
});

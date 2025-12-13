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
import LottieView from 'lottie-react-native';

export default function EditarFinancasView({ route }) {
  const navegacao = useNavigation();

  const [loading, setLoading] = useState();

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
    if ((valor !== '' && valor !== 0) && nome !== '') {
        setLoading(true)
      itemSelecionado ? editar() : cadastrar();
    } else {
      Alert.alert('Erro', 'Valor não pode ser zero e título precisa ser preenchido.');
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
        setLoading(false)
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
      .then(() => {setTimeout(()=>{

        setLoading(false)

        navegacao.goBack();
      }, 1000);
      }).catch((error)=>Alert.alert(error));
  }

  if (loading) {
    return(<View style={estilos.main}>
        <LottieView style={{width: 300, height: 300}} source={require('../loadingMyFinances.json')} autoPlay loop />
    </View>)
  } else {
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
          <Feather name="arrow-left" size={18} ></Feather>
          <Text style={[estilos.btnText2, estilos.texto18]}>
            Voltar
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={estilos.muted}>
        {itemSelecionado
          ? 'Última edição em ' +
            new Date(itemSelecionado.data).toLocaleDateString()
          : 'Nova finança para hoje'}
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
              color={"#fff"}
            ></Feather>
            <Text style={[estilos.texto18, {color: "#fff"} ]}>
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
              color={'#fff'}
            ></Feather>
            <Text style={[estilos.texto18 , {color: "#fff"}]}>
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

  
}

const estilos = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#001011', //FundoClaro
    padding: 20
  },
  editingField: {
    width: '100%',
  },
  entrada: {
    backgroundColor: '#093A3E',
    padding: 20,
    borderRadius: 20,
    color: '#ffffff',
    fontSize: 16,
  },
  selecao: {
    padding: 20,
    backgroundColor: '#64E9EE', //Verde
    borderRadius: 20,
  },
  btnSubmit: {
    backgroundColor: '#A6C36F', //Azul
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
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  btnText2: {
    color: '#093A3E',
  },
  btnText: {
    color: '#FFF',
  },
  titulo: {
    fontSize: 28,
    color: '#ffffff',
  },

  rotulo: {
    color: '#ffffff',
    fontSize: 18,
    padding: 10,
  },
});

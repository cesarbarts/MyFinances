import React from 'react';

import { View, Text, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function HomeView() {
  const navegacao = useNavigation();

  return (
    <View>
      <Text>Inicio</Text>

      <Button
        title="Cadastrar"
        onPress={() => navegacao.navigate('CadastrarFinanca')}
      ></Button>
    </View>
  );
}

import React, { useEffect, useState } from 'react';

import { View, Text, Button, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import { useFocusEffect } from '@react-navigation/native';

import { useCallback } from 'react';

export default function HomeView() {

    const navegacao = useNavigation()

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

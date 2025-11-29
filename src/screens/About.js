import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Filter } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';

import { useFocusEffect } from '@react-navigation/native';

import { useCallback } from 'react';

import CardTransacao from './CardTransacao';

import { Calendar } from 'react-native-calendars';

import auth from '@react-native-firebase/auth';

export default function About() {
  

  function sair() {
    auth().signOut();
  }

  return (
    <View style={estilos.geral}>
      <View style={estilos.first}>
        <ScrollView
          horizontal={true}
          decelerationRate="fast"
          snapToOffsets={[0, 410, 820]}
        >
          <View style={{ width: 1230, flexDirection: 'row' }}>
            <View
              style={[
                {
                  flex: 1,
                  backgroundColor: '#26ab91ff',
                  justifyContent: 'flex-end',
                  padding: 20,
                },
              ]}
            >
              <Text style={estilos.firstLabel}>Seu Perfil</Text>
              <Text numberOfLines={1} style={estilos.firstText}>
                {auth().currentUser.email}
              </Text>
            </View>
            <View
              style={[
                {
                  flex: 1,
                  backgroundColor: '#c74242ff',
                  justifyContent: 'flex-end',
                  padding: 20,
                },
              ]}
            >
              <Text style={estilos.firstLabel}>Soma</Text>
              <Text style={estilos.firstText}>
                R$0
              </Text>
            </View>
            <View
              style={[
                {
                  flex: 1,
                  backgroundColor: '#26ab91ff',
                  justifyContent: 'flex-end',
                  padding: 20,
                },
              ]}
            >
              <Text style={estilos.firstLabel}>Soma</Text>
              <Text style={estilos.firstText}>
                R$0
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={estilos.second}>
        
       

       
        <Button title="Sair" onPress={sair}></Button>
      </View>
   
    </View>
  );
}

const estilos = StyleSheet.create({
  geral: {
    flex: 1,
  },
  first: {
    flex: 0.3,
  },
  second: {
    backgroundColor: '#e9f2efff',
    flex: 0.7,
    paddingTop: 20,
  },
  firstText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  firstLabel: {
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  texto18: {
    fontSize: 16,
  },
  btnBack: {
    backgroundColor: '#383e5500',
    margin: 20,
  },
  btnText: {
    color: '#26ab91ff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

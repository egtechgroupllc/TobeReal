import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainAuth from '../../../components/MainAuth';
import Main from './components/Main';


export default function TradingFloorScreen() {
  return (
    <MainAuth>
        <Main/>
    </MainAuth>
  );
}

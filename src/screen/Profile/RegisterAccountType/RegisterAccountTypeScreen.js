import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Main from './components/Main';
import MainAuth from '../../../components/MainAuth';


export default function RegisterAccountTypeScreen() {
  return (
    <MainAuth>
        <Main/>
    </MainAuth>
  );
}

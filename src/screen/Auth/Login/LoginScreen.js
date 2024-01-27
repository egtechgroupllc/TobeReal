import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainWrapper from '../../../components/MainWrapper';
import Content from './components/Content';
import MainAuth from '../components/MainAuth';

export default function LoginScreen() {
  return (
    <MainAuth heading={'Hi, Welcome Back! 👋'}>
      <Content />
    </MainAuth>
  );
}

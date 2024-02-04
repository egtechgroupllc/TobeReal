import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Main from '../components/MainAuth';
import Content from './components/Content';
import MainAuth from '../components/MainAuth';
import { scale } from '../../../assets/constants';

export default function RegisterScreen() {
  return (
    <MainAuth
      heading={'Create an account'}
      subHeading={'Connect with your friends today!'}>
      <Content />
    </MainAuth>
  );
}

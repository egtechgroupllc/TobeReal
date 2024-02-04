import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainWrapper from '../../../components/MainWrapper';
import Content from './components/Content';
import Auth from '../components/MainAuth';
import { useLanguage } from '../../../hooks/useLanguage';
import { scale } from '../../../assets/constants';



export default function VerifyEmailScreen() {
const {t}= useLanguage()
  return (
    <Auth heading={'Verify Email'}>
      <Content />
    </Auth>
  );
}

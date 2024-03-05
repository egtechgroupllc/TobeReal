import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import MainAuth from '../../../components/MainAuth';
import Content from './components/Content';
import MainWrapper from '../../../components/MainWrapper';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../hooks/useLanguage';

export default function ChangePasswordScreen() {
  const {t} = useLanguage();
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('change_password'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper noSafeArea>
      <Content />
    </MainWrapper>
  );
}

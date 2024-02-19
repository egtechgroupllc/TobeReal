import React, {useEffect} from 'react';
import MainAuth from '../../components/MainAuth';
import Header from './components/Header';
import TabContent from './components/TabContent';
import MainWrapper from '../../components/MainWrapper';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAuthentication} from '../../hooks/useAuthentication';

export default function NewsScreen() {
  const upgrade = () => {};
  const {token} = useAuthentication();
  const {navigate, goBack} = useNavigation();
  const isFocused = useIsFocused();

    // useEffect(() => {
    //   if (isFocused && !token) {
    //     goBack();
    //     navigate('NavigationAuth');
    //   }
    // }, [isFocused]);

  return (
    <MainWrapper>
      <Header />
      <TabContent />
    </MainWrapper>
  );
}


import React from 'react';
import TabContent from './components/TabContent';
import MainAuth from '../../../../components/MainAuth';
import Header from '../../../Profile/components/Header';
import {useNavigation} from '@react-navigation/native';
import { scale } from '../../../../assets/constants/theme';


export default function LeaseScreen() {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const upgrade = () => {};
  return (
    <MainAuth>
      <Header goback={true} subHeading={'Post news'} noti={true} onPress={goBack} styleWrapper={{marginTop:scale(40), width:'80%' , alignSelf: 'center'}}/>
      <TabContent/>
    </MainAuth>
  );
}

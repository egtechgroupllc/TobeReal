
import React from 'react';
import TabContent from './components/TabContent';
import MainAuth from '../../../../components/MainAuth';
import Header from '../../../Profile/components/Header';
import {useNavigation} from '@react-navigation/native';
import { scale } from '../../../../assets/constants/theme';


export default function ContractScreen() {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const upgrade = () => {};
  return (
    <MainAuth>
      <Header goback={true} subHeading={'Contract information'} noti={true} onPress={goBack} styleWrapper={{marginTop:scale(40)}}/>
      <TabContent/>
    </MainAuth>
  );
}

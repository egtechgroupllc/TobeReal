
import React from 'react';
import TabContent from './components/TabContent';
import Header from '../../../../Profile/components/Header';
import {useNavigation} from '@react-navigation/native';
import { scale } from '../../../../../assets/constants/theme';
import MainAuth from '../../../../../components/MainAuth';


export default function AddRoomTypeScreen() {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const upgrade = () => {};
  return (
    <MainAuth>
      <Header goback={true} subHeading={'Add Room Type'} noti={true} onPress={goBack} styleWrapper={{marginTop:scale(40)}}/>
      <TabContent/>
    </MainAuth>
  );
}

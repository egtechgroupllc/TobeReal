
import React from 'react';
import TabContent from './components/TabContent';
import Header from '../../../../Profile/components/Header';
import {useNavigation} from '@react-navigation/native';
import { scale } from '../../../../../assets/constants/theme';
import MainAuth from '../../../../../components/MainAuth';
import { useLanguage } from '../../../../../hooks/useLanguage';


export default function AddRoomTypeScreen() {
  const {t}= useLanguage()
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const upgrade = () => {};
  return (
    <MainAuth>
      <Header goback={true} subHeading= {t('add_room_type')} noti={true} onPress={goBack} styleWrapper={{marginTop:scale(40)}}/>
      <TabContent/>
    </MainAuth>
  );
}

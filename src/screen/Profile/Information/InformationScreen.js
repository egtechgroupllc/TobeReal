import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import MainAuth from '../../../components/MainAuth';
import AvatarImage from '../components/AvatarImage';
import { useNavigation } from '@react-navigation/native';
import MidContent from './components/MidContent';
import BotContent from './components/BotContent';
import HeaderAvatar from '../components/HeaderAvatar';



export default function InformationScreen() {
  const navigation = useNavigation();
  const goBack = () =>{
   navigation.goBack();
  }
  const changeName= () =>{

  }
  return (
    <MainAuth>
        <HeaderAvatar noti={true} notify={goBack} goback={true} onPress={goBack} subHeading={"Personal Information"}/>
        <AvatarImage name={"John"} changeName={true} onPressChangeName={changeName}/>
        <MidContent/>
        <BotContent/>
    </MainAuth>
  );
}

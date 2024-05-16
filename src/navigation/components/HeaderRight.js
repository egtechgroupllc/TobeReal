import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import {IconGoBack, IconHome} from '../../assets/icon/Icon';

export default function HeaderRight() {
  const {navigate} = useNavigation();

  return (
    <Pressable onPress={() => navigate('BottomTab', {screen: 'Explore'})}>
      <IconHome />
    </Pressable>
  );
}

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import {IconGoBack} from '../../assets/icon/Icon';

export default function HeaderLeft({canGoBack}) {
  const {goBack} = useNavigation();

  return canGoBack ? (
    <Pressable onPress={goBack}>
      <IconGoBack />
    </Pressable>
  ) : null;
}

import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {COLORS, SIZES, scale} from '../assets/constants';
import {IconGoBack} from '../assets/icon/Icon';
import CustomText from './CustomText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default memo(function HeaderBar({back, navigation, options, route}) {
  const {goBack} = useNavigation();
  const insets = useSafeAreaInsets();

  if (!options?.headerShown) return null;
  return (
    <View
      style={[styles.wrapper, {paddingTop: insets.top}, options?.headerStyle]}>
      <View
        style={{
          flex: options?.headerTitleStyle?.textAlign === 'left' ? 0 : 1,
        }}>
        {!!back && !options?.headerLeft && (
          <Pressable onPress={goBack}>
            <IconGoBack />
          </Pressable>
        )}

        {options?.headerLeft && options?.headerLeft()}
      </View>

      <CustomText
        textType="semiBold"
        style={[styles.textHeader, options?.headerTitleStyle]}
        numberOfLines={1}>
        {options?.headerTitle || options?.title}
      </CustomText>

      <View
        style={{
          alignItems: 'flex-end',
          flex: options?.headerTitleStyle?.textAlign === 'right' ? 0 : 1,
        }}>
        {options?.headerRight && options?.headerRight()}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    minHeight: scale(40),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    paddingVertical: scale(4),
    columnGap: scale(10),
    overflow: 'hidden',
  },
  active: {
    minWidth: scale(30),
    backgroundColor: '#fff',
  },
  textHeader: {
    fontSize: SIZES.medium,
    maxWidth: scale(300),
    textAlign: 'center',
    color: COLORS.white,
  },
});

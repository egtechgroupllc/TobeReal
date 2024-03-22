import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useState} from 'react';
import {COLORS, scale} from '../../../../../assets/constants';
import {CustomButton, CustomInput} from '../../../../../components';
import {
  IconHandTap,
  IconMove,
  IconMyLocation,
} from '../../../../../assets/icon/Icon';
import {useLanguage} from '../../../../../hooks/useLanguage';

const listTypeMove = [
  {
    text: 'click',
    icon: IconHandTap,
  },
  {
    text: 'move',
    icon: IconMove,
  },
];
export default memo(function MapHeader({onPress, onPressMove, typeMove}) {
  const {t} = useLanguage();

  return (
    <View style={styles.wrapper}>
      <View style={styles.top}>
        <CustomInput
          placeholder={t('Search')}
          style={{
            backgroundColor: '#fff',
            flex: 1,
          }}
        />
        <CustomButton
          isShadow
          onPress={onPress}
          iconRight={IconMyLocation}
          style={styles.btnRegionUser}
          styleIcon={{
            color: '#3b57f8',
          }}
        />
      </View>

      <View style={styles.active}>
        {listTypeMove.map(item => (
          <CustomButton
            key={item.text}
            isShadow
            onPress={() => onPressMove(item.text)}
            iconRight={item.icon}
            style={styles.btnRegionUser}
            styleIcon={{
              ...styles.iconAc,
              color: typeMove === item.text ? COLORS.primary : COLORS.textSub,
            }}
          />
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: scale(20),
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
    padding: scale(10),
    rowGap: scale(16),
  },
  top: {
    columnGap: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnRegionUser: {
    backgroundColor: COLORS.white,
    width: scale(36),
    height: scale(38),
  },
  iconAc: {
    width: scale(18),
    height: scale(18),
  },
  active: {
    rowGap: scale(10),
    position: 'absolute',
    top: scale(70),
    left: scale(20),
  },
});

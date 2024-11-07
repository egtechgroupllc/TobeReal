import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';

import {useNavigation} from '@react-navigation/native';
import {CText} from '~components';
import {scale} from '~/utils/scale';
import {COLORS} from '~/assets/constants';
import {IconNext} from '~/assets/icon/Icon';

export default memo(function BoxItemProfile({
  title,
  Icon,
  nameScreen,
  nameNavigate = 'NavigationProfile',
  subTitle,
  onPress,
  titleRight,
  fill,
}) {
  const {navigate} = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        nameScreen
          ? navigate(nameNavigate, {
              screen: nameScreen,
            })
          : onPress && onPress();
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: scale(10),
        columnGap: scale(14),
      }}>
      {Icon && <Icon width={scale(16)} height={scale(16)} fill={fill} />}

      <CText textType="semiBold" size={scale(13)} style={{color: COLORS.White}}>
        {title}
      </CText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: scale(6),
          justifyContent: 'flex-end',
          flex: 1,
        }}>
        {titleRight && (
          <CText color={COLORS.White} numberOfLines={1}>
            {titleRight}
          </CText>
        )}
        <IconNext width={scale(12)} height={scale(12)} fill={COLORS.White} />
      </View>
    </TouchableOpacity>
  );
});

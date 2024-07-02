import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {COLORS, SHADOW, SIZES, scale} from '../../../assets/constants';
import CustomText from '../../../components/CustomText';
import {IconNext} from '../../../assets/icon/Icon';
import {useNavigation} from '@react-navigation/native';

export default memo(function BoxItemProfile({
  title,
  Icon,
  nameScreen,
  nameNavigate = 'NavigationProfile',
  subTitle,
  onPress,
  titleRight,
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
      {Icon && <Icon width={scale(16)} height={scale(16)} />}

      <CustomText textType="semiBold" size={scale(13)}>
        {title}
      </CustomText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: scale(6),
          justifyContent: 'flex-end',
          flex: 1,
        }}>
        {titleRight && (
          <CustomText color={COLORS.textSub} numberOfLines={1}>
            {titleRight}
          </CustomText>
        )}
        <IconNext width={scale(12)} height={scale(12)} fill={COLORS.textSub} />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({});

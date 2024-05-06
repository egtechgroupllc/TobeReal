/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {CustomButton} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';
import {useAuthentication} from '../../../../../hooks/useAuthentication';
import {formatPrice} from '../../../../../utils/format';

export default memo(function BookAccommodation({data}) {
  const {token} = useAuthentication();
  const {navigate} = useNavigation();
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          rowGap: scale(2),
        }}>
        <CustomText>Starting point:</CustomText>
        <CustomText
          textType="bold"
          style={{
            fontSize: SIZES.xMedium,
            color: COLORS.primary,
          }}>
          {formatPrice(100)}
        </CustomText>
      </View>
      <CustomButton
        onPress={() => {
          !token ? navigate('NavigationAuth') : navigate('RoomScreen', data);
        }}
        buttonType="medium"
        style={{flex: 0.7}}
        text={'View Room'}
        styleText={{
          fontSize: SIZES.xMedium,
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    columnGap: scale(20),
    paddingVertical: scale(8),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

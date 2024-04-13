import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {CustomInput} from '../../../../../components';
import {IconCalendar, IconDown} from '../../../../../assets/icon/Icon';
import {formatDate} from '../../../../../utils/format';

export default function TopCalendar({checkIn, checkOut, value, onPressTime}) {
  return (
    <View style={styles.top}>
      <View style={styles.boxDate}>
        <View
          style={{
            rowGap: scale(4),
            flex: 1,
          }}>
          <CustomText>Check-In</CustomText>
          <CustomText
            style={{
              fontSize: SIZES.xMedium,
              color: checkIn ? COLORS.text : COLORS.textSub,
            }}
            textType="semiBold">
            {checkIn ? formatDate(checkIn) : 'Check-in'}
          </CustomText>
        </View>

        <View
          style={{
            rowGap: scale(4),
            flex: 1,
          }}>
          <CustomText>Check-Out</CustomText>
          <CustomText
            style={{
              fontSize: SIZES.xMedium,
              color: checkOut ? COLORS.text : COLORS.textSub,
            }}
            textType="semiBold">
            {checkOut ? formatDate(checkOut) : 'Check-out'}
          </CustomText>
        </View>
      </View>
      {onPressTime && (
        <CustomInput
          styleText={{color: COLORS.black}}
          iconLeft={IconCalendar}
          iconRight={IconDown}
          defaultValue={value}
          onPress={onPressTime}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    padding: scale(10),
    borderBottomWidth: 1,
    borderColor: '#eee',
    rowGap: scale(12),
  },
  boxDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: scale(30),
    columnGap: scale(10),
  },
});

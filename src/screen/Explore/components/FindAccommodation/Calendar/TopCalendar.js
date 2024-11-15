import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {IconCalendar, IconDown} from '../../../../../assets/icon/Icon';
import {CustomInput} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {formatDate} from '../../../../../utils/format';
import {differenceInDays} from 'date-fns';

export default memo(function TopCalendar({
  checkIn,
  checkOut,
  value,
  onPressTime,
}) {
  const {t} = useLanguage();

  return (
    <View style={styles.top}>
      <View style={styles.boxDate}>
        <View
          style={{
            rowGap: scale(4),
            flex: 1,
          }}>
          <CustomText style={{color: COLORS.black}}>{t('check_in')}</CustomText>
          <CustomText
            style={{
              fontSize: SIZES.xMedium,
              color: checkIn ? COLORS.text : COLORS.textSub,
            }}
            textType="semiBold">
            {checkIn ? formatDate(checkIn) : t('check_in')}
          </CustomText>
        </View>

        <View style={styles.centerNight}>
          <CustomText style={{color: COLORS.black}}>
            {checkOut ? differenceInDays(checkOut, checkIn) : '...'}{' '}
            {t('night')}
          </CustomText>
        </View>

        <View
          style={{
            rowGap: scale(4),
            flex: 1,
            alignItems: 'flex-end',
          }}>
          <CustomText style={{color: COLORS.black}}>
            {t('check_out')}
          </CustomText>
          <CustomText
            style={{
              fontSize: SIZES.xMedium,
              color: checkOut ? COLORS.text : COLORS.textSub,
            }}
            textType="semiBold">
            {checkOut ? formatDate(checkOut) : '...'}
          </CustomText>
        </View>
      </View>

      {onPressTime && (
        <CustomInput
          iconLeft={IconCalendar}
          styleIcon={{color: COLORS.pioPrimary}}
          iconRight={IconDown}
          defaultValue={value}
          styleText={{color: COLORS.black}}
          onPress={onPressTime}
        />
      )}
    </View>
  );
});

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
  centerNight: {
    rowGap: scale(4),
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: scale(5),
    minWidth: scale(70),
    alignItems: 'center',
  },
});

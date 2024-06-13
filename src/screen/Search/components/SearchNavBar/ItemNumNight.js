import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import {formatDate} from '../../../../utils/format';
import {IconCheckBox} from '../../../../assets/icon/Icon';
import {useLanguage} from '../../../../hooks/useLanguage';

const ItemNumNight = ({item, index, data, isActive}) => {
  const {t} = useLanguage();

  return (
    <View
      style={{
        ...styles.wrapper,
        backgroundColor: index % 2 === 0 ? 'white' : COLORS.white70,
      }}>
      <View
        style={{
          rowGap: scale(5),
        }}>
        <CustomText
          textType="medium"
          style={{
            fontSize: SIZES.xMedium,
          }}>
          {item?.text || item}
        </CustomText>
        <CustomText
          textType="medium"
          style={{
            fontSize: SIZES.xMedium,
            color: isActive ? COLORS.primary : COLORS.black,
          }}>
          {t('check_out')}:{' '}
          {formatDate(data?.dateCheckIn || data?.date?.date_start, {
            addDays: item?.value,
            dateStyle: 'EEEE, yyyy-MM-dd',
          })}
        </CustomText>
      </View>

      {isActive && <IconCheckBox />}
    </View>
  );
};

export default memo(ItemNumNight);

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: scale(7),
    paddingHorizontal: scale(20),
    flexDirection: 'row',
    columnGap: scale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

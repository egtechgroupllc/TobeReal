import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import ItemUtil from '../../../Explore/components/DetailAccommodation/Rooms/components/ItemUtil';
import {IconInvoice} from '../../../../assets/icon/Icon';
import CustomText from '../../../../components/CustomText';
import {formatPrice} from '../../../../utils/format';

export default function TotalPriceBooking() {
  return (
    <View style={styles.wrapper}>
      <ItemUtil
        Icon={IconInvoice}
        title={'Tổng giá phòng'}
        value={'2 phòng, 1 đêm'}
        styleTextValue={styles.textValueUntil}
        styleIcon={styles.iconUntil}
      />
      <View
        style={{
          alignItems: 'flex-end',
          rowGap: scale(3),
        }}>
        <CustomText
          textType="medium"
          style={{
            textDecorationLine: 'line-through',
          }}>
          19.023.808 VND
        </CustomText>
        <CustomText textType="bold" size={SIZES.medium} color="#ff5e1f">
          {formatPrice(123131132)}
        </CustomText>
        <CustomText color={'#42b00b'}>Giá tốt nhất</CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    columnGap: scale(10),
    borderTopWidth: 1,
    paddingTop: scale(10),
    borderColor: COLORS.grey,
  },
  textValueUntil: {
    fontSize: SIZES.xMedium,
    color: COLORS.text,
  },
  iconUntil: {
    width: scale(18),
    height: scale(18),
  },
});

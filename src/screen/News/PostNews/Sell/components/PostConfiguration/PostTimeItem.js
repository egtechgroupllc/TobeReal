/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';
import {formatPrice} from '../../../../../../utils/format';

export default function PostTimeItem({onPress, data, cost, isSelect}) {
  const price = useMemo(
    () => cost - data?.discount * cost,
    [cost, data?.discount],
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        ...styles.box,

        borderColor: isSelect ? COLORS.primary : '#ddd',
        backgroundColor: isSelect ? '#fefaec' : '#fff',
      }}>
      <View
        style={{
          rowGap: scale(3),
        }}>
        <CustomText
          textType="semiBold"
          style={{
            fontSize: SIZES.xMedium,
          }}>
          {data.number_day} day
        </CustomText>
        <CustomText
          style={{
            color: COLORS.text,
          }}>
          {formatPrice(price)}/day
        </CustomText>
      </View>
      {!!data.discount && (
        <View
          style={{
            backgroundColor: '#ffeceb',
            padding: scale(2),
            borderRadius: scale(3),
          }}>
          <CustomText
            textType="semiBold"
            style={{
              color: '#e03c31',
              fontSize: SIZES.xSmall,
            }}>
            -{data?.discount * 100}%
          </CustomText>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    minWidth: scale(150),
    borderWidth: 1,
    borderRadius: scale(6),
    padding: scale(10),
    alignItems: 'center',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

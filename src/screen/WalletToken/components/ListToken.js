import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {CustomImage, CustomText} from '../../../components';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import {useQuery} from '@tanstack/react-query';
import {getBalanceWallet} from '../../../Model/api/wallet';
import {formatPrice} from '../../../utils/format';

export default function ListToken() {
  const {data, error} = useQuery({
    queryKey: ['user', 'wallet', 'balance'],
    queryFn: getBalanceWallet,
  });

  const listToken = useMemo(
    () => [
      {
        name: 'TBC',
        value: data?.data.TBC,
      },
      {
        name: 'TBH',
        value: data?.data.TBH,
      },
    ],
    [data?.data],
  );

  return (
    <View
      style={{
        alignItems: 'flex-start',
        width: '100%',
      }}>
      <CustomText size={SIZES.medium} textType="medium">
        Điểm thưởng
      </CustomText>
      <View
        style={{
          rowGap: scale(10),
          marginVertical: scale(14),
          width: '100%',
        }}>
        {listToken.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              columnGap: scale(12),
              alignItems: 'center',
              backgroundColor: COLORS.grey50,
              width: '100%',
              borderRadius: scale(10),
              padding: scale(8),
            }}>
            <CustomImage isAvatar source={images.logo1} size={scale(35)} />
            <View
              style={{
                rowGap: scale(3),
              }}>
              <CustomText size={SIZES.xMedium} textType="medium">
                {item.name}
              </CustomText>
              <CustomText textType="medium">
                {formatPrice(item?.value, {
                  showCurrency: false,
                })}
              </CustomText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

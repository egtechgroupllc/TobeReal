import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, images, scale, SHADOW, SIZES} from '../../../assets/constants';
import {useLanguage} from '../../../hooks/useLanguage';
import {CustomImage, CustomText} from '../../../components';

export default function SwapVoucher() {
  const {t} = useLanguage();
  const data = [
    {
      id: 1,
      content: t('first_faucet_exchange', {unit: 'USDP & PZO'}),
      image: [images.list_point],
    },
    {
      id: 2,
      content: t('next_choose_payment'),
      image: [images.choose_payment],
    },
    {
      id: 3,
      content: t('next_choose_hotel_voucher'),
      image: [images.voucher_swap, images.swap_confirm],
    },
    {
      id: 4,
      content: t('finally_apply_voucher'),
      image: [images.list_voucher, images.apply_voucher],
    },
  ];
  return (
    <View
      style={{
        rowGap: scale(20),
        padding: scale(20),
        borderWidth: scale(1),
        borderRadius: scale(10),
        borderColor: COLORS.pioBox,
      }}>
      {data?.map((item, index) => {
        return (
          <View style={{rowGap: scale(20)}} key={index}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <CustomText style={{fontSize: SIZES.xMedium}}>
                {item?.id}.{' '}
              </CustomText>
              <CustomText style={{fontSize: SIZES.xMedium}}>
                {item?.content}
              </CustomText>
            </View>
            {item?.image?.map((itemImage, indexImage) => {
              return (
                <CustomImage
                  key={`indexImage_${indexImage}`}
                  source={itemImage}
                  style={{
                    width: '100%',
                    height: scale(300),
                    backgroundColor: COLORS.white,
                    borderRadius: scale(5),
                    ...SHADOW,
                    borderWidth: scale(1),
                    borderColor: COLORS.pioBox,
                  }}
                  resizeMode="contain"
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});

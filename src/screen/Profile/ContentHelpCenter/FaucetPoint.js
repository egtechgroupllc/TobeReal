import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, images, scale, SHADOW, SIZES} from '../../../assets/constants';
import {useLanguage} from '../../../hooks/useLanguage';
import {CustomImage, CustomText} from '../../../components';

export default function FaucetPoint() {
  const {t} = useLanguage();
  const data = [
    {
      id: 1,
      content: t('first_create_wallet'),
      image: [images.wallet, images.create_import],
    },
    {
      id: 2,
      content: t('next_choose_point'),
      image: [images.list_point, images.faucet_button],
    },
    {
      id: 3,
      content: t('link_wallet_into', {unit: 'https://dex.pionechain.com/'}),
      image: [images.connect_wallet, images.choose_wallet],
    },
    {
      id: 4,
      content: t('process_faucet_points'),
      image: [images.choose_point],
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
          <View style={{rowGap: scale(20)}}>
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
            {item?.image?.map(itemImage => {
              return (
                <CustomImage
                  source={itemImage}
                  style={{
                    width: '100%',
                    height: scale(270),
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

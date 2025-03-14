import {useQuery} from '@tanstack/react-query';
import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {getBalanceWallet} from '../../../Model/api/wallet';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import {CustomImage, CustomText} from '../../../components';
import {useLanguage} from '../../../hooks/useLanguage';
import {formatPrice} from '../../../utils/format';
import TabSelect from './TabSelect';
import {useNavigation} from '@react-navigation/native';

export default function ListToken({dataP}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  // const listToken = useMemo(
  //   () => [
  //     {
  //       name: 'TOBECHAIN',
  //       value: data?.data?.[0]?.balance,
  //       unit: 'TOBE',
  //       image: images.logoTBH,
  //     },
  //     {
  //       name: 'TOBE HOUSE',
  //       value: data?.data?.[2]?.balance,
  //       unit: 'TBH',
  //       image: images.logoTBH,
  //     },
  //     {
  //       name: 'ECOSYSTEM (TOBECHAIN)',
  //       value: data?.data?.[1]?.balance,
  //       unit: 'ETOBE',
  //       image: images.logoEcoTOBE,
  //     },
  //     {
  //       name: 'TOBE AIRDROP',
  //       value: data?.data?.[3]?.balance,
  //       unit: 'TBC',
  //       image: images.logoTBH,
  //     },
  //   ],
  //   [data?.data],
  // );
  return (
    <View
      style={{
        rowGap: scale(10),
      }}>
      {/* <TabSelect data={dataP} /> */}
      <CustomText size={SIZES.medium} textType="medium">
        {t('point')}
      </CustomText>

      {dataP?.map((item, index) => (
        <TouchableOpacity
          onPress={() => {
            navigate('NoBottomTab', {
              screen: 'DetailTokenScreen',
              params: {listToken: item, data: dataP},
            });
          }}
          key={index}
          style={{
            flexDirection: 'row',
            columnGap: scale(12),
            alignItems: 'center',
            rowGap: scale(10),
            backgroundColor: COLORS.pioHeader + '20',
            borderRadius: scale(10),
            padding: scale(8),
          }}>
          <View style={styles.icon}>
            <CustomImage
              isAvatar
              source={item?.image}
              style={{
                width: scale(30),
                aspectRatio: 1,
              }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              rowGap: scale(3),
            }}>
            <CustomText
              size={scale(13)}
              textType="semiBold"
              style={{color: COLORS.black}}>
              {item?.name}
            </CustomText>
            <View style={{flexDirection: 'row', columnGap: scale(3)}}>
              <CustomText textType="medium">
                {formatPrice(item?.balance, {
                  showCurrency: false,
                  decimalPlaces: 6,
                })}
              </CustomText>
              <CustomText textType="medium">{item?.symbol}</CustomText>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: scale(35),
    width: scale(35),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(99),
  },
});

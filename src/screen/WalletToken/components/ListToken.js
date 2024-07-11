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
  const {data, error} = useQuery({
    queryKey: ['user', 'wallet', 'balance'],
    queryFn: getBalanceWallet,
  });

  const listToken = useMemo(
    () => [
      {
        name: 'TOBECHAIN',
        value: data?.data?.[0]?.balance,
        unit: 'TOBE',
        image: images.logoTBH,
      },
      {
        name: 'TOBE HOUSE',
        value: data?.data?.[2]?.balance,
        unit: 'TBH',
        image: images.logoTBH,
      },
      {
        name: 'ECOSYSTEM (TOBECHAIN)',
        value: data?.data?.[1]?.balance,
        unit: 'ETOBE',
        image: images.logoEcoTOBE,
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
      {/* <TabSelect data={dataP} /> */}
      <CustomText size={SIZES.medium} textType="medium">
        {t('point')}
      </CustomText>

      <View
        style={{
          rowGap: scale(10),
          marginVertical: scale(14),
          width: '100%',
        }}>
        {listToken.map((item, index) => (
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
              backgroundColor: '#4BBD9930',
              width: '100%',
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
                style={{color: '#52b788'}}>
                {item.name}
              </CustomText>
              <View style={{flexDirection: 'row', columnGap: scale(3)}}>
                <CustomText textType="medium">
                  {formatPrice(item?.value, {
                    showCurrency: false,
                    decimalPlaces: 6,
                  })}
                </CustomText>
                <CustomText textType="medium">{item.unit}</CustomText>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: scale(35),
    width: scale(35),
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(99),
  },
});

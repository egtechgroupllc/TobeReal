import {useQuery} from '@tanstack/react-query';
import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {formatPrice} from '../../../utils/format';
import TabSelect from './TabSelect';
import {useNavigation} from '@react-navigation/native';
import {CImage, CText} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {useLanguage} from '~/hooks/useLanguage';
import {getBalanceWallet} from '~/api/wallet';

export default function ListToken({dataP, token}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const {data} = useQuery({
    queryKey: ['user', 'wallet', 'balance'],
    queryFn: () => getBalanceWallet(),
    enabled: !!token,
  });
  const listToken = useMemo(
    () => [
      {
        name: 'TOBECHAIN',
        value: data?.data?.info_user?.tobeChainBalance,
        unit: 'TOBE',
        image: images.logoTBH,
      },
      {
        name: 'TOBE HOUSE',
        value: data?.data?.info_user?.tobeHouseBalance,
        unit: 'TBH',
        image: images.logoTBH,
      },
      // {
      //   name: 'ECOSYSTEM (TOBECHAIN)',
      //   value: data?.data?.[1]?.balance,
      //   unit: 'ETOBE',
      //   image: images.logoEcoTOBE,
      // },
      {
        name: 'TOBE AIRDROP',
        value: data?.data?.info_user?.tobeAirdropBalance,
        unit: 'TBC',
        image: images.logoTBH,
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
      <CText
        size={SIZES.medium}
        textType="medium"
        style={{color: COLORS.White}}>
        {t('point')}
      </CText>

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
              backgroundColor: COLORS.input,
              width: '100%',
              borderRadius: scale(10),
              padding: scale(8),
            }}>
            <View style={styles.icon}>
              <CImage.Avatar
                source={item?.image}
                style={{
                  width: scale(30),
                  height: scale(30),
                }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                rowGap: scale(3),
              }}>
              <CText
                size={scale(13)}
                textType="semiBold"
                style={{color: '#52b788'}}>
                {item.name}
              </CText>
              <View style={{flexDirection: 'row', columnGap: scale(3)}}>
                <CText textType="medium" style={{color: COLORS.White}}>
                  {formatPrice(item?.value, {
                    showCurrency: false,
                    decimalPlaces: 6,
                  })}
                </CText>
                <CText textType="medium" style={{color: COLORS.White}}>
                  {item.unit}
                </CText>
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

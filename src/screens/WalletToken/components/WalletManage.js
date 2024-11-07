import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getBalanceWallet} from '../../../Model/api/wallet';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '~/hooks/useLanguage';
import {CImage, CText} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {formatToken} from '~/utils/format';
import {IconRight} from '~/assets/icon/Icon';

export default function WalletManage({data}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  return (
    <View
      style={{
        alignItems: 'flex-start',
        width: '100%',
      }}>
      <CText size={SIZES.medium} textType="medium">
        {t('manage_point_voucher')}
      </CText>
      <View
        style={{
          rowGap: scale(10),
          marginVertical: scale(14),
          width: '100%',
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigate('NavigationProfile', {
              screen: 'FinancialTokenScreen',
              params: data,
            })
          }
          style={{
            flexDirection: 'row',
            columnGap: scale(12),
            alignItems: 'center',
            backgroundColor: COLORS.grey,
            width: '100%',
            borderRadius: scale(10),
            padding: scale(8),
          }}>
          <View style={styles.icon}>
            <CImage
              isAvatar
              source={images.logoTBH}
              style={{
                width: scale(30),
                aspectRatio: 1,
              }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(60),
            }}>
            <View
              style={{
                rowGap: scale(3),
              }}>
              <CText size={SIZES.xMedium} textType="medium">
                {t('token_balance_available')}:
              </CText>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: scale(3),
                }}>
                <CText textType="medium">
                  {formatToken(data?.balance_token_data, {
                    decimalPlaces: 20,
                  })}{' '}
                  TBH
                </CText>

                {/* <View
                    style={{
                      backgroundColor: COLORS.primary,
                      borderRadius: scale(10),
                      padding: scale(3),
                      paddingHorizontal: scale(15),
                    }}>
                    <CText textType="medium" style={{color: COLORS.white}}>
                      {t('withdraw')}
                    </CText>
                  </View> */}
              </View>
            </View>
            <IconRight />
          </View>
        </TouchableOpacity>
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

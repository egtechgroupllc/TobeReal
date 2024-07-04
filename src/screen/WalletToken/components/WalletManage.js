import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import {CustomButton, CustomImage, CustomText} from '../../../components';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import {useQuery} from '@tanstack/react-query';
import {getBalanceWallet} from '../../../Model/api/wallet';
import {formatPrice} from '../../../utils/format';
import {useLanguage} from '../../../hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import {IconArrowRight, IconRight} from '../../../assets/icon/Icon';

export default function WalletManage({data}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  return (
    <View
      style={{
        alignItems: 'flex-start',
        width: '100%',
      }}>
      <CustomText size={SIZES.medium} textType="medium">
        {t('manage_point_voucher')}
      </CustomText>
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
            backgroundColor: COLORS.grey50,
            width: '100%',
            borderRadius: scale(10),
            padding: scale(8),
          }}>
          <View style={styles.icon}>
            <CustomImage
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
              <CustomText size={SIZES.xMedium} textType="medium">
                {t('token_balance_available')}:
              </CustomText>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: scale(3),
                }}>
                <CustomText textType="medium">
                  {formatPrice(data?.balance_token_data, {
                    showCurrency: false,
                    decimalPlaces: 6,
                  })}{' '}
                  TBH
                </CustomText>

                {/* <View
                    style={{
                      backgroundColor: COLORS.primary,
                      borderRadius: scale(10),
                      padding: scale(3),
                      paddingHorizontal: scale(15),
                    }}>
                    <CustomText textType="medium" style={{color: COLORS.white}}>
                      {t('withdraw')}
                    </CustomText>
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

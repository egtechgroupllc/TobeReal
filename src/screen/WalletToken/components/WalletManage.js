import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import {CustomButton, CustomImage, CustomText} from '../../../components';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import {useQuery} from '@tanstack/react-query';
import {getBalanceWallet} from '../../../Model/api/wallet';
import {formatPrice} from '../../../utils/format';
import {useLanguage} from '../../../hooks/useLanguage';

export default function WalletManage({data}) {
  const {t} = useLanguage();
  return (
    <View
      style={{
        alignItems: 'flex-start',
        width: '100%',
      }}>
      <CustomText size={SIZES.medium} textType="medium">
        {t('wallet manage')}
      </CustomText>
      <View
        style={{
          rowGap: scale(10),
          marginVertical: scale(14),
          width: '100%',
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
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
              Số dư TBH (khả dụng có thể rút về ví):
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: scale(3),
              }}>
              <CustomText textType="medium">
                {formatPrice(data?.balance_token_data, {
                  currency: 'TBH',
                  locales: 'vi',
                  decimalPlaces: 20,
                })}
              </CustomText>
              <CustomText>
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    borderRadius: scale(10),
                    padding: scale(3),
                    paddingHorizontal: scale(10),
                  }}>
                  <CustomText textType="medium" style={{color: COLORS.white}}>
                    {t('withdraw')}
                  </CustomText>
                </View>
              </CustomText>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

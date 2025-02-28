import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import {CustomButton, CustomImage, CustomText} from '../../../components';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import {useQuery} from '@tanstack/react-query';
import {getBalanceWallet} from '../../../Model/api/wallet';
import {formatPrice, formatToken} from '../../../utils/format';
import {useLanguage} from '../../../hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import {IconArrowRight, IconRight} from '../../../assets/icon/Icon';
import {getToken, getTokenAirdrop} from '../../../Model/api/common';

export default function WalletManage({data}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const {data: getDataToken, error} = useQuery({
    queryKey: ['common', 'token'],
    queryFn: () => getToken(),
  });
  return (
    <View
      style={{
        rowGap: scale(10),
      }}>
      <CustomText size={SIZES.medium} textType="medium">
        {t('manage_point_voucher')}
      </CustomText>

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
          backgroundColor: COLORS.grey50,
          borderRadius: scale(10),
          padding: scale(8),
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: scale(10),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(10),
          }}>
          <View style={styles.icon}>
            <CustomImage
              isAvatar
              source={{uri: getDataToken?.data?.image_url}}
              style={{
                width: scale(30),
                aspectRatio: 1,
              }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <View
              style={{
                rowGap: scale(3),
              }}>
              <CustomText size={SIZES.xSmall} textType="bold" numberOfLines={2}>
                {t('token_balance_available', {
                  unit: getDataToken?.data?.symbol,
                })}
                :
              </CustomText>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: scale(3),
                }}>
                <CustomText textType="medium">
                  {formatToken(data?.balance_token_data, {
                    decimalPlaces: 20,
                  })}{' '}
                  {getDataToken?.data?.symbol}
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
          </View>
        </View>
        <IconRight fill={COLORS.black} />
      </TouchableOpacity>
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

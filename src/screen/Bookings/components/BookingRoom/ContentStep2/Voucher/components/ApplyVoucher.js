import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import {CustomText} from '../../../../../../../components';
import {IconVoucher} from '../../../../../../../assets/icon/Icon';
import {useLanguage} from '../../../../../../../hooks/useLanguage';

export default function ApplyVoucher({data, onCheckVoucher, dataVoucher}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  return (
    <View style={styles.voucherView}>
      <CustomText
        color={COLORS.black}
        textType="regular"
        style={{
          textAlign: 'left',
          fontSize: SIZES.xMedium,
        }}>
        {t('apply_gift_voucher')}
      </CustomText>
      <View
        style={{
          borderRadius: scale(6),
          backgroundColor: COLORS.white,
          marginTop: scale(10),
          paddingVertical: scale(15),
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(20),
            justifyContent: 'space-between',
            paddingHorizontal: scale(15),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(5),
            }}>
            <IconVoucher width={scale(20)} height={scale(20)} />
            <CustomText
              color={COLORS.black}
              textType="semiBold"
              style={{
                textAlign: 'center',
              }}>
              {dataVoucher?.length} {t('voucher_applied')}
            </CustomText>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigate('HomeListVoucherScreen', {
                onGoBack: valueBack => {
                  onCheckVoucher && onCheckVoucher(valueBack);
                },
                accomId: data?.accommodation_id,
              })
            }>
            <CustomText
              color={COLORS.primary}
              textType="semiBold"
              style={{
                textAlign: 'center',
              }}>
              {t('add')}
            </CustomText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            height: scale(1),
            backgroundColor: '#f5f5f5',
            marginTop: scale(5),
          }}
        />
        <View style={{paddingHorizontal: scale(10), paddingTop: scale(5)}}>
          <CustomText
            color={COLORS.grey}
            textType="semiBold"
            style={{
              textAlign: 'left',
            }}>
            {t('you_have')} 0 {t('available_voucher_left')}
          </CustomText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  voucherView: {
    width: '100%',
    paddingVertical: scale(25),
  },
});

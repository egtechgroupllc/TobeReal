import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import {CustomText} from '../../../../../../../components';
import {IconVoucher} from '../../../../../../../assets/icon/Icon';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import {useQuery} from '@tanstack/react-query';
import {getListVoucherCanUse} from '../../../../../../../Model/api/apiAccom';
import {getListVoucherTourCanUse} from '../../../../../../../Model/api/apiTour';

export default function ApplyVoucher({
  data,
  onCheckVoucher,
  dataVoucher,
  isTour,
}) {
  const {navigate} = useNavigation();

  const {t} = useLanguage();
  const dataVoucherCanUse = useQuery({
    queryKey: !isTour
      ? ['voucher', 'list-voucher-can-use', data?.accommodation_id]
      : ['voucher', 'list-voucher-tour-can-use', data?.tour_id],
    queryFn: () =>
      !isTour
        ? getListVoucherCanUse(data?.accommodation_id)
        : getListVoucherTourCanUse(data?.tour_id),
  });
  return (
    <View style={styles.voucherView}>
      <CustomText
        color={COLORS.black}
        textType="regular"
        style={{
          textAlign: 'left',
          fontSize: SIZES.xMedium,
        }}>
        {t('apply_voucher')}
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
              {dataVoucher ? dataVoucher?.length : 0} {t('voucher_applied')}
            </CustomText>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigate('HomeListVoucherScreen', {
                onGoBack: valueBack => {
                  onCheckVoucher && onCheckVoucher(valueBack);
                },
                accomId: data?.accommodation_id,
                tourId: data?.tour_id,
                isTour: isTour,
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
            {t('you_have')}{' '}
            {dataVoucherCanUse ? dataVoucherCanUse?.data?.data?.count : 0}{' '}
            {t('available_voucher_left').toLowerCase()}
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

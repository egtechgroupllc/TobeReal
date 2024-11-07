import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
// import {getListVoucherCanUse} from '../../../../../../../Model/api/apiAccom';
// import {getListVoucherTourCanUse} from '../../../../../../../Model/api/apiTour';
import {useLanguage} from '~/hooks/useLanguage';
import {CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {IconVoucher} from '~/assets/icon/Icon';
import {getListVoucherUser} from '~/api/voucher';

export default function ApplyVoucher({
  data,
  onCheckVoucher,
  dataVoucher,
  isTour,
  checkDiffrentCountry,
  countryRate,
}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  // const dataVoucherCanUse = useQuery({
  //   queryKey: !isTour
  //     ? ['voucher', 'list-voucher-can-use', data?.accommodation_id]
  //     : ['voucher', 'list-voucher-tour-can-use', data?.tour_id],
  //   queryFn: () =>
  //     !isTour
  //       ? getListVoucherCanUse(data?.accommodation_id)
  //       : getListVoucherTourCanUse(data?.tour_id),
  // });
  const {data: dataVoucherCanUse} = useQuery({
    queryKey: [...getListVoucherUser.queryKey, {keyword: data?.id}],
    queryFn: () => getListVoucherUser({keyword: data?.id}),
  });

  return (
    <View style={styles.voucherView}>
      <CText
        textType="regular"
        style={{
          textAlign: 'left',
          fontSize: SIZES.xMedium,
          color: COLORS.White,
        }}>
        {t('apply_voucher')}
      </CText>
      <View
        style={{
          borderRadius: scale(6),
          backgroundColor: COLORS.input,
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
            <IconVoucher
              width={scale(20)}
              height={scale(20)}
              fill={COLORS.cyan}
            />
            <CText
              color={COLORS.White}
              textType="semiBold"
              style={{
                textAlign: 'center',
              }}>
              {dataVoucher ? dataVoucher?.length : 0} {t('voucher_applied')}
            </CText>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigate('HomeListVoucherScreen', {
                onGoBack: valueBack => {
                  onCheckVoucher && onCheckVoucher(valueBack);
                },
                checkDiffrentCountry: checkDiffrentCountry,
                countryRate: countryRate,
                ...data,
              })
            }>
            <CText
              color={COLORS.blue}
              textType="bold"
              style={{
                textAlign: 'center',
              }}>
              {t('add')}
            </CText>
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
          <CText
            color={COLORS.White}
            textType="semiBold"
            style={{
              textAlign: 'left',
            }}>
            {t('you_have')}{' '}
            {dataVoucherCanUse ? dataVoucherCanUse?.data?.count : 0}{' '}
            {t('available_voucher_left').toLowerCase()}
          </CText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  voucherView: {
    width: '100%',
    paddingVertical: scale(10),
  },
});

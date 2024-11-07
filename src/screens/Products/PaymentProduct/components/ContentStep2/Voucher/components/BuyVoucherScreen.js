import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import SelectVoucherFooter from './SelectVoucherFooter';
import {useForm} from 'react-hook-form';
import {postBuyVoucher} from '../../../../../../../Model/api/apiAccom';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postBuyVoucherTour} from '../../../../../../../Model/api/apiTour';
import {IconClock, IconHome} from '~/assets/icon/Icon';
import {scale} from '~/utils/scale';
import {useLanguage} from '~/hooks/useLanguage';
import {useCountry} from '~/hooks/useCountry';
import {showMess} from '~/assets/constants/Helper';
import {CImage, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {formatPrice} from '~/utils/format';
import {getListVoucherUser, postBuyVoucherDoctor} from '~/api/voucher';

export default function BuyVoucherScreen() {
  const {t} = useLanguage();
  const {currency} = useCountry();
  const queryClient = useQueryClient();
  const params = useRoute().params;

  const {setOptions, goBack, navigate} = useNavigation();

  useEffect(() => {
    return setOptions({
      headerTitle: t('buy_voucher'),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('BottomTab')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
  }, []);
  const [quantity, setQuantity] = useState(1);
  const buyVoucherMutation = useMutation({
    mutationFn: postBuyVoucherDoctor,
  });

  const handleBuyVoucher = value => {
    buyVoucherMutation.mutate(
      {quantity: quantity, id: params?.id},
      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            dataInside?.error ? 'error' : 'success',
          );
          if (!dataInside?.error) {
            queryClient.invalidateQueries([...getListVoucherUser.queryKey]);
            goBack();
          }
        },
        onError: err => {
          if (err.response) {
            showMess(err?.response?.data?.message, 'error');
          }
        },
      },
    );
  };
  const handleAlert = () => {
    Alert.alert(
      t('are_you_sure_want_buy_voucher'),
      t('transaction_cant_refund'),
      [
        {
          text: t('cancel'),
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {text: t('ok'), onPress: () => handleBuyVoucher()},
      ],
    );
  };
  return (
    <MainWrapper scrollEnabled={false} sourceImage={images.backgroundHome}>
      <CImage
        source={images.slider1}
        style={{
          width: '90%',
          height: scale(200),
          margin: scale(20),
          borderRadius: scale(10),
          opacity: 0.7,
        }}
      />
      <CImage
        source={{uri: params?.image}}
        // source={images.slider3}
        style={{
          width: scale(80),
          height: scale(80),
          borderRadius: scale(10),
          opacity: 1,
          zIndex: 99,
          position: 'absolute',
          top: scale(90),
          left: scale(20),
        }}
      />
      <View
        style={{
          rowGap: scale(5),
          marginTop: scale(10),
        }}>
        <CText
          textType="bold"
          style={{
            fontSize: SIZES.medium,
            textAlign: 'center',
            color: COLORS.White,
          }}>
          {t('voucher')} {t('medical_examination_discount').toLowerCase()}{' '}
          {formatPrice(params?.price_discount, {
            currency: currency?.currency_code,
          })}
        </CText>
        <View
          style={{
            backgroundColor: COLORS.input,
            height: scale(25),
            alignSelf: 'center',
            borderRadius: scale(5),
            paddingHorizontal: scale(10),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: scale(5),
          }}>
          <IconClock fill={COLORS.White} width={scale(15)} height={scale(15)} />
          <CText
            textType="medium"
            style={{fontSize: SIZES.xMedium, color: COLORS.White}}>
            {params?.date_start} - {params?.date_end}
          </CText>
        </View>
        <View
          style={{
            marginTop: scale(10),
            minHeight: scale(50),
            minWidth: scale(120),
            borderRadius: scale(5),
            flexDirection: 'row',
            columnGap: scale(5),
            borderBottomWidth: 1,
            borderColor: COLORS.grey,
            paddingHorizontal: scale(20),
          }}>
          <View style={{rowGap: scale(5), flex: 0.6}}>
            <CText
              textType="medium"
              style={{fontSize: SIZES.xMedium, color: COLORS.White}}>
              {t('point')}
            </CText>
            <CText
              textType="medium"
              style={{fontSize: SIZES.xMedium, color: COLORS.White}}>
              {formatPrice(params?.price, {
                currency: 'TBH',
                locales: 'vi',
                decimalPlaces: 12,
              })}
            </CText>
          </View>
          <View
            style={{
              rowGap: scale(5),
              flex: 0.3,
              flexDirection: 'row',
              columnGap: scale(5),
            }}>
            <View
              style={{
                width: scale(2),
                height: scale(40),
                backgroundColor: COLORS.grey,
              }}
            />
            <View style={{rowGap: scale(5), flex: 0.6}}>
              <CText
                textType="medium"
                style={{fontSize: SIZES.xMedium, color: COLORS.White}}>
                {t('quantity')}
              </CText>
              <CText
                textType="medium"
                style={{
                  fontSize: SIZES.xMedium,
                  color: COLORS.White,
                  textAlign: 'center',
                }}>
                {params?.quantity_real}
              </CText>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: scale(20),
            paddingVertical: scale(5),
            rowGap: scale(10),
          }}>
          <CText
            textType="medium"
            style={{fontSize: SIZES.xMedium, color: COLORS.White}}>
            - {t('discount_voucher')}{' '}
            {formatPrice(
              params?.checkDiffrentCountry
                ? (params?.price_discount / params?.countryRate) *
                    currency?.exchange_rate
                : params?.price_discount,
              {
                currency: currency?.currency_code,
              },
            )}{' '}
            {t('when_paying_examination_price')}.
          </CText>
          {/* <CText
            textType="medium"
            style={{fontSize: SIZES.xMedium, color: COLORS.black}}>
            -{' '}
            {params?.accomId
              ? t('apply_all_hotel_system')
              : t('apply_all_this_tour_system')}{' '}
            - {params?.item?.accommodation?.name || params?.item?.tour?.name}.
          </CText> */}
          <CText
            textType="medium"
            style={{fontSize: SIZES.xMedium, color: COLORS.White}}>
            - {t('this_voucher_is_valid')} {params?.date_end}
          </CText>
          <CText
            textType="medium"
            style={{fontSize: SIZES.xMedium, color: COLORS.White}}>
            -{' '}
            {params?.accomId
              ? t('this_voucher_not_apply_other_hotel')
              : t('this_voucher_not_apply_other_doctor')}
          </CText>
        </View>
      </View>
      <SelectVoucherFooter
        buyVoucher
        setQuantity={setQuantity}
        numQuantity={params?.quantity_real}
        quantity={quantity}
        onBuy={() => handleAlert()}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

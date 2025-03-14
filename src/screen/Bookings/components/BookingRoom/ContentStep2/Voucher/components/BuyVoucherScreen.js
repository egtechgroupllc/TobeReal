import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import {
  BottomSheet,
  CheckBox,
  CustomButton,
  CustomImage,
  CustomText,
  MainWrapper,
} from '../../../../../../../components';
import {
  COLORS,
  SIZES,
  images,
  scale,
} from '../../../../../../../assets/constants';
import {
  IconClock,
  IconDown,
  IconHome,
  IconRight,
} from '../../../../../../../assets/icon/Icon';
import {formatPrice} from '../../../../../../../utils/format';
import {useCountry} from '../../../../../../../hooks/useCountry';
import SelectVoucherFooter from './SelectVoucherFooter';
import {useForm} from 'react-hook-form';
import {postBuyVoucher} from '../../../../../../../Model/api/apiAccom';
import {useMutation, useQuery} from '@tanstack/react-query';
import {showMess} from '../../../../../../../assets/constants/Helper';
import {postBuyVoucherTour} from '../../../../../../../Model/api/apiTour';
import {useLoading} from '../../../../../../../hooks/useLoading';
import {getToken} from '../../../../../../../Model/api/common';
import {getBalanceWallet} from '../../../../../../../Model/api/wallet';
import {useAuthentication} from '../../../../../../../hooks/useAuthentication';
import Button from '../../../../../../Profile/components/Button';

export default function BuyVoucherScreen() {
  const {t} = useLanguage();
  const {currency} = useCountry();
  const {token} = useAuthentication();
  const bottomSheetRef = useRef();
  const [check, setCheck] = useState({
    id: 1,
    name: 'USDP.ZORC20',
  });
  const params = useRoute().params;
  const {setOptions, goBack, navigate} = useNavigation();
  const {stopLoading, setLoading} = useLoading();
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
    mutationFn: postBuyVoucher,
  });
  const buyVoucherTourMutation = useMutation({
    mutationFn: postBuyVoucherTour,
  });
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
        {text: t('ok'), onPress: () => BuyVoucher()},
      ],
    );
  };
  const BuyVoucher = () => {
    const mutationConfig = {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.status ? 'success' : 'error',
        );
        if (dataInside?.status) {
          navigate('HomeListVoucherScreen', {...params, isSuccess: true});
        }
      },

      onError: error => {
        if (error.response) {
          showMess(error?.response?.data?.message, 'error');
        }
      },
    };
    if (!params?.isTour) {
      buyVoucherMutation.mutate(
        {id: params?.item?.id, quantity: quantity},
        mutationConfig,
      );
      return;
    }
    buyVoucherTourMutation.mutate(
      {id: params?.item?.id, quantity: quantity},
      mutationConfig,
    );
  };
  const {data: getDataToken} = useQuery({
    queryKey: ['common', 'token'],
    queryFn: () => getToken(),
  });
  useEffect(() => {
    setLoading(true);
  }, []);
  const dataList = [
    {
      id: 1,
      name: 'USDP.ZORC20',
    },
    {
      id: 2,
      name: 'USDP.PIRC20',
      isBeta: true,
    },
    {
      id: 3,
      name: 'PIO.PIRC20',
      isBeta: true,
    },
  ];

  return (
    <MainWrapper scrollEnabled={false}>
      <CustomImage
        source={images.banner}
        style={{
          width: '100%',
          height: scale(200),
          padding: scale(15),
          opacity: 0.6,
        }}
      />
      <CustomImage
        source={{uri: params?.item?.images[0]?.url}}
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
      <View style={{rowGap: scale(5), marginTop: scale(10)}}>
        <CustomText
          textType="bold"
          style={{fontSize: SIZES.medium, textAlign: 'center'}}>
          {params?.item?.name}
        </CustomText>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: scale(25),
            width: scale(120),
            alignSelf: 'center',
            borderRadius: scale(5),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: scale(5),
          }}>
          <IconClock fill={COLORS.white} width={scale(15)} height={scale(15)} />
          <CustomText
            textType="medium"
            style={{fontSize: SIZES.xMedium, color: COLORS.white}}>
            {params?.item?.date_end}
          </CustomText>
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
          <TouchableOpacity
            style={{
              rowGap: scale(5),
              flex: 0.6,
            }}
            onPress={() => bottomSheetRef.current.open()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: scale(5),
                columnGap: scale(20),
              }}>
              <View>
                <CustomText
                  textType="medium"
                  style={{fontSize: SIZES.xMedium, color: COLORS.black}}>
                  {t('point')}
                </CustomText>
                <CustomText
                  textType="medium"
                  style={{fontSize: SIZES.xMedium, color: COLORS.black}}>
                  {formatPrice(params?.item?.price, {
                    showCurrency: false,
                    // currency: getDataToken?.data?.symbol,
                    // locales: 'vi',
                    decimalPlaces: 12,
                  })}{' '}
                  {getDataToken?.data?.symbol}.ZORC20
                  {/* {check?.name} */}
                </CustomText>
              </View>
              <IconDown />
            </View>
          </TouchableOpacity>
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
                backgroundColor: COLORS.grey50,
              }}
            />
            <View>
              <CustomText
                textType="medium"
                style={{fontSize: SIZES.xMedium, color: COLORS.black}}>
                {t('quantity')}:
              </CustomText>
              <CustomText
                textType="medium"
                style={{
                  fontSize: SIZES.xMedium,
                  color: COLORS.black,
                  textAlign: 'center',
                }}>
                {params?.item?.quantity_real}
              </CustomText>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: scale(20),
            paddingVertical: scale(5),
            rowGap: scale(10),
          }}>
          <CustomText
            textType="medium"
            style={{fontSize: SIZES.xMedium, color: COLORS.black}}>
            - {t('discount_voucher')}{' '}
            {formatPrice(
              params?.checkDiffrentCountry
                ? (params?.item?.price_discount / params?.countryRate) *
                    currency?.exchange_rate
                : params?.item?.price_discount,
              {
                currency: currency?.currency_code,
              },
            )}{' '}
            {t('when_paying_at')}{' '}
            {params?.item?.accommodation?.name || params?.item?.tour?.name}.
          </CustomText>
          <CustomText
            textType="medium"
            style={{fontSize: SIZES.xMedium, color: COLORS.black}}>
            -{' '}
            {params?.accomId
              ? t('apply_all_hotel_system')
              : t('apply_all_this_tour_system')}{' '}
            - {params?.item?.accommodation?.name || params?.item?.tour?.name}.
          </CustomText>
          <CustomText
            textType="medium"
            style={{fontSize: SIZES.xMedium, color: COLORS.black}}>
            - {t('this_voucher_is_valid')} {params?.item?.date_end}
          </CustomText>
          <CustomText
            textType="medium"
            style={{fontSize: SIZES.xMedium, color: COLORS.black}}>
            -{' '}
            {params?.accomId
              ? t('this_voucher_not_apply_other_hotel')
              : t('this_voucher_not_apply_other_tour')}
          </CustomText>
        </View>
      </View>
      <SelectVoucherFooter
        buyVoucher
        setQuantity={setQuantity}
        numQuantity={params?.item?.quantity_real}
        quantity={quantity}
        onBuy={() => handleAlert()}
      />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['30%', '40%']}
        titleIndicator={t('select')}
        handleStyle={{color: COLORS.black}}
        styleContent={{
          rowGap: scale(10),
          paddingHorizontal: scale(16),
        }}>
        {dataList?.map((item, index) => {
          return (
            <View style={{padding: scale(10)}}>
              <CheckBox
                key={index}
                textBold
                isRadio
                text={item?.name}
                isChecked={item?.id === check?.id}
                onPress={() => {
                  setCheck(item);
                }}
                textStyle={{
                  fontSize: SIZES.xMedium,
                }}
              />
            </View>
          );
        })}
        <CustomButton
          text={t('confirm')}
          styleWrapper={{width: '80%', alignSelf: 'center'}}
          onPress={() => {
            if (check?.isBeta) {
              showMess(t('comming_soon'), 'error');
            } else {
              bottomSheetRef.current.close();
            }
          }}
        />
      </BottomSheet>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

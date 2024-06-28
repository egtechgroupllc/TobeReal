import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import {
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
import {IconClock} from '../../../../../../../assets/icon/Icon';
import {formatPrice} from '../../../../../../../utils/format';
import {useCountry} from '../../../../../../../hooks/useCountry';
import SelectVoucherFooter from './SelectVoucherFooter';
import {useForm} from 'react-hook-form';
import {postBuyVoucher} from '../../../../../../../Model/api/apiAccom';
import {useMutation} from '@tanstack/react-query';
import {showMess} from '../../../../../../../assets/constants/Helper';

export default function BuyVoucherScreen() {
  const {t} = useLanguage();
  const {currency} = useCountry();

  const params = useRoute().params;
  const {setOptions, goBack, navigate} = useNavigation();

  useEffect(() => {
    return setOptions({
      headerTitle: t('Buy voucher'),
    });
  }, []);
  const [quantity, setQuantity] = useState(1);
  const buyVoucherMutation = useMutation({
    mutationFn: postBuyVoucher,
  });
  const handleAlert = () => {
    Alert.alert(
      t('Are you sure you want to buy this voucher?'),
      t('Transactions made cannot be refunded!'),
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
    buyVoucherMutation.mutate(
      {id: params?.item?.id, quantity: quantity},
      {
        onSuccess: dataInside => {
          console.log(dataInside);
          showMess(
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );
          if (dataInside?.status) {
            navigate('HomeListVoucherScreen', {params, isSuccess: true});
          }
        },

        onError: error => {
          if (error.response) {
            showMess(error?.response?.data?.message, 'error');
          }
        },
      },
    );
  };
  return (
    <MainWrapper scrollEnabled={false}>
      <CustomImage
        source={images.banner}
        style={{
          width: '100%',
          height: scale(200),
          padding: scale(15),
          opacity: 0.6,
        }}></CustomImage>
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
          <View style={{rowGap: scale(5), flex: 0.6}}>
            <CustomText
              textType="medium"
              style={{fontSize: SIZES.xMedium, color: COLORS.black}}>
              Point:
            </CustomText>
            <CustomText
              textType="medium"
              style={{fontSize: SIZES.xMedium, color: COLORS.black}}>
              {formatPrice(params?.item?.price, {
                currency: 'TBH',
                locales: 'vi',
                decimalPlaces: 12,
              })}
            </CustomText>
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
                backgroundColor: COLORS.grey50,
              }}
            />
            <View>
              <CustomText
                textType="medium"
                style={{fontSize: SIZES.xMedium, color: COLORS.black}}>
                Quantity:
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
            - {t('Voucher uu dai giam ')}{' '}
            {formatPrice(params?.item?.price_discount, {
              currency: currency?.currency_code,
            })}{' '}
            {t('khi thanh toan tai khach san')}{' '}
            {params?.item?.accommodation?.name}.
          </CustomText>
          <CustomText
            textType="medium"
            style={{fontSize: SIZES.xMedium, color: COLORS.black}}>
            - {t('Ap dung tren tat ca he thong thuoc khach san')}{' '}
            {params?.item?.accommodation?.name}.
          </CustomText>
          <CustomText
            textType="medium"
            style={{fontSize: SIZES.xMedium, color: COLORS.black}}>
            - {t('Voucher nay co thoi han su dung den')}{' '}
            {params?.item?.date_end}
          </CustomText>
          <CustomText
            textType="medium"
            style={{fontSize: SIZES.xMedium, color: COLORS.black}}>
            - {t('Voucher khong ap dung cho cac khach san khac.')}
          </CustomText>
        </View>
      </View>
      <SelectVoucherFooter
        buyVoucher
        setQuantity={setQuantity}
        numQuantity={params?.item?.quantity}
        quantity={quantity}
        onBuy={() => handleAlert()}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {images, scale} from '../../assets/constants';
import PaymentMethodsItem from './components/BookingRoom/ContentStep2/PaymentMethodsItem';
import {showMess} from '../../assets/constants/Helper';
import {useLanguage} from '../../hooks/useLanguage';

export default function ListPaymentMethodsScreen({route}) {
  const {t} = useLanguage();
  const listMethods = [
    {
      header: t('saveloka_wallet'),
      title: t('saveloka_transfer'),
      desc: t('pay_with_wallet'),
      tag: t('recommended'),
      type: 'FIAT',
      image: images.logo1,
    },
    {
      header: t('voucher'),
      title: t('voucher'),
      desc: t('pay_with_voucher'),
      tag: t('recommended'),
      type: 'VOUCHER',
      image: images.voucher_saveloka,
    },
    {
      header: t('payment_card'),
      title: t('payment_card'),
      desc: t('accept_all_bank'),
      type: 'CARD',
      image: images.iconBank,
    },
    {
      header: 'PAYPAL',
      title: t('paypal_transfer'),
      type: 'PAYPAL',
      image: images.iconPaypal,
    },
    // {
    //   header: 'Direct payment',
    //   title: 'Pay directly at the location',
    //   tag: 'Ưu đãi giảm gía',
    //   type: 'CASH',
    //   image: images.iconDirect,
    // },
  ];
  const {setOptions, goBack} = useNavigation();
  const dataParams = route?.params;
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('select_payment_method'),
      headerTitleStyle: {
        textAlign: 'left',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <FlatList
        data={listMethods}
        style={{
          height: '100%',
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          rowGap: scale(10),
          padding: scale(20),
        }}
        renderItem={({item, index}) => (
          <PaymentMethodsItem
            isShadow
            image={item?.image}
            header={item?.header}
            title={item?.title}
            desc={item?.desc}
            tag={item?.tag}
            backgroundColor="#fff"
            onPress={() => {
              if (
                item?.type === 'FIAT' ||
                (item?.type === 'VOUCHER' && !dataParams?.isTour)
              ) {
                dataParams?.onGoBack(item);
                goBack();
              } else {
                showMess(t('comming_soon'), 'error', {
                  duration: 500,
                });
              }
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

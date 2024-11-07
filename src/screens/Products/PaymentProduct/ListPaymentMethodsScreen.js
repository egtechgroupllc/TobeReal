import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import PaymentMethodsItem from './components/ContentStep2/PaymentMethodsItem';
import {useLanguage} from '~/hooks/useLanguage';
import {COLORS, images} from '~/assets/constants';
import {showMess} from '~/assets/constants/Helper';
import {scale} from '~/utils/scale';
import {MainWrapper} from '~/components';
import {IconHome} from '~/assets/icon/Icon';

export default function ListPaymentMethodsScreen({route}) {
  const {t} = useLanguage();
  const listMethods = [
    {
      header: t('tobecare_wallet'),
      title: t('tobecare_transfer'),
      desc: t('pay_with_tobecare_wallet'),
      tag: t('recommended'),
      type: 'FIAT',
      image: images.logoSplash,
    },
    {
      header: 'Voucher',
      title: 'Voucher',
      desc: t('pay_with_voucher'),
      tag: t('recommended'),
      type: 'VOUCHER',
      image: images.voucher,
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
  const {setOptions, goBack, navigate} = useNavigation();
  const dataParams = route?.params;
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('select_payment_method'),
      headerTitleStyle: {
        textAlign: 'center',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      optionsHeader={{
        headerRight: () => (
          <TouchableOpacity onPress={() => navigate('BottomTab')}>
            <IconHome style={{width: scale(20)}} />
          </TouchableOpacity>
        ),
      }}>
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
            backgroundColor={COLORS.input}
            onPress={() => {
              // if (
              //   item?.type === 'FIAT' ||
              //   (item?.type === 'VOUCHER' && !dataParams?.isTour)
              // ) {
              //   dataParams?.onGoBack(item);
              //   goBack();
              // } else {
              //   showMess(t('comming_soon'), 'error', {
              //     duration: 500,
              //   });
              // }
              if (item?.type === 'FIAT' || item?.type === 'VOUCHER') {
                dataParams?.onGoBack(item);
                goBack();
                // if (item?.type === 'FIAT') {
                //   dataParams?.onGoBack(item);
                //   goBack();
              } else {
                showMess(t('comming_soon'), 'error', {
                  duration: 500,
                });
              }
            }}
          />
        )}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

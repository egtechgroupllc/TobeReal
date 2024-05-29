import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {COLORS, images, scale} from '../../assets/constants';
import PaymentMethodsItem from './components/BookingRoom/ContentStep2/PaymentMethodsItem';
import {showMess} from '../../assets/constants/Helper';
const listMethods = [
  {
    header: 'Tobe House Wallet',
    title: 'Tobe House Transfer',
    desc: 'Thanh toán bằng ví Tobe House',
    tag: 'Recommened',
    type: 'LOKAPAY',
    image: images.logo1,
  },
  {
    header: 'Payment card',
    title: 'Payment card',
    desc: 'Chấp nhận thanh toán từ tất cả ngân hàng',
    type: 'CARD',
    image: images.iconBank,
  },
  {
    header: 'PAYPAL',
    title: 'PAYPAL Transfer',
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

export default function ListPaymentMethodsScreen({route}) {
  const {setOptions, goBack} = useNavigation();
  const dataParams = route?.params;
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: 'Chọn phương thức thanh toán',
      headerTitleStyle: {
        textAlign: 'left',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={{backgroundColor: COLORS.grey}}>
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
            backgroundColor={COLORS.primary}
            onPress={() => {
              if (item?.type === 'LOKAPAY') {
                dataParams?.onGoBack(item);
                goBack();
              } else {
                showMess('Comming soon!', 'error', {
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

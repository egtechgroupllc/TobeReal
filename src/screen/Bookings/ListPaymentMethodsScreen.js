import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {scale} from '../../assets/constants';
import PaymentMethodsItem from './components/BookingRoom/ContentStep2/PaymentMethodsItem';
const listMethods = [
  {
    header: 'VietinBank Transfer',
    title: 'VietinBank Transfer',
    desc: 'Chấp nhận chuyển khoản từ tất cả ngân hàng',
    tag: 'NEW',
  },
  {
    header: 'Vietcombank Transfer',
    title: 'Vietcombank Transfer',
    desc: 'Chấp nhận chuyển khoản từ tất cả ngân hàng',
  },
  {
    header: 'MoMo E-Wallet',
    title: 'MoMo E-Wallet',
  },
  {
    header: 'QR Payment',
    title: 'VietQR',
    tag: 'Ưu đãi giảm gía',
  },
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
            header={item?.header}
            title={item?.title}
            desc={item?.desc}
            tag={item?.tag}
            backgroundColor="#fff"
            onPress={() => {
              dataParams?.onGoBack(item);
              goBack();
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

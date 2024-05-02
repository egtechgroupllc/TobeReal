import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomImage from '../../../../../components/CustomImage';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import CustomText from '../../../../../components/CustomText';
import {useQueryClient} from '@tanstack/react-query';
import {formatPrice} from '../../../../../utils/format';
import {useNavigation} from '@react-navigation/native';
import PaymentMethodsItem from './PaymentMethodsItem';

export default function PaymentMethods({data}) {
  const {navigate} = useNavigation();

  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData(['user', 'profile'])?.data;
  const [methodsPay, setMethodsPay] = useState();
  return (
    <View
      style={{
        padding: scale(20),
      }}>
      <View style={styles.methodsPay}>
        <CustomText
          textType="semiBold"
          color={COLORS.text}
          size={SIZES.xMedium}>
          Phuơng thức thanh toán
        </CustomText>
        <CustomText
          textType="bold"
          color={COLORS.blue}
          onPress={() =>
            navigate('ListPaymentMethodsScreen', {
              onGoBack: dataBack => {
                setMethodsPay(dataBack);
                console.log('ListPaymentMethodsScreen', dataBack);
              },
            })
          }>
          {methodsPay ? 'Xem tất cả' : 'Chọn'}
        </CustomText>
      </View>

      {methodsPay && (
        <PaymentMethodsItem
          title={methodsPay?.title}
          desc={` Balance: ${formatPrice(profile?.balance)}`}
          isDot
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  methodsPay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: scale(10),
  },
});

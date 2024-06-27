import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomImage from '../../../../../components/CustomImage';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import CustomText from '../../../../../components/CustomText';
import {useQueryClient} from '@tanstack/react-query';
import {formatPrice} from '../../../../../utils/format';
import {useNavigation} from '@react-navigation/native';
import PaymentMethodsItem from './PaymentMethodsItem';
import {useCountry} from '../../../../../hooks/useCountry';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function PaymentMethods({onChange}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();

  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData(['user', 'profile'])?.data;
  const [methodsPay, setMethodsPay] = useState(null);

  useEffect(() => {
    methodsPay && onChange && onChange(methodsPay);
  }, [onChange, methodsPay]);

  const {currency} = useCountry();
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
          {t('payment_method')}
        </CustomText>
        <CustomText
          textType="bold"
          color={COLORS.primary}
          onPress={() =>
            navigate('ListPaymentMethodsScreen', {
              onGoBack: dataBack => {
                setMethodsPay(dataBack);
              },
            })
          }>
          {methodsPay ? t('see_all') : t('select')}
        </CustomText>
      </View>

      {methodsPay && (
        <PaymentMethodsItem
          title={methodsPay?.title}
          desc={
            methodsPay?.type === 'FIAT' &&
            `${t('balance')}: ${formatPrice(
              profile?.balance * currency?.exchange_rate,
              {
                currency: currency?.currency_code,
              },
            )}`
          }
          isDot
          image={methodsPay?.image}
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

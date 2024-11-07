import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import PaymentMethodsItem from './PaymentMethodsItem';
import {useLanguage} from '~/hooks/useLanguage';
import {useCountry} from '~/hooks/useCountry';
import {scale} from '~/utils/scale';
import {CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import {formatPrice} from '~/utils/format';

export default function PaymentMethods({
  onChange,
  onChangeBalance,
  isTour,
  styleContent,
}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  const {currency} = useCountry();

  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData(['user', 'profile'])?.data;
  const [methodsPay, setMethodsPay] = useState(null);
  const balanceFiat = useMemo(
    () => profile?.balance * currency?.exchange_rate,
    [profile?.balance, currency?.exchange_rate],
  );
  useEffect(() => {
    methodsPay && onChange && onChange(methodsPay);
  }, [onChange, methodsPay]);
  useEffect(() => {
    balanceFiat && onChangeBalance && onChangeBalance(balanceFiat);
  }, [onChangeBalance, balanceFiat]);

  return (
    <View style={[styles.contain, styleContent]}>
      <View style={styles.methodsPay}>
        <CText textType="semiBold" color={COLORS.White} size={SIZES.xMedium}>
          {t('payment_method')}
        </CText>
        <CText
          textType="bold"
          color={COLORS.blue}
          onPress={() =>
            navigate('ListPaymentMethodsScreen', {
              onGoBack: dataBack => {
                setMethodsPay(dataBack);
              },
              isTour: isTour,
            })
          }>
          {methodsPay ? t('see_all') : t('select')}
        </CText>
      </View>

      {methodsPay && (
        <PaymentMethodsItem
          title={methodsPay?.title}
          desc={
            methodsPay?.type === 'FIAT' &&
            `${t('balance')}: ${formatPrice(balanceFiat, {
              currency: currency?.currency_code,
            })}`
          }
          isDot
          backgroundColor="transparent"
          image={methodsPay?.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    padding: scale(10),
    backgroundColor: COLORS.input,
    borderRadius: scale(10),
  },
  methodsPay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: scale(10),
  },
});

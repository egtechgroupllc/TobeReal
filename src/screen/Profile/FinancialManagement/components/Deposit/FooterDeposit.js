import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {CustomButton} from '../../../../../components';
import {IconPromotion} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import {formatPrice} from '../../../../../utils/format';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postInitOrderDeposit} from '../../../../../Model/api/auth';
import {showMess} from '../../../../../assets/constants/Helper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useCountry} from '../../../../../hooks/useCountry';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default (function FooterDeposit({handleSubmit, watch, typeAccountBank}) {
  const {navigate} = useNavigation();
  const queryClient = useQueryClient();

  const dataPro = queryClient.getQueryData(['user', 'profile'])?.data;

  const initOrderDepositMu = useMutation({
    mutationFn: postInitOrderDeposit,
  });
  const {currency} = useCountry();
  const {t} = useLanguage();
  const handleAlert = () => {
    if (!dataPro?.wallet_address) {
      Alert.alert(
        t('Notification'),
        t('Do you want import wallet and pay with voucher to get point free?'),
        [
          {
            text: t('import_wallet'),
            onPress: () =>
              navigate('NavigateWalletToken', {screen: 'AddressWalletScreen'}),
            // onPress: () => Alert.alert('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: t('No, deposit now!'),
            onPress: handleSubmit(handleInitOrder),
          },
        ],
      );
      return;
    } else {
      handleSubmit(handleInitOrder)();
    }
  };
  const handleInitOrder = value => {
    initOrderDepositMu.mutate(
      {
        ...value,
        currency_id: currency?.id,
      },
      {
        onSuccess: dataInside => {
          if (dataInside?.status) {
            navigate('ConfirmDepositScreen', {
              typeAccountBank,
              ...dataInside?.data,
            });
          }
        },
      },
    );
  };

  const {bottom} = useSafeAreaInsets();

  return (
    <View style={[styles.box, {paddingBottom: bottom + scale(10)}]}>
      <View
        style={{
          rowGap: scale(3),
        }}>
        <CustomText
          style={{
            fontSize: SIZES.xSmall,
            color: COLORS.text,
          }}>
          {t('total_amount')}:
        </CustomText>
        <CustomText
          textType="bold"
          style={{
            fontSize: SIZES.large,
          }}>
          {formatPrice(watch('amount') || 0, {
            currency: currency?.currency_code,
          })}
        </CustomText>
      </View>
      <CustomButton
        buttonType="normal"
        text={t('deposit')}
        iconLeft={IconPromotion}
        styleIcon={{
          color: COLORS.white,
        }}
        style={{
          minWidth: scale(130),
        }}
        onPress={handleAlert}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(20),
    paddingVertical: scale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    borderTopWidth: 2,
    borderTopColor: COLORS.primary,
  },
});

import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {postInitOrderDeposit} from '~/api/deposit';
import {getProfile} from '~/api/user';
import {COLORS, SIZES} from '~/assets/constants';
import {showMess} from '~/assets/constants/Helper';
import {IconPromotion} from '~/assets/icon/Icon';
import {Button, CText} from '~/components';
import {useCountry} from '~/hooks/useCountry';
import {useLanguage} from '~/hooks/useLanguage';
import {formatPrice} from '~/utils/format';
import {scale} from '~/utils/scale';
// import {postInitOrderDeposit} from '../../../../../Model/api/auth';

export default (function FooterDeposit({
  handleSubmit,
  watch,
  typeAccountBank,
  data,
}) {
  const {navigate} = useNavigation();
  const queryClient = useQueryClient();

  const dataPro = queryClient.getQueryData([...getProfile.queryKey])?.data;

  const initOrderDepositMu = useMutation({
    mutationFn: postInitOrderDeposit,
  });
  const {currency} = useCountry();
  const {t} = useLanguage();
  const handleAlert = () => {
    if (!dataPro?.wallet_address) {
      Alert.alert(
        t('notification'),
        t('do_you_want_import_wallet_and_pay_with_voucher_to_get_point_free'),
        [
          {
            text: t('import_wallet'),
            onPress: () => navigate('AddressWalletScreen'),
            // onPress: () => Alert.alert('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: t('no_deposit_now'),
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
        method_deposit_item_id: data?.id,
        currency_id: currency?.id,
      },
      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            dataInside?.error ? 'error' : 'success',
          );
          if (!dataInside?.error) {
            navigate('ConfirmDepositScreen', {
              typeAccountBank,
              ...dataInside?.data,
            });
          }
        },
        onError: err => {
          if (err.response) {
            showMess(err?.response?.data?.message, 'error');
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
        <CText
          style={{
            fontSize: SIZES.xSmall,
            color: COLORS.text,
          }}>
          {t('total_amount')}:
        </CText>
        <CText
          textType="bold"
          style={{
            fontSize: SIZES.large,
          }}>
          {formatPrice(watch('amount') || 0, {
            currency: currency?.currency_code,
          })}
        </CText>
      </View>
      <Button
        buttonType="normal"
        title={t('deposit')}
        iconLeft={IconPromotion}
        styleIcon={{
          color: COLORS.White,
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
    backgroundColor: COLORS.White,
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

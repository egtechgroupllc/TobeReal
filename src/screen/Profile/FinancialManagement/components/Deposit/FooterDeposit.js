import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {CustomButton} from '../../../../../components';
import {IconPromotion} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import {formatPrice} from '../../../../../utils/format';
import {useMutation} from '@tanstack/react-query';
import {postInitOrderDeposit} from '../../../../../Model/api/auth';
import {showMess} from '../../../../../assets/constants/Helper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useCountry} from '../../../../../hooks/useCountry';

export default (function FooterDeposit({handleSubmit, watch, typeAccountBank}) {
  const {navigate} = useNavigation();
  const initOrderDepositMu = useMutation({
    mutationFn: postInitOrderDeposit,
  });
  const {currency} = useCountry();
  const handleInitOrder = value => {
    initOrderDepositMu.mutate(
      {
        ...value,
        currency_id: 1,
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
          Tổng tiền:
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
        text="Nạp Ngay"
        iconLeft={IconPromotion}
        styleIcon={{
          color: COLORS.white,
        }}
        style={{
          minWidth: scale(130),
        }}
        onPress={handleSubmit(handleInitOrder)}
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

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {CustomButton} from '../../../../components';
import {IconPromotion} from '../../../../assets/icon/Icon';
import CustomText from '../../../../components/CustomText';
import {formatPrice} from '../../../../utils/format';
import {useMutation} from '@tanstack/react-query';
import {postInitOrderDeposit} from '../../../../Model/api/auth';
import {showMess} from '../../../../assets/constants/Helper';

export default function FooterDeposit({handleSubmit, watch}) {
  const initOrderDepositMu = useMutation({
    mutationFn: postInitOrderDeposit,
  });

  const handleInitOrder = value => {
    initOrderDepositMu.mutate(
      {
        ...value,
      },
      {
        onSuccess: dataInside => {
          console.log({dataInside});
          showMess(
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );
        },
      },
    );
  };

  return (
    <View style={styles.box}>
      <View
        style={{
          rowGap: scale(3),
        }}>
        <CustomText
          style={{
            fontSize: SIZES.xSmall,
            color: COLORS.text,
          }}>
          Tông tiền:
        </CustomText>
        <CustomText
          textType="bold"
          style={{
            fontSize: SIZES.large,
          }}>
          {formatPrice(watch('amount'))}
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
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

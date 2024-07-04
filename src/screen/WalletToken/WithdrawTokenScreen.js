import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '../../hooks/useLanguage';
import {
  CustomButton,
  CustomImage,
  CustomInput,
  CustomText,
  MainWrapper,
} from '../../components';
import {formatPrice} from '../../utils/format';
import {COLORS, SHADOW, SIZES, images, scale} from '../../assets/constants';
import {IconWallet} from '../../assets/icon/Icon';
import {useForm} from 'react-hook-form';
import {requireField} from '../../utils/validate';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postWithdrawToken} from '../../Model/api/auth';
import {showMess} from '../../assets/constants/Helper';

export default function WithdrawTokenScreen() {
  const {setOptions, goBack} = useNavigation();
  const {t} = useLanguage();
  const data = useRoute().params;
  const {control, handleSubmit} = useForm({});
  useLayoutEffect(() => {
    setOptions({
      headerTitle: t('withdraw_point_voucher'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const queryClient = useQueryClient();

  const withdrawMutation = useMutation({
    mutationFn: postWithdrawToken,
  });
  const handleWidraw = value => {
    withdrawMutation.mutate(value, {
      onSuccess: dataInside => {
        showMess(dataInside?.message, dataInside?.status ? 'success' : 'error');
        if (dataInside?.status) {
          queryClient.invalidateQueries(['user', 'profile']);
          goBack();
        }
      },
    });
  };
  return (
    <MainWrapper
      styleContent={{
        paddingHorizontal: scale(10),
        paddingVertical: scale(20),
        rowGap: scale(20),
      }}>
      <View style={styles.box}>
        <View style={styles.wallet}>
          <IconWallet />
          <CustomText
            textType="bold"
            numberOfLines={1}
            style={{color: COLORS.primary, fontSize: SIZES.xMedium}}>
            {formatPrice(data?.balance_token_data, {
              showCurrency: false,
              decimalPlaces: 6,
            })}{' '}
            TBH
          </CustomText>
        </View>
        <View style={styles.icon}>
          <CustomImage
            isAvatar
            source={images.logoTBH}
            style={{
              height: scale(120),
              aspectRatio: 1,
            }}
            resizeMode="contain"
          />
        </View>
        <CustomInput
          maxLength={15}
          label={t('enter_amount_token')}
          styleTextLabel={{fontSize: SIZES.xMedium}}
          style={{...styles.boxItem, borderWidth: 0}}
          styleWrapper={{paddingVertical: scale(10)}}
          control={control}
          name="amount"
          placeholder={t('enter_amount_you_want_withdraw')}
          rules={[requireField(t('this_field_required'))]}
        />
        <CustomButton
          onPress={handleSubmit(handleWidraw)}
          text={t('confirm')}
          styleWrapper={{alignSelf: 'center'}}
          style={{width: '50%'}}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: scale(10),
    rowGap: scale(10),
  },
  wallet: {
    marginBottom: scale(20),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    columnGap: scale(5),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    flexDirection: 'row',
    right: scale(10),
    backgroundColor: COLORS.white,
    minHeight: scale(40),
    minWidth: scale(90),
    borderRadius: scale(10),
    ...SHADOW,
  },
  boxItem: {
    width: '100%',
    minHeight: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
    paddingVertical: scale(10),
    // ...SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: scale(6),
    columnGap: scale(14),
    backgroundColor: COLORS.grey50,
  },
  icon: {
    height: scale(140),
    width: scale(140),
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(99),
    alignSelf: 'center',
  },
});

import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '../../hooks/useLanguage';
import {CustomButton, CustomText, MainWrapper} from '../../components';
import QRCode from 'react-native-qrcode-svg';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import Clipboard from '@react-native-clipboard/clipboard';
import {showMess} from '../../assets/constants/Helper';
import {IconError} from '../../assets/icon/Icon';

export default function DepositTokenScreen() {
  const params = useRoute().params;
  console.log(params);
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();
  const [secondEnd, setSecondEnd] = useState(false);
  useLayoutEffect(() => {
    setOptions({
      headerTitle: `${t('receive')} ${params?.unit}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCopy = () => {
    Clipboard.setString(params?.data?.wallet_address);
    showMess(t('copy_success'));
  };
  return (
    <MainWrapper>
      <View style={styles.content}>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: scale(20),
            borderRadius: scale(10),
            ...SHADOW,
          }}>
          <View
            style={{
              padding: !params?.data?.wallet_address ? scale(60) : scale(0),
              opacity: secondEnd ? 0.3 : 1,
            }}>
            {params?.data?.wallet_address ? (
              <QRCode
                size={scale(180)}
                value={JSON.stringify(params?.data?.wallet_address)}
                color="#000"
              />
            ) : (
              <ActivityIndicator color={COLORS.primary} size="large" />
            )}
          </View>
        </View>
        <CustomText
          numberOfLines={2}
          textType="medium"
          style={{width: scale(350), textAlign: 'center'}}>
          {params?.data?.wallet_address}
        </CustomText>
        <CustomButton
          text={t('copy')}
          styleWrapper={{width: '50%', marginTop: scale(20)}}
          onPress={handleCopy}
        />
        <CustomText
          numberOfLines={2}
          textType="medium"
          style={{
            textAlign: 'center',
            marginTop: scale(20),
            fontSize: SIZES.medium,
          }}>
          {t('deposit_fee')}: 0
        </CustomText>
        <CustomText
          style={{
            width: scale(320),
            marginTop: scale(30),
          }}>
          <IconError size={scale(12)} fill={COLORS.primary} />{' '}
          {t('this_deposit_address')}
          <CustomText textType="semiBold"> TBH.TBRC20, </CustomText>
          {t('dont_deposit_other')}.
        </CustomText>
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: scale(30),
    alignItems: 'center',
    rowGap: scale(10),
  },
});

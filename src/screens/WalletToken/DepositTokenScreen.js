import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import {useLanguage} from '~/hooks/useLanguage';
import {IconError, IconHome} from '~/assets/icon/Icon';
import {scale} from '~/utils/scale';
import {showMess} from '~/assets/constants/Helper';
import {Button, CText, MainWrapper} from '~/components';
import {COLORS, images, SHADOW, SIZES} from '~/assets/constants';

export default function DepositTokenScreen() {
  const params = useRoute().params;
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();
  const [secondEnd, setSecondEnd] = useState(false);
  useLayoutEffect(() => {
    setOptions({
      headerTitle: `${t('receive')} ${params?.listToken?.unit}`,
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('BottomTab')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCopy = () => {
    Clipboard.setString(params?.data?.wallet_address);
    showMess(t('copy_success'));
  };
  return (
    <MainWrapper sourceImage={images.backgroundHome}>
      <View style={styles.content}>
        <View
          style={{
            backgroundColor: COLORS.White,
            padding: scale(20),
            borderRadius: scale(10),
            ...SHADOW,
          }}>
          <View
            style={{
              padding: !params?.data?.wallet ? scale(60) : scale(0),
              opacity: secondEnd ? 0.3 : 1,
            }}>
            {params?.data?.address_wallet ? (
              <QRCode
                size={scale(180)}
                value={JSON.stringify(params?.data?.wallet)}
                color="#000"
              />
            ) : (
              <ActivityIndicator color={COLORS.primary} size="large" />
            )}
          </View>
        </View>
        <CText
          numberOfLines={2}
          textType="medium"
          style={{width: scale(350), textAlign: 'center', color: COLORS.White}}>
          {params?.data?.wallet}
        </CText>
        <View style={{width: '50%', marginTop: scale(20)}}>
          <Button
            title={t('copy')}
            onPress={handleCopy}
            linearGradientProps={{colors: COLORS.linearButton}}
          />
        </View>
        <CText
          numberOfLines={2}
          textType="medium"
          style={{
            color: COLORS.White,
            textAlign: 'center',
            marginTop: scale(20),
            fontSize: SIZES.medium,
          }}>
          {t('deposit_fee')}: 0
        </CText>
        <CText
          style={{
            width: scale(320),
            marginTop: scale(30),
            color: COLORS.White,
          }}>
          <IconError size={scale(12)} fill={COLORS.error} />{' '}
          {t('this_deposit_address')}
          <CText textType="semiBold" style={{color: COLORS.White}}>
            {' '}
            TBH.TBRC20,{' '}
          </CText>
          {t('dont_deposit_other')}.
        </CText>
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

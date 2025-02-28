import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import {
  CustomButton,
  CustomImage,
  CustomText,
  MainWrapper,
} from '../../components';
import {useLanguage} from '../../hooks/useLanguage';
import EmptyData from '../../components/EmptyData';
import {IconHome} from '../../assets/icon/Icon';
import {formatPrice} from '../../utils/format';

export default function DetailTokenScreen() {
  const params = useRoute().params;
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();
  useLayoutEffect(() => {
    setOptions({
      headerTitle: params?.listToken?.name,
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('BottomTab')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      <MainWrapper>
        <View
          style={{
            alignItems: 'center',
            marginTop: scale(80),
            rowGap: scale(10),
            flex: 1,
          }}>
          <View style={styles.icon}>
            <CustomImage
              isAvatar
              source={{uri: params?.listToken?.image_url}}
              style={{
                width: scale(70),
                aspectRatio: 1,
              }}
              resizeMode="contain"
            />
          </View>
          <CustomText style={{fontSize: SIZES.large}} textType="medium">
            {formatPrice(params?.listToken?.balance, {
              showCurrency: false,
              decimalPlaces: 6,
            })}{' '}
            {params?.listToken?.symbol}
          </CustomText>
          <View
            style={{
              marginTop: scale(30),
              width: '100%',
              height: scale(1),
              backgroundColor: COLORS.grey,
            }}
          />
          <View style={{marginTop: scale(50), alignItems: 'center'}}>
            <CustomText>{t('history_transaction_appear_here')}.</CustomText>
            <EmptyData styleWrapper={{flex: 0}} />
          </View>
        </View>
      </MainWrapper>
      <View
        style={{
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderColor: COLORS.pioBox,
        }}>
        <View
          style={{
            height: scale(120),
            ...SHADOW,
            paddingTop: scale(10),
            flexDirection: 'row',
            paddingHorizontal: scale(20),
            columnGap: scale(20),
            alignItems: 'center',
            paddingBottom: scale(30),
            justifyContent: 'center',
          }}>
          {(params?.listToken?.symbol === 'USDP' ||
            params?.listToken?.symbol === 'PZO') && (
            <CustomButton
              styleWrapper={{flex: 1}}
              text={t('faucet_now')}
              onPress={() =>
                Linking.openURL('https://dex.pionechain.com/testnet/faucet')
              }
            />
          )}
          <CustomButton
            text="Deposit"
            styleWrapper={{
              flex:
                params?.listToken?.symbol === 'USDP' ||
                params?.listToken?.symbol === 'PZO'
                  ? 1
                  : 0.7,
            }}
            onPress={() =>
              navigate('NoBottomTab', {
                screen: 'DepositTokenScreen',
                params: params,
              })
            }
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: scale(80),
    width: scale(80),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.pioBox,
    ...SHADOW,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(99),
  },
});

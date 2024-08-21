import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useMemo, useState} from 'react';
import {useAuthentication} from '../../hooks/useAuthentication';
import {useLanguage} from '../../hooks/useLanguage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {IconHome} from '../../assets/icon/Icon';
import {
  CustomButton,
  CustomImage,
  CustomText,
  MainWrapper,
} from '../../components';
import {COLORS, SIZES, images, scale} from '../../assets/constants';
import {getBalanceWallet} from '../../Model/api/wallet';
import {getDailyCheckinInfo, postDailyCheckin} from '../../Model/api/auth';
import {showMess} from '../../assets/constants/Helper';

export default function DailyCheckinScreen() {
  const {token} = useAuthentication();
  const params = useRoute().params;
  const {t} = useLanguage();
  const {navigate, setOptions, goBack} = useNavigation();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  const dataP = queryClient.getQueryData(['user', 'profile'])?.data;
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('daily_checkin'),
    });
  }, []);
  const {
    data: dataCheckin,
    error,
    isError,
  } = useQuery({
    queryKey: ['check-in-daily', 'info'],
    queryFn: () => getDailyCheckinInfo(),
  });

  const checkinMutation = useMutation({
    mutationFn: postDailyCheckin,
  });
  // const {data: params} = useQuery({
  //   queryKey: ['check-in-daily', 'info', token],
  //   queryFn: () => getDailyCheckinInfo(token),
  // });
  const handleCheckin = value => {
    checkinMutation.mutate(
      {token: token},
      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            dataInside?.status ? 'success' : 'error',
          );
          if (dataInside?.status) {
            queryClient.invalidateQueries(['check-in-daily', 'info']);
            goBack();
          }
        },
        onError: err => {
          console.log(err);
          showMess(t('an_error_occured'), 'error');
        },
      },
    );
  };
  return (
    <MainWrapper
      scrollEnabled={false}
      styleContent={{
        alignItems: 'center',
        marginTop: scale(80),
        rowGap: scale(20),
      }}>
      <CustomImage
        source={images.iconGift}
        style={{width: scale(100), height: scale(100)}}
      />
      <CustomText
        style={{
          fontSize: SIZES.xMedium,
          width: scale(300),
          textAlign: 'center',
        }}>
        {t('congratulate_on_receiving_daily_reward')}
      </CustomText>
      <CustomText
        textType="semiBold"
        style={{
          fontSize: SIZES.xMedium,
          width: scale(200),
          textAlign: 'center',
        }}>
        + {dataCheckin?.data?.amount} TOBE AIRDROP (TBC)
      </CustomText>
      {!dataP?.wallet_address ? (
        <View style={{rowGap: scale(50), alignItems: 'center', width: '70%'}}>
          <CustomText
            style={{
              fontSize: SIZES.small,
              textAlign: 'center',
            }}>
            {t('please_create_wallet_to_received_reward')}!
          </CustomText>
          <CustomButton
            text={t('create_wallet')}
            styleWrapper={{width: '100%'}}
            onPress={() =>
              navigate('NavigateWalletToken', {screen: 'AddressWalletScreen'})
            }
          />
        </View>
      ) : (
        <>
          {params?.amountTOBE?.balance >= 0.1 ? (
            <CustomButton
              text={
                dataCheckin?.data?.can_check_in
                  ? t('receive_now')
                  : t('received')
              }
              styleWrapper={{width: '70%'}}
              style={{
                backgroundColor: dataCheckin?.data?.can_check_in
                  ? COLORS.primary
                  : COLORS.grey,
              }}
              disabled={dataCheckin?.data?.can_check_in ? false : true}
              onPress={handleCheckin}
            />
          ) : (
            <View
              style={{alignItems: 'center', rowGap: scale(10), width: '70%'}}>
              <CustomText
                style={{
                  fontSize: SIZES.small,
                  width: scale(300),
                  textAlign: 'center',
                }}>
                {t('your_balance_fee_gas_not_enough')}
              </CustomText>
              <CustomButton
                text={t('Faucet now')}
                styleWrapper={{width: '100%'}}
                onPress={() =>
                  Linking.openURL('https://faucet.tobescan.com/faucet')
                }
              />
            </View>
          )}
        </>
      )}
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

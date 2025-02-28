import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useMemo, useState} from 'react';
import {useAuthentication} from '../../hooks/useAuthentication';
import {useLanguage} from '../../hooks/useLanguage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {IconHome} from '../../assets/icon/Icon';
import {
  CheckBox,
  CustomButton,
  CustomImage,
  CustomText,
  MainWrapper,
} from '../../components';
import {COLORS, SIZES, images, scale} from '../../assets/constants';
import {getBalanceWallet, getStatusTask} from '../../Model/api/wallet';
import {
  getDailyCheckinInfo,
  postCallContractCheckin,
  postDailyCheckin,
} from '../../Model/api/auth';
import {showMess} from '../../assets/constants/Helper';
import {getTokenAirdrop} from '../../Model/api/common';

export default function DailyCheckinScreen() {
  const {token} = useAuthentication();
  const params = useRoute().params;
  const {t} = useLanguage();
  const {navigate, setOptions, goBack} = useNavigation();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [checkTask, setCheckTask] = useState({
    id: 1,
    title: t('create_real_estate_rental_listing'),
    screen: 'PostNewLeaseScreen',
  });
  const dataP = queryClient.getQueryData(['user', 'profile'])?.data;
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('daily_checkin'),
    });
  }, []);

  const {data: getDataToken, error} = useQuery({
    queryKey: ['common', 'token-airdrop'],
    queryFn: () => getTokenAirdrop(),
  });

  // const callContractMutation = useMutation({
  //   mutationFn: postCallContractCheckin,
  // });

  // const handleCallContractCheckin = () => {
  //   callContractMutation.mutate(
  //     {
  //       data: {
  //         type: 'WRITE',
  //         name: 'checkIn',
  //         params: [],
  //       },
  //     },
  //     {
  //       onSuccess: dataInside => {
  //         if (dataInside?.status) {
  //           showMess(
  //             t(dataInside?.message),
  //             dataInside?.status ? 'success' : 'error',
  //           );
  //           // showMess(
  //           //   t(dataInside?.message),
  //           //   dataInside?.status ? 'success' : 'error',
  //           // );
  //           // setOpen(false);
  //         }
  //       },
  //       onError: err => {
  //         console.log(err);
  //         showMess(t('an_error_occured'), 'error');
  //       },
  //     },
  //   );
  // };
  const dataTask = [
    {
      id: 1,
      title: t('create_real_estate_rental_listing'),
      screen: 'PostNewLeaseScreen',
    },
    {
      id: 2,
      title: t('create_real_estate_sale_listing'),
      screen: 'PostNewSellScreen',
    },
    {
      id: 3,
      title: t('create_tour_listing'),
      screen: 'PostNewTourScreen',
    },
  ];

  return (
    <MainWrapper
      scrollEnabled={false}
      styleContent={{
        marginTop: scale(50),
      }}>
      {!params?.dataStatusTask?.data?.is_received_airdrop_today ? (
        <View
          style={{
            rowGap: scale(20),
            paddingHorizontal: scale(20),
          }}>
          <CustomImage
            source={images.iconGift}
            style={{width: scale(100), height: scale(100), alignSelf: 'center'}}
          />
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
              textAlign: 'center',
            }}>
            {t('complete_the_daily_tasks', {
              unit: `(${getDataToken?.data?.symbol})`,
            })}
          </CustomText>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.grey,
              padding: scale(10),
              rowGap: scale(15),
              borderRadius: scale(10),
            }}>
            {dataTask?.map((item, index) => {
              return (
                <View key={index}>
                  <CheckBox
                    key={index}
                    textBold
                    isRadio
                    text={item?.title}
                    isChecked={item?.id === checkTask?.id}
                    onPress={() => setCheckTask(item)}
                    textStyle={{
                      fontSize: SIZES.xMedium,
                    }}
                  />
                </View>
              );
            })}
          </View>
          <CustomText
            style={{
              fontSize: SIZES.small,
            }}>
            *{t('note')}:{' '}
            {t('officially_redeemable_after_airdrop', {
              unit: `${getDataToken?.data?.name} (${getDataToken?.data?.symbol}.ZORC20)`,
            })}
          </CustomText>
          <CustomButton
            styleWrapper={{marginTop: scale(20)}}
            text={t('complete_task')}
            onPress={() => {
              if (dataP?.role_id === 2 || dataP?.role_id === undefined) {
                navigate('NavigationAuth', {
                  screen: 'RegisterPartnerScreen',
                });
                showMess(t('please_become_partner'), 'error');
              } else {
                navigate('NoBottomTab', {screen: checkTask?.screen});
              }
            }}
          />
        </View>
      ) : (
        <View
          style={{
            rowGap: scale(20),
            paddingHorizontal: scale(30),
          }}>
          <CustomImage
            source={images.iconGift}
            style={{
              width: scale(120),
              height: scale(120),
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
              textAlign: 'center',
            }}>
            {t('congratulations_reward_today')}
          </CustomText>
        </View>
      )}
      {/* <CustomText
        textType="semiBold"
        style={{
          fontSize: SIZES.xMedium,
          width: scale(200),
          textAlign: 'center',
        }}>
        + {params?.dataCheckin?.userRewards?.point} {getDataToken?.data?.name} (
        {getDataToken?.data?.symbol})
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
          {params?.amountPione?.balance >= 0.1 ? (
            <CustomButton
              text={
                params?.dataCheckin?.isCanCheckIn
                  ? t('receive_now')
                  : t('received')
              }
              styleWrapper={{width: '70%'}}
              style={{
                backgroundColor: params?.dataCheckin?.isCanCheckIn
                  ? COLORS.pioPrimary
                  : COLORS.grey,
              }}
              disabled={params?.dataCheckin?.isCanCheckIn ? false : true}
              onPress={handleCallContractCheckin}
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
                {t('your_balance_fee_gas_not_enough', {unit: 'PZO'})}
              </CustomText>
              <CustomButton
                text={t('Faucet now')}
                styleWrapper={{width: '100%'}}
                onPress={() =>
                  Linking.openURL('https://faucet.zeroscan.org/faucet')
                }
              />
            </View>
          )}
        </>
      )} */}
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

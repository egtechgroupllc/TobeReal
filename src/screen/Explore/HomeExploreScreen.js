import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useMemo, useState} from 'react';
import {instanceAccom} from '../../Model/api/apiAccom';
import {getListConstant, getProfile} from '../../Model/api/common';
import MainWrapper from '../../components/MainWrapper';
import {useAuthentication} from '../../hooks/useAuthentication';
import FindAccommodation from './components/FindAccommodation/FindAccommodation';
import Header from './components/Header';
import {StyleSheet, View} from 'react-native';

import {COLORS, SIZES, images, scale} from '../../assets/constants';
import LinearGradient from 'react-native-linear-gradient';
import {IconSupporterYellow} from '../../assets/icon/Icon';
import {CustomButton, CustomImage, CustomText} from '../../components';
import {useLanguage} from '../../hooks/useLanguage';
import ModalGift from './components/ModalGift';
import {getDailyCheckinInfo, postDailyCheckin} from '../../Model/api/auth';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {formatDate} from '../../utils/format';
import {showMess} from '../../assets/constants/Helper';
import {getBalanceWallet} from '../../Model/api/wallet';

export default function HomeExploreScreen() {
  const {token} = useAuthentication();
  const [open, setOpen] = useState(true);
  const {t} = useLanguage();

  const [dateSkip, setDateSkip] = useState(false);
  const {navigate} = useNavigation();
  const today = formatDate(new Date());
  const queryClient = useQueryClient();

  const {isLoading, data, isPending} = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => getProfile(token),
    enabled: !!token,
  });
  const {data: dataWallet} = useQuery({
    queryKey: ['user', 'wallet', 'balance', token],
    queryFn: () => getBalanceWallet(token),
    enabled: !!token,
  });
  const amountTOBE = useMemo(
    () => dataWallet?.data?.find(item => item?.symbol === 'TOBE'),
    [dataWallet?.data],
  );

  const {
    data: dataCheckin,
    error,
    isError,
  } = useQuery({
    queryKey: ['check-in-daily', 'info'],
    queryFn: () => getDailyCheckinInfo(),
    enabled: !!token,
  });

  const checkinMutation = useMutation({
    mutationFn: postDailyCheckin,
  });
  const handleCheckin = value => {
    checkinMutation.mutate(
      {token: token},
      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            dataInside?.status ? 'success' : 'error',
          );
          setOpen(false);
        },
        onError: err => {
          console.log(err);
          showMess(t('an_error_occured'), 'error');
        },
      },
    );
  };
  const onSavedSkip = async () => {
    await EncryptedStorage.setItem(
      '@save_skip',
      JSON.stringify({
        dateSkip: today,
        state: true,
        username: data?.data?.username,
      }),
    );
  };

  const onRemoveSkip = async () => {
    const result = await EncryptedStorage.getItem('@save_skip');
    const arrSkip = result ? JSON.parse(result) : [];
    if (arrSkip?.state) {
      setDateSkip(true);
    }

    if (
      arrSkip?.dateSkip < today ||
      (data?.data?.username && data?.data?.username !== arrSkip?.username)
    ) {
      await EncryptedStorage.removeItem('@save_skip');
      return;
    }
    return;
  };
  useEffect(() => {
    onRemoveSkip();
  }, [data?.data?.username]);

  return (
    <MainWrapper refreshControl scrollEnabled={false}>
      <Header dataCheckin={dataCheckin} dataP={data} amountTOBE={amountTOBE} />
      <FindAccommodation />
      {(dataCheckin?.data?.can_check_in || !data?.data?.wallet_address) &&
        !isLoading &&
        token &&
        !dateSkip && (
          <ModalGift
            amountTOBE={amountTOBE}
            open={open}
            dataP={data}
            dataCheckin={dataCheckin}
            onPressCancel={() => {
              onSavedSkip();
              setOpen(false);
            }}
            onPressReceive={handleCheckin}
            onPressWallet={() => {
              setOpen(false);
              navigate('NavigateWalletToken', {screen: 'AddressWalletScreen'});
            }}
          />
        )}
    </MainWrapper>
  );
}

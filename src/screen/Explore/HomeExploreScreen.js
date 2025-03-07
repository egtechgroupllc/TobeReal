import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useMemo, useState} from 'react';
import {instanceAccom} from '../../Model/api/apiAccom';
import {getListConstant, getProfile} from '../../Model/api/common';
import MainWrapper from '../../components/MainWrapper';
import {useAuthentication} from '../../hooks/useAuthentication';
import FindAccommodation from './components/FindAccommodation/FindAccommodation';
import Header from './components/Header';
import {Platform, StyleSheet, View} from 'react-native';

import {COLORS, SIZES, images, scale} from '../../assets/constants';
import LinearGradient from 'react-native-linear-gradient';
import {IconSupporterYellow} from '../../assets/icon/Icon';
import {CustomButton, CustomImage, CustomText} from '../../components';
import {useLanguage} from '../../hooks/useLanguage';
import ModalGift from './components/ModalGift';
import {
  getDailyCheckinInfo,
  postCallContractCheckin,
  postDailyCheckin,
  postRegisterCheckin,
} from '../../Model/api/auth';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {formatDate} from '../../utils/format';
import {showMess} from '../../assets/constants/Helper';
import {getBalanceWallet, getStatusTask} from '../../Model/api/wallet';
import {getBanner} from '../../Model/api/banner';
import {storage} from '../../utils/MMKVStorage';
import SliderContent from './components/SliderContent';

export default function HomeExploreScreen() {
  const {token} = useAuthentication();
  const [open, setOpen] = useState(true);
  const {t} = useLanguage();

  const [dateSkip, setDateSkip] = useState(false);
  const [isCanCheckIn, setIsCanCheckIn] = useState(false);
  const [userRewards, setUserRewards] = useState(null);

  const {navigate} = useNavigation();
  const today = formatDate(new Date());
  const queryClient = useQueryClient();

  const {isLoading, data, isPending} = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => getProfile(token),
    enabled: !!token,
  });
  const {data: dataWallet} = useQuery({
    queryKey: ['user', 'wallet', 'balance'],
    queryFn: () => getBalanceWallet(),
    enabled: !!token,
  });
  const amountPione = useMemo(
    () => dataWallet?.data?.find(item => item?.symbol === 'PZO'),
    [dataWallet?.data],
  );
  const callContractMutation = useMutation({
    mutationFn: postCallContractCheckin,
  });
  const registerCheckinMutation = useMutation({
    mutationFn: postRegisterCheckin,
  });
  // const handleRegisterCheckin = value => {
  //   registerCheckinMutation.mutate({
  //     onSuccess: dataInside => {
  //       handleCallContractCheckin('canCheckIn');
  //       // setOpen(false);
  //     },
  //     onError: err => {
  //       console.log(err);
  //       // showMess(t('an_error_occured'), 'error');
  //     },
  //   });
  // };

  // const handleCallContractCheckin = (nameContract, typeContract = 'READ') => {
  //   callContractMutation.mutate(
  //     {
  //       data: {
  //         type: typeContract,
  //         name: nameContract,
  //         params: [data?.data?.wallet_address],
  //       },
  //     },
  //     {
  //       onSuccess: dataInside => {
  //         if (dataInside?.status) {
  //           if (nameContract === 'userRewards') {
  //             !dataInside?.isActive
  //               ? handleRegisterCheckin()
  //               : handleCallContractCheckin('canCheckIn');
  //             setUserRewards(dataInside);
  //           } else if (nameContract === 'canCheckIn') {
  //             setIsCanCheckIn(dataInside?.data);
  //           } else if (typeContract === 'WRITE') {
  //             showMess(
  //               t(dataInside?.message),
  //               dataInside?.status ? 'success' : 'error',
  //             );
  //           }
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
  // useEffect(() => {
  //   if (data?.data?.wallet_address) {
  //     handleCallContractCheckin('userRewards');
  //   }
  // }, [data?.data?.wallet_address]);

  const onSavedSkip = async () => {
    await storage.set(
      '@save_skip',
      JSON.stringify({
        dateSkip: today,
        state: true,
        username: data?.data?.username,
      }),
    );
  };

  const onRemoveSkip = async () => {
    try {
      const result = await storage.getString('@save_skip');
      const arrSkip = result ? JSON.parse(result) : {};

      if (arrSkip?.state) {
        setDateSkip(true);
      }

      if (
        arrSkip?.dateSkip < today ||
        (data?.data?.username && data?.data?.username !== arrSkip?.username)
      ) {
        await storage.delete('@save_skip');
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    onRemoveSkip();
  }, [data?.data?.username]);

  const {data: dataStatusTask, error: errorStatusTask} = useQuery({
    queryKey: ['common', 'status-task'],
    queryFn: () => getStatusTask(),
    enabled: !!token,
  });

  return (
    <MainWrapper refreshControl scrollEnabled={false}>
      <Header
        // dataCheckin={{userRewards, isCanCheckIn}}
        dataStatusTask={dataStatusTask}
        dataP={data}
        amountPione={amountPione}
      />

      <FindAccommodation />
      {/* {(isCanCheckIn || !data?.data?.wallet_address) &&
        !isLoading &&
        token &&
        !dateSkip && (
          <ModalGift
            amountPione={amountPione}
            open={open}
            dataP={data}
            dataCheckin={{userRewards, isCanCheckIn}}
            onPressCancel={() => {
              onSavedSkip();
              setOpen(false);
            }}
            onPressReceive={() => handleCallContractCheckin('checkIn', 'WRITE')}
            onPressWallet={() => {
              setOpen(false);
              navigate('NavigateWalletToken', {screen: 'AddressWalletScreen'});
            }}
          />
        )} */}
    </MainWrapper>
  );
}

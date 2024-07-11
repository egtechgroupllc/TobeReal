import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getProfile} from '../../Model/api/common';
import {postCreateWallet} from '../../Model/api/wallet';
import {COLORS, images, scale} from '../../assets/constants';
import {showMess} from '../../assets/constants/Helper';
import {
  IconAdd,
  IconHelp,
  IconMenu,
  IconSearch,
  IconWallet,
} from '../../assets/icon/Icon';
import {
  CustomButton,
  CustomImage,
  CustomText,
  MainWrapper,
} from '../../components';
import {useAuthentication} from '../../hooks/useAuthentication';
import BoxWalletBlockChain from './AddressWallet/BoxWalletBlockChain';
import ListToken from './components/ListToken';
import MenuImportAddressWallet from './components/MenuImportAddressWallet';
import {useLanguage} from '../../hooks/useLanguage';
import WalletManage from './components/WalletManage';
import MenuAddressWallet from './AddressWallet/MenuAddressWallet';
import HelpCenterTokenScreen from './HelpCenterTokenScreen';
import BottomHelpCenter from './components/BottomHelpCenter';
import {CopilotStep, useCopilot, walkthroughable} from 'react-native-copilot';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide';
export default function WalletTokenScreen() {
  const {setOptions, navigate} = useNavigation();
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter,
  } = useTourGuideController();
  const [stopGuide, setStopGuide] = useState(false);
  const CopilotText = walkthroughable(Text);
  const CopilotView = walkthroughable(View);

  const {t} = useLanguage();
  const [check, setCheck] = useState(false);

  const queryClient = useQueryClient();

  const {token} = useAuthentication();

  const {isLoading, data} = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => getProfile(token),
    enabled: !!token,
  });

  const postCreateWalletMu = useMutation({
    mutationFn: postCreateWallet,
  });

  const createWallet = () => {
    postCreateWalletMu.mutate(
      {},
      {
        onSuccess: dataInside => {
          showMess(
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            queryClient.invalidateQueries(['user', 'profile']);
            navigate('ShowPrivateKeyAndSecretPhrase');
          }
        },
      },
    );
  };

  // useEffect(() => {
  //   if (!currentStep && check) {
  //     start();
  //   }
  //   const listener = () => {
  //     stop();
  //   };
  //   copilotEvents.on('stop', listener);

  //   return () => {
  //     copilotEvents.off('stop', listener);
  //   };
  // }, [isFirstStep]);
  const handleOnStart = () => console.log('start');
  const handleOnStop = () => setStopGuide(true);
  const handleOnStepChange = () => console.log(`stepChange`);

  React.useEffect(() => {
    eventEmitter.on('start', handleOnStart);
    eventEmitter.on('stop', handleOnStop);
    eventEmitter.on('stepChange', handleOnStepChange);

    return () => {
      eventEmitter.off('start', handleOnStart);
      eventEmitter.off('stop', handleOnStop);
      eventEmitter.off('stepChange', handleOnStepChange);
    };
  }, []);
  const onVerifyFinancial = async () => {
    try {
      EncryptedStorage.setItem(
        '@verify_financial',
        JSON.stringify({
          step1: true,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    stopGuide && onVerifyFinancial();
  }, [stopGuide]);
  useEffect(() => {
    const loadVerifyFinancial = async () => {
      // await EncryptedStorage.removeItem('@verify_financial');
      const result =
        (await EncryptedStorage.getItem('@verify_financial')) || '{}';

      const jsonParseResult = JSON.parse(result);
      if (jsonParseResult?.step1) {
        setCheck(jsonParseResult?.step1);
      }
      if (canStart && !jsonParseResult?.step1) {
        start();
      }
    };

    loadVerifyFinancial();
  }, [canStart]);

  // React.useEffect(() => {
  //   if (canStart && !check) {
  //     start();
  //   }
  // }, [canStart, check]);

  useLayoutEffect(() => {
    setOptions({
      headerTitle: t('cryptocurrency_wallet_manage'),
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(7),
              alignItems: 'center',
            }}>
            <BottomHelpCenter />
            {data?.data?.wallet_address && (
              <MenuAddressWallet data={data?.data} />
            )}
          </View>
        );
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainWrapper>
      <View style={styles.wrapper}>
        <CustomImage
          source={images.logo}
          resizeMode="cover"
          style={{
            width: scale(200),
            height: scale(50),
          }}
        />
        <CustomText
          size={scale(13)}
          textType="medium"
          style={{
            textAlign: 'center',
          }}>
          {t('join_not_to_receive_voucher')}
        </CustomText>
        {!data?.data?.wallet_address ? (
          <View
            style={{
              rowGap: scale(12),
              width: '100%',
            }}>
            <CustomButton
              onPress={createWallet}
              text={t('create_new_wallet')}
              buttonType="large"
              desc={t('new_wallet_recovery_phrase')}
              isIconComponent
              iconLeft={
                <View style={styles.boxIcon}>
                  <IconAdd />
                </View>
              }
            />

            {/* MARK: MenuImportAddressWallet */}
            <MenuImportAddressWallet />
          </View>
        ) : (
          <>
            <TourGuideZone
              zone={1}
              style={{
                width: '100%',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              text={t('this_your_wallet_address')}
              borderRadius={16}>
              <BoxWalletBlockChain data={data?.data} />
            </TourGuideZone>

            <TourGuideZone
              zone={2}
              style={{
                paddingBottom: scale(10),
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              shape={'rectangle_and_keep'}
              text={t('this_is_type_point')}>
              <ListToken dataP={data?.data} />
            </TourGuideZone>
            <TourGuideZone zone={3} text={t('this_is_wallet_manage')}>
              <WalletManage data={data?.data} />
            </TourGuideZone>
          </>
        )}
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    rowGap: scale(10),
    padding: scale(20),
    paddingTop: scale(30),
  },
  boxIcon: {
    padding: scale(10),
    backgroundColor: COLORS.subPrimary,
    borderRadius: 99,
  },
});

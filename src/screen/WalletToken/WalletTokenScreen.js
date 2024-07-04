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

export default function WalletTokenScreen() {
  const {setOptions, navigate} = useNavigation();
  const {
    isFirstStep,
    goToNext,
    stop,
    currentStep,
    start,
    isLastStep,
    copilotEvents,
  } = useCopilot();
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
    isLastStep && onVerifyFinancial();
  }, [isLastStep]);

  useEffect(() => {
    const loadVerifyFinancial = async () => {
      const result =
        (await EncryptedStorage.getItem('@verify_financial')) || '';
      const jsonParseResult = JSON.parse(result);
      if (jsonParseResult?.step1) {
        setCheck(jsonParseResult?.step1);
      }
    };
    loadVerifyFinancial();
  }, []);
  useEffect(() => {
    if (!currentStep && check) {
      start();
    }
    const listener = () => {
      stop();
    };
    copilotEvents.on('stop', listener);

    return () => {
      copilotEvents.off('stop', listener);
    };
  }, [isFirstStep]);
  useLayoutEffect(() => {
    setOptions({
      headerTitle: t('cryptocurrency_wallet_manage'),
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(5),
              alignItems: 'center',
            }}>
            <BottomHelpCenter />
            <MenuAddressWallet data={data?.data} />
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
            <CopilotStep
              text={t('this_your_wallet_address')}
              order={1}
              name={'text1'}
              active={true}>
              <CopilotView
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: scale(10),
                }}>
                <BoxWalletBlockChain data={data?.data} />
              </CopilotView>
            </CopilotStep>
            <CopilotStep
              text={t('this_is_type_point')}
              order={2}
              name={'text2'}
              active={true}>
              <CopilotView
                style={{
                  paddingBottom: scale(10),
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ListToken dataP={data?.data} />
              </CopilotView>
            </CopilotStep>
            <CopilotStep
              text={t('this_is_wallet_manage')}
              order={3}
              name={'text3'}
              active={true}>
              <CopilotView>
                <WalletManage data={data?.data} />
              </CopilotView>
            </CopilotStep>
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

import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getProfile, getToken, getTokenAirdrop} from '../../Model/api/common';
import {getBalanceWallet, postCreateWallet} from '../../Model/api/wallet';
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
import {storage} from '../../utils/MMKVStorage';
import {AppKitButton, useDisconnect} from '@reown/appkit-ethers-react-native';
import {
  useAccount,
  useAppKit,
  useAppKitProvider,
} from '@reown/appkit-ethers-react-native';
import {Contract, JsonRpcProvider, ethers, formatUnits} from 'ethers';
import {mainnet, testnet} from '../../../App';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';
import {getCoinInfo, getTokenInfo} from './components/GetTokenInfo';
import {PostABI, PostAbi} from '../News/PostNews/PostABI';
import {VoucherABI} from '../Bookings/components/BookingRoom/VoucherABI';
import {useLoading} from '../../hooks/useLoading';
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
  const {goBack} = useNavigation();
  const queryClient = useQueryClient();

  const {token} = useAuthentication();

  const {isLoading, data} = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => getProfile(token),
    enabled: !!token,
  });
  const {data: dataWallet} = useQuery({
    queryKey: ['user', 'wallet', 'balance'],
    queryFn: () => getBalanceWallet(),
    enabled: !!token,
  });
  const {data: getDataTokenAir, isLoading: isLoadingTokenAir} = useQuery({
    queryKey: ['common', 'token-airdrop'],
    queryFn: () => getTokenAirdrop(),
  });
  const {data: getDataToken, isLoading: isLoadingToken} = useQuery({
    queryKey: ['common', 'token'],
    queryFn: () => getToken(),
  });
  // const postCreateWalletMu = useMutation({
  //   mutationFn: postCreateWallet,
  // });

  // const createWallet = () => {
  //   postCreateWalletMu.mutate(
  //     {},
  //     {
  //       onSuccess: dataInside => {
  //         showMess(
  //           t(dataInside?.message),
  //           dataInside?.status ? 'success' : 'error',
  //         );

  //         if (dataInside?.status) {
  //           queryClient.invalidateQueries(['user', 'profile']);
  //           navigate('ShowPrivateKeyAndSecretPhrase');
  //         }
  //       },
  //     },
  //   );
  // };

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
      storage.set(
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
      // await storage.delete('@verify_financial');
      const result = (await storage.getString('@verify_financial')) || '{}';

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
              alignItems: 'center',
            }}>
            <BottomHelpCenter />
            {/* {data?.data?.wallet_address && (
              <MenuAddressWallet data={data?.data} />
            )} */}
          </View>
        );
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {open, close} = useAppKit();
  const {address, isConnected} = useAppKitAccount();
  const {walletProvider} = useAppKitProvider();
  const [loadingState, setLoadingState] = useState(true);
  const [dataListToken, setDataListToken] = useState([]);
  const {disconnect} = useDisconnect();

  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  useEffect(() => {
    const fetchData = async () => {
      // Kiểm tra điều kiện trước khi fetch
      if (!address || isLoadingToken || isLoadingTokenAir) {
        setLoadingState(false);
        return;
      }

      try {
        setLoadingState(true);
        const tokens = await Promise.all([
          getCoinInfo({
            walletAddress: address,
            chain: mainnet,
            name: 'Pione Coin',
          }),
          getCoinInfo({
            walletAddress: address,
            chain: testnet,
          }),
          getTokenInfo({
            walletAddress: address,
            chain: testnet,
            contract: getDataToken?.data?.contract_address,
          }),
          getTokenInfo({
            walletAddress: address,
            chain: testnet,
            contract: getDataTokenAir?.data?.contract_address,
          }),
        ]);

        const allNullOrZero = tokens.every(
          token => token === null || token === '0',
        );

        if (allNullOrZero && retryCount < MAX_RETRIES) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => {
            fetchData();
          }, 2000);
          return;
        }

        const validTokens = tokens.filter(token => token !== null);
        setDataListToken(validTokens);

        if (allNullOrZero && retryCount >= MAX_RETRIES) {
          showMess(t('wallet_ready_to_use'), 'success');
          goBack();
        }
        // address && handleCreateWalletToken(address);
      } catch (error) {
        console.error('❌ Lỗi khi lấy danh sách token:', error);
      } finally {
        setLoadingState(false);
      }
    };

    fetchData();
  }, [address, isLoadingToken, isLoadingTokenAir, retryCount]);

  const contractAddress = '0xBd6045cAe57B10FdaDa9FdbeBe6e7dC099Ebf3fA';
  const contractVoucherAddress = '0x02DE2a1A4A89B90C3a0DD0960947a2cF0Cbc2490';
  const contractPostABI = PostABI;
  const contractSwapABI = VoucherABI;

  const swapVoucher = async () => {
    const amount = ethers.parseUnits('1', 18);
    if (!isConnected) {
      open({view: 'Connect'});
      showMess(t('wallet_not_connect'), 'error');
      return;
    }

    try {
      if (!walletProvider) {
        console.error('❌ Không tìm thấy walletProvider!');
        return;
      }
      // Sử dụng BrowserProvider để tạo signer từ walletProvider
      const ethersProvider = new ethers.BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      // Khởi tạo contract với signer
      const contract = new ethers.Contract(
        contractVoucherAddress,
        contractSwapABI,
        signer,
      );
      console.log('🔄 Đang gửi giao dịch...');
      const tx = await contract.transfer(
        '0x6375dAf9Fe96B7aafDf5901aad009828e4ABE949',
        amount,
      );
      await tx.wait();
      if (tx.hash) {
        goBack();
      }
      showMess('✅ Giao dịch hoàn tất!', 'success');
      console.log('✅ Giao dịch hoàn tất! Hash:', tx.hash);
    } catch (error) {
      console.error('❌ Lỗi gửi giao dịch:', error);
    }
  };

  const sendTransaction = async () => {
    if (!isConnected) {
      open({view: 'Connect'});
      showMess(t('wallet_not_connect'), 'error');
      return;
    }

    try {
      if (!walletProvider) {
        console.error('❌ Không tìm thấy walletProvider!');
        return;
      }
      // Sử dụng BrowserProvider để tạo signer từ walletProvider
      const ethersProvider = new ethers.BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      // Khởi tạo contract với signer
      const contract = new ethers.Contract(
        contractAddress,
        contractPostABI,
        signer,
      );
      console.log('🔄 Đang gửi giao dịch...');
      const tx = await contract.storeData('Hello Blockchain!');
      await tx.wait();
      if (tx.hash) {
        goBack();
      }
      showMess('✅ Giao dịch hoàn tất!', 'success');
      console.log('✅ Giao dịch hoàn tất! Hash:', tx.hash);
    } catch (error) {
      console.error('❌ Lỗi gửi giao dịch:', error);
    }
  };

  return (
    <MainWrapper refreshControl>
      <View
        style={{...styles.wrapper, marginTop: !isConnected ? scale(200) : 0}}>
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
        {!address && (
          <AppKitButton
            connectStyle={{
              backgroundColor: COLORS.pioPrimary,
              width: '50%',
              marginTop: scale(20),
            }}
          />
        )}

        {address && (
          <View
            style={{
              flex: 1,
              rowGap: 10,
              width: '100%',
            }}>
            <BoxWalletBlockChain data={data?.data} walletAddress={address} />
            {loadingState ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <>
                <ListToken dataP={dataListToken} />
                <WalletManage data={data?.data} />
              </>
            )}
            <CustomButton
              onPress={() => {
                console.log('address', address);
                disconnect();
              }}
              styleWrapper={{
                width: '60%',
                alignSelf: 'center',
              }}
              text={t('disconnect_wallet')}
              buttonType="large"
            />
          </View>
        )}
        <CustomButton
          text="Post"
          styleWrapper={{width: '50%', marginTop: scale(20)}}
          onPress={sendTransaction}
        />
        <CustomButton
          text="Swap"
          styleWrapper={{width: '50%'}}
          onPress={swapVoucher}
        />
        {/* {!data?.data?.wallet_address ? (
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

            <MenuImportAddressWallet />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              rowGap: scale(10),
              width: '100%',
            }}>
            <TourGuideZone
              zone={1}
              style={{
                flexDirection: 'row',
              }}
              text={t('this_your_wallet_address')}
              borderRadius={16}>
              <BoxWalletBlockChain data={data?.data} />
            </TourGuideZone>

            <TourGuideZone
              zone={2}
              shape={'rectangle_and_keep'}
              text={t('this_is_type_point')}>
              <ListToken dataP={data?.data} token={token} />
            </TourGuideZone>
            <TourGuideZone zone={3} text={t('this_is_wallet_manage')}>
              <WalletManage data={data?.data} />
            </TourGuideZone>
          </View>
        )} */}
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

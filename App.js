import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNetInfo} from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {COLORS, SIZES, images, scale} from './src/assets/constants';
import {showMess} from './src/assets/constants/Helper';
import CustomImage from './src/components/CustomImage';
import Loading from './src/components/Loading/Loading';
import {AuthProvider} from './src/context/AuthContext';
import {LanguageProvider} from './src/context/LanguageContext';
import {
  BottomTab,
  NavigateWalletToken,
  NavigationProfile,
  NoBottomTab,
} from './src/navigation';
import NavigationAuth from './src/navigation/NavigationAuth';

import {COUNTRY_KEY, CountryProvider} from './src/context/CountryContent';
import {useCountry} from './src/hooks/useCountry';
import {SelectDefaultCountryScreen} from './src/screen/DefaultCountry';

import '@walletconnect/react-native-compat';
import {Linking} from 'react-native';
import {
  createAppKit,
  defaultConfig,
  AppKit,
} from '@reown/appkit-ethers-react-native';
// import {
//   CopilotProvider,
//   CopilotStep,
//   useCopilot,
//   walkthroughable,
// } from 'react-native-copilot';
import {TourGuideProvider} from 'rn-tourguide';
import {useSocket} from './src/Model/socket/socket';
import {CustomText, HeaderBar} from './src/components';
import {screenGestureDisable} from './src/navigation/screenGestureDisable';
import PushNotification, {Importance} from 'react-native-push-notification';
import {setupNotifications} from './src/utils/setupNotification';
import {requestNotificationPermission} from './src/utils/permission/requestNotificationPermission';
import {useLanguage} from './src/hooks/useLanguage';
import {replaceTranslateKey} from './src/utils/replaceTranslateKey';
import {HotUpdater} from '@hot-updater/react-native';
import {storage} from './src/utils/MMKVStorage';

// Prevent them from scaling the font size based on the system's font size settings,
// Override Text scaling
if (Text.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

// Override Text scaling in input fields
if (TextInput.defaultProps) {
  TextInput.defaultProps.allowFontScaling = false;
} else {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
const projectId = '9d4a3f075587d6efbb06d1091f6357b4';

const metadata = {
  name: 'Pione House',
  url: 'https://pionehouse.com',
  icons: ['https://pionechain.com/images/ecosystem/iconPioneHouse.png'],
  redirect: {
    native: 'pionehouse://',
  },
};
const config = defaultConfig({metadata});

// 3. Define your chains
export const testnet = {
  chainId: 5080,
  name: 'Pione Zero',
  currency: 'PZO',
  explorerUrl: 'https://zeroscan.org',
  rpcUrl: 'https://rpc.zeroscan.org',
};
export const mainnet = {
  chainId: 5090,
  name: 'Pione Chain',
  currency: 'PIO',
  explorerUrl: 'https://pionescan.com',
  rpcUrl: 'https://rpc.pionescan.com',
};

const chains = [testnet];

createAppKit({
  projectId,
  chains,
  config,
  includeWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
  ],
  excludeWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
  ],
  features: {
    swaps: false,
  },
  defaultChain: testnet,
  customWallets: [
    {
      id: 'com.companyname.swaptobe',
      name: 'PioneWallet',
      homepage: 'com.companyname.swaptobe',
      image_url: 'https://pionechain.com/images/ecosystem/pionechain.png',
      mobile_link: 'tobewallet://',
      desktop_link: 'desktop_link',
      webapp_link: 'webapp_link',
      app_store: 'https://apps.apple.com/us/app/pione-wallet/id6738914833',
      play_store:
        'https://play.google.com/store/apps/details?id=com.companyname.swaptobe',
    },
  ],
  // enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

function App() {
  // const [splashScreenVisible, setSplashScreenVisible] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setSplashScreenVisible(false);
  //   }, 1500); // Adjust the duration as needed

  //   return () => clearTimeout(timer);
  // }, []);
  const netInfo = useNetInfo();
  useEffect(() => {
    if (netInfo.isConnected) {
      showMess('Connected!', 'success');
    } else {
      showMess('Disconnected!', 'error');
    }
  }, [netInfo.isConnected]);

  useEffect(() => {
    setupNotifications();
  }, []);

  // const SplashScreen = () => (
  //   <View
  //     style={{
  //       backgroundColor: COLORS.white,
  //       height: '100%',
  //       justifyContent: 'center',
  //     }}>
  //     <CustomImage
  //       source={images.logo2}
  //       style={{height: '50%', width: '50%', alignSelf: 'center'}}
  //       resizeMode="contain"
  //     />
  //   </View>
  // );

  const TooltipComponent = tooltip => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          borderRadius: scale(10),
          minHeight: scale(100),
          padding: scale(10),
        }}>
        <View
          style={{
            height: scale(30),
            width: scale(30),
            backgroundColor: 'green',
            position: 'absolute',
            alignItems: 'center',
            alignSelf: 'flex-end',
            justifyContent: 'center',
            borderRadius: scale(99),
            top: scale(-12),
          }}>
          <CustomText style={{color: COLORS.white}}>
            {tooltip.currentStep.order}
          </CustomText>
        </View>
        <CustomText
          style={{textAlign: 'center', flex: 1, fontSize: SIZES.xMedium}}>
          {tooltip.currentStep.text}
        </CustomText>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {tooltip.currentStep.order > 1 ? (
            <TouchableOpacity
              onPress={tooltip.handlePrev}
              style={{padding: scale(5)}}>
              <CustomText style={{color: 'green'}}>Previous</CustomText>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}

          {!tooltip.isLastStep ? (
            <TouchableOpacity
              onPress={tooltip.handleNext}
              style={{padding: scale(5)}}>
              <CustomText style={{color: 'green'}}>Next</CustomText>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
          <TouchableOpacity
            onPress={tooltip.handleStop}
            style={{padding: scale(5)}}>
            <CustomText style={{color: 'green'}}>Finish</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const linking = {
    prefixes: ['pionehouse://'],
    config: {
      screens: {
        BottomTab: 'Home',
        SelectDefaultCountryScreen: 'select-country',
      },
    },
  };
  useEffect(() => {
    const handleDeepLink = event => {
      console.log('Deeplink received:', event.url);
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <SafeAreaProvider
        style={{
          backgroundColor: COLORS.white,
        }}>
        <NavigationContainer linking={linking}>
          <QueryClientProvider client={queryClient}>
            <CountryProvider>
              <KeyboardProvider>
                <LanguageProvider>
                  <AuthProvider>
                    <Loading />

                    <FlashMessage
                      position={
                        Platform.OS === 'ios'
                          ? 'top'
                          : {
                              top: StatusBar.currentHeight,
                              left: 0,
                              right: 0,
                            }
                      }
                      floating={Platform.OS !== 'ios'}
                    />
                    <TourGuideProvider
                      tooltipComponent={TooltipComponent}
                      preventOutsideInteraction>
                      <BottomSheetModalProvider>
                        {/* <TouchableWithoutFeedback
                            accessible={false}
                            onPress={Keyboard.dismiss}> */}
                        {/* <KeyboardAvoidingView
                            style={{flex: 1}}
                            behavior={
                              Platform.OS === 'ios' ? 'padding' : 'height'
                            }> */}

                        <Layout />
                        <StatusBar
                          barStyle="light-content"
                          backgroundColor={COLORS.pioHeader}
                        />
                        {/* </KeyboardAvoidingView> */}
                        {/* </TouchableWithoutFeedback> */}
                      </BottomSheetModalProvider>
                    </TourGuideProvider>
                  </AuthProvider>
                </LanguageProvider>
              </KeyboardProvider>
            </CountryProvider>
            <AppKit />
          </QueryClientProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const Layout = () => {
  const {country} = useCountry();
  const socket = useSocket();
  const {t} = useLanguage();
  const [isReady, setIsReady] = useState(false);
  const [isCountry, setIsCountry] = useState(false);
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestNotificationPermission();
    }
  }, []);
  useEffect(() => {
    const initialize = async () => {
      try {
        const value = await storage.getString(COUNTRY_KEY);
        if (value) {
          setIsCountry(true);
        } else {
          setIsCountry(false);
        }
        setIsReady(true);
      } catch (error) {
        setIsReady(true);
      }
    };

    initialize();
  }, []);
  PushNotification.createChannel(
    {
      channelId: '1', // (required)
      channelName: 'Default Channel', // (required)
      channelDescription: 'A default channel', // (optional)
      playSound: true, // (optional)
      soundName: 'default', // (optional)
      importance: Importance.HIGH, // (optional)
      vibrate: true, // (optional)
    },
    // created => console.log(`createChannel returned '${created}'`),
  );
  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Socket connected!');
      });

      socket.on('user_notification', value => {
        // console.log('user_notification:', value);

        PushNotification.localNotification({
          channelId: '1',
          title: t(value?.title) || 'Notification',
          message:
            replaceTranslateKey(
              t(value?.content),
              value?.content_replacements,
            ) || 'You have a new message.',
          playSound: true,
          color: 'blue',
          soundName: 'default',
          smallIcon: 'ic_logo',
          largeIcon: '',
        });
      });

      return () => {
        socket.off('connect');
        socket.off('user_notification');
      };
    }
  }, [socket, t]);
  if (!isReady || isCountry === null) {
    return (
      <View style={styles.loadingContainer}>
        <CustomImage
          source={images.logo2}
          style={{height: '50%', width: '50%', alignSelf: 'center'}}
          resizeMode="contain"
        />
        <View style={{rowGap: scale(10)}}>
          {/* <CText
            style={{color: COLORS.grey, fontSize: SIZES.medium}}
            textType="bold">
            Checking for Update...
          </CText> */}
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#f7f9fa',
        },

        header: props => <HeaderBar {...props} />,
      }}
      initialRouteName={isCountry ? 'BottomTab' : 'SelectDefaultCountryScreen'}>
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen
        name={'SelectDefaultCountryScreen'}
        component={SelectDefaultCountryScreen}
      />
      <Stack.Screen name="NavigationAuth" component={NavigationAuth} />
      <Stack.Screen name="NavigationProfile" component={NavigationProfile} />
      <Stack.Screen
        name="NavigateWalletToken"
        component={NavigateWalletToken}
      />
      <Stack.Screen name="NoBottomTab" component={NoBottomTab} />
      {screenGestureDisable()}
      {/* <NoBottomTab /> */}
    </Stack.Navigator>
  );
};
export default HotUpdater.wrap({
  source: 'https://ddsfubyaulxbddvrtwkd.supabase.co/functions/v1/update-server',
  requestHeaders: {
    // if you want to use the request headers, you can add them here
  },
  fallbackComponent: ({status, progress}) => (
    <View style={styles.loadingContainer}>
      <CustomImage
        source={images.logo2}
        style={{height: '50%', width: '50%', alignSelf: 'center'}}
        resizeMode="contain"
      />
      <View style={{rowGap: scale(10)}}>
        <View style={{flexDirection: 'row'}}>
          <CustomText
            style={{color: COLORS.grey, fontSize: SIZES.medium}}
            textType="bold">
            {status === 'UPDATING' ? 'Updating...' : 'Checking for Update...'}
          </CustomText>
          {progress > 0 ? (
            <CustomText
              style={{color: COLORS.grey, fontSize: SIZES.xMedium}}
              textType="bold">
              {Math.round(progress * 100)}%
            </CustomText>
          ) : null}
        </View>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    </View>
  ),
})(App);
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});

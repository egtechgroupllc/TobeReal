import {useNetInfo} from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {
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
import {SafeAreaProvider} from 'react-native-safe-area-context';

// import {showMess} from './src/assets/constants/Helper';

// import {AuthProvider} from './src/context/AuthContext';
// import {LanguageProvider} from './src/context/LanguageContext';

// import {useCountry} from './src/hooks/useCountry';
// import {SelectDefaultCountryScreen} from './src/screen/DefaultCountry';

import {TourGuideProvider} from 'rn-tourguide';
// import {useSocket} from './src/Model/socket/socket';

// import {screenGestureDisable} from './src/navigation/screenGestureDisable';
// import PushNotification, {Importance} from 'react-native-push-notification';
// import {requestNotificationPermission} from './src/utils/permission/requestNotificationPermission';
// import {useLanguage} from './src/hooks/useLanguage';
import {scale} from '~/utils/scale';
import {CImage, CText, HeaderBar} from '~components';
import {replaceTranslateKey} from './src/utils/replaceTranslateKey';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useSocket} from '~/api/socket';
import {showMess} from '~/assets/constants/Helper';
import Loading from '~/components/Loading/Loading';
import {AuthProvider} from '~/context/AuthContext';
import {CountryProvider} from '~/context/CountryContent';
import {LanguageProvider} from '~/context/LanguageContext';
import {useLanguage} from '~/hooks/useLanguage';
import {BottomTab, NavigationAuth, NoBottomTab} from '~/navigates';
import {requestNotificationPermission} from '~/utils/permission/requestNotificationPermission';
import {setupNotifications} from '~/utils/setupNotification';
import {COLORS, images, SIZES} from './src/assets/constants';
import {useCountry} from '~/hooks/useCountry';
import SelectDefaultCountryScreen from '~/screens/DefaultCountry/SelectDefaultCountryScreen';

// import {setupNotifications} from '~/utils/setupNotification';
// import {BottomTab, NavigationAuth, NoBottomTab} from '~/navigates';
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

export default function App() {
  const [splashScreenVisible, setSplashScreenVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashScreenVisible(false);
    }, 1500); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);
  const netInfo = useNetInfo();
  useEffect(() => {
    if (netInfo.isConnected) {
      showMess('Connected!', 'success');
    } else {
      showMess('Disconnected!', 'error');
    }
  }, [netInfo.isConnected]);

  // useEffect(() => {
  //   setupNotifications();
  // }, []);

  const SplashScreen = () => (
    <View
      style={{
        backgroundColor: COLORS.primary,
        height: '100%',
        justifyContent: 'center',
      }}>
      <CImage
        source={images.logoSplash}
        style={{height: '50%', width: '50%', alignSelf: 'center'}}
        resizeMode="contain"
      />
    </View>
  );

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
          <CText style={{color: COLORS.whiteSemi}}>
            {tooltip.currentStep.order}
          </CText>
        </View>
        <CText style={{textAlign: 'center', flex: 1, fontSize: SIZES.xMedium}}>
          {tooltip.currentStep.text}
        </CText>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {tooltip.currentStep.order > 1 ? (
            <TouchableOpacity
              onPress={tooltip.handlePrev}
              style={{padding: scale(5)}}>
              <CText style={{color: 'green'}}>Previous</CText>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}

          {!tooltip.isLastStep ? (
            <TouchableOpacity
              onPress={tooltip.handleNext}
              style={{padding: scale(5)}}>
              <CText style={{color: 'green'}}>Next</CText>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
          <TouchableOpacity
            onPress={tooltip.handleStop}
            style={{padding: scale(5)}}>
            <CText style={{color: 'green'}}>Finish</CText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <SafeAreaProvider
        style={{
          backgroundColor: COLORS.body,
        }}>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <CountryProvider>
              {splashScreenVisible ? (
                <SplashScreen />
              ) : (
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
                          backgroundColor={COLORS.cyan}
                        />
                        {/* </KeyboardAvoidingView> */}
                        {/* </TouchableWithoutFeedback> */}
                      </BottomSheetModalProvider>
                    </TourGuideProvider>
                  </AuthProvider>
                </LanguageProvider>
              )}
            </CountryProvider>
          </QueryClientProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const Layout = () => {
  const socket = useSocket();
  const {t} = useLanguage();
  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     requestNotificationPermission();
  //   }
  // }, []);

  // PushNotification.createChannel(
  //   {
  //     channelId: '1', // (required)
  //     channelName: 'Default Channel', // (required)
  //     channelDescription: 'A default channel', // (optional)
  //     playSound: true, // (optional)
  //     soundName: 'default', // (optional)
  //     importance: Importance.HIGH, // (optional)
  //     vibrate: true, // (optional)
  //   },
  //   created => console.log(`createChannel returned '${created}'`),
  // );
  // useEffect(() => {
  //   if (socket) {
  //     socket.on('connect', () => {
  //       console.log('Socket connected!');
  //     });

  //     socket.on('user_notification', value => {
  //       console.log('user_notification:', value);

  //       PushNotification.localNotification({
  //         channelId: '1',
  //         title: t(value?.title) || 'Notification',
  //         message:
  //           replaceTranslateKey(
  //             t(value?.content),
  //             value?.content_replacements,
  //           ) || 'You have a new message.',
  //         playSound: true,
  //         color: 'yellow',
  //         soundName: 'default',
  //         smallIcon: 'ic_logo',
  //         largeIcon: '',
  //       });
  //     });

  //     return () => {
  //       socket.off('connect');
  //       socket.off('user_notification');
  //     };
  //   }
  // }, [socket, t]);
  const {country} = useCountry();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#f7f9fa',
        },
        // header: props => <HeaderBar {...props} />,
      }}
      initialRouteName="BottomTab">
      {country?.id ? (
        <Stack.Screen name="BottomTab" component={BottomTab} />
      ) : (
        <Stack.Screen
          name={'SelectDefaultCountryScreen'}
          component={SelectDefaultCountryScreen}
        />
      )}
      <Stack.Screen name="NavigationAuth" component={NavigationAuth} />

      <Stack.Screen name="NoBottomTab" component={NoBottomTab} />

      {/* {country?.id ? (
        <Stack.Screen name="BottomTab" component={BottomTab} />
      ) : (
        <Stack.Screen
          name={'SelectDefaultCountryScreen'}
          component={SelectDefaultCountryScreen}
        />
      )}
      <Stack.Screen name="NavigationAuth" component={NavigationAuth} />
      <Stack.Screen name="NavigationProfile" component={NavigationProfile} />
      <Stack.Screen
        name="NavigateWalletToken"
        component={NavigateWalletToken}
      />
      <Stack.Screen name="NoBottomTab" component={NoBottomTab} />
      {screenGestureDisable()} */}
      {/* <NoBottomTab /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

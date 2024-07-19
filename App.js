import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNetInfo} from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  KeyboardProvider,
  KeyboardAvoidingView,
} from 'react-native-keyboard-controller';
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

import {CountryProvider} from './src/context/CountryContent';
import {useCountry} from './src/hooks/useCountry';
import {SelectDefaultCountryScreen} from './src/screen/DefaultCountry';
// import {
//   CopilotProvider,
//   CopilotStep,
//   useCopilot,
//   walkthroughable,
// } from 'react-native-copilot';
import {TourGuideProvider} from 'rn-tourguide';
import {CustomText} from './src/components';
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

  const SplashScreen = () => (
    <View
      style={{
        backgroundColor: COLORS.white,
        height: '100%',
        justifyContent: 'center',
      }}>
      <CustomImage
        source={images.logoSplash}
        style={{height: '70%', width: '70%', alignSelf: 'center'}}
        resizeMode="contain"
      />
    </View>
  );

  // const TooltipComponent = () => {
  //   const {
  //     isFirstStep,
  //     isLastStep,
  //     goToPrev,
  //     goToNext,
  //     goToNth,
  //     currentStep,
  //     stop,
  //   } = useCopilot();
  //   return (
  //     <View
  //       style={{
  //         backgroundColor: '#fff',
  //         width: '100%',
  //         borderRadius: scale(10),
  //         minHeight: scale(100),
  //         padding: scale(10),
  //       }}>
  //       <CustomText style={{textAlign: 'center', flex: 1}}>
  //         {currentStep.text}
  //       </CustomText>

  //       <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
  //         {currentStep.order > 1 ? (
  //           <TouchableOpacity onPress={goToPrev}>
  //             <CustomText style={{color: 'green'}}>Previous</CustomText>
  //           </TouchableOpacity>
  //         ) : (
  //           <View></View>
  //         )}

  //         <TouchableOpacity onPress={goToNext}>
  //           <CustomText style={{color: 'green'}}>Next</CustomText>
  //         </TouchableOpacity>

  //         <TouchableOpacity onPress={stop}>
  //           <CustomText style={{color: 'green'}}>Finish</CustomText>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // };
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
  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <SafeAreaProvider
        style={{
          backgroundColor: COLORS.white,
        }}>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <CountryProvider>
              {splashScreenVisible ? (
                <SplashScreen />
              ) : (
                <KeyboardProvider>
                  <Loading />
                  <LanguageProvider>
                    <AuthProvider>
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
                            backgroundColor={'transparent'}
                            translucent
                          />
                          {/* </KeyboardAvoidingView> */}
                          {/* </TouchableWithoutFeedback> */}
                        </BottomSheetModalProvider>
                      </TourGuideProvider>
                    </AuthProvider>
                  </LanguageProvider>
                </KeyboardProvider>
              )}
            </CountryProvider>
          </QueryClientProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const Layout = () => {
  const {country} = useCountry();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#f7f9fa',
        },
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
      <Stack.Screen name="NavigationProfile" component={NavigationProfile} />
      <Stack.Screen
        name="NavigateWalletToken"
        component={NavigateWalletToken}
      />
      <Stack.Screen name="NoBottomTab" component={NoBottomTab} />

      {/* <NoBottomTab /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

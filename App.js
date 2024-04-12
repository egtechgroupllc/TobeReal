import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
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
  View,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {COLORS, images} from './src/assets/constants';
import {showMess} from './src/assets/constants/Helper';
import CustomImage from './src/components/CustomImage';
import Loading from './src/components/Loading/Loading';
import {AuthProvider} from './src/context/AuthContext';
import {LanguageProvider} from './src/context/LanguageContext';
import {useAuthentication} from './src/hooks/useAuthentication';
import {BottomTab, NoBottomTab} from './src/navigation';
import NavigationAuth from './src/navigation/NavigationAuth';
import NavigationProfile from './src/navigation/NavigationProfile';
import DetailPriceRoom from './src/screen/Explore/components/DetailAccommodation/Rooms/DetailRoom/DetailPriceRoom';
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
    }, 2000); // Adjust the duration as needed

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
        resizeMode="contain"></CustomImage>
    </View>
  );

  return splashScreenVisible ? (
    <SplashScreen />
  ) : (
    <GestureHandlerRootView style={styles.wrapper}>
      <SafeAreaProvider
        style={{
          backgroundColor: COLORS.white,
        }}>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <Loading />
            <KeyboardProvider>
              <LanguageProvider>
                <AuthProvider>
                  <FlashMessage
                    position={
                      Platform.OS === 'ios'
                        ? 'top'
                        : {top: StatusBar.currentHeight, left: 0, right: 0}
                    }
                    floating={Platform.OS !== 'ios'}
                  />
                  <BottomSheetModalProvider>
                    <StatusBar
                      barStyle="dark-content"
                      backgroundColor={COLORS.primary}
                    />
                    <Layout />
                  </BottomSheetModalProvider>
                </AuthProvider>
              </LanguageProvider>
            </KeyboardProvider>
          </QueryClientProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const Layout = () => {
  const {token} = useAuthentication();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#f7f9fa',
        },
      }}
      initialRouteName="BottomTab">
      <Stack.Screen name="BottomTab" component={DetailPriceRoom} />
      <Stack.Screen name="NavigationAuth" component={NavigationAuth} />
      <Stack.Screen name="NavigationProfile" component={NavigationProfile} />

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

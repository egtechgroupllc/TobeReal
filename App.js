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
import {BottomTab, NavigateWalletToken, NoBottomTab} from './src/navigation';
import NavigationAuth from './src/navigation/NavigationAuth';

import {CountryProvider} from './src/context/CountryContent';
import {useCountry} from './src/hooks/useCountry';
import {SelectDefaultCountryScreen} from './src/screen/DefaultCountry';
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

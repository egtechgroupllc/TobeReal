import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {Platform, StatusBar, StyleSheet, Text, TextInput} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useNetInfo} from '@react-native-community/netinfo';
import FlashMessage from 'react-native-flash-message';
import {KeyboardProvider} from 'react-native-keyboard-controller';

import {COLORS} from './src/assets/constants';
import {showMess} from './src/assets/constants/Helper';
import {AuthProvider} from './src/context/AuthContext';
import {LanguageProvider} from './src/context/LanguageContext';
import {useAuthentication} from './src/hooks/useAuthentication';
import {BottomTab, NoBottomTab} from './src/navigation';
import NavigationAuth from './src/navigation/NavigationAuth';
import NavigationProfile from './src/navigation/NavigationProfile';

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
  const netInfo = useNetInfo();
  useEffect(() => {
    if (netInfo.isConnected) {
      showMess('Connected!', 'success');
    } else {
      showMess('Disconnected!', 'error');
    }
  }, [netInfo.isConnected]);

  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <SafeAreaProvider
        style={{
          backgroundColor: COLORS.primary,
        }}>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
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
      }}
      initialRouteName="BottomTab">
      <Stack.Screen name="BottomTab" component={BottomTab} />
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

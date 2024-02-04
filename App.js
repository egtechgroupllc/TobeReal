import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {Platform, StatusBar, StyleSheet, Text, TextInput} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {COLORS} from './src/assets/constants';
import {AuthProvider} from './src/context/AuthContext';
import {LanguageProvider} from './src/context/LanguageContext';
import {useAuthentication} from './src/hooks/useAuthentication';
import {BottomTab, NoBottomTab} from './src/navigation';
import NavigationAuth from './src/navigation/NavigationAuth';
import NavigationProfile from './src/navigation/NavigationProfile';
import FlashMessage from 'react-native-flash-message';

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
  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <SafeAreaProvider
        style={{
          backgroundColor: COLORS.primary,
        }}>
        <SafeAreaView style={styles.wrapper} edges={['right', 'top', 'left']}>
          <NavigationContainer>
            <QueryClientProvider client={queryClient}>
              <LanguageProvider>
                <AuthProvider>
                  <BottomSheetModalProvider>
                    <StatusBar
                      barStyle="light-content"
                      backgroundColor={COLORS.primary}
                    />
                    <Layout />
                    <FlashMessage
                  position={
                    Platform.OS === 'ios'
                      ? 'top'
                      : {top: StatusBar.currentHeight, left: 0, right: 0}
                  }
                  floating={Platform.OS !== 'ios'}
                />
                  </BottomSheetModalProvider>
                </AuthProvider>
              </LanguageProvider>
            </QueryClientProvider>
          </NavigationContainer>
        </SafeAreaView>
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
      }}>
      {token ? (
        <Stack.Screen name="BottomTab" component={BottomTab} />
      ) : (
        <Stack.Screen name="NavigationAuth" component={NavigationAuth} />
      )}

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

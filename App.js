import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar, StyleSheet, Text, TextInput} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from './src/assets/constants';
import {BottomTab, NoBottomTab} from './src/navigation';
import NavigationAuth from './src/navigation/NavigationAuth';
import NavigationProfile from './src/navigation/NavigationProfile';
import BottomSheet from './src/components/BottomSheet';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

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

export default function App() {
  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <SafeAreaProvider
        style={{
          backgroundColor: COLORS.primary,
        }}>
        <SafeAreaView style={styles.wrapper} edges={['right', 'top', 'left']}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={COLORS.primary}
          />
          <BottomSheetModalProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen
                  name="NavigationAuth"
                  component={NavigationAuth}
                />
                <Stack.Screen
                  name="NavigationProfile"
                  component={NavigationProfile}
                />
                <Stack.Screen name="BottomTab" component={BottomTab} />
                <Stack.Screen name="NoBottomTab" component={NoBottomTab} />
              </Stack.Navigator>
            </NavigationContainer>
          </BottomSheetModalProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, TextInput, StatusBar} from 'react-native';
import BottomTab from './src/navigation/BottomTab';
import {COLORS} from './src/assets/constants';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
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

export default function App() {
  return (
    <SafeAreaProvider
      style={{
        backgroundColor: COLORS.primary,
      }}>
      <SafeAreaView style={styles.wrapper} edges={['right', 'top', 'left']}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: '#e6e7e8',
              },
            }}>
              <Stack.Screen name="NavigationAuth" component={NavigationAuth} />
              <Stack.Screen name="NavigationProfile" component={NavigationProfile} />
            <Stack.Screen name="BottomTab" component={BottomTab} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

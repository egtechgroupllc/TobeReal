import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, images} from '../assets/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomImage from './CustomImage';

export default function MainWrapper({
  children,
  backgroundColor,
  styleContent,
  styleWrapper,
  noSafeArea,
  scrollEnabled = true,
  onScroll = () => {},
}) {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.primary}}
      edges={noSafeArea ? [''] : ['top', 'right', 'left']}>
      <CustomImage
        source={images.background}
        resizeMode="stretch"
        style={[
          styles.wrapper,
          {backgroundColor: '#f7f9fa'},
          backgroundColor && {backgroundColor},
          styleWrapper,
        ]}>
        {scrollEnabled ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={scrollEnabled}
            onScroll={onScroll}
            scrollEventThrottle={16}>
            <View style={{flex: 1, ...styleContent}}>{children}</View>
          </ScrollView>
        ) : (
          <View style={{flex: 1, ...styleContent}}>{children}</View>
        )}
      </CustomImage>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // maxWidth: scale(400),
    // alignSelf: 'center',
  },
});

import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {images} from '../assets/constants';

export default function MainWrapper({
  children,
  backgroundColor,
  styleContent,
  scrollEnabled = true,
  onScroll = () => {},
}) {
  return (
    <ImageBackground
      source={images.background1}
      resizeMode="stretch"
      style={[
        {flex: 1, backgroundColor: '#fff'},
        backgroundColor && {backgroundColor},
      ]}>
      <View style={[styles.wrapper]}>
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // maxWidth: scale(400),
    // alignSelf: 'center',
  },
});

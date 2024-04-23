/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SHADOW, scale} from '../../../assets/constants';

export default memo(function BookAccommodation({
  setBookHeight,
  isLoading,
  ContentComponent,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{...styles.wrapper, paddingBottom: insets.bottom - 5}}
      onLayout={e => {
        const {height} = e.nativeEvent.layout;
        setBookHeight(height);
      }}>
      {ContentComponent}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    minHeight: scale(90),
    rowGap: scale(8),
    padding: scale(10),
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: -1,
    },
  },
});

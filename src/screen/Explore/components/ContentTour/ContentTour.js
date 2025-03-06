import React, {memo, useState} from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {images, scale} from '../../../../assets/constants';
import {useLanguage} from '../../../../hooks/useLanguage';
import PackageTour from './PackageTour';
import ThemedTour from './ThemedTour';
import WorldTour from './WorldTour';
import DiscoveryTour from './DiscoveryTour';
import {CustomImage} from '../../../../components';
import {showMess} from '../../../../assets/constants/Helper';
import SliderContent from '../SliderContent';

export default memo(function ContentTour({dataBanner}) {
  const {t} = useLanguage();
  return (
    <View style={styles.wrapper}>
      {(Platform?.OS === 'android'
        ? dataBanner?.banner?.android?.is_show
        : dataBanner?.banner?.ios?.is_show) && (
        <SliderContent dataBanner={dataBanner} />
      )}
      <PackageTour />
      {/* <ThemedTour data={dataThemed} /> */}
      <WorldTour />
      {/* <DiscoveryTour data={tourData} onPressCategory={handleCategoryChange} /> */}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    marginTop: scale(16),
    rowGap: scale(10),
    paddingBottom: scale(80),
  },
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});

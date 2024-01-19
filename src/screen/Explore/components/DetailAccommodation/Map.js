import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from '../../../../assets/constants';
import WrapperContent from '../WrapperContent';
import {MapContain} from '../../../../components';

export default function Map() {
  return (
    <WrapperContent heading="Map View" styleContent={styles.wrapper}>
      <MapContain></MapContain>
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: scale(16),
    backgroundColor: '#ccc',
    borderRadius: scale(12),
    overflow: 'hidden',
    aspectRatio: 1.5,
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomButton} from '../../../../components';
import {SHADOW, scale} from '../../../../assets/constants';

export default function FooterButton() {
  return (
    <View style={styles.wrapper}>
      <CustomButton
        buttonType="normal"
        styleWrapper={{
          flex: 1,
        }}
        outline
        text="Cancel"
      />
      <CustomButton
        buttonType="normal"
        styleWrapper={{
          flex: 1,
        }}
        text="Tiếp tục"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingVertical: scale(8),
    paddingHorizontal: scale(20),
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    flexDirection: 'row',
    columnGap: scale(20),
  },
});

import React from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {Counter, CustomText} from '../../../../../../components';

export default function Box({title, onChange}) {
  return (
    <View
      style={{
        rowGap: scale(10),
        paddingVertical: scale(5),
      }}>
      <CustomText
        textType="regular"
        style={{
          fontSize: SIZES.xMedium,
          color: COLORS.black,
        }}>
        {title}
      </CustomText>
      <View style={styles.button}>
        <Counter onChange={onChange} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    height: scale(27),
    minWidth: scale(83),
    borderRadius: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
  },
});

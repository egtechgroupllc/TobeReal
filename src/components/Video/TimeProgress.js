import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../CustomText';
import {SIZES, scale} from '../../assets/constants';

export default React.memo(function TimeProgress({timeCurrent, timeTotal}) {
  return (
    <View style={styles.wrapper}>
      <CustomText
        // textType="semiBold"
        style={styles.text}>
        {timeCurrent}
      </CustomText>

      <CustomText
        // textType="semiBold"
        style={{
          color: '#fff',
          fontSize: SIZES.xSmall,
        }}>
        {' '}
        /{' '}
      </CustomText>

      <CustomText
        // textType="semiBold"
        style={styles.text}>
        {timeTotal}
      </CustomText>
    </View>
  );
});
const styles = StyleSheet.create({
  text: {
    color: '#fff',
    //   fontSize: SIZES.xLarge,
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: scale(6),
  },
});

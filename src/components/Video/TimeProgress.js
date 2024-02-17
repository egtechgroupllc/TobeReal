import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../CustomText';
import {SIZES, scale} from '../../assets/constants';

export default React.memo(function TimeProgress({timeCurrent, timeTotal}) {
  return (
    <View style={styles.wrapper}>
      <CustomText textType="medium" style={styles.text}>
        {timeCurrent}
      </CustomText>

      <CustomText
        textType="medium"
        style={{
          color: '#fff',
          fontSize: SIZES.small,
        }}>
        {' '}
        /{' '}
      </CustomText>

      <CustomText
        textType="medium"
        style={{
          ...styles.text,
          color: '#ffffffaF',
        }}>
        {timeTotal}
      </CustomText>
    </View>
  );
});
const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: scale(22),
    letterSpacing: 2,
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: scale(6),
  },
});

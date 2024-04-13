import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/CustomText';
import {COLORS, scale} from '../../../../assets/constants';

export default function RulesPostImg() {
  return (
    <View
      style={{
        width: '100%',
      }}>
      <CustomText
        textType="semiBold"
        style={{marginBottom: scale(6), color: COLORS.white}}>
        - Rules for posting pictures:
      </CustomText>
      <CustomText style={styles.color}>• Post a minimum of 4 photos</CustomText>
      <CustomText style={styles.color}>
        • Post up to 24 photos with all types of stories
      </CustomText>
      <CustomText style={styles.color}>
        • Please use real photos, not fake onesg
      </CustomText>
      <CustomText style={styles.color}>
        • Each photo has a minimum size of 100x100 px
      </CustomText>
      <CustomText style={styles.color}>
        • Describe photo in maximum 45 characters.
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  color: {
    color: COLORS.white,
  },
});

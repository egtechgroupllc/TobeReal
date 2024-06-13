import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../../assets/constants';

export default function BoxItem({
  icon,
  label,
  name,
  labelBottom,
  onPress,
  style,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.boxItem}
      onPress={onPress}>
      {icon}
      <View
        style={{
          rowGap: scale(4),
        }}>
        <CustomText
          style={{
            color: COLORS.textSub,
          }}>
          {label}
        </CustomText>
        <CustomText
          textType="medium"
          style={{
            fontSize: SIZES.xMedium,
          }}>
          {name}
        </CustomText>
        {labelBottom && (
          <CustomText
            style={{
              color: COLORS.textSub,
            }}>
            {labelBottom}
          </CustomText>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boxItem: {
    flexDirection: 'row',
    columnGap: scale(10),
    borderBottomWidth: 1,
    paddingBottom: scale(6),
    borderBottomColor: COLORS.grey90,
  },
  icon: {
    width: scale(20),
    height: scale(20),
  },
});

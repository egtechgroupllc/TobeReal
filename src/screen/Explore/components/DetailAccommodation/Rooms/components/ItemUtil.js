import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';

export default function ItemUtil({
  value,
  title,
  Icon,
  color,
  backgroundColor,
  styleWrapper,
  styleIcon,
  vertical,
  valueBold,
}) {
  return (
    <View
      style={{
        ...styles.boxIcon,
        backgroundColor,
        ...styleWrapper,
        alignItems: title ? 'flex-start' : 'center',
        flexDirection: vertical ? 'column' : 'row',
      }}>
      {Icon && (
        <Icon
          fill={styleIcon?.color || color || '#aaa'}
          style={{
            width: scale(13),
            height: scale(13),
            ...styleIcon,
          }}
        />
      )}
      <View
        style={{
          rowGap: scale(2),
        }}>
        {title && (
          <CustomText
            textType="semiBold"
            style={{
              color: color,
              fontSize: SIZES.xMedium,
            }}>
            {title}
          </CustomText>
        )}
        <CustomText
          textType={valueBold && 'medium'}
          style={{
            color: color,
          }}>
          {value}
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxIcon: {
    flexDirection: 'row',
    gap: scale(6),
    alignSelf: 'flex-start',
    padding: scale(4),
  },
});

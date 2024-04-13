import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import CustomText from '../../../../../../components/CustomText';
import {
  COLORS,
  SHADOW,
  SIZES,
  images,
  scale,
} from '../../../../../../assets/constants';
import Star from '../../../../../../components/Star';
import CustomImage from '../../../../../../components/CustomImage';

export default function ItemBox({
  style,
  numberOfLines = 5,
  isShadow = true,
  color,
  data,
}) {
  return (
    <View
      style={[
        styles.content,
        isShadow && {
          backgroundColor: COLORS.box,
          ...SHADOW,
        },
        style,
      ]}>
      <View style={styles.infoCustomer}>
        <CustomImage
          resizeMode="contain"
          source={images.avatar}
          style={styles.avatar}
        />
        <View>
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
              flex: 1,
              color: color,
            }}
            numberOfLines={1}>
            {data?.user}
          </CustomText>

          <Star rating={4.5} />
        </View>
      </View>

      <CustomText
        textType="medium"
        style={{fontSize: SIZES.xMedium, color: color}}
        numberOfLines={numberOfLines}>
        {data?.content}
      </CustomText>

      <CustomText
        textType="regular"
        style={{fontSize: SIZES.small, marginTop: 'auto', color: color}}>
        {data?.date}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: scale(400 / 1.4),
    padding: scale(12),
    borderRadius: scale(12),
    rowGap: scale(10),
    marginBottom: scale(2),
  },
  infoCustomer: {
    flexDirection: 'row',
    columnGap: scale(10),
  },
  avatar: {
    width: scale(30),
    aspectRatio: 1,
    borderRadius: 999,
  },
});

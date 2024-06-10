import React from 'react';
import {StyleSheet, View} from 'react-native';

import {SHADOW, SIZES, images, scale} from '../../../../../../assets/constants';
import CustomImage from '../../../../../../components/CustomImage';
import CustomText from '../../../../../../components/CustomText';
import StarRating from '../../../../../../components/StarRating';

export default function ItemBox({style, numberOfLines = 5, isShadow = true}) {
  return (
    <View
      style={[
        styles.content,
        isShadow && {
          backgroundColor: '#fff',
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
            }}
            numberOfLines={1}>
            David
          </CustomText>

          <StarRating rating={4.5} />
        </View>
      </View>

      <CustomText
        textType="medium"
        style={{fontSize: SIZES.xMedium}}
        numberOfLines={numberOfLines}>
        Good
      </CustomText>

      <CustomText
        textType="regular"
        style={{fontSize: SIZES.small, marginTop: 'auto'}}>
        27-04-2023 21:08
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

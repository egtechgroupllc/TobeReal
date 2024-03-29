import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import CustomText from '../../../../../../components/CustomText';
import {SHADOW, SIZES, images, scale} from '../../../../../../assets/constants';
import Star from '../../../../../../components/Star';
import CustomImage from '../../../../../../components/CustomImage';

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
            Tuan Kiet
          </CustomText>

          <Star rating={4.5} />
        </View>
      </View>

      <CustomText
        textType="medium"
        style={{fontSize: SIZES.xMedium}}
        numberOfLines={numberOfLines}>
        Central location, friendly staff, full and delicious buffet breakfast.
        I really like the hotel's shower gel and shampoo! tasty. I really like
        hotel shower gel and shampoo! really liked the customer's shower gel and shampoo
        hotel! really liked the hotel's shower gel and shampoo!
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

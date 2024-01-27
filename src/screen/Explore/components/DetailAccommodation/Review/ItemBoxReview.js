import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import {SHADOW, SIZES, scale} from '../../../../../assets/constants';
import Star from '../../../../../components/Star';

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
          src="https://down-vn.img.susercontent.com/file/sg-11134004-23030-djahbs14w9nv5f_tn"
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
        Vị trí trung tâm, nhân viên thân thiện, ăn sáng buffet đầy đủ và ngon.
        Mình rất thích sữa tắm và dầu gội của khách sạn! ngon. Mình rất thích
        sữa tắm và dầu gội của khách sạn! rất thích sữa tắm và dầu gội của khách
        sạn! rất thích sữa tắm và dầu gội của khách sạn!
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

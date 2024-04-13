import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../../../components/CustomText';
import {
  COLORS,
  SHADOW,
  SIZES,
  images,
  scale,
} from '../../../../../../assets/constants';
import CustomImage from '../../../../../../components/CustomImage';
export default function ItemBox({
  style,
  isShadow = true,
  image,
  title,
  acreage,
  info,
  description,
  onPress,
  price,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.content,
        isShadow && {
          backgroundColor: '#ECECEC',
          ...SHADOW,
        },
        style,
      ]}
      onPress={onPress}>
      {/* <View style={styles.infoCustomer}>
     
        <View>
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
              flex: 1,
            }}
            numberOfLines={1}>
             Now Travel
          </CustomText>

          <Star rating={4.5} />
        </View>
      </View> */}
      <CustomText
        textType="semiBold"
        style={{fontSize: SIZES.large, alignSelf: 'center'}}>
        {title}
      </CustomText>

      <CustomImage resizeMode="contain" source={image} style={styles.image} />
      <CustomText textType="bold" style={{fontSize: SIZES.small}}>
        {description}
      </CustomText>
      <CustomText
        textType="semiBold"
        style={{fontSize: SIZES.small, marginTop: 'auto'}}>
        {acreage}
      </CustomText>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CustomText
          textType="medium"
          style={{fontSize: SIZES.small, marginTop: 'auto'}}>
          {info}
        </CustomText>
        {/* <CustomText
        textType="medium"
        style={{fontSize: SIZES.small, marginTop: 'auto', color:COLORS.primary}}>
         See details
      </CustomText> */}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CustomText
          textType="bold"
          style={{
            fontSize: SIZES.large,
            marginTop: 'auto',
            color: COLORS.primary,
          }}>
          {price}
        </CustomText>
        <CustomText
          textType="medium"
          style={{
            fontSize: SIZES.small,
            marginTop: 'auto',
            color: COLORS.primary,
          }}>
          See details
        </CustomText>
      </View>
    </TouchableOpacity>
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
  image: {
    width: '100%',
    // aspectRatio: 1,
    borderRadius: 15,
    height: scale(200),
  },
});

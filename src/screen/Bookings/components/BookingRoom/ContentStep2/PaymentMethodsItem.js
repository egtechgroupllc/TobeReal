import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  SHADOW,
  SIZES,
  images,
  scale,
} from '../../../../../assets/constants';
import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';

export default function PaymentMethodsItem({
  header,
  title,
  desc,
  backgroundColor = '#f2f3f3',
  tag,
  isDot,
  isShadow,
  onPress,
  image,
  descColor,
  titleColor,
}) {
  return (
    <View
      style={
        header && {
          rowGap: scale(10),
        }
      }>
      {header && (
        <CustomText
          textType="bold"
          size={SIZES.xMedium}
          style={{color: COLORS.black}}>
          {header}
        </CustomText>
      )}
      <View
        style={[
          styles.boxItem,
          {backgroundColor: backgroundColor},
          isShadow && SHADOW,
        ]}>
        {tag && (
          <View style={styles.tag}>
            <CustomText textType="semiBold" size={SIZES.xSmall} color="#fff">
              {tag}
            </CustomText>
          </View>
        )}

        <TouchableOpacity
          style={[styles.boxItemContent]}
          disabled={!onPress}
          activeOpacity={0.7}
          onPress={onPress}>
          <View style={styles.left}>
            <CustomImage
              source={image}
              style={styles.img}
              resizeMode="contain"
            />
            <View style={{rowGap: scale(4)}}>
              <CustomText
                textType="semiBold"
                size={scale(13)}
                style={{color: titleColor || COLORS.white}}>
                {title}
              </CustomText>
              {desc && (
                <CustomText
                  color={COLORS.text}
                  textType="medium"
                  style={{color: descColor || COLORS.white}}>
                  {desc}
                </CustomText>
              )}
            </View>
          </View>
          <View />
          {isDot && (
            <View style={styles.radio}>
              <View style={styles.dot} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxItem: {
    borderRadius: scale(8),
    alignItems: 'flex-start',
  },
  boxItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    padding: scale(10),
    borderRadius: scale(8),
  },
  tag: {
    borderBottomRightRadius: scale(5),
    borderTopLeftRadius: scale(5),
    padding: scale(3),
    backgroundColor: COLORS.green,
  },
  img: {
    width: scale(35),
    height: scale(35),
    // borderRadius: scale(6),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(8),
  },
  radio: {
    height: scale(20),
    aspectRatio: 1,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: '70%',
    aspectRatio: 1,
    borderRadius: 99,
    backgroundColor: COLORS.primary,
  },
});

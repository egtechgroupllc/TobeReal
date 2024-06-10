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

export default function NotifyItems({
  header,
  title,
  desc,
  backgroundColor = '#ffffff30',
  tag,
  isDot,
  isShadow,
  onPress,
  data,
}) {
  return (
    <View
      style={
        header && {
          rowGap: scale(10),
        }
      }>
      <View
        style={[
          styles.boxItem,
          {backgroundColor: backgroundColor},
          isShadow && SHADOW,
        ]}>
        {/* <CustomText textType="bold" size={SIZES.xMedium}>
          {data?.title}
        </CustomText> */}

        <View style={styles.tag}>
          <CustomText textType="semiBold" size={SIZES.xSmall} color="#fff">
            {data?.type}
          </CustomText>
        </View>

        <TouchableOpacity
          style={[styles.boxItemContent]}
          disabled={!onPress}
          activeOpacity={0.7}
          onPress={onPress}>
          <View style={styles.left}>
            <CustomImage
              source={images.logo1}
              style={styles.img}
              resizeMode="contain"
            />
            <View style={{rowGap: scale(4), flex: 1}}>
              {/* <CustomText textType="semiBold" size={scale(13)}>
                {data?.title}
              </CustomText> */}
              <CustomText
                color={COLORS.white}
                textType="medium"
                // style={{flex: 1}}
                numberOfLines={3}>
                {data?.desc}
              </CustomText>
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
    backgroundColor: COLORS.primary,
  },
  img: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(6),
  },
  left: {
    flexDirection: 'row',
    // alignItems: 'center',
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

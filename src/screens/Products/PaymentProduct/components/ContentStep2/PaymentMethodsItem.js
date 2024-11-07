import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES} from '~/assets/constants';
import {CImage, CText} from '~/components';
import {scale} from '~/utils/scale';

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
  styleBox,
}) {
  return (
    <View
      style={
        header && {
          rowGap: scale(10),
        }
      }>
      {header && (
        <CText
          textType="bold"
          size={SIZES.xMedium}
          style={{color: COLORS.whiteSemi}}>
          {header}
        </CText>
      )}
      <View
        style={[
          styles.boxItem,
          {backgroundColor: backgroundColor},
          styleBox,
          isShadow && SHADOW,
        ]}>
        {tag && (
          <View style={styles.tag}>
            <CText textType="semiBold" size={SIZES.xSmall} color="#fff">
              {tag}
            </CText>
          </View>
        )}

        <TouchableOpacity
          style={[styles.boxItemContent]}
          disabled={!onPress}
          activeOpacity={0.7}
          onPress={onPress}>
          <View style={styles.left}>
            <CImage source={image} style={styles.img} resizeMode="contain" />
            <View style={{rowGap: scale(4)}}>
              <CText
                textType="semiBold"
                size={scale(13)}
                style={{color: COLORS.White}}>
                {title}
              </CText>
              {desc && (
                <CText color={COLORS.White} textType="medium">
                  {desc}
                </CText>
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
    borderWidth: scale(1),
    borderColor: COLORS.overlay,
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
    backgroundColor: COLORS.cyan,
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
    borderColor: COLORS.White,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: '70%',
    aspectRatio: 1,
    borderRadius: 99,
    backgroundColor: COLORS.cyan,
  },
});

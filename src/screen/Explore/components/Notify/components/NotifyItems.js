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
import {formatTimeAgo} from '../../../../../utils/format';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {replaceTranslateKey} from '../../../../../utils/replaceTranslateKey';

export default function NotifyItems({
  header,
  title,
  desc,
  backgroundColor = '#fff',
  tag,
  isDot,
  isShadow,
  onPress,
  data,
  t,
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

        <View style={{...styles.tag}}>
          <CustomText textType="semiBold" size={SIZES.xSmall} color="#fff">
            {t(data?.title)}
          </CustomText>
        </View>
        {!data?.is_seen && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              width: scale(12),
              height: scale(12),
              borderRadius: scale(10),
              right: scale(-5),
              top: scale(-5),
              borderWidth: scale(3),
              borderColor: COLORS.white70,
            }}
          />
        )}
        <TouchableOpacity
          style={[styles.boxItemContent]}
          disabled={!onPress}
          activeOpacity={0.7}
          onPress={onPress}>
          <View style={{...styles.left, alignItems: 'center'}}>
            <CustomImage source={images.logo1} style={styles.img} />
            <View style={{rowGap: scale(4), flex: 1}}>
              {/* <CustomText textType="semiBold" size={scale(13)}>
                {data?.content}
              </CustomText> */}
              <CustomText
                color={COLORS.text}
                textType={!data?.is_seen ? 'bold' : 'medium'}
                // style={{flex: 1}}
                numberOfLines={3}>
                {replaceTranslateKey(
                  t(data?.content),
                  data?.content_replacements,
                )}
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
        <CustomText
          color={COLORS.grey}
          textType={'medium'}
          style={{
            alignSelf: 'flex-end',
            paddingBottom: scale(5),
            paddingHorizontal: scale(10),
            top: scale(-5),
          }}
          numberOfLines={3}>
          {formatTimeAgo(data?.createdAt)}
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxItem: {
    borderRadius: scale(8),
    alignItems: 'flex-start',
    ...SHADOW,
  },
  boxItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    padding: scale(5),
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

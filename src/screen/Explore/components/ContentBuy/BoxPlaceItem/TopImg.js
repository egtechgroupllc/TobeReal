import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import RatingBox from './RatingBox';
import {IconHeart, IconMarker} from '../../../../../assets/icon/Icon';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import CustomText from '../../../../../components/CustomText';
import Favourite from '../../../../components/Favourite';
import LinearGradient from 'react-native-linear-gradient';
import Star from '../../../../../components/StarRating';
import {formatPrice} from '../../../../../utils/format';

export default function TopImg({
  rating,
  isStar,
  textRating,
  isHeart,
  feature,
  showPrice,
  data,
  level,
}) {
  const dataPackagePost = data?.package_post_item?.package_post;
  return (
    <View style={styles.top}>
      <View style={styles.topLeft}>
        {/* {!!rating && !isStar && (
          <RatingBox rating={rating} textRating={textRating} />
        )} */}
        {feature && (
          <LinearGradient
            colors={['#F0B90B', '#D88A00']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.topBox}>
            <CustomText style={styles.topName}>
              {data?.estate_type?.name}
            </CustomText>
          </LinearGradient>
        )}
        {showPrice && (
          <View
            style={{
              ...styles.topBox,
              backgroundColor: '#234F68B0',
              position: 'absolute',
              marginTop: scale(105),
              width: scale(100),
            }}>
            <CustomText style={styles.topName} numberOfLines={1}>
              {formatPrice(data?.price, {
                locales: 'vi',
              })}{' '}
            </CustomText>
          </View>
        )}
      </View>
      {/* {isStar && (
        <View style={{position: 'absolute', top: scale(255)}}>
          <Star rating={3} />
        </View>
      )} */}
      {isHeart && <Favourite />}
      {level && (
        <View
          style={{
            backgroundColor:
              dataPackagePost?.level === 2
                ? '#009ba1'
                : dataPackagePost?.level === 3
                ? COLORS.primary
                : dataPackagePost?.level === 4
                ? COLORS.error
                : '#ccc',
            padding: scale(3),
            position: 'absolute',
            borderRadius: scale(3),
            left: scale(-3),
            top: scale(-3),
          }}>
          <CustomText textType="semiBold" style={{color: COLORS.white}}>
            {dataPackagePost?.name}
          </CustomText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    width: '100%',
    height: '90%',
    padding: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  topLeft: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: '100%',
  },
  topBox: {
    marginTop: scale(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0B90B',
    paddingHorizontal: scale(6),
    paddingVertical: scale(4),
    borderRadius: 8,
    height: scale(27),
    width: scale(70),
    // columnGap: scale(4),
  },
  boxIcon: {
    backgroundColor: '#fff',
    padding: scale(4),
    borderRadius: scale(6),
    // height: scale(26),
    // justifyContent: 'center',
  },
  topName: {
    fontSize: SIZES.xSmall,
    color: COLORS.white,
  },
});

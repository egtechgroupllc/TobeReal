import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {IconHeart, IconMarker} from '../../../../../assets/icon/Icon';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import CustomText from '../../../components/CustomText';
import Favourite from '../../components/Favourite';
import LinearGradient from 'react-native-linear-gradient';
import {formatPrice} from '../../../utils/format';

export default function TopImg({isHeart, feature, showPrice, data, type}) {
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
            <CustomText style={styles.topName}>{type}</CustomText>
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
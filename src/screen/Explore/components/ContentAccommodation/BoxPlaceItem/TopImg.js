import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import RatingBox from './RatingBox';
import {IconHeart, IconMarker} from '../../../../../assets/icon/Icon';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import CustomText from '../../../../../components/CustomText';
import Favourite from '../../../../components/Favourite';

export default function TopImg({rating, isStar, textRating, isHeart, type}) {
  return (
    <View style={styles.top}>
      <View style={styles.topLeft}>
        {!!rating && !isStar && (
          <RatingBox rating={rating} textRating={textRating} />
        )}

        <View style={styles.topBox}>
          <IconMarker
            fill={COLORS.black}
            style={{
              width: scale(10),
              height: scale(10),
            }}
          />
          <CustomText style={styles.topName}>{type}</CustomText>
        </View>
      </View>

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
    backgroundColor: '#ffffffA0',
    paddingHorizontal: scale(6),
    paddingVertical: scale(4),
    borderRadius: 99,
    columnGap: scale(4),
    ...SHADOW,
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
    color: COLORS.black,
  },
});

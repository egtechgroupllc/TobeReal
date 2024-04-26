import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import {
  IconHome,
  IconLocation,
  IconMarker,
  IconMyLocation,
  IconRoom,
} from '../../../../../assets/icon/Icon';
import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import Introduction from './Introduction';
import Star from '../../../../../components/Star';
import {formatNumber} from '../../../../../utils/format';

export default function InfoDetail({data}) {
  const {t} = useLanguage();

  return (
    <View>
      <View style={styles.wrapper}>
        <CustomText textType="semiBold" style={styles.name} numberOfLines={2}>
          {data.name}
        </CustomText>

        <View style={styles.room}>
          <View style={styles.boxRoom}>
            <CustomText
              textType="semiBold"
              style={{
                color: '#7906f6',
              }}>
              {data.accommodation_type.name}
            </CustomText>
          </View>
          {data.review_average ? (
            <Star rating={data.review_average} />
          ) : (
            <CustomText textType="regular">
              (There are no reviews yet)
            </CustomText>
          )}
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            flexDirection: 'row',
          }}>
          <IconLocation
            fill={COLORS.text}
            style={{
              width: scale(15),
              height: scale(15),
            }}
          />
          <CustomText textType="regular" numberOfLines={2}>
            {' '}
            {data.address}
          </CustomText>
        </View>

        <View style={styles.room}>
          <View style={[styles.boxMore, styles.rating]}>
            <CustomText
              style={{color: COLORS.white, lineHeight: 18}}
              textType="bold">
              {t('new')}
            </CustomText>
          </View>
          <View style={styles.boxMore}>
            <CustomText textType="bold">
              {t('discussion')} ({formatNumber(data?.review_count)})
            </CustomText>
          </View>
          <TouchableOpacity>
            <CustomImage
              source={images.iconTiktok}
              style={{width: scale(20), height: scale(20)}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <CustomImage
              source={images.iconYoutube}
              style={{width: scale(20), height: scale(20)}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Introduction data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // width: WIDTH.widthContain,
    rowGap: scale(8),
    backgroundColor: '#fff',
    padding: scale(16),
    paddingBottom: scale(4),
  },

  name: {flex: 1, fontSize: SIZES.xMedium},

  room: {
    flexDirection: 'row',
    columnGap: scale(10),
    rowGap: scale(6),
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  boxRoom: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(4),
    backgroundColor: '#9681fA90',
    padding: scale(4),
    borderRadius: scale(6),
  },
  icon: {
    width: scale(16),
    height: scale(16),
  },
  boxMore: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: scale(6),
    padding: scale(5),
    overflow: 'hidden',
  },
  rating: {
    borderWidth: 0,
    backgroundColor: '#de4e4e',
  },
});

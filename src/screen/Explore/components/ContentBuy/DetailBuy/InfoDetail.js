import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import {
  IconBed,
  IconBookings,
  IconClock,
  IconDirection,
  IconFurniture,
  IconLocation,
  IconRoom,
} from '../../../../../assets/icon/Icon';

import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import calculateTimeElapsed from '../../../../../utils/calculateTimeElapsed';
import {formatPrice} from '../../../../../utils/format';
import InfoItem from './Info/InfoItem';
import Facilities from './Info/Facilities';
// import Introduction from './Introduction';

export default function InfoDetail({data, price}) {
  const {t} = useLanguage();

  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <CustomText textType="semiBold" style={styles.name}>
            {data?.title}
          </CustomText>
        </View>

        <View style={styles.room}>
          <View style={styles.boxRoom}>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.white,
              }}>
              {data?.estate_type?.name}
            </CustomText>
          </View>

          {/* <StarRating rating={4} />

          <CustomText textType="medium">(10 Evaluate)</CustomText> */}
          <TouchableOpacity activeOpacity={0.7}>
            <CustomImage
              source={images.iconTiktok}
              style={{width: scale(20), height: scale(20)}}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <CustomImage
              source={images.iconYoutube}
              style={{width: scale(20), height: scale(20)}}
            />
          </TouchableOpacity>
          <CustomText textType="medium" style={styles.text1}>
            {t('watch_the_most')}
          </CustomText>
        </View>

        <InfoItem
          Icon={IconLocation}
          value={data?.address}
          styleIcon={{
            width: scale(14),
            height: scale(14),
          }}
        />

        {new Date() - new Date(data?.date_start) > 0 && (
          <InfoItem
            Icon={IconClock}
            value={calculateTimeElapsed(data.date_start)}
            styleIcon={{
              width: scale(14),
              height: scale(14),
            }}
          />
        )}
      </View>

      <Facilities data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    rowGap: scale(8),
    // backgroundColor: '#fff',
    padding: scale(16),
    paddingBottom: scale(4),
  },
  header: {
    flexDirection: 'row',
  },

  name: {fontSize: SIZES.medium, color: COLORS.white},
  text1: {fontSize: SIZES.xxSmall, color: COLORS.white, width: '30%'},

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
});

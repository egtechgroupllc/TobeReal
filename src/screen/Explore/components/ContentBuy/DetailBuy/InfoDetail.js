import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import {
  IconAcreage,
  IconBed,
  IconBookings,
  IconCalendar,
  IconClock,
  IconDirection,
  IconFurniture,
  IconLocation,
  IconMapView,
  IconRoom,
} from '../../../../../assets/icon/Icon';

import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import Star from '../../../../../components/Star';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {formatPrice} from '../../../../../utils/format';
import Introduction from '../../DetailAccommodation/Introduction';
import InfoItem from './Info/InfoItem';
import TicketOption from '../../ContentTour/DetailTour/TicketOption';
import calculateTimeElapsed from '../../../../../utils/calculateTimeElapsed';
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
          <Star />

          <CustomText textType="medium" style={{color: COLORS.white}}>
            (10 Evaluate)
          </CustomText>
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

        <View style={styles.itemHear}>
          <IconLocation
            width={scale(14)}
            height={scale(14)}
            fill={COLORS.white}
          />
          <CustomText textType="regular" style={{flex: 1, color: COLORS.white}}>
            {data?.address}
          </CustomText>
        </View>

        <View style={styles.itemHear}>
          <IconClock width={scale(14)} height={scale(14)} fill={COLORS.white} />
          <CustomText textType="regular" style={{flex: 1, color: COLORS.white}}>
            {calculateTimeElapsed(data.createdAt)}
          </CustomText>
        </View>
      </View>

      {/* <View style={styles.line}></View> */}
      <View style={styles.boxTourTime}>
        <View
          style={{
            backgroundColor: COLORS.theme,
            height: scale(10),
          }}
        />
        <View
          style={{
            paddingHorizontal: scale(20),
          }}>
          <View style={styles.listInfo}>
            <CustomText textType="semiBold" style={{color: COLORS.white}}>
              {t('Price')}:{' '}
              <CustomText
                textType="bold"
                style={{...styles.name, color: COLORS.primary}}>
                {formatPrice(data?.price, {
                  locales: 'en',
                })}
              </CustomText>
            </CustomText>

            <CustomText textType="regular" style={{color: COLORS.white}}>
              {t('Acreage')}:{' '}
              <CustomText textType="semiBold" style={styles.name}>
                {formatPrice(data?.size, {unit: 'm²'})}
              </CustomText>
            </CustomText>
          </View>

          <View style={styles.line} />
          <View
            style={{
              justifyContent: 'space-between',
              marginTop: scale(10),
              rowGap: scale(7),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <InfoItem
                Icon={IconRoom}
                name={t('Bedroom')}
                value={3}
                styleIcon={{
                  height: scale(16),
                }}
              />
              <InfoItem Icon={IconBed} name={t('Toilet')} value={3} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <InfoItem
                Icon={IconAcreage}
                name={t('Acreage')}
                value={formatPrice(data?.size, {unit: 'm²'})}
                styleIcon={{
                  width: scale(20),
                  height: scale(20),
                }}
              />
              <InfoItem
                Icon={IconFurniture}
                name={t('Interior')}
                value={data?.furnish}
              />
            </View>

            <InfoItem
              Icon={IconDirection}
              name={t('House direction')}
              value={data?.direction_main}
              styleIcon={{
                height: scale(16),
              }}
            />
            <InfoItem
              Icon={IconBookings}
              name={t('Juridical')}
              value={data?.legal_documents}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: COLORS.theme,
          height: scale(10),
        }}
      />
      <Introduction data={data} />
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
  itemHear: {
    flexDirection: 'row',
    alignItems: 'center  ',
    columnGap: scale(5),
  },
  name: {fontSize: SIZES.medium, color: COLORS.white},
  text1: {fontSize: SIZES.xxSmall, width: '30%', color: COLORS.white},
  line: {
    width: '100%',
    height: scale(1),
    backgroundColor: COLORS.grey,
  },
  listInfo: {
    flexDirection: 'row',
    paddingBottom: scale(6),
    paddingTop: scale(12),
    justifyContent: 'space-between',
  },
  boxTourTime: {
    // backgroundColor: COLORS.transparentGrey,
    minHeight: scale(50),
    paddingVertical: scale(10),
  },
  boxHot: {
    backgroundColor: '#9681fA',
    paddingHorizontal: scale(6),
    paddingVertical: scale(4),
    borderRadius: scale(6),
    maxWidth: scale(110),
  },

  room: {
    flexDirection: 'row',
    columnGap: scale(10),
    rowGap: scale(6),
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import {
  IconAcreage,
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
import Star from '../../../../../components/Star';
import {useLanguage} from '../../../../../hooks/useLanguage';
import calculateTimeElapsed from '../../../../../utils/calculateTimeElapsed';
import {formatPrice} from '../../../../../utils/format';
import Introduction from '../../DetailAccommodation/Detail/Introduction';
import InfoItem from './Info/InfoItem';
// import Introduction from './Introduction';

export default function InfoDetail({data, price}) {
  const {t} = useLanguage();
  console.log(data);
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
                color: '#7906f6',
              }}>
              {data?.accommodation_type?.name}
            </CustomText>
          </View>

          <Star rating={4} />

          <CustomText textType="medium">(10 Evaluate)</CustomText>
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
          <IconLocation width={scale(14)} height={scale(14)} />
          <CustomText textType="regular" style={{flex: 1}}>
            {data?.address}
          </CustomText>
        </View>

        {new Date() - new Date(data.date_start) > 0 && (
          <View style={styles.itemHear}>
            <IconClock width={scale(14)} height={scale(14)} fill={'#ccc'} />
            <CustomText textType="regular" style={{flex: 1}}>
              {calculateTimeElapsed(data.date_start)}
            </CustomText>
          </View>
        )}
      </View>

      {/* <View style={styles.line}></View> */}
      <View style={styles.boxTourTime}>
        <View
          style={{
            backgroundColor: '#F5F5F5',
            height: scale(10),
          }}
        />
        <View
          style={{
            paddingHorizontal: scale(20),
          }}>
          <View style={styles.listInfo}>
            <CustomText textType="semiBold" style={{color: COLORS.black}}>
              {t('Price')}:{' '}
              <CustomText
                textType="bold"
                style={{...styles.name, color: COLORS.primary}}>
                {formatPrice(data?.price, {
                  locales: 'vi',
                })}
              </CustomText>
            </CustomText>

            <CustomText textType="regular" style={styles.text}>
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

            {/* <InfoItem
              Icon={IconDirection}
              name={t('House direction')}
              value={data?.direction_main}
              styleIcon={{
                height: scale(16),
              }}
            /> */}
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
          backgroundColor: '#F5F5F5',
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
    backgroundColor: '#fff',
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
  name: {fontSize: SIZES.medium},
  text1: {fontSize: SIZES.xxSmall, width: '30%'},
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
    backgroundColor: COLORS.white,
    minHeight: scale(50),
    paddingVertical: scale(10),
  },

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

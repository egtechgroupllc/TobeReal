import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import {
  IconBed,
  IconCalendar,
  IconClock,
  IconHome,
  IconLand,
  IconMapView,
  IconRoom,
} from '../../../../../assets/icon/Icon';

import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import Introduction from './Introduction';
import CustomImage from '../../../../../components/CustomImage';
import Star from '../../../../../components/Star';
import ChooseCalendar from '../../FindAccommodation/ChooseCalendar';
import TicketOption from './TicketOption';
import {formatPrice} from '../../../../../utils/format';

export default function InfoDetail({name, price}) {
  const {t} = useLanguage();
  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <CustomText textType="semiBold" style={styles.name}>
            {name}
          </CustomText>
        </View>

        <View style={styles.room}>
          <Star />
          <CustomText textType="medium" style={styles.text}>
            (10 Evaluate)
          </CustomText>
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
          <CustomText textType="medium" style={styles.text1}>
            {t('watch_the_most')}
          </CustomText>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.boxTourTime}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: scale(20),
            alignItems: 'center',
          }}>
          <IconMapView
            width={scale(12)}
            height={scale(12)}
            fill={COLORS.primary}></IconMapView>
          <CustomText
            textType="semiBold"
            style={{...styles.text, marginLeft: '2%', color: COLORS.primary}}>
            {t('location')} |
          </CustomText>
          <CustomText
            textType="regular"
            style={{...styles.text, color: COLORS.primary, marginLeft: '1%'}}>
            BC 34, Binh Chuan, Thuan An, Binh Duong
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: scale(20),
            alignItems: 'center',
            marginTop: scale(5),
          }}>
          <IconCalendar width={scale(12)} height={scale(12)}></IconCalendar>
          <CustomText
            textType="semiBold"
            style={{...styles.text, marginLeft: '2%', color: COLORS.black}}>
            {t('Date posted')} |
          </CustomText>
          <CustomText
            textType="regular"
            style={{...styles.text, color: COLORS.black, marginLeft: '1%'}}>
            Thursday, March 14, 2024
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: scale(20),
            alignItems: 'center',
            marginTop: scale(5),
          }}>
          <IconClock width={scale(12)} height={scale(12)}></IconClock>
          <CustomText
            textType="semiBold"
            style={{...styles.text, marginLeft: '2%', color: COLORS.black}}>
            {t('Price')} |
          </CustomText>
          <CustomText
            textType="regular"
            style={{...styles.text, color: COLORS.black, marginLeft: '1%'}}>
            {formatPrice(price, {
              locales: 'vi',
            })}{' '}
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: scale(20),
            alignItems: 'center',
            marginTop: scale(5),
          }}>
          <IconBed width={scale(12)} height={scale(12)} fill={COLORS.primary}/>
          <CustomText
            textType="semiBold"
            style={{...styles.text, marginLeft: '2%', color: COLORS.black}}>
            {t('Bedroom')} |
          </CustomText>
          <CustomText
            textType="regular"
            style={{...styles.text, color: COLORS.black, marginLeft: '1%'}}>
            3
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: scale(20),
            alignItems: 'center',
            marginTop: scale(5),
          }}>
          <IconLand width={scale(12)} height={scale(12)} fill={COLORS.primary}/>
          <CustomText
            textType="semiBold"
            style={{...styles.text, marginLeft: '2%', color: COLORS.black}}>
            {t('Acreage')} |
          </CustomText>
          <CustomText
            textType="regular"
            style={{...styles.text, color: COLORS.black, marginLeft: '1%'}}>
            173m2
          </CustomText>
        </View>
      </View>
      {/* <View style={styles.line}></View>
      <TicketOption/> */}
      <View style={styles.line}></View>
      <Introduction />
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
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
  },
  name: {flex: 1, fontSize: SIZES.xMedium},
  text: {fontSize: SIZES.small, color: COLORS.grey},
  text1: {fontSize: SIZES.xxSmall, width: '30%'},
  line: {
    width: '100%',
    height: scale(1),
    backgroundColor: COLORS.grey,
  },
  boxTourTime: {
    backgroundColor: COLORS.white,
    minHeight: scale(50),
    paddingVertical: scale(20),
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
  boxRoom: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(4),
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

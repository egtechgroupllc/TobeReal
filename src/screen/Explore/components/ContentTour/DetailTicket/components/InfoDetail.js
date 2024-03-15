import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../../../../assets/constants';
import {
  IconCalendar,
  IconClock,
  IconHome,
  IconRefund,
  IconRoom,
} from '../../../../../../assets/icon/Icon';

import CustomText from '../../../../../../components/CustomText';

import CustomImage from '../../../../../../components/CustomImage';

import Introduction from '../../DetailTour/Introduction';
import Star from '../../../../../../components/Star';
import TicketOption from '../../DetailTour/TicketOption';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function InfoDetail({name}) {
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
          <CustomText
            textType="medium"
            style={{...styles.text, color: COLORS.black}}>
            Sightseeing time: 1 day of shuttle service: Welcome time: 06:30 -
            07:30. Free round -trip shuttle from Phuket, Patong, Kalim, Kata,
            Karon, Kamala, Kamala, Siray and Chalong 200 THB applied for round
            -trip shuttle services from these areas in Phuket: (Naihan, Rawai,
            Tri Trang, Panwa, Siray, Cape Yamu, Ao Po, Laguna, Bang Tao, Layan,
            Naimon, Nai Yang and Natai). The additional fee is paid directly to
            the operator in cash.
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
          <IconRefund width={scale(12)} height={scale(12)}></IconRefund>
          <CustomText
            textType="regular"
            style={{
              ...styles.text,
              marginLeft: '2%',
              color: COLORS.black,
              marginRight: '10%',
            }}>
            Easy refund
          </CustomText>
          <IconCalendar width={scale(12)} height={scale(12)}></IconCalendar>
          <CustomText
            textType="regular"
            style={{...styles.text, color: COLORS.black, marginLeft: '1%'}}>
            Easy Reschedule
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: scale(10),
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomText
              textType="semiBold"
              style={{
                ...styles.name2,
                paddingHorizontal: scale(20),
                color: COLORS.primary,
              }}>
              $ 56
            </CustomText>
            <CustomText
              textType="semiBold"
              style={{
                ...styles.name,
                paddingHorizontal: scale(20),
                color: COLORS.grey,
              }}>
              $ 56
            </CustomText>
            <View
              style={{
                ...styles.line,
                position: 'absolute',
                width: '20%',
                left: '70%',
              }}></View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.discount}>
              <CustomText
                textType="semiBold"
                style={{...styles.name, color: COLORS.primary}}>
                -25%
              </CustomText>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.line}></View>
      {/* <View style={styles.line}></View>
      <Introduction /> */}
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
  name: {fontSize: SIZES.xMedium},
  name1: {fontSize: SIZES.xLarge},
  name2: {fontSize: SIZES.xxLarge},
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
  discount: {
    backgroundColor: '#FF00001A',
    height: scale(20),
    width: '35%',
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
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

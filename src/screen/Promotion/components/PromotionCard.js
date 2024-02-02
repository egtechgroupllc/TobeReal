import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES, images, scale} from '../../../assets/constants';
import CustomText from '../../../components/CustomText';
import CustomImage from '../../../components/CustomImage';
import { useLanguage } from '../../../hooks/useLanguage';

export default function PromotionCard({
  discountText,
  image,
  date,
  rental,
  colorTicket,
  isReverse,
}) {
  const {t}= useLanguage()
  const colorTicketStyle = colorTicket || '#F9BF6B';
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          ...styles.ticketLeft,
          borderColor: colorTicketStyle,
          flexDirection: isReverse ? 'row-reverse' : 'row',
        }}>
        <View
          style={{
            ...styles.infoLeft,
            alignItems: isReverse ? 'flex-end' : 'flex-start',
          }}>
          <CustomText
            textType="bold"
            style={{
              fontSize: SIZES.xMedium,
            }}>
            {rental} {t('rental_promotions')}
          </CustomText>

          <View>
            <View
              style={{
                height: 3,
                width: '30%',
                backgroundColor: colorTicketStyle,
                marginVertical: scale(6),
              }}
            />
            <CustomText
              textType="bold"
              style={{
                fontSize: SIZES.xxLarge,
              }}>
              {discountText}%
            </CustomText>
          </View>

          <CustomText
            textType="medium"
            style={{
              fontSize: SIZES.xSmall,
              marginTop: 'auto',
            }}>
            {date}
          </CustomText>
        </View>
        <View style={styles.infoRight}>
          <CustomImage
            source={image}
            resizeMode="contain"
            style={{
              flex: 0.9,
              marginTop: scale(12),
              [isReverse ? 'marginRight' : 'marginLeft']: scale(-30),
            }}
          />
        </View>
      </View>

      <View
        style={{
          ...styles.tickerRight,
          backgroundColor: colorTicketStyle,
        }}>
        <View style={styles.positionDot}>
          <View style={{...styles.dot, borderColor: colorTicketStyle}} />
          <View style={{...styles.dot, borderColor: colorTicketStyle}} />
        </View>
        <CustomText textType="bold" style={styles.discountText}>
          {discountText}%
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: scale(300),
    height: scale(150),
    borderRadius: scale(10),
    flexDirection: 'row',
    overflow: 'hidden',
  },
  ticketLeft: {
    flex: 1,
    borderWidth: 1,
    borderRightWidth: 0,

    // alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: scale(10),
    borderBottomLeftRadius: scale(10),
    padding: scale(10),
  },
  infoLeft: {
    flex: 1,
    rowGap: scale(20),
    justifyContent: 'space-between',
  },
  infoRight: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionDot: {
    position: 'absolute',
    top: scale(-12),
    bottom: scale(-12),
    left: scale(-9),
    borderRadius: scale(99),
    zIndex: 99,
    justifyContent: 'space-between',
  },
  dot: {
    backgroundColor: '#fff',
    height: scale(18),
    aspectRatio: 1,
    borderRadius: scale(99),
    borderLeftWidth: 2,
  },
  tickerRight: {
    flex: 0.2,
    padding: scale(10),
    // overflow: 'hidden',
    justifyContent: 'center',
  },
  discountText: {
    fontSize: SIZES.xxLarge,
    transform: [{rotate: '-90deg'}],
    height: scale(105),
    width: scale(110),
    textAlign: 'center',
    letterSpacing: 2,
    color: '#000',
  },
});

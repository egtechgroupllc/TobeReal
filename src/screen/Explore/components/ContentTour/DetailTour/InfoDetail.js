import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import {
  IconCalendar,
  IconClock,
  IconMapView,
} from '../../../../../assets/icon/Icon';

import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import StarRating from '../../../../../components/StarRating';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {
  formatDateTime,
  formatNumber,
  formatPrice,
} from '../../../../../utils/format';
import Introduction from '../../DetailAccommodation/Detail/Introduction';
import TicketOption from './TicketOption';
import QRCode from 'react-native-qrcode-svg';
import QRWalletBlockChain from '../../../../Profile/components/QRWalletBlockChain';

export default function InfoDetail({data, name, paramsTour}) {
  const {t} = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const calculateDaysAndHours = totalHours => {
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    return {days, hours};
  };
  const result = calculateDaysAndHours(data?.total_hours);
  if (!data?.wallet_address) return null;
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          padding: scale(16),
        }}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <CustomText textType="semiBold" style={styles.name}>
              {data?.name || name}
            </CustomText>
          </View>

          <View style={styles.room}>
            {paramsTour?.review_count > 0 ? (
              <>
                <View
                  style={{
                    backgroundColor: '#013b96',
                    height: scale(30),
                    minWidth: scale(30),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: scale(5),
                    borderBottomLeftRadius: scale(5),
                    paddingHorizontal: scale(5),
                  }}>
                  <CustomText
                    textType="medium"
                    style={{color: COLORS.white, fontSize: SIZES.xMedium}}>
                    {formatPrice(paramsTour?.review_average, {
                      showCurrency: false,
                      decimalPlaces: 2,
                    })}
                  </CustomText>
                </View>
                <View
                  style={{
                    height: scale(30),
                    minWidth: scale(30),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    paddingHorizontal: scale(10),
                    borderColor: COLORS.grey,
                    borderBottomRightRadius: scale(5),
                    borderTopRightRadius: scale(5),
                  }}>
                  <CustomText textType="medium" style={styles.text}>
                    {paramsTour?.review_count} {t('review')}
                  </CustomText>
                </View>
              </>
            ) : (
              <CustomText textType="medium" style={styles.text}>
                ({t('no_review_yet')})
              </CustomText>
            )}
            {/* <TouchableOpacity>
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
          </CustomText> */}
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsOpen(true)}
          style={{
            backgroundColor: COLORS.white70,
            padding: scale(8),
            borderRadius: scale(9),
          }}>
          <QRCode value={data?.wallet_address} size={scale(80)} />
        </TouchableOpacity>
      </View>

      <View style={styles.line} />
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
            fill={COLORS.primary}
          />
          <CustomText
            textType="semiBold"
            style={{...styles.text, marginLeft: '2%', color: COLORS.primary}}>
            {t('location')} |
          </CustomText>
          <CustomText
            textType="regular"
            style={{...styles.text, color: COLORS.primary, marginLeft: '1%'}}>
            {data?.address || ''}
          </CustomText>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: scale(20),
            alignItems: 'center',
            marginTop: scale(5),
          }}>
          <IconCalendar width={scale(12)} height={scale(12)} />
          <CustomText
            textType="semiBold"
            style={{...styles.text, marginLeft: '2%', color: COLORS.black}}>
            {t('lastest_tour')} |
          </CustomText>
          <CustomText
            textType="regular"
            style={{...styles.text, color: COLORS.black, marginLeft: '1%'}}>
            {formatDateTime(data?.tour_tickets?.[0]?.createdAt)}
          </CustomText>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: scale(20),
            alignItems: 'center',
            marginTop: scale(5),
          }}>
          <IconClock width={scale(12)} height={scale(12)} />
          <CustomText
            textType="semiBold"
            style={{...styles.text, marginLeft: '2%', color: COLORS.black}}>
            {t('tour_time')} |
          </CustomText>
          <CustomText
            textType="regular"
            style={{...styles.text, color: COLORS.black, marginLeft: '1%'}}>
            {result.days > 0 && `${result.days} ${t('day')}`} {result.hours}{' '}
            {t('hour')}
          </CustomText>
        </View>
      </View>
      <View style={styles.line} />
      {isOpen && (
        <QRWalletBlockChain
          hotelAddress
          data={data}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <Introduction data={data} />
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    rowGap: scale(8),
    paddingBottom: scale(4),
    width: '70%',
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

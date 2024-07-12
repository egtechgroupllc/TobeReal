import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '../../hooks/useLanguage';
import {CustomText, MainWrapper} from '../../components';
import TimeBookingCheckInOut from './components/DetailBooking/TimeBookingCheckInOut';
import ItemUtil from '../Explore/components/DetailAccommodation/Rooms/components/ItemUtil';
import {
  IconArrowRight,
  IconBan,
  IconPeople,
  IconRoom,
  IconWifi,
} from '../../assets/icon/Icon';
import TotalPriceBooking from './components/DetailBooking/TotalPriceBooking';
import Contact from './components/DetailBooking/Contact';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import ReviewDetail from './Review/ReviewDetail';

export default function DetailReviewScreen() {
  const {t} = useLanguage();
  const data = useRoute().params;
  const objAccmo = data?.accommodation;
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('detail_review'),
    });
  }, []);
  return (
    <>
      <MainWrapper styleContent={styles.wrapper}>
        <View
          style={{
            backgroundColor: COLORS.subPrimary,
            padding: scale(10),
          }}>
          <CustomText textType="bold" size={SIZES.large}>
            {t('detail_review')}
          </CustomText>
          <CustomText size={SIZES.xMedium} color={COLORS.textSub}>
            {t('booking_code')}: {data?.id}
          </CustomText>
          {data.status && (
            <View
              style={{
                ...styles.boxStatus,
                backgroundColor:
                  data.status === 'SUCCESS'
                    ? '#42b00b'
                    : data.status === 'PENDING'
                    ? COLORS.primary
                    : '#e03c31',
              }}>
              <CustomText
                textType="semiBold"
                color={COLORS.white}
                size={SIZES.xSmall}>
                {data.status}
              </CustomText>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View>
            <CustomText textType="bold" size={SIZES.medium}>
              {objAccmo?.name}
            </CustomText>
            <CustomText>{objAccmo?.address}</CustomText>
          </View>

          <TimeBookingCheckInOut data={data} />

          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(50),
            }}>
            <View style={{rowGap: scale(3)}}>
              <CustomText
                textType="bold"
                size={SIZES.xMedium}
                style={{marginBottom: scale(5)}}>
                ({data?.number_room} {t('room')} - {data?.room?.room_type?.name}
                ){'  '} {data?.room?.name}
              </CustomText>

              <ItemUtil
                Icon={IconPeople}
                value={`${data?.room?.max_occupancy} ${t('guest')}`}
                valueBold
                styleTextValue={styles.textValueUntil}
                styleIcon={styles.iconUntil}
              />
              <ItemUtil
                Icon={IconRoom}
                value={`${data?.room?.room_bed_type?.name}`}
                valueBold
                styleTextValue={styles.textValueUntil}
                styleIcon={styles.iconUntil}
              />
              <ItemUtil
                Icon={IconWifi}
                value={`${t('free_wifi')}`}
                valueBold
                styleTextValue={styles.textValueUntil}
                styleIcon={styles.iconUntil}
              />
            </View>
          </View>

          <TotalPriceBooking data={data} />
          <ReviewDetail data={data} />
        </View>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            flex: 1,
            paddingHorizontal: scale(20),
          }}
          onPress={() => navigate('ManageVideoShortScreen', data)}>
          <CustomText
            textType="medium"
            size={SIZES.xMedium}
            color={COLORS.black}
            numberOfLines={1}
            style={{
              textAlign: 'center',
              padding: scale(10),
            }}>
            {t('view_your_video_short_at')} {objAccmo?.name}
          </CustomText>
          <IconArrowRight />
        </TouchableOpacity>
      </MainWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.subPrimary,
    marginHorizontal: scale(12),
    borderRadius: scale(12),
    overflow: 'hidden',
    paddingBottom: scale(0),
    marginVertical: scale(20),
  },
  wrappers: {
    alignItems: 'center',
    justifyContent: 'center',

    flex: 1,
    rowGap: scale(10),
  },
  content: {
    padding: scale(10),
    rowGap: scale(12),
    backgroundColor: '#fff',
    borderBottomLeftRadius: scale(12),
    borderBottomRightRadius: scale(12),
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  boxStatus: {
    position: 'absolute',
    right: 0,
    borderRadius: scale(3),
    padding: scale(3),
  },
  textValueUntil: {
    fontSize: SIZES.xMedium,
    color: COLORS.text,
  },
  iconUntil: {
    width: scale(16),
    height: scale(16),
  },

  iconPolicy: {
    width: scale(18),
    height: scale(18),
  },
});

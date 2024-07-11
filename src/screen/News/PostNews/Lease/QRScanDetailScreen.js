import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import {
  IconBan,
  IconPeople,
  IconRoom,
  IconWifi,
} from '../../../../assets/icon/Icon';
import {CustomText} from '../../../../components';
import MainWrapper from '../../../../components/MainWrapper';
import {useLanguage} from '../../../../hooks/useLanguage';
import ItemUtil from '../../../Explore/components/DetailAccommodation/Rooms/components/ItemUtil';
import Contact from '../../../Bookings/components/DetailBooking/Contact';
import TimeBookingCheckInOut from '../../../Bookings/components/DetailBooking/TimeBookingCheckInOut';
import TotalPriceBooking from '../../../Bookings/components/DetailBooking/TotalPriceBooking';
import {
  postCheckIn,
  postCreateQR,
  postScanQR,
} from '../../../../Model/api/apiAccom';
import {useMutation} from '@tanstack/react-query';
import FooterButton from './components/FooterButton';
import {showMess} from '../../../../assets/constants/Helper';

export default function DetailBookingScreen() {
  const {t} = useLanguage();
  const data = useRoute().params;
  const {navigate, goBack} = useNavigation();
  const checkInMutation = useMutation({
    mutationFn: postCheckIn,
  });
  const handleCheckIn = value => {
    checkInMutation.mutate(
      {id: data?.id, qr_code: data?.qr_code},
      {
        onSuccess: dataInside => {
          if (dataInside?.status) {
            navigate('NoBottomTab', {
              screen: 'CheckInSuccessScreen',
              params: dataInside?.data,
            });
            return;
          }
          showMess(dataInside?.message, 'error');
        },
        onError: err => {
          console.log(err);
        },
      },
    );
  };

  return (
    <>
      <MainWrapper styleContent={styles.wrapper}>
        <View
          style={{
            backgroundColor: COLORS.subPrimary,
            padding: scale(10),
          }}>
          <CustomText textType="bold" size={SIZES.large}>
            {t('booking_detail')}
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
            </View>
          </View>

          <View>
            <CustomText textType="bold" size={SIZES.xMedium}>
              {t('special_request')}
            </CustomText>
            <CustomText
              textType="medium"
              size={SIZES.xMedium}
              color={COLORS.textSub}>
              _
            </CustomText>
          </View>

          <View style={{rowGap: scale(5)}}>
            <CustomText textType="bold" size={SIZES.xMedium}>
              {t('guest_name')}
            </CustomText>
            <CustomText
              textType="medium"
              size={SIZES.xMedium}
              color={COLORS.textSub}>
              {data?.contact_name}
            </CustomText>
          </View>

          <View>
            <ItemUtil
              Icon={IconBan}
              value={`${t('no_refund')}`}
              valueBold
              styleTextValue={styles.textValueUntil}
              styleIcon={styles.iconPolicy}
            />

            <ItemUtil
              Icon={IconBan}
              value={`${t('no_reschedulung')}`}
              valueBold
              styleTextValue={styles.textValueUntil}
              styleIcon={styles.iconPolicy}
            />
          </View>
          <TotalPriceBooking data={data} />
          <Contact data={data} />
        </View>

        <View style={styles.footer}>
          <CustomText
            textType="medium"
            size={SIZES.xMedium}
            color={COLORS.black}
            style={{
              textAlign: 'center',
              paddingTop: scale(12),
              padding: scale(10),
            }}>
            {t('great_choice')}
          </CustomText>
        </View>
      </MainWrapper>
      {data.status == 'SUCCESS' && (
        <FooterButton
          onPressConfirm={() => handleCheckIn()}
          onPressCancel={() => goBack()}
        />
      )}
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

  footer: {},
});

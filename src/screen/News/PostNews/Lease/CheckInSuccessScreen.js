import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '../../../../hooks/useLanguage';
import {IconHome} from '../../../../assets/icon/Icon';
import {
  COLORS,
  SHADOW,
  SIZES,
  images,
  scale,
} from '../../../../assets/constants';
import {
  CustomButton,
  CustomImage,
  CustomText,
  MainWrapper,
} from '../../../../components';
import TotalPriceBooking from '../../../Bookings/components/DetailBooking/TotalPriceBooking';
import Contact from '../../../Bookings/components/DetailBooking/Contact';
import TimeBookingCheckInOut from '../../../Bookings/components/DetailBooking/TimeBookingCheckInOut';

export default function CheckInSuccessScreen() {
  const {t} = useLanguage();
  const data = useRoute().params;
  const {navigate, goBack, setOptions} = useNavigation();
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('check_in_success'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigate('POST', {screen: 'PostNewsScreen'})}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <MainWrapper>
        <CustomImage
          source={images.logoSuccess}
          resizeMode="contain"
          style={{width: scale(120), height: scale(120), alignSelf: 'center'}}
        />
        <View style={styles.wrapper}>
          <View
            style={{
              backgroundColor: COLORS.subPrimary,
              padding: scale(10),
            }}>
            <CustomText textType="bold" size={SIZES.large}>
              {t('booking_detail')}
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
                  ({data?.number_room} {t('room')} -{' '}
                  {data?.room?.room_type?.name}){'  '} {data?.room?.name}
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
        </View>
        <CustomButton
          text={t('confirm')}
          onPress={() => navigate('AccommoManagementScreen')}
          style={{width: '50%'}}
          styleWrapper={{alignSelf: 'center', marginTop: scale(30)}}
        />
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

import {useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import {IconBan, IconPeople, IconRoom, IconWifi} from '../../assets/icon/Icon';
import CustomText from '../../components/CustomText';
import MainWrapper from '../../components/MainWrapper';
import {useLanguage} from '../../hooks/useLanguage';
import ItemUtil from '../Explore/components/DetailAccommodation/Rooms/components/ItemUtil';
import Contact from './components/DetailBooking/Contact';
import FooterButton from './components/DetailBooking/FooterButton';
import TimeBookingCheckInOut from './components/DetailBooking/TimeBookingCheckInOut';
import TotalPriceBooking from './components/DetailBooking/TotalPriceBooking';

export default function DetailBookingScreen() {
  const {t} = useLanguage();
  const data = useRoute().params;
  const objAccmo = data?.accommodation;
  return (
    <>
      <MainWrapper styleContent={styles.wrapper}>
        <View
          style={{
            backgroundColor: '#b5e5fe',
            padding: scale(10),
          }}>
          <CustomText textType="bold" size={SIZES.large}>
            Booking detail
          </CustomText>
          <CustomText size={SIZES.xMedium} color={COLORS.textSub}>
            Booking code: {data?.id}
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
              rowGap: scale(3),
            }}>
            <CustomText
              textType="bold"
              size={SIZES.xMedium}
              style={{marginBottom: scale(5)}}>
              ({data?.number_room} room - {data?.room?.room_type?.name}){'  '}{' '}
              {data?.room?.name}
            </CustomText>

            <ItemUtil
              Icon={IconPeople}
              value={`${data?.room?.max_occupancy} guest`}
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
              value={`Free wifi`}
              valueBold
              styleTextValue={styles.textValueUntil}
              styleIcon={styles.iconUntil}
            />
          </View>

          <View>
            <CustomText textType="bold" size={SIZES.xMedium}>
              Special requests (if any)
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
              Guest name
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
              value={'No refunds'}
              valueBold
              styleTextValue={styles.textValueUntil}
              styleIcon={styles.iconPolicy}
            />

            <ItemUtil
              Icon={IconBan}
              value={'No rescheduling'}
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
            color="#0071ce"
            style={{
              textAlign: 'center',
              paddingTop: scale(12),
              padding: scale(10),
            }}>
            Great choice for your vacation!
          </CustomText>
        </View>
      </MainWrapper>
      {data.status !== 'SUCCESS' && <FooterButton />}
    </>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#baf076',
    marginHorizontal: scale(12),
    borderRadius: scale(12),
    overflow: 'hidden',
    paddingBottom: scale(0),
    marginVertical: scale(20),
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

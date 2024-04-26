import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {SHADOW, SIZES, scale} from '../../../../assets/constants';
import {IconBan, IconBookings} from '../../../../assets/icon/Icon';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import Star from '../../../../components/Star';
import {useLanguage} from '../../../../hooks/useLanguage';
import RoomInformation from '../../../Explore/components/DetailAccommodation/Rooms/DetailRoom/RoomInformation';
import ItemUtil from '../../../Explore/components/DetailAccommodation/Rooms/components/ItemUtil';
import Button from '../../../Profile/components/Button';
import TimeBookingCheckInOut from '../DetailBooking/TimeBookingCheckInOut';
import DetailPriceRoom from './ContentStep1/DetailPriceRoom';
import InfoContact from './ContentStep1/InfoContact';
import {CustomButton} from '../../../../components';
import MainWrapper from '../../../../components/MainWrapper';
export default function ContentStep1({onPress, data}) {
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData(['user', 'profile'])?.data;
  const {t} = useLanguage();
  const navigation = useNavigation();

  const formatDataCheck = {
    check_in_date: data?.date?.selectedStartDate,
    check_out_date: data?.date?.selectedEndDate,
    accommodation: {
      check_in_time_start: data?.check_in_time_start,
      check_in_time_end: data?.check_in_time_end,
      check_out_time_start: data?.check_out_time_start,
      check_out_time_end: data?.check_out_time_end,
    },
  };

  return (
    <MainWrapper styleContent={styles.container}>
      <View style={styles.view}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: scale(10),
            columnGap: scale(10),
          }}>
          <CustomImage
            source={data?.images?.[0].url}
            style={{
              width: scale(80),
              height: scale(80),
              borderRadius: scale(10),
            }}
          />
          <View style={{flex: 1, rowGap: scale(5)}}>
            <CustomText textType="semiBold" size={SIZES.xMedium}>
              {data?.nameAccom}
            </CustomText>
            <CustomText
              textType="semiBold"
              numberOfLines={2}
              size={SIZES.medium}>
              <CustomText textType="semiBold" size={SIZES.xMedium}>
                ({data?.numRoomSelect} phòng){'  '}
              </CustomText>

              {data?.name}
            </CustomText>

            <CustomText textType="semiBold" size={SIZES.xMedium}>
              {data?.room_type?.name}
            </CustomText>
            <Star rating={2} />
          </View>
        </View>

        <View
          style={{
            rowGap: scale(10),
          }}>
          <TimeBookingCheckInOut data={formatDataCheck} />
          <Box
            title={t('room_information')}
            styleContent={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <RoomInformation data={data} />
          </Box>

          <View
            style={{
              backgroundColor: '#f5f5f5',
              borderRadius: scale(9),
              padding: scale(10),
            }}>
            <ItemUtil
              Icon={IconBan}
              value={'Đặt phòng này không được hoàn tiền.'}
              valueBold={'regular'}
            />
            <ItemUtil
              Icon={IconBan}
              value={'Không áp dụng đổi lịch'}
              valueBold={'regular'}
            />
          </View>
        </View>

        <InfoContact data={profile} />

        <Box
          title={t('price_detail')}
          styleContent={{
            borderWidth: 0,
            alignItems: 'stretch',
            gap: scale(0),
          }}>
          <ItemUtil
            Icon={IconBookings}
            title={
              'Thuế và phí là các khoản được Traveloka chuyển trả cho khách sạn. Mọi thắc mắc về thuế và hóa đơn, vui lòng tham khảo Điều khoản và Điều kiện của Saveloka để được giải đáp'
            }
            styleTextTitle={{
              fontSize: SIZES.small,
            }}
            styleIcon={{
              width: scale(16),
              height: scale(16),
            }}
          />
          <DetailPriceRoom data={data} />
        </Box>
      </View>
      <CustomButton
        text={t('book')}
        styleWrapper={{
          width: '80%',
          alignSelf: 'center',
        }}
        linearGradientProps
        styleText={{
          fontSize: SIZES.medium,
        }}
        onPress={onPress}
      />
    </MainWrapper>
  );
}
const Box = ({children, title, styleContent}) => {
  return (
    <View
      style={{
        rowGap: scale(10),
      }}>
      <CustomText
        textType="semiBold"
        style={{
          fontSize: SIZES.xMedium,
        }}>
        {title}:
      </CustomText>
      <View
        style={{
          ...styles.box,
          minHeight: scale(30),
          ...styleContent,
        }}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: scale(20),
    marginVertical: scale(15),
    paddingHorizontal: scale(10),
  },
  view: {
    minHeight: scale(63),
    borderRadius: scale(20),
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    borderWidth: scale(1),
    borderColor: '#F0B90B40',
    backgroundColor: '#FFFFFF',
    ...SHADOW,
    shadowColor: '#F0B90B40',
    rowGap: scale(15),
  },

  box: {
    minHeight: scale(200),
    borderRadius: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    padding: scale(10),
    gap: scale(10),
  },
});

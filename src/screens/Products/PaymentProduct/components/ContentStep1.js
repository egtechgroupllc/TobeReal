import {useNavigation} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

// import RoomInformation from '../../../Explore/components/DetailAccommodation/Rooms/DetailRoom/RoomInformation';
// import ItemUtil from '../../../Explore/components/DetailAccommodation/Rooms/components/ItemUtil';
// import TimeBookingCheckInOut from '../DetailBooking/TimeBookingCheckInOut';
import DetailPriceRoom from './ContentStep1/DetailPrice';
import InfoContact from './ContentStep1/InfoContact';
import {useAuthentication} from '~/hooks/useAuthentication';
import {useLanguage} from '~/hooks/useLanguage';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {scale} from '~/utils/scale';
import {COLORS, images, SHADOW, SIZES} from '~/assets/constants';
import {IconBan, IconBookings} from '~/assets/icon/Icon';
import BottomSheet from '~/components/BottomSheet';
import Counter from '~/components/Counter';
import DetailPrice from './ContentStep1/DetailPrice';
import {formatPrice} from '~/utils/format';
import {getProfile} from '~/api/user';
export default function ContentStep1({onPress, data, onChangeQuantity}) {
  const [isMoreText, setIsMoreText] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [quantitySelect, setQuantitySelect] = useState();
  const bottomSheetRef = useRef();
  const {data: dataProfile, isLoading} = useQuery({
    queryKey: [...getProfile.queryKey],
    queryFn: () => getProfile(),
  });

  const onTextLayout = useCallback(e => {
    if (e.nativeEvent.lines.length > 3 && !isMoreText) {
      setShowMoreButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const queryClient = useQueryClient();
  const {t} = useLanguage();
  const navigation = useNavigation();

  const {token} = useAuthentication();
  // const {isLoading, data: profile} = useQuery({
  //   queryKey: ['user', 'profile'],
  //   queryFn: () => getProfile(token),
  // });

  // const formatDataCheck = {
  //   check_in_date: data?.date?.selectedStartDate,
  //   check_out_date: data?.date?.selectedEndDate,
  //   accommodation: {
  //     check_in_time_start: data?.check_in_time_start,
  //     check_in_time_end: data?.check_in_time_end,
  //     check_out_time_start: data?.check_out_time_start,
  //     check_out_time_end: data?.check_out_time_end,
  //   },
  // };
  useEffect(() => {
    onChangeQuantity && onChangeQuantity(quantitySelect);
  }, [onChangeQuantity, quantitySelect]);

  return (
    <MainWrapper sourceImage={images.backgroundHome}>
      <View style={styles.view}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: scale(10),
            columnGap: scale(10),
          }}>
          <CImage
            source={{uri: data?.documents}}
            style={{
              width: scale(80),
              height: scale(80),
              borderRadius: scale(10),
            }}
          />
          <View style={{flex: 1, rowGap: scale(5)}}>
            <CText
              textType="semiBold"
              numberOfLines={3}
              size={SIZES.medium}
              style={{color: COLORS.White}}>
              {data?.name}
            </CText>
            <CText
              textType="semiBold"
              size={SIZES.medium}
              style={{color: COLORS.cyan}}>
              {formatPrice(data?.price)}
            </CText>
            {/* <StarRating rating={2} /> */}
          </View>
        </View>

        <View
          style={{
            rowGap: scale(10),
          }}>
          {/* <TimeBookingCheckInOut data={formatDataCheck} /> */}
          <Box
            title={t('Product information')}
            styleContent={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <TouchableOpacity
              disabled={!showMoreButton}
              activeOpacity={0.7}
              onPress={() => bottomSheetRef.current.open()}>
              <CText
                onTextLayout={onTextLayout}
                textType="regular"
                numberOfLines={isMoreText ? 0 : 4}
                style={styles.textDesc}>
                {data?.description}
              </CText>
              {!isMoreText && showMoreButton && (
                <CText style={{color: COLORS.cyan}}>Read more</CText>
              )}
            </TouchableOpacity>
            {/* <RoomInformation data={data} /> */}
          </Box>

          {/* <ItemUtil
              Icon={IconBan}
              value={t('booking_non_refund')}
              valueBold={'regular'}
            /> */}
          {/* <ItemUtil
              Icon={IconBan}
              value={t('rescheduling_not_apply')}
              valueBold={'regular'}
            /> */}
        </View>

        <Box
          title={t('Contact information')}
          styleContent={{
            alignItems: 'stretch',
            gap: scale(0),
          }}>
          <InfoContact data={dataProfile?.data} />
        </Box>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <CText
            style={{color: COLORS.White, fontSize: SIZES.small}}
            textType="bold">
            {t('quantity')}:
          </CText>
          <Counter
            editable={false}
            max={data?.quantity > 20 ? 20 : data?.quantity}
            styleWrapper={{
              width: '40%',
            }}
            // value={numRooms > numAdult ? numAdult : numRooms}
            onChange={value => {
              setQuantitySelect(value);
            }}
            min={1}
          />
        </View>
        <Box
          title={t('price_detail')}
          styleContent={{
            alignItems: 'stretch',
            gap: scale(0),
          }}>
          {/* <ItemUtil
            Icon={IconBookings}
            title={t('tax_and_fee')}
            styleTextTitle={{
              fontSize: SIZES.small,
            }}
            styleIcon={{
              width: scale(16),
              height: scale(16),
            }}
          /> */}
          <DetailPrice data={data} quantitySelect={quantitySelect} />
        </Box>
      </View>
      <View style={{width: '70%', marginTop: scale(20), alignSelf: 'center'}}>
        <Button
          title={t('book')}
          linearGradientProps={{
            colors: COLORS.linearButton,
          }}
          styleText={{
            fontSize: SIZES.medium,
          }}
          onPress={onPress}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['50%', '80%']}
        titleIndicator={t('contact_info')}
        // onDismiss={!apply && reset}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(16),
        }}>
        <CText>{data?.description}</CText>
      </BottomSheet>
    </MainWrapper>
  );
}
const Box = ({children, title, styleContent}) => {
  return (
    <View
      style={{
        rowGap: scale(10),
        flex: 1,
      }}>
      <CText
        textType="semiBold"
        style={{
          fontSize: SIZES.xMedium,
          color: COLORS.White,
        }}>
        {title}:
      </CText>
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
    flex: 1,
    paddingHorizontal: scale(10),
  },
  view: {
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    rowGap: scale(10),
  },

  box: {
    minHeight: scale(200),
    borderRadius: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.input,

    padding: scale(10),
    gap: scale(10),
  },
  textDesc: {
    color: COLORS.White,
    fontSize: SIZES.small,
  },
});

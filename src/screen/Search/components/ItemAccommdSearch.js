import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../assets/constants';
import CustomImage from '../../../components/CustomImage';
import CustomText from '../../../components/CustomText';
import {formatPrice} from '../../../utils/format';
import RatingBox from '../../Explore/components/ContentAccommodation/BoxPlaceItem/RatingBox';
import ListFacilities from './ListFacilities';
import Bottom from './Bottom';
import ImageDetail from '../../components/ImageDetail';
import TopImg from './TopImg';
import {IconMapView} from '../../../assets/icon/Icon';
import Star from '../../../components/Star';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useCountry} from '../../../hooks/useCountry';

export default function ItemAccommdSearch({
  data,
  isStar,
  rating,
  isRating,
  isDiscount,
}) {
  const {navigate} = useNavigation();
  const params = useRoute().params;
  const detail = () => {
    if (params?.menu === 'RENT') {
      onSavedName();
      navigate('DetailAccommodationScreen', {...data, dataFilter: params});
    } else if (params?.menu === 'BUY') {
      onSavedNameEstate();
      navigate('DetailBuyScreen', {...data, dataFilter: params});
    } else if (params?.menu === 'TOUR') {
      navigate('DetailTourScreen', {...data, dataFilter: params});
    }
  };
  const onSavedName = async () => {
    const result = await EncryptedStorage.getItem('save_name');

    const arrsdf = result
      ? JSON.parse(result).filter(item => item?.name !== data?.name)
      : [];
    await EncryptedStorage.setItem(
      'save_name',
      JSON.stringify(result ? [data, ...arrsdf.slice(0, 4)] : [data]),
    );
  };
  const {currency} = useCountry();
  const onSavedNameEstate = async () => {
    const result = await EncryptedStorage.getItem('@save_name_estate');

    const arrsdf = result
      ? JSON.parse(result).filter(item => item?.title !== data?.title)
      : [];
    await EncryptedStorage.setItem(
      '@save_name_estate',
      JSON.stringify(result ? [data, ...arrsdf.slice(0, 10)] : [data]),
    );
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.wrapper}
      onPress={() => {
        detail();
      }}>
      <CustomImage source={data?.images?.[0]?.url} style={styles.img} />
      <TopImg
        // rating
        // isStar
        isHeart
        feature
        type={data?.accommodation_type?.name || data?.estate_type?.name}
      />
      <View
        style={{
          padding: scale(12),
          // flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
          <CustomText textType="semiBold" style={styles.name} numberOfLines={1}>
            {data?.name || data?.title}
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(50),
          }}>
          {isStar && <Star rating={rating} style={{marginTop: scale(2)}} />}
          {isRating && data?.review_count > 0 && (
            <RatingBox
              rating={data?.review_average ? data?.review_average : 0}
              textRating={data?.review_count}
            />
          )}
        </View>
        {/* <CustomText textType="medium" style={styles.address} numberOfLines={1}>
          {data?.address}
        </CustomText> */}

        {/* <ListFacilities
          accom_type={
            params?.menu === 'RENT'
              ? data?.accommodation_type
              : data?.estate_type
          }
        /> */}

        <View
          style={{
            marginTop: scale(8),
            // alignItems: 'flex-end',
          }}>
          <View style={{overflow: 'hidden', width: '100%'}}>
            <View style={styles.line} />
          </View>
          {isDiscount && (
            <View
              style={{
                ...styles.price,
                justifyContent: 'flex-start',
                marginTop: scale(5),
              }}>
              <CustomText textType="regular" style={styles.textDiscount}>
                {formatPrice(data?.discount, {
                  locales: 'en',
                })}{' '}
              </CustomText>

              {/* <CustomText
                        textType="semiBold"
                        style={{
                          color: '#FF0000',
                          fontSize: SIZES.xSmall,
                          minWidth: scale(35),
                        }}>
                        20% OFF
                      </CustomText> */}
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              marginTop: scale(5),
              justifyContent: 'space-between',
            }}>
            <CustomText
              textType="medium"
              numberOfLines={1}
              style={{color: COLORS.primary}}>
              {formatPrice(
                data?.price ||
                  data?.rooms?.[0]?.room_dates?.[0]?.price_final ||
                  data?.tour_tickets?.[0]?.tour_ticket_items?.[0]?.price,
                {currency: currency?.currency_code},
              )}{' '}
            </CustomText>
            <View style={{flexDirection: 'row'}}>
              <IconMapView />
              <CustomText>
                {data?.country?.name}, {data?.province?.name}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    width: '100%',
    height: scale(240),
    borderRadius: scale(10),
    ...SHADOW,
  },
  img: {
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    width: '100%',
    height: '55%',
    backgroundColor: '#000',
  },
  name: {
    fontSize: SIZES.medium,
    flex: 1,
  },
  address: {
    fontSize: SIZES.small,
  },
  line: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: -1,
    marginBottom: 0,
    overflow: 'hidden',
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: scale(6),
    alignItems: 'flex-start',
  },
  textDiscount: {
    textDecorationLine: 'line-through',
    fontSize: SIZES.xSmall,
    flex: 1,
  },
});

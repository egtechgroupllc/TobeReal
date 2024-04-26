import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
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

export default function ItemAccommdSearch({data}) {
  const {navigate} = useNavigation();
  const params = useRoute().params;
  const detail = () => {
    if (params?.menu === 'RENT') {
      navigate('DetailAccommodationScreen', data);
    } else if (params?.menu === 'BUY') {
      navigate('DetailBuyScreen', data);
    } else if (params?.menu === 'TOUR') {
      navigate('DetailTourScreen', data);
    }
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
        rating
        isStar
        isHeart
        feature
        type={data?.accommodation_type?.name || data?.estate_type?.name}
      />
      <View
        style={{
          padding: scale(12),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
          <CustomText textType="semiBold" style={styles.name} numberOfLines={2}>
            {data?.name || data?.title}
          </CustomText>
          <RatingBox rating={4.0} />
        </View>

        <View style={{flexDirection: 'row', columnGap: scale(10)}}>
          <IconMapView />
          <CustomText>
            {data?.country?.name}, {data?.province?.name}
          </CustomText>
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

          <CustomText
            textType="medium"
            style={{marginTop: scale(10)}}
            numberOfLines={1}>
            {formatPrice(
              data?.price ||
                data?.rooms?.[0]?.room_dates?.[0]?.price ||
                data?.tour_tickets?.[0]?.tour_ticket_items?.[0]?.price,
            )}{' '}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    width: '100%',
    height: scale(220),
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
});

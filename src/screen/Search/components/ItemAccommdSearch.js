import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../assets/constants';
import CustomImage from '../../../components/CustomImage';
import CustomText from '../../../components/CustomText';
import {formatPrice} from '../../../utils/format';
import RatingBox from '../../Explore/components/ContentAccommodation/BoxPlaceItem/RatingBox';
import ListFacilities from './ListFacilities';
import Bottom from './Bottom';

export default function ItemAccommdSearch({data}) {
  const {navigate} = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.wrapper}
      onPress={() => {
        navigate('DetailAccommodationScreen', data);
      }}>
      <CustomImage source={data?.images_url} style={styles.img} />

      <View
        style={{
          padding: scale(12),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
          <CustomText textType="semiBold" style={styles.name}>
            {data?.name}
          </CustomText>
          <RatingBox rating={4.0} />
        </View>

        <CustomText textType="medium" style={styles.address} numberOfLines={1}>
          {data?.address}
        </CustomText>

        <ListFacilities accom_type={data?.accommodation_type} />

        <View
          style={{
            marginTop: scale(8),
            alignItems: 'flex-end',
          }}>
          <View style={{overflow: 'hidden', width: '100%'}}>
            <View style={styles.line} />
          </View>

          <Bottom data={data?.rooms} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    width: '100%',
    height: scale(380),
    borderRadius: scale(10),
    ...SHADOW,
  },
  img: {
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    width: '100%',
    height: '60%',
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

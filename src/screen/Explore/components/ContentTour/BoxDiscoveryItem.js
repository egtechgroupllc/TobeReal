import {StackActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import {IconHeart, IconMapView, IconMarker} from '../../../../assets/icon/Icon';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import Ribbon from '../../../components/Ribbon';
import Star from '../../../../components/Star';
import {formatPrice} from '../../../../utils/format';
import RatingBox from './BoxPlaceItem/RatingBox';
import ViewMultiPrice from './BoxPlaceItem/ViewMultiPrice';
import TopImg from './BoxPlaceItem/TopImg';
import {useLanguage} from '../../../../hooks/useLanguage';
import BoxPlaceItemLoading from './BoxPlaceItem/BoxPlaceItemLoading';

export default function BoxDiscoveryItem({
  data,
  seeViewNumber = 2.4,
  isLoading,
  isViewMap,
  isHeart,
  isStar,
  textRating,
  isDiscount,
  rating = 0,
  rental = 'month',
  multiPrice,
  isUnitAvailable,
  styleWrapper,
  time,
  jsonImage,
  name,
  price,
}) {
  const {t} = useLanguage();
  const {navigate, isFocused, dispatch} = useNavigation();
  return (
    <View style={styles.wrapper}>
      {!isLoading ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (isFocused()) {
              dispatch(
                StackActions.push('NoBottomTab', {
                  screen: 'SeeAllTourScreen',
                  params: {
                    jsondata: jsonImage || [],
                    title: name || '',
                    paramPrice: price || '',
                  },
                }),
              );
            }
          }}
          style={[
            styles.wrapper,
            {
              width: scale(400 / seeViewNumber),
              // height: scale(200),
            },
            styleWrapper,
            // SHADOW,
          ]}>
          <View
            style={{
              width: '97%',
              height: styleWrapper?.height ? '60%' : scale(79),
            }}>
            {/* <Ribbon text={t('promotion') + ' 30%  🏨'} /> */}

            {data ? (
              <CustomImage source={data?.src} style={styles.img}>
                <CustomText
                  textType="bold"
                  style={[
                    styles.buildingName,
                    isStar && {fontSize: SIZES.xMedium, color: COLORS.white},
                  ]}
                  numberOfLines={1}>
                  {data?.name}
                </CustomText>
              </CustomImage>
            ) : (
              <CustomImage
                src="https://saveloka.com/images/home/hotel-image/real-sale/real-sale-1.jpg"
                style={styles.img}>
                <CustomText
                  textType="semiBold"
                  style={[
                    styles.buildingName,
                    isStar && {fontSize: SIZES.xMedium, color: COLORS.white},
                  ]}
                  numberOfLines={1}>
                  {data?.name}
                </CustomText>
              </CustomImage>
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <BoxPlaceItemLoading
          style={[
            styles.wrapper,
            {
              width: scale(400 / seeViewNumber),
            },
            SHADOW,
          ]}
          multiPrice={multiPrice}
          isUnitAvailable={isUnitAvailable}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: '#fff',
    // minHeight: scale(200),
    // height: 200,
    borderRadius: 5,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scale(35),
  },
  line: {
    backgroundColor: 'white',
    width: '100%',
    height: 1,
    marginVertical: scale(3),
  },

  buildingName: {
    flex: 1,
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

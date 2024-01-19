import {StackActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import {IconHeart, IconMapView, IconMarker} from '../../../../assets/icon/Icon';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import Ribbon from '../../../../components/Ribbon';
import Star from '../../../../components/Star';
import {formatPrice} from '../../../../utils/format';
import RatingBox from './BoxPlaceItem/RatingBox';
import ViewMultiPrice from './BoxPlaceItem/ViewMultiPrice';
import TopImg from './BoxPlaceItem/TopImg';

export default function BoxPlaceItem({
  data,
  seeViewNumber = 2.4,
  isViewMap,
  isHeart,
  isStar,
  textRating,
  isDiscount,
  rating = 0,
  rental = 'month',
  multiPrice,
  isUnitAvailable,
}) {
  const {navigate, dispatch} = useNavigation();
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          dispatch(
            StackActions.push('NoBottomTab', {
              screen: 'DetailAccommodationScreen',
            }),
          )
        }
        style={[
          styles.wrapper,
          {
            width: scale(400 / seeViewNumber),
          },
          SHADOW,
        ]}>
        <View
          style={{
            width: '100%',
            height: scale(150),
          }}>
          <Ribbon text="Promotion 30%  🏨" />

          <CustomImage
            src="https://cdn.travelio.id/hotel/b6906-6538c063f4bc0a28cbe6e5e9/Deluxe-King_l.jpg"
            style={styles.img}
          />

          <TopImg
            rating={rating}
            isStar={isStar}
            textRating={textRating}
            isHeart={isHeart}
          />
        </View>

        <View
          style={{
            marginTop: scale(18),
            margin: scale(10),
            rowGap: scale(4),
          }}>
          <CustomText
            textType="semiBold"
            style={[styles.buildingName, isStar && {fontSize: SIZES.xMedium}]}
            numberOfLines={1}>
            Hotel Residence
          </CustomText>
          {isStar && <Star rating={rating} />}

          <View style={styles.line} />

          <View>
            {!multiPrice ? (
              <>
                {isDiscount && (
                  <View
                    style={{
                      ...styles.price,
                      justifyContent: 'flex-start',
                    }}>
                    <CustomText textType="regular" style={styles.textDiscount}>
                      ${formatPrice(10000000)}{' '}
                    </CustomText>

                    <CustomText
                      textType="semiBold"
                      style={{
                        color: '#FF0000',
                        fontSize: SIZES.xSmall,
                        minWidth: scale(35),
                      }}>
                      20% OFF
                    </CustomText>
                  </View>
                )}

                <View style={styles.price}>
                  <CustomText
                    textType="semiBold"
                    style={[
                      styles.buildingName,
                      isStar && {fontSize: SIZES.xMedium},
                      isDiscount && {color: COLORS.primary},
                    ]}>
                    ${formatPrice(10000000)}{' '}
                    <CustomText
                      textType="regular"
                      style={{fontSize: SIZES.xSmall}}>
                      / {rental}
                    </CustomText>
                  </CustomText>

                  {isViewMap && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{padding: scale(4)}}>
                      <IconMapView />
                    </TouchableOpacity>
                  )}
                </View>
              </>
            ) : (
              <ViewMultiPrice
                isUnitAvailable={isUnitAvailable}
                viewMultiPrice={multiPrice}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    // minHeight: scale(200),
    // height: 200,
    borderRadius: 12,
  },
  img: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  line: {
    backgroundColor: '#ccc',
    flex: 1,
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

import {StackActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';

import {IconHeart, IconMapView, IconMarker} from '../../../../assets/icon/Icon';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import Star from '../../../../components/Star';
import {formatPrice} from '../../../../utils/format';
import ViewMultiPrice from './BoxPlaceItem/ViewMultiPrice';

import BoxPlaceItemLoading from './BoxPlaceItem/BoxPlaceItemLoading';
import TopImg from './BoxPlaceItem/TopImg';
import Ribbon from '../../../../components/Ribbon';
import {useLanguage} from '../../../../hooks/useLanguage';

export default function BoxPlaceItem({
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
  type,
}) {
  const {t} = useLanguage();
  const {navigate, isFocused, dispatch} = useNavigation();
  const price = data?.rooms?.[0]?.room_dates?.[0]?.price;
  return (
    <View style={styles.wrapper}>
      {!isLoading ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (isFocused()) {
              dispatch(
                StackActions.push('NoBottomTab', {
                  screen: 'DetailAccommodationScreen',
                  params: data,
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
            SHADOW,
          ]}>
          <View
            style={{
              width: '100%',
              height: styleWrapper?.height ? '60%' : scale(150),
            }}>
            <Ribbon
              text={t('promotion') + ' 30%  🏨'}
              numberRoom={data?.rooms?.length}
            />

            <CustomImage source={data?.images?.[0]?.url} style={styles.img} />

            <TopImg
              rating={rating}
              isStar={isStar}
              textRating={textRating}
              isHeart={isHeart}
              type={data?.accommodation_type?.name}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginTop: scale(18),
              margin: scale(10),
              rowGap: scale(4),
            }}>
            <CustomText
              textType="semiBold"
              style={[styles.buildingName, isStar && {fontSize: SIZES.xMedium}]}
              numberOfLines={1}>
              {data?.name}
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
                      <CustomText
                        textType="regular"
                        style={styles.textDiscount}>
                        {formatPrice(data?.discount, {
                          locales: 'en',
                        })}{' '}
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
                      {formatPrice(price, {
                        locales: 'en',
                      })}{' '}
                      {time && type === 'RENT' && (
                        <CustomText
                          textType="regular"
                          style={{fontSize: SIZES.xSmall}}>
                          / {rental}
                        </CustomText>
                      )}
                    </CustomText>

                    {isViewMap && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                          padding: scale(4),
                          flexDirection: 'row',
                          columnGap: scale(10),
                        }}>
                        <CustomText>
                          {' '}
                          {data?.country?.name}, {data?.province?.name}
                        </CustomText>
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
    backgroundColor: '#fff',
    // minHeight: scale(200),
    // height: 200,
    borderRadius: 12,
  },
  img: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
  },
  line: {
    backgroundColor: '#ccc',
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

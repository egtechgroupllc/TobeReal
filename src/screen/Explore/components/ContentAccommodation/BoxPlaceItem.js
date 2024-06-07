import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';

import {IconMapView} from '../../../../assets/icon/Icon';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import {formatPrice} from '../../../../utils/format';
import ViewMultiPrice from './BoxPlaceItem/ViewMultiPrice';

import StarRating from '../../../../components/StarRating';
import {useLanguage} from '../../../../hooks/useLanguage';
import Ribbon from '../../../components/Ribbon';
import BoxPlaceItemLoading from './BoxPlaceItem/BoxPlaceItemLoading';
import TopImg from './BoxPlaceItem/TopImg';
import RatingBox from './BoxPlaceItem/RatingBox';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useCountry} from '../../../../hooks/useCountry';
import StarAccomo from '../../../News/PostNews/Lease/components/PostNewLease/EstateDetail/StarAccomo';

export default function BoxPlaceItem({
  data,
  seeViewNumber = 2.4,
  isLoading,
  isViewMap,
  isHeart,
  isStar,
  textRating,
  isDiscount,
  rental = 'month',
  multiPrice,
  isUnitAvailable,
  styleWrapper,
  time,
  type,
  isRating,
}) {
  const {t} = useLanguage();
  const {navigate, isFocused, dispatch} = useNavigation();
  const price = data?.rooms?.[0]?.room_dates?.[0]?.price_final;
  const onSavedName = async () => {
    const result = await EncryptedStorage.getItem('save_name');

    const arrsdf = result
      ? JSON.parse(result).filter(item => item?.name !== data?.name)
      : [];
    await EncryptedStorage.setItem(
      'save_name',
      JSON.stringify(result ? [data, ...arrsdf.slice(0, 10)] : [data]),
    );
  };
  const priceFinal = useMemo(() => {
    return data?.rooms?.map(element => {
      const result = element?.room_dates.map(room => {
        return room?.price_final;
      });
      return Math.min(...result);
    });
  }, [data?.rooms]);

  const freeCancel = useMemo(() => {
    if (data?.rooms) {
      let num = 0;
      data?.rooms?.map(element => {
        const result = element?.accommodation_policies.map(room => {
          return room?.refund_fee;
        });
        num = Math.min(...result);
      });
      return num;
    }
  }, [data?.rooms]);

  const {country} = useCountry();
  return (
    <View style={styles.wrapper}>
      {!isLoading ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (isFocused()) {
              onSavedName();
              dispatch(
                StackActions.push('NoBottomTab', {
                  screen: data?.accommodation_type_id
                    ? 'DetailAccommodationScreen'
                    : data?.estate_type_id
                    ? 'DetailBuyScreen'
                    : 'DetailTourScreen',
                  params: {...data, priceFinal},
                }),
              );
            }
          }}
          style={[
            styles.wrapper,
            {
              width: scale(400 / seeViewNumber),
              // height: scale(265),
              flex: 1,
            },
            styleWrapper,
            SHADOW,
          ]}>
          <View
            style={{
              width: '100%',
              height: styleWrapper?.height ? '60%' : scale(150),
            }}>
            {data?.rooms?.length && (
              <Ribbon
                freeCancel={freeCancel}
                numberRoom={data?.rooms?.length}
              />
            )}

            <CustomImage source={data?.images?.[0]?.url} style={styles.img} />

            <TopImg
              // rating={rating}
              // isStar={isStar}
              // textRating={textRating}
              isHeart={isHeart}
              type={data?.accommodation_type?.name || data?.estate_type?.name}
            />
          </View>

          <View
            style={{
              // flex: 1,
              marginTop: scale(18),
              margin: scale(10),
              rowGap: scale(2),
            }}>
            <CustomText
              textType="semiBold"
              style={[styles.buildingName, isStar && {fontSize: SIZES.xMedium}]}
              numberOfLines={1}>
              {data?.name || data?.title}
            </CustomText>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: scale(25),
                // height: scale(25),
              }}>
              {isStar && data?.rating && <StarAccomo rating={data?.rating} />}
              {isRating && data?.review_count > 0 ? (
                <RatingBox
                  rating={data?.review_average}
                  textRating={data?.review_count}
                />
              ) : (
                <View style={styles.boxIcon}>
                  <CustomText style={{color: COLORS.grey}} textType="semiBold">
                    {t('no_review')}
                  </CustomText>
                </View>
              )}
            </View>
            <View style={styles.line} />

            <View style={{rowGap: scale(2)}}>
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
                          currency: country?.currency_code,
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

                  <View style={styles.price}>
                    <CustomText
                      textType="semiBold"
                      style={[
                        styles.buildingName,
                        isStar && {fontSize: SIZES.xMedium},
                        isDiscount && {color: COLORS.primary},
                      ]}>
                      {formatPrice(priceFinal || data?.price, {
                        currency: country?.currency_code,
                      })}{' '}
                      {time && type === 'RENT' && (
                        <CustomText
                          textType="regular"
                          style={{fontSize: SIZES.xSmall}}>
                          / {rental}
                        </CustomText>
                      )}
                    </CustomText>
                  </View>
                  {isViewMap && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        // padding: scale(4),
                        flexDirection: 'row',
                        columnGap: scale(5),
                      }}>
                      <IconMapView />
                      <CustomText numberOfLines={2} style={{flex: 1}}>
                        {' '}
                        {data?.country?.name}, {data?.province?.name}
                      </CustomText>
                    </TouchableOpacity>
                  )}
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

  // buildingName: {
  //   flex: 1,
  // },
  price: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    columnGap: scale(15),
    alignItems: 'flex-start',
    width: '85%',
  },
  textDiscount: {
    textDecorationLine: 'line-through',
    fontSize: SIZES.xSmall,
    flex: 1,
  },
  boxIcon: {
    backgroundColor: '#f5f5f5',
    padding: scale(4),
    paddingHorizontal: scale(6),
    borderRadius: 6,
  },
});

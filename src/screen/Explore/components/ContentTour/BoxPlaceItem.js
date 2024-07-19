import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import {IconMapView} from '../../../../assets/icon/Icon';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import StarRating from '../../../../components/StarRating';
import {useLanguage} from '../../../../hooks/useLanguage';
import {formatPrice} from '../../../../utils/format';
import BoxPlaceItemLoading from './BoxPlaceItem/BoxPlaceItemLoading';
import TopImg from './BoxPlaceItem/TopImg';
import ViewMultiPrice from './BoxPlaceItem/ViewMultiPrice';
import {useCountry} from '../../../../hooks/useCountry';

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
}) {
  const {t} = useLanguage();
  const {currency} = useCountry();
  const priceFinal = useMemo(() => {
    const resultPri = data?.tour_tickets?.map(element => {
      const result = element?.tour_ticket_items?.map(percent => {
        const resultPolicy = element?.tour_ticket_dates.reduce((acc, price) => {
          return percent?.price_percent * price?.price_final;
        }, 0);

        return resultPolicy;
      });

      return Math.min(...result);
    });
    return Math.min(...resultPri);
  }, [data?.tour_tickets]);

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
                  screen: 'DetailTourScreen',
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
            // SHADOW,
          ]}>
          <View
            style={{
              width: '100%',
              height: styleWrapper?.height ? '60%' : scale(150),
            }}>
            {/* <Ribbon text={t('promotion') + ' 30%  🏨'} /> */}

            <CustomImage source={data?.images?.[0]?.url} style={styles.img} />

            <TopImg
              rating={rating}
              isStar={isStar}
              textRating={textRating}
              isHeart={isHeart}
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
            {isStar && <StarRating rating={rating} />}

            {/* <View style={styles.line} /> */}

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
                          locales: 'vi',
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
                        isDiscount && {color: COLORS.black},
                      ]}>
                      {formatPrice(priceFinal, {
                        currency: currency?.currency_code,
                      })}{' '}
                      {time && (
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
    borderRadius: 12,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: scale(12),
    backgroundColor: '#f5f5f5',
    ...SHADOW,
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

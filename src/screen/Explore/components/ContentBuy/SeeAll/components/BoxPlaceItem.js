import {StackActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  SHADOW,
  SIZES,
  images,
  scale,
} from '../../../../../../assets/constants';
import {
  Avatar,
  IconHeart,
  IconMapView,
  IconMarker,
} from '../../../../../../assets/icon/Icon';

import CustomText from '../../../../../../components/CustomText';

import {formatPrice} from '../../../../../../utils/format';

import TopImg from '../../BoxPlaceItem/TopImg';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import BoxPlaceItemLoading from '../../BoxPlaceItem/BoxPlaceItemLoading';
import CustomImage from '../../../../../../components/CustomImage';
import ViewMultiPrice from '../../BoxPlaceItem/ViewMultiPrice';
import calculateTimeElapsed from '../../../../../../utils/calculateTimeElapsed';
import LinearGradient from 'react-native-linear-gradient';

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
                  screen: 'DetailBuyScreen',
                  params: data,
                }),
              );
            }
          }}
          style={[
            styles.wrapper,
            {
              width: scale(410 / seeViewNumber),
              alignItems: 'center',
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
            {/* <Ribbon text={t('promotion') + ' 30%  🏨'} /> */}

            <CustomImage source={data?.images?.[0]?.url} style={styles.img} />

            <TopImg
              rating={rating}
              // isStar={isStar}
              textRating={textRating}
              isHeart={isHeart}
            />
          </View>
          <LinearGradient
            colors={['#f5f5f5', '#F5F4F8']}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={{
              // backgroundColor: COLORS.primary,
              // flex: 1,
              marginTop: scale(18),
              // rowGap: scale(4),
              borderRadius: scale(5),
              height: scale(100),
              width: '100%',
              padding: scale(10),
            }}>
            <CustomText
              textType="bold"
              style={[isStar && {fontSize: SIZES.xSmall}]}
              numberOfLines={1}>
              {data?.title}
            </CustomText>

            <View style={{marginTop: scale(5)}}>
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
                        style={{...styles.textDiscount}}>
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
                    <View
                      style={{
                        ...styles.topBox,
                        backgroundColor: '#234F68B0',
                        minWidth: scale(50),
                        // marginTop: scale(25),
                      }}>
                      <CustomText
                        textType="bold"
                        numberOfLines={1}
                        style={[
                          styles.topName,
                          isStar && {fontSize: SIZES.small},
                          isDiscount && {color: COLORS.white},
                        ]}>
                        {formatPrice(data?.price, {
                          locales: 'vi',
                        })}{' '}
                      </CustomText>
                    </View>

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
            <View style={{marginTop: scale(5)}}>
              <View style={styles.price}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: scale(5),
                  }}>
                  <IconMapView width={scale(14)} height={scale(14)} />
                  <CustomText
                    textType="bold"
                    style={{
                      fontSize: SIZES.xSmall,
                      // minWidth: scale(35),
                    }}>
                    {data?.country?.name}, {data?.province?.name}
                  </CustomText>
                </View>
              </View>
            </View>
            <View style={{marginTop: scale(5)}}>
              <View style={styles.price}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: scale(5),
                  }}>
                  <Avatar width={scale(20)} height={scale(20)}></Avatar>
                  <View>
                    <CustomText
                      textType="bold"
                      numberOfLines={1}
                      style={{
                        fontSize: SIZES.xSmall,
                        minWidth: scale(35),
                      }}>
                      {data?.contact_name}
                    </CustomText>
                    <CustomText
                      textType="bold"
                      numberOfLines={1}
                      style={{
                        color: COLORS.grey,
                        fontSize: SIZES.xSmall,
                        minWidth: scale(35),
                      }}>
                      {calculateTimeElapsed(data.date_start)}
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
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
    ...SHADOW,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: scale(12),
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
    alignItems: 'center',
  },
  textDiscount: {
    textDecorationLine: 'line-through',
    fontSize: SIZES.xSmall,
    flex: 1,
  },
  topBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(6),
    paddingVertical: scale(4),
    borderRadius: 8,
    height: scale(20),
  },
  topName: {
    fontSize: SIZES.xSmall,
    color: COLORS.white,
  },
});

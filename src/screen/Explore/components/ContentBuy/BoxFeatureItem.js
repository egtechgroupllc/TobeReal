import {StackActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  SHADOW,
  SIZES,
  images,
  scale,
} from '../../../../assets/constants';
import {
  Avatar,
  IconAcreage,
  IconHeart,
  IconMapView,
  IconMarker,
} from '../../../../assets/icon/Icon';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import Ribbon from '../../../components/Ribbon';
import Star from '../../../../components/StarRating';
import {formatCurrency, formatPrice} from '../../../../utils/format';
import RatingBox from './BoxPlaceItem/RatingBox';
import ViewMultiPrice from './BoxPlaceItem/ViewMultiPrice';
import TopImg from './BoxPlaceItem/TopImg';
import {useLanguage} from '../../../../hooks/useLanguage';
import BoxPlaceItemLoading from './BoxPlaceItem/BoxPlaceItemLoading';
import LinearGradient from 'react-native-linear-gradient';
import {type} from '../../../../components/Marquee';
import Favourite from '../../../components/Favourite';
import calculateTimeElapsed from '../../../../utils/calculateTimeElapsed';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useCountry} from '../../../../hooks/useCountry';

export default function BoxFeatureItem({
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
  type,
}) {
  const {t} = useLanguage();
  const {navigate, isFocused, dispatch} = useNavigation();
  const {currency} = useCountry();
  const onSavedName = async () => {
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
    <View style={styles.wrapper}>
      {!isLoading ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (isFocused()) {
              onSavedName();
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
              width: scale(700 / seeViewNumber),
              // height: scale(200),
            },
            styleWrapper,
            SHADOW,
          ]}>
          <View
            style={{
              // width: '50%',
              // height: scale(150),
              flexDirection: 'row',
              columnGap: scale(7),
            }}>
            {/* <Ribbon text={t('promotion') + ' 30%  🏨'} /> */}
            <View style={{width: '50%', height: scale(150)}}>
              <CustomImage source={data?.images?.[0]?.url} style={styles.img} />
              <TopImg
                rating={rating}
                isStar={isStar}
                textRating={textRating}
                feature
                data={data}
                level
              />
            </View>

            <View
              style={{
                paddingVertical: scale(10),
                flex: 1,
                // backgroundColor: '#000',
              }}>
              <CustomText
                textType="bold"
                style={[isStar && {fontSize: SIZES.small, color: '#252B5C'}]}
                numberOfLines={2}>
                {data?.title}
              </CustomText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: scale(5),
                  marginTop: scale(10),
                }}>
                <IconMarker width={scale(9)} height={scale(9)} />
                <CustomText
                  textType="medium"
                  style={[isStar && {fontSize: SIZES.xSmall, flex: 1}]}
                  numberOfLines={2}>
                  {data?.country?.name}, {data?.province?.name}
                </CustomText>
              </View>
              <View
                style={{
                  flex: 1,
                  marginTop: scale(10),
                  flexDirection: 'row',
                  columnGap: scale(5),
                }}>
                <IconAcreage width={scale(13)} height={scale(13)} />
                <CustomText
                  textType="medium"
                  style={{
                    fontSize: SIZES.xSmall,
                    // minWidth: scale(35),
                  }}>
                  {formatPrice(data?.size_width * data?.size_length, {
                    unit: 'm²',
                  })}
                </CustomText>
              </View>

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
                          style={{...styles.textDiscount, color: COLORS.white}}>
                          {formatCurrency(data?.price, {
                            currency: currency?.currency_code,
                          })}
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
                          width: scale(80),
                          marginTop: scale(25),
                        }}>
                        <CustomText style={styles.topName} numberOfLines={1}>
                          {formatCurrency(data?.price, {
                            currency: currency?.currency_code,
                          })}
                        </CustomText>
                      </View>
                      {/* <CustomText
                        textType="bold"
                        style={{...styles.buildingName, color: '#0057FF'}}>
                        {formatPrice(data?.price, {
                          locales: 'vi',
                        })}{' '}
                      </CustomText> */}

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
                    <CustomImage
                      source={
                        !data?.user?.image_avatar
                          ? images.avatar
                          : data?.user?.url_image_avatar
                      }
                      style={styles.avatar}
                    />
                    <View style={{flex: 1}}>
                      <CustomText
                        textType="bold"
                        numberOfLines={1}
                        style={{
                          fontSize: SIZES.xSmall,
                          width: scale(70),
                        }}>
                        {data?.contact_name}
                      </CustomText>
                      <CustomText
                        textType="bold"
                        numberOfLines={1}
                        style={{
                          color: '#949090',
                          fontSize: SIZES.xSmall,
                          width: scale(70),
                        }}>
                        {calculateTimeElapsed(data?.date_start)}
                      </CustomText>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                paddingBottom: scale(5),
                left: scale(250),
              }}>
              <Favourite />
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
    justifyContent: 'center',
    backgroundColor: '#F5F4F8',
    minHeight: scale(170),
    // height: 200,
    borderRadius: 12,
    ...SHADOW,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: scale(12),
    backgroundColor: '#e5e5e5',
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
    height: scale(27),
    width: scale(70),
    // columnGap: scale(4),
  },
  topName: {
    fontSize: SIZES.xSmall,
    color: COLORS.white,
  },
  avatar: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(99),
  },
});

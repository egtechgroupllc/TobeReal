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
  IconBed,
  IconFurniture,
  IconHeart,
  IconMapView,
  IconMarker,
  IconRoom,
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
import calculateTimeElapsed from '../../../../utils/calculateTimeElapsed';
import EncryptedStorage from 'react-native-encrypted-storage';
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
  jsonImage,
  name,
  price,
}) {
  const {t} = useLanguage();
  const {navigate, isFocused, dispatch} = useNavigation();
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
  const {currency} = useCountry();

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
              width: scale(600 / seeViewNumber),
              // height: scale(200),
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
            {/* <Ribbon text={t('promotion') + ' 30%  🏨'} /> */}

            <CustomImage source={data?.images?.[0]?.url} style={styles.img} />

            <TopImg
              // rating={rating}
              // isStar={isStar}
              feature
              // textRating={textRating}
              isHeart={isHeart}
              level
              data={data}
            />
          </View>

          <LinearGradient
            colors={['#f5f5f5', '#F5F4F8']}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={{
              flex: 1,
              marginTop: scale(18),
              borderRadius: scale(5),
              minHeight: scale(120),
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
                        flexDirection: 'row',
                        alignItems: 'center',
                        columnGap: scale(5),
                      }}>
                      <IconMapView
                        width={scale(14)}
                        height={scale(14)}
                        fill={'#373535'}
                      />
                      <CustomText
                        textType="medium"
                        numberOfLines={3}
                        style={{
                          fontSize: SIZES.xSmall,
                          // minWidth: scale(35),
                          width: scale(150),
                        }}>
                        {data?.country?.name}, {data?.province?.name}
                      </CustomText>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      columnGap: scale(5),
                      marginTop: scale(5),
                    }}>
                    <IconAcreage width={scale(15)} height={scale(15)} />
                    <CustomText
                      textType="medium"
                      style={{
                        fontSize: SIZES.small,
                        // flex: 1,
                        // minWidth: scale(35),
                      }}>
                      {formatPrice(data?.size_width * data?.size_length, {
                        unit: 'm²',
                      })}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      ...styles.price,
                      marginTop: scale(5),
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        ...styles.topBox,
                        backgroundColor: '#234F68B0',
                        minWidth: scale(90),
                        maxWidth: scale(100),
                      }}>
                      <CustomText style={styles.topName} numberOfLines={1}>
                        {formatCurrency(data?.price, {
                          currency: currency?.currency_code,
                        })}
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
                        width: scale(150),
                      }}>
                      {data?.contact_name}
                    </CustomText>
                    <CustomText
                      textType="bold"
                      numberOfLines={1}
                      style={{
                        color: '#949090',
                        fontSize: SIZES.xSmall,
                        width: scale(150),
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
    backgroundColor: '#fff',
    // minHeight: scale(200),
    // height: 200,
    borderRadius: 12,
    // ...SHADOW,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: scale(12),
    backgroundColor: '#f5f5f5',
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
    // justifyContent: 'space-between',
    columnGap: scale(15),
    // alignItems: 'center',
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

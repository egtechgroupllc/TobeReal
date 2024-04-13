import {StackActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  SHADOW,
  SIZES,
  images,
  scale,
} from '../../../../../assets/constants';
import {
  Avatar,
  IconHeart,
  IconMapView,
  IconMarker,
} from '../../../../../assets/icon/Icon';
import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import {formatPrice} from '../../../../../utils/format';
import ViewMultiPrice from '../BoxPlaceItem/ViewMultiPrice';
import TopImg from '../BoxPlaceItem/TopImg';
import {useLanguage} from '../../../../../hooks/useLanguage';
import BoxPlaceItemLoading from '../BoxPlaceItem/BoxPlaceItemLoading';

export default function BoxSimilarApartment({
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
              width: scale(600 / seeViewNumber),
              // height: scale(200),
              padding: scale(10),
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

            {data ? (
              <CustomImage source={data?.src} style={styles.img} />
            ) : (
              <CustomImage
                src="https://saveloka.com/images/home/hotel-image/real-sale/real-sale-1.jpg"
                style={styles.img}></CustomImage>
            )}

            <TopImg
              // rating={rating}
              // isStar={isStar}
              textRating={textRating}
              isHeart={isHeart}
            />
          </View>
          <View
            style={{
              backgroundColor: COLORS.primary,
              flex: 1,
              marginTop: scale(18),
              margin: scale(5),
              // rowGap: scale(4),
              borderRadius: scale(5),
              height: scale(100),
              width: '95%',
              padding: scale(10),
            }}>
            <CustomText
              textType="bold"
              style={[isStar && {fontSize: SIZES.xSmall, color: COLORS.white}]}
              numberOfLines={1}>
              {data?.name}
            </CustomText>
            {/* 
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
                        style={{...styles.textDiscount, color: COLORS.white}}>
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
                      textType="bold"
                      style={[
                        styles.buildingName,
                        isStar && {fontSize: SIZES.small, color: '#0057FF'},
                        isDiscount && {color: COLORS.white},
                      ]}>
                      {formatPrice(data?.price, {
                        locales: 'en',
                      })}{' '}
                      {time && (
                        <CustomText
                          textType="regular"
                          style={{fontSize: SIZES.xSmall, color: COLORS.white}}>
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
            </View> */}
            <View style={{marginTop: scale(5)}}>
              <View style={styles.price}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: scale(5),
                  }}>
                  <IconMapView
                    fill={COLORS.white}
                    width={scale(14)}
                    height={scale(14)}
                  />
                  <CustomText
                    textType="bold"
                    style={{
                      color: COLORS.white,
                      fontSize: SIZES.xSmall,
                      // minWidth: scale(35),
                    }}>
                    Thuy Nguyen, Hai Phong
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
                        color: COLORS.white,
                        fontSize: SIZES.xSmall,
                        minWidth: scale(35),
                      }}>
                      Mr
                    </CustomText>
                    <CustomText
                      textType="bold"
                      numberOfLines={1}
                      style={{
                        color: '#FFE259',
                        fontSize: SIZES.xSmall,
                        minWidth: scale(35),
                      }}>
                      Posted today
                    </CustomText>
                  </View>

                  {/* <View style={{backgroundColor:COLORS.white, width:'50%', height:scale(15), borderRadius:scale(3), marginLeft:'5%', padding:scale(1), flexDirection:'row', columnGap:scale(5)}}>
                     <View style={{backgroundColor:COLORS.primary, width:'20%', height:scale(13), borderRadius:scale(3), alignItems:'center', justifyContent:'center', }}>
                     <CustomImage
                        source={images.iconPhone}
                        style={{width: scale(8), height: scale(8)}}
                      />
                     </View>
                     <CustomText
                      textType="bold"
                      numberOfLines={1}
                      style={{
                        fontSize: SIZES.xSmall,
                        width:'50%'
                      }}>
                        0984839012
                    </CustomText>
                  </View> */}
                </View>
              </View>
            </View>
            <View style={styles.price}>
              <CustomText
                textType="bold"
                style={[
                  styles.buildingName,
                  isStar && {
                    fontSize: SIZES.small,
                    color: COLORS.white,
                    marginTop: scale(5),
                  },
                  isDiscount && {color: COLORS.white},
                ]}>
                {formatPrice(data?.price, {
                  locales: 'en',
                })}{' '}
                {time && (
                  <CustomText
                    textType="regular"
                    style={{fontSize: SIZES.xSmall, color: COLORS.white}}>
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
    minHeight: scale(200),
    // height: 200,
    borderRadius: 12,
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
});

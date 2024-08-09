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
import {formatPrice} from '../../../../utils/format';
import RatingBox from './BoxPlaceItem/RatingBox';
import ViewMultiPrice from './BoxPlaceItem/ViewMultiPrice';
import TopImg from './BoxPlaceItem/TopImg';
import {useLanguage} from '../../../../hooks/useLanguage';
import BoxPlaceItemLoading from './BoxPlaceItem/BoxPlaceItemLoading';
import LinearGradient from 'react-native-linear-gradient';
import {type} from '../../../../components/Marquee';
import calculateTimeElapsed from '../../../../utils/calculateTimeElapsed';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function BoxExploreEstate({
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
              width: scale(500 / seeViewNumber),
              // height: scale(200),
              flex: 1,
            },
            styleWrapper,
            SHADOW,
          ]}>
          <View
            style={{
              width: '90%',
            }}>
            {/* <Ribbon text={t('promotion') + ' 30%  🏨'} /> */}

            <CustomImage source={data?.images?.[0]?.url} style={styles.img} />

            <TopImg
              // rating={rating}
              // isStar={isStar}
              level
              textRating={textRating}
              isHeart={isHeart}
              showPrice
              data={data}
            />
            <LinearGradient
              colors={['#F0B90B', '#D88A00']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.topBox}>
              <CustomText style={styles.topName}>
                {data?.estate_type?.name}
              </CustomText>
            </LinearGradient>
            <View style={{paddingVertical: scale(10)}}>
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
                  textType="regular"
                  style={[isStar && {fontSize: SIZES.xSmall}]}
                  numberOfLines={2}>
                  {data?.country?.name}, {data?.province?.name}
                </CustomText>
              </View>
              <View
                style={{
                  marginTop: scale(5),
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
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(10),
    backgroundColor: '#F5F4F8',
    // minHeight: scale(230),
    // height: 200,
    borderRadius: 12,
    ...SHADOW,
  },
  topName: {
    fontSize: SIZES.xSmall,
    color: COLORS.white,
  },
  topBox: {
    position: 'absolute',
    alignItems: 'center',
    top: scale(135),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#F0B90B',
    paddingHorizontal: scale(6),
    paddingVertical: scale(4),
    borderRadius: 8,
    height: scale(27),
    minWidth: scale(70),
    // columnGap: scale(4),
  },
  img: {
    width: '100%',
    height: scale(150),
    backgroundColor: '#dbdbdb',
    borderRadius: scale(12),
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
    alignItems: 'center',
  },
  textDiscount: {
    textDecorationLine: 'line-through',
    fontSize: SIZES.xSmall,
    flex: 1,
  },
  avatar: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(99),
  },
});

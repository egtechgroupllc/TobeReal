import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES, WIDTH, scale} from '../../../../assets/constants';
import {CustomButton} from '../../../../components';
import {
  IconCity,
  IconMarker,
  IconNext,
  IconRoom,
} from '../../../../assets/icon/Icon';
import CustomText from '../../../../components/CustomText';
import Skeleton from '../../../../components/Skeleton';
import CustomImage from '../../../../components/CustomImage';

export default function RecommendedUnitItem({
  isButtonBottom,
  isShowDetail,
  styesWrapper,
  styesTextTitle,
  viewShow = 2,
  title,
  isCenter,
  onPress,
  data,
  img,
}) {
  return (
    <TouchableOpacity
      onPress={onPress && onPress}
      activeOpacity={0.7}
      style={[
        styles.wrapper,
        {
          width:
            styesWrapper?.width ||
            (WIDTH.widthScreen > 500 ? scale(500) : WIDTH.widthScreen) /
              viewShow,
        },
      ]}>
      <CustomImage
        resizeMode="stretch"
        source={data? data?.src : "https://dulichviet.com.vn/images/bandidau/check-in-5-toa-do-du-lich-indonesia-2023-khien-ban-say-me-quen-loi-ve.jpg" }
        style={[
          styles.img,
          styesWrapper,
          isCenter && {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        {title && (
          <CustomText textType="bold" style={[styles.title, styesTextTitle]}>
            {title || 'Title'}
          </CustomText>
        )}
        {isShowDetail && (
          <View style={styles.detail}>
            <View style={styles.detailContent}>
              <CustomText style={styles.detailText}>
                <IconMarker style={styles.icon} fill={COLORS.white} /> Terdekat
              </CustomText>

              <View
                style={{
                  height: '100%',
                  width: scale(1),
                  backgroundColor: '#fff',
                }}
              />

              <CustomText style={styles.detailText}>
                <IconRoom style={styles.icon} fill={COLORS.white} /> Terdekat
              </CustomText>
            </View>
            <CustomText
              textType="semiBold"
              style={styles.detailText}
              numberOfLines={1}>
              Terdekat ke Stasiun LRT Cawang
            </CustomText>
          </View>
        )}
      </CustomImage>

      {/* <ImageBackground
          resizeMode="stretch"
          src="https://pix6.agoda.net/geo/city/17190/1_17190_02.jpg?ca=6&ce=1&s=345x345&ar=1x1"
          style={[
            styles.img,
            styesWrapper,
            isCenter && {
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          {title && (
            <CustomText textType="bold" style={[styles.title, styesTextTitle]}>
              {title || 'Title'}
            </CustomText>
          )}
  
          {isShowDetail && (
            <View style={styles.detail}>
              <View style={styles.detailContent}>
                <CustomText style={styles.detailText}>
                  <IconMarker style={styles.icon} fill={COLORS.white} /> Terdekat
                </CustomText>
  
                <View
                  style={{
                    height: '100%',
                    width: scale(1),
                    backgroundColor: '#fff',
                  }}
                />
  
                <CustomText style={styles.detailText}>
                  <IconRoom style={styles.icon} fill={COLORS.white} /> Terdekat
                </CustomText>
              </View>
              <CustomText
                textType="semiBold"
                style={styles.detailText}
                numberOfLines={1}>
                Terdekat ke Stasiun LRT Cawang
              </CustomText>
            </View>
          )}
        </ImageBackground> */}

      {isButtonBottom && (
        <Skeleton
          visible={true}
          height={scale(50)}
          shimmerStyle={{
            borderRadius: scale(12),
          }}>
          <CustomButton
            buttonType="large"
            text="Dekat Stasiun LRT"
            styleText={styles.btnText}
            iconRight={IconNext}
          />
        </Skeleton>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    rowGap: scale(10),
  },
  img: {
    // aspectRatio: 1.4,
    // width: '100%',
    minHeight: scale(150),
    // flex: 1,
    borderRadius: scale(12),
    overflow: 'hidden',
    padding: scale(10),
  },
  title: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  detail: {
    flex: 1,
    justifyContent: 'flex-end',
    rowGap: scale(4),
  },
  detailContent: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
  },
  detailText: {
    fontSize: SIZES.xSmall,
    color: COLORS.white,
  },
  icon: {
    width: scale(12),
    height: scale(12),
  },
  btnText: {
    fontSize: SIZES.xMedium,
    textType: 'semiBold',
    color: COLORS.text,
  },
});

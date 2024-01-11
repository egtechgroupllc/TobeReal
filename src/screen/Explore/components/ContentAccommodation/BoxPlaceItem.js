import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  COLORS,
  SHADOW,
  SIZES,
  WIDTH,
  scale,
} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import {IconExplore, IconHouse, IconMarker} from '../../../../assets/icon/Icon';
import Ribbon from '../../../../components/Ribbon';
import Star from '../../../../components/Star';
import {formatPrice} from '../../../../utils/format';
import CustomImage from '../../../../components/CustomImage';

export default function BoxPlaceItem({
  seeViewNumber = 2.4,
  isViewMap,
  isStar,
  isDiscount,
  rental = 'month',
  multiPrice,
  isUnitAvailable,
}) {
  return (
    <View
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
          height: scale(160),
        }}>
        <Ribbon text="Promotion 30%" iconRight={IconHouse} />

        <CustomImage
          src="https://cdn.travelio.id/hotel/b6906-6538c063f4bc0a28cbe6e5e9/Deluxe-King_l.jpg"
          style={styles.img}
        />
        <View style={styles.area}>
          <View style={styles.areaBox}>
            <IconMarker
              style={{
                width: scale(10),
                height: scale(10),
              }}
            />
            <CustomText textType="regular" style={styles.areaName}>
              Hotel
            </CustomText>
          </View>

          <View style={styles.boxIcon}>
            <IconHouse
              style={{
                width: scale(16),
                height: scale(16),
              }}
            />
          </View>
        </View>
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
        {isStar && <Star rating={3} />}

        <View
          style={{
            backgroundColor: '#ccc',
            flex: 1,
            height: 1,
            marginVertical: scale(3),
          }}
        />

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
                    {formatPrice(10000000)} VNĐ{' '}
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
                  {formatPrice(10000000)} VNĐ{' '}
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
                    <IconExplore />
                  </TouchableOpacity>
                )}
              </View>
            </>
          ) : (
            <View style={styles.price}>
              <View
                style={{
                  rowGap: scale(4),
                }}>
                <CustomText
                  textType="semiBold"
                  style={[styles.buildingName, {color: '#000'}]}>
                  {formatPrice(10000000)} VNĐ{' '}
                  <CustomText
                    textType="regular"
                    style={{fontSize: SIZES.xSmall}}>
                    / night
                  </CustomText>
                </CustomText>
                <CustomText
                  textType="semiBold"
                  style={[styles.buildingName, {color: '#000'}]}>
                  {formatPrice(10000000)} VNĐ{' '}
                  <CustomText
                    textType="regular"
                    style={{fontSize: SIZES.xSmall}}>
                    / month
                  </CustomText>
                </CustomText>
                <CustomText
                  textType="semiBold"
                  style={[styles.buildingName, {color: '#000'}]}>
                  {formatPrice(10000000)} VNĐ{' '}
                  <CustomText
                    textType="regular"
                    style={{fontSize: SIZES.xSmall}}>
                    / year
                  </CustomText>
                </CustomText>
              </View>
              {isUnitAvailable && (
                <View style={styles.unitAvailable}>
                  <CustomText
                    textType="semiBold"
                    style={styles.textUnitAvailable}>
                    86{'\n'}
                    <CustomText textType="regular" style={{fontSize: scale(8)}}>
                      Unit {'\n'} Available
                    </CustomText>
                  </CustomText>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
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
  area: {
    position: 'absolute',
    alignSelf: 'center',
    top: scale(8),
    width: '94%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  areaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: scale(6),
    borderRadius: 99,
    columnGap: scale(4),
  },
  boxIcon: {
    backgroundColor: '#fff',
    padding: scale(4),
    borderRadius: 6,
  },
  areaName: {
    fontSize: SIZES.xSmall,
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
  unitAvailable: {
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    padding: scale(4),
    paddingHorizontal: scale(6),
  },
  textUnitAvailable: {
    color: '#000',
    textAlign: 'center',
    fontSize: SIZES.xSmall,
  },
});

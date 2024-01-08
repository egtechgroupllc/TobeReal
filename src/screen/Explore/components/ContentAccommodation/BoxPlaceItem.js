import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  COLORS,
  SHADOW,
  SIZES,
  WIDTH,
  scale,
} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import {IconHouse, IconMarker} from '../../../../assets/icon/Icon';
import Ribbon from '../../../../components/Ribbon';
import Star from '../../../../components/Star';
import {formatPrice} from '../../../../utils/formatPrice';

export default function BoxPlaceItem({seeViewNumber = 2.5}) {
  return (
    <View
      style={[
        styles.wrapper,
        {
          width: WIDTH.widthScreen / seeViewNumber,
        },
        SHADOW,
      ]}>
      <View
        style={{
          width: '100%',
          height: scale(160),
        }}>
        <Ribbon text="Promotion 30%" iconRight={IconHouse} />

        <Image
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
        <CustomText textType="bold" style={styles.buildingName}>
          Hotel Residence
        </CustomText>
        <Star rating={3} />

        <CustomText textType="bold" style={styles.buildingName}>
          {formatPrice(10000000)} VNĐ
        </CustomText>
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
    fontSize: SIZES.xMedium,
  },
});

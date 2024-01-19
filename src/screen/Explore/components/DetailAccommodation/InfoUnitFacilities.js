import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContent from '../WrapperContent';
import CustomText from '../../../../components/CustomText';
import {COLORS, SIZES, WIDTH, scale} from '../../../../assets/constants';
import {IconHouse} from '../../../../assets/icon/Icon';

const listFacilities = [
  'City View',
  'Deposit Box',
  'Desk & Chair',
  'Sink',
  'Telephone',
  'Blanket',
  'Wardrobe/ Multi Purpose Hanger',
  'Shower',
  'Water Heater',
  'Non-Smoking Room',
  'Air Conditioner (AC)',
  'TV',
];

export default function InfoUnitFacilities() {
  return (
    <WrapperContent
      isSeeAll
      onPressSeeAll={() => console.log(1)}
      heading="Unit Facilities"
      styleContent={{
        paddingHorizontal: scale(16),
        rowGap: scale(10),
      }}>
      <View style={styles.header}>
        <IconHouse
          style={{
            width: scale(18),
            height: scale(18),
          }}
        />

        <CustomText
          textType="semiBold"
          style={{
            fontSize: SIZES.xMedium,
          }}>
          Room amenities
        </CustomText>
      </View>

      <View style={styles.content}>
        {listFacilities.map((item, index) => (
          <View key={`key-${item}-${index}`} style={styles.itemFac}>
            <View style={styles.dot} />
            <CustomText
              textType="regular"
              style={{
                fontSize: SIZES.xMedium,
              }}>
              {item}
            </CustomText>
          </View>
        ))}
      </View>
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
  },
  content: {
    rowGap: scale(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: scale(20),
    width: WIDTH.widthContain,
    alignSelf: 'center',
  },
  itemFac: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(8),
  },
  dot: {
    width: scale(4),
    aspectRatio: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 99,
  },
});

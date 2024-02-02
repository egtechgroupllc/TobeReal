import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/CustomText';
import Ribbon from '../../../../components/Ribbon';
import {COLORS, SIZES, WIDTH, scale} from '../../../../assets/constants';
import {IconHouse, IconRoom} from '../../../../assets/icon/Icon';
import Introduction from './Introduction';
import { useLanguage } from '../../../../hooks/useLanguage';

export default function InfoDetail() {
  const {t}= useLanguage()
  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <CustomText textType="semiBold" style={styles.name}>
            JP Hotel Pluit JP Hotel
          </CustomText>
          <View style={styles.boxHot}>
            <CustomText
              textType="semiBold"
              style={{textAlign: 'center', color: '#fff'}}>
              Hotel Residence 🏨
            </CustomText>
          </View>
        </View>

        <View style={styles.room}>
          <View style={styles.boxRoom}>
            <IconHouse style={styles.icon} />
            <CustomText textType="regular">{t('hotel_residence')}</CustomText>
          </View>
          <View style={styles.boxRoom}>
            <IconRoom style={styles.icon} />
            <CustomText textType="regular">1</CustomText>
          </View>
        </View>

        <View style={styles.room}>
          <View style={[styles.boxMore, styles.rating]}>
            <CustomText
              style={{color: COLORS.white, lineHeight: 18}}
              textType="bold">
              {t('new')}
            </CustomText>
          </View>
          <View style={styles.boxMore}>
            <CustomText textType="bold">{t('discussion')} (0)</CustomText>
          </View>
        </View>
      </View>
      <Introduction />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // width: WIDTH.widthContain,
    rowGap: scale(8),
    backgroundColor: '#fff',
    padding: scale(16),
    paddingBottom: scale(4),
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
  },
  name: {flex: 1, fontSize: SIZES.xMedium},
  boxHot: {
    backgroundColor: '#9681fA',
    paddingHorizontal: scale(6),
    paddingVertical: scale(4),
    borderRadius: scale(6),
    maxWidth: scale(110),
  },

  room: {
    flexDirection: 'row',
    columnGap: scale(10),
    rowGap: scale(6),
    flex: 1,
    flexWrap: 'wrap',
  },
  boxRoom: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(4),
  },
  icon: {
    width: scale(16),
    height: scale(16),
  },
  boxMore: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: scale(6),
    padding: scale(5),
    overflow: 'hidden',
  },
  rating: {
    borderWidth: 0,
    backgroundColor: '#de4e4e',
  },
});

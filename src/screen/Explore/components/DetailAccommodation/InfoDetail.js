import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../../assets/constants';
import {IconHome, IconRoom} from '../../../../assets/icon/Icon';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
import Introduction from './Introduction';

export default function InfoDetail({name}) {
  const {t} = useLanguage();
  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <CustomText textType="semiBold" style={styles.name}>
            {name}
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
            <IconHome style={styles.icon} />
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
          <TouchableOpacity>
            <CustomImage
              source={images.iconTiktok}
              style={{width: scale(20), height: scale(20)}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <CustomImage
              source={images.iconYoutube}
              style={{width: scale(20), height: scale(20)}}
            />
          </TouchableOpacity>
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
    alignItems: 'center',
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

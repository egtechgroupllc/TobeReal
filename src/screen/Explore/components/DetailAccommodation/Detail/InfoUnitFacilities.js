import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import WrapperContent from '../../WrapperContent';
import CustomText from '../../../../../components/CustomText';
import {COLORS, SIZES, WIDTH, scale} from '../../../../../assets/constants';
import {IconHome} from '../../../../../assets/icon/Icon';
import BottomSheet from '../../../../../components/BottomSheet';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function InfoUnitFacilities({data}) {
  const {t} = useLanguage();
  const bottomSheetRef = useRef();

  return (
    <WrapperContent
      isSeeAll
      onPressSeeAll={() => bottomSheetRef.current.open()}
      heading={t('unit_facilities')}
      styleContent={{
        paddingHorizontal: scale(16),
        rowGap: scale(10),
      }}>
      <View style={styles.header}>
        <IconHome
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
          {t('room_amenities')}
        </CustomText>
      </View>

      {data?.features && (
        <View style={styles.content}>
          {data?.features.slice(0, 10).map((item, index) => (
            <View key={`key-${item}-${index}`} style={styles.itemFac}>
              <View style={styles.dot} />
              <CustomText
                textType="regular"
                style={{
                  fontSize: SIZES.xMedium,
                }}>
                {t(item)}
              </CustomText>
            </View>
          ))}
        </View>
      )}

      {!!data?.features && (
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={['50%', '86%']}
          titleIndicator={t('room_facilities')}>
          <View style={styles.content}>
            {data?.features.map((item, index) => (
              <View key={`key-${item}-${index}`} style={styles.itemFac}>
                <View style={styles.dot} />
                <CustomText
                  textType="regular"
                  style={{
                    fontSize: SIZES.xMedium,
                  }}>
                  {t(item)}
                </CustomText>
              </View>
            ))}
          </View>
        </BottomSheet>
      )}
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
    maxHeight: scale(130),
    overflow: 'hidden',
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

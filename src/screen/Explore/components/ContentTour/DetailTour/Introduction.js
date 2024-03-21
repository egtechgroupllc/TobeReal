import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomText from '../../../../../components/CustomText';
import {COLORS, SIZES, WIDTH, scale} from '../../../../../assets/constants';


import {useLanguage} from '../../../../../hooks/useLanguage';
import BottomSheet from '../../../../../components/BottomSheet';
import WrapperContent from '../../WrapperContent';
import { TabSelect } from '../../../../../components';


export default function Introduction() {
  const {t} = useLanguage();
  const listTab = [t('trip_highlight'), t('tour_schedule')];
  const bottomSheetRef = useRef();

  const [tabSelect, setTabSelect] = useState(listTab[0]);

  return (
    <WrapperContent
      heading={t('introduction')}
      styleContent={{
        paddingHorizontal: scale(16),
      }}>
      <TabSelect
        data={listTab}
        onChange={value => {
          setTabSelect(value);
        }}
        styleContent={{
          padding: scale(12),
        }}
        renderView={() =>
          tabSelect === listTab[0] ? (
            <CustomText
              style={{
                lineHeight: 18,
              }}>
              Staying at Cochin Sang Hotel is a right choice when you visit
              visitors to Ben Thanh Ward. The hotel possesses a prime location
              6.64 km from Tan Son Nhat Airport. Stay at Cochin Sang Hotel is a
              good choice when you visit Ben Ward Wall. The hotel possesses a
              prime location away from Tan Airport Son Nhat 6.64 km.
            </CustomText>
          ) : (
            <CustomText
              style={{
                lineHeight: 18,
              }}>
              Enjoy a unique stay experience at the building Cochin Sang Hotel's
              rich historical imprint, which is difficult for you can be found
              anywhere. {'\n'}If planning to have a vacation long, then Cochin
              Sang Hotel is the choice for you. With full amenities and
              excellent service quality, Cochin Sang Hotel will make you feel
              comfortable like you are at home.
            </CustomText>
          )
        }
      />
      <View
        style={{
          position: 'absolute',
          bottom: scale(10),
          right: scale(30),
        }}>
        <CustomText
          textType="semiBold"
          style={{
            color: COLORS.primary,
            minWidth: scale(42),
          }}
          onPress={() => bottomSheetRef.current.open()}>
          {t('see_all')}
        </CustomText>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%', '80%']}
        titleIndicator={
          tabSelect === listTab[0] ? t('description_content') : 'Nearby'
        }
        styleContent={{
          paddingHorizontal: scale(16),
        }}>
        <View style={styles.content}>
          {[1, 2].map((item, index) => (
            <View key={`key-${item}-${index}`} style={styles.itemFac}>
              <View style={styles.dot} />
              <CustomText
                textType="regular"
                style={{
                  fontSize: SIZES.xMedium,
                }}>
                Enjoy a unique stay experience at the building Cochin Sang
                Hotel's rich historical imprint, which is difficult for you can
                be found anywhere. {'\n'}If planning to have a vacation long,
                then Cochin Sang Hotel is the choice for you. With full
                amenities and excellent service quality, Cochin Sang Hotel will
                make you feel comfortable like you are at home.
              </CustomText>
            </View>
          ))}
        </View>
      </BottomSheet>
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  introduction: {
    // backgroundColor: '#ccc',
    width: WIDTH.widthContain,
    rowGap: scale(10),
  },
  textIntroduction: {
    fontSize: SIZES.medium,
  },
  textSubIntroduction: {
    fontSize: SIZES.xMedium,
  },
});

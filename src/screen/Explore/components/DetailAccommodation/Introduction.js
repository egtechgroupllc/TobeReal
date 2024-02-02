import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../../components/CustomText';
import {SIZES, WIDTH, scale} from '../../../../assets/constants';
import {TabSelect} from '../../../../components';
import WrapperContent from '../WrapperContent';
import { useLanguage } from '../../../../hooks/useLanguage';

const listTab = ['Description', 'Nearby'];
export default function Introduction() {
  const {t}= useLanguage()
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
              6.64 km from Tan Son Nhat Airport. Stay at Cochin Sang
              Hotel is a good choice when you visit Ben Ward
              Wall. The hotel possesses a prime location away from Tan Airport
              Son Nhat 6.64 km.
            </CustomText>
          ) : (
            <CustomText
              style={{
                lineHeight: 18,
              }}>
              Enjoy a unique stay experience at the building
              Cochin Sang Hotel's rich historical imprint, which is difficult for you
              can be found anywhere. {'\n'}If planning to have a vacation
              long, then Cochin Sang Hotel is the choice for you.
              With full amenities and excellent service quality, Cochin Sang
              Hotel will make you feel comfortable like you are at home.
            </CustomText>
          )
        }
      />
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

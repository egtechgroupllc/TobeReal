import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomText from '../../../../../components/CustomText';
import {COLORS, SIZES, WIDTH, scale} from '../../../../../assets/constants';

import {useLanguage} from '../../../../../hooks/useLanguage';
import BottomSheet from '../../../../../components/BottomSheet';
import WrapperContent from '../../WrapperContent';
import {TabSelect} from '../../../../../components';
import LinearGradient from 'react-native-linear-gradient';

const listTab = ['Trip highlights'];
export default function TourSchedule() {
  const {t} = useLanguage();
  const bottomSheetRef = useRef();

  const [tabSelect, setTabSelect] = useState(listTab[0]);

  return (
    <WrapperContent
      heading={t('tour_schedule')}
      styleWrapper={{
        marginBottom: scale(10),
        marginTop: scale(-20),
        alignItems: 'center',
      }}
      styleContent={{
        paddingHorizontal: scale(16),
        backgroundColor: COLORS.box,
        width: '90%',
        paddingVertical: scale(10),
      }}>
      <CustomText
        style={{
          lineHeight: 18,
          color: COLORS.white,
        }}>
        08:15-21:00 Participants will be picked up by tour leader at Tan Son
        Nhat International Airport for flight check-in to Phuket. Start your
        tour and visit: - Prom Thep Cape - located at the southern tip of the
        island, offering the most spectacular sunset views in Phuket. Thousands
        of tourists flock here to witness the sunset and capture the moment as
        the sun slowly sets on the horizon. - Chalong Temple - an iconic
        Buddhist temple that cannot be missed when visiting Phuket. Here, you
        can purchase blessed threads made by the monks to bring peace and
        prosperity to your home. Enjoy a Thai-style BBQ dinner before returning
        to the hotel for free leisure time to explore Phuket at night.
      </CustomText>
      <LinearGradient
        colors={COLORS.backgroundLinear}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          height: scale(35),
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: scale(20),
          marginVertical: scale(10),
        }}>
        <TouchableOpacity
          onPress={() => bottomSheetRef.current.open()}
          style={{alignItems: 'center'}}>
          <CustomText
            textType="semiBold"
            style={{
              color: COLORS.white,
              // minWidth: scale(42),
            }}>
            {t('see_all')}
          </CustomText>
        </TouchableOpacity>
      </LinearGradient>

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

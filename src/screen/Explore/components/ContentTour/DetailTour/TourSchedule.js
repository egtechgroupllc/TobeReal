import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomText from '../../../../../components/CustomText';
import {COLORS, SIZES, WIDTH, scale} from '../../../../../assets/constants';

import {useLanguage} from '../../../../../hooks/useLanguage';
import BottomSheet from '../../../../../components/BottomSheet';
import WrapperContent from '../../WrapperContent';
import {CustomButton, TabSelect} from '../../../../../components';
import LinearGradient from 'react-native-linear-gradient';

const listTab = ['Trip highlights'];
export default function TourSchedule({data}) {
  const {t} = useLanguage();
  const bottomSheetRef = useRef();
  const [tabSelect, setTabSelect] = useState(listTab[0]);
  const [selectedDay, setSelectedDay] = useState(
    JSON.parse(data?.schedule)[0]?.title,
  );
  const handleDayClick = value => {
    setSelectedDay(value);
  };

  return (
    <WrapperContent
      heading={t('tour_schedule')}
      styleWrapper={
        {
          // marginBottom: scale(20),
        }
      }
      styleContent={{
        paddingHorizontal: scale(16),
        minHeight: scale(50),
      }}>
      <CustomText
        style={{
          lineHeight: 18,
          color: COLORS.white,
        }}>
        {JSON.parse(data?.schedule)?.[0]?.description}
      </CustomText>
      <LinearGradient
        colors={COLORS.linearButton}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          position: 'absolute',
          bottom: scale(-10),
          height: scale(35),
          width: '110%',
          opacity: 0.8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => bottomSheetRef.current.open()}>
          <CustomText
            textType="semiBold"
            style={{
              color: COLORS.black,
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
          {JSON.parse(data?.schedule)?.map((item, index) => (
            <>
              <CustomButton
                key={item?.title}
                text={item?.title}
                style={{width: '20%', height: scale(30)}}
                onPress={() => handleDayClick(item?.title)}
              />

              <View key={`key-${item}-${index}`} style={styles.itemFac}>
                <View style={styles.dot} />
                {item?.title === selectedDay && (
                  <CustomText
                    textType="regular"
                    style={{
                      fontSize: SIZES.xMedium,
                    }}>
                    {item?.description}
                  </CustomText>
                )}
              </View>
            </>
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
  content: {
    rowGap: scale(10),
    width: WIDTH.widthContain,
    maxHeight: scale(130),
  },
  dot: {
    backgroundColor: COLORS.black,
    width: scale(5),
    height: scale(5),
    borderRadius: 99,
    top: scale(5),
  },
  itemFac: {
    flexDirection: 'row',
    // alignItems: 'center',
    columnGap: scale(8),
  },
});

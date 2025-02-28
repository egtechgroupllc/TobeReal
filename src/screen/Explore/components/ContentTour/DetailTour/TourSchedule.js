import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomText from '../../../../../components/CustomText';
import {COLORS, SIZES, WIDTH, scale} from '../../../../../assets/constants';

import {useLanguage} from '../../../../../hooks/useLanguage';
import BottomSheet from '../../../../../components/BottomSheet';
import WrapperContent from '../../WrapperContent';
import {CustomButton, TabSelect} from '../../../../../components';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import {preprocessHtml} from '../../../../../utils/preprocessHtml';
import RenderHTML from 'react-native-render-html';

export default function TourSchedule({data}) {
  const {t} = useLanguage();
  const bottomSheetRef = useRef();
  const [selectedDay, setSelectedDay] = useState(
    JSON.parse(data?.schedule)[0]?.title,
  );
  const width = useWindowDimensions().width;

  const handleDayClick = value => {
    setSelectedDay(value);
  };

  const context = JSON.parse(data?.schedule).find(
    item => item?.title === selectedDay,
  );
  return (
    <WrapperContent
      noBackground
      heading={t('tour_schedule')}
      styleWrapper={
        {
          // marginBottom: scale(20),
        }
      }
      styleContent={{
        minHeight: scale(50),
        paddingHorizontal: scale(16),
      }}>
      <RenderHTML
        contentWidth={width}
        source={preprocessHtml(JSON.parse(data?.schedule)?.[0]?.description)}
        baseStyle={{
          color: 'black',
        }}
        tagsStyles={{
          p: {
            marginVertical: 0,
            width: width - scale(16),
          },
        }}
      />

      <LinearGradient
        colors={[COLORS.pioPrimary, COLORS.pioBox]}
        start={{x: 0, y: 0}}
        end={{x: 3, y: 0}}
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
        titleIndicator={t('description_content')}
        handleStyle={{color: COLORS.black}}
        styleContent={{
          rowGap: scale(10),
          paddingHorizontal: scale(16),
        }}>
        <ScrollView horizontal>
          <View style={styles.content}>
            {JSON.parse(data?.schedule)?.map((item, index) => {
              return (
                <View key={index}>
                  {JSON.parse(data?.schedule).length > 1 && (
                    <CustomButton
                      text={item?.title}
                      style={{
                        width: scale(70),
                        height: scale(30),
                        backgroundColor:
                          item?.title === selectedDay
                            ? COLORS.pioPrimary
                            : COLORS.grey,
                      }}
                      onPress={() => handleDayClick(item?.title)}
                    />
                  )}
                  {/* {item?.title === selectedDay && (
                <View key={`key-${item}-${index}`} style={styles.itemFac}>
                  <View style={styles.dot} />

                  <CustomText
                    textType="regular"
                    style={{
                      fontSize: SIZES.xMedium,
                    }}>
                    {item?.description}
                  </CustomText>
                </View>
              )} */}
                </View>
              );
            })}
          </View>
        </ScrollView>
        {/* <View style={styles.dot} /> */}
        <RenderHTML
          contentWidth={width}
          source={preprocessHtml(context?.description)}
          baseStyle={{
            color: 'black',
          }}
          tagsStyles={{
            p: {
              marginVertical: 0,
              width: width - scale(16),
            },
          }}
        />
        {/* <CustomText
            textType="regular"
            style={{
              fontSize: SIZES.xMedium,
            }}>
            {context?.description}
          </CustomText> */}
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
    flexDirection: 'row',
    columnGap: scale(10),
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

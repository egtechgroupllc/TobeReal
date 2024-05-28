import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

import {useLanguage} from '../../../../../hooks/useLanguage';

import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import CustomText from '../../../../../components/CustomText';
import MainWrapper from '../../../../../components/MainWrapper';
import ImageDetail from '../../../../components/ImageDetail';
import BasicFacilities from './DetailRoom/BasicFacilities';
import BookRoom from './DetailRoom/BookRoom';
import RoomInformation from './DetailRoom/RoomInformation';

export default function DetailRoomScreen({route}) {
  const data = route.params;
  const {t} = useLanguage();

  return (
    <>
      <MainWrapper
        styleContent={{
          paddingHorizontal: scale(10),
          alignItems: 'center',
        }}>
        <CustomText
          textType="semiBold"
          style={{
            ...styles.textLarge,
            marginTop: scale(20),
            color: COLORS.white,
          }}>
          {data.name}
        </CustomText>

        <View style={styles.view}>
          <ImageDetail arrImg={data.images} styleWrapper={styles.image} />
          <View
            style={{
              padding: scale(10),
              rowGap: scale(10),
            }}>
            <View
              style={{
                alignSelf: 'flex-start',
                rowGap: scale(10),
              }}>
              <CustomText
                textType="semiBold"
                size={SIZES.medium}
                style={{color: COLORS.black}}>
                {data?.room_type?.name}
              </CustomText>

              <View style={styles.boxFreeUnRoom}>
                <CustomText size={SIZES.xMedium} color="#00875a">
                  Free cancellation
                </CustomText>
              </View>
            </View>

            <Box
              title={t('room_information')}
              styleContent={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <RoomInformation
                data={data}
                isFilterChildren={!!data?.dataFilter?.numChild.length}
              />
            </Box>
            {/* t('little_convenient') */}
            <Box
              title={'Basic amenities'}
              styleContent={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <BasicFacilities data={data} />
            </Box>

            <Box title={'Other amenities'}>
              <View
                style={{
                  width: '100%',
                  rowGap: scale(10),
                }}>
                <CustomText textType="semiBold" style={{color: COLORS.black}}>
                  Room amenities:
                </CustomText>

                <View style={styles.contentFeat}>
                  {data?.features?.map((item, index) => (
                    <View style={styles.boxFeat} key={index}>
                      <View style={styles.dot} />
                      <CustomText style={{color: COLORS.black}}>
                        {item}
                      </CustomText>
                    </View>
                  ))}
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  rowGap: scale(10),
                }}>
                <CustomText textType="semiBold" style={{color: COLORS.black}}>
                  Bathroom:
                </CustomText>

                <View style={styles.contentFeat}>
                  {data?.features?.map((item, index) => (
                    <View style={styles.boxFeat} key={index}>
                      <View style={styles.dot} />
                      <CustomText style={{color: COLORS.black}}>
                        {item}
                      </CustomText>
                    </View>
                  ))}
                </View>
              </View>
            </Box>
          </View>
        </View>
      </MainWrapper>
      <BookRoom data={data} />
    </>
  );
}

const Box = ({children, title, styleContent}) => {
  return (
    <View
      style={{
        rowGap: scale(10),
      }}>
      <CustomText
        textType="semiBold"
        style={{
          fontSize: SIZES.xMedium,
          color: COLORS.black,
        }}>
        {title}:
      </CustomText>
      <View
        style={{
          ...styles.box,
          minHeight: scale(30),
          ...styleContent,
        }}>
        {children}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    marginTop: scale(10),
    minHeight: scale(63),
    borderRadius: scale(20),
    borderWidth: scale(1),
    borderColor: COLORS.green,
    backgroundColor: '#FFFFFF',
    ...SHADOW,
    width: '100%',
  },

  image: {
    width: '100%',
    height: scale(200),
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    overflow: 'hidden',
  },

  contentFeat: {
    rowGap: scale(6),
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: scale(20),
  },
  boxFeat: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(4),
  },
  dot: {
    width: scale(4),
    aspectRatio: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 99,
  },
  text: {
    fontSize: SIZES.medium,
  },
  text1: {
    fontSize: SIZES.xSmall,
  },

  textLarge: {
    fontSize: SIZES.xMedium,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(40),
    width: scale(283),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  button1: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(33),
    width: scale(74),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  line: {
    height: scale(1),
    backgroundColor: 'black',
  },
  box: {
    minHeight: scale(200),
    borderRadius: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.green,
    borderWidth: scale(1),
    padding: scale(10),
    gap: scale(10),
  },

  boxFreeUnRoom: {
    backgroundColor: '#06c17520',
    paddingVertical: scale(4),
    paddingHorizontal: scale(6),
    borderRadius: scale(99),
  },
});

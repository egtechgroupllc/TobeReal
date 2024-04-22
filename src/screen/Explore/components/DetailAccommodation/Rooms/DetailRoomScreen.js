import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../../../hooks/useLanguage';

import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {
  IconAcreage,
  IconConditioner,
  IconFridge,
  IconPeople,
  IconRoom,
  IconTV,
  IconWifi,
} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import MainWrapper from '../../../../../components/MainWrapper';
import {useAuthentication} from '../../../../../hooks/useAuthentication';
import {formatPrice} from '../../../../../utils/format';
import ImageDetail from '../../../../components/ImageDetail';
import ItemUtil from './components/ItemUtil';
import BookRoom from './DetailRoom/BookRoom';

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
            color: COLORS.black,
            marginTop: scale(20),
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
                style={{
                  fontSize: SIZES.medium,
                }}>
                {data?.room_type?.name}
              </CustomText>
              <View
                style={{
                  backgroundColor: '#06c17520',
                  paddingVertical: scale(4),
                  paddingHorizontal: scale(6),
                  borderRadius: scale(99),
                }}>
                <CustomText
                  style={{
                    fontSize: SIZES.xMedium,
                    color: '#00875a',
                  }}>
                  Miễn phí huỷ phòng
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
              <ItemUtil
                Icon={IconPeople}
                value={`${2} khách`}
                title={'Khách'}
                styleWrapper={{
                  width: '45%',
                }}
              />
              <ItemUtil
                Icon={IconRoom}
                value={data?.room_bed_type?.name}
                title={'Loại giường'}
                styleWrapper={{
                  width: '45%',
                }}
              />
              <ItemUtil
                title={'Kích thước phòng'}
                Icon={IconAcreage}
                value={formatPrice(data.size_width * data.size_length, {
                  unit: 'm²',
                })}
                styleIcon={{
                  width: scale(20),
                  height: scale(20),
                  color: '#000',
                }}
                styleWrapper={{
                  width: '45%',
                }}
              />
            </Box>
            {/* t('little_convenient') */}
            <Box
              title={'Tiên nghi cơ bản'}
              styleContent={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <ItemUtil
                Icon={IconWifi}
                value={'Free wifi'}
                styleIcon={styles.iconFac}
                valueBold
                vertical
              />
              <ItemUtil
                Icon={IconConditioner}
                value={'Air conditioner '}
                styleIcon={styles.iconFac}
                valueBold
                vertical
              />
              <ItemUtil
                Icon={IconTV}
                value={'TV'}
                styleIcon={styles.iconFac}
                valueBold
                vertical
              />
              <ItemUtil
                Icon={IconFridge}
                value={'Fridge'}
                styleIcon={styles.iconFac}
                valueBold
                vertical
              />
            </Box>
            <Box title={'Tiên nghi khác'}>
              <View
                style={{
                  width: '100%',
                  rowGap: scale(10),
                }}>
                <CustomText textType="semiBold">Tiện nghi phòng:</CustomText>

                <View style={styles.contentFeat}>
                  {data?.features?.map((item, index) => (
                    <View style={styles.boxFeat} key={index}>
                      <View style={styles.dot} />
                      <CustomText>{item}</CustomText>
                    </View>
                  ))}
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  rowGap: scale(10),
                }}>
                <CustomText textType="semiBold">Phòng tắm:</CustomText>

                <View style={styles.contentFeat}>
                  {data?.features?.map((item, index) => (
                    <View style={styles.boxFeat} key={index}>
                      <View style={styles.dot} />
                      <CustomText>{item}</CustomText>
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
    borderColor: '#F0B90B40',
    backgroundColor: '#FFFFFF',
    ...SHADOW,
    // shadowColor: '#F0B90B40',
    width: '100%',
  },

  image: {
    width: '100%',
    height: scale(200),
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    overflow: 'hidden',
  },
  iconFac: {
    width: scale(20),
    height: scale(20),
    color: '#000',
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
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    padding: scale(10),
    gap: scale(10),
  },

  img: {
    width: scale(21),
    height: scale(10),
  },

  box1: {
    backgroundColor: '#EEEEEE',
    height: scale(54),
    borderRadius: scale(8),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    width: '90%',
  },
});

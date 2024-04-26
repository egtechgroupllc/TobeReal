import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../assets/constants';

import {useNavigation} from '@react-navigation/native';
import {
  IconAcreage,
  IconEmail,
  IconPeople,
  IconPhone,
  IconProfile,
  IconRoom,
} from '../../../../assets/icon/Icon';
import CustomText from '../../../../components/CustomText';
import Button from '../../../Profile/components/Button';

import Star from '../../../../components/Star';
import {useLanguage} from '../../../../hooks/useLanguage';
import {formatPrice} from '../../../../utils/format';
import ItemUtil from '../../../Explore/components/DetailAccommodation/Rooms/components/ItemUtil';
import {useQueryClient} from '@tanstack/react-query';
import CustomImage from '../../../../components/CustomImage';
export default function Content({onPress, data}) {
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData(['user', 'profile'])?.data;
  const {t} = useLanguage();

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const notify = () => {};
  const Ok = () => {
    onPress();
  };
  return (
    <View style={styles.container}>
      {/* <Category
        data={[t('daily'), t('monthly'), t('yearly')]}
        onChange={value => setCategory(value)}
      /> */}

      <View style={styles.view}>
        <View
          style={{
            // alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: scale(10),
            columnGap: scale(10),
          }}>
          <CustomImage
            source={data?.images?.[0].url}
            style={{
              width: scale(80),
              height: scale(80),
              borderRadius: scale(10),
            }}></CustomImage>
          <View style={{flex: 1, rowGap: scale(5)}}>
            <CustomText
              textType="bold"
              numberOfLines={2}
              style={{
                fontSize: SIZES.medium,
                color: COLORS.black,
              }}>
              {data?.nameAccom}
            </CustomText>
            <CustomText
              textType="semiBold"
              style={{
                fontSize: SIZES.xMedium,
              }}>
              {data?.room_type?.name}
            </CustomText>
            <Star rating={2} />
          </View>
        </View>

        {/* <CustomText
          textType="medium"
          style={{
            ...styles.text2,
            color: COLORS.black,
            marginTop: scale(10),
            alignSelf: 'flex-start',
            paddingHorizontal: scale(20),
          }}>
          {t('choose_time')}:
        </CustomText>

        <FindContent rental={category} /> */}

        <View
          style={{
            // padding: scale(10),
            rowGap: scale(10),
            paddingBottom: scale(10),
          }}>
          <View
            style={{
              alignSelf: 'flex-start',
              rowGap: scale(10),
            }}>
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
            <ItemUtil
              Icon={IconPeople}
              value={`${data?.numRoomGuest?.numGuest} guest`}
              title={'Guest'}
              styleWrapper={{
                width: '45%',
              }}
            />
            <ItemUtil
              Icon={IconRoom}
              value={data?.room_bed_type?.name}
              title={'Bed type'}
              styleWrapper={{
                width: '45%',
              }}
            />
            <ItemUtil
              title={'Room size'}
              Icon={IconAcreage}
              value={formatPrice(data?.size_width * data?.size_length, {
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
        </View>
        <Box
          title={t('contact_detail')}
          styleContent={{marginBottom: scale(10)}}>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
              alignSelf: 'flex-start',
            }}>
            <IconProfile />
            <CustomText
              textType="medium"
              style={{
                ...styles.text2,
                color: COLORS.black,
                alignSelf: 'flex-start',
              }}>
              {profile?.username}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
              alignSelf: 'flex-start',
            }}>
            <IconEmail
              fill={COLORS.grey}
              width={scale(14)}
              height={scale(14)}
            />
            <CustomText
              textType="medium"
              style={{
                ...styles.text2,
                color: COLORS.black,
                alignSelf: 'flex-start',
              }}>
              {profile?.email}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
              alignSelf: 'flex-start',
            }}>
            <IconPhone
              fill={COLORS.grey}
              width={scale(14)}
              height={scale(14)}
            />
            <CustomText
              textType="medium"
              style={{
                ...styles.text2,
                color: COLORS.black,
                alignSelf: 'flex-start',
              }}>
              {profile?.phone}
            </CustomText>
          </View>
        </Box>
        {/* <TouchableOpacity
          style={{
            height: scale(30),
            borderWidth: scale(1),
            marginTop: scale(20),
            width: '90%',
            borderColor: '#D8D8D8',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <CustomImage
            source={images.iconCoupon}
            resizeMode="contain"
            style={styles.img}
          />
          <CustomText
            textType="medium"
            style={{
              ...styles.text2,
              color: COLORS.black,
              marginHorizontal: scale(10),
            }}>
            {t('use_coupon')}
          </CustomText>
        </TouchableOpacity> */}
        <Box title={t('price_detail')} styleContent={{marginBottom: scale(20)}}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              paddingHorizontal: scale(20),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text2,
                color: COLORS.black,
                flex: 1,
              }}>
              {t('room_rate')}:
            </CustomText>
            <CustomText
              textType="medium"
              style={{
                ...styles.text2,
                color: COLORS.black,
                flex: 1,
              }}>
              {formatPrice(data?.priceAverage)}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              paddingHorizontal: scale(20),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text2,
                color: COLORS.black,
                flex: 1,
              }}>
              {t('taxes_and_fees')}:
            </CustomText>
            <CustomText
              textType="medium"
              style={{
                ...styles.text2,
                color: COLORS.black,
                flex: 1,
              }}>
              {formatPrice(0)}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              paddingHorizontal: scale(20),
            }}>
            <CustomText
              textType="semiBold"
              style={{
                ...styles.text,
                color: COLORS.black,
                marginTop: scale(10),
                flex: 1,
              }}>
              {t('total')}:
            </CustomText>
            <CustomText
              textType="medium"
              style={{
                ...styles.text,
                color: COLORS.black,
                marginTop: scale(10),
                flex: 1,
              }}>
              {formatPrice(data?.priceAverage)}
            </CustomText>
          </View>
        </Box>
        {/* <TouchableOpacity style={{width: '100%', alignItems: 'center'}}>
          <LinearGradient
            colors={['#FADD55', '#D88A00']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{
              ...styles.box1,
              marginBottom: scale(20),
              marginTop: scale(10),
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{marginLeft: scale(10)}}>
                <IconApp />
              </View>
              <View style={{marginLeft: scale(10)}}>
                <CustomText
                  textType="semiBold"
                  style={{...styles.text2, color: COLORS.black}}>
                  {t('wallet')} Saveloka
                </CustomText>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity> */}
      </View>
      <Button title={t('book')} onPress={Ok} />
    </View>
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
  container: {
    paddingBottom: scale(50),
    width: '90%',
    alignSelf: 'center',
  },
  view: {
    minHeight: scale(63),
    borderRadius: scale(20),
    paddingHorizontal: scale(20),
    // alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(1),
    borderColor: '#F0B90B40',
    backgroundColor: '#FFFFFF',
    shadowColor: '#F0B90B40',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  text: {
    fontSize: SIZES.medium,
  },
  text1: {
    fontSize: SIZES.xSmall,
  },
  text2: {
    fontSize: SIZES.small,
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
  listFacilities: {
    marginTop: scale(20),
    borderRadius: scale(10),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    width: '109%',
    minHeight: scale(100),
  },
  buttonEstateType: {
    marginTop: scale(20),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    borderRadius: scale(10),
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
    // backgroundColor:'#E3E3E3'
  },
  buttonEstateTypes: {
    marginTop: scale(20),
    borderTopLeftRadius: scale(10),
    borderTopEndRadius: scale(10),
    borderTopRightRadius: scale(10),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
    // backgroundColor:'#E3E3E3'
  },
  buttonCategories: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: scale(4),
    borderWidth: scale(1),
    borderColor: '#F0B90B80',
    height: scale(50),
    width: '90%',
    justifyContent: 'space-between',
    marginTop: scale(10),
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    flexDirection: 'row',
    paddingHorizontal: scale(20),
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

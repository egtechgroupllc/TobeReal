import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import MainAuth from '../../../../../../components/MainAuth';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../../../../hooks/useLanguage';

import {Category} from '../../../../../../components';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SIZES, images, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';
import CustomImage from '../../../../../../components/CustomImage';
import Button from '../../../../../Profile/components/Button';
import Header from '../../../../../Profile/components/Header';
import Star from '../../../../../../components/Star';
import {useAuthentication} from '../../../../../../hooks/useAuthentication';
import {
  IconBed,
  IconConditioner,
  IconFridge,
  IconLand,
  IconPeople,
  IconTV,
  IconWifi,
} from '../../../../../../assets/icon/Icon';

export default function DetailRoomScreen({route}) {
  const {image, title, price, acreage, info, name, description} = route.params;
  const {token} = useAuthentication();
  const {t} = useLanguage();
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const notify = () => {};
  const Ok = () => {
    token
      ? navigation.navigate('NavigationAuth')
      : navigation.navigate('BookingScreen');
  };
  return (
    <MainAuth>
      <View style={styles.container}>
        <Header
          goback={true}
          subHeading={t('room_detail')}
          noti={true}
          onPress={goBack}
          notify={notify}
        />
        <View style={{alignItems: 'center', rowGap: scale(10)}}>
          <CustomText
            textType="semiBold"
            style={{
              ...styles.textLarge,
              color: COLORS.black,
              marginTop: scale(20),
            }}>
            {name}
          </CustomText>
          <Star />
        </View>

        <View style={styles.view}>
          <CustomText
            textType="semiBold"
            style={{
              ...styles.text2,
              color: COLORS.black,
              paddingVertical: scale(10),
              paddingHorizontal: scale(20),
            }}>
            {title}
          </CustomText>

          <CustomImage resizeMode="cover" source={image} style={styles.image} />
          <CustomText
            textType="semiBold"
            style={{
              ...styles.text2,
              color: COLORS.black,
              marginTop: scale(10),
              alignSelf: 'flex-start',
              paddingHorizontal: scale(20),
            }}>
            {t('room_information')}:
          </CustomText>
          <View
            style={{
              ...styles.box,
              marginTop: scale(10),
              borderTopLeftRadius: scale(5),
              borderTopRightRadius: scale(5),
              minHeight: scale(30),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: scale(10),
                marginTop: scale(10),
                alignSelf: 'flex-start',
              }}>
              <IconPeople />
              <CustomText
                textType="medium"
                style={{
                  ...styles.text1,
                  color: COLORS.black,
                }}>
                {description}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: scale(10),
                marginTop: scale(10),
                alignSelf: 'flex-start',
              }}>
              <IconBed />
              <CustomText
                textType="medium"
                style={{
                  ...styles.text1,
                  color: COLORS.black,
                }}>
                {info}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: scale(10),
                marginTop: scale(10),
                alignSelf: 'flex-start',
              }}>
              <IconLand width={scale(13)} height={scale(13)}/>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text1,
                  color: COLORS.black,
                  alignSelf: 'flex-start',
                }}>
                {acreage}
              </CustomText>
            </View>
          </View>
          <CustomText
            textType="semiBold"
            style={{
              ...styles.text2,
              color: COLORS.black,
              marginTop: scale(10),
              alignSelf: 'flex-start',
              paddingHorizontal: scale(20),
            }}>
            {t('little_convenient')}:
          </CustomText>
          <View
            style={{
              ...styles.box,
              marginTop: scale(10),
              borderTopLeftRadius: scale(5),
              borderTopRightRadius: scale(5),
              minHeight: scale(30),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: scale(20),
                marginTop: scale(10),
                alignSelf: 'flex-start',
              }}>
              <View style={{alignItems: 'center', rowGap: scale(5)}}>
                <IconWifi width={scale(20)} height={scale(20)} />
                <CustomText
                  textType="medium"
                  style={{
                    ...styles.text2,
                    color: COLORS.black,
                  }}>
                  Free wifi
                </CustomText>
              </View>
              <View style={{alignItems: 'center', rowGap: scale(5)}}>
                <IconConditioner />
                <CustomText
                  textType="medium"
                  style={{
                    ...styles.text2,
                    color: COLORS.black,
                  }}>
                  Air conditioner
                </CustomText>
              </View>
              <View style={{alignItems: 'center', rowGap: scale(5)}}>
                <IconTV width={scale(20)} height={scale(20)} />
                <CustomText
                  textType="medium"
                  style={{
                    ...styles.text2,
                    color: COLORS.black,
                  }}>
                  TV
                </CustomText>
              </View>
              <View style={{alignItems: 'center', rowGap: scale(5)}}>
                <IconFridge width={scale(20)} height={scale(20)} />
                <CustomText
                  textType="medium"
                  style={{
                    ...styles.text2,
                    color: COLORS.black,
                  }}>
                  Fridge
                </CustomText>
              </View>
            </View>
          </View>
          <CustomText
            textType="semiBold"
            style={{
              ...styles.text2,
              color: COLORS.black,
              marginTop: scale(10),
              alignSelf: 'flex-start',
              paddingHorizontal: scale(20),
            }}>
            {t('price_detail')}:
          </CustomText>
          <View
            style={{
              ...styles.box,
              marginTop: scale(10),
              borderTopLeftRadius: scale(5),
              borderTopRightRadius: scale(5),
              minHeight: scale(30),
              paddingBottom: scale(0),
              marginBottom: scale(20),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
              }}>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text2,
                  color: COLORS.black,
                  marginTop: scale(20),
                  flex: 1,
                }}>
                {t('room_rate')}:
              </CustomText>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text2,
                  color: COLORS.black,
                  marginTop: scale(20),
                  flex: 1,
                }}>
                {t('$ 14,06')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
              }}>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text2,
                  color: COLORS.black,
                  marginTop: scale(10),
                  flex: 1,
                }}>
                {t('taxes_and_fees')}:
              </CustomText>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text2,
                  color: COLORS.black,
                  marginTop: scale(10),
                  flex: 1,
                }}>
                {t('$ 14,06 ')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                paddingBottom: scale(30),
              }}>
              <CustomText
                textType="semiBold"
                style={{
                  ...styles.text,
                  color: COLORS.black,
                  marginTop: scale(20),
                  flex: 1,
                }}>
                {t('total')}:
              </CustomText>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text,
                  color: COLORS.black,
                  marginTop: scale(20),
                  flex: 1,
                }}>
                {price}
              </CustomText>
            </View>
          </View>
        </View>
        <Button title={t('request_to_book')} onPress={Ok} />
      </View>
    </MainAuth>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    paddingBottom: scale(50),
    width: '90%',
    alignSelf: 'center',
  },
  view: {
    marginTop: scale(10),
    minHeight: scale(63),
    borderRadius: scale(20),
    alignItems: 'center',
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
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: scale(5),
    borderBottomRightRadius: scale(5),
    borderBottomStartRadius: scale(5),
    borderBottomEndRadius: scale(5),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '90%',
    paddingBottom: scale(20),
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
  image: {
    width: '90%',
    // aspectRatio: 1,
    borderRadius: 15,
    height: scale(170),
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

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import MainAuth from '../../../../../../components/MainAuth';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../../../Profile/components/Header';
import CustomText from '../../../../../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../../../Profile/components/Button';
import {
  IconCheckBoxWhite,
  IconUnCheckBoxWhite,
} from '../../../../../../assets/icon/Icon';
import {
  COLORS,
  SHADOW,
  SIZES,
  images,
  scale,
} from '../../../../../../assets/constants';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import CustomImage from '../../../../../../components/CustomImage';
import ChooseCalendar from '../../../FindAccommodation/ChooseCalendar';

export default function BookTourScreen({route}) {
  const data = route.params;
  console.log('====================================');
  console.log(data, 21312);
  console.log('====================================');
  const [check1, setCheck1] = useState(false);
  const toggleCheckBox1 = () => {
    setCheck1(prevCheck => !prevCheck);
  };
  const {t} = useLanguage();
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const notify = () => {};
  const Ok = () => {};
  console.log('====================================');
  console.log(data?.images[0]?.url);
  console.log('====================================');
  return (
    <MainAuth>
      <View style={styles.container}>
        <Header
          goback={true}
          subHeading={t('Book Tour')}
          noti={true}
          onPress={goBack}
          notify={notify}></Header>
        <View style={styles.view}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: scale(20),
              alignItems: 'center',
            }}>
            <CustomImage
              source={data?.images?.[0]?.url}
              resizeMode="contain"
              style={styles.image}
            />
            <CustomText
              textType="semiBold"
              style={{
                ...styles.text2,
                color: COLORS.black,
                width: '80%',
                paddingHorizontal: scale(10),
              }}>
              {data?.name}
            </CustomText>
          </View>
          <View
            style={{
              ...styles.line,
              marginTop: scale(10),
              backgroundColor: '#F0B90B80',
            }}></View>
          <CustomText
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
          <View
            style={{width: '90%', alignSelf: 'center', marginTop: scale(10)}}>
            <ChooseCalendar />
          </View>
          <CustomText
            textType="medium"
            style={{
              ...styles.text2,
              color: COLORS.black,
              marginTop: scale(10),
              alignSelf: 'flex-start',
              paddingHorizontal: scale(20),
            }}>
            {t('add_number_guest')}:
          </CustomText>
          <View
            style={{
              ...styles.box,
              marginTop: scale(10),
              borderTopLeftRadius: scale(5),
              borderTopRightRadius: scale(5),
              minHeight: scale(30),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(10),
                alignSelf: 'flex-start',
              }}>
              {t('adult')}
            </CustomText>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text,
                  color: COLORS.primary,
                }}>
                $ 56,04
              </CustomText>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text1,
                  color: COLORS.grey,
                  alignSelf: 'center',
                  // marginRight:'10%'
                }}>
                $ 66,04
              </CustomText>
              <View
                style={{
                  ...styles.line,
                  position: 'absolute',
                  width: '10%',
                  left: '40%',
                  top: '50%',
                }}></View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.boxSum}>
                  <CustomText
                    textType="medium"
                    style={{
                      ...styles.text,
                      color: COLORS.grey,
                    }}>
                    -
                  </CustomText>
                </TouchableOpacity>
                <View style={styles.boxQuantity}>
                  <CustomText
                    textType="medium"
                    style={{
                      ...styles.text1,
                      color: COLORS.grey,
                    }}>
                    1
                  </CustomText>
                </View>
                <TouchableOpacity style={styles.boxSum}>
                  <CustomText
                    textType="medium"
                    style={{
                      ...styles.text,
                      color: COLORS.grey,
                    }}>
                    +
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
            <CustomText
              textType="medium"
              style={{
                ...styles.text1,
                color: COLORS.grey,
                alignSelf: 'flex-start',
              }}>
              {t('adult_year_old')}
            </CustomText>
            <CustomText
              textType="medium"
              style={{
                ...styles.text2,
                color: COLORS.black,
                marginTop: scale(10),
                alignSelf: 'flex-start',
              }}>
              {t('children')}
            </CustomText>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text,
                  color: COLORS.primary,
                }}>
                $ 56,04
              </CustomText>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text1,
                  color: COLORS.grey,
                  alignSelf: 'center',
                  // marginRight:'10%'
                }}>
                $ 66,04
              </CustomText>
              <View
                style={{
                  ...styles.line,
                  position: 'absolute',
                  width: '10%',
                  left: '40%',
                  top: '50%',
                }}></View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.boxSum}>
                  <CustomText
                    textType="medium"
                    style={{
                      ...styles.text,
                      color: COLORS.grey,
                    }}>
                    -
                  </CustomText>
                </TouchableOpacity>
                <View style={styles.boxQuantity}>
                  <CustomText
                    textType="medium"
                    style={{
                      ...styles.text1,
                      color: COLORS.grey,
                    }}>
                    0
                  </CustomText>
                </View>
                <TouchableOpacity style={styles.boxSum}>
                  <CustomText
                    textType="medium"
                    style={{
                      ...styles.text,
                      color: COLORS.grey,
                    }}>
                    +
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
            <CustomText
              textType="medium"
              style={{
                ...styles.text1,
                color: COLORS.grey,
                alignSelf: 'flex-start',
              }}>
              {t('children_year_old')}
            </CustomText>
          </View>
          <CustomText
            textType="medium"
            style={{
              ...styles.text2,
              color: COLORS.black,
              marginTop: scale(10),
              alignSelf: 'flex-start',
              paddingHorizontal: scale(20),
            }}>
            {t('things_need_to_know')}:
          </CustomText>
          <View style={{flexDirection: 'row', columnGap: scale(30)}}>
            <TouchableOpacity
              style={{
                height: scale(30),
                marginTop: scale(10),
                width: '40%',
                backgroundColor: '#F2F2F2',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: scale(33),
              }}>
              <CustomText
                textType="semiBold"
                style={{
                  ...styles.text2,
                  color: COLORS.black,
                }}>
                {t('inexperienced')}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: scale(30),
                marginTop: scale(10),
                width: '40%',
                backgroundColor: '#F2F2F2',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: scale(33),
              }}>
              <CustomText
                textType="semiBold"
                style={{
                  ...styles.text2,
                  color: COLORS.black,
                }}>
                {t('inseparable')}
              </CustomText>
            </TouchableOpacity>
          </View>
          <CustomText
            textType="medium"
            style={{
              ...styles.text2,
              color: COLORS.black,
              alignSelf: 'flex-start',
              paddingHorizontal: scale(20),
              marginTop: scale(10),
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
                paddingHorizontal: scale(20),
              }}>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text2,
                  color: COLORS.black,
                  marginTop: scale(10),
                  flex: 1,
                }}>
                {t('adult')}:
              </CustomText>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text2,
                  color: COLORS.black,
                  marginTop: scale(10),
                  flex: 1,
                }}>
                {t('1')}
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
                  marginTop: scale(10),
                  flex: 1,
                }}>
                {t('children')}:
              </CustomText>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text2,
                  color: COLORS.black,
                  marginTop: scale(10),
                  flex: 1,
                }}>
                {t('0')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                paddingHorizontal: scale(20),
                paddingBottom: scale(10),
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
                {t('$ 49,888,300')}
              </CustomText>
            </View>
            <CustomText
              textType="medium"
              style={{
                ...styles.text2,
                color: COLORS.black,
                paddingHorizontal: scale(20),
                paddingBottom: scale(10),
              }}>
              {t('include_addition')}
            </CustomText>
          </View>
          <TouchableOpacity
            onPress={toggleCheckBox1}
            style={{width: '100%', alignItems: 'center'}}>
            <LinearGradient
              colors={['#FADD55', '#D88A00']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={{...styles.box1, marginBottom: scale(20)}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginLeft: scale(10)}}>
                  {check1 ? <IconCheckBoxWhite /> : <IconUnCheckBoxWhite />}
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
          </TouchableOpacity>
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
  textSmall: {
    fontSize: SIZES.xxSmall,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(40),
    width: scale(283),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  boxSum: {
    backgroundColor: '#EEEEEE',
    borderRadius: scale(3),
    width: scale(20),
    height: scale(20),
    alignItems: 'center',
    marginHorizontal: scale(3),
  },
  boxQuantity: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(3),
    borderWidth: scale(0.5),
    width: scale(34),
    height: scale(20),
    alignItems: 'center',
    borderColor: '#C7C7C7',
    justifyContent: 'center',
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
    width: '100%',
    height: scale(1),
    backgroundColor: COLORS.grey,
  },

  box: {
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: scale(5),
    borderBottomRightRadius: scale(5),
    borderBottomStartRadius: scale(5),
    borderBottomEndRadius: scale(5),
    paddingHorizontal: scale(20),
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '90%',
    paddingBottom: scale(20),
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
  image: {
    width: scale(43),
    height: scale(43),
    // backgroundColor: '#f5f5f5',
    // ...SHADOW,
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

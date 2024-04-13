import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, images, scale} from '../../../../../../assets/constants';
import {Category, CustomInput} from '../../../../../../components';

import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import ButtonAccount from './ButtonAccount';
import {
  IconCheckBox,
  IconCheckBoxWhite,
  IconRight,
  IconUnCheckBox,
  IconUnCheckBoxWhite,
} from '../../../../../../assets/icon/Icon';
import Button from '../../../../../Profile/components/Button';
import CustomText from '../../../../../../components/CustomText';

import {useLanguage} from '../../../../../../hooks/useLanguage';
import Header from '../../../../../Profile/components/Header';
import FindContent from './FindContent';
import CustomImage from '../../../../../../components/CustomImage';
const dataFacilities = [
  {
    id: '1',
    name: 'Common',
    include: [
      {title: 'Parking Area'},
      {title: 'Room Service'},
      {title: 'Safety Deposit Box'},
      {title: 'Coffee Shop'},
      {title: 'Restaurant'},
    ],
  },
  {
    id: '2',
    name: 'Accessibility',
    include: [
      {title: 'Accessible Bathroom'},
      {title: 'Accessible Parking'},
      {title: 'Roll In Shower'},
    ],
  },
  {
    id: '3',
    name: 'Business',
    include: [
      {title: 'Business Center'},
      {title: 'Meeting Facilities'},
      {title: 'Computer Station'},
    ],
  },
  {
    id: '4',
    name: 'Connectivity',
    include: [{title: 'Wifi Free'}, {title: 'Wifi Public Area Surcharge'}],
  },
  {
    id: '5',
    name: 'Facilities',
    include: [
      {title: 'Family Room'},
      {title: 'Smoking Area'},
      {title: 'Air Conditioning'},
    ],
  },
];
export default function Content() {
  const [client, setClient] = useState(false);
  const [check, setCheck] = useState(false);
  const [category, setCategory] = useState();
  const [showFacilities, setshowFacilities] = useState('');
  const [showFacilitiesItem, setshowFacilitiesItem] = useState('');
  const [dataFaci, setDataFaci] = useState(dataFacilities);
  const [viewfacilities, setViewfacilities] = useState(false);
  const [selectedFaciCheckBox, setSelectedFaciCheckBox] = useState([]);
  const [check1, setCheck1] = useState(false);
  const toggleCheckBox1 = () => {
    setCheck1(prevCheck => !prevCheck);
  };
  const viewFacilities = () => {
    setViewfacilities(prevViewfacilities => !prevViewfacilities);
  };
  const viewShowFacilities = () => {
    setshowFacilities(prevshowRealEstateType => !prevshowRealEstateType);
  };
  const facilitiesCheckBox = name => {
    if (selectedFaciCheckBox.includes(name)) {
      setSelectedFaciCheckBox(
        selectedFaciCheckBox.filter(item => item !== name),
      );
    } else {
      setSelectedFaciCheckBox([...selectedFaciCheckBox, name]);
    }
  };
  const toggleCheckBox = () => {
    setCheck(prevCheck => !prevCheck);
  };
  const {t} = useLanguage();
  const viewClient = () => {
    setClient(prevClient => !prevClient);
  };
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const notify = () => {};
  const Ok = () => {};
  return (
    <View style={styles.container}>
      <Header
        goback={true}
        subHeading={t('Booking')}
        noti={true}
        onPress={goBack}
        notify={notify}></Header>
      <View style={{marginTop: scale(20)}}>
        <Category
          data={[t('daily'), t('monthly'), t('yearly')]}
          onChange={value => setCategory(value)}
        />
      </View>
      <View style={styles.view}>
        <CustomText
          textType="semiBold"
          style={{
            ...styles.text2,
            color: COLORS.black,
            marginTop: scale(20),
          }}>
          {t('Tamansari Semanggi Apartment')}
        </CustomText>
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

        <FindContent rental={category} />
        <CustomText
          textType="medium"
          style={{
            ...styles.text2,
            color: COLORS.black,
            marginTop: scale(10),
            alignSelf: 'flex-start',
            paddingHorizontal: scale(20),
          }}>
          {t('contact_detail')}:
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
              ...styles.text2,
              color: COLORS.black,
              marginTop: scale(10),
              alignSelf: 'flex-start',
            }}>
            {t('Test')}
          </CustomText>
          <CustomText
            textType="medium"
            style={{
              ...styles.text2,
              color: COLORS.black,
              marginTop: scale(10),
              alignSelf: 'flex-start',
            }}>
            {t('test@gmail.com')}
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
          {t('facilities')}:
        </CustomText>
        <TouchableOpacity
          style={styles.buttonCategories}
          onPress={viewFacilities}>
          <CustomText textType="medium" style={{...styles.text2}}>
            {t('facilities')}
          </CustomText>
          <IconRight />
        </TouchableOpacity>
        {viewfacilities && (
          <View style={styles.box}>
            <FlatList
              data={dataFaci}
              contentContainerStyle={styles.listFacilities}
              scrollEnabled={false}
              renderItem={({item, index}) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setshowFacilitiesItem(index);
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: scale(25),
                        paddingVertical: scale(10),
                        backgroundColor: '#EEEEEE',
                        borderTopWidth: scale(index == 0 ? 0 : 1),
                      }}>
                      <CustomText
                        textType="medium"
                        style={{
                          ...styles.text2,
                          color: '#979797',
                          width: '90%',
                        }}>
                        {item.name}
                      </CustomText>
                    </View>
                  </TouchableOpacity>
                  {index == showFacilitiesItem &&
                    item.include &&
                    item.include.length > 0 && (
                      <View
                        style={{
                          paddingHorizontal: scale(25),
                          paddingVertical: scale(5),
                        }}>
                        {item.include.map((nestedItem, index) => (
                          <TouchableOpacity
                            onPress={() => facilitiesCheckBox(nestedItem.title)}
                            style={{
                              paddingVertical: scale(5),
                              // backgroundColor: 'red',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              // paddingHorizontal: scale(10),
                              alignItems: 'center',
                            }}
                            key={index}>
                            <CustomText>{nestedItem.title}</CustomText>
                            {selectedFaciCheckBox.includes(nestedItem.title) ? (
                              <IconCheckBox />
                            ) : (
                              <IconUnCheckBox />
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        )}
        <TouchableOpacity
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
        </TouchableOpacity>
        <CustomText
          textType="medium"
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
              paddingHorizontal: scale(20),
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
              {t('$ 49,888,300')}
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
              {t('$ 49,888,300')}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              paddingHorizontal: scale(20),
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
              {t('$ 49,888,300')}
            </CustomText>
          </View>
        </View>
        <TouchableOpacity
          onPress={toggleCheckBox1}
          style={{width: '100%', alignItems: 'center'}}>
          <LinearGradient
            colors={COLORS.backgroundLinear}
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
                  {t('wallet')} NOW Travel
                </CustomText>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Button title={t('book')} onPress={Ok} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    paddingBottom: scale(50),
    width: '90%',
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

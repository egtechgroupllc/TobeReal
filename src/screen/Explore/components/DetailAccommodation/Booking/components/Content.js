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
import {IconCheckBox, IconUnCheckBox} from '../../../../../../assets/icon/Icon';
import Button from '../../../../../Profile/components/Button';
import CustomText from '../../../../../../components/CustomText';

import {useLanguage} from '../../../../../../hooks/useLanguage';
import Header from '../../../../../Profile/components/Header';
import FindContent from './FindContent';

export default function Content() {
  const [client, setClient] = useState(false);
  const [check, setCheck] = useState(false);
  const [category, setCategory] = useState();
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
         <View style={{marginTop: scale(30)}}>
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
              alignSelf:'flex-start',
              paddingHorizontal:scale(20)
            }}>
            {t('Choose time:')}
          </CustomText>
        <FindContent rental={category} />
          <View style={{flexDirection:'row',alignSelf:'flex-start', paddingHorizontal:scale(20), paddingBottom:scale(30)}}>
          <CustomText
            textType="semiBold"
            style={{
              ...styles.text,
              color: COLORS.black,
              marginTop: scale(20),
            }}>
            {t('Total:')}
          </CustomText>
          <CustomText
            textType="medium"
            style={{
              ...styles.text,
              color: COLORS.black,
              marginTop: scale(20),
              paddingHorizontal:scale(100)
            }}>
            {t('$ 49,888,300')}
          </CustomText>
          </View>
       
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:scale(20)}}>
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(3),
            }}>
            {t('do_you_agree')}
          </CustomText>
          <TouchableOpacity
            onPress={toggleCheckBox}
            style={{marginLeft: scale(10)}}>
            {check ? <IconCheckBox /> : <IconUnCheckBox />}
          </TouchableOpacity>
        </View>
      <Button title={t('Request to BOOK')} onPress={Ok} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(70),
    width: '90%',
  },
  view: {
    marginTop:scale(10),
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
});

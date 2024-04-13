import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, images, scale} from '../../../../assets/constants';
import {CustomInput} from '../../../../components';

import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import Button from '../../components/Button';
import {useLanguage} from '../../../../hooks/useLanguage';
import CustomText from '../../../../components/CustomText';
import Header from '../../components/Header';
import ButtonAccount from './ButtonAccount';
import {
  IconCheckBoxWhite,
  IconUnCheckBoxWhite,
} from '../../../../assets/icon/Icon';
export default function Content() {
  const [client, setClient] = useState(false);
  const [check, setCheck] = useState(false);
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
        subHeading={t('register_partner')}
        noti={true}
        onPress={goBack}
        notify={notify}></Header>
      <CustomText
        textType="medium"
        style={{
          ...styles.text,
          marginBottom: scale(10),
          marginTop: scale(40),
          color: COLORS.white,
        }}>
        {t('Select country')}
      </CustomText>
      <ButtonAccount title={'United States'} />
      <CustomText
        textType="medium"
        style={{
          ...styles.text,
          marginBottom: scale(10),
          marginTop: scale(10),
          color: COLORS.white,
        }}>
        {t('Select account type')}
      </CustomText>
      <ButtonAccount title={'Client'} client={client} onPress={viewClient} />
      <CustomText
        textType="medium"
        style={{
          ...styles.text,
          marginBottom: scale(10),
          marginTop: scale(10),
          color: COLORS.white,
        }}>
        {t('phone')}
      </CustomText>
      <CustomInput
        style={{
          height: scale(40),
          backgroundColor: COLORS.transparentGrey,
          borderWidth: scale(0),
          borderRadius: scale(8),
        }}
      />
      <CustomText
        textType="medium"
        style={{
          ...styles.text,
          marginBottom: scale(10),
          marginTop: scale(10),
          color: COLORS.white,
        }}>
        {t('email')}
      </CustomText>
      <CustomInput
        style={{
          height: scale(40),
          backgroundColor: COLORS.transparentGrey,
          borderWidth: scale(0),
          borderRadius: scale(8),
        }}
      />
      <CustomText
        textType="medium"
        style={{
          ...styles.text,
          marginBottom: scale(10),
          marginTop: scale(10),
          color: COLORS.white,
        }}>
        {t('password')}
      </CustomText>
      <CustomInput
        style={{
          marginBottom: scale(15),
          height: scale(40),
          backgroundColor: COLORS.transparentGrey,
          borderWidth: scale(0),
          borderRadius: scale(8),
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text1,
            color: COLORS.white,
            marginTop: scale(3),
          }}>
          {t('do_you_agree')}
        </CustomText>
        <TouchableOpacity
          onPress={toggleCheckBox}
          style={{marginLeft: scale(10)}}>
          {check ? <IconCheckBoxWhite /> : <IconUnCheckBoxWhite />}
        </TouchableOpacity>
      </View>
      <Button title={t('ok')} onPress={Ok} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    width: '90%',
  },
  text: {
    fontSize: SIZES.medium,
  },
  text1: {
    fontSize: SIZES.xSmall,
  },
  text2: {
    fontSize: SIZES.medium,
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

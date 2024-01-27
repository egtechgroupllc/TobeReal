import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import Button from '../../components/Button';
export default function Content() {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const notify = () => {};
  const ok = () => {};
  return (
    <View style={styles.container}>
      <Header
        goback={true}
        subHeading={'Change Password'}
        noti={true}
        onPress={goBack}
        notify={notify}></Header>
      <CustomText
        textType="medium"
        style={{
          ...styles.text,
          marginBottom: scale(10),
          marginTop: scale(60),
          color: COLORS.black,
        }}>
        Old password
      </CustomText>
      <CustomInput
        style={{
          width: '90%',
          marginBottom: scale(25),
          height: scale(40),
          backgroundColor: '#E3E3E3',
        }}
      />
      <CustomText
        textType="medium"
        style={{...styles.text, marginBottom: scale(10), color: COLORS.black}}>
        New password
      </CustomText>
      <CustomInput
        style={{
          width: '90%',
          marginBottom: scale(25),
          height: scale(40),
          backgroundColor: '#E3E3E3',
        }}
      />
      <CustomText
        textType="medium"
        style={{...styles.text, marginBottom: scale(10), color: COLORS.black}}>
        Confirm password
      </CustomText>
      <CustomInput
        style={{
          width: '90%',
          marginBottom: scale(25),
          height: scale(40),
          backgroundColor: '#E3E3E3',
        }}
      />
      <Button title={'ok'} onPress={ok} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
  },
  text: {
    fontSize: SIZES.small,
  },
  text1: {
    fontSize: SIZES.small,
    color: '#F0B90B',
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
    marginTop: scale(20),
    alignSelf: 'center',
  },
  line: {
    height: scale(1),
    backgroundColor: 'black',
  },
});

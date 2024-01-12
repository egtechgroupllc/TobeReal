import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {
  IconFacebook,
  IconInstagram,
  IconShare,
  IconSupporter,
  IconTwitter,
  IconYoutube,
} from '../../../assets/icon/Icon';
import CustomText from '../../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
export default function Bottom() {
  const navigation = useNavigation();
  const Logout = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <IconSupporter />
        <View style={{marginLeft: scale(30), marginRight: scale(50)}}>
          <CustomText
            textType="bold"
            style={{...styles.text1, color: COLORS.white}}>
            Support
          </CustomText>
          <View style={{marginTop: scale(10)}}>
            <CustomText
              textType="medium"
              style={{...styles.text, color: COLORS.white}}>
              Hotline: ....
            </CustomText>
            <CustomText
              textType="medium"
              style={{...styles.text, color: COLORS.white}}>
              Mail: ....
            </CustomText>
            <CustomText
              textType="medium"
              style={{...styles.text, color: COLORS.white}}>
              WEBSITE: ....
            </CustomText>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: scale(10)}}>
        <TouchableOpacity
          style={{width: scale(50), height: scale(23), alignItems: 'center'}}>
          <IconShare />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: scale(50), height: scale(23), alignItems: 'center'}}>
          <IconFacebook />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: scale(50), height: scale(23), alignItems: 'center'}}>
          <IconTwitter />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: scale(50), height: scale(23), alignItems: 'center'}}>
          <IconYoutube />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: scale(50), height: scale(23), alignItems: 'center'}}>
          <IconInstagram />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          height: scale(48),
          marginTop: scale(20),
          marginBottom: scale(50),
          width:'85%'
        }}
        onPress={Logout}>
        <LinearGradient
          colors={['#F7E75A', '#FFC702']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.button}>
          <CustomText textType="bold" style={{...styles.text2}}>
            Log Out
          </CustomText>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(10),
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#0000004D',
    height: scale(85),
    width: '90%',
    borderRadius: scale(5),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: SIZES.xSmall,
  },
  text1: {
    fontSize: SIZES.medium,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(5),
    height: scale(48),
    justifyContent: 'center',
    // width: scale(325),
  },
  text2: {
    fontSize: SIZES.medium,
  },
});

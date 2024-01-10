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
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{borderWidth: scale(1), width: scale(23), height: scale(23)}}>
          <IconShare />
        </TouchableOpacity>
        <TouchableOpacity
          style={{borderWidth: scale(1), width: scale(23), height: scale(23)}}>
          <IconFacebook />
        </TouchableOpacity>
        <TouchableOpacity
          style={{borderWidth: scale(1), width: scale(23), height: scale(23)}}>
          <IconTwitter />
        </TouchableOpacity>
        <TouchableOpacity
          style={{borderWidth: scale(1), width: scale(23), height: scale(23)}}>
          <IconYoutube />
        </TouchableOpacity>
        <TouchableOpacity
          style={{borderWidth: scale(1), width: scale(23), height: scale(23)}}>
          <IconInstagram />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          height: scale(48),
          marginTop: scale(40),
          marginBottom: scale(50),
        }}
        onPress={Logout}
        >
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
    width: scale(325),
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
    width: scale(325),
  },
  text2: {
    fontSize: SIZES.medium,
  },
});

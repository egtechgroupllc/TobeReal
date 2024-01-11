import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
export default function MidContent() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FADD55', '#D88A00']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.box}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: scale(50),
          }}>
          <View>
            <CustomText
              textType="bold"
              style={{...styles.text1, color: COLORS.white}}>
              Balance
            </CustomText>
            <CustomText
              textType="bold"
              style={{
                ...styles.text1,
                color: COLORS.white,
                alignSelf: 'center',
              }}>
              0$
            </CustomText>
          </View>
          <View>
            <CustomText
              textType="bold"
              style={{...styles.text1, color: COLORS.white}}>
              Bonus
            </CustomText>
            <CustomText
              textType="bold"
              style={{
                ...styles.text1,
                color: COLORS.white,
                alignSelf: 'center',
              }}>
              0$
            </CustomText>
          </View>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={['#FADD55', '#D88A00']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{...styles.box, marginTop: scale(15)}}>
        <View style={{alignItems: 'center'}}>
          <CustomText
            textType="bold"
            style={{...styles.text1, color: COLORS.white}}>
            Donated
          </CustomText>
          <CustomText
            textType="bold"
            style={{...styles.text1, color: COLORS.white, alignSelf: 'center'}}>
            0$
          </CustomText>
        </View>
      </LinearGradient>
      <View style={{...styles.box1, marginTop: scale(15)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <CustomText
              textType="regular"
              style={{...styles.text, color: COLORS.black}}>
              Main expiration date:
            </CustomText>
            <CustomText
              textType="regular"
              style={{
                ...styles.text,
                color: COLORS.black,
              }}>
              Normal expiration date:
            </CustomText>
            <CustomText
              textType="regular"
              style={{
                ...styles.text,
                color: COLORS.black,
              }}>
              Gift expiration date:
            </CustomText>
          </View>
          <View>
            <CustomText
              textType="regular"
              style={{...styles.text, color: COLORS.black}}>
              00:00:00
            </CustomText>
            <CustomText
              textType="regular"
              style={{
                ...styles.text,
                color: COLORS.black,
                alignSelf: 'center',
              }}>
              00:00:00
            </CustomText>
            <CustomText
              textType="regular"
              style={{
                ...styles.text,
                color: COLORS.black,
                alignSelf: 'center',
              }}>
              00:00:00
            </CustomText>
          </View>
          <View>
            <CustomText
              textType="regular"
              style={{...styles.text, color: COLORS.black}}>
              20/10/2023
            </CustomText>
            <CustomText
              textType="regular"
              style={{
                ...styles.text,
                color: COLORS.black,
                alignSelf: 'center',
              }}>
              20/10/2023
            </CustomText>
            <CustomText
              textType="regular"
              style={{
                ...styles.text,
                color: COLORS.black,
                alignSelf: 'center',
              }}>
              20/10/2023
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  box: {
    backgroundColor: '#EEEEEE',
    height: scale(87),
    width: scale(331),
    borderRadius: scale(8),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
  },
  box1: {
    backgroundColor: '#EEEEEE',
    height: scale(62),
    width: scale(331),
    borderRadius: scale(8),
    justifyContent: 'center',
    paddingHorizontal: scale(15),
  },
  text: {
    fontSize: SIZES.small,
  },
  text1: {
    fontSize: SIZES.medium,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(5),
    height: scale(48),
    justifyContent: 'center',
    marginTop: scale(40),
  },
  text2: {
    fontSize: SIZES.small,
  },
});

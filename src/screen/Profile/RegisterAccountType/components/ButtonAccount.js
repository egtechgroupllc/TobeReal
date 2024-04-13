import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {CustomInput} from '../../../../components';

import LinearGradient from 'react-native-linear-gradient';

import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {IconDownWhite} from '../../../../assets/icon/Icon';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
export default function ButtonAccount({onPress, title, style, client}) {
  const {t} = useLanguage();
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.button, style]}>
          <View style={{width: '90%'}}>
            <CustomText
              textType="semiBold"
              style={{
                ...styles.text2,
                marginLeft: scale(10),
                color: COLORS.white,
              }}>
              {title}
            </CustomText>
          </View>

          <IconDownWhite />
        </View>
      </TouchableOpacity>
      {client && (
        <View style={styles.box}>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CustomText
                textType="semiBold"
                style={{...styles.text2, width: '97%', color: COLORS.white}}>
                {t('Real estate owner')}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: scale(5),
              }}>
              <CustomText
                textType="semiBold"
                style={{...styles.text2, color: COLORS.white}}>
                {t('Collaborators')}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: scale(5),
    height: scale(40),
    paddingHorizontal: scale(10),
    // marginTop: scale(20),
    flexDirection: 'row',
    backgroundColor: COLORS.transparentGrey,
    // borderRadius: scale(8),
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
  },
  box: {
    height: scale(80),
    backgroundColor: '#FFFFFF1A',
    borderBottomLeftRadius: scale(5),
    borderBottomRightRadius: scale(5),
    borderBottomStartRadius: scale(5),
    borderBottomEndRadius: scale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
  },
  text2: {
    fontSize: SIZES.small,
  },
});

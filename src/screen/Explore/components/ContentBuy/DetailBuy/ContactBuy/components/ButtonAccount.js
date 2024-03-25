import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {CustomInput} from '../../../../components';

import LinearGradient from 'react-native-linear-gradient';

import { SIZES, scale } from '../../../../../../../assets/constants';
import { IconDownWhite } from '../../../../../../../assets/icon/Icon';
import CustomText from '../../../../../../../components/CustomText';
import { useLanguage } from '../../../../../../../hooks/useLanguage';
export default function ButtonAccount({onPress, title, styleImage, image, style, client}) {
  const {t}= useLanguage()
  return (
    <View>
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, style]}>
        <Image source={image} style={styleImage}/>
        <View style={{width:'90%'}}>
        <CustomText
          textType="semiBold"
          style={{...styles.text2, marginLeft:scale(10)}}>
          {title}
        </CustomText>
        </View>
     
        <IconDownWhite/>
      </View>
    </TouchableOpacity>
    {
        client&&(
          <View style={styles.box}>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CustomText  textType="semiBold" style={{...styles.text2, width:'97%'}}>
              {t('Real estate owner')}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop:scale(5)
              }}>
              <CustomText  textType="semiBold" style={{...styles.text2}}>
              {t('Collaborators')}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
        )
      }
    </View>

  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: scale(5),
    height: scale(40),
    paddingHorizontal:scale(10),
    // marginTop: scale(20),
    flexDirection:'row',
    backgroundColor:'#E3E3E3',
    borderRadius: scale(8)
  },
  box: {
    height: scale(80),
    backgroundColor: '#EEEEEE',
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

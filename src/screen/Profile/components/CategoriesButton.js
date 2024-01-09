import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CustomButton} from '../../../components';
import CustomText from '../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {
  Avatar,
  IconEditProfile,
  IconGoBack,
  IconNotification,
} from '../../../assets/icon/Icon';
import LinearGradient from 'react-native-linear-gradient';

export default function CategoriesButton({title}) {
    return (
        <TouchableOpacity>
        <LinearGradient
          colors={['#F0B90B', '#FFFFFF00']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.8}}
          style={styles.button}>
          <CustomText textType="bold" style={{...styles.text2}}>
            {title}
          </CustomText>
        </LinearGradient>
      </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      borderRadius: scale(4),
      height: scale(29),
      justifyContent: 'center',
      marginTop: scale(70),
      paddingHorizontal: scale(10),
      width: scale(325),
      borderWidth: scale(1),
      borderColor:'#00000040'
    },
    text2: {
        fontSize: SIZES.small,
      },
  });
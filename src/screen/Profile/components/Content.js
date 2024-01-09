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
import {COLORS, SIZES, scale} from '../../../assets/constants';
import CustomText from '../../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import CategoriesButton from './CategoriesButton';
export default function Content() {
  const navigation = useNavigation();
  const [check, setCheck] = useState(false);
  const toggleCheckBox = () => {
    setCheck(prevCheck => !prevCheck);
  };
  const gotoRegister = () => {
    navigation.navigate('RegisterScreen');
  };
  const gotoForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };
  const gotoHome = () => {
    navigation.navigate('BottomTab');
  };
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between'
          }}>
          <View>
            <CustomText
              textType="bold"
              style={{...styles.text, color: COLORS.white}}>
              Regular member
            </CustomText>
          </View>
          <View>

            <CustomText
              textType="bold"
              style={{...styles.text, color: COLORS.white}}>
              Accumulated points:
            </CustomText>
            <CustomText
              textType="bold"
              style={{...styles.text1, color: COLORS.white}}>
              0.0 Point
            </CustomText>
            <View style={{flexDirection: 'row'}}>
              <CustomText
                textType="bold"
                style={{...styles.text, color: COLORS.white}}>
                View the plot:
              </CustomText>
            </View>
            <View style={{flexDirection: 'row'}}>
              <CustomText
                textType="bold"
                style={{...styles.text, color: COLORS.white}}>
                Free news:
              </CustomText>
            </View>
          </View>
          <View>
            <CustomText
                textType="bold"
                style={{...styles.text, color: COLORS.white}}>
              </CustomText>
              <CustomText
                textType="bold"
                style={{...styles.text, color: COLORS.white}}>
              </CustomText>
              <CustomText
                textType="bold"
                style={{...styles.text, color: COLORS.white}}>
                0/3
              </CustomText>
              <CustomText
                textType="bold"
                style={{...styles.text, color: COLORS.white}}>
                0/15
              </CustomText>
          </View>
        </View>
      </View>
        <CategoriesButton title={"asddsa"}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    alignItems: 'center',
  },
  box: {
    backgroundColor: COLORS.grey,
    height: scale(85),
    width: '85%',
    borderRadius: scale(5),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
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

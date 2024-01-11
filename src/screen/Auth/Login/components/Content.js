import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, images, scale} from '../../../../assets/constants';
import {
  IconCheckBox,
  IconUnCheckBox,
  IconViewablePassword,
} from '../../../../assets/icon/Icon';
import {CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
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
      <CustomText
        textType="medium"
        style={{...styles.text, marginBottom: scale(10)}}>
        Email
      </CustomText>
      <CustomInput
        placeholder="example@gmail.com"
        styleWrapper={{
          width: '80%',
          marginBottom: scale(25),
          height: scale(48),
        }}
      />
      <CustomText
        textType="medium"
        style={{...styles.text, marginBottom: scale(10)}}>
        Password
      </CustomText>
      <CustomInput
        placeholder="Enter Your Password"
        styleWrapper={{width: '80%', height: scale(48)}}
        iconRight={IconViewablePassword}
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: scale(20),
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={toggleCheckBox}>
          {check ? <IconCheckBox /> : <IconUnCheckBox />}
        </TouchableOpacity>
        <CustomText
          textType="semiBold"
          style={{...styles.text, marginLeft: scale(10)}}>
          Remember Me
        </CustomText>
        <TouchableOpacity onPress={gotoForgotPassword}>
          <CustomText
            textType="semiBold"
            style={{...styles.text1, marginLeft: scale(80)}}>
            Forgot Password?
          </CustomText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={gotoHome}>
        <LinearGradient
          colors={['#F7E75A', '#FFC702']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.button}>
          <CustomText textType="semiBold" style={{...styles.text2}}>
            Login
          </CustomText>
        </LinearGradient>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          marginTop: scale(20),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomText textType="semiBold" style={{...styles.text}}>
          Don't have an account?
        </CustomText>
        <TouchableOpacity onPress={gotoRegister}>
          <CustomText
            textType="semiBold"
            style={{...styles.text1, marginLeft: scale(10)}}>
            Sign Up
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(50),
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
    borderRadius: scale(5),
    height: scale(48),
    justifyContent: 'center',
    marginTop: scale(40),
  },
});

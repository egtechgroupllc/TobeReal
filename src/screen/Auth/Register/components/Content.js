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
  IconUnViewablePassword,
  IconViewablePassword,
} from '../../../../assets/icon/Icon';
import {CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

export default function Content() {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewPasswordConfirm, setViewPasswordConfirm] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const toggleViewPassword = () => {
    setViewPassword(prevView => !prevView);
    setPasswordVisible(!passwordVisible);
  };
  const toggleViewPasswordConfirm = () => {
    setViewPasswordConfirm(prevView => !prevView);
    setPasswordConfirmVisible(!passwordConfirmVisible);
  };
  const handleEmail = text => {
    setEmail(text);
  };
  const handleUserName = text => {
    setUserName(text);
  };
  const handlePassword = text => {
    setPassword(text);
  };
  const handlePasswordConfirm = text => {
    setPasswordConfirm(text);
  };
  const navigation = useNavigation();
  const gotoLogin = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <View style={styles.container}>
      <CustomInput
        onChangeText={handleUserName}
        value={username}
        placeholder="Enter Your Username"
        styleWrapper={{
          width: '80%',
          marginBottom: scale(25),
          height: scale(48),
        }}
      />
      <CustomInput
        onChangeText={handleEmail}
        value={email}
        placeholder="Enter Your Email"
        styleWrapper={{
          width: '80%',
          marginBottom: scale(25),
          height: scale(48),
        }}
      />
      {/* <CustomInput
        placeholder="Enter Your Phone Number"
        styleWrapper={{
          width: '80%',
          marginBottom: scale(25),
          height: scale(48),
        }}
      /> */}
      <CustomInput
        secureTextEntry={!passwordVisible}
        onChangeText={handlePassword}
        value={password}
        placeholder="Enter Your Password"
        styleWrapper={{
          width: '80%',
          height: scale(48),
          marginBottom: scale(25),
        }}
        iconPress={toggleViewPassword}
        iconRight={viewPassword ? IconUnViewablePassword : IconViewablePassword}
      />
      <CustomInput
        secureTextEntry={!passwordConfirmVisible}
        onChangeText={handlePasswordConfirm}
        value={passwordConfirm}
        placeholder="Enter Your Password Confirm"
        styleWrapper={{width: '80%', height: scale(48)}}
        iconPress={toggleViewPasswordConfirm}
        iconRight={
          viewPasswordConfirm ? IconUnViewablePassword : IconViewablePassword
        }
      />
      {password !== passwordConfirm && (
        <CustomText
          textType="medium"
          style={{...styles.text, marginTop: scale(10), color: COLORS.error}}>
          Password does not match!
        </CustomText>
      )}

      <TouchableOpacity>
        <LinearGradient
          colors={['#F7E75A', '#FFC702']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.button}>
          <CustomText textType="semiBold" style={{...styles.text2}}>
            Sign Up
          </CustomText>
        </LinearGradient>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          marginTop: scale(20),
          justifyContent: 'center',
        }}>
        <View>
          <CustomText textType="semiBold" style={{...styles.text}}>
            Already have an account?
          </CustomText>
          <View style={styles.line} />
        </View>
        <TouchableOpacity onPress={gotoLogin}>
          <CustomText
            textType="semiBold"
            style={{...styles.text1, marginLeft: scale(5)}}>
            Login
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
    marginTop: scale(20),
  },
  line: {
    height: scale(1),
    backgroundColor: 'black',
  },
});

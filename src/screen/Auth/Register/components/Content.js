import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {SIZES, scale} from '../../../../assets/constants';
import {
  IconUnViewablePassword,
  IconViewablePassword,
} from '../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {
  confirmField,
  requireField,
  validateEmail,
  validateEqualLength,
} from '../../../../utils/validate';

export default function Content() {
  const {control, watch, handleSubmit} = useForm();
  const {goBack} = useNavigation();

  const [viewPassword, setViewPassword] = useState(false);
  const [viewPasswordConfirm, setViewPasswordConfirm] = useState(false);

  const toggleViewPassword = () => {
    setViewPassword(!viewPassword);
  };
  const toggleViewPasswordConfirm = () => {
    setViewPasswordConfirm(!viewPasswordConfirm);
  };

  const navigation = useNavigation();
  const handleSignup = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <CustomInput
        control={control}
        sizeInput="medium"
        rules={{
          ...requireField('This field is required'),
        }}
        name="username"
        placeholder="Enter Your Username"
      />
      <CustomInput
        control={control}
        sizeInput="medium"
        rules={{
          ...requireField('Enter your Email address'),
          ...validateEmail(
            'Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed.',
          ),
        }}
        name="email"
        placeholder="Enter Your Email"
      />
      {/* <CustomInput
        placeholder="Enter Your Phone Number"
      /> */}
      <CustomInput
        secureTextEntry={!viewPassword}
        control={control}
        sizeInput="medium"
        rules={{
          ...requireField('This field is required'),
          ...validateEqualLength(
            6,
            'Use 6 characters or more for your password',
          ),
        }}
        name="password"
        placeholder="Enter Your Password"
        onPressIconRight={toggleViewPassword}
        iconRight={
          !viewPassword ? IconUnViewablePassword : IconViewablePassword
        }
      />
      <CustomInput
        secureTextEntry={!viewPasswordConfirm}
        control={control}
        sizeInput="medium"
        rules={{
          ...confirmField(
            watch('password'),
            'The entered password does not match. Try again.',
          ),
        }}
        name="passwordConfirm"
        placeholder="Enter Your Password Confirm"
        onPressIconRight={toggleViewPasswordConfirm}
        iconRight={
          !viewPasswordConfirm ? IconUnViewablePassword : IconViewablePassword
        }
      />

      <CustomButton
        onPress={handleSubmit(handleSignup)}
        buttonType="large"
        text="Sign Up"
        linearGradientProps
        style={{
          marginTop: scale(20),
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          marginTop: scale(20),
          justifyContent: 'center',
        }}>
        <CustomText
          textType="semiBold"
          style={{
            ...styles.text,
            textDecorationLine: 'underline',
          }}>
          Already have an account?
        </CustomText>

        <CustomText
          onPress={goBack}
          textType="semiBold"
          style={{...styles.text1, marginLeft: scale(5)}}>
          Login
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(50),
    rowGap: scale(16),
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

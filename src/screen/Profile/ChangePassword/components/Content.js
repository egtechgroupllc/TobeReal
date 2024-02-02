import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import Button from '../../components/Button';
import {useForm} from 'react-hook-form';
import {requireField} from '../../../../utils/validate';
import { useLanguage } from '../../../../hooks/useLanguage';
export default function Content() {
  const {t}= useLanguage()
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const notify = () => {};
  const ok = () => {};
  return (
    <View style={styles.container}>
      <Header
        goback={true}
        subHeading={t('change_password')}
        noti={true}
        onPress={goBack}
        notify={notify}></Header>
      <CustomInput
        styleTextLabel={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(60),
        }}
        label={t('old_password')}
        control={control}
        name="oldpassword"
        // placeholder="Enter the land area"
        rules={{
          ...requireField(t('this_field_required')),
        }}
        style={styles.textInput}
      />
      <CustomInput
        styleTextLabel={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(20),
        }}
        label={t('new_password')}
        control={control}
        name="newpassword"
        // placeholder="Enter the land area"
        rules={{
          ...requireField(t('this_field_required')),
        }}
        style={styles.textInput}
      />
      <View style={{marginBottom: scale(20), width: '100%'}}>
        <CustomInput
          styleTextLabel={{
            ...styles.text1,
            color: COLORS.black,
            marginTop: scale(20),
          }}
          label={t('confirm_password')}
          control={control}
          name="confirmpassword"
          // placeholder="Enter the land area"
          rules={{
            ...requireField(t('this_field_required')),
          }}
          style={styles.textInput}
        />
      </View>

      <Button title={t('ok')} onPress={handleSubmit(ok)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
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
    borderRadius: scale(10),
    height: scale(40),
    width: scale(283),
    justifyContent: 'center',
    marginTop: scale(20),
    alignSelf: 'center',
  },
  line: {
    height: scale(1),
    backgroundColor: 'black',
  },
  textInput: {
    backgroundColor: '#E3E3E3',
    marginTop: scale(10),
    borderRadius: scale(5),
    // borderWidth: scale(0),
    width: '90%',
  },
});

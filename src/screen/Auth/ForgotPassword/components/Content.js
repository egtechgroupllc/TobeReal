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
import Wrapper from '../../components/Wrapper';
import {useForm} from 'react-hook-form';
import { requireField } from '../../../../utils/validate';
import { useLanguage } from '../../../../hooks/useLanguage';
export default function Content() {
  const {t}= useLanguage()
  const {control,handleSubmit} = useForm();
  const [phase, setPhase] = useState(1);
  const navigation = useNavigation();
  const gotoLogin = () => {
    navigation.navigate('LoginScreen');
  };
  const setPhase2 = () => {
    setPhase(2);
  };
  const setPhase3 = () => {
    setPhase(3);
  };
  return (
    <View style={styles.container}>
      {phase == 1 && (
        <View>
          <View style={{marginTop: scale(50), alignItems: 'center'}}>
            <Image
              source={images.logo1}
              style={{
                width: '30%',
                height: scale(165),
                marginBottom: scale(30),
              }}></Image>
            <Wrapper
              Heading1={t('forgot_password')}
              styleWrapper={{marginBottom: scale(30)}}
            />
          </View>
          <View style={{marginBottom: scale(10)}}>
          <CustomInput
            placeholder={t('email')}
            style={{
              width: scale(312),
              height: scale(48),
            }}
            control={control}
            name="email"
            rules={{
              ...requireField(t('this_field_required')),
            }}
          />
          </View>
          <TouchableOpacity onPress={handleSubmit(setPhase2)}>
            <LinearGradient
              colors={['#F7E75A', '#FFC702']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.button}>
              <CustomText textType="semiBold" style={{...styles.text2}}>
              {t('submit')}
              </CustomText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      {phase == 2 && (
        <View>
        <View style={{marginTop: scale(50), alignItems: 'center'}}>
            <Image
              source={images.logo1}
              style={{
                width: '30%',
                height: scale(165),
                marginBottom: scale(30),
              }}></Image>
            <Wrapper
              Heading1={t('forgot_password')}
              styleWrapper={{marginBottom: scale(30)}}
            />
          </View>
          <View style={{marginBottom: scale(10)}}>
          <CustomInput
            control={control}
            name="code"
            rules={{
              ...requireField(t('this_field_required')),
            }}
            placeholder={t('code')}
            style={{
              width: scale(312),
              // marginBottom: scale(25),
              height: scale(48),
            }}
          />
          </View>
          <TouchableOpacity onPress={handleSubmit(setPhase3)}>
            <LinearGradient
              colors={['#F7E75A', '#FFC702']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.button}>
              <CustomText textType="semiBold" style={{...styles.text2}}>
              {t('submit')}
              </CustomText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      {phase == 3 && (
        <View>
      <View style={{marginTop: scale(50), alignItems: 'center'}}>
            <Image
              source={images.logo1}
              style={{
                width: '30%',
                height: scale(165),
                marginBottom: scale(30),
              }}></Image>
            <Wrapper
              Heading1={t('enter_new_password')}
              styleWrapper={{marginBottom: scale(30)}}
            />
          </View>
          <View style={{marginBottom: scale(10)}}>
          <CustomInput
           control={control}
           name="password"
           rules={{
             ...requireField(t('this_field_required')),
           }}
            placeholder={t('password')}
            style={{
              width: scale(312),
              height: scale(48),
              marginBottom:scale(5)
            }}
          />
          </View>
          <View style={{marginBottom: scale(10)}}>
          <CustomInput
           control={control}
           name="passwordconfirm"
           rules={{
             ...requireField(t('this_field_required')),
           }}
            placeholder={t('confirm_password')}
            style={{
              width: scale(312),
              height: scale(48),
            }}
          />
          </View>
         
          <TouchableOpacity onPress={handleSubmit(setPhase3)}>
            <LinearGradient
              colors={['#F7E75A', '#FFC702']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.button}>
              <CustomText textType="semiBold" style={{...styles.text2}}>
              {t('submit')}
              </CustomText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          marginTop: scale(20),
          justifyContent: 'center',
        }}>
        <View>
          <CustomText textType="semiBold" style={{...styles.text}}>
          {t('already_have_account')}
          </CustomText>
          <View style={styles.line} />
        </View>
        <TouchableOpacity onPress={gotoLogin}>
          <CustomText
            textType="semiBold"
            style={{...styles.text1, marginLeft: scale(5)}}>
            {t('login')}
          </CustomText>
        </TouchableOpacity>
      </View>
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
    borderRadius: scale(5),
    height: scale(48),
    justifyContent: 'center',
    marginTop: scale(10),
  },
  line: {
    height: scale(1),
    backgroundColor: 'black',
  },
});

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
export default function Content() {
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
          <View style={{marginTop: scale(150), alignItems: 'center'}}>
            <Wrapper Heading1="Logo" styleWrapper={{marginBottom: scale(30)}} />
            <Wrapper Heading1="Forgot Password?" styleWrapper={{marginBottom: scale(30)}}/>
          </View>
          <CustomInput
            placeholder="Email"
            styleWrapper={{
              width: scale(312),
              marginBottom: scale(25),
              height: scale(48),
            }}
          />
          <TouchableOpacity onPress={setPhase2}>
            <LinearGradient
              colors={['#F7E75A', '#FFC702']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.button}>
              <CustomText textType="semiBold" style={{...styles.text2}}>
                Submit
              </CustomText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      {phase == 2 && (
        <View>
          <View style={{marginTop: scale(150), alignItems: 'center'}}>
            <Wrapper Heading1="Logo" styleWrapper={{marginBottom: scale(30)}} />
            <Wrapper Heading1="Forgot Password?" styleWrapper={{marginBottom: scale(30)}}/>
          </View>
          <CustomInput
            placeholder="CODE"
            styleWrapper={{
              width: scale(312),
              marginBottom: scale(25),
              height: scale(48),
            }}
          />
          <TouchableOpacity onPress={setPhase3}>
            <LinearGradient
              colors={['#F7E75A', '#FFC702']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.button}>
              <CustomText textType="semiBold" style={{...styles.text2}}>
                Submit
              </CustomText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      {phase == 3 && (
        <View>
          <View style={{marginTop: scale(150), alignItems: 'center'}}>
            <Wrapper Heading1="Logo" styleWrapper={{marginBottom: scale(30)}} />
            <Wrapper Heading1="Enter new password" styleWrapper={{marginBottom: scale(30)}} />
          </View>
          <CustomInput
            placeholder="Password"
            styleWrapper={{
              width: scale(312),
              marginBottom: scale(25),
              height: scale(48),
            }}
          />
          <CustomInput
            placeholder="Confirm Password"
            styleWrapper={{
              width: scale(312),
              marginBottom: scale(25),
              height: scale(48),
            }}
          />
          <TouchableOpacity onPress={setPhase3}>
            <LinearGradient
              colors={['#F7E75A', '#FFC702']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.button}>
              <CustomText textType="semiBold" style={{...styles.text2}}>
                Submit
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
    marginTop: scale(20),
  },
  line: {
    height: scale(1),
    backgroundColor: 'black',
  },
});

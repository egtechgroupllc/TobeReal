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
import { useNavigation } from '@react-navigation/native';

export default function Content() {
  const [view, setView] = useState(false);
  const toggleView = () => {
    setView((prevView) => !prevView);
  };
  const navigation = useNavigation();
  const gotoLogin = () => {
    navigation.navigate("LoginScreen"); 
  };
  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Enter Your Username"
        styleWrapper={{width: '80%', marginBottom: scale(25), height:scale(48)}}
      />
      <CustomInput
        placeholder="Enter Your Email"
        styleWrapper={{width: '80%', marginBottom: scale(25), height:scale(48)}}
      />
          <CustomInput
        placeholder="Enter Your Phone Number"
        styleWrapper={{width: '80%', marginBottom: scale(25), height:scale(48)}}
      />
         <CustomInput
        placeholder="Enter Your Password"
        styleWrapper={{width: '80%', marginBottom: scale(25), height:scale(48)}}
        onPress={toggleView}
        iconRight={view ? IconUnViewablePassword  : IconViewablePassword}
      />
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
        <View style={styles.line}/>
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
    marginTop: scale(15),
  },
  line:{
    height:scale(1),
    backgroundColor:'black',
  }
});

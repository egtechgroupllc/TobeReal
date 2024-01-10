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
  const [viewpersonal, setViewpersonal] = useState(false);
  const [client, setClient] = useState(false);
  const toggleCheckBox = () => {
    setCheck(prevCheck => !prevCheck);
  };
  const viewPersonal = () => {
    setViewpersonal(prevViewpersonal => !prevViewpersonal);
  };
  const viewClient = () => {
    setClient(prevClient => !prevClient);
  };
  const changePW = () => {
    navigation.navigate('ChangePasswordScreen');
  };
  const personalInformation = () => {
    navigation.navigate('InformationScreen');
  };
  const financial = () => {
    
  };
  const priceList= () => {
    navigation.navigate('PriceListScreen');
  };
  const customerManagement = () => {
    navigation.navigate('CustomerManagementScreen');
  };
  const managingTradeFloor = () => {
    navigation.navigate('TradingFloorScreen');
  };
  const seeTheNews= () => {
    navigation.navigate('NewsSavedScreen');
  };
  const  postManagement= () => {
    navigation.navigate('PostManagementScreen');
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
        <CategoriesButton title={"View personal information"} onPress={viewPersonal} viewpersonal={viewpersonal} changePW={changePW} large={true} personalInformation={personalInformation}/>
        <View style={{flexDirection:'row'}}>
        <CategoriesButton title={"See the news saved"} onPress={seeTheNews} small={true}/>
        <CategoriesButton title={"Post management"} onPress={postManagement} small={true} style={{marginLeft: scale(15)}}/>
        </View>
        <CategoriesButton title={"Financial management"} onPress={financial} large={true} />
        <CategoriesButton title={"Customer management"} onPress={customerManagement} large={true} />
        <CategoriesButton title={"Managing the trading floor"} onPress={managingTradeFloor} large={true} />
        <CategoriesButton title={"Client"} onPress={viewClient} large={true} client={client}/>
        <CategoriesButton title={"Posted price list"} onPress={priceList} large={true} />
        <CategoriesButton title={"Install Face ID"} onPress={financial} large={true} />
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
    width: scale(325),
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

import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, images, scale} from '../../../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../../../../components/CustomText';
import {CustomInput} from '../../../../../../components';
import {IconAdd, IconShield} from '../../../../../../assets/icon/Icon';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
export default function Content() {
  const data = [
    {
      id: 1,
      date: '30/10/2023',
      quantity: 5,
      status: 'done',
    },
    {
      id: 2,
      date: '30/10/2023',
      quantity: 5,
      status: 'done',
    },
    {
      id: 3,
      date: '30/10/2023',
      quantity: 5,
      status: 'done',
    },
    {
      id: 4,
      date: '30/10/2023',
      quantity: 5,
      status: 'done',
    },
  ];
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const Submit = () => {};

  const onPress = () => {};
  const notify = () => {};
  return (
    <View style={styles.container}>
      <Header
        goback={true}
        subHeading={'Add Bank'}
        noti={true}
        onPress={goBack}
        notify={notify}
      />
      <View style={{marginTop: scale(50)}}>
        <CustomText
          textType="semiBold"
          style={{...styles.text1, color: COLORS.black}}>
          Add tags
        </CustomText>
        <LinearGradient
          colors={['#FFC700', '#FADD55']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{borderRadius: scale(8), marginTop: scale(20)}}>
          <TouchableOpacity style={styles.addtag}>
            <IconShield />
            <CustomText
              textType="semiBold"
              style={{...styles.text, color: COLORS.black}}>
              Your card information will be kept confidential
            </CustomText>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={{marginTop: scale(30)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <CustomText
            textType="semiBold"
            style={{...styles.text1, color: COLORS.black}}>
            Card details
          </CustomText>
          <Image
            source={images.visa}
            style={{width: scale(34), height: scale(11)}}></Image>
        </View>
        <CustomInput
          placeholder="Card number"
          style={{
            marginBottom: scale(15),
            height: scale(36),
            backgroundColor: '#E3E3E3',
            marginTop: scale(10),
            borderRadius: scale(5),
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <CustomInput
            placeholder="Expiration date (MM/YY)"
            style={{
              marginBottom: scale(15),
              height: scale(36),
              backgroundColor: '#E3E3E3',
              borderRadius: scale(5),
              width: '60%',
            }}
          />
          <CustomInput
            placeholder="Code CVV"
            style={{
              marginBottom: scale(15),
              height: scale(36),
              backgroundColor: '#E3E3E3',
              borderRadius: scale(5),
              width: '30%',
            }}
          />
        </View>
        <CustomInput
          placeholder="Full name of the cardholder"
          style={{
            marginBottom: scale(15),
            height: scale(36),
            backgroundColor: '#E3E3E3',
            borderRadius: scale(5),
          }}
        />
        <CustomText
          textType="semiBold"
          style={{...styles.text1, color: COLORS.black}}>
          Address for credit/debit card registration
        </CustomText>
        <CustomInput
          placeholder="Address"
          style={{
            marginBottom: scale(15),
            height: scale(36),
            backgroundColor: '#E3E3E3',
            borderRadius: scale(5),
            marginTop: scale(20),
          }}
        />
        <CustomInput
          placeholder="Zip code"
          style={{
            marginBottom: scale(15),
            height: scale(36),
            backgroundColor: '#E3E3E3',
            borderRadius: scale(5),
          }}
        />
      </View>

      <Button title={'Submit'} onPress={Submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  text0: {
    fontSize: SIZES.xSmall,
  },
  text: {
    fontSize: SIZES.small,
  },
  text1: {
    fontSize: SIZES.medium,
    color: '#F0B90B',
  },
  text2: {
    fontSize: SIZES.medium,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(25),
    width: scale(147),
    justifyContent: 'center',
    marginTop: scale(20),
    alignSelf: 'center',
  },
  button1: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(25),
    width: scale(104),
    justifyContent: 'center',
    marginTop: scale(20),
  },
  box: {
    backgroundColor: '#EEEEEE',
    height: scale(61),
    borderRadius: scale(8),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
  },
  box1: {
    backgroundColor: '#EEEEEE',
    height: scale(91),
    width: scale(156),
    borderRadius: scale(8),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    alignItems: 'center',
  },
  historyHeader: {
    flexDirection: 'row',
    height: scale(29),
    backgroundColor: COLORS.white,
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginTop: scale(30),
  },
  historyBox: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    backgroundColor: '#EEEEEE',
    borderBottomLeftRadius: scale(8),
    borderBottomRightRadius: scale(8),
  },
  line: {
    height: scale(2),
    backgroundColor: COLORS.grey,
    width: '95%',
    alignSelf: 'center',
    marginTop: scale(10),
    marginBottom: scale(20),
  },
  addbank: {
    height: scale(48),
    borderRadius: scale(8),
    alignItems: 'center',
    // justifyContent:'center',
    flexDirection: 'row',
  },
  addtag: {
    height: scale(48),
    borderRadius: scale(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    // justifyContent:'center',
    flexDirection: 'row',
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
});

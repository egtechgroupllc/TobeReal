import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CustomButton} from '../../../components';
import CustomText from '../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {
  Avatar,
  IconEditProfile,
  IconGoBack,
  IconNotification,
  IconRight,
} from '../../../assets/icon/Icon';
import LinearGradient from 'react-native-linear-gradient';
import { useLanguage } from '../../../hooks/useLanguage';

export default function CategoriesButton({
  title,
  viewpersonal,
  onPress,
  changePW,
  large,
  small,
  style,
  client,
  customerBuy,
  customerRent,
  contactPurchase,
  personalInformation,
  number,
  postManagement
}) 
{
  const {t}= useLanguage()
  return (
    <View >
      {large && (
        <TouchableOpacity onPress={onPress}>
          <LinearGradient
            colors={['#F0B90B', '#FFFFFF00']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.8}}
            style={styles.button}>
            <CustomText textType="bold" style={{...styles.text2}}>
              {title}
            </CustomText>
            <IconRight />
          </LinearGradient>
        </TouchableOpacity>
      )}
        {postManagement && (
        <View>
          <LinearGradient
            colors={['#F0B90B', '#FFFFFF00']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.8}}
            style={styles.button}>
              <CustomText textType="medium" style={{...styles.text2}}>
              {number}
            </CustomText>
            <CustomText textType="medium"  style={{...styles.text2}}>
              {title}
            </CustomText>
            <CustomText textType="medium" style={{...styles.text2}}>
            </CustomText>
          </LinearGradient>
        </View>
      )}
      {small && (
        <TouchableOpacity onPress={onPress}>
          <LinearGradient
            colors={['#F0B90B', '#FFFFFF00']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[styles.buttonSmall]}>
            <CustomText textType="bold" style={{...styles.text2}}>
              {title}
            </CustomText>
            <IconRight />
          </LinearGradient>
        </TouchableOpacity>
      )}
      {viewpersonal && (
        <View style={styles.box}>
            <View>
            <TouchableOpacity
              onPress={changePW}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CustomText textType="bold" style={{...styles.text2, width:'97%'}}>
              {t('change_password')}
              </CustomText>
              <View>
                <IconRight />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={personalInformation}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CustomText textType="bold" style={{...styles.text2}}>
              {t('personal_information')}
              </CustomText>
              <IconRight />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {client && (
        <View style={styles.box}>
          <View>
            <TouchableOpacity
              onPress={customerBuy}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CustomText textType="bold" style={{...styles.text2, width:'97%'}}>
              {t('customer_buy')}
              </CustomText>
              <View>
                <IconRight />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={customerRent}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CustomText textType="bold" style={{...styles.text2}}>
              {t('customer_rent')}
              </CustomText>
              <IconRight />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={contactPurchase}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CustomText textType="bold" style={{...styles.text2}}>
              {t('contact_purchased')}
              </CustomText>
              <IconRight />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor:'white',
    alignItems: 'center',
    alignSelf:'center',
    borderRadius: scale(4),
    height: scale(35),
    width:'100%',
    justifyContent: 'space-between',
    marginTop: scale(20),
    borderWidth: scale(1),
    borderColor: '#F0B90B',
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },
  buttonSmall: {
    alignItems: 'center',
    borderRadius: scale(36),
    height: scale(29),
    justifyContent: 'space-between',
    marginTop: scale(20),
    // flex:1,
    borderWidth: scale(0.5),
    borderColor: '#0000001A',
    flexDirection: 'row',
    paddingHorizontal: scale(7),
    minWidth:'45%'
  },
  text2: {
    fontSize: SIZES.small,
  },
  box: {
    height: scale(70),
    backgroundColor: '#EEEEEE',
    borderBottomLeftRadius: scale(5),
    borderBottomRightRadius: scale(5),
    borderBottomStartRadius: scale(5),
    borderBottomEndRadius: scale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
  },
});

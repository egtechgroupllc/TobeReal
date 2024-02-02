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
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import {IconAdd, IconEditProfile} from '../../../../assets/icon/Icon';
import { useLanguage } from '../../../../hooks/useLanguage';
export default function BotContent() {
  const {t}= useLanguage()
  const [openView, setOpenView] = useState(false);
  const OpenView = () => {
    setOpenView(prevOpenView => !prevOpenView);
  };
  return (
    <View style={styles.container}>
      <View style={{...styles.box}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View></View>
          <TouchableOpacity>
            <IconEditProfile />
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <CustomText
            textType="medium"
            style={{...styles.text, color: COLORS.black}}>
                 {t('email')}:
          </CustomText>
          <CustomText
            textType="regular"
            style={{
              ...styles.text,
              color: COLORS.black,
              marginLeft: scale(10),
            }}>
            tobereal@gmail.com
          </CustomText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <CustomText
            textType="medium"
            style={{
              ...styles.text,
              color: COLORS.black,
              marginTop: scale(10),
            }}>
            {t('phone')}:
          </CustomText>
          <CustomText
            textType="regular"
            style={{
              ...styles.text,
              color: COLORS.black,
              marginLeft: scale(10),
              marginTop: scale(10),
            }}>
            0824232339
          </CustomText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <CustomText
            textType="medium"
            style={{
              ...styles.text,
              color: COLORS.black,
              marginTop: scale(10),
            }}>
            {t('gender')}:
          </CustomText>
          <CustomText
            textType="regular"
            style={{
              ...styles.text,
              color: COLORS.black,
              marginLeft: scale(10),
              marginTop: scale(10),
            }}>
            Male
          </CustomText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <CustomText
            textType="medium"
            style={{
              ...styles.text,
              color: COLORS.black,
              marginTop: scale(10),
            }}>
            {t('address')}:
          </CustomText>
          <CustomText
            textType="regular"
            style={{
              ...styles.text,
              color: COLORS.black,
              marginLeft: scale(10),
              marginTop: scale(10),
            }}>
            USA
          </CustomText>
        </View>
      </View>
      <View style={{...styles.box1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <CustomText
            textType="medium"
            style={{...styles.text, color: COLORS.black}}>
            {t('link_website')}:
          </CustomText>
          <TouchableOpacity>
            <IconEditProfile />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={OpenView}
        style={
          !openView
            ? {...styles.box1, marginBottom: scale(100)}
            : {...styles.box1}
        }>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <CustomText
            textType="medium"
            style={{...styles.text, color: COLORS.black}}>
            {t('social_network_link')}:
          </CustomText>
          <IconEditProfile />
        </View>
      </TouchableOpacity>
      {openView && (
        <View style={{...styles.box2, marginBottom: scale(100)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View></View>
            <TouchableOpacity>
              <IconAdd />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View></View>
            <TouchableOpacity>
              <IconAdd />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  box: {
    backgroundColor: '#EEEEEE',
    height: scale(174),
    width:'90%',
    borderRadius: scale(8),
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
  },
  box1: {
    backgroundColor: '#EEEEEE',
    height: scale(39),
    width:'90%',
    borderRadius: scale(8),
    justifyContent: 'center',
    paddingHorizontal: scale(15),
    marginTop: scale(10),
  },
  box2: {
    backgroundColor: '#EEEEEE',
    minHeight: scale(75),
    width:'90%',
    borderRadius: scale(4),
    paddingHorizontal: scale(15),
    paddingTop: scale(20),
  },
  text: {
    fontSize: SIZES.medium,
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
  line: {
    height: scale(0.5),
    backgroundColor: COLORS.black,
    marginTop: scale(10),
    marginBottom: scale(10),
  },
});

import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import CategoriesButton from '../../components/CategoriesButton';
import {IconSupporterYellow} from '../../../../assets/icon/Icon';
import CustomText from '../../../../components/CustomText';
import { useLanguage } from '../../../../hooks/useLanguage';

export default function Content() {
  const {t}= useLanguage()
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const onPress = () => {};
  const notify = () => {};
  return (
    <View style={styles.container}>
      <Header
        goback={true}
        subHeading={t('post_price_list_news')}
        noti={true}
        onPress={goBack}
        notify={notify}></Header>
      <CategoriesButton
        title={t('benefit_annual')}
        onPress={onPress}
        large={true}
        style={{marginTop: scale(10)}}
      />
      <CategoriesButton
        title={t('posting_package')}
        onPress={onPress}
        large={true}
      />
      <CategoriesButton
        title={t('cost_for_each')}
        onPress={onPress}
        large={true}
      />
      <CategoriesButton
        title={t('create_an_online')}
        onPress={onPress}
        large={true}
      />
      <View style={styles.box}>
        <View style={{marginTop: scale(10)}}>
          <IconSupporterYellow />
        </View>

        <View style={{marginLeft: scale(30), marginRight: scale(50)}}>
          <CustomText
            textType="bold"
            style={{...styles.text1, color: COLORS.black}}>
            {t('support')}
          </CustomText>
          <View style={{marginTop: scale(10)}}>
            <CustomText
              textType="medium"
              style={{...styles.text, color: COLORS.black}}>
              {t('hotline')}: ....
            </CustomText>
            <CustomText
              textType="medium"
              style={{...styles.text, color: COLORS.black}}>
              {t('email')}: ....
            </CustomText>
            <CustomText
              textType="medium"
              style={{...styles.text, color: COLORS.black}}>
              {t('website')}: ....
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    width:'90%'
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
  box: {
    backgroundColor: '#EEEEEE',
    height: scale(85),
    borderRadius: scale(5),
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: scale(5),
    marginTop: scale(20),
  },
  line: {
    height: scale(1),
    backgroundColor: 'black',
  },
});

import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {SIZES, scale} from '../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import CategoriesButton from '../../components/CategoriesButton';
import {useLanguage} from '../../../../hooks/useLanguage';

export default function Content() {
  const {t} = useLanguage();
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
        subHeading={t('post_management')}
        noti={true}
        onPress={goBack}
        notify={notify}></Header>
      <CategoriesButton
        title={t('news_is_showing')}
        postManagement={true}
        style={{marginTop: scale(10)}}
        number={0}
      />
      <CategoriesButton
        title={t('news_waiting')}
        postManagement={true}
        number={0}
      />
      <CategoriesButton
        title={t('information_not_valid')}
        postManagement={true}
        number={0}
      />
      <CategoriesButton
        title={t('unpaid_news')}
        postManagement={true}
        number={0}
      />
      <CategoriesButton
        title={t('expired_news')}
        postManagement={true}
        number={0}
      />
      <CategoriesButton
        title={t('news_stopped')}
        postManagement={true}
        number={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    width: '90%',
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
});

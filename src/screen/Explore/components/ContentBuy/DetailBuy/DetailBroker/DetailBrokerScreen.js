import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../../../Profile/components/Header';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../../assets/constants';
import MainWrapper from '../../../../../../components/MainWrapper';
import {
  Avatar,
  IconBrokerCertificate,
  IconCalendar,
  IconCertificate,
  IconEmail,
  IconPhone,
  IconViewablePassword,
} from '../../../../../../assets/icon/Icon';
import CustomText from '../../../../../../components/CustomText';
import Info from './components/Info';
import HeadContent from './components/HeadContent';
import Contact from './components/Contact';
import Posted from './components/Posted';

export default function DetailBrokerScreen() {
  const navigation = useNavigation();
  const {t} = useLanguage();
  const goBack = () => {
    navigation.goBack();
  };
  const notify = () => {};
  return (
    <MainWrapper>
      <View style={styles.container}>
        <Header
          goback={true}
          subHeading={t('Detail Broker')}
          noti={true}
          onPress={goBack}
          notify={notify}
        />
        <HeadContent />
        <Info />
        <Contact />
      </View>
      <View style={styles.line} />
      <Posted />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(20),
    paddingBottom: scale(20),
    width: '90%',
    alignSelf: 'center',
  },
  line: {
    height: scale(3),
    backgroundColor: COLORS.grey,
    ...SHADOW,
  },
});

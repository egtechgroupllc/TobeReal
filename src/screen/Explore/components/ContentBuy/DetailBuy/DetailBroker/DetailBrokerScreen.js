import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, scale} from '../../../../../../assets/constants';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import Header from '../../../../../Profile/components/Header';
import Contact from './components/Contact';
import HeadContent from './components/HeadContent';
import Info from './components/Info';
import Posted from './components/Posted';
import MainWrapper from '../../../../../../components/MainWrapper';
import {IconHome} from '../../../../../../assets/icon/Icon';

export default function DetailBrokerScreen() {
  const params = useRoute().params;
  const {t} = useLanguage();
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('detail_broker'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper>
      <View style={styles.container}>
        <HeadContent data={params} />
        <Info data={params} />
        {/* <Contact /> */}
      </View>
      <View style={styles.line} />
      <Posted dataPost={params} />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(20),
    paddingBottom: scale(20),
    width: '100%',
    alignSelf: 'center',
  },
  line: {
    height: scale(3),
    backgroundColor: COLORS.grey,
    ...SHADOW,
  },
});

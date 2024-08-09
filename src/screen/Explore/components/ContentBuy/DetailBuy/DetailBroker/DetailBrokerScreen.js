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
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('detail_broker'),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('BottomTab')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper>
      <View style={styles.container}>
        <HeadContent data={params} />
        <Info data={params} />
        <Contact data={params} />
      </View>
      <View style={styles.line} />
      <Posted dataPost={params} />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
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

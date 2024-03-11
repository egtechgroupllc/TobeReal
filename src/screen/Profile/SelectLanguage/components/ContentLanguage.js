import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {SIZES, WIDTH, images} from '../../../../assets/constants';
import {showMess} from '../../../../assets/constants/Helper';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
import ItemLanguage from './ItemLanguage';
const listLanguage = [
  {
    id: '1',
    name: 'English',
    flag: images.usa,
    languageCode: 'en',
    checked: false,
  },
  {
    id: '2',
    name: 'Vietnamese',
    flag: images.vietnam,
    languageCode: 'vi',
    checked: false,
  },
  {
    id: '3',
    name: 'Indonesia',
    flag: images.indonesia,
    languageCode: 'id',
    checked: false,
  },
  {
    id: '4',
    name: 'Malaysia',
    flag: images.malaysia,
    languageCode: 'my',
    checked: false,
  },
  {
    id: '5',
    name: 'Thailand',
    flag: images.thailand,
    languageCode: 'th',
    checked: false,
  },
  {
    id: '6',
    name: 'Philippines',
    flag: images.philipin,
    languageCode: 'ph',
    checked: false,
  },
  {
    id: '7',
    name: 'China',
    flag: images.china,
    languageCode: 'cn',
    checked: false,
  },
  // Add more language items as needed
];

export default function ContentLanguage() {
  const {t, changeLocale, locale} = useLanguage();
  const {goBack, setOptions} = useNavigation();

  const [language, setLanguage] = useState(locale);

  const changeLanguage = () => {
    changeLocale(language);
    showMess(t('change_language_success'), 'success');
    goBack();
  };

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('select_language'),
      headerRight: () => (
        <CustomText
          textType="semiBold"
          disabled={language === locale}
          style={{
            color: language !== locale ? '#fff' : '#eee',
            fontSize: SIZES.xMedium,
          }}
          onPress={changeLanguage}>
          Done
        </CustomText>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <View style={styles.container}>
      <FlatList
        data={listLanguage}
        style={{
          width: '90%',
          alignSelf: 'center',
        }}
        contentContainerStyle={{
          marginTop: '10%',
        }}
        scrollEnabled={true}
        renderItem={({item}) => (
          <ItemLanguage
            item={item}
            check={language === item.languageCode}
            onPress={() => setLanguage(item?.languageCode)}
          />
        )}
        keyExtractor={item => item.languageCode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH.widthContain,
    height: '100%',
    alignSelf: 'center',
  },
});
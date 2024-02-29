import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {SIZES, images, scale} from '../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {useLanguage} from '../../../../hooks/useLanguage';
import CustomText from '../../../../components/CustomText';
import {IconCheckBox, IconUnCheckBox} from '../../../../assets/icon/Icon';
import {CustomButton} from '../../../../components';
import { showMess } from '../../../../assets/constants/Helper';
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
export default function Content() {
  const {t, changeLocale, locale} = useLanguage();
  const [loading, setLoading] = useState(false);
  const {goBack} = useNavigation();

  const notify = () => {};
  const [language, setLanguage] = useState(locale);
  const changeLanguage = () => {
    setLoading(true);
    changeLocale(language);
    setTimeout(() => {
      setLoading(false);
      showMess(t('change_language_success'), 'success');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Header
        goback={true}
        subHeading={t('select_language')}
        noti={true}
        onPress={goBack}
        notify={notify}
      />
      <View style={{marginTop: scale(40)}}>
        <FlatList
          style={{flex: 1}}
          data={listLanguage}
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setLanguage(item?.languageCode)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={item.flag} style={styles.image} />
                <CustomText textType="medium" style={{marginLeft: scale(10)}}>
                  {item.name}
                </CustomText>
              </View>
              <View>
                {language === item.languageCode ? (
                  <IconCheckBox />
                ) : (
                  <IconUnCheckBox />
                )}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.languageCode}
        />
         {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF8C00" />
        </View>
      )}
        <CustomButton
          text={'OK'}
          buttonType="large"
          linearGradientProps
          onPress={changeLanguage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    width: '90%',
    alignItems: 'center',
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
    borderRadius: scale(4),
    height: scale(36),
    width: scale(334),
    marginTop: scale(15),
    borderWidth: scale(1),
    borderColor: '#C2C2C2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
  },
  image: {
    height: scale(20),
    width: scale(28),
  },
  loadingContainer: {
    position:'absolute',
    marginTop:scale(100),
    alignSelf:'center'
  },
});

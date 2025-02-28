import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainWrapper from '../../components/MainWrapper';
import {COLORS, SHADOW, SIZES, images, scale} from '../../assets/constants';
import CustomImage from '../../components/CustomImage';
import {CustomButton} from '../../components';
import CategoriesButton from '../Profile/components/CategoriesButton';
import {useNavigation} from '@react-navigation/native';
import {useCountry} from '../../hooks/useCountry';
import {useLanguage} from '../../hooks/useLanguage';
import CustomText from '../../components/CustomText';
import EncryptedStorage from 'react-native-encrypted-storage';
import {showMess} from '../../assets/constants/Helper';
import {storage} from '../../utils/MMKVStorage';

export default function SelectDefaultCountryScreen() {
  const navigation = useNavigation();
  const {t} = useLanguage();
  const {onSaveCountry} = useCountry();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [country, setCountry] = useState(null);
  const onSaveLanguage = async () => {
    await storage.set('@selectedLanguage', JSON.stringify(selectedLanguage));
  };
  const selectCountry = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'CountryScreen',
      params: {
        onGoBack: data => {
          setCountry(data);
        },
      },
    });
  };

  const selectLanguage = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'SelectLanguageScreen',
      params: {
        onGoBack: data => {
          setSelectedLanguage(data);
        },
      },
    });
  };

  const handleConfirm = () => {
    if (country) {
      onSaveCountry(country);
      onSaveLanguage();
    } else {
      showMess('Please select country to continue!', 'error');
    }
  };
  useEffect(() => {
    if (!selectedLanguage) {
      setSelectedLanguage({
        id: '1',
        name: 'English',
        flag: images.usa,
        languageCode: 'en',
        checked: false,
      });
    }
  }, []);

  return (
    <MainWrapper>
      <View style={styles.contain}>
        <CustomImage
          source={images.logo1}
          resizeMode="contain"
          style={{
            width: '100%',
            height: scale(120),
          }}
        />
        <CustomText
          textType="medium"
          style={{fontSize: SIZES.large, marginTop: scale(20)}}>
          Welcome to Pione House!
        </CustomText>
        <CustomText textType="regular">{t('please_select_country')}</CustomText>
        <CategoriesButton
          style={{
            width: '90%',
            marginTop: scale(30),
          }}
          title={t('select_country')}
          onPress={selectCountry}
          large={true}
          nameCountry={country?.name && `${country?.flag}  ${country?.name}`}
        />
        <CategoriesButton
          style={{width: '90%', marginTop: scale(10)}}
          title={t('select_language')}
          onPress={selectLanguage}
          large={true}
          IconSource={
            selectedLanguage?.name ? selectedLanguage?.flag : images.usa
          }
          nameCountry={
            selectedLanguage?.name ? selectedLanguage?.name : 'English'
          }
        />
        <View style={{marginTop: scale(220), width: '60%'}}>
          <CustomButton
            text={t('confirm')}
            onPress={handleConfirm}
            // linearGradientProps={{colors: COLORS.linearGradient}}
          />
        </View>
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  contain: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(70),
  },
});

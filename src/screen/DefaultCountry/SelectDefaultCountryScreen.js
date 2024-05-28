import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainWrapper from '../../components/MainWrapper';
import {COLORS, SIZES, images, scale} from '../../assets/constants';
import CustomImage from '../../components/CustomImage';
import {CustomButton} from '../../components';
import CategoriesButton from '../Profile/components/CategoriesButton';
import {useNavigation} from '@react-navigation/native';
import {useCountry} from '../../hooks/useCountry';
import {useLanguage} from '../../hooks/useLanguage';
import CustomText from '../../components/CustomText';
import EncryptedStorage from 'react-native-encrypted-storage';
import {showMess} from '../../assets/constants/Helper';

export default function SelectDefaultCountryScreen() {
  const navigation = useNavigation();
  const {t} = useLanguage();
  const {onSaveCountry} = useCountry();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [country, setCountry] = useState(null);
  const onSaveLanguage = async () => {
    await EncryptedStorage.setItem(
      '@selectedLanguage',
      JSON.stringify(selectedLanguage),
    );
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
    navigation.navigate('NavigationProfile', {
      screen: 'SelectLanguageScreen',
      params: {
        onGoBack: data => {
          setSelectedLanguage(data);
        },
      },
    });
  };

  const handleConfirm = () => {
    if (country && selectedLanguage) {
      onSaveCountry(country);
      onSaveLanguage();
    } else {
      showMess(
        'Please select both of language and country to continue!',
        'error',
      );
    }
  };
  return (
    <MainWrapper scrollEnabled={false} imgBackground>
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
          style={{
            fontSize: SIZES.large,
            marginTop: scale(20),
            color: COLORS.white,
          }}>
          Welcome to Saveloka!
        </CustomText>
        <CustomText textType="regular" style={{color: COLORS.white}}>
          Please select country and language to continue
        </CustomText>
        <CategoriesButton
          style={{width: '90%', marginTop: scale(30)}}
          title={t('Select country')}
          onPress={selectCountry}
          large={true}
          nameCountry={country?.name && `${country?.flag}  ${country?.name}`}
        />
        <CategoriesButton
          style={{width: '90%', marginTop: scale(10)}}
          title={t('select_language')}
          onPress={selectLanguage}
          large={true}
          IconSource={selectedLanguage?.name && selectedLanguage?.flag}
          nameCountry={selectedLanguage?.name && selectedLanguage?.name}
        />
        <View style={{marginTop: scale(220), width: '60%'}}>
          <CustomButton text={t('confirm')} onPress={handleConfirm} />
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

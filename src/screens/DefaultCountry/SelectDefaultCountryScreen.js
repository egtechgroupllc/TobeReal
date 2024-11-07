import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CategoriesButton from '../Profile/components/CategoriesButton';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useLanguage} from '~/hooks/useLanguage';
import {useCountry} from '~/hooks/useCountry';
import {showMess} from '~/assets/constants/Helper';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';

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
    <MainWrapper sourceImage={images.backgroundHome}>
      <View style={styles.contain}>
        <CImage
          source={images.logoTobeCare}
          resizeMode="contain"
          style={{
            width: '100%',
            height: scale(100),
          }}
        />
        <CText
          textType="medium"
          style={{
            fontSize: SIZES.large,
            marginTop: scale(20),
            color: COLORS.White,
          }}>
          Welcome to TobeCare!
        </CText>
        <CText textType="regular" style={{color: COLORS.White}}>
          {t('please_select_country')}
        </CText>
        <CategoriesButton
          style={{width: '90%', marginTop: scale(30)}}
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
          IconSource={selectedLanguage?.name && selectedLanguage?.flag}
          nameCountry={selectedLanguage?.name && selectedLanguage?.name}
        />
        <View style={{marginTop: scale(220), width: '60%'}}>
          <Button
            title={t('confirm')}
            onPress={handleConfirm}
            linearGradientProps={{colors: COLORS.linearButton}}
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

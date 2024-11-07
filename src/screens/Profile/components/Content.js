import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

import BoxItemProfile from './BoxItemProfile';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '~/hooks/useLanguage';
import {useCountry} from '~/hooks/useCountry';
import {scale} from '~/utils/scale';
import {COLORS, SHADOW, SIZES} from '~/assets/constants';
import {CText} from '~/components';

export default function Content({token}) {
  const {t, locale} = useLanguage();
  const {country} = useCountry();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const {navigate} = useNavigation();

  useEffect(() => {
    const loadSavedLanguage = async () => {
      const result = await EncryptedStorage.getItem('@selectedLanguage');
      result && setSelectedLanguage(JSON.parse(result));
    };
    loadSavedLanguage();
  }, [locale]);
  return (
    <View
      style={{
        rowGap: scale(20),
        marginTop: scale(30),
      }}>
      <Box title={t('setting')}>
        <BoxItemProfile
          title={t('financial_management')}
          nameScreen={token ? 'AddressWalletScreen' : 'LoginScreen'}
          nameNavigate={token ? 'NoBottomTab' : 'NavigationAuth'}
        />
        <BoxItemProfile
          title={t('account_security')}
          nameScreen={token ? 'AccountAndSecurityScreen' : 'LoginScreen'}
          nameNavigate={token ? 'NoBottomTab' : 'NavigationAuth'}
        />
      </Box>

      {/* <Box title={'Tiện ích'}>
        <BoxItemProfile
          Icon={IconDeposit}
          title={'Nạp & Rút Tiền'}
          nameScreen={token ? 'FinancialScreen' : 'LoginScreen'}
          nameNavigate={token ? 'NavigationProfile' : 'NavigationAuth'}
        />
      </Box> */}

      <Box title={t('content_display')}>
        <BoxItemProfile
          title={t('select_country')}
          nameScreen="CountryScreen"
          nameNavigate={'NoBottomTab'}
          titleRight={country?.name && `${country?.flag} ${country?.name}`}
        />
        <BoxItemProfile
          title={t('main_currency')}
          nameScreen="CurrencyScreen"
          nameNavigate={'NoBottomTab'}
          titleRight={country?.name && `${country?.currencyCode}`}
        />
        <BoxItemProfile
          title={t('select_language')}
          nameScreen="SelectLanguageScreen"
          nameNavigate={'NoBottomTab'}
          titleRight={selectedLanguage?.name}
        />
      </Box>

      {/* <Box title={'Trợ giúp'}>
        <BoxItemProfile title={'Trung tâm trợ giúp'} />
        <BoxItemProfile title={'Thông tin chung'} />
      </Box> */}
    </View>
  );
}

const Box = memo(({title, children}) => {
  return (
    <View
      style={{
        rowGap: scale(10),
        ...SHADOW,
      }}>
      <CText textType="bold" size={SIZES.medium} color={COLORS.White}>
        {title}
      </CText>
      <View
        style={{
          backgroundColor: COLORS.overlay,
          paddingHorizontal: scale(12),
          paddingVertical: scale(6),
          borderRadius: scale(10),
          // borderWidth: 1,
          // borderColor: COLORS.cyan,
        }}>
        {children}
      </View>
    </View>
  );
});

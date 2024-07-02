import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {SHADOW, SIZES, scale} from '../../../assets/constants';
import {IconDeposit} from '../../../assets/icon/Icon';
import {CustomText} from '../../../components';
import {useCountry} from '../../../hooks/useCountry';
import {useLanguage} from '../../../hooks/useLanguage';
import BoxItemProfile from './BoxItemProfile';
import {useNavigation} from '@react-navigation/native';

export default function Content() {
  const {t} = useLanguage();
  const {country} = useCountry();
  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {
    const loadSavedLanguage = async () => {
      const result = await EncryptedStorage.getItem('@selectedLanguage');
      result && setSelectedLanguage(JSON.parse(result));
    };
    loadSavedLanguage();
  }, []);
  const {navigate} = useNavigation();
  return (
    <View
      style={{
        rowGap: scale(20),
        marginTop: scale(30),
      }}>
      <Box title={'Cài đặt'}>
        <BoxItemProfile
          Icon={IconDeposit}
          title={t('financial_management')}
          nameScreen="AddressWalletScreen"
          nameNavigate="NavigateWalletToken"
        />
        <BoxItemProfile
          title={'Tài khoản & Bảo mật'}
          nameScreen={'AccountAndSecurityScreen'}
        />
      </Box>

      <Box title={'Tiện ích'}>
        <BoxItemProfile
          Icon={IconDeposit}
          title={'Nạp & Rút Tiền'}
          nameScreen="FinancialScreen"
        />
      </Box>

      <Box title={'Nội dung & Hiển thị'}>
        <BoxItemProfile
          title={t('select_country')}
          nameScreen="CountryScreen"
          titleRight={country?.name && `${country?.flag} ${country?.name}`}
        />
        <BoxItemProfile
          title={t('main_currency')}
          nameScreen="CurrencyScreen"
          titleRight={country?.name && `${country?.currency_code}`}
        />
        <BoxItemProfile
          title={t('select_language')}
          nameScreen="SelectLanguageScreen"
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
      <CustomText textType="bold" size={SIZES.medium}>
        {title}
      </CustomText>
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: scale(12),
          paddingVertical: scale(6),
          borderRadius: scale(10),
        }}>
        {children}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({});

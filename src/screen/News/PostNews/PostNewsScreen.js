import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import {COLORS, SIZES, scale} from '../../../assets/constants';
import CustomText from '../../../components/CustomText';
import MainWrapper from '../../../components/MainWrapper';
import {useLanguage} from '../../../hooks/useLanguage';
import TabContent from './components/TabContent';

export default function PostNewsScreen() {
  const queryClient = useQueryClient();

  const profile = queryClient.getQueryData(['user', 'profile'])?.data;
  const {t} = useLanguage();

  const {navigate} = useNavigation();

  const handleRegisterPartner = () => {
    navigate('NavigationAuth', {
      screen: 'RegisterPartnerScreen',
    });
  };

  return (
    <MainWrapper>
      <TabContent />

      {(profile?.role_id === 2 || profile?.role_id === undefined) &&
        (profile?.status === 'VERIFYING_BUSINESS' ? (
          <View style={{marginTop: scale(50), alignItems: 'center'}}>
            <CustomText
              textType="regular"
              style={{
                fontSize: SIZES.medium,
                color: COLORS.blue,
              }}>
              {t('account_approval')}
            </CustomText>
          </View>
        ) : (
          <View style={{marginTop: scale(50), alignItems: 'center'}}>
            <CustomText
              textType="regular"
              style={{
                fontSize: SIZES.medium,
              }}>
              {t('please_become_partner')}
            </CustomText>
            <TouchableOpacity onPress={handleRegisterPartner}>
              <CustomText
                textType="regular"
                style={{
                  fontSize: SIZES.medium,
                  color: COLORS.primary,
                }}>
                {t('become_partner')}
              </CustomText>
            </TouchableOpacity>
          </View>
        ))}
    </MainWrapper>
  );
}

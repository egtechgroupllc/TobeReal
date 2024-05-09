import React from 'react';
import MainAuth from '../../../components/MainAuth';
import Header from '../components/Header';
import TabContent from './components/TabContent';
import MainWrapper from '../../../components/MainWrapper';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {TouchableOpacity, View} from 'react-native';
import CustomText from '../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import {showMess} from '../../../assets/constants/Helper';
import {postLogout} from '../../../Model/api/auth';
import {useAuthentication} from '../../../hooks/useAuthentication';

export default function PostNewsScreen() {
  const queryClient = useQueryClient();

  const profile = queryClient.getQueryData(['user', 'profile'])?.data;

  const {navigate} = useNavigation();
  const goBack = () => {};
  const upgrade = () => {};
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
              Your account is waiting for approval
            </CustomText>
          </View>
        ) : (
          <View style={{marginTop: scale(50), alignItems: 'center'}}>
            <CustomText
              textType="regular"
              style={{
                fontSize: SIZES.medium,
              }}>
              Please become Saveloka partner to post news
            </CustomText>
            <TouchableOpacity onPress={handleRegisterPartner}>
              <CustomText
                textType="regular"
                style={{
                  fontSize: SIZES.medium,
                  color: COLORS.primary,
                }}>
                Become Saveloka partner
              </CustomText>
            </TouchableOpacity>
          </View>
        ))}
    </MainWrapper>
  );
}

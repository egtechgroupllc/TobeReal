import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MainWrapper} from '~/components';
import {COLORS, images} from '~/assets/constants';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import {useLanguage} from '~/hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import {scale} from '~/utils/scale';
import {useQueryClient} from '@tanstack/react-query';

export default function ManageRegisterDoctorScreen() {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  const queryClient = useQueryClient();

  const dataPro = queryClient.getQueryData(['user', 'get-list-profile'])?.data;

  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      headerTitle={t('manage_register_doctor')}>
      <View style={{flex: 1, paddingHorizontal: scale(20), rowGap: scale(20)}}>
        <ButtonTabValidate
          title={t('register_doctor')}
          onPress={() => navigate('RegisterDoctorScreen')}
          disabled={dataPro?.role === 3 ? true : false}
        />
        <ButtonTabValidate
          title={t('update_profile_doctor')}
          onPress={() => navigate('RegisterDoctorScreen', {update: true})}
          disabled={dataPro?.role === 3 ? false : true}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

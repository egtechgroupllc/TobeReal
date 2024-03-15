import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import MainAuth from '../../../components/MainAuth';
import AvatarImage from '../components/AvatarImage';
import {useNavigation} from '@react-navigation/native';
import MidContent from './components/MidContent';
import BotContent from './components/BotContent';
import HeaderAvatar from '../components/HeaderAvatar';
import {useLanguage} from '../../../hooks/useLanguage';
import {useAuthentication} from '../../../hooks/useAuthentication';
import {useQuery} from '@tanstack/react-query';
import {getProfile} from '../../../api/common';

export default function InformationScreen() {
  const {t} = useLanguage();
  const {token} = useAuthentication();

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const changeName = () => {};
  const notify = () => {};
  const onPressCamera = () => {};

  const {isLoading, isError, data, isPending, error} = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: getProfile,
    enabled: !!token,
  });

  return (
    <MainAuth>
      <HeaderAvatar
        noti={true}
        notify={notify}
        goback={true}
        onPress={goBack}
        subHeading={t('personal_information')}
      />
      <AvatarImage
        name={data?.data?.username}
        changeName={true}
        onPressChangeName={changeName}
        camera={true}
        onPressCamera={onPressCamera}
      />
      <MidContent data={data?.data} />
      <BotContent data={data?.data} />
    </MainAuth>
  );
}

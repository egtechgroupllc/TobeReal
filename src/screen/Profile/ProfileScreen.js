import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {getProfile} from '../../Model/api/common';
import MainAuth from '../../components/MainAuth';
import {useAuthentication} from '../../hooks/useAuthentication';
import AvatarImage from './components/AvatarImage';
import Bottom from './components/Bottom';
import Content from './components/Content';
import HeaderAvatar from './components/HeaderAvatar';
import HeaderNoToken from './components/HeaderNoToken';
import {Alert} from 'react-native';
import axios, {AxiosError} from 'axios';
import {showMess} from '../../assets/constants/Helper';
import MainWrapper from '../../components/MainWrapper';

export default function ProfileScreen() {
  const upgrade = () => {};

  const {token} = useAuthentication();
  const {goBack} = useNavigation();

  const {isLoading, isError, data, isPending, error} = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: getProfile,
    enabled: !!token,
  });

  return (
    <MainWrapper>
      {token ? (
        <>
          {/* <HeaderAvatar noti={false} notify={goBack} heading={'Profile'} /> */}
          <AvatarImage
            upgrade={true}
            name={data?.data?.username || 'name'}
            onPressUpgrade={upgrade}
          />
        </>
      ) : (
        <HeaderNoToken />
      )}
      <Content />
      <Bottom />
    </MainWrapper>
  );
}

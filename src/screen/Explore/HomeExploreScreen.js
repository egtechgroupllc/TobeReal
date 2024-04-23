import React, {Suspense} from 'react';
import {ActivityIndicator} from 'react-native';
import {COLORS, scale} from '../../assets/constants';
import MainWrapper from '../../components/MainWrapper';
import FindAccommodation from './components/FindAccommodation/FindAccommodation';
import Header from './components/Header';
import {getProfile, instanceCommon} from '../../Model/api/common';
import {useAuthentication} from '../../hooks/useAuthentication';
import {useQuery} from '@tanstack/react-query';
import {instanceAccom} from '../../Model/api/apiAccom';

export default function HomeExploreScreen() {
  const {token} = useAuthentication();

  const {isLoading, isError, data, isPending, error} = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => getProfile(token),
    enabled: !!token,
  });
  instanceAccom.defaults.headers.common['Authorization'] = token;
  return (
    <MainWrapper refreshControl>
      <Header />
      <FindAccommodation />
      <Suspense
        fallback={
          <ActivityIndicator
            size={'large'}
            color={COLORS.primary}
            style={{marginTop: scale(20)}}
          />
        }></Suspense>
    </MainWrapper>
  );
}

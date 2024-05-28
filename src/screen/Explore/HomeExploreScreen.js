import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {instanceAccom} from '../../Model/api/apiAccom';
import {getProfile} from '../../Model/api/common';
import MainWrapper from '../../components/MainWrapper';
import {useAuthentication} from '../../hooks/useAuthentication';
import FindAccommodation from './components/FindAccommodation/FindAccommodation';
import Header from './components/Header';

export default function HomeExploreScreen() {
  const {token} = useAuthentication();

  const {isLoading, isError, data, isPending, error} = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => getProfile(token),
    enabled: !!token,
  });

  instanceAccom.defaults.headers.common['Authorization'] = token;

  return (
    <MainWrapper refreshControl scrollEnabled={false} imgBackground>
      <Header />
      <FindAccommodation />
    </MainWrapper>
  );
}

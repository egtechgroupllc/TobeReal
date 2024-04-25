/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useMemo, useRef} from 'react';
import {StyleSheet} from 'react-native';

import MainWrapper from '../../../../../components/MainWrapper';

import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {scale, WIDTH} from '../../../../../assets/constants';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {getDetailTicket} from '../../../../../Model/api/apiTour';
import AnimateScrollWrapper from '../../AnimateScrollWrapper';
import GeneralInformation from './components/GeneralInformation';
import InfoDetail from './components/InfoDetail';
const Header_Max_Height = WIDTH.heightScreen / 3;

export default function DetailTicketScreen() {
  const {t} = useLanguage();
  const {isFocused, dispatch} = useNavigation();
  const params = useRoute().params;

  const listNavBar = useRef([
    {
      text: 'Tổng quan',
    },
    {
      text: t('Hiệu lực voucher'),
    },
    {
      text: t('Chính sách'),
    },
  ]).current;
  const {data, isLoading} = useQuery({
    queryKey: ['ticket', 'detail', params?.id],
    queryFn: () => getDetailTicket(params?.id),
  });
  const booktour = () => {
    if (isFocused()) {
      dispatch(
        StackActions.push('NoBottomTab', {
          screen: 'BookTourScreen',
          params: data,
        }),
      );
    }
  };
  const listView = useMemo(() => {
    const dataDetail = data?.data;
    return [
      // <InfoUnitFacilities />,

      <InfoDetail data={dataDetail} />,
      <GeneralInformation />,
      // <InfoUnitFacilities />,
      // <Map />,
      // <Review />,
      // <TourSchedule/>
      // <InfoAdditional />,
      // <SimilarApartmentsNearby />,
    ];
  }, [data?.data]);
  return (
    <MainWrapper scrollEnabled={false}>
      <AnimateScrollWrapper
        lisViewComponent={listView}
        listNav={listNavBar}
        dataDetail={{...data?.data, images: params?.images}}
        isLoading={isLoading}
        // ContentBookComponent={
        //   <BookAccommodation
        //     price={123213}
        //     isLoading={false}
        //     onPress={() => {}}
        //   />
        // }
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    rowGap: scale(10),
    marginTop: scale(-4),
    // alignItems: 'center',
  },
});

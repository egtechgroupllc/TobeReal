import React, {useMemo, useRef} from 'react';
import {View} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getDetailAccmo} from '../../Model/api/apiAccom';
import {WIDTH, scale} from '../../assets/constants';
import MainWrapper from '../../components/MainWrapper';
import {useLanguage} from '../../hooks/useLanguage';
import AnimateScrollWrapper from './components/AnimateScrollWrapper';
import AccommoPolicy from './components/DetailAccommodation/Detail/AccommoPolicy';
import BookAccommodation from './components/DetailAccommodation/Detail/BookAccommodation';
import DetailAccommoMap from './components/DetailAccommodation/Detail/DetailAccommoMap';
import InfoDetail from './components/DetailAccommodation/Detail/InfoDetail';
import InfoUnitFacilities from './components/DetailAccommodation/Detail/InfoUnitFacilities';
import Review from './components/DetailAccommodation/Detail/Review';
import SimilarApartmentsNearby from './components/DetailAccommodation/Detail/SimilarApartmentsNearby';
import TimeCheckInOut from './components/DetailAccommodation/Detail/TimeCheckInOut';

export default function DetailAccommodationScreen() {
  const params = useRoute().params;
  const {t} = useLanguage();

  const listNavBar = useRef([
    {
      text: 'Tổng quan',
    },
    {
      text: t('facilities'),
    },
    {
      text: t('location'),
    },

    {
      text: t('Review'),
    },
    {
      text: 'Chính sách',
    },
    {
      text: t('others'),
    },
  ]).current;

  const {data, isLoading} = useQuery({
    queryKey: ['accommodation', 'detail', params?.id],
    queryFn: () => getDetailAccmo(params?.id),
  });

  const listView = useMemo(() => {
    const dataDetail = data?.data;
    return !dataDetail
      ? []
      : [
          <InfoDetail data={dataDetail} />,
          <InfoUnitFacilities data={dataDetail} />,
          <View style={{rowGap: scale(8)}}>
            <DetailAccommoMap data={dataDetail} />
            <TimeCheckInOut data={dataDetail} />
          </View>,
          <Review dataP={dataDetail} />,
          <AccommoPolicy data={dataDetail} />,
          <SimilarApartmentsNearby />,
        ];
  }, [data?.data]);

  return (
    <MainWrapper scrollEnabled={false} noImgColor>
      <AnimateScrollWrapper
        lisViewComponent={listView}
        listNav={listNavBar}
        dataDetail={data?.data}
        isLoading={isLoading}
        ContentBookComponent={
          <BookAccommodation
            isLoading={false}
            data={{...data?.data, dataFilter: params?.dataFilter}}
          />
        }
      />
    </MainWrapper>
  );
}

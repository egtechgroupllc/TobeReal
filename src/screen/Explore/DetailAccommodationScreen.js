import React, {useMemo, useRef} from 'react';
import {View} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getDetailAccmo} from '../../Model/api/apiAccom';
import {scale} from '../../assets/constants';
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
import VideoYoutubeBox from './components/VideoYoutubeBox';
import Traceability from './components/DetailAccommodation/Detail/Traceability';

export default function DetailAccommodationScreen() {
  const params = useRoute().params;
  const {t} = useLanguage();

  const listNavBar = useRef([
    {
      text: t('overview'),
    },
    {
      text: t('traceability'),
    },
    {
      text: t('facilities'),
    },
    {
      text: t('location'),
    },

    {
      text: t('review'),
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
          <Traceability data={dataDetail} />,
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

  // console.log(params, '2131232adad13');
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
      {data?.data?.video_link && <VideoYoutubeBox data={data?.data} />}
    </MainWrapper>
  );
}

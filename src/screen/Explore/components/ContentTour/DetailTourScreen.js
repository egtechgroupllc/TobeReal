/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {scale, WIDTH} from '../../../../assets/constants';
import MainWrapper from '../../../../components/MainWrapper';
import {useLanguage} from '../../../../hooks/useLanguage';
import {getDetailTour} from '../../../../Model/api/apiTour';
import AnimateScrollWrapper from '../AnimateScrollWrapper';
import ContactInfo from '../ContentBuy/DetailBuy/ContactInfo';
import DetailAccommoMap from '../DetailAccommodation/Detail/DetailAccommoMap';
import InfoDetail from './DetailTour/InfoDetail';
import Review from './DetailTour/Review';
import TourSchedule from './DetailTour/TourSchedule';
import BookAccommodation from '../BookAccommodation';
import BookTour from './DetailTour/BookTour';
import {showMess} from '../../../../assets/constants/Helper';
const Header_Max_Height = WIDTH.heightScreen / 3;

export default function DetailTourScreen() {
  const params = useRoute().params;
  const {t} = useLanguage();

  const listNavBar = useRef([
    {
      text: t('overview'),
    },
    {
      text: t('location'),
    },
    {
      text: t('reviews'),
    },

    {
      text: t('others'),
    },
  ]).current;

  const {data, isLoading} = useQuery({
    queryKey: ['tour', 'detail', params?.id],
    queryFn: () => getDetailTour(params?.id),
  });
  const listView = useMemo(() => {
    const dataDetail = data?.data;
    return [
      // <InfoUnitFacilities />,

      <InfoDetail data={dataDetail} />,
      <DetailAccommoMap data={dataDetail} />,
      <Review dataP={dataDetail} />,
      // <View>
      //   <ContactInfo
      //     data={dataDetail}
      //     onPress={() => {
      //       showMess(t('comming_soon'), 'error');
      //     }}
      //   />
      // </View>,
      <TourSchedule data={dataDetail} />,

      // <SimilarApartmentsNearby />,
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
          <BookTour
            isLoading={false}
            data={{...data?.data, dataFilter: params?.dataFilter}}
          />
        }
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

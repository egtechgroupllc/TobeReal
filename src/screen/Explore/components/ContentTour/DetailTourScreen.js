/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

import InfoDetail from './DetailTour/InfoDetail';
import Map from './DetailTour/Map';
import Review from './DetailTour/Review';
import DetailAccommodationLoading from './DetailTour/DetailAccommodationLoading';
import MainWrapper from '../../../../components/MainWrapper';
import BookAccommodation from './DetailTour/BookAccommodation';
import DynamicHeader from './DetailTour/DynamicHeader';
import {scale, WIDTH} from '../../../../assets/constants';
import TourSchedule from './DetailTour/TourSchedule';
import {useRoute} from '@react-navigation/native';
import {useLanguage} from '../../../../hooks/useLanguage';
import DetailAccommoMap from '../DetailAccommodation/Detail/DetailAccommoMap';
import ContactInfo from '../ContentBuy/DetailBuy/ContactInfo';
import ConfigDetail from '../ContentBuy/ConfigDetail';
import {useQuery} from '@tanstack/react-query';
import {getDetailEstate} from '../../../../Model/api/apiEstate';
import AnimateScrollWrapper from '../AnimateScrollWrapper';
import {getDetailTour} from '../../../../Model/api/apiTour';
const Header_Max_Height = WIDTH.heightScreen / 3;

export default function DetailTourScreen() {
  const params = useRoute().params;
  const {t} = useLanguage();

  const listNavBar = useRef([
    {
      text: 'Tổng quan',
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
  // console.log('====================================');
  // console.log(params, 123123312);
  // console.log('====================================');
  const listView = useMemo(() => {
    const dataDetail = data?.data;
    return [
      // <InfoUnitFacilities />,

      <InfoDetail data={dataDetail} />,
      <DetailAccommoMap data={dataDetail} />,
      <Review />,
      <View>
        <ContactInfo data={dataDetail} />
      </View>,
      <TourSchedule />,

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

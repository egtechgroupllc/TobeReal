/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

import {useRoute} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';

import {scale, WIDTH} from '../../../../assets/constants';
import MainWrapper from '../../../../components/MainWrapper';
import {useLanguage} from '../../../../hooks/useLanguage';
import {getDetailEstate} from '../../../../Model/api/apiEstate';
import DetailAccommodationLoading from '../DetailAccommodation/Detail/DetailAccommodationLoading';
import DetailAccommoMap from '../DetailAccommodation/Detail/DetailAccommoMap';
import DynamicHeader from '../DetailAccommodation/Detail/DynamicHeader';
import ConfigDetail from './ConfigDetail';
import BookAccommodation from './DetailBuy/BookAccommodation';
import ContactInfo from './DetailBuy/ContactInfo';
import InfoDetail from './DetailBuy/InfoDetail';
import Review from './DetailBuy/Review';
import AnimateScrollWrapper from '../AnimateScrollWrapper';

const Header_Max_Height = WIDTH.heightScreen / 3;

export default function DetailBuyScreen({route}) {
  const params = useRoute().params;
  const {t} = useLanguage();

  const listView = useRef([
    <InfoDetail data={params} />,
    <DetailAccommoMap data={params} />,
    <Review />,
    <View>
      <ContactInfo data={params} />
      <ConfigDetail data={params} />
    </View>,
    // <SimilarApartmentsNearby
    //   name={title}
    //   image={jsondata || []}
    //   price={paramPrice}
    // />,
  ]).current;
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

  const [tabBarHeight, setTabBarHeight] = useState(0);

  const {data, isLoading} = useQuery({
    queryKey: ['estate', 'detail', params?.id],
    queryFn: () => getDetailEstate(params?.id),
  });

  return (
    <MainWrapper scrollEnabled={false} noImgColor>
      <AnimateScrollWrapper
        tabBarHeight={tabBarHeight}
        lisViewComponent={listView}
        listNav={listNavBar}
        dataDetail={data?.data}
        ContentComponent={
          <BookAccommodation
            setBookHeight={setTabBarHeight}
            price={123213}
            isLoading={false}
            onPress={() => {}}
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

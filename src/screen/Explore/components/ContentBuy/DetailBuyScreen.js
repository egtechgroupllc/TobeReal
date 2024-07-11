import {useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {scale, WIDTH} from '../../../../assets/constants';
import MainWrapper from '../../../../components/MainWrapper';
import {useLanguage} from '../../../../hooks/useLanguage';
import {getDetailEstate} from '../../../../Model/api/apiEstate';
import AnimateScrollWrapper from '../AnimateScrollWrapper';
import Introduction from '../DetailAccommodation/Detail/Introduction';
import ConfigDetail from './ConfigDetail';
import BookAccommodation from './DetailBuy/BookAccommodation';
import ContactInfo from './DetailBuy/ContactInfo';
import InfoDetail from './DetailBuy/InfoDetail';
import DetailAccommoMap from '../DetailAccommodation/Detail/DetailAccommoMap';
import SimilarApartmentsNearby from './DetailBuy/SimilarApartmentsNearby';
import VideoYoutubeBox from '../VideoYoutubeBox';
import Traceability from '../DetailAccommodation/Detail/Traceability';

export default function DetailBuyScreen() {
  const params = useRoute().params;
  console.log('====================================');
  console.log(params);
  console.log('====================================');
  const {t} = useLanguage();

  const listNavBar = useRef([
    {
      text: t('overview'),
    },
    {
      text: t('traceability'),
    },
    {
      text: t('description_content'),
    },
    {
      text: t('location'),
    },

    {
      text: t('others'),
    },
  ]).current;

  const {data, isLoading} = useQuery({
    queryKey: ['estate', 'detail', params?.id || params?.data?.table_id],
    queryFn: () => getDetailEstate(params?.id || params?.data?.table_id),
  });

  const listView = useMemo(() => {
    const dataDetail = data?.data;
    return [
      <InfoDetail data={dataDetail} />,
      <Traceability data={dataDetail} />,

      <Introduction data={dataDetail} />,
      <DetailAccommoMap data={dataDetail} />,
      <View>
        <ContactInfo data={dataDetail} />
        <ConfigDetail data={dataDetail} />
      </View>,
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
            price={data?.data?.price}
            isLoading={false}
            onPress={() => {}}
          />
        }
      />
      {data?.data?.video_link && <VideoYoutubeBox data={data?.data} />}
    </MainWrapper>
  );
}

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import MainWrapper from '../../components/MainWrapper';
import TopReview from './Review/TopReview';
import ContentReview from './Review/ContentReview';
import {scale} from '../../assets/constants';
import BottomReview from './Review/BottomReview';
import {useForm} from 'react-hook-form';
import {useLanguage} from '../../hooks/useLanguage';

export default function PostReviewScreen({route}) {
  const paramData = route.params;

  const {control, watch, setValue, handleSubmit} = useForm();
  return (
    <>
      <MainWrapper noImgColor styleContent={styles.content}>
        <TopReview data={paramData} />
        <ContentReview control={control} setValue={setValue} />
      </MainWrapper>
      <BottomReview handleSubmit={handleSubmit} roomID={paramData?.id} />
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: scale(10),
    backgroundColor: '#fff',
    alginItem: 'center',
    rowGap: scale(20),
  },
});

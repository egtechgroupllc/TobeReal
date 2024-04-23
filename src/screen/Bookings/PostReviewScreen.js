import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import MainWrapper from '../../components/MainWrapper';
import TopReview from './Review/TopReview';
import ContentReview from './Review/ContentReview';
import {scale} from '../../assets/constants';
import BottomReview from './Review/BottomReview';
import {useForm} from 'react-hook-form';

export default function PostReviewScreen() {
  const {control, watch, setValue, handleSubmit} = useForm();
  return (
    <>
      <MainWrapper noImgColor styleContent={styles.content}>
        <TopReview />
        <ContentReview control={control} setValue={setValue} />
      </MainWrapper>
      <BottomReview handleSubmit={handleSubmit} />
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

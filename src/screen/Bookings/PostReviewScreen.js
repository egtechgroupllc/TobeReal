import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';

import MainWrapper from '../../components/MainWrapper';
import TopReview from './Review/TopReview';
import ContentReview from './Review/ContentReview';
import {scale} from '../../assets/constants';
import BottomReview from './Review/BottomReview';
import {useForm} from 'react-hook-form';
import {useLanguage} from '../../hooks/useLanguage';
import {useQuery} from '@tanstack/react-query';
import {getLinkData} from '../../Model/api/common';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAuthentication} from '../../hooks/useAuthentication';

export default function PostReviewScreen() {
  const {control, watch, setValue, handleSubmit} = useForm();
  const paramData = useRoute().params;
  const {token} = useAuthentication();
  const {navigate, setOptions} = useNavigation();
  const {t} = useLanguage();

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('review'),
    });
  }, []);
  const {data, isLoading, error} = useQuery({
    queryKey: [
      'common',
      'linked-data',
      paramData?.accommodation?.id || paramData?.tour?.id,
    ],
    queryFn: () =>
      getLinkData({
        token: token,
        table_name: !paramData?.isTour ? 'accommodation' : 'tour',
        table_id: paramData?.accommodation?.id || paramData?.tour?.id,
      }),
  });
  return (
    // <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
    <>
      <MainWrapper noImgColor styleContent={styles.content}>
        <TopReview data={paramData} />
        <ContentReview control={control} setValue={setValue} />
      </MainWrapper>
      <BottomReview
        handleSubmit={handleSubmit}
        id={paramData?.id}
        txhashId={data?.data?.rows[0]?.id}
        isTour={paramData?.isTour}
      />
    </>
    // </TouchableWithoutFeedback>
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

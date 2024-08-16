import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {postReviewAccmo} from '../../../Model/api/apiAccom';
import {SHADOW, scale} from '../../../assets/constants';
import {showMess} from '../../../assets/constants/Helper';
import {CustomButton} from '../../../components';
import {useLanguage} from '../../../hooks/useLanguage';
import {postReviewTour} from '../../../Model/api/apiTour';

export default function BottomReview({handleSubmit, id, txhashId, isTour}) {
  const insets = useSafeAreaInsets();
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const {goBack} = useNavigation();
  const queryClient = useQueryClient();

  const postReviewAccmoMu = useMutation({
    mutationFn: postReviewAccmo,
  });
  const postReviewTourMu = useMutation({
    mutationFn: postReviewTour,
  });
  const getFormData = (object = {}) => {
    const formData = new FormData();

    Object.keys(object).reduce((item, key) => {
      if (key !== 'files') {
        item.append(key, object[key]);
      }

      return item;
    }, formData);

    object?.files?.map(image => {
      formData.append('files', image);
    });

    !isTour
      ? formData.append('room_booking_id', id)
      : formData.append('tour_ticket_booking_id', id);

    return formData;
  };
  const hanPostReview = value => {
    if (!value?.rating) {
      showMess('Please select a rating', 'error');
    }
    const formData = getFormData(value);
    const mutationConfig = {
      onSuccess: dataInside => {
        showMess(
          dataInside?.message ? t(dataInside?.message) : 'Success!',
          dataInside?.status ? 'success' : 'error',
        );
        if (dataInside?.status) {
          {
            txhashId
              ? navigate('PostVideoShortReviewScreen', {
                  txhashId: txhashId,
                  isTour: isTour,
                })
              : navigate('Explore');
          }

          // queryClient.invalidateQueries([
          //   'accommodation',
          //   'room',
          //   'my-booking',
          // ]);
          // goBack();
        }
      },
      onError: err => {
        console.log({err});
        showMess(t('an_error_occured'), 'error');
      },
    };
    if (isTour && value?.rating) {
      postReviewTourMu.mutate(formData, mutationConfig);
      return;
    }
    postReviewAccmoMu.mutate(formData, mutationConfig);
  };

  return (
    <View style={{...styles.wrapper, paddingBottom: insets.bottom}}>
      {/* <CheckBox text="Đánh giá ẩn danh" /> */}
      <CustomButton text={t('submit')} onPress={handleSubmit(hanPostReview)} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    rowGap: scale(10),
    padding: scale(10),
    paddingHorizontal: scale(20),
    backgroundColor: '#fff',
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: -1,
    },
  },
});

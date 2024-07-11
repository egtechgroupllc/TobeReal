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

export default function BottomReview({handleSubmit, roomID, txhashId}) {
  const insets = useSafeAreaInsets();
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  const {goBack} = useNavigation();
  const queryClient = useQueryClient();

  const postReviewAccmoMu = useMutation({
    mutationFn: postReviewAccmo,
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

    formData.append('room_booking_id', roomID);

    return formData;
  };

  const hanPostReview = value => {
    if (!value?.rating) {
      showMess('Please select a rating', 'error');
    }
    const formData = getFormData(value);
    value?.rating &&
      postReviewAccmoMu.mutate(formData, {
        onSuccess: dataInside => {
          showMess(
            dataInside?.message ? dataInside?.message : 'Success!',
            dataInside?.status ? 'success' : 'error',
          );
          if (dataInside?.status) {
            navigate('PostVideoShortReviewScreen', txhashId);

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
        },
      });
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

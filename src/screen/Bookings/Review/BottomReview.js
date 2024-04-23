import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SHADOW, scale} from '../../../assets/constants';
import CustomText from '../../../components/CustomText';
import CheckBox from '../../../components/CheckBox';
import {CustomButton} from '../../../components';
import {useMutation} from '@tanstack/react-query';
import {postReviewAccmo} from '../../../Model/api/apiAccom';
import {showMess} from '../../../assets/constants/Helper';

export default function BottomReview({handleSubmit}) {
  const insets = useSafeAreaInsets();

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

    return formData;
  };

  const hanPostReview = value => {
    if (!value?.rating) {
      showMess('Please select a rating', 'error');
    }
    const formData = getFormData(value);

    postReviewAccmoMu.mutate(formData, {
      onSuccess: dataInside => {
        console.log({dataInside});
      },
      onError: err => {
        console.log({err});
      },
    });
  };

  return (
    <View style={{...styles.wrapper, paddingBottom: insets.bottom}}>
      {/* <CheckBox text="Đánh giá ẩn danh" /> */}
      <CustomButton text="Gửi" onPress={handleSubmit(hanPostReview)} />
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

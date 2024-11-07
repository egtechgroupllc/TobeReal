import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scale} from '~/utils/scale';
import StarRating from '~/screens/Products/ListProduct/components/StarRating';
import {useForm} from 'react-hook-form';
import {useLanguage} from '~/hooks/useLanguage';
import Input from '~/components/Input';
import {requireField} from '~/utils/validate';
import ImageCertificate from '~/screens/Profile/RegisterDoctor/components/ImageCertificate';
import ImageReview from './components/ImageReview';
import {showMess} from '~/assets/constants/Helper';
import {useMutation} from '@tanstack/react-query';
import {postCreateReview} from '~/api/review';

export default function CreateReviewScreen() {
  const {control, handleSubmit, setValue, watch, errors} = useForm();
  const params = useRoute().params;
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const postCreateReviewMu = useMutation({
    mutationFn: postCreateReview,
  });
  const handlePostReview = value => {
    const files = value?.files;
    delete value?.files;
    delete value?.file;
    if (!value?.rating) {
      showMess(t('please_select_a_rating'), 'error');
    }
    const mutationConfig = {
      onSuccess: dataInside => {
        showMess(
          dataInside?.message ? t(dataInside?.message) : 'Success!',
          dataInside?.error ? 'error' : 'success',
        );
        if (!dataInside?.error) {
          navigate('BottomTab');
        }
      },
      onError: err => {
        console.log({err});
        showMess(t('an_error_occured'), 'error');
      },
    };

    postCreateReviewMu.mutate(
      {
        ...value,
        files,
        doctor_id: params?.doctor_id,
        appointment_id: params?.id,
      },
      mutationConfig,
    );
  };
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      headerTitle={t('create_review')}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          rowGap: scale(10),
          paddingHorizontal: scale(15),
          paddingBottom: scale(100),
        }}>
        <CImage
          source={images.logoSplash}
          resizeMode="contain"
          style={{width: scale(150), height: scale(150)}}
        />
        <CText
          style={{
            color: COLORS.White,
            fontSize: SIZES.medium,
            width: scale(300),
          }}
          textAlign="center">
          {t('please_rate_your_experience_here_so_we_can_improve_our_service')}
        </CText>
        <StarRating
          size={scale(20)}
          isSetRating
          onChange={value => {
            setValue('rating', value);
          }}
          style={{
            columnGap: scale(16),
            marginBottom: scale(20),
          }}
        />
        <Input
          label={t('content')}
          control={control}
          name="content"
          placeholder={t('enter_content')}
          rules={[requireField(t('this_field_required'))]}
          style={styles.textInput}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          sizeInput="medium"
          styleTextLabel={{...styles.styleLabel, textType: 'bold'}}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
          multiline
        />
        <ImageReview
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          arrImg={params?.images}
        />
        <Button
          title={t('confirm')}
          onPress={handleSubmit(handlePostReview)}
          linearGradientProps={{colors: COLORS.linearButton}}
          buttonType="medium"
          style={styles.button}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: COLORS.grey,
    borderWidth: 0,
  },
  styleLabel: {
    fontSize: SIZES.xMedium,
  },
  button: {
    width: '100%',
    marginTop: scale(30),
  },
});

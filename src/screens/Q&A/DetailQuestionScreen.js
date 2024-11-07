import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import HeaderDetail from './components/HeaderDetailQuestion';
import HeaderDetailQuestion from './components/HeaderDetailQuestion';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '~/hooks/useLanguage';
import ImageDetailQuestion from './components/ImageDetailQuestion';
import Input from '~/components/Input';
import {useForm} from 'react-hook-form';
import {requireField} from '~/utils/validate';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {showMess} from '~/assets/constants/Helper';
import {
  getListQuestion,
  getListQuestionDoctor,
  postCreateAnswerQuestion,
} from '~/api/question';
import EmptyData from '~/components/EmptyData';

export default function DetailQuestionScreen() {
  const params = useRoute().params;
  const queryClient = useQueryClient();
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const {control, handleSubmit} = useForm();
  const answerQuestionMutation = useMutation({
    mutationFn: postCreateAnswerQuestion,
  });

  const handleAnswerQuestion = value => {
    answerQuestionMutation.mutate(
      {...value, question_id: params?.id},
      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            dataInside?.error ? 'error' : 'success',
          );
          if (!dataInside?.error) {
            queryClient.invalidateQueries([...getListQuestionDoctor.queryKey]);
            queryClient.invalidateQueries([...getListQuestion.queryKey]);
            navigate('BottomTab');
          }
        },
        onError: err => {
          if (err.response) {
            showMess(err?.response?.data?.message, 'error');
          }
        },
      },
    );
  };
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      optionsHeader={{
        headerComponent: () => {
          return <HeaderDetailQuestion data={params} />;
        },
      }}>
      <View style={styles.contain}>
        {params?.home ? (
          <View style={{rowGap: scale(10)}}>
            <CImage
              source={
                params ? {uri: params?.specialty?.image} : images.iconProfile
              }
              style={{
                width: scale(100),
                height: scale(100),
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
            <CText
              style={{
                flex: 1,
                color: COLORS.blue,
                textAlign: 'center',
                fontSize: SIZES.xMedium,
              }}
              numberOfLines={1}>
              {t(params?.specialty?.name)}
            </CText>
          </View>
        ) : (
          <View>
            {params?.images?.length > 0 ||
            params?.info_question?.images?.length > 0 ? (
              <ImageDetailQuestion
                arrImg={params?.images || params?.info_question?.images}
                styleWrapper={{height: scale(200)}}
              />
            ) : (
              <View style={{rowGap: scale(10)}}>
                <CImage
                  source={
                    params
                      ? {
                          uri:
                            params?.specialty?.image ||
                            params?.info_question?.specialty?.image,
                        }
                      : images.iconProfile
                  }
                  style={{
                    width: scale(100),
                    height: scale(100),
                    alignSelf: 'center',
                  }}
                  resizeMode="contain"
                />
                <CText
                  style={{
                    flex: 1,
                    color: COLORS.blue,
                    textAlign: 'center',
                    fontSize: SIZES.xMedium,
                  }}
                  numberOfLines={1}>
                  {t(params?.specialty?.name) ||
                    t(params?.info_question?.specialty?.name)}
                </CText>
              </View>
            )}
          </View>
        )}
        <CText style={{color: COLORS.White, fontSize: SIZES.large}}>
          {params?.title}
        </CText>
        <CText
          style={{color: COLORS.White, fontSize: SIZES.medium}}
          textType="bold">
          {t('question')}
        </CText>

        <CText style={{color: COLORS.White, fontSize: SIZES.xMedium}}>
          {!params?.doctor ? params?.content : params?.info_question?.content}
        </CText>
        {params?.status === 'APPROVED' || params?.doctor ? (
          <View style={{rowGap: scale(10)}}>
            <View
              style={{
                width: '100%',
                height: scale(1),
                backgroundColor: COLORS.White,
              }}
            />
            <CText
              style={{color: COLORS.White, fontSize: SIZES.medium}}
              textType="bold">
              {t('answer')}
            </CText>
            <TouchableOpacity
              onPress={() =>
                navigate('DetailScheduleScreen', {
                  id:
                    params?.info_answer_question?.doctor_id ||
                    params?.doctor_id,
                })
              }
              style={{
                flexDirection: 'row',
                columnGap: scale(10),
                alignItems: 'center',
              }}>
              <CImage
                source={{
                  uri:
                    params?.info_answer_question?.info_user?.image ||
                    params?.info_user?.image,
                }}
                style={{
                  aspectRatio: 1,
                  width: scale(35),
                  borderRadius: scale(100),
                }}
                resizeMode="contain"
              />
              <CText
                style={{color: COLORS.cyan, fontSize: SIZES.small}}
                textType="bold">
                {t('answer_by_doctor')}{' '}
                {params?.info_answer_question?.info_user?.fullname ||
                  params?.info_user?.fullname}
              </CText>
            </TouchableOpacity>
            <CText style={{color: COLORS.White, fontSize: SIZES.xMedium}}>
              {params?.info_answer_question?.content || params?.content}
            </CText>
          </View>
        ) : (
          <View style={{rowGap: scale(10)}}>
            <View
              style={{
                width: '100%',
                height: scale(1),
                backgroundColor: COLORS.White,
              }}
            />
            <CText
              style={{color: COLORS.White, fontSize: SIZES.medium}}
              textType="bold">
              {t('answer')}
            </CText>
            <EmptyData desc={t('no_doctor_answer_yet')} />
          </View>
        )}
        {params?.pending && (
          <View style={{rowGap: scale(10)}}>
            <View
              style={{
                width: '100%',
                height: scale(1),
                backgroundColor: COLORS.White,
              }}
            />
            <View style={{rowGap: scale(20)}}>
              <Input
                label={t('enter_answer')}
                control={control}
                name="content"
                placeholder={t('enter_content_answer')}
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
              <Button
                title={t('submit')}
                linearGradientProps={{colors: COLORS.linearButton}}
                onPress={handleSubmit(handleAnswerQuestion)}
              />
            </View>
          </View>
        )}
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
  contain: {
    flex: 1,
    rowGap: scale(10),
    paddingHorizontal: scale(20),
    paddingBottom: scale(100),
  },
});

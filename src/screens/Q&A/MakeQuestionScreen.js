import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Button, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import Input from '~/components/Input';
import ChoosePhoto from '~/components/ChoosePhoto/ChoosePhoto';
import {useLanguage} from '~/hooks/useLanguage';
import {useForm} from 'react-hook-form';
import Collapsible from 'react-native-collapsible';
import QuestionImage from './components/QuestionImage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {showMess} from '~/assets/constants/Helper';
import {getListQuestion, postCreateQuestion} from '~/api/question';
import {requireField} from '~/utils/validate';
import {useCountry} from '~/hooks/useCountry';

export default function MakeQuestionScreen() {
  const {t} = useLanguage();
  const [isMoreText, setIsMoreText] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const {navigate, goBack} = useNavigation();
  const {country} = useCountry();
  const [dataSpecialty, setDataSpecialty] = useState();
  const queryClient = useQueryClient();
  const params = useRoute().params;
  const onTextLayout = useCallback(e => {
    if (e.nativeEvent.lines.length > 3 && !isMoreText) {
      setShowMoreButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: {errors},
  } = useForm();

  const createQuestionMutation = useMutation({
    mutationFn: postCreateQuestion,
  });

  const handleCreateQuestion = value => {
    const images = value?.images;
    delete value?.image;
    delete value?.images;

    createQuestionMutation.mutate(
      {...value, specialty_id: dataSpecialty, images, country_id: country?.id},
      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            dataInside?.error ? 'error' : 'success',
          );
          if (!dataInside?.error) {
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
      headerTitle={t('make_a_question')}>
      <View style={styles.contain}>
        <CText
          style={{
            fontSize: SIZES.medium,
            color: COLORS.White,
          }}
          textType="semiBold">
          {t('instructions_for_asking_questions')}
        </CText>
        <View style={styles.viewTutorial}>
          <TouchableOpacity
            disabled={!showMoreButton}
            activeOpacity={0.7}
            onPress={() => {
              setIsMoreText(!isMoreText);
            }}>
            <Collapsible
              collapsed={!isMoreText && showMoreButton}
              collapsedHeight={scale(80)}>
              <CText
                onTextLayout={onTextLayout}
                textType="regular"
                numberOfLines={isMoreText ? 0 : 5}
                style={{
                  fontSize: SIZES.small,
                  color: COLORS.White,
                  lineHeight: scale(20),
                }}>
                <CText
                  style={{fontSize: SIZES.xMedium, color: COLORS.White}}
                  textType="bold">
                  {t('choose_specialty')}:
                </CText>
                {'\n'}- {t('to_get_started')} {'\n'}
                <CText
                  style={{fontSize: SIZES.xMedium, color: COLORS.White}}
                  textType="bold">
                  {t('enter_content_question')}:
                </CText>
                {'\n'}- {t('describe_your_health_issue')} {'\n'}
                <CText
                  style={{fontSize: SIZES.xMedium, color: COLORS.White}}
                  textType="bold">
                  {t('add_image')}:
                </CText>
                {'\n'}- {t('images_related_to_health_condition')}
              </CText>
            </Collapsible>
            {!isMoreText && showMoreButton ? (
              <CText style={{color: COLORS.cyan}}>{t('read_more')}</CText>
            ) : (
              <CText style={{color: COLORS.cyan}}>{t('minimize')}</CText>
            )}
          </TouchableOpacity>
        </View>
        <CText
          style={{
            fontSize: SIZES.medium,
            color: COLORS.White,
          }}
          textType="semiBold">
          {t('your_question')}
        </CText>
        <Button
          title={
            dataSpecialty
              ? `${t('selected')} 1 ${t('specialty')}`
              : t('choose_specialty')
          }
          backgroundColor={dataSpecialty ? COLORS.bluecyan : COLORS.input}
          sizeButton="normal"
          onPress={() => {
            navigate('NoBottomTab', {
              screen: 'ListSpecialtyScreen',
              params: {
                onGoBack: value => {
                  setDataSpecialty(value);
                },
                dataSpecialty,
                isSelectOne: true,
              },
            });
          }}
        />
        <Input
          control={control}
          name="content"
          placeholder={t('enter_your_question')}
          rules={[requireField(t('this_field_required'))]}
          style={styles.textInput}
          styleContent={{
            ...styles.viewTutorial,
            height: scale(200),
            borderRadius: scale(5),
          }}
          sizeInput="medium"
          styleTextLabel={{...styles.styleLabel, textType: 'bold'}}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
          multiline
        />

        <View
          style={{
            alignSelf: 'center',
            rowGap: scale(20),
            paddingBottom: scale(80),
          }}>
          {!params?.update && (
            <QuestionImage
              control={control}
              setValue={setValue}
              watch={watch}
              errors={errors}
              arrImg={params?.images}
            />
          )}
          <Button
            onPress={handleSubmit(handleCreateQuestion)}
            title={t('send')}
            linearGradientProps={{
              colors: COLORS.linearButton,
            }}
          />
        </View>
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    rowGap: scale(15),
    paddingHorizontal: scale(20),
  },
  viewTutorial: {
    alignSelf: 'center',
    backgroundColor: COLORS.input,
    width: '100%',
    minHeight: scale(120),
    borderRadius: scale(16),
    padding: scale(15),
    borderWidth: scale(1),
    borderColor: COLORS.input,
  },
});

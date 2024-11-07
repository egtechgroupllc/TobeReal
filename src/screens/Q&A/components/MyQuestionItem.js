import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale} from '~/utils/scale';
import {COLORS, images, SIZES} from '~/assets/constants';
import {CImage, CText} from '~/components';
import {useNavigation} from '@react-navigation/native';
import QuestionItemLoading from './QuestionItemLoading';
import {useLanguage} from '~/hooks/useLanguage';

export default function MyQuestionItem({data, isLoading, pending, doctor}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();

  return (
    <View>
      {!isLoading ? (
        <TouchableOpacity
          onPress={() =>
            navigate('NoBottomTab', {
              screen: 'DetailQuestionScreen',
              params: {...data, doctor: doctor},
            })
          }
          style={{
            backgroundColor: COLORS.input,
            height: scale(150),
            marginHorizontal: scale(20),
            borderRadius: scale(10),
            justifyContent: 'center',
            paddingHorizontal: scale(10),
          }}>
          {/* {pending && (
            <View
              style={{
                backgroundColor: COLORS.OrangeBold,
                padding: scale(5),
                borderRadius: scale(5),
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 99,
              }}>
              <CText style={{color: COLORS.White}}>{data?.status}</CText>
            </View>
          )} */}
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
              paddingTop: scale(10),
            }}>
            <CImage
              source={
                data
                  ? {
                      uri:
                        data?.specialty?.image ||
                        data?.info_question?.specialty?.image,
                    }
                  : images.iconProfile
              }
              style={{width: scale(100), height: scale(80)}}
              resizeMode="contain"
            />
            {!doctor ? (
              <View style={{flex: 1, height: scale(110)}}>
                {!pending && (
                  <CText
                    numberOfLines={2}
                    style={{color: COLORS.White, fontSize: SIZES.medium}}
                    textType="semiBold">
                    {data?.title}
                  </CText>
                )}
                <CText style={{color: COLORS.White}} numberOfLines={3}>
                  {data?.content}
                </CText>
                {!pending && (
                  <CText style={{color: COLORS.cyan}} numberOfLines={2}>
                    {t('answer_by_doctor')}{' '}
                    {data?.info_answer_question?.info_user?.fullname}
                  </CText>
                )}
              </View>
            ) : (
              <View style={{flex: 1, height: scale(110)}}>
                {!pending && (
                  <CText
                    numberOfLines={2}
                    style={{color: COLORS.White, fontSize: SIZES.medium}}
                    textType="semiBold">
                    {data?.title || data?.info_question?.title}
                  </CText>
                )}
                <CText style={{color: COLORS.White}} numberOfLines={3}>
                  {data?.info_question?.content}
                </CText>
                <CText style={{color: COLORS.cyan}} numberOfLines={2}>
                  {t('answer_by_doctor')}{' '}
                  {data?.info_answer_question?.info_user?.fullname ||
                    data?.info_user?.fullname}
                </CText>
              </View>
            )}
          </View>
          <CText
            style={{flex: 1, color: COLORS.blue, textAlign: 'right'}}
            numberOfLines={1}>
            {t(data?.specialty?.name || data?.info_question?.specialty?.name)}
          </CText>
        </TouchableOpacity>
      ) : (
        <QuestionItemLoading />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

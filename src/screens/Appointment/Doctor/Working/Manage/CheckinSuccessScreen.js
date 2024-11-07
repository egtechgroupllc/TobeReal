import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';
import {IconCalendar, IconClock} from '~/assets/icon/Icon';
import {colors} from '@styles';
import {useNavigation, useRoute} from '@react-navigation/native';
export default function CheckinSuccessScreen() {
  const {t} = useLanguage();
  const {goBack} = useNavigation();
  const params = useRoute().params;
  console.log(params, 123123);
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      headerTitle={t('checkin_success')}>
      <View style={{flex: 1, rowGap: scale(20), paddingHorizontal: scale(20)}}>
        <View style={{alignItems: 'center'}}>
          <CImage
            source={images.logoSuccess}
            resizeMode="contain"
            style={{width: scale(120), height: scale(120)}}
          />
        </View>
        <CText style={{color: COLORS.White, fontSize: SIZES.medium}}>
          {t('patient_information')}
        </CText>
        <View
          style={{
            backgroundColor: COLORS.input,
            padding: scale(20),
            borderRadius: scale(10),
            rowGap: scale(10),
            paddingHorizontal: scale(10),
          }}>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
            }}>
            <CText
              style={{color: COLORS.White, fontSize: SIZES.small}}
              textType="bold">
              {t('patient_name')}:
            </CText>
            <CText
              style={{color: COLORS.White, fontSize: SIZES.small, flex: 1}}
              numberOfLines={1}>
              {params?.name}
            </CText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
            }}>
            <CText
              style={{color: COLORS.White, fontSize: SIZES.small}}
              textType="bold">
              {t('gender')}:
            </CText>
            <CText
              style={{color: COLORS.White, fontSize: SIZES.small, flex: 1}}
              numberOfLines={1}>
              {params?.gender}
            </CText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
            }}>
            <CText
              style={{color: COLORS.White, fontSize: SIZES.small}}
              textType="bold">
              {t('phone')}:
            </CText>
            <CText
              style={{color: COLORS.White, fontSize: SIZES.small, flex: 1}}
              numberOfLines={1}>
              {params?.phone}
            </CText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
            }}>
            <CText
              style={{color: COLORS.White, fontSize: SIZES.small}}
              textType="bold">
              {t('type_examination')}:
            </CText>
            <CText
              style={{color: COLORS.blue, fontSize: SIZES.small, flex: 1}}
              numberOfLines={1}>
              [{params?.workingDoctor?.[0]?.type}]
            </CText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
            }}>
            <CText
              style={{color: COLORS.White, fontSize: SIZES.small}}
              textType="bold">
              {t('date_time_examination')}:
            </CText>
            <View
              style={{
                flexDirection: 'row',
                columnGap: scale(5),
                alignItems: 'center',
              }}>
              <IconCalendar
                fill={COLORS.White}
                width={scale(12)}
                height={scale(12)}
              />
              <CText style={{color: COLORS.White, fontSize: SIZES.small}}>
                {params?.workingDoctor?.[0]?.date}
              </CText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                columnGap: scale(5),
                alignItems: 'center',
              }}>
              <IconClock
                fill={COLORS.White}
                width={scale(12)}
                height={scale(12)}
              />
              <CText style={{color: COLORS.White, fontSize: SIZES.small}}>
                {params?.workingDoctor?.[0]?.time_start} -{' '}
                {params?.workingDoctor?.[0]?.time_end}
              </CText>
            </View>
          </View>
        </View>
        <Button
          title={t('confirm')}
          linearGradientProps={{colors: COLORS.linearButton}}
          style={{marginTop: scale(50)}}
          onPress={() => goBack()}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {useLanguage} from '~/hooks/useLanguage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scale} from '~/utils/scale';
import {IconCalendar, IconClock, IconLocation} from '~/assets/icon/Icon';
import {IconBuildingHospital, IconHospital} from '@tabler/icons-react-native';
import QRCode from 'react-native-qrcode-svg';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {
  getCreateQRCode,
  getHistoryBookingUser,
  postCreateQRCode,
} from '~/api/appointment';
export default function DetailHistoryAppointScreen() {
  const {t} = useLanguage();
  const params = useRoute().params;
  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['order', 'create-qr', params?.id], // Pass `id` as part of the key
    queryFn: () => getCreateQRCode(params?.id),
  });

  const {goBack} = useNavigation();
  const queryClient = useQueryClient();
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      headerTitle={t('detail_appointment')}>
      <View style={{flex: 1, rowGap: scale(10), paddingHorizontal: scale(15)}}>
        <View
          style={{
            flexDirection: 'row',
            columnGap: scale(15),
            alignItems: 'center',
          }}>
          <CImage.Avatar
            source={
              params?.user?.image
                ? {uri: params?.user?.image}
                : images.iconProfile
            }
            style={{
              width: scale(100),
              height: scale(100),
              borderRadius: scale(99),
            }}
          />
          <View style={{rowGap: scale(5)}}>
            <CText
              style={{color: COLORS.White, fontSize: SIZES.medium}}
              textType="bold">
              {params?.user?.fullname}
            </CText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: scale(5),
              }}>
              <IconBuildingHospital
                width={scale(15)}
                height={scale(15)}
                color={COLORS.White}
              />
              <CText
                style={{color: COLORS.White, fontSize: SIZES.small}}
                numberOfLines={2}>
                {params?.medical_facility_name}
              </CText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: scale(5),
              }}>
              <IconLocation
                width={scale(15)}
                height={scale(15)}
                fill={COLORS.White}
              />
              <CText
                style={{color: COLORS.White, fontSize: SIZES.small}}
                numberOfLines={2}>
                {params?.user?.address}
              </CText>
            </View>
          </View>
        </View>

        <View style={{rowGap: scale(10)}}>
          <CText
            style={{color: COLORS.White, fontSize: SIZES.medium}}
            textType="bold">
            {t('appointment_information')}
          </CText>
          <View
            style={{
              backgroundColor: COLORS.input,
              rowGap: scale(15),
              padding: scale(10),
              borderRadius: scale(10),
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
                  flex: 1,
                }}>
                <IconClock
                  fill={COLORS.White}
                  width={scale(12)}
                  height={scale(12)}
                />
                <CText
                  style={{color: COLORS.White, fontSize: SIZES.small}}
                  numberOfLines={1}>
                  {params?.workingDoctor?.[0]?.time_start} -{' '}
                  {params?.workingDoctor?.[0]?.time_end}
                </CText>
              </View>
            </View>
          </View>
          <CText
            style={{color: COLORS.White, fontSize: SIZES.medium}}
            textType="bold">
            {t('qrcode_checkin_examination')}
          </CText>
          <View style={{flex: 1, alignItems: 'center', rowGap: scale(10)}}>
            <View
              style={{
                width: scale(230),
                height: scale(230),
                backgroundColor: COLORS.White,
                borderRadius: scale(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {data?.data ? (
                <QRCode
                  size={scale(200)}
                  value={JSON.stringify(data?.data)}
                  color="#000"
                />
              ) : (
                <ActivityIndicator color={COLORS.primary} size="large" />
              )}
            </View>
            <CText
              style={{
                width: scale(200),
                textAlign: 'center',
                color: COLORS.White,
                fontSize: SIZES.me,
              }}>
              {t('please_give_qrcode_to')}
            </CText>
          </View>
        </View>
        <Button
          title={t('confirm')}
          linearGradientProps={{colors: COLORS.linearButton}}
          style={{marginTop: scale(20)}}
          onPress={() => {
            goBack();
            queryClient.invalidateQueries({
              queryKey: [...getHistoryBookingUser.queryKey],
            });
          }}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

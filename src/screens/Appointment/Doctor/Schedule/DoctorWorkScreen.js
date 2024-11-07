import {useNavigation} from '@react-navigation/native';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import React, {useMemo, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {FlatList, StyleSheet, View} from 'react-native';
import {getHistoryBookingDoctor, postCancelBooking} from '~/api/appointment';
import {animations, COLORS, images, SIZES} from '~/assets/constants';
import {showMess} from '~/assets/constants/Helper';
import {Button, CText, MainWrapper} from '~/components';
import AppointmentHeader from '~/components/AppointmentHeader/AppointmentHeader';
import BottomSheet from '~/components/BottomSheet';
import EmptyData from '~/components/EmptyData';
import Input from '~/components/Input';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';
import {requireField} from '~/utils/validate';
import ScheduleItem from './components/ScheduleItem';
import {useAuthentication} from '~/hooks/useAuthentication';
import LottieView from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native';

export default function DoctorWorkScreen() {
  const {control, watch, handleSubmit, reset, setValue, errors} = useForm();
  const {navigate} = useNavigation();
  const bottomSheetRef = useRef();
  const {t} = useLanguage();
  const queryClient = useQueryClient();
  const [id, setId] = useState(null);
  const {token} = useAuthentication();
  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    isError,
  } = useInfiniteQuery({
    queryKey: [...getHistoryBookingDoctor.queryKey, {limit: 10}],
    queryFn: ({pageParam}) =>
      getHistoryBookingDoctor({
        pageParam,
        limit: 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!(lastPage?.data?.booking_orders?.length <= 0))
        return allPages?.length + 1;

      return undefined;
    },
    enabled: !!token,
  });

  const dataArr = useMemo(
    () =>
      data?.pages
        .map(page => {
          if (!page) return undefined;
          return page?.data?.booking_orders;
        })
        .flat(),
    [data?.pages],
  );
  const cancelBookingMutation = useMutation({
    mutationFn: postCancelBooking,
  });

  const handleCreateBooking = value => {
    cancelBookingMutation.mutate(
      {id: id, data: value},
      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            dataInside?.error ? 'error' : 'success',
          );
          if (!dataInside?.error) {
            queryClient.invalidateQueries({
              queryKey: getHistoryBookingDoctor.queryKey,
            });
            bottomSheetRef.current.close();
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
  const ViewType = ({title}) => {
    return (
      <View
        style={{
          height: scale(30),
          width: scale(110),
          borderRadius: scale(5),
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: scale(1),
          borderColor: COLORS.input,
        }}>
        <CText style={{color: COLORS.White}}>{title}</CText>
      </View>
    );
  };
  return (
    <MainWrapper
      scrollEnabled={false}
      sourceImage={images.backgroundHome}
      headerTitle={t('doctor_work')}
      optionsHeader={{
        headerTitleStyle: {
          textAlign: 'left',
        },
      }}>
      <View style={styles.contain}>
        <AppointmentHeader setValue={setValue} watch={watch} filter doctor />
        <View style={{rowGap: scale(15), paddingHorizontal: scale(15)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <ViewType title="10/09 - 11/09" />
            <ViewType title="OFFLINE" />
            <ViewType title="AVAILABLE" />
          </View>
          <FlatList
            data={dataArr || (isLoading && [1, 2, 3, 5])}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => `key-list-doctor-appointment${index}`}
            ListEmptyComponent={<EmptyData />}
            contentContainerStyle={{
              rowGap: scale(20),
              paddingBottom: scale(200),
            }}
            ListFooterComponent={() =>
              isFetchingNextPage && (
                <View
                  style={{
                    height: scale(40),
                  }}>
                  <LottieView
                    autoPlay={true}
                    source={animations.loading}
                    style={{
                      height: '100%',
                    }}
                  />
                </View>
              )
            }
            onEndReached={hasNextPage && fetchNextPage}
            onEndReachedThreshold={0.1}
            renderItem={({item, index}) => {
              return (
                <ScheduleItem
                  data={item}
                  isLoading={isLoading}
                  onPress={() => {
                    setId(item?.id);
                    bottomSheetRef.current.open();
                  }}
                />
              );
            }}
          />
        </View>
      </View>
      {isLoading && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            paddingTop: scale(200),
            alignSelf: 'center',
          }}>
          <AnimatedLottieView
            source={animations.medicalLoading}
            autoPlay
            loop
            style={{
              width: scale(250),
              height: scale(250),
            }}
          />
        </View>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['50%', '80%']}
        titleIndicator={t('cancel_schedule')}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(30),
        }}>
        <Input
          label={t('reason_cancel')}
          name="note"
          control={control}
          rules={[requireField(t('this_field_required'))]}
          styleTextLabel={{
            fontSize: SIZES.medium,
            color: COLORS.White,
            textType: 'semiBold',
          }}
          multiline
          styleText={{color: COLORS.White}}
        />
        <Button
          title={t('confirm')}
          linearGradientProps={{colors: COLORS.linearButton}}
          onPress={handleSubmit(handleCreateBooking)}
        />
      </BottomSheet>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingBottom: scale(50),
  },
});

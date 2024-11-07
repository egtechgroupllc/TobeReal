import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import EmptyData from '~/components/EmptyData';
import {scale} from '~/utils/scale';
import {animations, COLORS, images, SIZES} from '~/assets/constants';
import {Button, CImage, CText} from '~/components';
import {IconCalendar, IconClock, IconLocation} from '~/assets/icon/Icon';
import HistoryScheduleItem from './HistoryScheduleItem';
import BottomSheet from '~/components/BottomSheet';
import Input from '~/components/Input';
import {useLanguage} from '~/hooks/useLanguage';
import {useForm} from 'react-hook-form';
import {getHistoryBookingUser, postCancelBooking} from '~/api/appointment';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {showMess} from '~/assets/constants/Helper';
import {requireField} from '~/utils/validate';
import {useAuthentication} from '~/hooks/useAuthentication';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
export default function HistorySchedule() {
  const bottomSheetRef = useRef();
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const [id, setId] = useState(null);
  const queryClient = useQueryClient();
  const {token} = useAuthentication();
  const {control, setValue, handleSubmit} = useForm();
  const cancelBookingMutation = useMutation({
    mutationFn: postCancelBooking,
  });
  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    isError,
  } = useInfiniteQuery({
    queryKey: [...getHistoryBookingUser.queryKey, {limit: 10}],
    queryFn: ({pageParam}) =>
      getHistoryBookingUser({
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
              queryKey: getHistoryBookingUser.queryKey,
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
  return (
    <View style={{marginTop: scale(10), paddingHorizontal: scale(15)}}>
      <FlatList
        data={dataArr || (isLoading && [1, 2, 3, 5])}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => `key-list-doctor-appointment${index}`}
        ListEmptyComponent={<EmptyData />}
        contentContainerStyle={{
          rowGap: scale(20),
          paddingBottom: scale(100),
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
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          hasNextPage && fetchNextPage();
        }}
        renderItem={({item, index}) => {
          return (
            <HistoryScheduleItem
              onPressDetail={() => navigate('DetailHistoryAppointScreen', item)}
              onPress={() => {
                bottomSheetRef.current.open();
                setId(item?.id);
              }}
              onPressReview={() => navigate('CreateReviewScreen', item)}
              data={item}
              isLoading={isLoading}
            />
          );
        }}
      />
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
    </View>
  );
}

const styles = StyleSheet.create({});

import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {animations, COLORS, images, SIZES} from '~/assets/constants';
import AppointmentHeader from '~/components/AppointmentHeader/AppointmentHeader';
import {useForm} from 'react-hook-form';
import EmptyData from '~/components/EmptyData';
import {scale} from '~/utils/scale';
import {useNavigation} from '@react-navigation/native';
import {IconLocation} from '~/assets/icon/Icon';
import AppointItem from './components/AppointItem';
import {getListDoctor} from '~/api/doctor';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {useAuthentication} from '~/hooks/useAuthentication';
import {debounce} from 'lodash';
import LottieView from 'lottie-react-native';
import {useLanguage} from '~/hooks/useLanguage';
import AnimatedLottieView from 'lottie-react-native';
export default function HomeAppointUserScreen() {
  const {t} = useLanguage();
  const {control, watch, handleSubmit, reset, setValue, errors} = useForm();
  const {navigate} = useNavigation();

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
    queryKey: [...getListDoctor.queryKey, {keyword: '', limit: 10}],
    queryFn: ({pageParam}) =>
      getListDoctor({
        pageParam,
        limit: 10,
        keyword: '',
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!(lastPage?.data?.length <= 0)) return allPages?.length + 1;

      return undefined;
    },
    enabled: !!token,
  });

  const dataArr = useMemo(
    () =>
      data?.pages
        .map(page => {
          if (!page) return undefined;
          return page?.data;
        })
        .flat(),
    [data?.pages],
  );
  return (
    <MainWrapper
      scrollEnabled={false}
      sourceImage={images.backgroundHome}
      headerTitle={t('appointment')}>
      <View
        style={{
          flex: 1,
          rowGap: scale(15),
        }}>
        <AppointmentHeader
          setValue={setValue}
          watch={watch}
          filter
          styleWrapper={{paddingBottom: 0}}
        />
        <FlatList
          data={dataArr || (isLoading && [1, 2, 3, 5])}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => `key-list-doctor-appointment${index}`}
          ListEmptyComponent={<EmptyData />}
          contentContainerStyle={{
            rowGap: scale(20),
            paddingBottom: scale(100),
            paddingHorizontal: scale(15),
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
            return <AppointItem data={item} isLoading={isLoading} />;
          }}
        />
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
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

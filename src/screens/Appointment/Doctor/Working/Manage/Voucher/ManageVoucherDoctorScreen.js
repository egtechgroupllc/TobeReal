import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {animations, COLORS, images, SIZES} from '~/assets/constants';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';
import EmptyData from '~/components/EmptyData';
import {formatPrice} from '~/utils/format';
import {IconClock, IconEditProfile, IconTrash} from '~/assets/icon/Icon';
import {useNavigation} from '@react-navigation/native';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {getListVoucherDoctor, postDeleteVoucherDoctor} from '~/api/voucher';
import {useCountry} from '~/hooks/useCountry';
import {IconEdit} from '@tabler/icons-react-native';
import VoucherItem from './components/VoucherItem';
import {showMess} from '~/assets/constants/Helper';
import LottieView from 'lottie-react-native';
const fake = [
  {
    title: 'Voucher 1',
    quantity: 2,
    price: 0.111,
    date: '10/08/2024',
  },
  {
    title: 'Voucher 2',
    quantity: 2,
    price: 0.111,
    date: '10/08/2024',
  },
];
export default function ManageVoucherDoctorScreen() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const {currency} = useCountry();

  const queryClient = useQueryClient();
  const dataPro = queryClient.getQueryData(['user', 'get-list-profile'])?.data;

  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    isError,
  } = useInfiniteQuery({
    queryKey: [
      ...getListVoucherDoctor.queryKey,
      {keyword: dataPro?.id, limit: 10},
    ],
    queryFn: ({pageParam}) =>
      getListVoucherDoctor({
        pageParam,
        limit: 10,
        keyword: dataPro?.id,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!(lastPage?.data?.rows?.length <= 0)) return allPages?.length + 1;
      return undefined;
    },
  });
  const dataArr = useMemo(
    () =>
      data?.pages
        .map(page => {
          if (!page) return undefined;
          return page?.data?.rows;
        })
        .flat(),
    [data?.pages],
  );
  const deleteVoucherDoctorMutation = useMutation({
    mutationFn: postDeleteVoucherDoctor,
  });

  const handleDeletePrice = value => {
    deleteVoucherDoctorMutation.mutate(
      {id: value},
      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            dataInside?.error ? 'error' : 'success',
          );
          if (!dataInside?.error) {
            queryClient.invalidateQueries([...getListVoucherDoctor.queryKey]);
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
  const handleAlert = item => {
    Alert.alert(
      t('are_you_sure_want_to_delete_voucher'),
      t('voucher_cant_be_restored'),
      [
        {
          text: t('cancel'),
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {text: t('ok'), onPress: () => handleDeletePrice(item?.id)},
      ],
    );
  };

  return (
    <MainWrapper
      scrollEnabled={false}
      styleContent={{paddingTop: scale(15)}}
      sourceImage={images.backgroundHome}
      headerTitle={t('voucher_manage')}>
      <View style={{flex: 1, paddingHorizontal: scale(15), rowGap: scale(20)}}>
        <View style={{width: '50%'}}>
          <Button
            title={t('create_voucher')}
            linearGradientProps={{colors: COLORS.linearButton}}
            onPress={() => {
              navigate('CreateVoucherDoctorScreen');
            }}
          />
        </View>
        <FlatList
          data={dataArr || (isLoading && [1, 2, 3, 5])}
          keyExtractor={(_, index) => `key-list-history${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{rowGap: scale(10), paddingBottom: scale(100)}}
          ListEmptyComponent={<EmptyData />}
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
          renderItem={({item}) => {
            return (
              <VoucherItem
                isLoading={isLoading}
                data={item}
                onPressUpdate={() => {
                  navigate('CreateVoucherDoctorScreen', {...item});
                }}
                onPressDelete={() => {
                  handleAlert(item);
                }}
              />
            );
          }}
        />
      </View>
    </MainWrapper>
  );
}

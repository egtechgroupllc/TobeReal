import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useMemo, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../hooks/useLanguage';
import {
  CustomImage,
  CustomText,
  InViewport,
  MainWrapper,
  Skeleton,
} from '../../components';
import {
  COLORS,
  SHADOW,
  SIZES,
  animations,
  images,
  scale,
} from '../../assets/constants';
import {getHistoryToken} from '../../Model/api/auth';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import LottieView from 'lottie-react-native';
import {formatDateTime, formatPrice} from '../../utils/format';
import EmptyData from '../../components/EmptyData';
import {useAuthentication} from '../../hooks/useAuthentication';

export default function HistoryTokenDataScreen() {
  const {setOptions} = useNavigation();
  const {t} = useLanguage();
  const queryClient = useQueryClient();
  const {token} = useAuthentication();
  useLayoutEffect(() => {
    setOptions({
      headerTitle: t('transaction_history'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['user', 'token-data', 'history', {token: token}],
    queryFn: getHistoryToken({token: token}),
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
  const refresh = useRef(false);

  function pullToRefresh(value) {
    refresh.current = true;
    queryClient.invalidateQueries();
    refresh.current = false;
  }
  return (
    <MainWrapper noImgColor>
      <FlatList
        data={dataArr || (isLoading && [1, 2, 3, 5])}
        style={{
          height: '100%',
        }}
        refreshControl={
          <RefreshControl
            refreshing={refresh.current}
            onRefresh={pullToRefresh}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          <View style={{marginTop: scale(100)}}>
            <EmptyData />
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          rowGap: scale(8),
          padding: scale(12),
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
        onEndReachedThreshold={0.5}
        renderItem={({item, index}) =>
          item?.id ? (
            <View
              key={index}
              style={{
                backgroundColor: COLORS.grey + '40',
                minHeight: scale(50),
                borderRadius: scale(5),
                padding: scale(10),
                flexDirection: 'row',
                columnGap: scale(10),
                alignItems: 'center',
              }}>
              <CustomImage
                source={images.logoTBH}
                style={{width: scale(33), height: scale(33)}}
                resizeMode="contain"
              />
              <View
                style={{
                  flex: 1,
                  rowGap: scale(6),
                }}>
                <CustomText
                  numberOfLines={2}
                  style={{fontSize: SIZES.xMedium, flex: 1}}
                  textType="semiBold">
                  {item?.content}
                </CustomText>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <CustomText>
                    {formatDateTime(item?.createdAt, {
                      dateStyle: 'HH:mm - dd/MM/yyyy',
                    })}
                  </CustomText>
                  <CustomText
                    style={{
                      color: item?.amount > 0 ? 'green' : COLORS.error,
                      marginLeft: 'auto',
                    }}>
                    {item?.amount > 0 ? '+' : ''}{' '}
                    {formatPrice(item?.amount, {
                      decimalPlaces: 6,
                      showCurrency: false,
                    })}{' '}
                    TBH
                  </CustomText>
                </View>
              </View>
            </View>
          ) : (
            <Skeleton height={scale(50)} />
          )
        }
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

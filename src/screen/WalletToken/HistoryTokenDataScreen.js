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
import {replaceTranslateKey} from '../../utils/replaceTranslateKey';
import {getListConstant} from '../../Model/api/common';

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
  const {data: dataConstant} = useQuery({
    queryKey: ['common', 'list-constant'],
    queryFn: getListConstant,
  });
  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ['user', 'token-data', 'history', {token: token, limit: 10}],
    queryFn: ({pageParam = 1}) =>
      getHistoryToken({
        pageParam,
        token: token,
        limit: 10,
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

  const refresh = useRef(false);

  function pullToRefresh(value) {
    refresh.current = true;
    queryClient.invalidateQueries();
    refresh.current = false;
  }
  return (
    <MainWrapper noImgColor scrollEnabled={false}>
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
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) =>
          item?.id ? (
            <View
              key={index}
              style={{
                backgroundColor: COLORS.white,
                minHeight: scale(50),
                borderRadius: scale(5),
                padding: scale(10),
                flexDirection: 'row',
                columnGap: scale(10),
                alignItems: 'center',
                ...SHADOW,
              }}>
              <View style={styles.icon}>
                <CustomImage
                  isAvatar
                  source={images.logoTBH}
                  style={{
                    width: scale(30),
                    aspectRatio: 1,
                  }}
                  resizeMode="contain"
                />
              </View>

              <View
                style={{
                  flex: 1,
                  rowGap: scale(6),
                }}>
                <CustomText
                  numberOfLines={2}
                  style={{fontSize: SIZES.xMedium, flex: 1}}
                  textType="semiBold">
                  {item?.description_replacements
                    ? replaceTranslateKey(
                        t(item?.description),
                        item?.description_replacements,
                      )
                    : t(item?.description)}
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
                {item?.amount > 0 && (
                  <CustomText
                    style={{
                      color: COLORS.black + '50',
                    }}>
                    {t('transaction_fee_deducted')}: -
                    {formatPrice(
                      dataConstant?.data?.fee_commission_percent_voucher,
                      {
                        decimalPlaces: 6,
                        showCurrency: false,
                      },
                    )}{' '}
                    TBH
                  </CustomText>
                )}
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

const styles = StyleSheet.create({
  icon: {
    height: scale(35),
    width: scale(35),
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(99),
  },
});

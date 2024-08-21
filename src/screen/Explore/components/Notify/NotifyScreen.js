import {useNavigation} from '@react-navigation/native';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {
  COLORS,
  SHADOW,
  WIDTH,
  animations,
  scale,
} from '../../../../assets/constants';
import MainWrapper from '../../../../components/MainWrapper';
import {useLanguage} from '../../../../hooks/useLanguage';
import EmptyData from '../../../../components/EmptyData';
import NotifyItems, {replacePlaceholders} from './components/NotifyItems';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getHistoryDeposit,
  getListNotification,
  postSeenNotification,
} from '../../../../Model/api/auth';
import LottieView from 'lottie-react-native';
import {CustomText} from '../../../../components';

export default function NotifyScreen() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ['notification', 'list-notification', 10],
    queryFn: ({pageParam}) =>
      getListNotification({
        pageParam,
        limit: 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!(lastPage?.data?.rows?.length <= 0)) return allPages?.length + 1;

      return undefined;
    },
    refetchInterval: 3000,
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

  const {setOptions} = useNavigation();
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('notification'),
      headerTitleStyle: {
        textAlign: 'center',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {data: dataSeen, isError} = useQuery({
    queryKey: ['notification', 'seen-notification'],
    queryFn: () => postSeenNotification(),
    refetchInterval: 5000,
  });
  const refresh = useRef(false);
  const queryClient = useQueryClient();
  function pullToRefresh(value) {
    refresh.current = true;
    queryClient.invalidateQueries();
    refresh.current = false;
  }

  return (
    <MainWrapper scrollEnabled={false}>
      <FlatList
        showsVerticalScrollIndicator={false}
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
        contentContainerStyle={{
          rowGap: scale(10),
          padding: scale(20),
          paddingBottom: scale(60),
        }}
        ListEmptyComponent={() => (
          <EmptyData styleWrapper={{marginTop: '40%'}} />
        )}
        ListFooterComponent={() =>
          isFetchingNextPage && (
            <View style={{height: scale(30)}}>
              <LottieView
                autoPlay={true}
                source={animations.loading}
                style={{height: '100%'}}
              />
            </View>
          )
        }
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          hasNextPage && fetchNextPage();
        }}
        renderItem={({item, index}) => <NotifyItems data={item} t={t} />}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    width: WIDTH.widthContain,
    // marginVertical: scale(20),
    marginTop: scale(10),
    alignItems: 'center',
  },
  containTab: {
    height: scale(56),
    alignItems: 'center',
    borderRadius: scale(12),
    backgroundColor: '#e6e7e8',
    padding: scale(4),
  },
  tabActive: {
    color: COLORS.primary,
    borderRadius: scale(12),
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
  },
  img: {
    width: scale(240),
    height: scale(240),
  },
  btnAdd: {
    position: 'absolute',
    bottom: scale(-70),
    right: 0,
    zIndex: 999,
    width: scale(150),
  },
  box: {
    backgroundColor: '#FDFDFD',
    minHeight: scale(100),
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: '#DADADA4D',
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    rowGap: scale(5),
    ...SHADOW,
  },
  code: {
    borderWidth: scale(1),
    height: scale(30),
    borderRadius: scale(6),
    borderColor: '#0000001A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    alignItems: 'center',
    marginTop: scale(5),
  },
  line: {
    backgroundColor: COLORS.grey,
    height: scale(1),
    width: '100%',
  },
});

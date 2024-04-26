import {useNavigation} from '@react-navigation/native';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import LottieView from 'lottie-react-native';
import React, {useMemo, useRef, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {getHistoryDeposit} from '../../../Model/api/auth';
import {COLORS, animations, scale} from '../../../assets/constants';
import EmptyData from '../../../components/EmptyData';
import MainWrapper from '../../../components/MainWrapper';
import OptionAccommodation from '../../Explore/components/FindAccommodation/OptionAccommodation';
import ItemHistoryTrans from './components/HistoryTransaction/ItemHistoryTrans';
import ItemHistoryTransLoading from './components/HistoryTransaction/ItemHistoryTransLoading';
const listInfo = [
  {
    text: 'Tất cả',
  },
  {
    text: 'Bank',
  },
  {
    text: 'MoMo',
  },
];
export default function HistoryTransactionScreen() {
  const {navigate} = useNavigation();
  const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage} =
    useInfiniteQuery({
      queryKey: ['deposit', 'my-order'],
      queryFn: getHistoryDeposit,
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
  const queryClient = useQueryClient();

  const refresh = useRef(false);
  function pullToRefresh(value) {
    refresh.current = true;
    queryClient.invalidateQueries();
    refresh.current = false;
  }
  return (
    <MainWrapper
      noImgColor
      scrollEnabled={false}
      backgroundColor={'#fff'}
      refreshControl>
      <OptionAccommodation
        isShaDow
        data={listInfo}
        styleWrapper={{
          flex: 0,
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataArr || (isLoading && [1, 2, 3, 5])}
        refreshControl={
          <RefreshControl
            refreshing={refresh.current}
            onRefresh={pullToRefresh}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={() => (
          <EmptyData
            styleWrapper={{
              marginTop: '40%',
            }}
          />
        )}
        ListFooterComponent={() =>
          isFetchingNextPage && (
            <View
              style={{
                height: scale(30),
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
        contentContainerStyle={{
          paddingTop: scale(10),
        }}
        renderItem={({item, index}) =>
          item?.id ? (
            <ItemHistoryTrans
              onPress={value => navigate('DetailHistoryDeposit', value)}
              key={index}
              data={item}
              isBackground={index % 2 === 0}
            />
          ) : (
            <ItemHistoryTransLoading isBackground={index % 2 === 0} />
          )
        }
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

import {useInfiniteQuery} from '@tanstack/react-query';
import React, {useMemo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {getHistoryDeposit} from '../../../Model/api/auth';
import EmptyData from '../../../components/EmptyData';
import MainWrapper from '../../../components/MainWrapper';
import BoxPlaceItemLoading from '../../Explore/components/ContentAccommodation/BoxPlaceItem/BoxPlaceItemLoading';
import ItemHistoryTrans from './components/HistoryTransaction/ItemHistoryTrans';
import ListCreateAccomLoading from '../../News/PostNews/Lease/components/HomeLease/ListCreateAccomLoading';
import ItemHistoryTransLoading from './components/HistoryTransaction/ItemHistoryTransLoading';
import {scale} from '../../../assets/constants';
import OptionAccommodation from '../../Explore/components/FindAccommodation/OptionAccommodation';
import {useNavigation} from '@react-navigation/native';
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
        ListEmptyComponent={() => (
          <EmptyData
            styleWrapper={{
              marginTop: '40%',
            }}
          />
        )}
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

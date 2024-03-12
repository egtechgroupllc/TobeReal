import {useInfiniteQuery} from '@tanstack/react-query';
import React, {useMemo} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getListRent} from '../../api/user';
import {animations, scale} from '../../assets/constants';
import ItemAccommdSearch from './components/ItemAccommdSearch';
import ItemAccommdSearchLoading from './components/ItemAccommdSearchLoading';
import LottieView from 'lottie-react-native';

export default function ListAccomSearchContent() {
  const insets = useSafeAreaInsets();
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['accommodation', 'list-rent', 1],
    queryFn: getListRent,
    getNextPageParam: (lastPage, allPages) => {
      if (!(lastPage?.data?.data?.rows?.length <= 0))
        return allPages.length + 1;

      return undefined;
    },
  });

  const dataArr = useMemo(
    () =>
      data?.pages
        .map(page => {
          if (!page) return undefined;
          return page?.data?.data?.rows;
        })
        .flat(),
    [data?.pages],
  );

  return (
    <View style={{flex: 1}}>
      <Animated.FlatList
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        data={dataArr || [...Array(2)]}
        contentContainerStyle={{
          ...styles.content,
          paddingBottom: insets.bottom + scale(20),
        }}
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
        renderItem={({item, index}) => {
          return item ? (
            <ItemAccommdSearch
              key={`key_${item?.id}-${index}`}
              isButtonBottom
              data={item}
            />
          ) : (
            <ItemAccommdSearchLoading key={index} />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    rowGap: scale(14),
    paddingHorizontal: scale(16),
    paddingTop: scale(70),
  },
});

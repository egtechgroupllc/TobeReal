import {
  ActivityIndicator,
  Animated,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useLanguage} from '../../../hooks/useLanguage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect, useIsFocused, useRoute} from '@react-navigation/native';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {getListVideoRandom} from '../../../Model/api/common';
import {COLORS, animations, scale} from '../../../assets/constants';
import VideoPlay from './VideoPlay';
import EmptyData from '../../../components/EmptyData';
import {showMess} from '../../../assets/constants/Helper';
import LottieView from 'lottie-react-native';

export default function ListVideoBUY({isFocused}) {
  const {t} = useLanguage();

  const insets = useSafeAreaInsets();
  const params = useRoute().params;

  const videoRef = useRef();
  const commentRef = useRef();
  const flatListRef = useRef(null);
  const isFocusedBottomTab = useIsFocused();

  const [videoPlay, setVideoPlay] = useState(true);

  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: [
      'video-short',
      'list-random',
      'estate',
      {table_name: 'estate', limit: 2},
    ],
    queryFn: ({pageParam}) =>
      getListVideoRandom({
        table_name: 'estate',
        page: pageParam,
        limit: 2,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalItems = lastPage?.data?.count;
      const loadedItems = allPages.reduce(
        (acc, page) => acc + page.data.rows.length,
        0,
      );

      console.log('Total Items:', totalItems);
      console.log('Loaded Items:', loadedItems);

      if (loadedItems >= totalItems) {
        return undefined; // No more pages to load
      }
      return allPages.length + 1;
    },
  });

  const handlerViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0 && viewableItems[0].isViewable) {
      setVideoPlay(viewableItems[0].item?.id);
    }
  }, []);
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
  // useLayoutEffect(() => {
  //   scrollToIndex(params?.index);
  // }, [params?.index]);
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
  const scrollToIndex = useCallback((index = 0) => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: index,
    });
  }, []);

  // const handleProgress = useCallback(value => {
  //   return setOptions({
  //     tabBarButton: () => (
  //       <View
  //         style={{
  //           width: '100%',
  //           height: scale(28) + insets.bottom,
  //         }}>
  //         <View
  //           style={[
  //             {
  //               width: '96%',
  //               position: 'absolute',
  //               alignSelf: 'center',
  //               zIndex: 999,
  //               top: scale(-20),
  //             },
  //           ]}>
  //           <RangeSlider
  //             progressValue={value?.currentTime}
  //             onValueChange={videoRef.current?.handleValueChange}
  //             maximumValue={value?.seekableDuration}
  //           />
  //         </View>
  //         <Comment ref={commentRef} />
  //       </View>
  //     ),
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   return setOptions({
  //     tabBarButton: () => <Comment />,
  //   });
  // }, []);

  useEffect(() => {
    if (isFocused || isFocusedBottomTab) {
      setVideoPlay(true);
    }
  }, [isFocused, isFocusedBottomTab]);
  if (isLoading) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.black,
        }}>
        {/* <CustomImage
                source={images.logoLoading}
                style={{width: scale(100), height: scale(100)}}
              /> */}
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <FlatList
        data={dataArr}
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        snapToAlignment={'start'}
        onScrollToIndexFailed={({index}) => {
          const wait = new Promise(resolve => setTimeout(resolve, 100));
          wait.then(() => {
            scrollToIndex(index);
          });
        }}
        style={{flex: 1}}
        contentContainerStyle={{
          backgroundColor: '#000',
          justifyContent: 'center',
        }}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={handlerViewableItemsChanged}
        // onEndReached={e => Alert.alert('Đã gan cuôi r')}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
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
        ListEmptyComponent={<EmptyData styleWrapper={{marginTop: '50%'}} />}
        renderItem={({item, index}) => {
          return (
            <VideoPlay
              key={`${item.id}-${index}`}
              ref={videoRef}
              data={item}
              paused={
                item?.id !== videoPlay || !isFocused || !isFocusedBottomTab
              }
              play={item?.id === videoPlay && isFocused && isFocusedBottomTab}
              // onProgress={value => {
              //   handleProgress(value);
              // }}
              // onComment={() => commentRef.current?.open()}
              styleBottom={{
                paddingBottom:
                  Platform.OS === 'android' ? scale(40) : scale(20),
              }}
              onComment={() => showMess(t('comming_soon'), 'error')}
            />
          );
        }}
        keyExtractor={item => `buy + ${item.id.toString()}`}
      />
      {/* <View
          style={{
            width: '100%',
            height: scale(28) + insets.bottom,
          }}>
          <View
            style={[
              {
                width: '96%',
                position: 'absolute',
                alignSelf: 'center',
                zIndex: 999,
                top: scale(-30),
              },
            ]}>
            <RangeSlider
            // progressValue={value?.currentTime}
            // onValueChange={videoRef.current?.handleValueChange}
            // maximumValue={value?.seekableDuration}
            />
          </View>
          <Comment ref={commentRef} />
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({});

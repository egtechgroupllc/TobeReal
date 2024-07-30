import {
  ActivityIndicator,
  Animated,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useLanguage} from '../../../hooks/useLanguage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect, useIsFocused, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getListVideoRandom} from '../../../Model/api/common';
import {COLORS} from '../../../assets/constants';
import VideoPlay from './VideoPlay';
import EmptyData from '../../../components/EmptyData';
import {showMess} from '../../../assets/constants/Helper';

export default function ListVideoBUY({isFocused}) {
  const {t} = useLanguage();

  const insets = useSafeAreaInsets();
  const params = useRoute().params;

  const videoRef = useRef();
  const commentRef = useRef();
  const flatListRef = useRef(null);

  const [videoPlay, setVideoPlay] = useState(true);
  const {data, isLoading} = useQuery({
    queryKey: ['video-short', 'list-random', 'estate'],
    queryFn: () => getListVideoRandom({table_name: 'estate'}),
  });
  const handlerViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0 && viewableItems[0].isViewable) {
      setVideoPlay(viewableItems[0].item?.id);
    }
  }, []);
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
    if (!isFocused) {
      setVideoPlay(false);
    }
  }, [isFocused]);
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
        data={data?.data?.rows}
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
        onEndReachedThreshold={
          data?.data?.rows?.length - (data?.data?.rows?.length - 2)
        }
        ListEmptyComponent={<EmptyData styleWrapper={{marginTop: '50%'}} />}
        renderItem={({item, index}) => {
          return (
            <VideoPlay
              ref={videoRef}
              data={item}
              paused={item?.id !== videoPlay || !isFocused}
              play={item?.id === videoPlay && isFocused}
              // onProgress={value => {
              //   handleProgress(value);
              // }}
              // onComment={() => commentRef.current?.open()}
              onComment={() => showMess(t('comming_soon'), 'error')}
            />
          );
        }}
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

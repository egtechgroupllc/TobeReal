/* eslint-disable react-hooks/exhaustive-deps */
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, images, scale} from '../../../assets/constants';
import {showMess} from '../../../assets/constants/Helper';
import {useLanguage} from '../../../hooks/useLanguage';
import VideoPlay from '../../Video/components/VideoPlay';
import {IconGoBack} from '../../../assets/icon/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomImage} from '../../../components';

export default function DetailVideoShortScreen() {
  const {t} = useLanguage();
  const {goBack, setOptions} = useNavigation();
  const insets = useSafeAreaInsets();

  const params = useRoute().params;
  const videoRef = useRef();
  const commentRef = useRef();
  const flatListRef = useRef(null);

  const isFocused = useIsFocused();
  const [videoPlay, setVideoPlay] = useState(true);

  const handlerViewableItemsChanged = useCallback(
    ({viewableItems}) => {
      if (viewableItems.length > 0 && viewableItems[0].isViewable) {
        setVideoPlay(viewableItems[0].item?.id);
      }
    },
    [videoPlay],
  );

  // useLayoutEffect(() => {
  //   scrollToIndex(params?.index);
  // }, [params?.index]);

  const scrollToIndex = useCallback((index = 0) => {
    flatListRef.current.scrollToIndex({
      animated: false,
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

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={goBack}
        style={{...styles.goBack, top: insets.top}}>
        <IconGoBack fill={'#fff'} />
      </TouchableOpacity>
      <FlatList
        data={params?.data?.rows || params?.data?.data?.rows}
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
        style={{
          backgroundColor: '#000',
          height: '100%',
        }}
        contentContainerStyle={{
          backgroundColor: '#000',
          justifyContent: 'center',
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        onViewableItemsChanged={handlerViewableItemsChanged}
        // onEndReached={e => Alert.alert('Đã gan cuôi r')}
        onEndReachedThreshold={
          params?.data?.rows?.length - (params?.data?.rows?.length - 2)
        }
        renderItem={({item, index}) => {
          return (
            <VideoPlay
              ref={videoRef}
              data={item}
              Bottom={true}
              styleBottom={{paddingBottom: scale(50)}}
              paused={item?.id !== videoPlay}
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
    </View>
  );
}

const styles = StyleSheet.create({
  goBack: {
    position: 'absolute',
    zIndex: 9,
    padding: scale(6),
    backgroundColor: '#00000050',
    borderRadius: scale(10),
    left: scale(10),
  },
  favouriteHeart: {
    width: scale(100),
    minHeight: scale(100),
    transform: [
      {
        scale: 2.5,
      },
    ],
  },
});

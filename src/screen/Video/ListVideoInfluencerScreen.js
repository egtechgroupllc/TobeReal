/* eslint-disable react-hooks/exhaustive-deps */
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Animated,
  AppState,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {animations, scale} from '../../assets/constants';
import video from '../../assets/constants/video';
import {IconGoBack} from '../../assets/icon/Icon';
import RangeSlider from './components/RangeSlider';
import VideoPlay from './components/VideoPlay';
import Comment from './Comment';
import {showMess} from '../../assets/constants/Helper';
import {useLanguage} from '../../hooks/useLanguage';
import {useQuery} from '@tanstack/react-query';
import {getListVideoRandom} from '../../Model/api/common';

const listVideo = [
  {
    id: 4,
    src: 'http://192.168.0.197:3000/videos/users/video_short/be92d9a9-1eb9-4ce0-979f-cb4004b62ee4.MP4',
    username: 'Jimmy',
    quantityHeart: 276,
    quantityComment: 11,
    description:
      'A nice boutique hotel conveniently located near the busy Piccadilly Circus and the trendy Carnaby street (practically just next door). ',
    price: 500,
    location: 'United Kingdom',
    rental: 'night',
  },
];

// const Tab = createBottomTabNavigator();
// export default function ListVideoInfluencerScreen() {
//   const params = useRoute().params;

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: '#000',
//           borderTopWidth: 0,
//         },
//       }}>
//       <Tab.Screen
//         name="ListVideoInfluencer"
//         component={ListVideoInfluencer}
//         initialParams={params}
//       />
//     </Tab.Navigator>
//   );
// }

export default function ListVideoInfluencerScreen() {
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
      animated: true,
      index: index,
    });
  }, []);
  const {data, isLoading} = useQuery({
    queryKey: ['video-short', 'list-random'],
    queryFn: getListVideoRandom,
  });

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
      {/* <TouchableOpacity
        activeOpacity={0.7}
        onPress={goBack}
        style={{...styles.goBack, top: insets.top}}>
        <IconGoBack fill={'#fff'} />
      </TouchableOpacity> */}
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
          data?.data?.rows?.length - (data?.data?.rows?.length - 2)
        }
        renderItem={({item, index}) => {
          return (
            <VideoPlay
              ref={videoRef}
              data={item}
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

      <View
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
          {/* <RangeSlider
          // progressValue={value?.currentTime}
          // onValueChange={videoRef.current?.handleValueChange}
          // maximumValue={value?.seekableDuration}
          /> */}
        </View>
        <Comment ref={commentRef} />
      </View>
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

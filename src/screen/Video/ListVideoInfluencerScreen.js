/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {animations, scale} from '../../assets/constants';
import video from '../../assets/constants/video';
import {IconGoBack} from '../../assets/icon/Icon';
import RangeSlider from './components/RangeSlider';
import VideoPlay from './components/VideoPlay';

const listVideo = [
  {
    id: 3,
    src: video.video1,
    username: 'John',
    price: 2000,
    location: 'United States',
    rental: 'night',
    quantityHeart: 516,
    quantityComment: 10,
    description:
      "Getting around Los Angeles (CA) can be a challenge, but with a little planning, it's easy to navigate the city. The most common form of transportation in Los Angeles (CA) is by car, so consider renting a car or using a ride-sharing service like Uber or Lyft. Los Angeles (CA) also has a public transportation system, which includes buses and trains. If you're planning to use public transportation, be sure to check schedules and plan your route in advance. And for those who prefer to walk or bike, Los Angeles (CA) has plenty of pedestrian-friendly areas and bike lanes.",
  },
  {
    id: 2,
    src: video.video3,
    username: 'David',
    quantityHeart: 1982,
    quantityComment: 67,
    description:
      'This is a wonderful apartment to stay at for a honeymoon, featuring some of the best service I have ever experienced. The staff are incredibly friendly and helpful. The room, while not large, was well lit, well furnished, with a very comfortable bed and a modern bathroom. ',
    price: 2000,
    location: 'France',
    rental: 'night',
  },
  {
    id: 1,
    src: video.video3,
    username: 'Jack',
    quantityHeart: 100,
    quantityComment: 11,
    description:
      'Overall very good with only a small complaint with the common area: The atmosphere feels more like a hotel. Nobody socializes in the common area. ',
    price: 1000,
    location: 'Germany',
    rental: 'night',
  },

  {
    id: 4,
    src: video.video4,
    username: 'Jimmy',
    quantityHeart: 276,
    quantityComment: 11,
    description:
      'A nice boutique hotel conveniently located near the busy Piccadilly Circus and the trendy Carnaby street (practically just next door). ',
    price: 500,
    location: 'United Kingdom',
    rental: 'night',
  },
  {
    id: 5,
    src: video.video5,
    username: 'Michael',
    quantityHeart: 112,
    quantityComment: 15,
    description:
      'Everything was great until I was stopped by police( ФМС) to check my doc. hotel stay address, they call it “registration” Even I was given the document that says I’m registered, It wasn’t in the the system of the ФМС. ',
    price: 3000,
    location: 'Russia',
    rental: 'night',
  },
  {
    id: 6,
    src: video.video4,
    username: 'Tyler',
    quantityHeart: 213,
    quantityComment: 21,
    description:
      'This was an awesome spot to stay in Dublin. You can take the airlink bus from the airport here, or a taxi. They allowed us early check in as our room was ready.',
    price: 4000,
    location: 'Ireland',
    rental: 'night',
  },
  {
    id: 31,
    src: video.video1,
    username: 'Bob',
    quantityHeart: 132,
    quantityComment: 5,
    price: 5000,
    location: 'Italia',
    rental: 'night',
    description:
      'The majority of reviews on Agoda say that for a quick stay, this is the go-to hotel which provides a comfortable stay/service/access to get around town. ',
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
  const {goBack, setOptions} = useNavigation();
  const insets = useSafeAreaInsets();
  const params = useRoute().params;

  const videoRef = useRef();
  const commentRef = useRef();
  const flatListRef = useRef(null);

  const [videoPlay, setVideoPlay] = useState(true);
  const [releaseHeart, setReleaseHeart] = useState({x: 0, y: 0});

  const handlerViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0 && viewableItems[0].isViewable) {
      setVideoPlay(viewableItems[0].item?.id);
    }
  }, []);

  useLayoutEffect(() => {
    scrollToIndex(params?.index);
  }, [params?.index]);

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

  const onHeartVideo = useCallback(event => {
    const {x, y} = event;
    setReleaseHeart({x, y});
    const timeOutID = setTimeout(() => {
      setReleaseHeart({x: 0, y: 0});
    }, 1000);
    return clearTimeout(timeOutID);
  }, []);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={goBack}
        style={{...styles.goBack, top: insets.top}}>
        <IconGoBack fill={'#fff'} />
      </TouchableOpacity>
      <FlatList
        data={listVideo}
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
          backgroundColor: '#ccc',
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
        onEndReachedThreshold={listVideo?.length - (listVideo?.length - 2)}
        renderItem={({item, index}) => (
          <VideoPlay
            ref={videoRef}
            data={item}
            paused={item?.id !== videoPlay}
            play={item?.id === videoPlay}
            isFavourite={releaseHeart.x}
            // onProgress={value => {
            //   handleProgress(value);
            // }}
            onHeartVideo={onHeartVideo}
            onComment={() => commentRef.current?.open()}
          />
        )}
      />

      {!!releaseHeart.y && (
        <View
          style={[
            {
              position: 'absolute',
            },
            releaseHeart.x && {
              left: releaseHeart.x - 50,
              top: releaseHeart.y - 40,
            },
          ]}>
          <LottieView
            loop={false}
            autoPlay={true}
            duration={1200}
            source={animations.releaseHeart}
            onAnimationFinish={() => setReleaseHeart({x: 0, y: 0})}
            resizeMode="cover"
            style={styles.favouriteHeart}
          />
        </View>
      )}
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
          <RangeSlider
          // progressValue={value?.currentTime}
          // onValueChange={videoRef.current?.handleValueChange}
          // maximumValue={value?.seekableDuration}
          />
        </View>
        {/* <Comment ref={commentRef} /> */}
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

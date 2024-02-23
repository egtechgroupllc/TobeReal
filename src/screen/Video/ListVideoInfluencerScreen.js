import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {WIDTH, animations, scale} from '../../assets/constants';
import video from '../../assets/constants/video';
import Comment from './Comment';
import RangeSlider from './components/RangeSlider';
import VideoPlay from './components/VideoPlay';
import LottieView from 'lottie-react-native';
import {runOnJS} from 'react-native-reanimated';

const listVideo = [
  {
    id: 3,
    src: video.video1,
    username: 'quanh1099',
    price: 200000,
    location: 'HoChiMinh',
    rental: 'night',
    description:
      'The goal of is expanding the original React Native component by adding animations, style customization options, and new features, while still providing a simple API',
  },
  {
    id: 2,
    src: video.video2,
    username: 'cuongxautrai',
    description: 'cuong xau zai vai ca dai , oai that xau zai',
    price: 1,
    location: 'HoChiMinh',
    rental: 'night',
  },
  {
    id: 1,
    src: video.video3,
    username: 'kietdepzai',
    description: 'kiet dep zai vai ca dai , oai that dep zai',
    price: 9999999999,
    location: 'HoChiMinh',
    rental: 'night',
  },

  {
    id: 4,
    src: video.video4,
    username: 'meiyin680',
    description: 'She’s about to be made into a living human specimen',
    price: 1000,
    location: 'HoChiMinh',
    rental: 'night',
  },
  {
    id: 5,
    src: video.video5,
    username: 'meiyin680',
    description: 'She’s about to be made into a living human specimen',
    price: 1000,
    location: 'HoChiMinh',
    rental: 'night',
  },
];

const Tab = createBottomTabNavigator();
export default function ListVideoInfluencerScreen() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
        },
      }}>
      <Tab.Screen name="ListVideoInfluencer" component={ListVideoInfluencer} />
    </Tab.Navigator>
  );
}

export function ListVideoInfluencer() {
  const {goBack, setOptions} = useNavigation();
  const insets = useSafeAreaInsets();
  const videoRef = useRef();
  const heightBottomTab = useBottomTabBarHeight();

  const [videoPlay, setVideoPlay] = useState(true);
  const [releaseHeart, setReleaseHeart] = useState({x: 0, y: 0});

  const handlerViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0 && viewableItems[0].isViewable) {
      setVideoPlay(viewableItems[0].item?.id);
    }
  }, []);

  const handleProgress = useCallback(value => {
    return setOptions({
      tabBarButton: () => (
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
                top: scale(-20),
              },
            ]}>
            <RangeSlider
              progressValue={value?.currentTime}
              onValueChange={videoRef.current?.handleValueChange}
              maximumValue={value?.seekableDuration}
            />
          </View>
          <Comment />
        </View>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return setOptions({
      tabBarButton: () => <Comment />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeHeart = useCallback(() => {
    const timeOutID = setTimeout(() => {
      setReleaseHeart({x: 0, y: 0});
    }, 1000);
    return clearTimeout(timeOutID);
  }, []);

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .runOnJS(true)
    .hitSlop({
      height: WIDTH.heightScreen - heightBottomTab - scale(30),
      top: 0,
    })
    .onStart(event => {
      videoRef.current?.paused();
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .runOnJS(true)
    .onStart(event => {
      const {x, y} = event;
      setReleaseHeart({x, y});
      removeHeart();
    });

  return (
    <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)} hitSlop>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          pagingEnabled
          snapToAlignment={'start'}
          data={listVideo}
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
          onEndReached={e => console.log('cuộn đén cuối')}
          onEndReachedThreshold={listVideo?.length - 2}
          renderItem={({item, index}) => (
            <VideoPlay
              ref={videoRef}
              fullScreen
              data={item}
              paused={item?.id !== videoPlay}
              play={item?.id === videoPlay}
              isFavourite={releaseHeart.x}
              onProgress={value => {
                handleProgress(value);
              }}
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
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  goBack: {
    zIndex: 19,
    left: scale(6),
    padding: scale(6),
    position: 'absolute',
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

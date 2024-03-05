/* eslint-disable react-hooks/exhaustive-deps */
import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {IconGoBack} from '../../assets/icon/Icon';

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
    description:
      'cuong xau zai vai ca dai , oai that xaThe goal of is expanding the original React Native component by adding animations, style customization options, and new features, while still providing a simple APIThe goal of is expanding the original React Native component by adding animations, style customization options, and new features, while still providing a simple APIThe goal of is expanding the original React Native component by adding animations, style customization options, and new features, while still providing a simple APIu zai',
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
  {
    id: 6,
    src: video.video4,
    username: 'meiyin680',
    description: 'She’s about to be made into a living human specimen',
    price: 1000,
    location: 'HoChiMinh',
    rental: 'night',
  },
  {
    id: 31,
    src: video.video1,
    username: 'quanh1099',
    price: 200000,
    location: 'HoChiMinh',
    rental: 'night',
    description:
      'The goal of is expanding the original React Native component by adding animations, style customization options, and new features, while still providing a simple API',
  },
];

const Tab = createBottomTabNavigator();
export default function ListVideoInfluencerScreen() {
  const params = useRoute().params;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="ListVideoInfluencer"
        component={ListVideoInfluencer}
        initialParams={params}
      />
    </Tab.Navigator>
  );
}

export function ListVideoInfluencer() {
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

  const scrollToIndex = useCallback(index => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: index,
    });
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
          <Comment ref={commentRef} />
        </View>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return setOptions({
      tabBarButton: () => <Comment />,
    });
  }, []);

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
        onEndReached={e => Alert.alert('Đã gan cuôi r')}
        onEndReachedThreshold={listVideo?.length - (listVideo?.length - 2)}
        renderItem={({item, index}) => (
          <VideoPlay
            ref={videoRef}
            data={item}
            paused={item?.id !== videoPlay}
            play={item?.id === videoPlay}
            isFavourite={releaseHeart.x}
            onProgress={value => {
              handleProgress(value);
            }}
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

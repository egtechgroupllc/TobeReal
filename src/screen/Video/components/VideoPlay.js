/* eslint-disable react-hooks/exhaustive-deps */
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import {WIDTH, scale} from '../../../assets/constants';
import {IconPlayVideo} from '../../../assets/icon/Icon';
import SideBar from './SideBar';
import VideoCaption from './VideoCaption';
import AnimatedHeartClick from './AnimatedHeartClick';
function getUniqueID() {
  return Math.floor(Math.random() * Date.now()).toString();
}
export default forwardRef(function VideoPlay(
  {
    fullScreen,
    data,
    paused,
    play,
    resetVideo,
    style,

    muted,
    onProgress,
    isFavourite,
    onComment,
    ...props
  },
  ref,
) {
  const videoRef = useRef();
  const isImgAsset = typeof data?.src === 'number';
  const heightBottomTab = useBottomTabBarHeight();

  const [pausedVideo, setPausedVideo] = useState(true);
  const [progress, setProgress] = useState(0);
  const [resizeMode, setResizeMode] = useState('contain');
  const [hearts, setHearts] = useState([]);

  const handleCompleteAnimation = useCallback(id => {
    setHearts(oldHearts => {
      return oldHearts.filter(heart => heart.id !== id);
    });
  }, []);
  useEffect(() => {
    if (play) {
      videoRef.current.seek(0);
      setPausedVideo(!play);
    } else {
      setPausedVideo(true);
    }
  }, [play]);
  const onHeartVideo = useCallback(event => {
    const {x, y} = event;
    setHearts(oldHearts => [...oldHearts, {id: getUniqueID(), x, y}]);
  }, []);
  const handleValueChange = useCallback(value => {
    videoRef.current.seek(value);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      handleValueChange,
    }),
    [progress, play],
  );

  const singleTap = useMemo(
    () =>
      Gesture.Tap()
        .runOnJS(true)
        .onStart(event => {
          setPausedVideo(!pausedVideo);
        }),
    [pausedVideo],
  );

  const doubleTap = useMemo(
    () =>
      Gesture.Tap()
        .maxDuration(300)
        .numberOfTaps(hearts?.length >= 2 ? 1 : 2)
        .runOnJS(true)
        .onStart(event => {
          onHeartVideo(event);
        }),
    [hearts?.length],
  );

  return (
    <View
      style={{
        ...styles.container,
        height: WIDTH.heightScreen - heightBottomTab,
      }}>
      <GestureDetector
        gesture={Gesture.Exclusive(doubleTap, singleTap)}
        hitSlop>
        <View style={styles.video}>
          <Video
            ref={videoRef}
            {...props}
            source={isImgAsset ? data?.src : {uri: data?.src}}
            style={[styles.video, style]}
            paused={pausedVideo}
            onProgress={value => {
              onProgress && onProgress(value);
            }}
            onSeek={value => {
              setProgress(value);
            }}
            repeat
            muted={muted}
            resizeMode={resizeMode}
            onLoad={response => {
              const {width, height} = response.naturalSize;
              const heightScaled = height / width;
              console.log(heightScaled);
              setResizeMode(height > width ? 'cover' : 'contain');
            }}
          />
          {hearts.map(({id, x, y}) => (
            <AnimatedHeartClick
              key={id}
              id={id}
              position={{
                x,
                y,
              }}
              onHeartVideo={onHeartVideo}
              onCompleteAnimation={handleCompleteAnimation}
            />
          ))}
        </View>
      </GestureDetector>

      {true && (
        <>
          <VideoCaption data={data} />
          <SideBar
            data={data}
            isFavourite={!!hearts.length}
            onComment={onComment}
          />

          {pausedVideo && (
            <IconPlayVideo
              style={{
                width: scale(40),
                height: scale(40),
                opacity: 0.7,
                position: 'absolute',
              }}
            />
          )}
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  overlayPlay: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    height: '90%',
  },
  rangeSlider: {
    width: '96%',
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 999,
  },
});

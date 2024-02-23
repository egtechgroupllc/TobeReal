import LottieView from 'lottie-react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import {CustomButton} from '../../../components';
import {WIDTH, animations, scale} from '../../../assets/constants';
import {IconPlayVideo} from '../../../assets/icon/Icon';
import SideBar from './SideBar';
import RangeSlider from './RangeSlider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import VideoCaption from './VideoCaption';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

export default forwardRef(function VideoPlay(
  {
    fullScreen,
    data,
    paused,
    play,
    resetVideo,
    style,
    resizeMode = 'cover',
    muted,
    onProgress,
    isFavourite,
    ...props
  },
  ref,
) {
  const videoRef = useRef();
  const isImgAsset = typeof data?.src === 'number';
  const heightBottomTab = useBottomTabBarHeight();

  const [pausedVideo, setPausedVideo] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (play) {
      videoRef.current.seek(0);
      setPausedVideo(!play);
    } else {
      setPausedVideo(!play);
    }
  }, [play]);

  const handleValueChange = useCallback(
    value => {
      videoRef.current.seek(value);
    },
    [videoRef],
  );

  useImperativeHandle(
    ref,
    () => ({
      handleValueChange,
      paused: () => {
        setPausedVideo(!pausedVideo);
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pausedVideo],
  );

  return (
    <View
      style={{
        ...styles.container,
        height: WIDTH.heightScreen - heightBottomTab,
      }}>
      <Video
        ref={videoRef}
        {...props}
        source={isImgAsset ? data?.src : {uri: data?.src}}
        style={[styles.video, style]}
        paused={pausedVideo}
        onProgress={value => {
          setProgress(value);
          onProgress && onProgress(value);
        }}
        repeat
        muted={muted}
        resizeMode={resizeMode}
      />

      <VideoCaption data={data} />

      <SideBar
        data={data}
        isFavourite={isFavourite}
        // onFavourite={e => {}}
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
      {/* {true && (
        <View
          style={[
            {
              width: '96%',
              position: 'absolute',
              alignSelf: 'center',
              zIndex: 999,
              top: scale(-50),
            },
          ]}>
          <RangeSlider
            progressValue={progress.currentTime || 0}
            onValueChange={handleValueChange}
            maximumValue={progress.seekableDuration || 0}
          />
        </View>
      )} */}
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

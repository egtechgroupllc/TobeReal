import LottieView from 'lottie-react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  GestureHandlerRootView,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {COLORS, WIDTH, animations, scale} from '../../assets/constants';
import {IconPlayVideo} from '../../assets/icon/Icon';
import RangeSlider from './RangeSlider';
import SideBar from './SideBar';
import {CustomButton} from '..';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default function VideoPlay({
  fullScreen,
  data,
  source,
  paused,
  play,
  resetVideo,
  style,
  resizeMode = 'contain',
  ...props
}) {
  const videoRef = useRef();
  const doubleTapRef = useRef(null);
  const insets = useSafeAreaInsets();

  const [progress, setProgress] = useState(0);
  const [pausedVideo, setPausedVideo] = useState(true);
  const [releaseHeart, setReleaseHeart] = useState({x: 0, y: 0});

  useEffect(() => {
    if (paused) {
      setPausedVideo(paused);
    }
  }, [paused]);

  useEffect(() => {
    if (play) {
      setPausedVideo(!play);
    }
  }, [play]);

  useEffect(() => {
    if (resetVideo) {
      videoRef.current.seek(0);
      setPausedVideo(true);
    }
  }, [resetVideo, pausedVideo]);

  const handleValueChange = useCallback(
    value => {
      videoRef.current.seek(value);
    },
    [videoRef],
  );

  const removeHeart = useCallback(() => {
    const timeOutID = setTimeout(
      () => {
        setReleaseHeart({x: 0, y: 0});
      },

      1000,
    );
    // return clearTimeout(timeOutID);
  }, []);

  const onDoubleClick = event => {
    const {locationX, locationY} = event.nativeEvent;
    // if (state === State.ACTIVE) {
    //   // removeHeart();
    // }
    setReleaseHeart({x: locationX, y: locationY});
  };
  const isImgAsset = typeof source === 'number';

  return (
    <GestureHandlerRootView
      ref={doubleTapRef}
      numberOfTaps={2}
      maxDurationMs={500}
      //  onTouchStart={}
      // onTouchStart={onDoubleClick}
    >
      <View style={[fullScreen ? styles.fullScreen : {flex: 1}]}>
        <Video
          {...props}
          ref={videoRef}
          source={isImgAsset ? source : {uri: source}}
          style={[styles.video, style]}
          paused={pausedVideo}
          onProgress={value => {
            setProgress(value);
          }}
          repeat
          muted
          resizeMode={resizeMode}
        />

        {fullScreen && (
          <View style={styles.safeProvider}>
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

            <CustomButton
              isDouble
              activeOpacity={1}
              styleWrapper={styles.overlayPlay}
              style={{
                height: '100%',
                backgroundColor: 'transparent',
              }}
              onDoublePress={onDoubleClick}
              onPress={() => setPausedVideo(!pausedVideo)}
            />

            <SideBar
              data={data}
              isFavourite={releaseHeart.x}
              // onFavourite={e => {}}
            />

            {pausedVideo && (
              <IconPlayVideo
                style={{
                  width: scale(40),
                  height: scale(40),
                  opacity: 0.7,
                }}
              />
            )}

            <View style={[styles.rangeSlider, {bottom: insets.bottom}]}>
              <RangeSlider
                progressValue={progress.currentTime || 0}
                onValueChange={handleValueChange}
                maximumValue={progress.seekableDuration || 0}
              />
            </View>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
  fullScreen: {
    width: WIDTH.widthScreen,
    height: WIDTH.heightScreen - scale(20),
  },
  safeProvider: {
    position: 'absolute',
    alignItems: 'center',
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    zIndex: 999,
  },
  overlayPlay: {
    width: '100%',
    position: 'absolute',
    zIndex: 999,
    height: '90%',
  },
  rangeSlider: {
    width: '90%',
    position: 'absolute',
    zIndex: 999,
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

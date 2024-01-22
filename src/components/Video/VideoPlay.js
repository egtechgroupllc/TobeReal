import LottieView from 'lottie-react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {State, TapGestureHandler} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {WIDTH, animations, scale} from '../../assets/constants';
import {IconPlayVideo} from '../../assets/icon/Icon';
import RangeSlider from './RangeSlider';
import SideBar from './SideBar';
import {CustomButton} from '..';

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
    const {x, y, state} = event.nativeEvent;

    if (state === State.ACTIVE) {
      setReleaseHeart({x, y});
      // removeHeart();
    }
  };

  return (
    <TapGestureHandler
      ref={doubleTapRef}
      numberOfTaps={2}
      maxDurationMs={500}
      onHandlerStateChange={onDoubleClick}>
      <View style={fullScreen && styles.fullScreen}>
        <Video
          {...props}
          ref={videoRef}
          source={{uri: source}} // Can be a URL or a local file.
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
                  // loop={false}
                  autoPlay={true}
                  duration={1200}
                  source={animations.releaseHeart}
                  onAnimationFinish={() => setReleaseHeart({x: 0, y: 0})}
                  resizeMode="cover"
                  style={styles.favouriteHeart}
                />
              </View>
            )}

            <TouchableOpacity
              isDelay
              activeOpacity={1}
              style={styles.overlayPlay}
              onPress={() => setPausedVideo(!pausedVideo)}
            />

            <SideBar
              data={data}
              isFavourite={releaseHeart.x}
              onFavourite={e => {}}
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

            <View
              style={[styles.rangeSlider, {bottom: insets.bottom + scale(12)}]}>
              <RangeSlider
                progressValue={progress.currentTime || 0}
                onValueChange={handleValueChange}
                maximumValue={progress.seekableDuration || 0}
              />
            </View>
          </View>
        )}
      </View>
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
  fullScreen: {
    width: WIDTH.widthScreen,
    height: WIDTH.heightScreen,
  },
  safeProvider: {
    position: 'absolute',
    alignItems: 'center',
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
  },
  overlayPlay: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    height: '90%',
    backgroundColor: 'transparent',
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

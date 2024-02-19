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
import {CustomButton} from '..';
import {WIDTH, animations, scale} from '../../assets/constants';
import {IconPlayVideo} from '../../assets/icon/Icon';
import SideBar from './SideBar';
import RangeSlider from './RangeSlider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default (function VideoPlay({
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
  const isImgAsset = typeof source === 'number';
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
      videoRef.current.seek(0);
      setPausedVideo(!play);
    }
  }, [play]);

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

  return (
    <View style={[fullScreen ? styles.fullScreen : {flex: 1}]}>
      <Video
        ref={videoRef}
        {...props}
        source={isImgAsset ? source : {uri: source}}
        style={[styles.video, style]}
        paused={pausedVideo}
        onProgress={useCallback(value => {
          setProgress(value);
        }, [])}
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

          {pausedVideo && (
            <IconPlayVideo
              style={{
                width: scale(40),
                height: scale(40),
                opacity: 0.7,
              }}
            />
          )}
        </View>
      )}

      {fullScreen && (
        <SideBar
          data={data}
          isFavourite={releaseHeart.x}
          // onFavourite={e => {}}
        />
      )}

      {play && (
        <View
          style={[
            styles.rangeSlider,
            {bottom: insets.bottom ? insets.bottom : scale(20)},
          ]}>
          <RangeSlider
            progressValue={progress.currentTime || 0}
            onValueChange={handleValueChange}
            maximumValue={progress.seekableDuration || 0}
          />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
  fullScreen: {
    // width: WIDTH.widthScreen,
    width: '100%',
    height: WIDTH.heightScreen,
  },
  safeProvider: {
    position: 'absolute',
    alignItems: 'center',
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    zIndex: 10,
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
    alignSelf: 'center',
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

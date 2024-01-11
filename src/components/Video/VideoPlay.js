import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {WIDTH, scale} from '../../assets/constants';
import {IconGoBack, IconPlayVideo} from '../../assets/icon/Icon';
import RangeSlider from './RangeSlider';
import SideBar from './SideBar';

export default function VideoPlay({
  fullScreen,
  data,
  source,
  paused,
  play,
  resetVideo,
  style,
  ...props
}) {
  const {goBack} = useNavigation();

  const videoRef = useRef();

  const [progress, setProgress] = useState(0);
  const [pausedVideo, setPausedVideo] = useState(true);

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

  const insets = useSafeAreaInsets();

  return (
    <View style={fullScreen && styles.fullScreen}>
      <Video
        {...props}
        ref={videoRef}
        source={{uri: source || ''}} // Can be a URL or a local file.
        style={[styles.video, style]}
        paused={pausedVideo}
        onProgress={value => {
          setProgress(value);
        }}
        repeat
        resizeMode="contain"
      />

      {fullScreen && (
        <View style={styles.safeProvider}>
          {/* <TouchableOpacity
            activeOpacity={0.7}
            style={{...styles.goBack, top: insets.top}}
            onPress={goBack}>
            <IconGoBack fill={'#fff'} />
          </TouchableOpacity> */}

          <TouchableOpacity
            activeOpacity={1}
            style={styles.overlayPlay}
            onPress={() => setPausedVideo(!pausedVideo)}
          />

          <SideBar data={data} />

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
            style={{
              bottom: insets.bottom,
              width: '90%',
              position: 'absolute',
              zIndex: 10,
            }}>
            <RangeSlider
              progressValue={Math.round(progress.currentTime || 0)}
              onValueChange={handleValueChange}
              maximumValue={Math.round(progress.seekableDuration || 0)}
            />
          </View>
        </View>
      )}
    </View>
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
    height: '100%',
    position: 'absolute',
    zIndex: 9,
  },
  content: {
    width: '90%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 999,
  },
  goBack: {
    zIndex: 19,
    left: scale(6),
    padding: scale(6),
    position: 'absolute',
  },
});

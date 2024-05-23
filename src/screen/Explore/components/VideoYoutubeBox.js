import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {COLORS, SHADOW, WIDTH, scale} from '../../../assets/constants';
import {IconX, IconZoomIn, IconZoomOut} from '../../../assets/icon/Icon';
import YoutubePlayer, {YoutubeIframeRef} from 'react-native-youtube-iframe';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

export default function VideoYoutubeBox() {
  const [playing, setPlaying] = useState(false);
  const [cancel, setCancel] = useState(false);
  const youtubePlayerRef = useRef(null);

  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    setPlaying(true);
  }, []);
  const handleZoom = () => {
    setZoom(prev => !prev);
  };
  const handleCancel = () => {
    setPlaying(false);
    setCancel(true);
  };
  const extractVideoId = url => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:shorts\/|v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const onStateChange = state => {
    if (state === 'ended') {
      youtubePlayerRef.current.seekTo(0, true);
    }
  };
  const offset = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: offset.value},
      {
        translateY: offsetY.value,
      },
    ],
  }));

  const pan = Gesture.Pan()
    .onChange(event => {
      offset.value += event.changeX;
      offsetY.value += event.changeY;
    })
    .onFinalize(event => {
      offset.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [width.value / 2, -WIDTH.widthScreen / 1.7],
      });
      offsetY.value = withDecay({
        velocity: event.velocityY,
        rubberBandEffect: true,
        clamp: [height.value / 1.6, -WIDTH.heightScreen / 2.7],
      });
    });
  return (
    <>
      {!cancel && (
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.box,
              {top: zoom ? scale(200) : scale(350)},
              !zoom && animatedStyles,
            ]}>
            <TouchableOpacity
              onPress={handleCancel}
              style={{
                alignSelf: 'flex-end',
                marginTop: scale(5),
                right: scale(5),

                padding: scale(2),

                position: 'absolute',
                zIndex: 1,
              }}>
              <IconX fill={COLORS.white} width={scale(20)} height={scale(20)} />
            </TouchableOpacity>
            <YoutubePlayer
              ref={youtubePlayerRef}
              width={
                zoom
                  ? Platform.OS === 'android'
                    ? scale(405)
                    : scale(385)
                  : scale(150)
              }
              height={zoom ? scale(300) : scale(250)}
              play={playing}
              videoId={'AfH3pTMFiww'}
              onChangeState={onStateChange}
              // allowWebViewZoom={true}ßß
              // onChangeState={event => {
              //   if (event === 'ended' && true) {
              //     youtubePlayerRef?.current?.seekTo(0, true);
              //   }
              // }}
              webViewProps={{
                injectedJavaScript: `
                var element = document.getElementsByClassName('container')[0];
                if (element) {
                element.style.position = 'unset';
              }
              true;
            `,
                style: {
                  borderRadius: scale(15),
                  overflow: 'hidden',
                },
              }}
            />
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                marginTop: scale(10),
                backgroundColor: COLORS.grey,
                borderRadius: scale(99),
                padding: scale(5),
                ...SHADOW,
              }}
              onPress={handleZoom}>
              {!zoom ? (
                <IconZoomIn width={scale(18)} height={scale(18)} />
              ) : (
                <IconZoomOut width={scale(18)} height={scale(18)} />
              )}
            </TouchableOpacity>
          </Animated.View>
        </GestureDetector>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webView: {
    // backgroundColor: 'red',
    // opacity: 0.8,
    height: scale(600),
  },
  box: {
    position: 'absolute',
    zIndex: 999,
    right: scale(5),
    alignSelf: 'flex-end',
    overflow: 'hidden',
    borderRadius: scale(10),
  },
});

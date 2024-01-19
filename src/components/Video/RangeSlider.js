import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, ViewBase} from 'react-native';
import {Slider} from 'react-native-awesome-slider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import CustomText from '../CustomText';
import {COLORS, SIZES, scale} from '../../assets/constants';
import TimeProgress from './TimeProgress';
import BubbleProgress from './BubbleProgress';
const MIN_DEFAULT = 0;
const MAX_DEFAULT = 100;

const formatTime = (seconds = 0) => {
  let mins = parseInt(seconds / 60)
    .toString()
    .padStart(2, '0');
  let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

const RangeSlider = ({
  minimumValue = MIN_DEFAULT,
  maximumValue = MAX_DEFAULT,
  progressValue,
  onValueChange,
}) => {
  const [isMoveProgress, setIsMoveProgress] = useState(MIN_DEFAULT);
  const [moveProgress, setMoveProgress] = useState(MIN_DEFAULT);

  const progress = useSharedValue(0);
  const heightProgress = useSharedValue(3);
  const thumbScaleValue = useSharedValue(0.5);

  const min = useSharedValue(minimumValue);
  const max = useSharedValue(maximumValue);

  useEffect(() => {
    if (isMoveProgress) {
      thumbScaleValue.value = withTiming(1, {
        duration: 10,
      });
      heightProgress.value = withTiming(8, {
        duration: 10,
      });
    } else {
      thumbScaleValue.value = withSequence(
        withTiming(0.5, {duration: 10}),
        withTiming(0, {
          duration: 1500,
        }),
      );
      heightProgress.value = withTiming(2, {
        duration: 10,
      });
    }
  }, [isMoveProgress, thumbScaleValue, heightProgress]);

  useEffect(() => {
    if (!isMoveProgress) {
      progress.value = withTiming(progressValue);
    }
  }, [progressValue, progress, isMoveProgress]);

  useEffect(() => {
    max.value = withTiming(maximumValue);
  }, [max, maximumValue]);

  useEffect(() => {
    min.value = withTiming(minimumValue);
  }, [min, minimumValue]);

  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'flex-end',
      }}>
      <TimeProgress
        timeCurrent={formatTime(progressValue)}
        timeTotal={formatTime(maximumValue)}
      />

      <Slider
        containerStyle={{
          width: '100%',
          height: heightProgress,
          borderRadius: 99,
        }}
        theme={{
          maximumTrackTintColor: '#ffffff57',
          cacheTrackTintColor: '#333',
          minimumTrackTintColor: '#fff',
        }}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        thumbScaleValue={thumbScaleValue}
        onValueChange={value => {
          setMoveProgress(value);
          setIsMoveProgress(true);
        }}
        onSlidingStart={() => setIsMoveProgress(true)}
        onSlidingComplete={value => {
          setIsMoveProgress(false);

          onValueChange(value);
        }}
        renderBubble={() => (
          <BubbleProgress moveProgress={formatTime(moveProgress)} />
        )}
      />
    </View>
  );
};

export default React.memo(RangeSlider);

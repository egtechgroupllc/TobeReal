import {Slider} from '@miblanchard/react-native-slider';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {COLORS, scale} from '../../assets/constants';
import TimeProgress from './TimeProgress';
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
  isShowTime = true,
  disable,
  theme,
  heightProgressDefaults,
  style,
}) => {
  const [isMoveProgress, setIsMoveProgress] = useState(false);
  const [moveProgress, setMoveProgress] = useState(MIN_DEFAULT);

  return (
    <View
      style={{
        width: '100%',
        // flex: 1,
        justifyContent: 'flex-end',
        ...style,
      }}>
      {isShowTime && isMoveProgress && (
        <TimeProgress
          timeCurrent={formatTime(moveProgress || progressValue)}
          timeTotal={formatTime(maximumValue)}
        />
      )}

      <Slider
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        value={moveProgress || progressValue}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor="#ffffff57"
        thumbTintColor={'#fff'}
        disabled={disable}
        trackClickable
        animateTransitions
        onValueChange={value => {
          setMoveProgress(value[0]);
          setIsMoveProgress(true);
        }}
        onSlidingComplete={value => {
          onValueChange && onValueChange(moveProgress);

          setIsMoveProgress(undefined);
          setTimeout(() => {
            setIsMoveProgress(false);
          }, 2000);

          setTimeout(() => {
            setMoveProgress(false);
          }, 500);
        }}
        thumbStyle={{
          height:
            isMoveProgress === undefined
              ? scale(8)
              : isMoveProgress
              ? scale(15)
              : scale(5),
          width: isMoveProgress ? scale(9) : scale(5),
        }}
        trackStyle={{
          height:
            isMoveProgress === undefined
              ? scale(5)
              : isMoveProgress
              ? scale(10)
              : scale(2),
        }}
      />
    </View>
  );
};

export default React.memo(RangeSlider);

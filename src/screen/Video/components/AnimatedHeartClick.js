import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {scale, WIDTH} from '../../../assets/constants';
import {IconHeart} from '../../../assets/icon/Icon';

const ButtonAnimation = Animated.createAnimatedComponent(TouchableOpacity);

const getRandomSignedNum = () => (Math.random() < 0.5 ? -1 : 1);
const getRandomXOutput = () => {
  return getRandomSignedNum() < 0
    ? -Math.random() * WIDTH.widthScreen * 0.5
    : Math.random();
};
const getRandomRotateOutput = () => {
  return [getRandomSignedNum() < 0 ? '-60deg' : '60deg', '0deg'];
};

const height = scale(100);
type AnimatedHeartClickProps = {
  id: string,
  position: any,
  onCompleteAnimation: (id: string) => void,
};
const AnimatedHeartClick = ({
  id,
  position,
  onHeartVideo,
  onCompleteAnimation,
}: AnimatedHeartClickProps) => {
  const animatedValueY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValueY, {
      toValue: -height,
      duration: 1600,
      useNativeDriver: true,
    }).start(() => onCompleteAnimation(id));
  }, [animatedValueY, onCompleteAnimation, id]);

  const randomXOutput = useRef(getRandomXOutput()).current;
  const randomRotateOutput = useRef(getRandomRotateOutput()).current;

  return (
    <Animated.View
      style={[
        styles.heartIcon,
        position.x && {
          left: position.x - scale(50),
          top: position.y - scale(50),
        },
        {
          transform: [
            {
              translateY: animatedValueY.interpolate({
                inputRange: [-height, 0],
                outputRange: [-height, 0],
              }),
            },
            {
              translateX: animatedValueY.interpolate({
                inputRange: [-height, 0],
                outputRange: [scale(randomXOutput), 0],
              }),
            },
            {
              rotate: animatedValueY.interpolate({
                inputRange: [-height, 0],
                outputRange: randomRotateOutput,
              }),
            },
            {
              scale: animatedValueY.interpolate({
                inputRange: [-scale(50), 0],
                outputRange: [1, 0.5],
                extrapolate: 'clamp',
              }),
            },
          ],
          opacity: animatedValueY.interpolate({
            inputRange: [-height, 0],
            outputRange: [0, 1],
          }),
        },
      ]}>
      <IconHeart
        source={'heart'}
        width={scale(100)}
        height={scale(100)}
        fill="red"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heartIcon: {
    position: 'absolute',
    zIndex: 9999,
  },
});

export default AnimatedHeartClick;

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  GestureResponderEvent,
  I18nManager,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
  LayoutChangeEvent,
  ViewStyle,
} from 'react-native';
import {scale} from '~/utils/scale';

// Define the props for the Ripple component
export interface RippleProps extends TouchableWithoutFeedbackProps {
  rippleColor?: string;
  rippleOpacity?: number;
  rippleDuration?: number;
  rippleSize?: number;
  rippleContainerBorderRadius?: number;
  rippleCentered?: boolean;
  rippleSequential?: boolean;
  rippleFades?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  onRippleAnimation?: (
    animation: Animated.CompositeAnimation,
    callback: () => void,
  ) => void;
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  onPressIn?: (e: GestureResponderEvent) => void;
  onPressOut?: (e: GestureResponderEvent) => void;
  onLayout?: (e: LayoutChangeEvent) => void;
  children: React.ReactNode;
}

const Ripple: React.FC<RippleProps> = ({
  rippleColor = '#00000060',
  rippleOpacity = 0.3,
  rippleDuration = 400,
  rippleSize = 0,
  rippleContainerBorderRadius = scale(8),
  rippleCentered = false,
  rippleSequential = false,
  rippleFades = true,
  disabled = false,
  onRippleAnimation = (animation, callback) => animation.start(callback),
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  onLayout,
  children,
  style,
  ...touchableProps
}) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [ripples, setRipples] = useState<any[]>([]);
  const unique = useRef(0);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleLayout = (event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    if (typeof onLayout === 'function') {
      onLayout(event);
    }
    setWidth(width);
    setHeight(height);
  };

  const handlePress = (event: GestureResponderEvent) => {
    if (!rippleSequential || ripples.length === 0) {
      if (typeof onPress === 'function') {
        requestAnimationFrame(() => onPress(event));
      }
      startRipple(event);
    }
  };

  const handleLongPress = (event: GestureResponderEvent) => {
    if (typeof onLongPress === 'function') {
      requestAnimationFrame(() => onLongPress(event));
    }
    startRipple(event);
  };

  const handlePressIn = (event: GestureResponderEvent) => {
    if (typeof onPressIn === 'function') {
      onPressIn(event);
    }
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    if (typeof onPressOut === 'function') {
      onPressOut(event);
    }
  };

  const handleAnimationEnd = useCallback(() => {
    if (mounted.current) {
      setRipples(ripples => ripples.slice(1));
    }
  }, []);

  const startRipple = (event: GestureResponderEvent) => {
    const w2 = 0.5 * width;
    const h2 = 0.5 * height;

    const {locationX, locationY} = rippleCentered
      ? {locationX: w2, locationY: h2}
      : event.nativeEvent;

    const offsetX = Math.abs(w2 - locationX);
    const offsetY = Math.abs(h2 - locationY);

    const R =
      rippleSize > 0
        ? 0.5 * rippleSize
        : Math.sqrt((w2 + offsetX) ** 2 + (h2 + offsetY) ** 2);

    const ripple = {
      unique: unique.current++,
      progress: new Animated.Value(0),
      locationX,
      locationY,
      R,
    };

    const animation = Animated.timing(ripple.progress, {
      toValue: 1,
      easing: Easing.out(Easing.ease),
      duration: rippleDuration,
      useNativeDriver: true,
    });

    onRippleAnimation(animation, handleAnimationEnd);

    setRipples(ripples => ripples.concat(ripple));
  };

  const renderRipple = ({unique, progress, locationX, locationY, R}: any) => {
    const rippleStyle = {
      top: locationY - radius,
      [I18nManager.isRTL ? 'right' : 'left']: locationX - radius,
      backgroundColor: rippleColor,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5 / radius, R / radius],
          }),
        },
      ],
      opacity: rippleFades
        ? progress.interpolate({
            inputRange: [0, 1],
            outputRange: [rippleOpacity, 0],
          })
        : rippleOpacity,
    };

    return <Animated.View style={[styles.ripple, rippleStyle]} key={unique} />;
  };

  const containerStyle = {
    borderRadius: rippleContainerBorderRadius,
  };

  return (
    <TouchableWithoutFeedback
      accessible={false}
      {...touchableProps}
      disabled={disabled}
      onLayout={handleLayout}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={onLongPress ? handleLongPress : undefined}>
      <Animated.View
        pointerEvents="box-only"
        style={[style, {borderRadius: rippleContainerBorderRadius}]}>
        {children}
        <View style={[styles.container, containerStyle]}>
          {ripples.map(renderRipple)}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const radius = 10;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  ripple: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    overflow: 'hidden',
    position: 'absolute',
  },
});

export default Ripple;

import * as React from 'react';
import type {ViewStyle} from 'react-native';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import type {SharedValue} from 'react-native-reanimated';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from 'react-native-reanimated';

const AnimatedChild = ({
  index,
  children,
  anim,
  viewWidth,
  spacing,
}: React.PropsWithChildren<{
  index: number;
  anim: SharedValue<number>;
  viewWidth: SharedValue<number>;
  spacing: number;
}>) => {
  const stylez = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: index * (viewWidth.value + spacing),
      transform: [
        {
          translateX: -(anim.value % (viewWidth.value + spacing)),
        },
      ],
    };
  }, [index, spacing, viewWidth]);
  return <Animated.View style={stylez}>{children}</Animated.View>;
};

export type MarqueeProps = React.PropsWithChildren<{
  speed?: number;
  spacing?: number;
  style?: ViewStyle;
}>;

/**
 * Used to animate the given children in a horizontal manner.
 */
export const Marquee = React.memo(
  ({speed = 1, children, spacing = 0, style}: MarqueeProps) => {
    const parentWidth = useSharedValue(0);
    const viewWidth = useSharedValue(0);
    const [cloneTimes, setCloneTimes] = React.useState(0);
    const anim = useSharedValue(0);

    useFrameCallback(() => {
      anim.value += speed;
    }, true);

    useAnimatedReaction(
      () => {
        if (viewWidth.value === 0 || parentWidth.value === 0) {
          return 0;
        }
        return Math.round(parentWidth.value / viewWidth.value) + 1;
      },
      v => {
        if (v === 0) {
          return;
        }
        // This is going to cover the case when the text/element size
        // is greater than the actual parent size
        // Double this to cover the entire screen twice, in this way we can
        // reset the position of the first element when its going to move out
        // of the screen without any noticible glitch
        runOnJS(setCloneTimes)(v * 2);
      },
      [],
    );

    return (
      <Animated.View
        style={style}
        onLayout={ev => {
          parentWidth.value = ev.nativeEvent.layout.width;
        }}
        pointerEvents="box-none">
        <Animated.View style={styles.row} pointerEvents="box-none">
          {
            // We are adding the text inside a ScrollView because in this way we
            // ensure that its not going to "wrap".
          }
          <Animated.ScrollView
            horizontal
            style={styles.hidden}
            pointerEvents="box-none">
            <View
              onLayout={ev => {
                viewWidth.value = ev.nativeEvent.layout.width;
              }}>
              {children}
            </View>
          </Animated.ScrollView>

          {viewWidth.value >= parentWidth.value ? (
            <>
              {cloneTimes > 0 &&
                [...Array(cloneTimes).keys()].map(index => {
                  return (
                    <AnimatedChild
                      key={`clone-${index}`}
                      index={index}
                      anim={anim}
                      viewWidth={viewWidth}
                      spacing={spacing || parentWidth.value / 2}>
                      {children}
                    </AnimatedChild>
                  );
                })}
            </>
          ) : (
            <View
              style={{
                width: '100%',
              }}>
              {children}
            </View>
          )}
        </Animated.View>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  hidden: {opacity: 0, zIndex: -9999},
  row: {flexDirection: 'row', overflow: 'hidden'},
});

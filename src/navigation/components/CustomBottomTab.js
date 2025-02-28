import {useEffect, useState, React} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAuthentication} from '../../hooks/useAuthentication';
import {COLORS, scale, SHADOW, SIZES} from '../../assets/constants';

export function CustomBottomTab({state, descriptors, navigation}) {
  const {bottom} = useSafeAreaInsets();
  const {token} = useAuthentication();
  const [dimensions, setDimensions] = useState({
    height: scale(20),
    width: scale(100),
  });

  const buttonWidth = (dimensions.width - scale(30)) / state.routes.length; // Adjust width to account for spacing
  const horizontalSpacing = scale(15);

  const onTabbarLayout = e => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(buttonWidth * state.index);

  const animatedTabStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: tabPositionX.value}],
    };
  });

  useEffect(() => {
    tabPositionX.value = withSpring(buttonWidth * state.index, {
      stiffness: 100,
      damping: 15,
    });
  }, []);

  const moveToTab = index => {
    const distance = Math.abs(state.index - index) * buttonWidth;
    const springConfig = {
      stiffness: 100 + distance * 0.3,
      damping: 15 + distance * 0.1,
    };

    tabPositionX.value = withSpring(buttonWidth * index, springConfig);
  };

  return (
    <View
      onLayout={onTabbarLayout}
      style={{
        flexDirection: 'row',
        height: scale(20) * 3.2,
        alignItems: 'center',
        width: '97%',
        justifyContent: 'space-evenly',
        backgroundColor: COLORS.white,
        borderRadius: scale(90),
        position: 'absolute',
        borderWidth: 1,
        borderColor: COLORS.pioBox,
        bottom: bottom + scale(10),
        alignSelf: 'center',
        paddingHorizontal: horizontalSpacing,
        ...SHADOW,
      }}>
      <Animated.View
        style={[
          animatedTabStyle,
          {
            position: 'absolute',
            height: '70%',
            width: buttonWidth + scale(10), // Adjust width to include some space
            // ...SHADOW,
            borderRadius: scale(20),
            left: horizontalSpacing - scale(5), // Align with horizontal padding
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const {options} = descriptors[route.key];
        const scaleAnimate = useSharedValue(isFocused ? 1 : 0);

        useEffect(() => {
          scaleAnimate.value = withSpring(isFocused ? 1 : 0, {
            duration: 350,
          });

          if (isFocused) {
            moveToTab(index);
          }
        }, [isFocused]);

        const animatedIconStyle = useAnimatedStyle(() => {
          const scaleValue = interpolate(scaleAnimate.value, [0, 1], [1, 1]);
          const translateY = interpolate(scaleAnimate.value, [0, 1], [0, -1]);
          return {
            transform: [{scale: scaleValue}, {translateY}],
          };
        });

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const onPress = () => {
          if (!token && (route?.name === 'POST' || route?.name === 'Booking')) {
            navigation.navigate('NavigationAuth', {screen: 'LoginScreen'});
            return;
          }

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              columnGap: scale(10),
              rowGap: scale(2),
              ...SHADOW,
            }}>
            <Animated.View style={animatedIconStyle}>
              {options.tabBarIcon({focused: isFocused})}
            </Animated.View>
            {isFocused && (
              <>
                <Animated.Text
                  numberOfLines={1}
                  style={{
                    color: COLORS.pioPrimary,
                    fontSize: SIZES.xSmall,
                    fontWeight: 'bold',
                  }}>
                  {label}
                </Animated.Text>
                <View
                  style={{
                    height: scale(1),
                    // top: scale(3),
                    width: '100%',
                    backgroundColor: COLORS.pioPrimary,
                  }}
                />
              </>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

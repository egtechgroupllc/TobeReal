/* eslint @typescript-eslint/prefer-nullish-coalescing: 0 */
import { useIsMutating } from '@tanstack/react-query';
import * as React from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { animations, COLORS, images } from '~/assets/constants';
import { useLoading } from '~/hooks/useLoading';
import { scale } from '~/utils/scale';

export interface LoadingPropTypes {
  cancelable?: boolean;
  color?: string;
  animation?: 'none' | 'slide' | 'fade';
  overlayColor?: string;
  size?: 'small' | 'large' | number; // size props does not support value normal
  textContent?: string;
  textStyle?: TextStyle;
  visible?: boolean;
  indicatorStyle?: ViewStyle;
  customIndicator?: React.ReactNode;
  children?: React.ReactNode;
  spinnerKey?: string;
}

const Loading = ({
  cancelable = false,
  color = 'white',
  animation = 'none',
  overlayColor = 'transparent',
  size = 'large',
  textContent = 'Loading...',
  textStyle,
  visible = false,
  indicatorStyle,
  customIndicator,
  children,
  spinnerKey,
}: LoadingPropTypes) => {
  const [spinnerVisible, setLoadingVisibility] = React.useState(visible);
  const { isLoading, isStop } = useLoading();
  const close = () => {
    setLoadingVisibility(false);
  };

  const _handleOnRequestClose = () => {
    if (cancelable) {
      close();
    }
  };

  React.useEffect(() => {
    setLoadingVisibility(visible);
  }, [visible]);

  // How many mutations are fetching?
  const isMutating = useIsMutating();
  // const isFetching = useIsFetching();
  // console.log({isMutating, isFetching});

  React.useEffect(() => {
    setLoadingVisibility(!!isMutating);
  }, [isMutating, isStop]);

  const _renderDefaultContent = () => {
    return (
      // <CImage
      //   source={images.logoLoading}
      //   style={{height: scale(120), width: scale(120), alignSelf: 'center'}}
      //   resizeMode="cover"
      // />
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        pointerEvents="box-none">
        <AnimatedLottieView
          source={animations.medicalLoading}
          autoPlay
          loop
          style={{
            width: scale(250),
            height: scale(250),
          }}
        />
      </View>
    );

    // return (
    //   <View style={[styles.background, indicatorStyle]}>
    //     {/* {customIndicator || <ActivityIndicator color={color} size={size} />}
    //      */}
    //     <CImage
    //       source={images.logoLoading}
    //       style={{height: scale(100), width: scale(100), alignSelf: 'center'}}
    //       resizeMode="cover"
    //     />
    //     <CText style={[styles.textContent, textStyle]}>
    //       {textContent}
    //     </CText>
    //   </View>
    // );
  };
  const _renderLoading = () => {
    const spinner = (
      <View
        style={[styles.container, { backgroundColor: overlayColor }]}
        key={spinnerKey || `spinner_${Date.now()}`}>
        {children || _renderDefaultContent()}
      </View>
    );

    return (
      spinnerVisible&&    <View
        style={{
          ...StyleSheet.absoluteFillObject,
          zIndex: 1000,
          position: 'absolute',
        }}
      >
        {spinner}
      </View>
    );
  };

  return _renderLoading();
};
const styles = StyleSheet.create({
  activityIndicator: {},
  background: {
    // flex: 1,
    backgroundColor: '#00000090',
    minHeight: scale(100),
    minWidth: scale(100),
    maxWidth: scale(140),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(10),
    rowGap: scale(10),
  },
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {},
  textContent: {
    textAlign: 'center',
    color: COLORS.white,
  },
});
export default Loading;

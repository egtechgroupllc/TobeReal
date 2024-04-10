/* eslint @typescript-eslint/prefer-nullish-coalescing: 0 */
import {useIsMutating} from '@tanstack/react-query';
import * as React from 'react';
import {
  ActivityIndicator,
  Modal,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS, images, scale} from '../../assets/constants';
import CustomText from '../CustomText';
import styles from './styles';
import CustomImage from '../CustomImage';

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
  overlayColor = COLORS.overlay,
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
  }, [isMutating]);

  const _renderDefaultContent = () => {
    return (
      <CustomImage
        source={images.logoLoading}
        style={{height: scale(120), width: scale(120), alignSelf: 'center'}}
        resizeMode="cover"
      />
    );

    return (
      <View style={[styles.background, indicatorStyle]}>
        {/* {customIndicator || <ActivityIndicator color={color} size={size} />}
         */}
        <CustomImage
          source={images.logoLoading}
          style={{height: scale(100), width: scale(100), alignSelf: 'center'}}
          resizeMode="cover"
        />
        <CustomText style={[styles.textContent, textStyle]}>
          {textContent}
        </CustomText>
      </View>
    );
  };

  const _renderLoading = () => {
    const spinner = (
      <View
        style={[styles.container, {backgroundColor: overlayColor}]}
        key={spinnerKey || `spinner_${Date.now()}`}>
        {children || _renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        animationType={animation}
        onRequestClose={() => {
          _handleOnRequestClose();
        }}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={spinnerVisible}
        statusBarTranslucent={true}>
        {spinner}
      </Modal>
    );
  };

  return _renderLoading();
};

export default Loading;

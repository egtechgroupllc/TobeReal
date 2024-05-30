import React, {Component, memo} from 'react';
import {
  Dimensions,
  View,
  ViewProps,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import {images, scale} from '../assets/constants';
import CustomImage from './CustomImage';

export interface Iprops {
  disabled: boolean;
  onChange: (event: Event) => void;
  topHeight: number;
  delay: number;
  noLoading: boolean;
  ComponentLoading: any;
  styleLoading?: ImageStyle;
}

const InViewPort = class extends Component<Iprops | ViewProps> {
  constructor(props: Iprops | ViewProps) {
    super(props);
    this.state = {rectTop: 0, rectBottom: 0};
  }

  componentDidMount() {
    if (!this.props.disabled) {
      this.startWatching();
    }
  }

  componentWillUnmount() {
    this.stopWatching();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.disabled) {
      this.stopWatching();
    } else {
      this.lastValue = null;
      this.startWatching();
    }
  }

  startWatching() {
    if (this.interval) {
      return;
    }
    this.interval = setInterval(() => {
      if (!this.myview) {
        return;
      }
      this.myview.measure((x, y, width, height, pageX, pageY) => {
        this.setState({
          rectTop: pageY,
          rectBottom: pageY + height,
          rectWidth: pageX + width,
        });
      });
      this.isInViewPort();
    }, this.props.delay || 100);
  }

  stopWatching() {
    this.interval = clearInterval(this.interval);
  }

  isInViewPort() {
    const window = Dimensions.get('window');

    const isVisible =
      this.state.rectBottom !== 0 &&
      this.state.rectTop >= 0 &&
      this.state.rectBottom <=
        window.height + (this.props.topHeight || scale(400)) &&
      this.state.rectWidth > 0 &&
      this.state.rectWidth <= window.width;
    if (this.lastValue !== isVisible) {
      this.lastValue = isVisible;
      this.props.onChange && this.props.onChange(isVisible);
      isVisible && this.stopWatching();
    }
  }

  render() {
    return (
      <View
        collapsable={this.lastValue}
        ref={component => {
          this.myview = component;
        }}
        {...this.props}>
        {
          this.props.children ||
            (!this.props.noLoading &&
              // <></>
              (this.props.ComponentLoading || (
                <CustomImage
                  source={images.logoLoading}
                  style={[styles.imageStyle, this.props.styleLoading]}
                  resizeMode="cover"
                />
              )))
          // <ActivityIndicator
          //   size={'large'}
          //   color={COLORS.primary}
          //   style={{marginVertical: scale(20)}}
          // />
        }
      </View>
    );
  }
};
const styles = StyleSheet.create({
  imageStyle: {
    height: scale(50),
    width: scale(50),
    alignSelf: 'center',
  },
});

export default memo(InViewPort);

import React, {Component} from 'react';
import {ActivityIndicator, Dimensions, View, ViewProps} from 'react-native';
import {COLORS, scale} from '../assets/constants';

export interface Iprops {
  disabled: boolean;
  onChange: (event: Event) => void;
  topHeight: number;
  delay: number;
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
      this.state.rectBottom <= window.height + (this.props.topHeight || 400) &&
      this.state.rectWidth > 0 &&
      this.state.rectWidth <= window.width;
    if (this.lastValue !== isVisible) {
      this.lastValue = isVisible;
      this.props.onChange(isVisible);
    }
  }

  render() {
    return (
      <View
        ref={component => {
          this.myview = component;
        }}
        {...this.props}>
        {this.props.children || (
          <ActivityIndicator
            size={'large'}
            color={COLORS.primary}
            style={{marginVertical: scale(20)}}
          />
        )}
      </View>
    );
  }
};

export default InViewPort;
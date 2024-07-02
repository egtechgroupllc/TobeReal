import React, {
  Component,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  View,
  ViewProps,
  ImageStyle,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {images, scale} from '../assets/constants';
import CustomImage from './CustomImage';

export interface Iprops {
  disabled: boolean;
  onChange: (event: Event) => void;
  topHeight: number;
  delay: number;
  numLoading: number;
  noLoading: boolean;
  loadingMap: boolean;
  ComponentLoading: any;
  styleLoading?: ImageStyle;
  noLoadAgain: boolean;
}

const InViewPort1 = class extends Component<Iprops | ViewProps> {
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

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.disabled) {
  //     this.stopWatching();
  //   } else {
  //     this.lastValue = null;
  //     this.startWatching();
  //   }
  // }

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
        {this.lastValue ? (
          this.props.children
        ) : !this.props.loadingMap ? (
          (this.props.noLoading ? <></> : this.props.ComponentLoading) || (
            <CustomImage
              source={images.logoLoading}
              style={[styles.imageStyle, this.props.styleLoading]}
              resizeMode="cover"
            />
          )
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[...Array(this.props.numLoading || 3)]}
            contentContainerStyle={{
              columnGap: scale(12),
              paddingHorizontal: scale(12),
            }}
            renderItem={({item, index}) => {
              return <View key={index}>{this.props.ComponentLoading}</View>;
            }}
          />
        )}
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

const window = Dimensions.get('window');

const InViewPort = ({
  numLoading = 3,
  ComponentLoading,
  children,
  disabled,
  delay = 100,
  topHeight = 400,
  loadingMap,
  styleLoading,
  onChange,
  props,
}) => {
  const [rect, setRect] = useState({rectTop: 0, rectBottom: 0, rectWidth: 0});
  const [isInView, setIsInView] = useState(false);

  const intervalRef = useRef(null);
  const myViewRef = useRef(null);

  useEffect(() => {
    if (!disabled) {
      startWatching();
    }
    return () => stopWatching();
  }, [disabled, startWatching, stopWatching]);

  const startWatching = useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      measureView();
      checkInViewPort();
    }, delay);
  }, [measureView, checkInViewPort, delay]);

  const stopWatching = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const measureView = useCallback(() => {
    if (myViewRef.current) {
      myViewRef.current.measure((x, y, width, height, pageX, pageY) => {
        setRect({
          rectTop: pageY,
          rectBottom: pageY + height,
          rectWidth: pageX + width,
        });
      });
    }
  }, []);

  const checkInViewPort = useCallback(() => {
    const isVisible =
      rect.rectBottom !== 0 &&
      rect.rectTop >= 0 &&
      rect.rectBottom <= window.height + topHeight &&
      rect.rectWidth > 0 &&
      rect.rectWidth <= window.width;

    if (isVisible) {
      setIsInView(isVisible);
      onChange && onChange(isVisible);
      if (isVisible) {
        stopWatching();
      }
    }
  }, [rect, topHeight, onChange, stopWatching]);

  return (
    <View collapsable={isInView} ref={myViewRef} {...props}>
      {isInView ? (
        children
      ) : !loadingMap ? (
        ComponentLoading || (
          <CustomImage
            source={images.logoLoading}
            style={[styles.imageStyle, styleLoading]}
            resizeMode="cover"
          />
        )
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[...Array(numLoading)]}
          contentContainerStyle={{
            columnGap: scale(12),
            paddingHorizontal: scale(12),
          }}
          renderItem={({item, index}) => {
            return <View key={index}>{ComponentLoading}</View>;
          }}
        />
      )}
    </View>
  );
};

export default memo(InViewPort1);

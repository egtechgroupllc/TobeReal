import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {getBanner} from '../../../Model/api/banner';
import {COLORS, images, scale} from '../../../assets/constants';
import {CustomImage} from '../../../components';
const {width} = Dimensions.get('screen');

export default memo(function SliderContent({dataBanner}) {
  const {navigate} = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flat, setFlat] = useState(false);

  const onViewableItemsChangedHandler = useCallback(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index + 1);
  }, []);

  const refContainer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let myInterval = setInterval(() => {
      setFlat(!flat);
      if (currentIndex < dataBanner?.banner?.url?.length) {
        setCurrentIndex(currentIndex + 1);
        refContainer.current.scrollToIndex({
          animated: true,
          index: currentIndex,
        });
      } else if (currentIndex === dataBanner?.banner?.url?.length) {
        setCurrentIndex(0);
      }
    }, 3000);
    return () => {
      clearInterval(myInterval);
    };
  }, [currentIndex, flat]);

  const openSlide = item => {
    Linking.openURL(item?.navigate);
  };

  return (
    <View style={styles.view}>
      <Animated.FlatList
        ref={refContainer}
        horizontal
        pagingEnabled
        data={dataBanner?.banner?.url}
        scrollEventThrottle={32}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChangedHandler}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: refContainer}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            style={{
              width: width,
              alignItems: 'center',
              paddingHorizontal: scale(20),
            }}
            onPress={() => openSlide(item)}>
            <CustomImage
              source={{uri: item?.image}}
              style={styles.imageBg}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        )}
      />
      <View style={styles.viewDot}>
        <View style={styles.viewDots}>
          {dataBanner?.banner?.url?.map((_, i) => {
            const inputRange = [
              (i - 2) * width,
              (i - 1) * width,
              i * width,
              (i + 1) * width,
              (i + 2) * width,
            ];
            const dotWidth = refContainer.interpolate({
              inputRange,
              outputRange: [10, 10, 20, 10, 10],
            });
            const backgroundColor = refContainer.interpolate({
              inputRange,
              outputRange: [
                COLORS.grey,
                COLORS.grey,
                COLORS.pioPrimary,
                COLORS.grey,
                COLORS.grey,
              ],
            });
            return (
              <Animated.View
                key={i.toString()}
                style={[styles.dot, {backgroundColor, width: dotWidth}]}
              />
            );
          })}
        </View>
      </View>
      {/* <ChatView /> */}
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    rowGap: scale(10),
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(20),
  },
  viewRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewDot: {
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  viewDots: {
    position: 'absolute',
    bottom: scale(20),
    flexDirection: 'row',
  },
  viewTextIP: {
    height: scale(45),
    flex: 1,
    paddingHorizontal: scale(15),
    backgroundColor: 'rgba(242, 248, 255, 0.2)',
    borderRadius: scale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    height: scale(7),
    borderRadius: scale(5),
    marginHorizontal: scale(6),
  },
  imageSearch: {
    height: scale(18),
    width: scale(18),
    tintColor: COLORS.BlueBold,
  },

  imageBg: {height: scale(160), width: '100%', borderRadius: scale(10)},
});

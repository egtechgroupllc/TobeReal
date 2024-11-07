import {
  Animated,
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {CImage, CText} from '../../../components';
import {COLORS, images, SIZES} from '../../../assets/constants';
import {scale} from '../../../utils/scale';
import WebView from 'react-native-webview';
import BoxPlaceItemLoading from '~/components/BoxPlaceItemLoading';
import {IconSearch} from '~/assets/icon/Icon';
import ChatView from './ChatView';
const {width} = Dimensions.get('screen');

// Use the predefined ListSlider data
const ListSlider = [
  {
    src: images.slider1,
    type: 'url',
    url: 'https://tobecare.net/',
  },
  {
    src: images.slider2,
    type: 'url',
    url: 'https://tobecare.net/',
  },
  {
    src: images.slider3,
    type: 'common',
  },
];

export default function FirstContent() {
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
      if (currentIndex < ListSlider.length) {
        setCurrentIndex(currentIndex + 1);
        refContainer.current.scrollToIndex({
          animated: true,
          index: currentIndex,
        });
      } else if (currentIndex === ListSlider.length) {
        setCurrentIndex(0);
      }
    }, 3000);
    return () => {
      clearInterval(myInterval);
    };
  }, [currentIndex, flat]);

  const openSlide = item => {
    if (item?.type === 'url') {
      Linking.openURL(item?.url);
    } else if (item?.type === 'common') {
      navigate('Product');
    }
  };

  function onOpenSearch() {
    navigate('SearchAll');
  }

  return (
    <View style={styles.view}>
      {/* <CText
        style={{
          fontSize: SIZES.large,
          paddingHorizontal: scale(20),
          color: COLORS.White,
        }}>
        Make an Appointment!
      </CText> */}
      {/* <TouchableOpacity
        style={{
          ...styles.viewRows,
          flexWrap: 'nowrap',
          alignItems: 'center',
          columnGap: scale(10),
          paddingHorizontal: scale(20),
        }}
        onPress={onOpenSearch}>
        <View style={styles.viewTextIP}>
          <CText style={{color: COLORS.White}}>
            {flat ? 'Search' : 'Medical specialty'}
          </CText>
        </View>
        <View
          style={{
            backgroundColor: COLORS.cyan,
            height: scale(45),
            width: scale(50),
            borderRadius: scale(5),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <IconSearch fill={COLORS.White} />
        </View>
      </TouchableOpacity> */}
      <Animated.FlatList
        ref={refContainer}
        horizontal
        pagingEnabled
        data={ListSlider} // Use ListSlider data here
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
            <CImage
              source={item?.src}
              style={styles.imageBg}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        )}
      />
      <View style={styles.viewDot}>
        <View style={styles.viewDots}>
          {ListSlider.map((_, i) => {
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
                COLORS.cyan,
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
}

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

import {
  FlatList,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import CustomImage from '../../../../components/CustomImage';
import ImageView from 'react-native-image-viewing';
import {IconGoBack} from '../../../../assets/icon/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, WIDTH, scale} from '../../../../assets/constants';
export default function ListImg({dataImg, open, onClose}) {
  const insets = useSafeAreaInsets();

  const flatListRef = useRef(null);
  let heightHeader = useRef(20);
  const images = dataImg.map(uri => ({uri}));

  const [visible, setIsVisible] = useState(false);
  const [indexNavigation, setIndexNavigation] = useState(3);

  useLayoutEffect(() => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: indexNavigation,
    });
  }, [indexNavigation]);

  return (
    <Modal
      visible={!!open}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          onLayout={e => {
            const {height} = e.nativeEvent.layout;
            heightHeader.current = height;
          }}
          style={{...styles.headerBar, minHeight: insets.top + scale(35)}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClose}
            style={{
              padding: scale(4),
            }}>
            <IconGoBack style={styles.icon} fill="#fff" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: insets.top + scale(35),
          }}
        />

        <FlatList
          ref={flatListRef}
          onScrollToIndexFailed={({index}) => {
            const wait = new Promise(resolve => setTimeout(resolve, 100));
            wait.then(() => {
              setIndexNavigation(open - 1);
            });
          }}
          data={dataImg}
          contentContainerStyle={{
            rowGap: scale(6),
          }}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                width: WIDTH.widthScreen,
                height: WIDTH.heightScreen / 3.2,
              }}
              activeOpacity={0.9}
              onPress={() => setIsVisible(index)}>
              <CustomImage
                source={item}
                style={{
                  flex: 1,
                }}
              />
            </TouchableOpacity>
          )}
        />

        {!!visible && (
          <ImageView
            images={images}
            imageIndex={visible}
            visible={!!visible || visible === 0}
            onRequestClose={() => setIsVisible(false)}
            onImageIndexChange={e => e && setIndexNavigation(e - 1)}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 99,
    width: '100%',

    alignItems: 'flex-start',
    padding: scale(10),
    justifyContent: 'flex-end',
  },
  icon: {
    width: scale(20),
    height: scale(20),
    zIndex: 9,
  },
});

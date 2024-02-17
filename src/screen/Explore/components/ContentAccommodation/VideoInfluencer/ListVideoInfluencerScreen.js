import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import VideoCompact from './VideoCompact';
import {VideoPlay} from '../../../../../components';
import {WIDTH, scale} from '../../../../../assets/constants';
import {IconGoBack} from '../../../../../assets/icon/Icon';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import video from '../../../../../assets/constants/video';

const listVideo = [
  {
    id: 3,
    src: video.video1,
    name: 'quanh1099',
    caption: 'Nên em đành viết chiếc thư tình … thư tình',
    price: 200000,
    location: 'HoChiMinh',
    rental: 'night',
  },
  {
    id: 2,
    src: video.video2,
    name: 'cuongxautrai',
    caption: 'cuong xau zai vai ca dai , oai that xau zai',
    price: 1,
    location: 'HoChiMinh',
    rental: 'night',
  },
  {
    id: 1,
    src: video.video3,
    name: 'kietdepzai',
    caption: 'kiet dep zai vai ca dai , oai that dep zai',
    price: 9999999999,
    location: 'HoChiMinh',
    rental: 'night',
  },

  {
    id: 4,
    src: video.video4,
    name: 'meiyin680',
    caption: 'She’s about to be made into a living human specimen',
    price: 1000,
    location: 'HoChiMinh',
    rental: 'night',
  },
  {
    id: 5,
    src: video.video5,
    name: 'meiyin680',
    caption: 'She’s about to be made into a living human specimen',
    price: 1000,
    location: 'HoChiMinh',
    rental: 'night',
  },
];

export default function ListVideoInfluencerScreen() {
  const {goBack} = useNavigation();
  const insets = useSafeAreaInsets();

  const [videoPlay, setVideoPlay] = useState(true);
  const handlerViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0 && viewableItems[0].isViewable) {
      setVideoPlay(viewableItems[0].item?.id);
    }
  }, []);

  return (
    <Modal visible transparent animationType="slide">
      <View
        style={{
          ...StyleSheet.absoluteFill,
          alignItems: 'center',
          backgroundColor: '#000',
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.goBack, top: insets.top}}
          onPress={goBack}>
          <IconGoBack fill={'#fff'} />
        </TouchableOpacity>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          pagingEnabled
          snapToAlignment={'start'}
          data={listVideo}
          contentContainerStyle={{
            width: '100%',
            backgroundColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          onViewableItemsChanged={handlerViewableItemsChanged}
          onEndReached={e => console.log('cuộn đén cuối')}
          onEndReachedThreshold={2}
          renderItem={({item, index}) => (
            <VideoPlay
              fullScreen
              data={item}
              source={item?.src}
              paused={item?.id !== videoPlay}
              play={item?.id === videoPlay}
              // resetVideo={item?.id !== videoPlay}
            />
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  goBack: {
    zIndex: 19,
    left: scale(6),
    padding: scale(6),
    position: 'absolute',
  },
});

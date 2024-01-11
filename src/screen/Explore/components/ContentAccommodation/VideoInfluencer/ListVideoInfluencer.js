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

const listVideo = [
  {
    id: 1,
    src: 'https://github.com/KuDenn172/TobeNFT/blob/main/video/jojo.mp4?raw=true',
    name: 'kietdepzai',
    caption: 'kiet dep zai vai ca dai , oai that dep zai',
    price: 9999999999,
    location: 'HoChiMinh',
    rental: 'night',
  },
  {
    id: 3,
    src: 'https://github.com/KuDenn172/TobeNFT/blob/main/video/titok2.mp4?raw=true',
    name: 'quanh1099',
    caption: 'Nên em đành viết chiếc thư tình … thư tình',
    price: 200000,
    location: 'HoChiMinh',
    rental: 'night',
  },
  {
    id: 2,
    src: 'https://github.com/KuDenn172/TobeNFT/blob/main/video/tiktok3.mp4?raw=true',
    name: 'cuongxautrai',
    caption: 'cuong xau zai vai ca dai , oai that xau zai',
    price: 1,
    location: 'HoChiMinh',
    rental: 'night',
  },

  {
    id: 4,
    src: 'https://github.com/KuDenn172/TobeNFT/blob/main/video/titok1.mp4?raw=true',
    name: 'meiyin680',
    caption: 'She’s about to be made into a living human specimen',
    price: 1000,
    location: 'HoChiMinh',
    rental: 'night',
  },
];

export default function ListVideoInfluencer() {
  const {goBack} = useNavigation();
  const insets = useSafeAreaInsets();

  const [videoPlay, setVideoPlay] = useState(true);
  const handlerViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems && viewableItems[0].isViewable) {
      setVideoPlay(viewableItems[0].item?.id);
    }
  }, []);

  return (
    <Modal visible transparent animationType="slide">
      <View
        style={{
          ...StyleSheet.absoluteFill,
          alignItems: 'center',
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
          // snapToInterval={WIDTH.heightScreen}
          pagingEnabled
          // snapToAlignment={'start'}
          // decelerationRate={'fast'}
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

import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';

import {IconPlayVideo, IconX} from '../../../assets/icon/Icon';
import {COLORS, scale} from '../../../assets/constants';

export default function VideoItem({
  arrImg,
  data,
  isDescriptionImg,
  onChangeDescription,
  onDelete,
  onViewVideo,
  onPausedVideo,
}) {
  const [openContact, setOpenContact] = useState(false);
  const videoRef = useRef();
  const [pausedVideo, setPausedVideo] = useState(false);
  useEffect(() => {
    onPausedVideo && setPausedVideo(true);
  }, [onPausedVideo]);

  return (
    <>
      <View
        style={{
          width: '98%',
          maxWidth: '100%',
          rowGap: scale(10),
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.img]}
          onPress={() => {
            setOpenContact(true);
          }}>
          <Video
            ref={videoRef}
            source={{uri: data?.url || data?.uri}}
            style={{
              height: scale(250),
              width: '100%',
            }}
            repeat
            paused={pausedVideo}
            resizeMode={'contain'}
          />
          {/* <CustomImage
            source={data?.url || data?.uri}
            style={{
              width: '100%',
              height: '100%',
            }}
          /> */}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDelete(data?.id)}
          activeOpacity={0.7}
          style={styles.delete}>
          <IconX
            fill={'#fff'}
            style={{
              width: scale(18),
              height: scale(18),
            }}
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={openContact}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}>
        <View style={styles.contact}>
          <TouchableOpacity
            onPress={() => setPausedVideo(prev => !prev)}
            activeOpacity={0.9}
            style={{
              height: '75%',
              width: '100%',
              alignSelf: 'center',
              overflow: 'hidden',
            }}>
            <Video
              repeat
              paused={pausedVideo}
              ref={videoRef}
              source={{uri: data?.url || data?.uri}}
              style={{width: '100%', height: '100%'}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOpenContact(false)}
            style={{
              alignSelf: 'center',
              backgroundColor: '#00000060',
              padding: 6,
              borderRadius: 99,
            }}>
            <IconX fill={COLORS.white} />
          </TouchableOpacity>
          {pausedVideo && (
            <IconPlayVideo
              fill={COLORS.grey}
              style={{
                width: scale(40),
                height: scale(40),
                opacity: 0.7,
                position: 'absolute',
                zIndex: 99,
              }}
            />
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  delete: {
    position: 'absolute',
    right: 0,
    padding: scale(4),
    backgroundColor: COLORS.overlay,
    borderRadius: scale(5),
  },
  img: {
    width: '100%',
    height: scale(170),
    borderRadius: scale(5),
    overflow: 'hidden',
  },
  contact: {
    borderRadius: scale(20),
    flex: 1,
    backgroundColor: COLORS.black + '50',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: scale(20),
  },
});

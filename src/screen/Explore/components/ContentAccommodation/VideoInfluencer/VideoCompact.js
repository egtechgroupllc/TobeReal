import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {IconMarker, IconPlayVideo} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import {VideoPlay} from '../../../../../components';

export default function VideoCompact({onPlay}) {
  return (
    <View style={styles.wrapper}>
      <VideoPlay style={styles.backgroundVideo} paused />
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={0.7}
        onPress={() => onPlay && onPlay(true)}>
        <CustomText textType="bold" style={styles.name}>
          @tuankiet
        </CustomText>

        <IconPlayVideo fill={COLORS.white} style={styles.icon} />

        <View style={styles.boxLocation}>
          <IconMarker
            style={{width: scale(12), height: scale(12)}}
            fill={COLORS.white}
          />
          <CustomText style={styles.location}>Tangerang</CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    columnGap: scale(10),
    borderRadius: scale(10),
    overflow: 'hidden',
  },
  backgroundVideo: {
    height: scale(260),
    width: scale(400 / 2.5),
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: scale(12),
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#00000033',
  },
  name: {
    color: COLORS.white,
    marginBottom: 'auto',
  },
  icon: {
    width: '100%',
    alignItems: 'center',
  },
  boxLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: scale(10),
    paddingVertical: scale(2),
    borderRadius: 99,
    columnGap: scale(2),
    marginTop: 'auto',
  },
  location: {
    fontSize: SIZES.xSmall,
    color: COLORS.white,
  },
});
